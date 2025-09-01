'use client';

import React, { ReactNode } from 'react';
import { ThemeContextProvider } from '@/context/themeContext';

const Providers = ({ children }: { children: ReactNode }) => {
	return <ThemeContextProvider>{children}</ThemeContextProvider>;
};

export default Providers;
