/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useCallback, AnchorHTMLAttributes } from 'react';
import styled from 'styled-components';
import type { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

import { Text, TextProps } from './Text';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';

const StyledLink = styled(Text).attrs({
	forwardedAs: 'a'
})<{
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

interface LinkProps extends TextProps {
	/** Whether the link should be underlined */
	underlined?: boolean;
	color?: string | keyof ThemeObj['palette'];
}

const Link = React.forwardRef<HTMLDivElement, LinkProps>(function LinkFn(
	{ children, size, underlined = false, color = 'primary', ...rest },
	ref
) {
	const linkRef = useCombinedRefs<HTMLDivElement>(ref);

	const keyPress = useCallback(() => linkRef.current && linkRef.current.click(), [linkRef]);
	const keyEvents = useMemo(() => getKeyboardPreset('button', keyPress), [keyPress]);
	useKeyboard(linkRef, keyEvents);

	return (
		<StyledLink
			ref={linkRef}
			size={size}
			$underlined={underlined}
			color={color}
			tabIndex={0}
			{...rest}
		>
			{children}
		</StyledLink>
	);
});

export { Link, LinkProps };
