// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { connectToDatabase } from '@/lib/mongo';
import User from '@/models/User';
import Wallet from '@/models/Wallet';
import { emailTemplates, sendEmail } from '@/lib/email';
import { sendCustomEmailNotification } from '@/actions/notification-actions';

export async function POST(request: NextRequest) {
	try {
		const {
			name,
			username,
			email,
			gender,
			mobile_number,
			skills,
			industry,
			position,
			date_of_birth,
			password,
			passwordConfirm,
		} = await request.json();

		// Basic validation
		if (!name || !username || !email || !password || !passwordConfirm) {
			return NextResponse.json(
				{ status: false, error: 'All required fields must be filled' },
				{ status: 400 },
			);
		}
		if (password !== passwordConfirm) {
			return NextResponse.json(
				{ status: false, error: 'Passwords do not match' },
				{ status: 400 },
			);
		}
		if (password.length < 6) {
			return NextResponse.json(
				{ status: false, error: 'Password must be at least 6 characters long' },
				{ status: 400 },
			);
		}

		await connectToDatabase();

		// Check if user exists
		const existingUser = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (existingUser) {
			if (existingUser.email === email) {
				return NextResponse.json(
					{ status: false, error: 'User with this email already exists', field: 'email' },
					{ status: 409 },
				);
			}
			return NextResponse.json(
				{ status: false, error: 'Username already taken', field: 'username' },
				{ status: 409 },
			);
		}

		// Hash password
		const pwSalt = await bcrypt.genSalt(12);
		const hashedPassword = await bcrypt.hash(password, pwSalt);

		// Create user (do NOT persist passwordConfirm)
		const newUser = await User.create({
			name,
			username,
			email,
			gender,
			mobile_number,
			skills: skills || [],
			industry,
			position,
			date_of_birth,
			password: hashedPassword,
			passwordConfirm: hashedPassword,
			isVerified: false, // ensure default
		});

		if (!newUser) {
			return NextResponse.json(
				{ status: false, error: 'Failed to create user' },
				{ status: 500 },
			);
		}

		// Create wallet (optional per your app)
		await Wallet.create({ user: newUser._id });

		// --- Email verification (bcrypt token) ---
		// 1) Generate RAW token
		const rawToken = crypto.randomBytes(32).toString('hex');

		// 2) Hash and store with expiry
		const tokenSalt = await bcrypt.genSalt(12);
		const tokenHash = await bcrypt.hash(rawToken, tokenSalt);
		newUser.emailVerificationToken = tokenHash;
		newUser.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h
		await newUser.save({ validateBeforeSave: false });

		// 3) Build activation link with RAW token + uid
		const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? '';
		const activationUrl = `${baseUrl}/activate?token=${encodeURIComponent(rawToken)}&uid=${newUser._id.toString()}`;

		// 4) Send activation email
		await sendEmail({
			to: [{ email: newUser.email, name: newUser.name }],
			subject: 'Activate Your Bariq Platform Account',
			htmlContent: emailTemplates.registrationConfirmation(newUser.name, activationUrl),
		});

		// Notify internal roles
		await sendCustomEmailNotification(
			['admin', 'sales', 'pm_manager'],
			'New Freelancer Registration',
			`${newUser.name} has registered as a freelancer. Please check the freelancer and assign projects to them.`,
		);

		// Populate for response/session
		const populatedUser = await User.findById(newUser._id).populate('role');

		// Create session (optional — you might block access until verified)
		const sessionData = {
			user: {
				id: populatedUser!._id.toString(),
				email: populatedUser!.email,
				name: populatedUser!.name,
				position: populatedUser!.position,
				username: populatedUser!.username,
				role: populatedUser!.role,
				avatar: populatedUser!.avatar,
				industry: populatedUser!.industry,
				appearance: populatedUser!.appearance,
			},
		};

		const session = jwt.sign(sessionData, process.env.NEXTAUTH_SECRET as string, {
			expiresIn: '30d',
		});

		return NextResponse.json(
			{
				status: true,
				message: 'Registration successful! Please check your email to verify your account.',
				user: {
					id: populatedUser!._id,
					email: populatedUser!.email,
					name: populatedUser!.name,
					username: populatedUser!.username,
					position: populatedUser!.position,
					role: populatedUser!.role,
					industry: populatedUser!.industry,
					avatar: populatedUser!.avatar,
					isVerified: populatedUser!.isVerified,
					isActive: populatedUser!.isActive,
					createdAt: populatedUser!.createdAt,
					updatedAt: populatedUser!.updatedAt,
					appearance: populatedUser!.appearance,
				},
			},
			{
				headers: {
					'Set-Cookie': `session=${session}; HttpOnly; Path=/; Max-Age=${2592000}; SameSite=Lax`,
				},
			},
		);
	} catch (error) {
		console.error('Registration error:', error);
		return NextResponse.json(
			{ status: false, error: 'An error occurred during registration. Please try again.' },
			{ status: 500 },
		);
	}
}
