/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { TabBar } from './TabBar';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export const TabBarForceWithEquallyDistributed = (): React.JSX.Element => {
	const items = [
		{ id: 'tab-one', label: 'looooooooooooooooooooooooooooooong label' },
		{ id: 'tab-two', label: 'Second Tab' },
		{ id: 'tab-three', label: 'Tab 3' }
	];
	const [selected, setSelected] = useState('tab-one');

	return (
		<>
			<TabBar
				background={'transparent'}
				items={items}
				selected={selected}
				onChange={(ev, selectedId) => {
					console.log(ev);
					console.log(selectedId);
					setSelected(selectedId);
				}}
				width={512}
				height={48}
			/>
			<TabBar
				background={'transparent'}
				items={items}
				selected={selected}
				onChange={(ev, selectedId) => {
					console.log(ev);
					console.log(selectedId);
					setSelected(selectedId);
				}}
				width={512}
				height={48}
				forceWidthEquallyDistributed
			/>
			<Container
				background="gray4"
				width={512}
				padding={{ all: 'small' }}
				crossAlignment="flex-start"
			>
				<Text size="large">{`Selected: '${selected}'`}</Text>
			</Container>
		</>
	);
};
