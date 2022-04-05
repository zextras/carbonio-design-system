/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { screen } from '@testing-library/dom';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from './theme-context-provider';
import { useTheme, generateColorSet, getColor } from './theme-utils';
import { Theme, ThemeColorObj, ThemeObj } from './theme';

const CUSTOM_THEME_COLOR = '#FF7514';

function ThemeTester<T extends ThemeObj = ThemeObj>({
	color
}: {
	color: keyof T['palette'] & string;
}): JSX.Element {
	const theme = useTheme() as T;
	return <div data-testid={`regular-${color}-color`}>{getColor(color, theme)}</div>;
}

describe('ThemeProvider', () => {
	test('Light theme as default', () => {
		rtlRender(
			<ThemeProvider>
				<ThemeTester color="primary" />
			</ThemeProvider>
		);

		expect(screen.getByTestId('regular-primary-color').textContent).toBe(
			Theme.palette.primary.regular
		);
	});

	test('Set a custom theme value', () => {
		const recipe = jest.fn((draft) => {
			// eslint-disable-next-line no-param-reassign
			draft.palette.primary = generateColorSet({ regular: CUSTOM_THEME_COLOR });
			return draft;
		});
		rtlRender(
			<ThemeProvider extension={recipe}>
				<ThemeTester color="primary" />
			</ThemeProvider>
		);
		expect(recipe).toBeCalledTimes(1);
		expect(screen.getByTestId('regular-primary-color').textContent).toBe(CUSTOM_THEME_COLOR);
	});

	test('Add a custom theme color', () => {
		type ThemeExtended = ThemeObj & { palette: ThemeObj['palette'] & { extra: ThemeColorObj } };
		const recipe: (theme: ThemeObj) => ThemeExtended = jest.fn((draft) => {
			const themeExtended: ThemeExtended = {
				...draft,
				palette: { ...draft.palette, extra: generateColorSet({ regular: CUSTOM_THEME_COLOR }) }
			};
			return themeExtended;
		});
		rtlRender(
			<ThemeProvider extension={recipe}>
				<ThemeTester<ThemeExtended> color="extra" />
			</ThemeProvider>
		);
		expect(recipe).toBeCalledTimes(1);
		expect(screen.getByTestId('regular-extra-color').textContent).toBe(CUSTOM_THEME_COLOR);
	});
});
