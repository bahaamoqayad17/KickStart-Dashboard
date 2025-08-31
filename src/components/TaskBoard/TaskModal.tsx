'use client';

import React, { Dispatch, FC, SetStateAction, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/ui/Button';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalFooterChild,
	ModalHeader,
} from '@/components/ui/Modal';
import { TaskType } from '@/models/Task';
import { UserType } from '@/models/User';
import TColumnsData from './type';
import FieldWrap from '@/components/form/FieldWrap';
import Input from '@/components/form/Input';
import Label from '@/components/form/Label';
import Textarea from '@/components/form/Textarea';
import Select from '@/components/form/Select';
import Icon from '@/components/icon/Icon';
import Alert from '@/components/ui/Alert';
import { createTask, updateTask } from '@/actions/task-actions';
import { Calendar } from 'react-date-range';

interface ITaskModalProps {
	id?: string;
	columnKey: string;
	columnsData: TColumnsData;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	projectId?: string;
	freelancers?: UserType[];
	task?: TaskType; // For editing existing task
	index?: number; // For editing existing task
	onTaskCreated?: (task: TaskType) => void;
	onTaskUpdated?: (task: TaskType) => void;
}

const TaskModal: FC<ITaskModalProps> = (props) => {
	const {
		columnKey,
		columnsData,
		isOpen,
		setIsOpen,
		projectId,
		freelancers = [],
		task,
		onTaskCreated,
		onTaskUpdated,
	} = props;

	const isEdit = !!task;
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
		null,
	);
	const [attachments, setAttachments] = useState<File[]>([]);
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());

	// Get initial values for formik
	const getInitialValues = () => {
		if (task && isEdit) {
			const assignedToId = task.assigned_to
				? typeof task.assigned_to === 'string'
					? task.assigned_to
					: task.assigned_to._id
				: '';

			return {
				title: task.title || '',
				description: task.description || '',
				deadline: task.deadline ? new Date(task.deadline) : new Date(),
				assigned_to: assignedToId,
				status: task.status,
				attachments: task.attachments || [],
			};
		}

		return {
			title: '',
			description: '',
			deadline: '',
			assigned_to: '',
			status: 0,
			attachments: [],
		};
	};

	const formik = useFormik({
		initialValues: getInitialValues(),
		validationSchema: Yup.object({
			title: Yup.string().required('Title is required'),
			description: Yup.string(),
			assigned_to: Yup.string().required('Assigned to is required'),
			status: Yup.number().required('Status is required'),
			attachments: Yup.array().of(Yup.mixed()),
		}),
		enableReinitialize: true,
		onSubmit: async (values, { resetForm }) => {
			setIsLoading(true);
			setMessage(null);

			try {
				const formData = new FormData();
				formData.append('title', values.title);
				formData.append('description', values.description);
				formData.append('deadline', selectedDate.toISOString());
				formData.append('status', values.status);
				formData.append('assigned_to', values.assigned_to as string);

				if (!selectedDate) {
					formik.setFieldError('deadline', 'Deadline is required');
					return;
				}

				if (isEdit && task) {
					// Update existing task
					const taskId = typeof task._id === 'string' ? task._id : task._id.toString();
					const result = await updateTask(taskId, formData);

					if (result.success) {
						setMessage({ type: 'success', text: 'Task updated successfully!' });

						// Create updated task object
						const updatedTask: TaskType = {
							...task,
							title: values.title,
							description: values.description,
							deadline: selectedDate,
							project: task.project,
							status: values.status,
							assigned_to: values.assigned_to || undefined,
							updatedAt: new Date(),
						};

						// Call parent callback
						onTaskUpdated?.(updatedTask);

						setTimeout(() => {
							setIsOpen(false);
							setMessage(null);
						}, 1500);
					} else {
						setMessage({
							type: 'error',
							text: result.error || 'Failed to update task',
						});
					}
				} else {
					// Create new task
					if (!projectId) {
						setMessage({ type: 'error', text: 'Project ID is required' });
						return;
					}

					formData.append('project', projectId);
					formData.append('status', columnsData[columnKey].status.toString());

					// Add attachments
					attachments.forEach((file) => {
						formData.append('attachments', file);
					});

					const result = await createTask(formData);

					if (result.success) {
						setMessage({ type: 'success', text: 'Task created successfully!' });

						// Create new task object
						const newTask: TaskType = {
							_id: result.data.id,
							title: result.data.title,
							description: result.data.description,
							deadline: selectedDate,
							project: projectId,
							status: result.data.status as number,
							attachments: result.data.attachments || [],
							assigned_to: values.assigned_to || undefined,
							project: projectId,
							createdAt: new Date(),
							updatedAt: new Date(),
						};

						// Call parent callback
						onTaskCreated?.(newTask);

						resetForm();
						setAttachments([]);
						setTimeout(() => {
							setIsOpen(false);
							setMessage(null);
						}, 1500);
					} else {
						setMessage({
							type: 'error',
							text: result.error || 'Failed to create task',
						});
					}
				}
			} catch (error) {
				console.error('Error with task:', error);
				setMessage({
					type: 'error',
					text: `Failed to ${isEdit ? 'update' : 'create'} task`,
				});
			} finally {
				setIsLoading(false);
			}
		},
	});

	const handleClose = () => {
		setIsOpen(false);
		setMessage(null);
		setAttachments([]);
		formik.resetForm();
	};

	// Use a key to force re-render when task changes to prevent stale closures
	const modalKey = task ? `edit-${task._id}` : `create-${columnKey}`;

	return (
		<Modal key={modalKey} isOpen={isOpen} setIsOpen={setIsOpen} size='2xl'>
			<ModalHeader>{isEdit ? 'Edit Task' : 'Create New Task'}</ModalHeader>
			<ModalBody>
				<form onSubmit={formik.handleSubmit} className='space-y-4'>
					<div>
						<Label htmlFor='title'>Title *</Label>
						<FieldWrap
							firstSuffix={<Icon icon='HeroDocumentText' className='mx-2' />}
							lastSuffix={
								formik.errors.title && formik.touched.title ? (
									<Icon
										icon='HeroExclamationCircle'
										className='mx-2 text-red-500'
									/>
								) : null
							}>
							<Input
								id='title'
								name='title'
								value={formik.values.title}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder='Enter task title'
							/>
						</FieldWrap>
						{formik.errors.title && formik.touched.title && (
							<div className='mt-1 text-sm text-red-600'>{formik.errors.title}</div>
						)}
					</div>

					<div>
						<Label htmlFor='description'>Description</Label>
						<FieldWrap
							firstSuffix={<Icon icon='HeroDocumentText' className='mx-2' />}
							lastSuffix={
								formik.errors.description && formik.touched.description ? (
									<Icon
										icon='HeroExclamationCircle'
										className='mx-2 text-red-500'
									/>
								) : null
							}>
							<Textarea
								id='description'
								name='description'
								value={formik.values.description}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder='Enter task description (optional)'
								rows={4}
							/>
						</FieldWrap>
						{formik.errors.description && formik.touched.description && (
							<div className='mt-1 text-sm text-red-600'>
								{formik.errors.description}
							</div>
						)}
					</div>

					<div>
						<Label htmlFor='deadline'>Deadline *</Label>
						<FieldWrap
							firstSuffix={<Icon icon='HeroCalendar' className='mx-2' />}
							lastSuffix={
								formik.errors.deadline && formik.touched.deadline ? (
									<Icon
										icon='HeroExclamationCircle'
										className='mx-2 text-red-500'
									/>
								) : null
							}>
							<Calendar
								date={selectedDate}
								onChange={(date) => setSelectedDate(date)}
								minDate={new Date()}
							/>
							{/* <Input
								id='deadline'
								name='deadline'
								type='datetime-local'
								value={formik.values.deadline}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/> */}
						</FieldWrap>
						{formik.errors.deadline && formik.touched.deadline && (
							<div className='mt-1 text-sm text-red-600'>
								{formik.errors.deadline}
							</div>
						)}
					</div>

					<div>
						<Label htmlFor='assigned_to'>Assign to Freelancer</Label>
						<FieldWrap
							firstSuffix={<Icon icon='HeroUser' className='mx-2' />}
							lastSuffix={
								formik.errors.assigned_to && formik.touched.assigned_to ? (
									<Icon
										icon='HeroExclamationCircle'
										className='mx-2 text-red-500'
									/>
								) : null
							}>
							<Select
								id='assigned_to'
								name='assigned_to'
								value={formik.values.assigned_to as string}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value=''>
									Select a freelancer (optional)
								</option>
								{freelancers.map((freelancer, index) => (
									<option
										key={index}
										value={freelancer._id as string}
										className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'>
										{freelancer.name} ({freelancer.username})
									</option>
								))}
							</Select>
						</FieldWrap>
						{formik.errors.assigned_to && formik.touched.assigned_to && (
							<div className='mt-1 text-sm text-red-600'>
								{formik.errors.assigned_to}
							</div>
						)}
					</div>

					<div>
						<Label htmlFor='status'>Status</Label>
						<FieldWrap
							firstSuffix={<Icon icon='HeroUser' className='mx-2' />}
							lastSuffix={
								formik.errors.status && formik.touched.status ? (
									<Icon
										icon='HeroExclamationCircle'
										className='mx-2 text-red-500'
									/>
								) : null
							}>
							<Select
								id='status'
								name='status'
								value={formik.values.status}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value=''>
									Select a Status
								</option>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value={0}>
									To Do
								</option>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value={1}>
									Pending
								</option>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value={2}>
									In Progress
								</option>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value={3}>
									Under Review
								</option>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value={4}>
									Done
								</option>
								<option
									className='bg-white text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
									value={5}>
									Milestone
								</option>
							</Select>
						</FieldWrap>
						{formik.errors.status && formik.touched.status && (
							<div className='mt-1 text-sm text-red-600'>{formik.errors.status}</div>
						)}
					</div>

					{!isEdit && (
						<div>
							<Label htmlFor='attachments'>Attachments</Label>
							<FieldWrap firstSuffix={<Icon icon='HeroPaperClip' className='mx-2' />}>
								<Input
									id='attachments'
									name='attachments'
									type='file'
									multiple
									onChange={(e) => {
										const files = Array.from(e.target.files || []);
										setAttachments(files);
									}}
									accept='.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt,.csv,.xlsx'
									className='file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100'
								/>
							</FieldWrap>
							{attachments.length > 0 && (
								<div className='mt-2 space-y-1'>
									<p className='text-xs font-medium text-gray-500'>
										Selected files ({attachments.length}):
									</p>
									{attachments.map((file, index) => (
										<div
											key={index}
											className='flex items-center gap-2 text-xs text-gray-600'>
											<Icon icon='HeroPaperClip' className='h-3 w-3' />
											<span className='truncate'>{file.name}</span>
											<span className='shrink-0 text-gray-400'>
												({(file.size / 1024).toFixed(1)} KB)
											</span>
										</div>
									))}
								</div>
							)}
						</div>
					)}

					{/* Task Info for Edit Mode */}
					{isEdit && task && (
						<div className='rounded-lg bg-gray-50 p-3 dark:bg-gray-800'>
							<p className='mb-1 text-xs text-gray-500'>Task Information</p>
							<div className='space-y-1 text-xs text-gray-600 dark:text-gray-400'>
								<p>
									Status:{' '}
									{
										[
											'To Do',
											'Pending',
											'In Progress',
											'Under Review',
											'Done',
											'Milestone',
										][task.status]
									}
								</p>
								<p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
								{task.attachments && task.attachments.length > 0 && (
									<p>Attachments: {task.attachments.length} file(s)</p>
								)}
							</div>
						</div>
					)}

					{message && (
						<Alert color={message.type === 'success' ? 'emerald' : 'red'}>
							{message.text}
						</Alert>
					)}
				</form>
			</ModalBody>
			<ModalFooter>
				<ModalFooterChild>
					<Button
						color='red'
						variant='outline'
						onClick={handleClose}
						isDisable={isLoading}>
						Cancel
					</Button>
				</ModalFooterChild>
				<ModalFooterChild>
					<Button
						type='submit'
						onClick={formik.handleSubmit}
						isLoading={isLoading}
						isDisable={!formik.values.title || isLoading}>
						{isEdit ? 'Update Task' : 'Create Task'}
					</Button>
				</ModalFooterChild>
			</ModalFooter>
		</Modal>
	);
};

export default TaskModal;
