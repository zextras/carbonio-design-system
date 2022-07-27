/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useMemo } from 'react';
import styled from 'styled-components';
import { Icon } from './Icon';
import type { ThemeObj } from '../../theme/theme';
import { getColor } from '../../theme/theme-utils';

type ShapeType = 'round' | 'square';

type AvatarContainerProps = {
	size: keyof ThemeObj['sizes']['avatar'];
	background?: string;
	color: keyof ThemeObj['avatarColors'];
	picture?: string;
	selecting?: boolean;
	selected?: boolean;
	disabled?: boolean;
	shape: ShapeType;
};

const AvatarContainer = styled.div<AvatarContainerProps>`
	box-sizing: border-box;
	display: flex;
	justify-content: center;
	align-items: center;
	min-width: ${({ theme, size }): string => theme.sizes.avatar[size].diameter};
	height: ${({ theme, size }): string => theme.sizes.avatar[size].diameter};
	min-height: ${({ theme, size }): string => theme.sizes.avatar[size].diameter};
	background: ${({ theme, background, color, picture, selecting, selected, disabled }): string =>
		`${
			// eslint-disable-next-line no-nested-ternary
			selecting
				? selected
					? getColor('primary', theme)
					: getColor('gray6', theme)
				: background
				? getColor(`${background}.${disabled ? 'disabled' : 'regular'}`, theme)
				: theme.avatarColors[color]
		} ${picture && !selecting ? `url(${picture}) no-repeat center center/cover` : ''}`};
	border-radius: ${({ shape }): string => (shape === 'round' ? '50%' : '15%')};
	border: ${({ theme, selecting }): string =>
		selecting ? `2px solid ${getColor('primary', theme)}` : 'none'};
`;

type CapitalsPropsType = {
	$size: keyof ThemeObj['sizes']['avatar'];
	color?: string;
};

const Capitals = styled.p<CapitalsPropsType>`
	font-size: ${({ theme, $size }): string => theme.sizes.avatar[$size].font};
	color: ${({ theme, color }): string => getColor(color || 'gray6', theme)};
	font-family: ${({ theme }): string => theme.fonts.default};
	font-weight: ${({ theme }): number => theme.fonts.weight.regular};
	user-select: none;
`;

const AvatarIcon = styled(Icon)<CapitalsPropsType>`
	width: calc(${({ theme, $size }): string => theme.sizes.avatar[$size].diameter} - 25%);
	min-width: calc(${({ theme, $size }): string => theme.sizes.avatar[$size].diameter} - 25%);
	height: calc(${({ theme, $size }): string => theme.sizes.avatar[$size].diameter} - 25%);
	min-height: calc(${({ theme, $size }): string => theme.sizes.avatar[$size].diameter} - 25%);
`;

const _SPECIAL_CHARS_REGEX = /[&/\\#,+()$~%.'":*?!<>{}@^_`=]/g;
const _WHITESPACE_REGEX = /[ ]/g;
const _WHITESPACE_REGEX_2 = / /;

function calcCapitals(label: string): string | null {
	const noSpecString = label.replace(_SPECIAL_CHARS_REGEX, '');
	if (noSpecString.replace(_WHITESPACE_REGEX, '').length !== 0) {
		// eslint-disable-next-line no-param-reassign
		label = noSpecString;
	} else {
		return null;
	}

	if (label.length <= 2) {
		return label;
	}
	if (_WHITESPACE_REGEX_2.test(label)) {
		let words = label.split(' ');
		words = words.filter((word) => word !== '');

		if (words.length < 2) {
			return words[0][0] + words[0][words[0].length - 1];
		}

		return words[0][0] + words[words.length - 1][0];
	}
	return label[0] + label[label.length - 1];
}

function calcColor(label: string): keyof ThemeObj['avatarColors'] {
	let sum = 0;
	// eslint-disable-next-line no-plusplus
	for (let i = 0; i < label.length; i++) {
		sum += label.charCodeAt(i);
	}
	return `avatar_${(sum % 50) + 1}`;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarPropTypes>(function AvatarFn(
	{
		size = 'medium',
		label,
		color,
		colorLabel,
		picture,
		icon,
		fallbackIcon = 'QuestionMark',
		background,
		selecting,
		selected,
		shape = 'round',
		disabled,
		...rest
	},
	ref
) {
	const calculatedColor = useMemo(() => calcColor(colorLabel || label), [colorLabel, label]);

	const capitals = useMemo(() => calcCapitals(label.toUpperCase()), [label]);

	const symbol = useMemo(() => {
		if (selecting) {
			if (selected) {
				return (
					<Icon
						size={size === 'extralarge' ? 'large' : size}
						icon="Checkmark"
						color="gray6"
						disabled={disabled}
					/>
				);
			}
			return null;
		}
		if (typeof icon !== 'undefined') {
			return <AvatarIcon $size={size} icon={icon} color={color || 'gray6'} disabled={disabled} />;
		}
		if (capitals !== null) {
			return (
				<Capitals $size={size} color={color}>
					{capitals}
				</Capitals>
			);
		}
		return <AvatarIcon $size={size} icon={fallbackIcon} color="gray6" disabled={disabled} />;
	}, [selecting, icon, capitals, size, fallbackIcon, selected, color, disabled]);
	return (
		<AvatarContainer
			ref={ref}
			size={size}
			picture={picture}
			selecting={selecting}
			selected={selected}
			background={background}
			color={calculatedColor}
			shape={shape}
			disabled={disabled}
			{...rest}
		>
			{(!picture || selecting) && symbol}
		</AvatarContainer>
	);
});

interface AvatarPropTypes extends HTMLAttributes<HTMLDivElement> {
	/** size of the Avatar circle */
	size?: keyof ThemeObj['sizes']['avatar'];

	/** url to the profile picture */
	picture?: string;

	/** string to be used as capitals, or for its calculation */
	label: string;

	/** string to be used for the background color calculation */
	colorLabel?: string;

	/** icon to display instead of the capitals */
	icon?: string;

	/** icon to display as capitals fallback */
	fallbackIcon?: string;

	/** used to force a background color */
	background?: string;

	/** used to force a color for the avatar text/icon color */
	color?: string;

	/** avatar selection mode */
	selecting?: boolean;

	/** avatar selected */
	selected?: boolean;

	/** Shape of the avatar */
	shape?: ShapeType;

	/** disabled status */
	disabled?: boolean;
}

export { AvatarPropTypes, Avatar };
