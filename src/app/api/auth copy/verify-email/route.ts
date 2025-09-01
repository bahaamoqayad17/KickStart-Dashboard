// app/api/auth/verify-email/route.ts
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import { connectToDatabase } from '@/lib/mongo';
import User from '@/models/User';

export async function GET(req: NextRequest) {
	try {
		const { searchParams } = new URL(req.url);
		const token = searchParams.get('token');
		const uid = searchParams.get('uid');

		if (!token || !uid) {
			return NextResponse.json(
				{ status: false, error: 'Missing token or uid' },
				{ status: 400 },
			);
		}

		await connectToDatabase();

		// Load this user and include hidden fields
		const user = await User.findById(uid).select(
			'+emailVerificationToken +emailVerificationExpires',
		);
		if (!user || !user.emailVerificationToken || !user.emailVerificationExpires) {
			return NextResponse.json(
				{ status: false, error: 'Invalid verification request' },
				{ status: 400 },
			);
		}

		if (user.isVerified) {
			// Already verified — idempotent success
			return NextResponse.json({ status: true, message: 'Email already verified' });
		}

		// Check expiry
		if (user.emailVerificationExpires.getTime() <= Date.now()) {
			return NextResponse.json({ status: false, error: 'Token expired' }, { status: 400 });
		}

		// Compare RAW token with stored bcrypt hash
		const ok = await bcrypt.compare(token, user.emailVerificationToken);
		if (!ok) {
			return NextResponse.json({ status: false, error: 'Token invalid' }, { status: 400 });
		}

		// Mark verified and clear token fields
		user.isVerified = true;
		// @ts-ignore
		user.emailVerificationToken = undefined;
		// @ts-ignore
		user.emailVerificationExpires = undefined;
		await user.save({ validateBeforeSave: false });

		return NextResponse.json({ status: true, message: 'Email verified successfully' });
		// Or redirect to a success page:
		// return NextResponse.redirect(new URL('/auth/activation-success', req.url));
	} catch (e) {
		console.error('verify-email error:', e);
		return NextResponse.json({ status: false, error: 'Server error' }, { status: 500 });
	}
}
