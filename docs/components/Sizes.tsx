/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Container, Text, ThemeProvider, useTheme } from '../../src';
import type { ThemeObj } from '../../src/theme/theme';

const SizesComponent = (): React.JSX.Element => {
	const theme = useTheme();

	return (
		<Container
			orientation="vertical"
			padding={{ all: 'large' }}
			height={'fit'}
			crossAlignment={'flex-start'}
		>
			{Object.entries(theme.sizes.font).map(([key, size]) => (
				<Text key={key} size={key as keyof ThemeObj['sizes']['font']}>
					This text is {key} {size}
				</Text>
			))}
		</Container>
	);
};

export const Sizes = (): React.JSX.Element => (
	<ThemeProvider>
		<SizesComponent />
	</ThemeProvider>
);
