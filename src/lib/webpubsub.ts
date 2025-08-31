'use server';

import { WebPubSubServiceClient } from '@azure/web-pubsub';

interface AccessTokenResult {
	url: string;
	token: string;
	userId: string;
	username: string;
}

interface MessageData {
	type: string;
	[key: string]: unknown;
}

interface NotificationData {
	[key: string]: unknown;
}

// Initialize service client with environment variables
const getServiceClient = () => {
	const connectionString = process.env.NEXT_PUBLIC_AZURE_WEBPUBSUB_CONNECTION_STRING;
	const hubName = process.env.NEXT_PUBLIC_AZURE_WEBPUBSUB_HUB_NAME || 'freelancing_chat';

	if (!connectionString) {
		console.warn(
			'Azure WebPubSub connection string not found. Real-time features may not work.',
		);
		return null;
	}

	try {
		return new WebPubSubServiceClient(connectionString, hubName);
	} catch (error) {
		console.error('Failed to initialize WebPubSub service client:', error);
		return null;
	}
};

const serviceClient = getServiceClient();

// Generate access token for user with dynamic group permissions
export async function generateAccessToken(
	userId: string,
	username: string,
): Promise<AccessTokenResult> {
	try {
		if (!serviceClient) {
			throw new Error('WebPubSub service client not initialized');
		}

		const token = await serviceClient.getClientAccessToken({
			userId: userId,
			roles: [`webpubsub.joinLeaveGroup`, `webpubsub.sendToGroup`],
			expirationTimeInMinutes: 60,
		});

		return {
			url: token.url,
			token: token.token,
			userId: userId,
			username: username,
		};
	} catch (error: unknown) {
		console.error('Error generating access token:', error);
		throw new Error('Failed to generate access token');
	}
}

// Send message to conversation group
export async function sendMessageToConversation(
	conversationId: string,
	message: MessageData,
): Promise<void> {
	try {
		if (!serviceClient) {
			console.warn(
				'WebPubSub service client not available. Message will not be sent in real-time.',
			);
			return;
		}

		const groupName = `conversation-${conversationId}`;

		console.log('Sending message to group:', groupName, message);

		// Send message to the group in the correct format for client reception
		await serviceClient.group(groupName).sendToAll(message);
	} catch (error: unknown) {
		console.error('Error sending message to conversation:', error);
	}
}

// Send typing indicator
export async function sendTypingIndicator(
	conversationId: string,
	userId: string,
	username: string,
	isTyping: boolean,
): Promise<void> {
	try {
		if (!serviceClient) {
			console.warn(
				'WebPubSub service client not available. Typing indicator will not be sent.',
			);
			return;
		}

		const message: MessageData = {
			type: 'typing',
			userId,
			username,
			isTyping,
			timestamp: new Date().toISOString(),
		};

		// Send to all except the sender
		await serviceClient.sendToAll(message, {
			filter: `not(userId eq '${userId}')`,
		});
	} catch (error: unknown) {
		console.error('Error sending typing indicator:', error);
	}
}

// Add user to conversation group
export async function addUserToConversation(userId: string, conversationId: string): Promise<void> {
	try {
		if (!serviceClient) {
			console.warn(
				'WebPubSub service client not available. User cannot be added to conversation group.',
			);
			return;
		}

		const groupName = `conversation-${conversationId}`;
		await serviceClient.group(groupName).addUser(userId);
	} catch (error: unknown) {
		console.error('Error adding user to conversation:', error);
	}
}

// Remove user from conversation group
export async function removeUserFromConversation(
	userId: string,
	conversationId: string,
): Promise<void> {
	try {
		if (!serviceClient) {
			console.warn(
				'WebPubSub service client not available. User cannot be removed from conversation group.',
			);
			return;
		}

		const groupName = `conversation-${conversationId}`;
		const groupClient = serviceClient.group(groupName);
		await groupClient.removeUser(userId);
	} catch (error: unknown) {
		console.error('Error removing user from conversation:', error);
	}
}

// Send notification to user
export async function sendNotificationToUser(
	userId: string,
	notification: NotificationData,
): Promise<void> {
	try {
		if (!serviceClient) {
			console.warn('WebPubSub service client not available. Notification will not be sent.');
			return;
		}

		const message: MessageData = {
			type: 'notification',
			...notification,
			timestamp: new Date().toISOString(),
		};

		await serviceClient.sendToUser(userId, message);
	} catch (error: unknown) {
		console.error('Error sending notification to user:', error);
	}
}

// // Send user status update
// export async function broadcastUserStatus(
// 	userId: string,
// 	status: 'online' | 'offline',
// ): Promise<void> {
// 	try {
// 		const message: MessageData = {
// 			type: 'user-status',
// 			userId,
// 			status,
// 			timestamp: new Date().toISOString(),
// 		};

// 		const groupClient = serviceClient.group(`user-${userId}`);
// 		await groupClient.sendToAll(message);
// 	} catch (error: unknown) {
// 		console.error('Error broadcasting user status:', error);
// 	}
// }

// Health check function to verify connection
export async function checkWebPubSubConnection(): Promise<boolean> {
	try {
		if (!serviceClient) {
			return false;
		}

		// Try to generate a test token to verify connection
		const testToken = await serviceClient.getClientAccessToken({
			userId: 'test-user',
			expirationTimeInMinutes: 1,
		});

		return !!(testToken && testToken.url && testToken.token);
	} catch (error: unknown) {
		console.error('WebPubSub connection check failed:', error);
		return false;
	}
}
