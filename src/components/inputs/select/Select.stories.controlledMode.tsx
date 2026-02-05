/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useMemo, useCallback } from 'react';

import { Select, type SelectItem } from './Select';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

const items: SelectItem[] = [
	{ label: 'Hi', value: '1' },
	{ label: 'Hello', value: '2' },
	{ label: 'Good day', value: '3' },
	{ label: 'Goodnight', value: '4' },
	{ label: 'Disabled option', value: '5', disabled: true }
];

export const SelectControlledMode = (): React.JSX.Element => {
	const [selected, setSelected] = useState<string | null>('4');

	const selection = useMemo(() => items.find((item) => item.value === selected), [selected]);

	const onChange = useCallback((newValue: string | null) => {
		setSelected(newValue);
	}, []);

	return (
		<Container gap="1rem">
			<Select
				items={items}
				label="Select an item (Controlled)"
				onChange={onChange}
				selection={selection!}
			/>
			<Text>Currently selected: {selection?.label ?? 'no selection'}</Text>
		</Container>
	);
};
