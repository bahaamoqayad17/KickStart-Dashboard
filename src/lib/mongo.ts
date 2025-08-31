import mongoose from 'mongoose';
import '../models/User';
import '../models/Role';
import '../models/Category';
import '../models/Skill';
import '../models/Client';
import '../models/Project';
import '../models/Task';
import '../models/Employee';
import '../models/Supplier';
import '../models/Wallet';
import '../models/Bill';
import '../models/Receipt';
import '../models/Payment';
import '../models/Notification';
import '../models/Conversation';
import '../models/Message';
import '../models/Proposal';
import '../models/KYCRecord';
import '../models/ProjectGallery';
import '../models/SystemSetting';
import '../models/PasswordReset';

const MONGODB_URI =
	'mongodb+srv://Projects:MW4oAAkNPNlhvwRl@projects.vvekv6h.mongodb.net/Freelancing-Bariq';

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
