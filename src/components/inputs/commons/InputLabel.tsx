/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import styled, { SimpleInterpolation } from 'styled-components';

import { getColor } from '../../../theme/theme-utils';

export const InputLabel = styled.label.attrs<
	{
		$hasError?: boolean;
		$hasFocus?: boolean;
		$disabled?: boolean;
	},
	{ $textColor: string }
>(({ $hasError, $hasFocus }) => ({
	$textColor: ($hasError && 'error') || ($hasFocus && 'primary') || 'secondary'
}))<{
	$hasError?: boolean;
	$hasFocus?: boolean;
	$disabled?: boolean;
}>`
	position: absolute;
	inset-block-start: 50%;
	inset-inline-start: 0.75rem;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	line-height: 1.5;
	color: ${({ theme, $textColor, $disabled }): SimpleInterpolation =>
		getColor(`${$textColor}.${$disabled ? 'disabled' : 'regular'}`, theme)};
	transform: translateY(-50%);
	transition: transform 150ms ease-out, font-size 150ms ease-out, top 150ms ease-out,
		left 150ms ease-out;
	cursor: inherit;
	user-select: none;
	max-width: calc(100% - ${({ theme }): string => `${theme.sizes.padding.large} * 2`});
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
