/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useCallback, useState } from 'react';

import styled, { SimpleInterpolation, css } from 'styled-components';

import { Container } from '../layout/Container';

const DropEl = styled(Container)`
	display: inline;
	position: relative;
`;

const OverlayEl = styled(Container)`
	display: block;
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 100%;
`;

const CoverEl = styled(Container)<{ $dragging: boolean }>`
	display: inline;
	${({ $dragging }): SimpleInterpolation =>
		$dragging &&
		css`
			pointer-events: none;
		`};
`;
type DragObj = {
	event: React.DragEvent;
	data?: Record<string, unknown>;
	type?: string;
};

type StyleObj = HTMLAttributes<HTMLDivElement>['style'];

interface DropProps {
	/** Callback for on drop */
	onDrop?: (dragObj: DragObj) => void;
	/** Callback for on onDragEnter */
	onDragEnter?: (dragObj: DragObj) => { success: boolean } | undefined;
	/** acceptType should be an array which accept base on dragged type */
	acceptType?: string[];
	/** Style object for drag accept */
	acceptStyle?: StyleObj;
	/** Style object for drag reject */
	rejectStyle?: StyleObj;
	/** Overlay component for drag accept */
	overlayAcceptComponent: React.ReactNode;
	/** Overlay component for drag Deny */
	overlayDenyComponent: React.ReactNode;
	/** Content where activate drop */
	children: React.ReactNode | React.ReactNode[];
}

const Drop = React.forwardRef<HTMLDivElement, DropProps>(function DropFn(
	{
		onDrop = (): void => undefined,
		onDragEnter = (): void => undefined,
		children,
		acceptType = [],
		acceptStyle = {},
		rejectStyle = {},
		overlayAcceptComponent = null,
		overlayDenyComponent = null
	},
	ref
) {
	const [styleObject, setStyleObject] = useState<StyleObj>({});
	const [overlayAccept, setOverlayAccept] = useState<React.ReactNode>(null);
	const [overlayDeny, setOverlayDeny] = useState<React.ReactNode>(null);
	const [dragging, setDragging] = useState<boolean>(false);

	const dropEvent = useCallback<React.DragEventHandler>(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			setStyleObject({});
			setOverlayAccept(null);
			setOverlayDeny(null);
			if (window.draggedItem && acceptType.includes(window.draggedItem.type)) {
				onDrop({
					event: e,
					type: window.draggedItem.type,
					data: window.draggedItem.data
				});
			}
			setDragging(false);
			window.draggedItem = undefined;
		},
		[acceptType, onDrop]
	);

	// TODO: distinguish dragEnter from dragOver and throttle dragOver
	const dragEnterEvent = useCallback<React.DragEventHandler>(
		(e) => {
			e.preventDefault();
			setDragging(true);
			const dragEnterResponse = onDragEnter({
				event: e,
				type: window.draggedItem?.type,
				data: window.draggedItem?.data
			});
			e.stopPropagation();
			if (
				(!dragEnterResponse || dragEnterResponse.success) &&
				window.draggedItem &&
				acceptType.includes(window.draggedItem.type)
			) {
				setStyleObject(acceptStyle);
				setOverlayAccept(overlayAcceptComponent);
			} else {
				e.dataTransfer.dropEffect = 'none';
				setOverlayDeny(overlayDenyComponent);
				setStyleObject(rejectStyle);
			}
		},
		[
			acceptStyle,
			acceptType,
			onDragEnter,
			overlayAcceptComponent,
			overlayDenyComponent,
			rejectStyle
		]
	);

	const dragLeaveEvent = useCallback<React.DragEventHandler>((e): void => {
		const isLeavingDrop =
			!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget);
		if (isLeavingDrop) {
			setStyleObject({});
			setOverlayAccept(null);
			setOverlayDeny(null);
			setDragging(false);
		}
	}, []);

	return (
		<DropEl
			ref={ref}
			onDragEnter={dragEnterEvent}
			onDragOver={dragEnterEvent}
			onDragLeave={dragLeaveEvent}
			onDrop={dropEvent}
			style={styleObject}
			data-testid={'drop'}
		>
			<CoverEl $dragging={dragging}>
				{children}
				{overlayAccept && <OverlayEl>{overlayAccept}</OverlayEl>}
				{overlayDeny && <OverlayEl>{overlayDeny}</OverlayEl>}
			</CoverEl>
		</DropEl>
	);
});

export { Drop, DropProps, DragObj };
