/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState } from 'react';

import { ChipInput, ChipInputProps } from './ChipInput';
import { Container } from '../../layout/Container';
import { Switch, SwitchProps } from '../Switch';

export const ChipInputDisabledWithOptions = (props: ChipInputProps): React.JSX.Element => {
	const [options, setOptions] = useState<ChipInputProps['options']>();

	const toggleOptions = useCallback<NonNullable<SwitchProps['onChange']>>((checked) => {
		if (checked) {
			setOptions([
				{
					id: 'item 1',
					label: 'Option 1',
					value: 'value-1'
				},
				{
					id: 'item 2',
					label: 'Option 2',
					value: 'value-2'
				}
			]);
		} else {
			setOptions(undefined);
		}
	}, []);
	return (
		<Container>
			<Switch label={'Show options'} onChange={toggleOptions} />
			<ChipInput {...props} options={options} />
		</Container>
	);
};
