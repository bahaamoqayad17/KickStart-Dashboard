import mongoose, { InferSchemaType } from 'mongoose';
import bcrypt from 'bcryptjs';
import { RoleType } from './Role';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 3,
			maxlength: 50,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		passwordConfirm: {
			type: String,
			required: true,
			minlength: 6,
		},
		name: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		mobile_number: {
			type: String,
			trim: true,
		},
		position: {
			type: String,
			trim: true,
			maxlength: 100,
		},
		bio: {
			type: String,
			maxlength: 1000,
		},
		gender: {
			type: String,
			enum: ['Male', 'Female', 'Other'],
			trim: true,
		},
		date_of_birth: {
			type: String,
			trim: true,
		},
		avatar: {
			type: String,
			trim: true,
			default: 'https://bariq.s3.eu-central-1.amazonaws.com/default-avatar.jpg',
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		role: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Role',
			default: '507f1f77bcf86cd799439025',
		},
		socialAuth: {
			google: {
				type: Boolean,
				default: false,
			},
			linkedin: {
				type: Boolean,
				default: false,
			},
		},
		appearance: {
			type: String,
			enum: ['light', 'dark'],
			default: 'light',
		},
		emailVerificationExpires: Date,
	},
	{
		timestamps: true,
	},
);

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword: string) {
	return bcrypt.compare(candidatePassword, this.password);
};

// Ensure virtual fields are serialized
userSchema.set('toJSON', {
	virtuals: true,
	transform: function (doc, ret) {
		delete (ret as any).password;
		delete (ret as any).passwordConfirm;
		return ret;
	},
});

export type UserType = Omit<InferSchemaType<typeof userSchema>, 'role'> & {
	_id: mongoose.Types.ObjectId | string;
	username: string;
	email: string;
	password?: string; // Optional because it gets deleted in toJSON
	passwordConfirm?: string; // Optional because it gets deleted in toJSON
	name: string;
	mobile_number?: string;
	position?: string;
	bio?: string;
	gender?: 'Male' | 'Female' | 'Other';
	date_of_birth?: string;
	avatar?: string;
	isVerified: boolean;
	isActive: boolean;
	role: mongoose.Types.ObjectId | string | RoleType;
	socialAuth: {
		google: boolean;
		linkedin: boolean;
	};
	appearance: 'light' | 'dark';
	__v: number;
	createdAt: Date;
	updatedAt: Date;
	emailVerificationExpires: Date;
};

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
