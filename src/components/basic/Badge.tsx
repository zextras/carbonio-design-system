/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, forwardRef } from 'react';

import styled from 'styled-components';

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

const Badge = forwardRef<HTMLElement, BadgeProps>(function BadgeFn({ type, value, ...rest }, ref) {
	const isNumber = useMemo(() => typeof value === 'number', [value]);
	const badgeText = useMemo(() => (isNumber && value > 99 ? '99+' : value), [value, isNumber]);
	const isRead = useMemo(() => type === 'read', [type]);

	return (
		<Comp ref={ref} isRead={isRead} isNumber={isNumber} {...rest}>
			{badgeText}
		</Comp>
	);
});

interface BadgeProps {
	/** Badge type */
	type?: 'read' | 'unread';
	/** Badge text */
	value: string | number;
}

Badge.defaultProps = {
	type: 'read'
};

export default Badge;
