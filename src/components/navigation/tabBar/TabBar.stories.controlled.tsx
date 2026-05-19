/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { TabBar } from './TabBar';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/padding/Padding';
import { Row } from '../../layout/row/Row';

export const TabBarControlled = (): React.JSX.Element => {
	const items = [
		{ id: 'tab-one', label: 'First Tab' },
		{ id: 'tab-two', label: 'Second Tab' }
	];
	const [selected, setSelected] = useState('tab-one');

	return (
		<>
			<TabBar
				background="transparent"
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
			<Container
				background="gray4"
				width={512}
				padding={{ all: 'small' }}
				crossAlignment="flex-start"
			>
				<Text size="large">{`Selected: '${selected}'`}</Text>
				<Row>
					{items.map((item) => (
						<Padding key={item.id} all="small">
							<Button label={`Select ${item.id}`} onClick={() => setSelected(item.id)} />
						</Padding>
					))}
				</Row>
			</Container>
		</>
	);
};
