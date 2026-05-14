/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { HTMLAttributes } from 'react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Container } from '../../layout/container/Container';

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
	${({ $dragging }): ReturnType<typeof css> | false =>
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

const activeDropResetRef: { current: (() => void) | null } = { current: null };

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
	const resetDropStateRef = useRef<() => void>(() => undefined);

	const resetDropState = useCallback((): void => {
		setStyleObject({});
		setOverlayAccept(null);
		setOverlayDeny(null);
		setDragging(false);
		if (activeDropResetRef.current === resetDropStateRef.current) {
			activeDropResetRef.current = null;
		}
	}, []);

	const dropEvent = useCallback<React.DragEventHandler>(
		(e) => {
			e.preventDefault();
			e.stopPropagation();
			resetDropState();
			if (window.draggedItem && acceptType.includes(window.draggedItem.type)) {
				onDrop({
					event: e,
					type: window.draggedItem.type,
					data: window.draggedItem.data
				});
			}
			window.draggedItem = undefined;
		},
		[acceptType, onDrop, resetDropState]
	);

	const dragEnterEvent = useCallback<React.DragEventHandler>(
		(e) => {
			e.preventDefault();
			if (activeDropResetRef.current && activeDropResetRef.current !== resetDropStateRef.current) {
				activeDropResetRef.current();
			}
			activeDropResetRef.current = resetDropStateRef.current;
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

	const dragLeaveEvent = useCallback<React.DragEventHandler>(
		(e): void => {
			const isLeavingDropzone =
				!(e.relatedTarget instanceof Node) || !e.currentTarget.contains(e.relatedTarget);
			if (isLeavingDropzone) {
				resetDropState();
			}
		},
		[resetDropState]
	);

	useEffect(() => {
		resetDropStateRef.current = resetDropState;

		return (): void => {
			if (activeDropResetRef.current === resetDropStateRef.current) {
				activeDropResetRef.current = null;
			}
		};
	}, [resetDropState]);

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

export type { DropProps, DragObj };
export { Drop };
