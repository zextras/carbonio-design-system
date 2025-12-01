/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState, useCallback, useMemo } from 'react';

import { map } from 'lodash';

import { Radio } from './Radio';
import { useTheme } from '../../../theme/theme-utils';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/Row';
import type { SelectItem } from '../Select';
import { Select } from '../Select';

export const RadioPropsCombinator = (): React.JSX.Element => {
	const [valueSeleted, setValueSelected] = useState('value1');
	const [selectedSize, setSelectedSize] = useState<'small' | 'medium'>('medium');
	const [selectedIconColor, setSelectedIconColor] = useState('gray0');

	const onChange = useCallback((v: string) => setValueSelected(v), []);

	const theme = useTheme();

	const sizeItems = useMemo(
		(): SelectItem<'small' | 'medium'>[] => [
			{ label: 'small', value: 'small' },
			{ label: 'medium', value: 'medium' }
		],
		[]
	);

	const iconColorItems = useMemo(
		() =>
			map(theme.palette, (value, key) => ({
				label: key,
				value: key
			})),
		[theme]
	);

	const selectSize = useCallback((newValue: 'small' | 'medium' | null) => {
		if (newValue) {
			setSelectedSize(newValue);
		}
	}, []);

	const selectIconColor = useCallback((newValue: string | null) => {
		setSelectedIconColor(newValue ?? 'gray0');
	}, []);

	return (
		<Container gap={'0.5rem'}>
			<Container gap={'0.5rem'} orientation={'horizontal'}>
				<Row width={'50%'}>
					<Select
						items={sizeItems}
						background="gray5"
						label="Size"
						onChange={selectSize}
						defaultSelection={{ value: 'medium', label: 'medium' }}
					/>
				</Row>
				<Row width={'50%'}>
					<Select
						items={iconColorItems}
						background="gray5"
						label="iconColor"
						onChange={selectIconColor}
						defaultSelection={{ value: 'gray0', label: 'gray0' }}
					/>
				</Row>
			</Container>
			<Radio
				value={'value1'}
				iconColor={selectedIconColor}
				size={selectedSize}
				checked={valueSeleted === 'value1'}
				onChange={onChange}
				label={`size ${selectedSize}, not disabled, iconColor ${selectedIconColor}`}
			/>
			<Radio
				value={'value2'}
				disabled
				iconColor={selectedIconColor}
				size={selectedSize}
				checked={valueSeleted === 'value2'}
				onChange={onChange}
				label={`size ${selectedSize}, disabled, iconColor ${selectedIconColor}`}
			/>
		</Container>
	);
};
