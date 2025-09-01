'use client';

import React, { useState } from 'react';
import PageWrapper from '@/components/layouts/PageWrapper/PageWrapper';
import Button from '@/components/ui/Button';
import classNames from 'classnames';
import { useFormik } from 'formik';
import LogoTemplate from '@/templates/layouts/Logo/Logo.template';
import Validation from '@/components/form/Validation';
import FieldWrap from '@/components/form/FieldWrap';
import Icon from '@/components/icon/Icon';
import Input from '@/components/form/Input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useDarkMode from '@/hooks/useDarkMode';
import { TDarkMode } from '@/types/darkMode.type';
import { useSession } from '@/context/sessionContext';

type TValues = {
	email: string;
	password: string;
	rememberMe: boolean;
};

const LoginPage = () => {
	const router = useRouter();
	const { addUser } = useSession();
	const { setDarkModeStatus } = useDarkMode();
	const [passwordShowStatus, setPasswordShowStatus] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: true,
		},
		validate: (values: TValues) => {
			const errors: Partial<TValues> = {};

			if (!values.email) {
				errors.email = 'Required';
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
				errors.email = 'Invalid email address';
			}

			if (!values.password) {
				errors.password = 'Required';
			}

			return errors;
		},
		onSubmit: async (values: TValues, { setFieldError }) => {
			setIsLoading(true);

			try {
				const response = await fetch('/api/auth/login', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: values.email,
						password: values.password,
						rememberMe: values.rememberMe,
					}),
				});

				const data = await response.json();

				if (data.status) {
					setDarkModeStatus(data.user.appearance as TDarkMode);
					addUser({ ...data.user, role: data.user.role.name });
					router.replace('/');
				} else {
					// Login failed
					setFieldError('email', data.error);
					setFieldError('password', data.error);
				}
			} catch (error) {
				console.error('Login error:', error);
				setFieldError('email', 'Login failed. Please try again.');
				setFieldError('password', 'Login failed. Please try again.');
			} finally {
				setIsLoading(false);
			}
		},
	});

	return (
		<PageWrapper className='bg-white dark:bg-inherit'>
			<div className='container mx-auto flex h-full items-center justify-center'>
				<div className='flex max-w-sm flex-col gap-8'>
					<div>
						<Link href='/' aria-label='Logo'>
							<LogoTemplate className='h-12' />
						</Link>
					</div>
					<div>
						<span className='text-4xl font-semibold'>Sign in</span>
					</div>
					<div>
						<span>Sign up with Open account</span>
					</div>
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
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.email}
								invalidFeedback={formik.errors.email}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroEnvelope' className='mx-2' />}>
									<Input
										dimension='lg'
										id='email'
										autoComplete='email'
										name='email'
										type='email'
										placeholder='Email address'
										value={formik.values.email}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={isLoading}
									/>
								</FieldWrap>
							</Validation>
						</div>
						<div
							className={classNames({
								'mb-2': !formik.isValid,
							})}>
							<Validation
								isValid={formik.isValid}
								isTouched={formik.touched.password}
								invalidFeedback={formik.errors.password}
								validFeedback='Good'>
								<FieldWrap
									firstSuffix={<Icon icon='HeroKey' className='mx-2' />}
									lastSuffix={
										<Icon
											className='mx-2 cursor-pointer'
											icon={passwordShowStatus ? 'HeroEyeSlash' : 'HeroEye'}
											onClick={() => {
												setPasswordShowStatus(!passwordShowStatus);
											}}
										/>
									}>
									<Input
										dimension='lg'
										type={passwordShowStatus ? 'text' : 'password'}
										autoComplete='current-password'
										id='password'
										name='password'
										placeholder='Password'
										value={formik.values.password}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										disabled={isLoading}
									/>
								</FieldWrap>
							</Validation>
						</div>

						<div className='flex justify-end'>
							<Link
								href='/forgot-password'
								className='text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'>
								Forgot your password?
							</Link>
						</div>

						<div className='flex items-center gap-2'>
							<input
								type='checkbox'
								id='rememberMe'
								name='rememberMe'
								checked={formik.values.rememberMe}
								onChange={formik.handleChange}
								className='rounded border-gray-300'
								disabled={isLoading}
							/>
							<label
								htmlFor='rememberMe'
								className='text-sm text-gray-600 dark:text-gray-400'>
								Remember me for 30 days
							</label>
						</div>

						<div>
							<Button
								size='lg'
								variant='solid'
								className='w-full font-semibold'
								isDisable={isLoading}
								onClick={() => formik.handleSubmit()}>
								{isLoading ? 'Signing in...' : 'Sign in'}
							</Button>
						</div>
					</form>
					<div>
						<span className='text-zinc-500'>
							This site is protected by reCAPTCHA and the Google Privacy Policy.
						</span>
					</div>
					<div>
						<span className='flex gap-2 text-sm'>
							<span className='text-zinc-400 dark:text-zinc-600'>
								Don't have an account?
							</span>
							<span
								className='cursor-pointer hover:text-inherit'
								onClick={() => {
									router.push('/register');
								}}>
								Register
							</span>
						</span>
					</div>
				</div>
			</div>
		</PageWrapper>
	);
};

export default LoginPage;
