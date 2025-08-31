import mongoose, { InferSchemaType } from 'mongoose';
import { UserType } from './User';

const notificationSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		title: {
			type: String,
			required: true,
			trim: true,
		},
		message: {
			type: String,
			required: true,
			trim: true,
		},
		type: {
			type: String,
			enum: ['info', 'success', 'warning', 'error'],
			default: 'info',
		},
		action: {
			type: String,
		},
		relatedId: {
			type: String,
		},
		relatedModel: {
			type: String,
		},
		isRead: {
			type: Boolean,
			default: false,
		},
		readAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

// Pre-find middleware using regex pattern
notificationSchema.pre(
	/^find/,
	function (this: mongoose.Query<NotificationType[], NotificationType>) {
		this.populate('user');
	},
);

export type NotificationType = Omit<InferSchemaType<typeof notificationSchema>, 'user'> & {
	_id: mongoose.Types.ObjectId | string;
	user: mongoose.Types.ObjectId | string | UserType;
};

const Notification =
	mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;
