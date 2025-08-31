import React from 'react';
import { appPages } from '@/config/pages.config';
import { TRoute } from '@/types/route.type';
import MailAsideTemplate from '@/templates/layouts/Asides/MailAside.template';
import DefaultAsideTemplate from '../templates/layouts/Asides/DefaultAside.template';

const asideRoutes: TRoute[] = [
	{
		path: `${appPages.mailAppPages.to}/*`,
		element: <MailAsideTemplate />,
	},
	{ path: '/*', element: <DefaultAsideTemplate /> },
	{ path: '/login', element: null },
	{ path: '/register', element: null },
	{ path: '/forgot-password', element: null },
	{ path: '/reset-password', element: null },
	{ path: '/*', element: <DefaultAsideTemplate /> },
];

export default asideRoutes;
