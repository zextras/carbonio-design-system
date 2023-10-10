/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useState, useCallback } from 'react';

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
	data?: FileList | Record<string, unknown>;
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
	/** rejectType should be an array which reject base on dragged type */
	rejectType?: string[];
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
	/** whether the event should propagate through the DOM tree or not */
	enablePropagation?: boolean;
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
		rejectType = [],
		acceptStyle = {},
		rejectStyle = {},
		overlayAcceptComponent = null,
		overlayDenyComponent = null,
		enablePropagation
	},
	ref
) {
	const [styleObject, setStyleObject] = useState<StyleObj>({});
	const [overlayAccept, setOverlayAccept] = useState<React.ReactNode>(null);
	const [overlayDeny, setOverlayDeny] = useState<React.ReactNode>(null);

	const dropEvent = useCallback(
		(e): void => {
			e.preventDefault();
			e && !enablePropagation && e.stopPropagation();
			setStyleObject({});
			setOverlayAccept(null);
			setOverlayDeny(null);
			if (
				window.draggedItem &&
				acceptType.includes(window.draggedItem.type) &&
				!rejectType.includes(window.draggedItem.type)
			) {
				onDrop({
					event: e,
					type: window.draggedItem.type,
					data:
						e?.draggedItem?.dataTransfer?.FileList.length() > 0
							? e.draggedItem.dataTransfer.FileList
							: window.draggedItem.data
				});
			}
			window.draggedItem = undefined;
		},
		[acceptType, enablePropagation, onDrop, rejectType]
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
			e && !enablePropagation && e.stopPropagation();
			if (
				(!dragEnterResponse || dragEnterResponse.success) &&
				window.draggedItem &&
				acceptType.includes(window.draggedItem.type) &&
				!rejectType.includes(window.draggedItem.type)
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
			enablePropagation,
			onDragEnter,
			overlayAcceptComponent,
			overlayDenyComponent,
			rejectStyle,
			rejectType
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
