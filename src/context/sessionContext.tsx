'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface User {
	id: string;
	_id: string;
	email: string;
	name: string;
	username: string;
	position?: string;
	role: string;
	avatar?: string;
	isVerified?: boolean;
	isActive?: boolean;
}

interface SessionContextType {
	user: User | null;
	isAuthenticated: boolean;
	logoutSession: () => Promise<void>;
	addUser: (user: User) => void;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const useSession = () => {
	const context = useContext(SessionContext);
	if (context === undefined) {
		throw new Error('useSession must be used within a SessionProvider');
	}
	return context;
};

interface SessionProviderProps {
	children: ReactNode;
	initialUser: User;
}

export const SessionProvider: React.FC<SessionProviderProps> = ({ children, initialUser }) => {
	const [user, setUser] = useState<User | null>(initialUser);
	const router = useRouter();

	const addUser = (user: User) => {
		setUser(user);
	};

	const logoutSession = async () => {
		setUser(null);
		router.replace('/login');
	};

	const value: SessionContextType = {
		user,
		isAuthenticated: !!user,
		logoutSession,
		addUser,
	};

	return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};
