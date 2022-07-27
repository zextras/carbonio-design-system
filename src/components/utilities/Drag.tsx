/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useCallback } from 'react';
import styled from 'styled-components';

const DragEl = styled.div`
	display: inline-block;
	position: relative;
`;

interface DragProps {
	/** Callback for on onDragStart */
	onDragStart?: React.DragEventHandler;
	/** Callback for on onDragStart */
	onDragEnd?: React.DragEventHandler;
	/** type to assign to data */
	type?: string;
	/** data assigned to the drag event */
	data?: Record<string, unknown>;
	/** style applied to drag container */
	style?: HTMLAttributes<HTMLDivElement>['style'];
	/** whether element should be draggable or not */
	dragDisabled?: boolean;
	/** Content to drag */
	children: React.ReactNode | React.ReactNode[];
}

const Drag = React.forwardRef<HTMLDivElement, DragProps>(function DragFn(
	{
		type = '',
		data = {},
		children,
		dragDisabled = false,
		style = {},
		onDragStart = (): void => undefined,
		onDragEnd = (): void => undefined
	},
	ref
) {
	const dragStartHandler = useCallback<React.DragEventHandler<HTMLDivElement>>(
		(event) => {
			onDragStart && onDragStart(event);
			window.draggedItem = { event, data, type };
		},
		[data, onDragStart, type]
	);

	const dragEndHandler = useCallback<React.DragEventHandler>(
		(event) => {
			onDragEnd && onDragEnd(event);
			window.draggedItem = undefined;
		},
		[onDragEnd]
	);

	return (
		<DragEl
			ref={ref}
			draggable={!dragDisabled}
			onDragEnd={dragEndHandler}
			style={style}
			onDragStart={dragStartHandler}
		>
			{children}
		</DragEl>
	);
});

export { Drag, DragProps };
