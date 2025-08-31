import React, { FC } from 'react';
import classNames from 'classnames';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from '@hello-pangea/dnd';
import Badge from '@/components/ui/Badge';
import Icon from '@/components/icon/Icon';
import TColumnsData, { TColumnData } from './type';
import ColumnCardWrapper from './ColumnCardWrapper';
import NewTaskButton from './NewTaskButton';
import { TaskType } from '@/models/Task';
import { UserType } from '@/models/User';

interface IColumnsProps {
	tasksData: { [key: string]: TaskType[] };
	columnsData: TColumnsData;
	onDeleteTask?: (taskId: string) => void;
	onTaskCreated?: (task: TaskType) => void;
	onTaskUpdated?: (task: TaskType) => void;
	projectId?: string;
	freelancers: UserType[];
}
const Columns: FC<IColumnsProps> = ({
	tasksData,
	columnsData,
	onDeleteTask,
	onTaskCreated,
	onTaskUpdated,
	projectId,
	freelancers,
}) => {
	return (
		<>
			{Object.keys(columnsData).map((columnKey) => {
				const columnData: TColumnData = columnsData[columnKey];
				const columnTasks = tasksData[columnKey] || [];
				return (
					<div
						key={columnKey}
						data-component-name='ColumnsPart'
						className='flex flex-col rounded-2xl border border-zinc-300/25 p-4 pb-0 dark:border-zinc-800/50'>
						<div className={classNames(`w-[20rem] xl:w-[22rem] 2xl:w-[28rem]`)}>
							<div className='mb-4 flex basis-full items-center'>
								<div className='flex grow items-center gap-2'>
									<Icon icon={columnData.icon} size='text-2xl' />
									<span className='text-2xl font-semibold'>
										{columnData.title}
									</span>
									<Badge
										variant='outline'
										className='border-transparent px-2'
										rounded='rounded-full'>
										{columnTasks.length}
									</Badge>
								</div>
							</div>

							<div className='mb-4'>
								<NewTaskButton
									columnKey={columnKey}
									columnsData={columnsData}
									projectId={projectId}
									freelancers={freelancers}
									onTaskCreated={onTaskCreated}
								/>
							</div>

							<Droppable droppableId={columnKey}>
								{(
									providedDroppable: DroppableProvided,
									snapshotDroppable: DroppableStateSnapshot,
								) => (
									<div
										data-component-name='ColumnsPart/Droppable'
										className={classNames('rounded-xl', {
											'border border-dashed border-blue-500 bg-blue-500/10':
												snapshotDroppable.isDraggingOver,
										})}
										{...providedDroppable.droppableProps}
										ref={providedDroppable.innerRef}>
										<ColumnCardWrapper
											columnKey={columnKey}
											columnsData={columnsData}
											tasks={columnTasks}
											onDeleteTask={onDeleteTask}
											onTaskUpdated={onTaskUpdated}
											freelancers={freelancers}
										/>
										<div className='py-2'>{providedDroppable.placeholder}</div>
									</div>
								)}
							</Droppable>
						</div>
					</div>
				);
			})}
		</>
	);
};

export default Columns;
