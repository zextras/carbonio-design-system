/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Control } from '@storybook/blocks';
import { DefaultTheme } from 'styled-components';

import { Theme } from '../theme/theme';

export const themeColors = Object.keys(Theme.palette).map(
	(key) => Theme.palette[key as keyof DefaultTheme['palette']].regular
);

export const colorArgTypeControl: { control: Control } = {
	control: {
		type: 'color',
		presetColors: themeColors
	}
};
