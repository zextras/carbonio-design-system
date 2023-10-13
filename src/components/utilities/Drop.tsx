/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useState, useCallback } from 'react';

import styled, { SimpleInterpolation, css } from 'styled-components';

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

function isEnteringOverlayElement(event: React.DragEvent<Element> | null): boolean {
	const target = event?.target;
	if (target instanceof HTMLElement) {
		return !!(
			target.outerHTML?.toLowerCase().includes(OVERLAY_ELEMENT_IDENTIFIER) ||
			target.parentElement?.outerHTML?.toLowerCase().includes(OVERLAY_ELEMENT_IDENTIFIER)
		);
	}
	return false;
}
function isLeavingOverlayElement(event: React.DragEvent<Element> | null): boolean {
	const nativeEvent = event?.nativeEvent?.target;
	if (nativeEvent instanceof HTMLElement) {
		return !!(
			nativeEvent.outerHTML?.toLowerCase().includes(OVERLAY_ELEMENT_IDENTIFIER) ||
			nativeEvent.parentElement?.outerHTML?.toLowerCase().includes(OVERLAY_ELEMENT_IDENTIFIER)
		);
	}
	return false;
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
	const [dragging, setDragging] = useState<boolean>(false);

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
			setDragging(false);
			window.draggedItem = undefined;
		},
		[acceptType, enablePropagation, onDrop, rejectType]
	);

	const dragEnterEvent = useCallback<React.DragEventHandler>(
		(e) => {
			e && e.preventDefault();
			const targetIsOverlayElement = isEnteringOverlayElement(e);
			if (targetIsOverlayElement) {
				return;
			}
			setDragging(true);
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

	const dragLeaveEvent = useCallback<React.DragEventHandler>((e): void => {
		const leavingOverlayElement = isLeavingOverlayElement(e);
		if (leavingOverlayElement) {
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
			onDragLeave={dragLeaveEvent}
			onDrop={dropEvent}
			style={styleObject}
		>
			<CoverEl $dragging={dragging}>
				{children}
				{overlayAccept && <OverlayEl type={OVERLAY_ELEMENT_IDENTIFIER}>{overlayAccept}</OverlayEl>}
				{overlayDeny && <OverlayEl type={OVERLAY_ELEMENT_IDENTIFIER}>{overlayDeny}</OverlayEl>}
			</CoverEl>
		</DropEl>
	);
});

export { Drop, DropProps, DragObj };
