import { routing } from '@/locales/routing';

const purePathnameUtil = (pathname: string): string => {
	const changePattern = (lng: string): string => `/${lng}/`;

	const otherThanDefaultLanguage =
		routing.locales.map(changePattern).includes(pathname.substring(0, 4)) ||
		!!routing.locales.find((key) => pathname === `/${key}`);

	return otherThanDefaultLanguage ? pathname.substring(3, pathname.length) || '/' : pathname;
};
export default purePathnameUtil;
