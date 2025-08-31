import React from 'react';
import HomeClient from './_client';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]';

const Home = () => {
	// const session = await getServerSession(authOptions);
	// console.log(session);

	return (

			<HomeClient />
		
	);
};

export default Home;
