/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { Container } from '../layout/Container';
import { Transition } from './Transition';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const CollapseEl = styled.div<{
	crossSize?: string;
	orientation: 'horizontal' | 'vertical';
	disableTransition: boolean;
	open: boolean;
}>`
	${({ crossSize, orientation }): SimpleInterpolation =>
		crossSize && `${orientation === 'horizontal' ? 'height' : 'width'}: ${crossSize};`};
	${({ orientation }): string => (orientation === 'horizontal' ? 'width' : 'height')}: 0;
	visibility: hidden;
	overflow: hidden;
	pointer-events: none;

	${({ disableTransition, open, orientation }): SimpleInterpolation =>
		disableTransition &&
		open &&
		css`
			${orientation === 'horizontal' ? 'width' : 'height'}: fit-content;
			visibility: visible;
			pointer-events: auto;
		`};
`;

interface CollapseProps extends HTMLAttributes<HTMLDivElement> {
	/** Orientation of the collapsing action */
	orientation?: 'vertical' | 'horizontal';
	/** control prop */
	open: boolean;
	/** Size of the collapse element on the opposite axis
	 * (e.g. height if the collapse orientation is horizontal) */
	crossSize?: string;
	/** Disable the transition */
	disableTransition?: boolean;
	/** Content */
	children: React.ReactNode | React.ReactNode[];
}

const Collapse = React.forwardRef<HTMLElement, CollapseProps>(function CollapseFn(
	{ children, open, orientation = 'horizontal', crossSize, disableTransition = false, ...rest },
	ref
) {
	const collapseRef = useCombinedRefs<HTMLElement>(ref);

	const propToTransition = useMemo<'width' | 'height'>(
		() => (orientation === 'horizontal' ? 'width' : 'height'),
		[orientation]
	);

	const propScrollLabel = useMemo<`scroll${Capitalize<typeof propToTransition>}`>(
		() =>
			`scroll${
				(propToTransition.charAt(0).toUpperCase() + propToTransition.slice(1)) as Capitalize<
					typeof propToTransition
				>
			}`,
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
				[propToTransition]: (): string =>
					`${collapseRef.current ? collapseRef.current[propScrollLabel] : 0}px`,
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

const CollapserNotch = styled.div`
	width: 4px;
	height: 24px;
	background: ${({ theme }): string => theme.palette.gray1.regular};
	border-radius: ${({ theme }): string => theme.borderRadius};
`;

interface CollapserProps {
	clickCallback: React.ReactEventHandler;
}

const Collapser = React.forwardRef<HTMLDivElement, CollapserProps>(function CollapserFn(
	{ clickCallback },
	ref
) {
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

export { Collapse, CollapseProps, Collapser, CollapserProps };
