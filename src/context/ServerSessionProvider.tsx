import React, { ReactNode } from 'react';
import { SessionProvider } from '@/context/sessionContext';

interface User {
	id: string;
	email: string;
	name: string;
	username: string;
	position?: string;
	role: string;
	avatar?: string;
	isVerified?: boolean;
	isActive?: boolean;
}

interface ServerSessionProviderProps {
	children: ReactNode;
	initialUser: User;
}

const ServerSessionProvider = async ({ children, initialUser }: ServerSessionProviderProps) => {
	return <SessionProvider initialUser={initialUser}>{children}</SessionProvider>;
};

export default ServerSessionProvider;
