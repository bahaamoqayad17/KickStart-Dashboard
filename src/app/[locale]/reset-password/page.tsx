import React from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import Card, { CardBody, CardHeader, CardTitle } from '@/components/ui/Card';
import { Shield } from 'lucide-react';

// Force dynamic rendering for authenticated pages
export const dynamic = 'force-dynamic';

const ResetPasswordPage = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 px-4 py-12'>
			<div className='mx-auto max-w-md'>
				<Card className='shadow-xl'>
					<CardHeader className='space-y-4 text-center'>
						<CardTitle className='text-2xl font-bold text-gray-800'>
							<div className='mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
								<Shield className='h-8 w-8 text-green-600' />
							</div>
							Reset Your Password
						</CardTitle>
						<p className='text-sm text-gray-600'>
							Enter the verification code we sent to your email and choose a new
							password.
						</p>
					</CardHeader>
					<CardBody className='p-8'>
						<ResetPasswordForm />
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default ResetPasswordPage;
