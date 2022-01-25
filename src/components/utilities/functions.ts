/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ThemeObj } from '../../theme/theme';

export function pseudoClasses(
	theme: ThemeObj,
	color: keyof ThemeObj['palette']
): FlattenSimpleInterpolation {
	return css`
		transition: background 0.2s ease-out;
		&:focus {
			outline: none;
			background: ${theme.palette[color].focus};
		}
		&:hover {
			outline: none;
			background: ${theme.palette[color].hover};
		}
		&:active {
			outline: none;
			background: ${theme.palette[color].active};
		}
	`;
}

export function parsePadding(padding: string, theme: ThemeObj): string {
	let paddingValue = padding;
	const paddingSizes = Object.keys(theme.sizes.padding) as Array<
		keyof ThemeObj['sizes']['padding']
	>;
	paddingSizes.forEach((size) => {
		const regex = new RegExp(`(^|\\s)(${size})`, 'g');
		paddingValue = paddingValue.replace(regex, `$1${theme.sizes.padding[size]}`);
	});
	return paddingValue;
}
