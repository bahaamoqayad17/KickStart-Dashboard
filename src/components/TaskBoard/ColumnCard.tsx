'use client';

import React, { FC, useCallback, useState } from 'react';
import { CardBody, CardHeader, CardHeaderChild, CardTitle } from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/Avatar';
import Icon from '@/components/icon/Icon';
import { TaskType } from '@/models/Task';
import { UserType } from '@/models/User';

import TaskModal from './TaskModal';
import Button from '@/components/ui/Button';
import { formatDistanceToNow } from 'date-fns';
import TColumnsData from './type';
import { getFilenameFromUrl } from '@/lib/s3-utils';

interface IColumnCardProps {
	columnKey: string;
	task: TaskType;
	index: number;
	onDeleteTask?: (taskId: string) => void;
	onTaskUpdated?: (task: TaskType) => void;
	freelancers?: UserType[];
	columnsData: TColumnsData;
}

const ColumnCard: FC<IColumnCardProps> = ({
	columnKey,
	task,
	index,
	onDeleteTask,
	onTaskUpdated,
	freelancers,
	columnsData,
}) => {
	const [editPanelStatus, setEditPanelStatus] = useState<boolean>(false);

	const handleDelete = () => {
		const taskId = typeof task._id === 'string' ? task._id : task._id.toString();
		if (onDeleteTask) {
			onDeleteTask(taskId);
		}
	};

	// Get assigned user info
	const getAssignedUser = () => {
		if (
			task.assigned_to &&
			typeof task.assigned_to === 'object' &&
			'name' in task.assigned_to
		) {
			return {
				name: task.assigned_to.name,
				avatar: task.assigned_to.avatar || '',
			};
		}
		return null;
	};

	const assignedUser = getAssignedUser();

	// Get status info
	const getStatusInfo = () => {
		const statusLabels = [
			'To Do',
			'Pending',
			'In Progress',
			'Under Review',
			'Done',
			'Milestone',
		];
		const statusColors = ['zinc', 'amber', 'blue', 'sky', 'emerald', 'violet'] as const;

		return {
			label: statusLabels[task.status] || 'Unknown',
			color: statusColors[task.status] || 'zinc',
		};
	};

	const statusInfo = getStatusInfo();
	const isOverdue = task.deadline && new Date(task.deadline) < new Date();

	const isImage = useCallback((url: string) => {
		if (url) {
			return url.includes('.jpg') || url.includes('.jpeg') || url.includes('.png');
		}
		return false;
	}, []);

	return (
		<>
			<CardHeader>
				<CardHeaderChild>
					<CardTitle className='text-xl'>
						<div
							onClick={() => setEditPanelStatus(true)}
							role='presentation'
							className='cursor-pointer hover:text-blue-600'>
							<div className='line-clamp-2'>{task.title}</div>
						</div>
					</CardTitle>
				</CardHeaderChild>
				<CardHeaderChild>
					{assignedUser ? (
						<Avatar
							src={assignedUser.avatar}
							className='!w-8'
							width={48}
							height={48}
							name={assignedUser.name}
						/>
					) : (
						<div className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700'>
							<Icon icon='HeroUser' className='h-4 w-4 text-gray-500' />
						</div>
					)}
				</CardHeaderChild>
			</CardHeader>
			<CardBody>
				<div className='flex flex-wrap gap-4'>
					<div className='flex w-full items-center justify-between'>
						<div className='flex flex-wrap gap-2'>
							{/* Attachments count */}
							{task.attachments && task.attachments.length > 0 && (
								<Badge
									variant='outline'
									rounded='rounded-full'
									className='border-transparent'>
									<small className='flex items-center gap-2'>
										<Icon icon='HeroPaperClip' />
										{task.attachments.length}
									</small>
								</Badge>
							)}

							{/* Status badge */}
							<Badge
								color={statusInfo.color}
								variant='outline'
								rounded='rounded-full'
								className='border-transparent'>
								<small>{statusInfo.label}</small>
							</Badge>

							{/* Deadline */}
							{task.deadline && (
								<Badge
									color={isOverdue ? 'red' : 'blue'}
									variant='outline'
									rounded='rounded-full'
									className='border-transparent'>
									<small className='flex items-center gap-1'>
										<Icon icon='HeroClock' className='h-3 w-3' />
										{formatDistanceToNow(new Date(task.deadline), {
											addSuffix: true,
										})}
									</small>
								</Badge>
							)}
						</div>

						<div className='flex justify-end'>
							<Button
								color='red'
								icon='HeroTrash'
								variant='outline'
								onClick={handleDelete}
								className='!p-1'
								title='Delete task'
							/>
						</div>
					</div>

					{/* Description */}
					{task.description && (
						<div className='basis-full'>
							<div className='h-full max-w-[250px] text-sm text-gray-600 dark:text-gray-400'>
								<p className='text-wrap'>{task.description}</p>
							</div>
						</div>
					)}

					{/* Assigned user info */}
					{assignedUser && (
						<div className='flex w-full items-center gap-2 text-xs text-gray-500'>
							<Icon icon='HeroUser' className='h-3 w-3' />
							<span>Assigned to {assignedUser.name}</span>
						</div>
					)}

					{task.attachments && task.attachments.length > 0 && (
						<div className='flex flex-wrap gap-2'>
							{task.attachments.map((attachment) => (
								<div key={attachment}>
									{isImage(attachment) ? (
										<img src={attachment} alt='Attachment' />
									) : (
										<a
											href={attachment}
											target='_blank'
											rel='noopener noreferrer'
											className='cursor-pointer text-blue-600 hover:underline dark:text-blue-400'>
											{getFilenameFromUrl(attachment)}
										</a>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</CardBody>
			<TaskModal
				task={task}
				isOpen={editPanelStatus}
				setIsOpen={setEditPanelStatus}
				columnKey={columnKey}
				columnsData={columnsData}
				index={index}
				freelancers={freelancers}
				onTaskUpdated={onTaskUpdated}
			/>
		</>
	);
};

export default ColumnCard;
