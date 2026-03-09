/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState, useCallback } from 'react';

import type { CheckboxProps } from './Checkbox';
import { Checkbox } from './Checkbox';
import type { AnyColor } from '../../../types/utils';
import { Select } from '../select/Select';

export const CheckboxPropsCombinator = (): React.JSX.Element => {
	const [checked1, setChecked1] = useState(false);

	const onClick1 = useCallback(() => setChecked1((c) => !c), []);

	const sizeItems = [
		{
			label: 'small',
			value: 'small'
		},
		{
			label: 'medium',
			value: 'medium'
		}
	];
	const [selectedSize, setSelectedSize] = useState<CheckboxProps['size']>('medium');

	const iconColorItems = [
		{
			label: 'currentColor',
			value: 'currentColor'
		},
		{
			label: 'transparent',
			value: 'transparent'
		},
		{
			label: 'primary',
			value: 'primary'
		},
		{
			label: 'secondary',
			value: 'secondary'
		},
		{
			label: 'header',
			value: 'header'
		},
		{
			label: 'highlight',
			value: 'highlight'
		},
		{
			label: 'gray0',
			value: 'gray0'
		},
		{
			label: 'gray1',
			value: 'gray1'
		},
		{
			label: 'gray2',
			value: 'gray2'
		},
		{
			label: 'gray3',
			value: 'gray3'
		},
		{
			label: 'gray4',
			value: 'gray4'
		},
		{
			label: 'gray5',
			value: 'gray5'
		},
		{
			label: 'gray6',
			value: 'gray6'
		},
		{
			label: 'warning',
			value: 'warning'
		},
		{
			label: 'error',
			value: 'error'
		},
		{
			label: 'success',
			value: 'success'
		},
		{
			label: 'info',
			value: 'info'
		},
		{
			label: 'text',
			value: 'text'
		}
	];
	const [selectedIconColor, setSelectedIconColor] = useState('gray0');

	return (
		<>
			<Select
				items={sizeItems}
				background="gray5"
				label="Size"
				onChange={(e) => setSelectedSize(e as CheckboxProps['size'])}
				defaultSelection={{ value: 'medium', label: 'medium' }}
			/>
			<Select
				items={iconColorItems}
				background="gray5"
				label="iconColor"
				onChange={(e) => setSelectedIconColor(e as AnyColor)}
				defaultSelection={{ value: 'gray0', label: 'gray0' }}
			/>
			<Checkbox
				iconColor={selectedIconColor}
				size={selectedSize}
				value={checked1}
				onClick={onClick1}
				label={`size ${selectedSize}, not disabled, iconColor ${selectedIconColor}`}
			/>
			<Checkbox
				disabled
				iconColor={selectedIconColor}
				size={selectedSize}
				value={checked1}
				onClick={onClick1}
				label={`size ${selectedSize}, disabled, iconColor ${selectedIconColor}`}
			/>
		</>
	);
};
