'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import classNames from 'classnames';
import { useFormik } from 'formik';
import Validation from '@/components/form/Validation';
import FieldWrap from '@/components/form/FieldWrap';
import Icon from '@/components/icon/Icon';
import Input from '@/components/form/Input';
import Select from '@/components/form/Select';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SkillType } from '@/models/Skill';
import { CategoryType } from '@/models/Category';
import toast from 'react-hot-toast';
import Label from '@/components/form/Label';
import MultiSelect from '@/components/ui/MultiSelect';
import useDarkMode from '@/hooks/useDarkMode';
import { TDarkMode } from '@/types/darkMode.type';
import { useSession } from '@/context/sessionContext';

type TValues = {
	name: string;
	username: string;
	email: string;
	password: string;
	passwordConfirm: string;
	gender?: string;
	mobile_number?: string;
	position?: string;
};

type TFormErrors = {
	name?: string;
	username?: string;
	email?: string;
	password?: string;
	passwordConfirm?: string;
	gender?: string;
	mobile_number?: string;
};

const RegisterForm = () => {
	const router = useRouter();
	const { setDarkModeStatus } = useDarkMode();
	const { addUser } = useSession();
	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const [passwordConfirmShowStatus, setPasswordConfirmShowStatus] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			name: '',
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
			gender: '',
			mobile_number: '',
		},
		validate: (values: TValues) => {
			const errors: TFormErrors = {};

			// Name validation
			if (!values.name) {
				errors.name = 'Name is required';
			} else if (values.name.length < 2) {
				errors.name = 'Name must be at least 2 characters';
			} else if (values.name.length > 50) {
				errors.name = 'Name must be less than 50 characters';
			} else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
				errors.name = 'Name can only contain letters and spaces';
			}

			// Username validation
			if (!values.username) {
				errors.username = 'Username is required';
			} else if (values.username.length < 3) {
				errors.username = 'Username must be at least 3 characters';
			} else if (values.username.length > 20) {
				errors.username = 'Username must be less than 20 characters';
			} else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
				errors.username = 'Username can only contain letters, numbers, and underscores';
			}

			// Email validation
			if (!values.email) {
				errors.email = 'Email is required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			// Password validation
			if (!values.password) {
				errors.password = 'Password is required';
			} else if (values.password.length < 8) {
				errors.password = 'Password must be at least 8 characters';
			} else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(values.password)) {
				errors.password =
					'Password must contain at least one uppercase letter, one lowercase letter, and one number';
			}

			// Password confirmation validation
			if (!values.passwordConfirm) {
				errors.passwordConfirm = 'Password confirmation is required';
			} else if (values.password !== values.passwordConfirm) {
				errors.passwordConfirm = 'Passwords do not match';
			}

			// Mobile number validation (if provided)
			if (!values.mobile_number || !values.mobile_number.trim()) {
				errors.mobile_number = 'Invalid mobile number format';
			}

			return errors;
		},
		onSubmit: async (values: TValues, { setFieldError }) => {
			setIsLoading(true);

			try {
				const response = await fetch('/api/auth/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				});

				const data = await response.json();

				if (data.status) {
					// Registration successful
					toast.success(data.message || 'Registration successful!');
					setDarkModeStatus(data.user.appearance as TDarkMode);
					addUser({ ...data.user, role: data.user.role.name });
					router.replace('/');
				} else {
					// Registration failed
					toast.error(data.error || 'Registration failed');

					// Handle specific field errors using the field information from API
					if (data.field) {
						setFieldError(data.field, data.error);
					} else {
						// Fallback to pattern matching for older error responses
						const errorMessage = data.error.toLowerCase();

						if (
							errorMessage.includes('email') ||
							errorMessage.includes('user with this email')
						) {
							setFieldError('email', data.error);
						} else if (
							errorMessage.includes('username') ||
							errorMessage.includes('username already taken') ||
							errorMessage.includes('username already')
						) {
							setFieldError('username', data.error);
						} else {
							// For general errors, show in both fields
							setFieldError('email', data.error);
							setFieldError('username', data.error);
						}
					}
				}
			} catch (error) {
				console.error('Registration error:', error);
				toast.error('Registration failed. Please try again.');
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<div className='flex w-full max-w-md flex-col gap-6'>
			<div className='grid grid-cols-12 gap-4'>
				<div className='col-span-6'>
					<Button
						icon='CustomGoogle'
						variant='outline'
						color='zinc'
						size='lg'
						className='w-full'
						isDisable={isLoading}>
						Google
					</Button>
				</div>
				<div className='col-span-6'>
					<Button
						icon='CustomApple'
						variant='outline'
						color='zinc'
						size='lg'
						className='w-full'
						isDisable={isLoading}>
						Apple
					</Button>
				</div>
			</div>
			<div className='border border-zinc-500/25 dark:border-zinc-500/50' />
			<div>
				<span>Or continue with email address</span>
			</div>
			<form className='flex flex-col gap-4' noValidate onSubmit={formik.handleSubmit}>
				{/* Name */}
				<div className={classNames({ 'mb-2': !formik.isValid })}>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.name}
						invalidFeedback={formik.errors.name}
						validFeedback='Good'>
						<FieldWrap firstSuffix={<Icon icon='HeroUser' className='mx-2' />}>
							<Input
								dimension='lg'
								id='name'
								name='name'
								type='text'
								placeholder='Full Name *'
								value={formik.values.name}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
							/>
						</FieldWrap>
					</Validation>
				</div>

				{/* Username */}
				<div className={classNames({ 'mb-2': !formik.isValid })}>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.username}
						invalidFeedback={formik.errors.username}
						validFeedback='Good'>
						<FieldWrap firstSuffix={<Icon icon='HeroAtSymbol' className='mx-2' />}>
							<Input
								dimension='lg'
								id='username'
								name='username'
								type='text'
								placeholder='Username *'
								value={formik.values.username}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
							/>
						</FieldWrap>
					</Validation>
				</div>

				{/* Email */}
				<div className={classNames({ 'mb-2': !formik.isValid })}>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.email}
						invalidFeedback={formik.errors.email}
						validFeedback='Good'>
						<FieldWrap firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
							<Input
								dimension='lg'
								id='email'
								autoComplete='email'
								name='email'
								type='email'
								placeholder='Email address *'
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
							/>
						</FieldWrap>
					</Validation>
				</div>

				{/* Password */}
				<div className={classNames({ 'mb-2': !formik.isValid })}>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.password}
						invalidFeedback={formik.errors.password}
						validFeedback='Strong password'>
						<FieldWrap
							firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
							lastSuffix={
								<Icon
									className='mx-2 cursor-pointer'
									icon={passwordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
									onClick={() => setPasswordShowStatus(!passwordShowStatus)}
								/>
							}>
							<Input
								dimension='lg'
								type={passwordShowStatus ? 'text' : 'password'}
								autoComplete='new-password'
								id='password'
								name='password'
								placeholder='Password *'
								value={formik.values.password}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
							/>
						</FieldWrap>
					</Validation>
				</div>

				{/* Confirm Password */}
				<div className={classNames({ 'mb-2': !formik.isValid })}>
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.passwordConfirm}
						invalidFeedback={formik.errors.passwordConfirm}
						validFeedback='Passwords match'>
						<FieldWrap
							firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
							lastSuffix={
								<Icon
									className='mx-2 cursor-pointer'
									icon={passwordConfirmShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
									onClick={() =>
										setPasswordConfirmShowStatus(!passwordConfirmShowStatus)
									}
								/>
							}>
							<Input
								dimension='lg'
								type={passwordConfirmShowStatus ? 'text' : 'password'}
								autoComplete='new-password'
								id='passwordConfirm'
								name='passwordConfirm'
								placeholder='Confirm Password *'
								value={formik.values.passwordConfirm}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
							/>
						</FieldWrap>
					</Validation>
				</div>

				{/* Optional Fields Row */}
				<div className='grid grid-cols-2 gap-4'>
					{/* Mobile Number */}
					<Validation
						isValid={formik.isValid}
						isTouched={formik.touched.mobile_number}
						invalidFeedback={formik.errors.mobile_number}>
						<FieldWrap firstSuffix={<Icon icon='HeroPhone' className='mx-2' />}>
							<Input
								dimension='lg'
								id='mobile_number'
								name='mobile_number'
								type='tel'
								placeholder='Mobile Number'
								value={formik.values.mobile_number}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								disabled={isLoading}
							/>
						</FieldWrap>
					</Validation>

					{/* Gender */}
					<Select
						dimension='lg'
						id='gender'
						name='gender'
						value={formik.values.gender}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						disabled={isLoading}
						className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'>
						<option
							value=''
							className='bg-white text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400'>
							Select Gender
						</option>
						<option
							value='Male'
							className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'>
							Male
						</option>
						<option
							value='Female'
							className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'>
							Female
						</option>
						<option
							value='Other'
							className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'>
							Other
						</option>
					</Select>
				</div>

				<div>
					<Button
						size='lg'
						variant='solid'
						className='w-full font-semibold'
						isDisable={isLoading}
						onClick={() => formik.handleSubmit()}>
						{isLoading ? 'Creating Account...' : 'Create Account'}
					</Button>
				</div>
			</form>
			<div>
				<span className='text-sm text-zinc-500'>
					This site is protected by reCAPTCHA and the Google Privacy Policy.
				</span>
			</div>
			<div>
				<span className='flex gap-2 text-sm'>
					<span className='text-zinc-400 dark:text-zinc-600'>
						Already have an account?
					</span>
					<Link href='/login' className='cursor-pointer hover:text-inherit'>
						Sign in
					</Link>
				</span>
			</div>
		</div>
	);
};

export default RegisterForm;
