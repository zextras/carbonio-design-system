/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import styled from 'styled-components';

import { getColor } from '../../../theme/theme-utils';

type InputLabelProps = {
	$hasError?: boolean;
	$hasFocus?: boolean;
	$disabled?: boolean;
	$textColor?: string;
};

export const InputLabel = styled.label.attrs<InputLabelProps>(({ $hasError, $hasFocus }) => ({
	$textColor: ($hasError && 'error') || ($hasFocus && 'primary') || 'secondary'
}))<InputLabelProps>`
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	left: 0;
	font-size: ${({ theme }): string => theme.sizes.font.medium};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	font-family: ${({ theme }): string => theme.fonts.default};
	line-height: 1.5;
	color: ${({ theme, $textColor, $disabled }): string =>
		getColor(`${$textColor}.${$disabled ? 'disabled' : 'regular'}`, theme)};
	transition:
		transform 150ms ease-out,
		font-size 150ms ease-out,
		top 150ms ease-out,
		left 150ms ease-out;
	cursor: inherit;
	user-select: none;
	max-width: 100%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`;
