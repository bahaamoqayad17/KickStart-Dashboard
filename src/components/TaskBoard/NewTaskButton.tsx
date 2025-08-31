'use client';

import React, { FC, useState } from 'react';
import { TaskType } from '@/models/Task';
import { UserType } from '@/models/User';

import TColumnsData from './type';
import TaskModal from './TaskModal';
import classNames from 'classnames';
import Icon from '@/components/icon/Icon';
import themeConfig from '@/config/theme.config';

interface INewTaskButtonProps {
	columnKey: string;
	columnsData: TColumnsData;
	projectId?: string;
	freelancers?: UserType[];
	onTaskCreated?: (task: TaskType) => void;
}

const NewTaskButton: FC<INewTaskButtonProps> = (props) => {
	const { columnKey, columnsData, projectId, freelancers, onTaskCreated, ...rest } = props;

	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				type='button'
				className={classNames(
					'group flex w-full cursor-pointer items-center justify-center rounded-xl border border-dashed border-zinc-500 p-4 hover:border-zinc-300 hover:dark:border-zinc-800',
					themeConfig.transition,
				)}
				onClick={() => setIsModalOpen(true)}
				{...rest}>
				<Icon
					icon='HeroPlus'
					size='text-2xl'
					className={classNames(
						'text-zinc-500 group-hover:text-zinc-300 group-hover:dark:text-zinc-800',
						themeConfig.transition,
					)}
				/>
			</button>
			<TaskModal
				columnKey={columnKey}
				columnsData={columnsData}
				isOpen={isModalOpen}
				setIsOpen={setIsModalOpen}
				projectId={projectId}
				freelancers={freelancers}
				onTaskCreated={onTaskCreated}
			/>
		</>
	);
};

export default NewTaskButton;
