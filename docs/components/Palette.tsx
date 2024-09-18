/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { Fragment } from 'react';

import styled from 'styled-components';

import { Text, Container, Row, ThemeProvider, useTheme } from '../../src';

const PaletteEl = styled(Container)`
	height: 6.25rem;
	border-radius: 0.5rem;
	box-shadow: 0.375rem 0.25rem 0.625rem 0 rgba(136, 136, 136, 0.5);
`;
const TextFrame = styled(Row)`
	border-radius: 0.5rem 0.5rem 0 0;
`;
const ScrollFrame = styled.div`
	width: 100%;
	overflow-x: auto;
`;

const PaletteComponent = (): React.JSX.Element => {
	const { palette } = useTheme();
	return (
		<Container width="fill" height="fit" orientation="vertical" crossAlignment="flex-start">
			{Object.entries(palette).map(([name, set]) => (
				<Fragment key={name}>
					<Text size="large" weight={'bold'}>
						{name}
					</Text>
					<ScrollFrame>
						<Container
							orientation="horizontal"
							height="fit"
							width="fill"
							padding={{ all: 'extrasmall', bottom: 'large' }}
							mainAlignment="stretch"
							gap={'0.25rem'}
						>
							{Object.entries(set).map(([variantName, color]) => (
								<PaletteEl key={variantName} background={color} mainAlignment={'flex-start'}>
									<TextFrame
										background={'rgba(200, 200, 200, 0.8)'}
										padding={{ vertical: '0.25rem', horizontal: '0.5rem' }}
										width={'fill'}
									>
										<Text
											size="extrasmall"
											overflow={'break-word'}
										>{`${variantName}: ${color}`}</Text>
									</TextFrame>
								</PaletteEl>
							))}
						</Container>
					</ScrollFrame>
				</Fragment>
			))}
		</Container>
	);
};

export const Palette = (): React.JSX.Element => (
	<ThemeProvider>
		<PaletteComponent />
	</ThemeProvider>
);
