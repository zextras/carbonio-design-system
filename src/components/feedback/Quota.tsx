/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { Container, ContainerProps } from '../layout/Container';

const QuotaBar = styled(Container)`
	min-width: 4rem;
`;

interface QuotaProps extends ContainerProps {
	/** Quota background color */
	background?: keyof DefaultTheme['palette'];
	/** Quota percentage */
	fill: number;
	/** Quota fill background color */
	fillBackground?: keyof DefaultTheme['palette'];
	/** Quota height */
	height?: number | string;
}

const Quota = React.forwardRef<HTMLDivElement, QuotaProps>(function QuotaFn(
	{ background = 'gray6', fill, fillBackground = 'primary', height = '0.5rem', ...rest },
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
