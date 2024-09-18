/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useMemo, useState } from 'react';

import {
	Container,
	Input,
	ThemeProvider,
	Icon,
	Text,
	InputProps,
	Select,
	SelectItem,
	SingleSelectionOnChange,
	PaletteColor
} from '../../src';
import { Theme } from '../../src/theme/theme';

const sortedIcons = Object.keys(Theme.icons).toSorted((a, b) => (a <= b ? -1 : 1));
const paletteColors = Object.keys(Theme.palette).map(
	(color) =>
		({
			label: color,
			value: color as PaletteColor
		}) satisfies SelectItem<PaletteColor>
);
export const Icons = (): React.JSX.Element => {
	const [filter, setFilter] = useState('');
	const [color, setColor] = useState<PaletteColor | undefined>();

	const onInputChange = useCallback<NonNullable<InputProps['onChange']>>((e) => {
		setFilter(e.target.value);
	}, []);

	const icons = useMemo(
		() =>
			sortedIcons.reduce<React.JSX.Element[]>((accumulator, icon) => {
				if (filter.trim().length === 0 || icon.toLowerCase().toLowerCase().includes(filter)) {
					accumulator.push(
						<Container
							key={icon}
							orientation="vertical"
							height={'fit'}
							width={'25%'}
							mainAlignment="center"
							padding={{ vertical: 'medium', horizontal: 'extrasmall' }}
							gap={'0.75rem'}
							borderColor={'gray4'}
						>
							<Icon color={color} size="large" icon={icon} />
							<Text size={'extrasmall'}>{icon}</Text>
						</Container>
					);
				}
				return accumulator;
			}, []),
		[color, filter]
	);

	const onColorChange = useCallback<SingleSelectionOnChange<PaletteColor>>((value) => {
		setColor(value ?? undefined);
	}, []);

	return (
		<ThemeProvider>
			<Container gap={'0.5rem'} mainAlignment={'flex-start'}>
				<Container orientation={'horizontal'} gap={'0.5rem'} height={'fit'} width={'fill'}>
					<Input label="Filter" onChange={onInputChange} />
					<Select items={paletteColors} onChange={onColorChange} label={'Color'} />
				</Container>
				<Container
					orientation="horizontal"
					height="fit"
					width="fill"
					mainAlignment={'flex-start'}
					crossAlignment="flex-start"
					wrap={'wrap'}
				>
					{icons}
				</Container>
			</Container>
		</ThemeProvider>
	);
};
