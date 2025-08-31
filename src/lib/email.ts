import {
	TransactionalEmailsApi,
	SendSmtpEmail,
	SendSmtpEmailTo,
	TransactionalEmailsApiApiKeys,
} from 'sib-api-v3-typescript';

export interface EmailOptions {
	to: { email: string; name?: string }[];
	subject: string;
	htmlContent: string;
	sender?: { email: string; name?: string };
}

export interface EmailResponse {
	success: boolean;
	messageId?: string;
	error?: string;
}

export async function sendEmail(options: EmailOptions): Promise<EmailResponse> {
	const { to, subject, htmlContent, sender } = options;

	const apiInstance = new TransactionalEmailsApi();
	apiInstance.setApiKey(
		TransactionalEmailsApiApiKeys.apiKey,
		process.env.NEXT_PUBLIC_BREVO_API_KEY as string,
	);

	const email = new SendSmtpEmail();
	email.sender = sender || {
		name: process.env.NEXT_PUBLIC_BREVO_SENDER_NAME as string,
		email: process.env.NEXT_PUBLIC_BREVO_SENDER_EMAIL as string,
	};
	email.to = to as SendSmtpEmailTo[];
	email.subject = subject;
	email.htmlContent = htmlContent;

	try {
		const response = await apiInstance.sendTransacEmail(email);
		return {
			success: true,
			messageId: response.body?.messageId,
		};
	} catch (error: any) {
		console.error('Brevo email error:', error);
		return {
			success: false,
			error: error?.body?.message || 'Email sending failed',
		};
	}
}

