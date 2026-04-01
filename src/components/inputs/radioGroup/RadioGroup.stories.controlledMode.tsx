/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { RadioGroup } from './RadioGroup';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/padding/Padding';
import { Row } from '../../layout/Row';
import { Input } from '../input/Input';
import { Radio } from '../radio/Radio';
import { Select } from '../select/Select';

export const ControlledRadioGroup = (): React.JSX.Element => {
	const [activeValue, setActiveValue] = useState<string | undefined>('salad');

	const changeActiveValue = useCallback((newValue: string | undefined) => {
		setActiveValue(newValue);
	}, []);

	return (
		<Container crossAlignment="flex-start" gap="1rem">
			<Text>Selected value: {activeValue}</Text>
			<RadioGroup value={activeValue} onChange={changeActiveValue} name="controlled-radio">
				<Radio label="Chicken" value="chicken" />
				<Radio label="Salad" value="salad" />
				<Radio label="Tomato" value="tomato" />
				<Radio
					label={
						<Row takeAvailableSpace mainAlignment="flex-start" wrap="nowrap">
							<Text overflow="break-word">Day</Text>
							<Padding horizontal="small">
								<Input background="gray5" label="Day" defaultValue="17" />
							</Padding>
							<Text overflow="break-word">of every</Text>
							<Padding left="small">
								<Input background="gray5" label="Month" defaultValue="1" />
							</Padding>
						</Row>
					}
					value="complex-1"
				/>
				<Radio
					label={
						<Row takeAvailableSpace mainAlignment="flex-start" wrap="nowrap" gap="0.25rem">
							<Text overflow="break-word">The</Text>
							<Select
								display="inline-block"
								dropdownWidth="auto"
								background="gray5"
								label="Number"
								items={[{ label: 'Second', value: '1' }]}
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
				/>
				<Radio label="Mayo" value="mayo" disabled />
			</RadioGroup>
		</Container>
	);
};
