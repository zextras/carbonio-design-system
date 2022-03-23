/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../layout/Container';

const DropEl = styled(Container)`
	display: inline;
	position: relative;
	// width: 100%;
`;

const OverlayEl = styled(Container)`
	display: block;
	position: absolute;
	width: 100%;
	top: 0px;
	left: 0px;
	height: 100%;
`;

const CoverEl = styled(Container)`
	display: inline;
`;

const Drop = React.forwardRef(function DropFn(
	{
		onDrop,
		onDragEnter,
		children,
		acceptType,
		acceptStyle,
		rejectStyle,
		overlayAcceptComponent,
		overlayDenyComponent
	},
	ref
) {
	const [styleObject, setStyleObject] = useState({});
	const [overlayAccept, setOverlayAccept] = useState(null);
	const [overlayDeny, setOverlayDeny] = useState(null);
	const coverStyle = { pointerEvents: 'none' };
	const dropEvent = useCallback(
		(e) => {
			e && e.stopPropagation();
			setStyleObject({});
			setOverlayAccept(null);
			setOverlayDeny(null);
			if (onDrop && window.draggedItem && acceptType.includes(window.draggedItem.type)) {
				onDrop({
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
			const dragEnterResponse = onDragEnter({
				event: e,
				type: window.draggedItem.type,
				data: window.draggedItem.data
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
				// eslint-disable-next-line no-param-reassign
				e.dataTransfer.dropEffect = 'none';
				setOverlayDeny(overlayDenyComponent);
				setStyleObject(rejectStyle);
			}
		},
		[
			onDragEnter,
			acceptType,
			acceptStyle,
			overlayAcceptComponent,
			overlayDenyComponent,
			rejectStyle
		]
	);
	const onDragOverEvent = useCallback(
		(e) => {
			e && e.preventDefault();
			const dragEnterResponse = onDragEnter({
				event: e,
				type: window.draggedItem.type,
				data: window.draggedItem.data
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
				// eslint-disable-next-line no-param-reassign
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
	const dragEnterLeave = () => {
		setStyleObject({});
		setOverlayAccept(null);
		setOverlayDeny(null);
	};
	return (
		<DropEl
			ref={ref}
			onDragOver={onDragOverEvent}
			onDragEnter={dragEnterEvent}
			onDragLeave={dragEnterLeave}
			onDrop={dropEvent}
			style={styleObject}
			overlayComponent={overlayAcceptComponent}
			overlayDenyComponent={overlayDenyComponent}
		>
			<CoverEl style={window.draggedItem ? coverStyle : {}}>
				{children}
				{overlayAccept && <OverlayEl>{overlayAccept}</OverlayEl>}
				{overlayDeny && <OverlayEl>{overlayDeny}</OverlayEl>}
			</CoverEl>
		</DropEl>
	);
});

Drop.propTypes = {
	/** Callback for on drop */
	onDrop: PropTypes.func,
	/** Callback for on onDragEnter */
	onDragEnter: PropTypes.func,
	/** acceptType should be array which accept base on draged type */
	acceptType: PropTypes.array,
	/** Style object for drap accept */
	acceptStyle: PropTypes.object,
	/** Style object for drap reject */
	rejectStyle: PropTypes.object,
	/** Overly component for drag accept */
	overlayAcceptComponent: PropTypes.object,
	/** Overly component for drag Deny */
	overlayDenyComponent: PropTypes.object
};

Drop.defaultProps = {
	onDrop: () => undefined,
	onDragEnter: () => undefined,
	acceptType: [],
	acceptStyle: {},
	rejectStyle: {},
	overlayAcceptComponent: null,
	overlayDenyComponent: null
};

export { Drop };
