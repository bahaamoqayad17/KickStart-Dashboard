import mongoose from 'mongoose';
import '../models/User';
import '../models/Role';
import '../models/Notification';
import '../models/Conversation';
import '../models/Message';
import '../models/PasswordReset';

const MONGODB_URI =
	'mongodb+srv://Projects:MW4oAAkNPNlhvwRl@projects.vvekv6h.mongodb.net/KickStart-Dashboard';

if (!MONGODB_URI) {
	throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
	try {
		mongoose.connect(MONGODB_URI).then((mongoose) => {
			console.log('✅ MongoDB Connected Successfully');
			console.log(`📊 Database: ${mongoose.connection.name}`);
			return mongoose;
		});
	} catch (error) {
		console.error('❌ Error connecting to MongoDB:', error);
		throw error;
	}
}
