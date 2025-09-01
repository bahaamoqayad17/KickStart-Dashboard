import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/User';

import bcrypt from 'bcryptjs';
import { connectToDatabase } from '@/lib/mongo';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
	// Check if the user exists
	// Find user by email
	const { email, password, rememberMe } = await request.json();
	await connectToDatabase();

	const user = await User.findOne({ email: email });

	if (!user) {
		return NextResponse.json({
			status: false,
			error: 'Invalid email/password',
		});
	}

	// Compare password
	const isValid = await bcrypt.compare(password, user.password);

	if (!isValid) {
		return NextResponse.json({
			status: false,
			error: 'Invalid email/password',
		});
	}

	await User.updateOne({ _id: user._id }, { $set: { lastActive: new Date() } });

	// Create a shorter session token with minimal data
	const sessionData = {
		user: {
			id: user._id.toString(),
			email: user.email,
			name: user.name,
			position: user.position,
			username: user.username,
			role: user.role,
			avatar: user.avatar,
			industry: user.industry,
			appearance: user.appearance,
		},
	};

	let session;
	if (rememberMe) {
		session = jwt.sign(sessionData, process.env.NEXTAUTH_SECRET as string, {
			expiresIn: '30d',
		});
	} else {
		session = jwt.sign(sessionData, process.env.NEXTAUTH_SECRET as string, { expiresIn: '1d' });
	}

	// Return user object without password
	return NextResponse.json(
		{
			status: true,
			user: {
				id: user._id,
				email: user.email,
				name: user.name,
				username: user.username,
				position: user.position,
				role: user.role,
				industry: user.industry,
				avatar: user.avatar,
				isVerified: user.isVerified,
				isActive: user.isActive,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
				appearance: user.appearance,
			},
		},
		{
			headers: {
				'Set-Cookie': `session=${session}; HttpOnly; Path=/; Max-Age=${rememberMe ? 2592000 : 3600}; SameSite=Lax`,
			},
		},
	);
}
