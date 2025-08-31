// Email template configurations for different notification actions

export interface EmailTemplateData {
	title: string;
	subject: string;
	template: (data: any) => string;
}

export const emailTemplates: Record<string, EmailTemplateData> = {
	// Project related notifications
	CREATE_NEW_PROJECT: {
		title: 'New Project Added',
		subject: 'New project added from sales team',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #333;">New Project Added</h2>
				<p>Hello,</p>
				<p>A new project has been added by the sales team:</p>
				<div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 15px 0;">
					<h3 style="color: #6366f1; margin: 0 0 10px 0;">${data.projectTitle}</h3>
					<p style="margin: 5px 0;"><strong>Client:</strong> ${data.clientName}</p>
					<p style="margin: 5px 0;"><strong>Budget:</strong> $${data.budget}</p>
					<p style="margin: 5px 0;"><strong>Deadline:</strong> ${data.deadline}</p>
					<p style="margin: 5px 0;"><strong>Description:</strong> ${data.description}</p>
				</div>
				<p>Please review and take necessary action.</p>
				<a href="${data.projectUrl}" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Project</a>
			</div>
		`,
	},

	PROJECT_ACCEPTED: {
		title: 'Project Accepted',
		subject: 'New project release check it now',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #10b981;">Project Accepted</h2>
				<p>Hello,</p>
				<p>Great news! A project has been accepted and is now ready for release:</p>
				<div style="background: #f0fdf4; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #10b981;">
					<h3 style="color: #059669; margin: 0 0 10px 0;">${data.projectTitle}</h3>
					<p style="margin: 5px 0;"><strong>Status:</strong> Accepted</p>
					<p style="margin: 5px 0;"><strong>Client:</strong> ${data.clientName}</p>
				</div>
				<p>You can now proceed with the project release.</p>
				<a href="${data.projectUrl}" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Project</a>
			</div>
		`,
	},

	PROJECT_ASSIGN: {
		title: 'New Project Assignment',
		subject: 'You have new project assign to you',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #6366f1;">New Project Assignment</h2>
				<p>Hello ${data.assigneeName},</p>
				<p>You have been assigned to a new project:</p>
				<div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #6366f1;">
					<h3 style="color: #4f46e5; margin: 0 0 10px 0;">${data.projectTitle}</h3>
					<p style="margin: 5px 0;"><strong>Role:</strong> ${data.assigneeRole}</p>
					<p style="margin: 5px 0;"><strong>Client:</strong> ${data.clientName}</p>
					<p style="margin: 5px 0;"><strong>Deadline:</strong> ${data.deadline}</p>
				</div>
				<p>Please check the project details and start working on it.</p>
				<a href="${data.projectUrl}" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Project</a>
			</div>
		`,
	},

	FREELANCER_REGISTRATION: {
		title: 'New Freelancer Registration',
		subject: 'New freelancer register',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #6366f1;">New Freelancer Registration</h2>
				<p>Hello,</p>
				<p>A new freelancer has registered on the platform:</p>
				<div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 15px 0;">
					<h3 style="color: #4f46e5; margin: 0 0 10px 0;">${data.freelancerName}</h3>
					<p style="margin: 5px 0;"><strong>Email:</strong> ${data.email}</p>
					<p style="margin: 5px 0;"><strong>Username:</strong> ${data.username}</p>
					<p style="margin: 5px 0;"><strong>Skills:</strong> ${data.skills}</p>
					<p style="margin: 5px 0;"><strong>Industry:</strong> ${data.industry}</p>
				</div>
				<p>Please review the freelancer profile and take necessary action.</p>
				<a href="${data.profileUrl}" style="background: #6366f1; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">View Profile</a>
			</div>
		`,
	},

	REGISTRATION_CONFIRMATION: {
		title: 'Registration Confirmation',
		subject: 'Activate user data using email link',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #6366f1;">Welcome to Our Platform!</h2>
				<p>Hello ${data.userName},</p>
				<p>Thank you for registering! Please activate your account by clicking the link below:</p>
				<div style="background: #f8fafc; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center;">
					<a href="${data.activationUrl}" style="background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">Activate Account</a>
				</div>
				<p>If you didn't create this account, please ignore this email.</p>
				<p style="color: #666; font-size: 14px;">This link will expire in 24 hours.</p>
			</div>
		`,
	},

	CHANGE_USER_ROLE: {
		title: 'User Role Changed',
		subject: 'Your role has been updated',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #f59e0b;">Role Update Notification</h2>
				<p>Hello ${data.userName},</p>
				<p>Your user role has been updated:</p>
				<div style="background: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0; border-left: 4px solid #f59e0b;">
					<p style="margin: 5px 0;"><strong>Previous Role:</strong> ${data.previousRole}</p>
					<p style="margin: 5px 0;"><strong>New Role:</strong> ${data.newRole}</p>
				</div>
				<p>Please sign in again to access your new permissions.</p>
				<a href="${data.loginUrl}" style="background: #f59e0b; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Sign In</a>
			</div>
		`,
	},

	REQUEST_WITHDRAWAL: {
		title: 'Withdrawal Request',
		subject: 'New withdrawal request',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #10b981;">Withdrawal Request</h2>
				<p>Hello,</p>
				<p>A freelancer has requested a new payroll withdrawal:</p>
				<div style="background: #f0fdf4; padding: 15px; border-radius: 5px; margin: 15px 0;">
					<h3 style="color: #059669; margin: 0 0 10px 0;">${data.freelancerName}</h3>
					<p style="margin: 5px 0;"><strong>Amount:</strong> $${data.amount}</p>
					<p style="margin: 5px 0;"><strong>Payment Method:</strong> ${data.paymentMethod}</p>
					<p style="margin: 5px 0;"><strong>Account Details:</strong> ${data.accountDetails}</p>
				</div>
				<p>Please review and process the withdrawal request.</p>
				<a href="${data.withdrawalUrl}" style="background: #10b981; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Process Withdrawal</a>
			</div>
		`,
	},

	CUSTOM_NOTIFICATION: {
		title: 'Important Notification',
		subject: 'Important notification from administration',
		template: (data) => `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
				<h2 style="color: #6366f1;">${data.title || 'Important Notification'}</h2>
				<p>Hello ${data.recipientName || 'there'},</p>
				<div style="background: #f8fafc; padding: 20px; border-radius: 5px; margin: 20px 0; border-left: 4px solid #6366f1;">
					<div style="color: #374151; line-height: 1.6;">
						${data.message.replace(/\n/g, '<br>')}
					</div>
				</div>
				${
					data.actionUrl
						? `
					<div style="text-align: center; margin: 30px 0;">
						<a href="${data.actionUrl}" style="background: #6366f1; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
							${data.actionText || 'Take Action'}
						</a>
					</div>
				`
						: ''
				}
				<p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
					This message was sent by the administration team.
				</p>
			</div>
		`,
	},
};

// Base email wrapper template
export const baseEmailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Notification</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6;">
	<div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px;">
		<div style="background: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
			${content}
			<div style="background: #f8fafc; padding: 20px; border-top: 1px solid #e5e7eb; text-align: center;">
				<p style="margin: 0; color: #6b7280; font-size: 14px;">
					This is an automated message from Freelancing Platform.<br>
					Please do not reply to this email.
				</p>
			</div>
		</div>
	</div>
</body>
</html>
`;
