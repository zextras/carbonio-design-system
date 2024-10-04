/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled, { css } from 'styled-components';

import { Container, ContainerProps } from './Container';
import { With$Prefix } from '../../types/utils';

interface RowProps extends ContainerProps {
	display?: string;
	order?: 'unset' | number;
	takeAvailableSpace?: boolean;
}

const ContainerEl = styled(Container)<With$Prefix<RowProps>>`
	display: ${({ $display }): string | undefined => $display};
	order: ${({ $order }): number | string | undefined => $order};
	${({ $takeAvailableSpace }): ReturnType<typeof css> | false | undefined =>
		$takeAvailableSpace &&
		css`
			min-width: 0;
			flex-basis: 0;
			flex-grow: 1;
		`};
`;

const Row = React.forwardRef<HTMLDivElement, RowProps>(function RowFn(
	{
		display = 'flex',
		orientation = 'horizontal',
		borderRadius = 'none',
		height = 'auto',
		width = 'auto',
		wrap = 'wrap',
		flexBasis = 'unset',
		flexGrow = 'unset',
		flexShrink = 1,
		order = 'unset',
		takeAvailableSpace = false,
		maxWidth = '100%',
		children,
		...rest
	},
	ref
) {
	return (
		<ContainerEl
			ref={ref}
			orientation={orientation}
			borderRadius={borderRadius}
			height={height}
			width={width}
			wrap={wrap}
			flexBasis={flexBasis}
			flexGrow={flexGrow}
			flexShrink={flexShrink}
			maxWidth={maxWidth}
			$display={display}
			$order={order}
			$takeAvailableSpace={takeAvailableSpace}
			{...rest}
		>
			{children}
		</ContainerEl>
	);
});

export { Row, RowProps };
