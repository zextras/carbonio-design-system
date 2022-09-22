/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { Fragment } from 'react';

import { map } from 'lodash';
import styled from 'styled-components';

import { Text } from '../../src/components/basic/Text';
import { Container } from '../../src/components/layout/Container';
import { Padding } from '../../src/components/layout/Padding';

const PaletteEl = styled.div`
	width: 13.125rem;
	height: 6.25rem;
	background: ${(props) => props.color};
	border-radius: 0.5rem;
	box-shadow: 0.375rem 0.25rem 0.625rem 0 rgba(136, 136, 136, 0.5);
`;
const TextFrame = styled.div`
	background: rgba(200, 200, 200, 0.8);
	padding: 0.25rem 0.5rem;
	border-radius: 0.5rem 0.5rem 0 0;
`;
const ScrollFrame = styled.div`
	width: 100%;
	overflow-x: auto;
`;
const Palette = ({ palette }) => (
	<Container width="fill" height="fit" orientation="vertical" crossAlignment="flex-start">
		{map(palette, (set, name) => (
			<Fragment key={name}>
				<Text size="large">{name}</Text>
				<ScrollFrame>
					<Container
						orientation="horizontal"
						height="fit"
						width="fit"
						padding={{ all: 'extrasmall', bottom: 'large' }}
						mainAlignment="flex-start"
					>
						{map(set, (color, colorName) => (
							<Padding horizontal="extrasmall" key={colorName}>
								<PaletteEl name={name} color={color}>
									<TextFrame>
										<Text size="large">{`${colorName}: ${color}`}</Text>
									</TextFrame>
								</PaletteEl>
							</Padding>
						))}
					</Container>
				</ScrollFrame>
			</Fragment>
		))}
	</Container>
);

export default Palette;
