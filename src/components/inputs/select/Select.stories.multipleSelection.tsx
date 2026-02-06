/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useCallback } from 'react';

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

export const SelectMultipleSelection = (): React.JSX.Element => {
	const [selected, setSelected] = useState<SelectItem[]>([]);

	const onChange = useCallback((newValue: SelectItem[]) => {
		setSelected(newValue);
	}, []);

	return (
		<Container gap="1rem">
			<Select
				items={items}
				label="Select multiple items"
				onChange={onChange}
				multiple
				selection={selected}
			/>
			<Text>
				Currently selected:{' '}
				{selected.length > 0 ? selected.map((i) => i.label).join(', ') : 'no selection'}
			</Text>
		</Container>
	);
};
