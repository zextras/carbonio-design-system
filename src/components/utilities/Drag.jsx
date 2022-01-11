/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DragEl = styled.div`
	display: inline-block;
	position: relative;
`;

const Drag = React.forwardRef(function DragFn(
	{ type, data, children, dragDisabled, style, onDragStart, onDragEnd },
	ref
) {
	return (
		<>
			<DragEl
				ref={ref}
				draggable={!dragDisabled}
				onDragEnd={(event) => {
					onDragStart && onDragEnd(event);
					window.draggedItem = undefined;
				}}
				style={style}
				onDragStart={(event) => {
					onDragStart && onDragStart(event);
					window.draggedItem = { event, data, type };
				}}
			>
				{children}
			</DragEl>
		</>
	);
});

Drag.propTypes = {
	/** Callback for on onDragStart */
	onDragStart: PropTypes.func,
	/** Callback for on onDragStart */
	onDragEnd: PropTypes.func,
	/** type should be message folder appointment or contact */
	type: PropTypes.string,
	/** data should be object */
	data: PropTypes.object,
	/** style should be object */
	style: PropTypes.object,
	/** dragDisabled should be boolean */
	dragDisabled: PropTypes.bool
};

Drag.defaultProps = {
	onDragStart: () => undefined,
	onDragEnd: () => undefined,
	type: '',
	data: {},
	style: {},
	dragDisabled: false
};

export default Drag;
