import React from 'react';
import { Link } from '@/locales/navigation';
import { useLocale } from 'next-intl';

const SiteHeaderRightCommon = () => {
	const locale = useLocale();

	return (
		<div className='flex items-center gap-2'>
			<Link href='/admin' locale={locale} className='btn btn-sm btn-outline-primary'>
				Admin Panel
			</Link>
			<Link href='/login' locale={locale} className='btn btn-sm btn-primary'>
				Login
			</Link>
		</div>
	);
};

export default SiteHeaderRightCommon;
