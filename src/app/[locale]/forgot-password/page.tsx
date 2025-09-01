import React from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import Card, { CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { KeyRound } from 'lucide-react';

// Force dynamic rendering for authenticated pages
export const dynamic = 'force-dynamic';

const ForgotPasswordPage = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 px-4 py-12'>
			<div className='mx-auto max-w-md'>
				<Card className='shadow-xl'>
					<CardHeader className='space-y-4 text-center'>
						<CardTitle className='text-2xl font-bold text-gray-800'>
							<div className='mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100'>
								<KeyRound className='h-8 w-8 text-purple-600' />
							</div>
							Forgot Password?
						</CardTitle>

						<p className='text-sm text-gray-600'>
							No worries! Enter your email address and we'll send you a verification
							code to reset your password.
						</p>
					</CardHeader>
					<CardBody className='p-8'>
						<ForgotPasswordForm />
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default ForgotPasswordPage;
