/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { Catcher } from './Catcher';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/padding/Padding';

const GoodComponent = ({ good }: { good: boolean }): React.JSX.Element => {
	if (!good) {
		throw new Error('Join the dark side, accept my cookies!');
	}
	return (
		<Text size="large" color="success">
			I&apos;m a good component!
		</Text>
	);
};

export const CatcherDefault = (): React.JSX.Element => {
	const [evil, turnEvil] = useState(false);
	return (
		<Catcher>
			<Container width="50%">
				<Button
					icon="CodeDownload"
					label="Download virus"
					onClick={(): void => turnEvil(true)}
					backgroundColor="gray2"
					labelColor="error"
				/>
				<Padding all="small">
					<Catcher>
						<GoodComponent good />
					</Catcher>
				</Padding>
				<Padding all="small">
					<Catcher>
						<GoodComponent good />
					</Catcher>
				</Padding>
				<Padding all="small">
					<Catcher>
						<GoodComponent good />
					</Catcher>
				</Padding>
				<Padding all="small">
					<Catcher onError={(): void => console.log('I caught an error')}>
						<GoodComponent good={!evil} />
					</Catcher>
				</Padding>
				<Padding all="small">
					<Catcher>
						<GoodComponent good />
					</Catcher>
				</Padding>
				<Padding all="small">
					<Catcher>
						<GoodComponent good />
					</Catcher>
				</Padding>
			</Container>
		</Catcher>
	);
};
