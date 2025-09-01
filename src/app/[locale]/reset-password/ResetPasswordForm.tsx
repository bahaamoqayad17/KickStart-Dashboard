'use client';

import React, { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/form/Input';
import Label from '@/components/form/Label';
import Alert from '@/components/ui/Alert';
import { Eye, EyeOff, CheckCircle, Key } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

const ResetPasswordForm = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [formData, setFormData] = useState({
		email: '',
		verificationCode: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		// Get email from URL params
		const email = searchParams.get('email');
		if (email) {
			setFormData((prev) => ({ ...prev, email }));
		}
	}, [searchParams]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateForm = () => {
		if (!formData.email.trim()) return 'Email is required';
		if (!formData.verificationCode.trim()) return 'Verification code is required';
		if (formData.verificationCode.length !== 6) return 'Verification code must be 6 digits';
		if (!formData.newPassword) return 'New password is required';
		if (formData.newPassword.length < 6) return 'Password must be at least 6 characters';
		if (formData.newPassword !== formData.confirmPassword) return 'Passwords do not match';
		return null;
	};

	const handleSubmit = async () => {
		setError('');

		const validationError = validateForm();
		if (validationError) {
			setError(validationError);
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch('/api/auth/reset-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: formData.email,
					code: formData.verificationCode,
					newPassword: formData.newPassword,
				}),
			});

			const data = await response.json();

			if (data.status) {
				setSuccess(true);
				setTimeout(() => {
					router.push('/login');
				}, 3000);
			} else {
				setError(data.error || 'Failed to reset password');
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
					<h3 className='text-lg font-semibold text-gray-800'>
						Password Reset Successful!
					</h3>
					<p className='text-sm text-gray-600'>
						Your password has been successfully reset. You can now sign in with your new
						password.
					</p>
				</div>
				<div className='rounded-lg border border-green-200 bg-green-50 p-4'>
					<p className='text-sm text-green-800'>
						🎉 Redirecting to login page in 3 seconds...
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
				<Input
					id='email'
					name='email'
					type='email'
					value={formData.email}
					onChange={handleInputChange}
					placeholder='Enter your email'
					required
					disabled={!!searchParams.get('email')}
				/>
			</div>

			<div className='space-y-2'>
				<Label htmlFor='verificationCode'>Verification Code</Label>
				<div className='relative'>
					<Key className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
					<Input
						id='verificationCode'
						name='verificationCode'
						value={formData.verificationCode}
						onChange={handleInputChange}
						placeholder='Enter 6-digit code'
						className='pl-10 text-center text-lg tracking-wider'
						maxLength={6}
						required
					/>
				</div>
				<p className='text-xs text-gray-500'>Check your email for the verification code</p>
			</div>

			<div className='space-y-4'>
				<div className='space-y-2'>
					<Label htmlFor='newPassword'>New Password</Label>
					<div className='relative'>
						<Input
							id='newPassword'
							name='newPassword'
							type={showPassword ? 'text' : 'password'}
							value={formData.newPassword}
							onChange={handleInputChange}
							placeholder='Enter new password'
							required
						/>
						<button
							type='button'
							className='absolute right-3 top-1/2 -translate-y-1/2'
							onClick={() => setShowPassword(!showPassword)}>
							{showPassword ? (
								<EyeOff className='h-4 w-4' />
							) : (
								<Eye className='h-4 w-4' />
							)}
						</button>
					</div>
				</div>

				<div className='space-y-2'>
					<Label htmlFor='confirmPassword'>Confirm New Password</Label>
					<div className='relative'>
						<Input
							id='confirmPassword'
							name='confirmPassword'
							type={showConfirmPassword ? 'text' : 'password'}
							value={formData.confirmPassword}
							onChange={handleInputChange}
							placeholder='Confirm new password'
							required
						/>
						<button
							type='button'
							className='absolute right-3 top-1/2 -translate-y-1/2'
							onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
							{showConfirmPassword ? (
								<EyeOff className='h-4 w-4' />
							) : (
								<Eye className='h-4 w-4' />
							)}
						</button>
					</div>
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
				{isLoading ? 'Resetting Password...' : 'Reset Password'}
			</Button>

			<div className='text-center text-sm text-gray-600'>
				Remember your password?{' '}
				<a href='/login' className='font-medium text-green-600 hover:text-green-700'>
					Sign in here
				</a>
			</div>
		</form>
	);
};

export default ResetPasswordForm;
