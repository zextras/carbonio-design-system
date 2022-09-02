/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, forwardRef, HTMLAttributes } from 'react';

import styled from 'styled-components';
import { Tooltip } from '../display/Tooltip';

const Comp = styled.span<{ isRead: boolean; isNumber: boolean }>`
	display: inline-block;
	min-width: 2em;
	padding: ${({ isNumber, theme }): string =>
		isNumber
			? theme.sizes.padding.extrasmall
			: `${theme.sizes.padding.extrasmall} ${theme.sizes.padding.small}`};
	font-family: ${(props): string => props.theme.fonts.default};
	font-size: ${(props): string => props.theme.sizes.font.small};
	font-weight: ${(props): number => props.theme.fonts.weight.regular};
	background-color: ${({ theme, isRead }): string =>
		theme.palette[isRead ? 'gray2' : 'primary'].regular};
	color: ${({ theme, isRead }): string => theme.palette[isRead ? 'gray0' : 'gray6'].regular};
	border-radius: 1.2em;
	text-align: center;
`;

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function BadgeFn(
	{ type = 'read', value, ...rest },
	ref
) {
	const MAX_VALUE = 999;
	const isNumber = useMemo(() => typeof value === 'number', [value]);
	const badgeText = useMemo(
		() => (isNumber && value > MAX_VALUE ? `${MAX_VALUE}+` : value),
		[value, isNumber]
	);
	const isRead = useMemo(() => type === 'read', [type]);
	const showTooltip = useMemo(() => isNumber && value > MAX_VALUE, [value, isNumber]);

	return (
		<Tooltip label={String(value)} disabled={!showTooltip}>
			<Comp ref={ref} isRead={isRead} isNumber={isNumber} {...rest}>
				{badgeText}
			</Comp>
		</Tooltip>
	);
});

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	/** Badge type */
	type?: 'read' | 'unread';
	/** Badge text */
	value: string | number;
}

export { Badge, BadgeProps };
