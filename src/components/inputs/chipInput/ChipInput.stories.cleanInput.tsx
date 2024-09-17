/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useRef, useState } from 'react';

import { ChipInput, ChipInputProps, ChipItem } from './ChipInput';
import { Button } from '../../basic/button/Button';
import { Container } from '../../layout/Container';

export const ChipInputControlledCleanInput = (props: ChipInputProps): React.JSX.Element => {
	const [value, setValue] = useState<ChipItem[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const counterRef = useRef<number>(0);

	const onChange = useCallback<NonNullable<ChipInputProps['onChange']>>((items) => {
		setValue(items);
	}, []);

	const addValue = useCallback(() => {
		setValue((prevState) => [...prevState, { label: `Created with button ${counterRef.current}` }]);
		counterRef.current += 1;
	}, []);

	const addValueAndReset = useCallback(() => {
		addValue();
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	}, [addValue]);

	return (
		<Container gap={'0.25rem'}>
			<Container orientation={'horizontal'} gap={'0.25rem'}>
				<Button onClick={addValue} label={'Add value only'} />
				<Button onClick={addValueAndReset} label={'Add value and reset input'} />
			</Container>
			<ChipInput {...props} value={value} onChange={onChange} inputRef={inputRef} />
		</Container>
	);
};
