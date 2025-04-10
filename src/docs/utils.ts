/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type React from 'react';

import type { Placement } from '@floating-ui/dom';
import type { ArgTypes } from '@storybook/react';

import { Theme } from '../theme/theme';

export const themeColors = Object.keys(Theme.palette).map(
	(key) => Theme.palette[key as keyof Theme['palette']].regular
);

export const colorArgType: Partial<ArgTypes>[string] = {
	control: {
		type: 'color',
		presetColors: themeColors
	}
};

export const weightArgType: ArgTypes[string] = {
	control: {
		type: 'radio'
	},
	options: Object.keys(Theme.fonts.weight)
};

export const sizeArgType: ArgTypes[string] = {
	control: {
		type: 'radio'
	},
	options: Object.keys(Theme.sizes.font)
};

const textAlignValues: React.CSSProperties['textAlign'][] = [
	'-webkit-match-parent',
	'center',
	'end',
	'justify',
	'left',
	'match-parent',
	'right',
	'start',
	'inherit',
	'initial',
	'revert',
	'revert-layer',
	'unset'
];

export const textAlignArgType: ArgTypes[string] = {
	control: {
		type: 'select'
	},
	options: textAlignValues
};

const placementValues: Placement[] = [
	'top',
	'right',
	'bottom',
	'left',
	'bottom-end',
	'bottom-start',
	'left-end',
	'left-start',
	'right-end',
	'right-start',
	'top-end',
	'top-start'
];

export const placementArgType: ArgTypes[string] = {
	control: {
		type: 'select'
	},
	options: placementValues
};
