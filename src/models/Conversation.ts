import mongoose, { InferSchemaType } from 'mongoose';
import { UserType } from './User';
import { MessageType } from './Message';

const conversationSchema = new mongoose.Schema(
	{
		participants: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
				required: true,
			},
		],
		last_message: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		},
		// Optional title for group conversations (when participants > 2)
		title: {
			type: String,
			trim: true,
		},
		// Last activity timestamp
		last_activity: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

// Indexes for performance
conversationSchema.index({ participants: 1 });
conversationSchema.index({ last_activity: -1 });

export type ConversationType = Omit<
	InferSchemaType<typeof conversationSchema>,
	'participants' | 'last_message'
> & {
	_id: mongoose.Types.ObjectId | string;
	participants: mongoose.Types.ObjectId[] | string[] | UserType[];
	last_message: mongoose.Types.ObjectId | string | MessageType;
};

const Conversation =
	mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema);

export default Conversation;