export const emailTemplates = {
	roleChange: (recipientName: string, role: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Role Change Notification</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your role has been updated</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          Your user role has been updated to ${role}, please login again to access your new permissions.
        </p>
      </div>
	  <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/login" style="background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
          Login
        </a>
      </div>
	  <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2025 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,

	passwordReset: (recipientName: string, verificationCode: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Password Reset Request</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">We received a request to reset your password</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          You requested a password reset for your account. Use the verification code below to reset your password:
        </p>

        <div style="background: white; border: 2px dashed #667eea; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
          <h3 style="color: #667eea; font-size: 28px; margin: 0; letter-spacing: 4px; font-weight: bold;">
            ${verificationCode}
          </h3>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.6; margin: 20px 0 0 0;">
          <strong>Important:</strong> This code will expire in 15 minutes. If you didn't request this password reset, please ignore this email.
        </p>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2024 Bariq Platform. All rights reserved.</p>
        <p>If you have any questions, please contact our support team.</p>
      </div>
    </div>
  `,

	welcome: (recipientName: string, dashboardUrl: string = '/dashboard'): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Welcome to Bariq Platform!</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Your account has been successfully created</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          Welcome to our Bariq platform! We're excited to have you on board.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${dashboardUrl}" style="background: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Go to Dashboard
          </a>
        </div>

        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          Get started by exploring projects, connecting with clients, or showcasing your skills. <br> And create your own projects and start freelancing.
        </p> <br>
        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          If you have any questions, please contact our support team.
        </p>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2024 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,

	customNotification: (recipientName: string, title: string, message: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">${title}</h1>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">${message}</p> <br>
        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          If you have any questions, please contact our support team.
        </p>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2025 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,

	projectNotification: (
		recipientName: string,
		projectTitle: string,
		projectId: string,
	): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #2196F3 0%, #1976D2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Project Update</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new project notification</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          There's an update regarding the project: <strong>${projectTitle}</strong>
        </p>

        <div style="background: white; border-left: 4px solid #2196F3; padding: 15px; margin: 20px 0;">
          <p style="margin: 0; color: #333; font-weight: bold;">Project Assignment</p> <br>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            If you have any questions, please contact our support team.
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/projects/${projectId}" style="background: #2196F3; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            View Project
          </a>
        </div>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2024 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,

	chatNotification: (
		recipientName: string,
		senderName: string,
		messagePreview: string,
		chatUrl: string,
	): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">New Message</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new message</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          You received a new message from <strong>${senderName}</strong>:
        </p>

        <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #9C27B0;">
          <p style="margin: 0; color: #333; font-style: italic;">"${messagePreview}"</p>
        </div> <br>
        <p style="color: #666; font-size: 14px; line-height: 1.6;">
          If you have any questions, please contact our support team.
        </p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${chatUrl}" style="background: #9C27B0; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            Open Chat
          </a>
        </div>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2024 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,

	paymentNotification: (
		recipientName: string,
		amount: string,
		currency: string,
		paymentType: string,
		invoiceUrl?: string,
	): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #FF9800 0%, #F57C00 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Payment Notification</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">Payment update for your account</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          This is to notify you about a payment update:
        </p>

        <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
          <h3 style="margin: 0 0 10px 0; color: #FF9800;">${paymentType}</h3>
          <p style="margin: 0; font-size: 24px; font-weight: bold; color: #333;">
            ${currency} ${amount}
          </p> <br>
          <p style="color: #666; font-size: 14px; line-height: 1.6;">
            If you have any questions, please contact our support team.
          </p>
        </div>

        ${
			invoiceUrl
				? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${invoiceUrl}" style="background: #FF9800; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
            View Invoice
          </a>
        </div>
        `
				: ''
		}
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2024 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,

	registrationConfirmation: (recipientName: string, activationUrl: string): string => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); padding: 30px; border-radius: 10px; text-align: center; color: white;">
        <h1 style="margin: 0; font-size: 24px;">Registration Confirmation</h1>
        <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new registration confirmation</p>
      </div>

      <div style="padding: 30px; background: #f8f9fa; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #333; margin: 0 0 15px 0;">Hello ${recipientName},</h2>
        <p style="color: #666; line-height: 1.6; margin: 0 0 20px 0;">
          Thank you for registering with our Bariq platform! To complete your registration and activate your account, please click the button below:
        </p>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${activationUrl}" style="background: #4CAF50; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
          Activate Account
        </a>
      </div>

      <p style="color: #666; font-size: 14px; line-height: 1.6;">
        If the button doesn't work, you can also copy and paste this link into your browser:
        <br><a href="${activationUrl}" style="color: #4CAF50;">${activationUrl}
        </a>
      </p>

      <div style="text-align: center; color: #999; font-size: 12px; padding: 20px;">
        <p>© 2025 Bariq Platform. All rights reserved.</p>
      </div>
    </div>
  `,
};

export async function sendPasswordResetEmail(
	recipientEmail: string,
	recipientName: string,
	verificationCode: string,
): Promise<EmailResponse> {
	return sendEmail({
		to: [{ email: recipientEmail, name: recipientName }],
		subject: 'Password Reset Verification Code',
		htmlContent: emailTemplates.passwordReset(recipientName, verificationCode),
	});
}

export async function sendWelcomeEmail(
	recipientEmail: string,
	recipientName: string,
	dashboardUrl?: string,
): Promise<EmailResponse> {
	return sendEmail({
		to: [{ email: recipientEmail, name: recipientName }],
		subject: 'Welcome to Bariq Platform!',
		htmlContent: emailTemplates.welcome(recipientName, dashboardUrl),
	});
}

export async function sendChatNotificationEmail(
	recipientEmail: string,
	recipientName: string,
	senderName: string,
	messagePreview: string,
	chatUrl: string,
): Promise<EmailResponse> {
	return sendEmail({
		to: [{ email: recipientEmail, name: recipientName }],
		subject: `New message from ${senderName}`,
		htmlContent: emailTemplates.chatNotification(
			recipientName,
			senderName,
			messagePreview,
			chatUrl,
		),
	});
}

export async function sendPaymentNotificationEmail(
	recipientEmail: string,
	recipientName: string,
	amount: string,
	currency: string,
	paymentType: string,
	invoiceUrl?: string,
): Promise<EmailResponse> {
	return sendEmail({
		to: [{ email: recipientEmail, name: recipientName }],
		subject: `Payment ${paymentType} - ${currency} ${amount}`,
		htmlContent: emailTemplates.paymentNotification(
			recipientName,
			amount,
			currency,
			paymentType,
			invoiceUrl,
		),
	});
}

export async function sendBulkEmail(
	recipients: { email: string; name?: string }[],
	subject: string,
	htmlContent: string,
	options?: Partial<EmailOptions>,
): Promise<EmailResponse[]> {
	const emailPromises = recipients.map((recipient) =>
		sendEmail({
			to: [{ email: recipient.email, name: recipient.name || '' }],
			subject,
			htmlContent,
			...options,
		}),
	);

	return Promise.all(emailPromises);
}

export async function sendTestEmail(
	recipientEmail: string,
	testType: 'welcome' | 'password-reset' | 'project' | 'chat' | 'payment' = 'welcome',
): Promise<EmailResponse> {
	const testData = {
		welcome: () => sendWelcomeEmail(recipientEmail, 'Test User'),
		'password-reset': () => sendPasswordResetEmail(recipientEmail, 'Test User', '123456'),
		project: () =>
			sendProjectNotificationEmail(
				recipientEmail,
				'Test User',
				'Test Project',
				'Project assigned to you',
				'#',
			),
		chat: () =>
			sendChatNotificationEmail(
				recipientEmail,
				'Test User',
				'John Doe',
				'Hello, this is a test message!',
				'#',
			),
		payment: () =>
			sendPaymentNotificationEmail(
				recipientEmail,
				'Test User',
				'100.00',
				'USD',
				'Payment Received',
			),
	};

	return testData[testType]();
}
