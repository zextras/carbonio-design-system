/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ArgTypes } from '@storybook/react';
import type { DefaultTheme } from 'styled-components';

import { Theme } from '../theme/theme';

export const themeColors = Object.keys(Theme.palette).map(
	(key) => Theme.palette[key as keyof DefaultTheme['palette']].regular
);

export const colorArgType: Partial<ArgTypes>[string] = {
	control: {
		type: 'color',
		presetColors: themeColors
	}
};
