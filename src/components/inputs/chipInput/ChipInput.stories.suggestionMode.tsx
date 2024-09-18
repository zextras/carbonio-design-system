/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState, useRef } from 'react';

import { ChipInput, ChipInputProps } from './ChipInput';

export default {};
const allOptions = [
	{ id: '1', label: 'First option' },
	{ id: '2', label: 'Second option' },
	{ id: '3', label: 'Third option' },
	{ id: '4', label: 'Fourth option' },
	{ id: '5', label: 'Fifth option' }
];

export const ChipInputSuggestionMode = ({
	withFocusListener = false,
	...props
}: ChipInputProps & { withFocusListener?: boolean }): React.JSX.Element => {
	const [options, setOptions] = useState<ChipInputProps['options']>();
	const inputRef = useRef<HTMLInputElement>(null);

	const filterOptions = useCallback(({ textContent }: { textContent: string | null }) => {
		setOptions(
			allOptions.filter(
				(option) => !textContent || option.label.toLowerCase().includes(textContent.toLowerCase())
			)
		);
	}, []);

	const iconAction = useCallback(() => {
		setOptions((prevState) => {
			if (inputRef.current && inputRef.current.value.length > 0) {
				return prevState;
			}
			return [...allOptions];
		});
	}, []);

	const initOptions = useCallback(() => {
		if (withFocusListener) {
			filterOptions({ textContent: inputRef.current?.value ?? '' });
		}
	}, [filterOptions, withFocusListener]);

	return (
		<ChipInput
			{...props}
			options={options}
			onInputType={filterOptions}
			iconAction={iconAction}
			inputRef={inputRef}
			onFocus={initOptions}
		/>
	);
};
