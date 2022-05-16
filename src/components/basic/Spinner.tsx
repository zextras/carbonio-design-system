/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { HTMLAttributes } from 'react';
import styled, { keyframes } from 'styled-components';
import type { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
	color: string | keyof ThemeObj['palette'];
}

const rotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
	}
`;

const StyledSpinner = styled.div<SpinnerProps>`
	width: 0.75rem;
	height: 0.75rem;
	color: ${({ theme, color }): string => getColor(color, theme)};
	border: 0.125rem solid currentColor;
	border-right-color: transparent;
	border-radius: 50%;
	animation: ${rotateKeyframes} 0.75s linear infinite;
`;

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(function SpinnerFn(
	{ color, ...rest },
	ref
) {
	return <StyledSpinner data-testid="spinner" color={color} ref={ref} {...rest} />;
});

export { Spinner, SpinnerProps };
