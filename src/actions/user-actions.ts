'use server';
import { connectToDatabase } from '@/lib/mongo';
import User from '@/models/User';

export async function getUser(id: string) {
	try {
		await connectToDatabase();
		const user = await User.findById(id);
		if (!user) {
			throw new Error('User not found');
		}
		return user;
	} catch (error) {
		throw new Error('Error getting user');
	}
}
