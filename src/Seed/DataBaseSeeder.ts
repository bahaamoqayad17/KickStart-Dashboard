import fs from 'fs';
import mongoose from 'mongoose';
import process from 'process';

// Import all models
import User from '../models/User';
import Role from '../models/Role';
import Category from '../models/Category';
import Skill from '../models/Skill';
import Client from '../models/Client';
import Project from '../models/Project';
import Task from '../models/Task';
import Employee from '../models/Employee';
import Supplier from '../models/Supplier';
import Wallet from '../models/Wallet';
import Bill from '../models/Bill';
import Receipt from '../models/Receipt';
import Payment from '../models/Payment';
import Notification from '../models/Notification';
import Conversation from '../models/Conversation';
import Message from '../models/Message';
import Proposal from '../models/Proposal';
import KYCRecord from '../models/KYCRecord';
import ProjectGallery from '../models/ProjectGallery';
import SystemSetting from '../models/SystemSetting';

const MONGODB_URI =
	'mongodb+srv://Projects:MW4oAAkNPNlhvwRl@projects.vvekv6h.mongodb.net/Freelancing-Bariq';

mongoose
	.connect(MONGODB_URI)
	.then((mongoose) => {
		console.log('✅ MongoDB Connected Successfully');
		console.log(`📊 Database: ${mongoose.connection.name}`);
	})
	.catch((err) => {
		console.log('❌ Error connecting to MongoDB:', err);
	});

// Load seed data
const users = JSON.parse(fs.readFileSync('./src/Seed/users.json', 'utf-8'));
const roles = JSON.parse(fs.readFileSync('./src/Seed/roles.json', 'utf-8'));
const categories = JSON.parse(fs.readFileSync('./src/Seed/categories.json', 'utf-8'));
const skills = JSON.parse(fs.readFileSync('./src/Seed/skills.json', 'utf-8'));
// const clients = JSON.parse(fs.readFileSync('./src/Seed/clients.json', 'utf-8'));
// const projects = JSON.parse(fs.readFileSync('./src/Seed/projects.json', 'utf-8'));
// const tasks = JSON.parse(fs.readFileSync('./src/Seed/tasks.json', 'utf-8'));
// const employees = JSON.parse(fs.readFileSync('./src/Seed/employees.json', 'utf-8'));
// const suppliers = JSON.parse(fs.readFileSync('./src/Seed/suppliers.json', 'utf-8'));
const wallets = JSON.parse(fs.readFileSync('./src/Seed/wallets.json', 'utf-8'));
// const bills = JSON.parse(fs.readFileSync('./src/Seed/bills.json', 'utf-8'));
// const receipts = JSON.parse(fs.readFileSync('./src/Seed/receipts.json', 'utf-8'));
// const payments = JSON.parse(fs.readFileSync('./src/Seed/payments.json', 'utf-8'));
// const notifications = JSON.parse(fs.readFileSync('./src/Seed/notifications.json', 'utf-8'));
// const conversations = JSON.parse(fs.readFileSync('./src/Seed/conversations.json', 'utf-8'));
// const messages = JSON.parse(fs.readFileSync('./src/Seed/messages.json', 'utf-8'));
// const proposals = JSON.parse(fs.readFileSync('./src/Seed/proposals.json', 'utf-8'));
// const kycRecords = JSON.parse(fs.readFileSync('./src/Seed/kyc-records.json', 'utf-8'));
// const projectGalleries = JSON.parse(fs.readFileSync('./src/Seed/project-galleries.json', 'utf-8'));
const systemSettings = JSON.parse(fs.readFileSync('./src/Seed/system-settings.json', 'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
	try {
		// Insert data in order of dependencies
		console.log('Inserting Roles...');
		await Role.insertMany(roles);

		console.log('Inserting Categories...');
		await Category.insertMany(categories);

		console.log('Inserting Skills...');
		await Skill.insertMany(skills);

		console.log('Inserting Users...');
		await User.insertMany(users);

		// console.log('Inserting Clients...');
		// await Client.insertMany(clients);

		// console.log('Inserting Employees...');
		// await Employee.insertMany(employees);

		// console.log('Inserting Suppliers...');
		// await Supplier.insertMany(suppliers);

		// console.log('Inserting Projects...');
		// await Project.insertMany(projects);

		// console.log('Inserting Tasks...');
		// await Task.insertMany(tasks);

		console.log('Inserting Wallets...');
		await Wallet.insertMany(wallets);

		// console.log('Inserting Bills...');
		// await Bill.insertMany(bills);

		// console.log('Inserting Receipts...');
		// await Receipt.insertMany(receipts);

		// console.log('Inserting Payments...');
		// await Payment.insertMany(payments);

		// console.log('Inserting Notifications...');
		// await Notification.insertMany(notifications);

		// console.log('Inserting Conversations...');
		// await Conversation.insertMany(conversations);

		// console.log('Inserting Messages...');
		// await Message.insertMany(messages);

		// console.log('Inserting Proposals...');
		// await Proposal.insertMany(proposals);

		// console.log('Inserting KYC Records...');
		// await KYCRecord.insertMany(kycRecords);

		// console.log('Inserting Project Galleries...');
		// await ProjectGallery.insertMany(projectGalleries);

		console.log('Inserting System Settings...');
		await SystemSetting.insertMany(systemSettings);

		console.log('All Data Successfully Inserted!');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
	try {
		console.log('Deleting all data...');
		await User.deleteMany();
		await Role.deleteMany();
		await Category.deleteMany();
		await Skill.deleteMany();
		await Client.deleteMany();
		await Project.deleteMany();
		await Task.deleteMany();
		await Employee.deleteMany();
		await Supplier.deleteMany();
		await Wallet.deleteMany();
		await Bill.deleteMany();
		await Receipt.deleteMany();
		await Payment.deleteMany();
		await Notification.deleteMany();
		await Conversation.deleteMany();
		await Message.deleteMany();
		await Proposal.deleteMany();
		await KYCRecord.deleteMany();
		await ProjectGallery.deleteMany();
		await SystemSetting.deleteMany();

		console.log('All Data Successfully Deleted!');
	} catch (err) {
		console.log(err);
	}
	process.exit();
};

if (process.argv[2] === '--seed') {
	importData();
} else if (process.argv[2] === '--delete') {
	deleteData();
}
