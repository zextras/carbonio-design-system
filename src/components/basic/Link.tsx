/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useCallback } from 'react';

import styled from 'styled-components';

import { Text, TextProps } from './text/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { getColor } from '../../theme/theme-utils';

const StyledLink = styled(Text).attrs(() => ({
	forwardedAs: 'a'
}))<{
	$underlined: boolean;
}>`
	cursor: pointer;
	text-decoration: ${({ $underlined }): string => (!$underlined ? 'none' : 'underline')};

	&:hover,
	&:focus {
		color: ${({ color, theme }): string => getColor(`${color}.hover`, theme)};
		outline: none;
		text-decoration: underline;
	}
`;

type LinkProps = {
	/** Whether the link should be underlined */
	underlined?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> &
	TextProps;

const Link = React.forwardRef<HTMLDivElement, LinkProps>(function LinkFn(
	{ children, underlined = false, color = 'primary', ...rest },
	ref
) {
	const linkRef = useCombinedRefs<HTMLDivElement>(ref);

	const keyPress = useCallback(() => linkRef.current && linkRef.current.click(), [linkRef]);
	const keyEvents = useMemo(() => getKeyboardPreset('button', keyPress), [keyPress]);
	useKeyboard(linkRef, keyEvents);

	return (
		<StyledLink ref={linkRef} $underlined={underlined} color={color} tabIndex={0} {...rest}>
			{children}
		</StyledLink>
	);
});

export { Link, LinkProps };
