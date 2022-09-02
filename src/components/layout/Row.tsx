/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { Container, ContainerProps } from './Container';

interface RowProps extends ContainerProps {
	display?: string;
	flexBasis?: string;
	flexGrow?: 'unset' | number;
	flexShrink?: 'unset' | number;
	order?: 'unset' | number;
	takeAvailableSpace?: boolean;
}

const ContainerEl = styled(Container)<RowProps>`
	display: ${({ display }): SimpleInterpolation => display};
	flex-basis: ${({ flexBasis }): SimpleInterpolation => flexBasis};
	flex-grow: ${({ flexGrow }): SimpleInterpolation => flexGrow};
	flex-shrink: ${({ flexShrink }): SimpleInterpolation => flexShrink};
	order: ${({ order }): SimpleInterpolation => order};
	${({ takeAvailableSpace }): SimpleInterpolation =>
		takeAvailableSpace &&
		css`
			min-width: 0;
			flex-basis: 0;
			flex-grow: 1;
		`};
`;

const Row = React.forwardRef<HTMLDivElement, RowProps>(function RowFn({ children, ...rest }, ref) {
	return (
		<ContainerEl ref={ref} {...rest}>
			{children}
		</ContainerEl>
	);
});

Row.defaultProps = {
	display: 'flex',
	orientation: 'horizontal',
	borderRadius: 'none',
	height: 'auto',
	width: 'auto',
	wrap: 'wrap',
	flexBasis: 'unset',
	flexGrow: 'unset',
	flexShrink: 1,
	order: 'unset',
	takeAvailableSpace: false,
	maxWidth: '100%'
};

export { Row, RowProps };
