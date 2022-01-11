/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Container from '../layout/Container';
import Transition from './Transition';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const CollapseEl = styled.div`
	${(props) => {
		if (props.crossSize) {
			return `${props.orientation === 'horizontal' ? 'height' : 'width'}: ${props.crossSize};`;
		}
		return '';
	}};
	${(props) => (props.orientation === 'horizontal' ? 'width' : 'height')}: 0;
	visibility: hidden;
	overflow: hidden;
	pointerevents: none;

	${(props) =>
		props.disableTransition &&
		props.open &&
		css`
			${({ orientation }) => (orientation === 'horizontal' ? 'width' : 'height')}: fit-content;
			visibility: visible;
			pointerevents: auto;
		`};
`;

const Collapse = React.forwardRef(function CollapseFn(
	{ children, open, orientation, crossSize, disableTransition, ...rest },
	ref
) {
	const innerRef = useRef(undefined);
	const collapseRef = useCombinedRefs(ref, innerRef);
	const propToTransition = useMemo(
		() => (orientation === 'horizontal' ? 'width' : 'height'),
		[orientation]
	);
	const propScrollLabel = useMemo(
		() => `scroll${propToTransition.charAt(0).toUpperCase() + propToTransition.slice(1)}`,
		[propToTransition]
	);

	return (
		<Transition
			ref={collapseRef}
			apply={open}
			from={{
				[propToTransition]: '0px'
			}}
			to={{
				[propToTransition]: () => `${collapseRef.current[propScrollLabel]}px`,
				visibility: 'visible'
			}}
			end={{
				[propToTransition]: 'auto',
				visibility: 'visible',
				pointerEvents: 'auto'
			}}
			disabled={disableTransition}
		>
			<CollapseEl
				crossSize={crossSize}
				open={open}
				orientation={orientation}
				disableTransition={disableTransition}
				{...rest}
			>
				{children}
			</CollapseEl>
		</Transition>
	);
});

Collapse.propTypes = {
	/** Orientation of the collapsing action */
	orientation: PropTypes.oneOf(['vertical', 'horizontal']),
	/** control prop */
	open: PropTypes.bool.isRequired,
	// maxSize: PropTypes.string.isRequired,
	/** Size of the collapse element on the opposite axis
	 * (e.g. height if the collapse orientation is horizontal) */
	crossSize: PropTypes.string,
	/** Disable the transition */
	disableTransition: PropTypes.bool
};

Collapse.defaultProps = {
	orientation: 'horizontal',
	disableTransition: false,
	crossSize: undefined
};

export default Collapse;

const CollapserNotch = styled.div`
	width: 4px;
	height: 24px;
	background: ${({ theme }) => theme.palette.gray1.regular};
	border-radius: ${({ theme }) => theme.borderRadius};
`;

const Collapser = React.forwardRef(function CollapserFn({ clickCallback }, ref) {
	return (
		<Container
			ref={ref}
			style={{ cursor: 'pointer' }}
			padding={{ horizontal: 'extrasmall' }}
			height="fill"
			width={12}
			onClick={clickCallback}
		>
			<CollapserNotch />
		</Container>
	);
});

Collapser.propTypes = {
	clickCallback: PropTypes.func.isRequired
};

export { Collapser };
