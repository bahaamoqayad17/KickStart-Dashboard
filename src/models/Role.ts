import mongoose, { InferSchemaType } from 'mongoose';

const roleSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			maxlength: 50,
		},
		description: {
			type: String,
			maxlength: 500,
		},
		permissions: {
			type: Map,
			of: Boolean,
			default: {},
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
	},
);

export type RoleType = Omit<InferSchemaType<typeof roleSchema>, ''> & {
	_id: mongoose.Types.ObjectId | string;
};

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);

export default Role;
