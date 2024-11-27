/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useRef, useState } from 'react';

import { Slider } from './Slider';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export const UncontrolledSlider = (): React.JSX.Element => {
	const options = [
		{ value: 'optA', label: 'option 1' },
		{ value: 'optB', label: 'option 2' },
		{ value: 'optC', label: 'option 3' },
		{ value: 'optD', label: 'option 4' },
		{ value: 'optE', label: 'option 5' }
	];

	const inputRef = useRef<HTMLInputElement>(null);
	const [valueToPrint, setValueToPrint] = useState<string | undefined>();

	const printValue = useCallback(() => {
		if (inputRef.current?.value !== undefined) {
			setValueToPrint(inputRef.current.value);
		} else {
			setValueToPrint(undefined);
		}
	}, []);

	return (
		<Container orientation={'vertical'} gap="1rem">
			<Slider options={options.map((option) => option.label)} inputRef={inputRef} value={1} />
			<Button onClick={printValue} label="print value" />
			<Text>Value: {valueToPrint}</Text>
		</Container>
	);
};
