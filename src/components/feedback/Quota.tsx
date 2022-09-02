/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled from 'styled-components';
import type { ThemeObj } from '../../theme/theme';
import { Container, ContainerProps } from '../layout/Container';

const QuotaBar = styled(Container)`
	min-width: 64px;
`;

interface QuotaProps extends ContainerProps {
	/** Quota background color */
	background?: keyof ThemeObj['palette'];
	/** Quota percentage */
	fill: number;
	/** Quota fill background color */
	fillBackground?: keyof ThemeObj['palette'];
	/** Quota height */
	height?: number | string;
}

const Quota = React.forwardRef<HTMLDivElement, QuotaProps>(function QuotaFn(
	{ background = 'gray6', fill, fillBackground = 'primary', height = '8px', ...rest },
	ref
) {
	return (
		<QuotaBar
			ref={ref}
			background={background}
			crossAlignment="flex-start"
			height={height}
			{...rest}
		>
			<Container background={fillBackground} width={`${fill}%`} height="100%" />
		</QuotaBar>
	);
});

export { Quota, QuotaProps };
