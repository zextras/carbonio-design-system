/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { getColor, isThemeSize, useTheme } from '../../theme/theme-utils';
import { Container } from '../layout/Container';
import { Icon, IconProps } from '../basic/Icon';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeObj } from '../../theme/theme';
import { parsePadding, pseudoClasses } from '../utilities/functions';

const SIZES = {
	extrasmall: {
		iconSize: '20px',
		paddingSize: '2px'
	},
	small: {
		iconSize: '22px',
		paddingSize: '8px'
	},
	medium: {
		iconSize: '24px',
		paddingSize: '10px'
	},
	large: {
		iconSize: '24px',
		paddingSize: '12px'
	}
} as const;

const ContainerEl = styled(Container)<{ background: string; $padding: string }>`
	user-select: none;
	padding: ${({ $padding }): string => $padding};
	${({ disabled, background, theme }): SimpleInterpolation =>
		disabled
			? css`
					background: ${getColor(`${background}.disabled`, theme)};
			  `
			: css`
					cursor: pointer;
					${pseudoClasses(theme, background)}
			  `};
`;

const StyledIcon = styled(Icon)<{ $size: string }>`
	${({ $size }): SimpleInterpolation => css`
		width: ${$size};
		height: ${$size};
	`}
`;

interface IconButtonInternalSizes {
	iconSize: string;
	paddingSize: string;
}

interface IconButtonProps {
	/** Color of the icon */
	iconColor?: IconProps['color'];
	/** Color of the button */
	backgroundColor?: string | keyof ThemeObj['palette'];
	/** whether to disable the IconButton or not */
	disabled?: boolean;
	/** button size */
	size?: keyof typeof SIZES;
	/** Custom button size */
	customSize?: {
		iconSize: string | keyof ThemeObj['sizes']['icon'];
		paddingSize: 0 | string | keyof ThemeObj['sizes']['padding'];
	};
	/** icon name */
	icon: keyof ThemeObj['icons'];
	/** IconButton border radius */
	borderRadius?: 'regular' | 'round';
	/** Click callback */
	onClick: React.ReactEventHandler;
	/**
	 * Custom icon color
	 * @deprecated use iconColor instead
	 */
	customIconColor?: string;
}

const IconButton = React.forwardRef<HTMLDivElement, IconButtonProps>(function IconButtonFn(
	{
		iconColor = 'text',
		backgroundColor = 'transparent',
		disabled = false,
		customSize,
		size = 'medium',
		icon,
		borderRadius = 'regular',
		onClick,
		customIconColor,
		...rest
	},
	ref
) {
	const innerRef = useRef<HTMLDivElement | null>(null);
	const iconButtonRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
	const theme = useTheme();

	const { iconSize, paddingSize } = useMemo<IconButtonInternalSizes>(
		() =>
			customSize
				? {
						iconSize: isThemeSize(customSize.iconSize, theme.sizes.icon)
							? theme.sizes.icon[customSize.iconSize]
							: customSize.iconSize,
						paddingSize: parsePadding(customSize.paddingSize.toString(), theme)
				  }
				: SIZES[size],
		[customSize, size, theme]
	);

	const handleClick = useCallback((e) => !disabled && onClick(e), [disabled, onClick]);
	const keyEvents = useMemo(() => getKeyboardPreset('button', handleClick), [handleClick]);
	useKeyboard(iconButtonRef, keyEvents);

	return (
		<ContainerEl
			ref={iconButtonRef}
			width="fit"
			height="fit"
			borderRadius={borderRadius}
			background={backgroundColor}
			disabled={disabled}
			$padding={paddingSize}
			crossAlignment="center"
			onClick={handleClick}
			{...rest}
			tabIndex={disabled ? -1 : 0}
		>
			<StyledIcon
				icon={icon}
				$size={iconSize}
				// TODO: remove usage of customIconColor
				color={customIconColor || iconColor}
				disabled={disabled}
				{...rest}
			/>
		</ContainerEl>
	);
});

export { IconButton, IconButtonProps };
