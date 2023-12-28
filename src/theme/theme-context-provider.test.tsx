/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';
import { DefaultTheme } from 'styled-components';

import { Theme, ThemeColorObj } from './theme';
import { ThemeProvider } from './theme-context-provider';
import { useTheme, generateColorSet, getColor } from './theme-utils';
import { setup } from '../test-utils';

const CUSTOM_THEME_COLOR = '#FF7514';

function ThemeTester<T extends DefaultTheme = DefaultTheme>({
	color
}: {
	color: keyof T['palette'] & string;
}): React.JSX.Element {
	const theme = useTheme() as T;
	return <div data-testid={`regular-${color}-color`}>{getColor(color, theme)}</div>;
}

describe('ThemeProvider', () => {
	test('Light theme as default', () => {
		setup(
			<ThemeProvider>
				<ThemeTester color="primary" />
			</ThemeProvider>
		);

		expect(screen.getByTestId('regular-primary-color')).toHaveTextContent(
			Theme.palette.primary.regular
		);
	});

	test('Set a custom theme value', () => {
		const recipe = jest.fn((draft) => {
			// eslint-disable-next-line no-param-reassign
			draft.palette.primary = generateColorSet({ regular: CUSTOM_THEME_COLOR });
			return draft;
		});
		setup(
			<ThemeProvider extension={recipe}>
				<ThemeTester color="primary" />
			</ThemeProvider>
		);
		expect(recipe).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('regular-primary-color')).toHaveTextContent(CUSTOM_THEME_COLOR);
	});

	test('Add a custom theme color', () => {
		type ThemeExtended = DefaultTheme & {
			palette: DefaultTheme['palette'] & { extra: ThemeColorObj };
		};
		const recipe: (theme: DefaultTheme) => ThemeExtended = jest.fn((draft) => {
			const themeExtended: ThemeExtended = {
				...draft,
				palette: { ...draft.palette, extra: generateColorSet({ regular: CUSTOM_THEME_COLOR }) }
			};
			return themeExtended;
		});
		setup(
			<ThemeProvider extension={recipe}>
				<ThemeTester<ThemeExtended> color="extra" />
			</ThemeProvider>
		);
		expect(recipe).toHaveBeenCalledTimes(1);
		expect(screen.getByTestId('regular-extra-color')).toHaveTextContent(CUSTOM_THEME_COLOR);
	});
});
