'use client';

import React, { FC } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot } from '@hello-pangea/dnd';
import classNames from 'classnames';
import Card from '@/components/ui/Card';
import { TaskType } from '@/models/Task';
import { UserType } from '@/models/User';

import ColumnCard from './ColumnCard';
import TColumnsData from './type';

interface IColumnCardWrapperProps {
	columnKey: string;
	columnsData: TColumnsData;
	tasks: TaskType[];
	onDeleteTask?: (taskId: string) => void;
	onTaskUpdated?: (task: TaskType) => void;
	freelancers?: UserType[];
}
const ColumnCardWrapper: FC<IColumnCardWrapperProps> = ({
	columnKey,
	columnsData,
	tasks,
	onDeleteTask,
	onTaskUpdated,
	freelancers,
}) => {
	return (
		<>
			{tasks &&
				tasks.map((card, index) => (
					<Draggable key={card._id} draggableId={card._id} index={index}>
						{(
							providedDraggable: DraggableProvided,
							snapshotDraggable: DraggableStateSnapshot,
						) => (
							<Card
								data-component-name='ColumnCardWrapperPart'
								className={classNames(
									'shadow-sm [&:not(:nth-last-child(2))]:mb-4',
									{
										'border border-blue-500': snapshotDraggable.isDragging,
									},
								)}
								ref={providedDraggable.innerRef}
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...providedDraggable.draggableProps}
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...providedDraggable.dragHandleProps}
								style={providedDraggable.draggableProps.style}>
								<ColumnCard
									columnKey={columnKey}
									task={card}
									index={index}
									onDeleteTask={onDeleteTask}
									onTaskUpdated={onTaskUpdated}
									freelancers={freelancers}
									columnsData={columnsData}
								/>
							</Card>
						)}
					</Draggable>
				))}
		</>
	);
};

export default ColumnCardWrapper;
