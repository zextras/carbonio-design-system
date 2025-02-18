/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Tooltip } from './Tooltip';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/Padding';

export const NestedTooltip = (): React.JSX.Element => (
	<Container background={'gray5'} orientation={'horizontal'} mainAlignment={'space-evenly'}>
		<Padding horizontal={'small'}>
			<Text>This container has no tooltip</Text>
		</Padding>
		<Tooltip label={'This has a tooltip'}>
			<Container background={'gray2'}>
				<Tooltip label={'Also this button has a tooltip'}>
					<Button onClick={() => undefined} label={'Button'} />
				</Tooltip>
				<Padding vertical={'small'}>
					<Text>This container shows a tooltip</Text>
				</Padding>
				<Tooltip label={'Another tooltip'}>
					<Container
						width={'40%'}
						background={'gray3'}
						orientation={'vertical'}
						crossAlignment={'center'}
					>
						<Padding vertical={'small'} />
						<Text>This container shows another tooltip</Text>
						<Tooltip label={'Yet another tooltip'}>
							<Container
								width={'80%'}
								background={'gray4'}
								orientation={'vertical'}
								crossAlignment={'flex-start'}
							>
								<Text>This text will shows yet another tooltip</Text>
							</Container>
						</Tooltip>
					</Container>
				</Tooltip>
			</Container>
		</Tooltip>
	</Container>
);
