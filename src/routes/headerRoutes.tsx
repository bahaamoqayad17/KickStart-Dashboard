import React from 'react';
import { appPages, authPages, componentsPages } from '@/config/pages.config';
import { TRoute } from '@/types/route.type';
import DefaultHeaderTemplate from '../templates/layouts/Headers/DefaultHeader.template';
import ComponentAndTemplateHeaderTemplate from '../templates/layouts/Headers/ComponentAndTemplateHeader.template';
import SiteHeaderTemplate from '@/templates/layouts/Headers/SiteHeader.template';

const headerRoutes: TRoute[] = [
	{ path: authPages.loginPage.to, element: null },
	{
		path: `${componentsPages.uiPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: `${componentsPages.integratedPages.to}/*`,
		element: <ComponentAndTemplateHeaderTemplate />,
	},
	{
		path: appPages.projectAppPages.subPages.projectDashboardPage.to,
		element: null,
	},
	{
		path: '/admin',
		element: null,
	},
	{
		path: '/',
		element: <SiteHeaderTemplate />,
	},
	{ path: '/admin/*', element: <DefaultHeaderTemplate /> },
];

export default headerRoutes;
