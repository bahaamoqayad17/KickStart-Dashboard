import mongoose, { InferSchemaType } from 'mongoose';
import { ConversationType } from './Conversation';
import { UserType } from './User';

const messageSchema = new mongoose.Schema(
	{
		conversation: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Conversation',
			required: true,
		},
		sender: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		content: {
			type: String,
			trim: true,
			// Content is optional for file/audio messages
		},
		message_type: {
			type: String,
			enum: ['text', 'image', 'file', 'audio'],
			default: 'text',
		},
		// Support for multiple users reading (for group chats)
		read_by: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'User',
					required: true,
				},
				read_at: {
					type: Date,
					default: Date.now,
				},
			},
		],
		// Legacy field for backward compatibility
		isRead: {
			type: Boolean,
			default: false,
		},
		// Attachments for file/image/audio messages
		attachments: [
			{
				filename: {
					type: String,
					required: true,
				},
				url: {
					type: String,
					required: true,
				},
				file_type: {
					type: String,
					required: true,
				},
				file_size: {
					type: Number,
					required: true,
				},
				duration: {
					type: Number, // For audio messages (in seconds)
				},
			},
		],
		// Message status
		is_edited: {
			type: Boolean,
			default: false,
		},
		edited_at: {
			type: Date,
		},
		is_deleted: {
			type: Boolean,
			default: false,
		},
		deleted_at: {
			type: Date,
		},
		// For system messages
		metadata: {
			type: mongoose.Schema.Types.Mixed,
		},
	},
	{
		timestamps: true,
	},
);

// Indexes for performance
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ sender: 1 });
messageSchema.index({ 'read_by.user': 1 });

// Pre-find middleware using regex pattern
messageSchema.pre(/^find/, function (this: mongoose.Query<MessageType[], MessageType>) {
	this.populate('conversation').populate('sender');
});

export type MessageType = Omit<InferSchemaType<typeof messageSchema>, 'conversation' | 'sender'> & {
	_id: mongoose.Types.ObjectId | string;
	conversation: mongoose.Types.ObjectId | string | ConversationType;
	sender: mongoose.Types.ObjectId | string | UserType;
};

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
