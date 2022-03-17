/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useCallback, useMemo } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { getColor } from '../../theme/theme-utils';
import Container from '../layout/Container';
import Icon from '../basic/Icon';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeObj } from '../../theme/theme';
import { pseudoClasses } from '../utilities/functions';

function getSizing(size: IconButtonProps['size']): IconButtonInternalSizes {
	switch (size) {
		case 'small':
			return { iconSize: 'medium', paddingSize: 'extrasmall' };
		case 'medium':
			return { iconSize: 'large', paddingSize: 'small' };
		case 'large':
		default:
			return { iconSize: 'large', paddingSize: 'medium' };
	}
}

const ContainerEl = styled(Container)<{ background: string }>`
	user-select: none;
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

interface IconButtonInternalSizes {
	iconSize: React.ComponentPropsWithoutRef<typeof Icon>['size'];
	paddingSize: number | keyof ThemeObj['sizes']['padding'];
}

interface IconButtonProps {
	/** Color of the icon */
	iconColor?: React.ComponentPropsWithoutRef<typeof Icon>['color'];
	/** Color of the button */
	backgroundColor?: string | keyof ThemeObj['palette'];
	/** whether to disable the IconButton or not */
	disabled?: boolean;
	/** button size */
	size?: 'small' | 'medium' | 'large';
	/** Custom button size */
	customSize?: IconButtonInternalSizes;
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

	const { iconSize, paddingSize } = useMemo<IconButtonInternalSizes>(
		() =>
			customSize
				? {
						iconSize: customSize.iconSize,
						paddingSize: customSize.paddingSize
				  }
				: getSizing(size),
		[customSize, size]
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
			padding={
				paddingSize !== 0
					? {
							all: paddingSize
					  }
					: {}
			}
			crossAlignment="center"
			onClick={handleClick}
			{...rest}
			tabIndex={disabled ? -1 : 0}
		>
			<Icon
				icon={icon}
				size={iconSize}
				// TODO: remove usage of customIconColor
				color={customIconColor || iconColor}
				disabled={disabled}
				{...rest}
			/>
		</ContainerEl>
	);
});

export default IconButton;
