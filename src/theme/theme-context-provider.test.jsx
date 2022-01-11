/* eslint-disable import/no-extraneous-dependencies */

/*
 * Copyright (C) 2011-2021 Zextras
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { screen } from '@testing-library/dom';
import { render as rtlRender } from '@testing-library/react';
import { ThemeProvider } from './theme-context-provider';
import { useTheme, generateColorSet } from './theme-utils';
import { Theme } from './theme';

const CUSTOM_THEME_COLOR = '#FF7514';

function ThemeTester({ color }) {
	const theme = useTheme();
	return <div data-testid={`regular-${color}-color`}>{theme.palette[color].regular}</div>;
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
		const recipe = jest.fn((draft) => {
			// eslint-disable-next-line no-param-reassign
			draft.palette.extra = generateColorSet({ regular: CUSTOM_THEME_COLOR });
			return draft;
		});
		rtlRender(
			<ThemeProvider extension={recipe}>
				<ThemeTester color="extra" />
			</ThemeProvider>
		);
		expect(recipe).toBeCalledTimes(1);
		expect(screen.getByTestId('regular-extra-color').textContent).toBe(CUSTOM_THEME_COLOR);
	});
});
