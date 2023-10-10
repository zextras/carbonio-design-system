/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useCallback, useState } from 'react';

import styled from 'styled-components';

import { OVERLAY_ELEMENT_IDENTIFIER } from '../constants';
import { Container, ContainerProps } from '../layout/Container';

const DropEl = styled(Container)`
	display: inline;
	position: relative;
`;

const OverlayEl = styled(Container)<ContainerProps & { type: string }>`
	display: block;
	position: absolute;
	width: 100%;
	top: 0;
	left: 0;
	height: 100%;
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

function getTargetIsOverlayElement(event: DragEvent | null): boolean {
	const target = event?.target as HTMLElement;
	if (!target) {
		return false;
	}
	return !!(
		target.outerHTML?.toLowerCase().includes(OVERLAY_ELEMENT_IDENTIFIER) ||
		target.parentElement?.outerHTML?.toLowerCase().includes(OVERLAY_ELEMENT_IDENTIFIER)
	);
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

	const dropEvent = useCallback<React.DragEventHandler>(
		(e) => {
			e.preventDefault();
			e && e.stopPropagation();
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
			window.draggedItem = undefined;
		},
		[acceptType, onDrop]
	);

	const dragEnterEvent = useCallback(
		(e) => {
			e && e.preventDefault();
			const targetIsOverlayElement = getTargetIsOverlayElement(e);
			if (targetIsOverlayElement) {
				return;
			}
			const dragEnterResponse = onDragEnter({
				event: e,
				type: window.draggedItem?.type,
				data: window.draggedItem?.data
			});
			e && e.stopPropagation();
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

	const dragLeaveEvent = useCallback((e): void => {
		const targetIsOverlayElement = getTargetIsOverlayElement(e);
		if (!targetIsOverlayElement) {
			return;
		}
		setStyleObject({});
		setOverlayAccept(null);
		setOverlayDeny(null);
	}, []);

	return (
		<DropEl
			ref={ref}
			onDragOver={dragEnterEvent}
			onDragEnter={dragEnterEvent}
			onDragLeave={dragLeaveEvent}
			onDrop={dropEvent}
			style={styleObject}
		>
			{children}
			{overlayAccept && <OverlayEl type={OVERLAY_ELEMENT_IDENTIFIER}>{overlayAccept}</OverlayEl>}
			{overlayDeny && <OverlayEl type={OVERLAY_ELEMENT_IDENTIFIER}>{overlayDeny}</OverlayEl>}
		</DropEl>
	);
});

export { Drop, DropProps, DragObj };
