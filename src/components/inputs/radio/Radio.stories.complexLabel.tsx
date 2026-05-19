/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState, useCallback } from 'react';

import { Radio } from './Radio';
import { Text } from '../../basic/text/Text';
import { Row } from '../../layout/row/Row';
import { Input } from '../input/Input';
import { Select } from '../select/Select';

export const RadioComplexLabel = (): React.JSX.Element => {
	const [activeValue, setActiveValue] = useState('salad');

	const updateActiveValue = useCallback(
		(value: string) => () => {
			setActiveValue((prevState) => (value === prevState ? '' : value));
		},
		[]
	);

	return (
		<div>
			<Radio
				label="Chicken"
				value="chicken"
				onChange={updateActiveValue('chicken')}
				checked={activeValue === 'chicken'}
			/>
			<Radio
				label="Salad"
				value="salad"
				onChange={updateActiveValue('salad')}
				checked={activeValue === 'salad'}
			/>
			<Radio
				label="Tomato"
				value="tomato"
				onChange={updateActiveValue('tomato')}
				checked={activeValue === 'tomato'}
			/>
			<Radio
				label={
					<Row takeAvailableSpace mainAlignment="flex-start" wrap="nowrap" gap={'0.25rem'}>
						<Text overflow="break-word">Day</Text>
						<Input background="gray5" label="Day" defaultValue="17" />
						<Text overflow="break-word">of every</Text>
						<Input background="gray5" label="Month" defaultValue="1" />
					</Row>
				}
				value="complex-1"
				onChange={updateActiveValue('complex-1')}
				checked={activeValue === 'complex-1'}
			/>
			<Radio
				label={
					<Row takeAvailableSpace mainAlignment="flex-start" wrap="nowrap" gap={'0.25rem'}>
						<Text overflow="break-word">The</Text>
						<Select
							display="inline-block"
							dropdownWidth="auto"
							background="gray5"
							label="Number"
							items={[
								{ label: 'First', value: '1' },
								{ label: 'Second', value: '2' }
							]}
							defaultSelection={{ value: '1', label: 'Second' }}
							onChange={() => undefined}
						/>
						<Select
							display="inline-block"
							dropdownWidth="auto"
							background="gray5"
							label="Day"
							items={[{ label: 'Weekend day', value: '1' }]}
							defaultSelection={{ value: '1', label: 'Weekend day' }}
							onChange={() => undefined}
						/>
						<Text overflow="break-word">of every</Text>
						<Select
							display="inline-block"
							dropdownWidth="auto"
							background="gray5"
							label="Month"
							items={[{ label: 'January', value: '1' }]}
							defaultSelection={{ value: '1', label: 'January' }}
							onChange={() => undefined}
						/>
					</Row>
				}
				value="complex-2"
				onChange={updateActiveValue('complex-2')}
				checked={activeValue === 'complex-2'}
			/>
			<Radio
				label="Mayo"
				value="mayo"
				disabled
				onChange={updateActiveValue('mayo')}
				checked={activeValue === 'mayo'}
			/>
		</div>
	);
};
