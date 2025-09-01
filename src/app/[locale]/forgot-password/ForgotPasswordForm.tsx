'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import Input from '@/components/form/Input';
import Label from '@/components/form/Label';
import Alert from '@/components/ui/Alert';
import { Mail, CheckCircle } from 'lucide-react';

const ForgotPasswordForm = () => {
	const router = useRouter();
	const [email, setEmail] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	const validateEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	};

	const handleSubmit = async () => {
		setError('');

		if (!email.trim()) {
			setError('Email is required');
			return;
		}

		if (!validateEmail(email)) {
			setError('Please enter a valid email address');
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email }),
			});

			const data = await response.json();

			if (data.status) {
				setSuccess(true);
				setTimeout(() => {
					router.push(`/reset-password?email=${encodeURIComponent(email)}`);
				}, 3000);
			} else {
				setError(data.error || 'Failed to send reset code');
			}
		} catch (error) {
			setError('An error occurred. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	if (success) {
		return (
			<div className='space-y-6 text-center'>
				<div className='mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
					<CheckCircle className='h-8 w-8 text-green-600' />
				</div>
				<div className='space-y-2'>
					<h3 className='text-lg font-semibold text-gray-800'>Check Your Email</h3>
					<p className='text-sm text-gray-600'>
						We've sent a verification code to <strong>{email}</strong>. Please check
						your inbox and follow the instructions to reset your password.
					</p>
				</div>
				<div className='rounded-lg border border-blue-200 bg-blue-50 p-4'>
					<p className='text-sm text-blue-800'>
						💡 Didn't receive the email? Check your spam folder or try again with a
						different email address.
					</p>
				</div>
			</div>
		);
	}

	return (
		<form className='space-y-6'>
			{error && <Alert className='border-red-200 bg-red-50 text-red-700'>{error}</Alert>}

			<div className='space-y-2'>
				<Label htmlFor='email'>Email Address</Label>
				<div className='relative'>
					<Mail className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
					<Input
						id='email'
						type='email'
						name='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Enter your email address'
						className='pl-10'
						required
					/>
				</div>
			</div>

			<Button
				variant='solid'
				color='emerald'
				size='lg'
				rightIcon={isLoading ? '' : 'HeroArrowRight'}
				className='w-full'
				isDisable={isLoading}
				onClick={() => handleSubmit()}>
				{isLoading ? 'Sending...' : 'Send Reset Code'}
			</Button>

			<div className='text-center text-sm text-gray-600'>
				Remember your password?{' '}
				<a href='/login' className='font-medium text-purple-600 hover:text-purple-700'>
					Sign in here
				</a>
			</div>
		</form>
	);
};

export default ForgotPasswordForm;
