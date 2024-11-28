/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Slider } from './Slider';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export const ControlledSlider = (): React.JSX.Element => {
	const options = useMemo(
		() => [
			{ value: 'optA', label: 'option 1' },
			{ value: 'optB', label: 'option 2' },
			{ value: 'optC', label: 'option 3' },
			{ value: 'optD', label: 'option 4' },
			{ value: 'optE', label: 'option 5' },
			{ value: 'optF', label: 'option 6' }
		],
		[]
	);
	const DEFAULT_VALUE_INDEX = Math.floor(options.length / 2);

	const [value, setValue] = useState(DEFAULT_VALUE_INDEX);
	const selectedOptionRef = useRef('');

	const onSliderChange = useCallback(
		(_ev: React.SyntheticEvent, newValue: number) => {
			setValue(newValue);
			if (options[newValue]) {
				selectedOptionRef.current = options[newValue].value;
			}
		},
		[options]
	);

	const decreaseByStep = useCallback(() => {
		setValue((prevState) => {
			const newValue = prevState > 0 ? prevState - 1 : prevState;
			if (options[newValue]) {
				selectedOptionRef.current = options[newValue].value;
				return newValue;
			}
			return prevState;
		});
	}, [options]);

	const increaseByStep = useCallback(() => {
		setValue((prevState) => {
			const newValue = prevState < options.length - 1 ? prevState + 1 : prevState;
			if (options[newValue]) {
				selectedOptionRef.current = options[newValue].value;
				return newValue;
			}
			return prevState;
		});
	}, [options]);

	return (
		<Container orientation={'vertical'} gap="1rem">
			<Container orientation={'horizontal'} gap="1rem">
				<Button
					width={'fit'}
					minWidth={'fit-content'}
					label={'-'}
					type={'ghost'}
					onClick={decreaseByStep}
				/>
				<Slider
					options={options.map((option) => option.label)}
					value={value}
					onChange={onSliderChange}
				/>
				<Button
					width={'fit'}
					minWidth={'fit-content'}
					label={'+'}
					type={'ghost'}
					onClick={increaseByStep}
				/>
			</Container>
			<Text>Value: {value}</Text>
			<Text>Selected option: {selectedOptionRef.current}</Text>
		</Container>
	);
};
