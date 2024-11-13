/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { AnyColor } from '../../../types/utils';
import { Button, ButtonProps } from '../../basic/button/Button';
import { Dropdown, DropdownProps } from '../../display/Dropdown';

const StyledDropdown = styled(Dropdown)<{ $containerWidth: string }>`
	width: ${({ $containerWidth }): string => $containerWidth};
`;

type MultiButtonProps = {
	/** MultiButton text */
	label?: string;
	/** whether to disable the Primary Button or not */
	disabledPrimary?: boolean;
	/** whether to disable the Secondary Dropdown or not */
	disabledSecondary?: boolean;
	/** MultiButton icon */
	icon?: keyof DefaultTheme['icons'];
	/** Main icon */
	primaryIcon?: keyof DefaultTheme['icons'];
	/** Color of the Button label */
	color?: AnyColor;
	/** Color of the Button background */
	background?: AnyColor;
	/** Dropdown items */
	items: DropdownProps['items'];
	/** Button size */
	size?: Extract<ButtonProps['size'], 'medium' | 'large' | 'extralarge'>;
	/** Dropdown properties */
	dropdownProps?: Omit<
		DropdownProps,
		'children' | 'items' | 'forceOpen' | 'disabled' | 'disableRestoreFocus' | 'triggerRef'
	>;
} & Omit<ButtonProps, 'secondaryAction' | 'icon' | 'disabled'>;

const MultiButton = React.forwardRef<HTMLDivElement, MultiButtonProps>(function MultiButtonFn(
	{
		background,
		color,
		label,
		disabledPrimary,
		disabledSecondary,
		icon,
		items,
		onClick,
		primaryIcon,
		width,
		dropdownProps = {},
		type,
		labelColor,
		backgroundColor,
		...rest
	},
	ref
) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const secondaryButtonRef = useRef<HTMLButtonElement>(null);
	const { onOpen, onClose, ...dropdownPropsRest } = dropdownProps;

	const toggleDropdown = useCallback(() => {
		setDropdownOpen((prevState) => !prevState);
	}, []);

	useEffect(() => {
		if (dropdownOpen) {
			onOpen?.();
		} else {
			onClose?.();
		}
	}, [dropdownOpen, onClose, onOpen]);

	const closeDropdown = useCallback(() => {
		setDropdownOpen(false);
		if (secondaryButtonRef.current) {
			secondaryButtonRef.current.focus();
		}
	}, []);

	const secondaryActionIcon = useMemo(() => {
		if (icon) {
			return icon;
		}
		if (dropdownOpen) {
			return 'ChevronUpOutline';
		}
		return 'ChevronDownOutline';
	}, [dropdownOpen, icon]);

	const secondaryAction = useMemo<NonNullable<ButtonProps['secondaryAction']>>(
		() => ({
			icon: secondaryActionIcon,
			onClick: toggleDropdown,
			disabled: disabledSecondary,
			forceActive: dropdownOpen,
			ref: secondaryButtonRef
		}),
		[disabledSecondary, dropdownOpen, toggleDropdown, secondaryActionIcon]
	);

	const colorsAndType = useMemo<
		| { type: 'ghost'; color?: AnyColor }
		| { type?: 'default' | 'outlined'; labelColor?: AnyColor; backgroundColor?: AnyColor }
	>(() => {
		if (type === 'ghost') {
			return { type, color };
		}
		if (type === 'outlined') {
			return {
				type,
				labelColor: color ?? labelColor,
				backgroundColor: background ?? backgroundColor
			};
		}

		return { type, labelColor, backgroundColor: background ?? color ?? backgroundColor };
	}, [background, backgroundColor, color, labelColor, type]);

	return (
		<StyledDropdown
			placement="bottom-end"
			{...dropdownPropsRest}
			items={items}
			forceOpen={dropdownOpen}
			onClose={closeDropdown}
			disabled
			disableRestoreFocus
			$containerWidth={(width === 'fill' && '100%') || 'auto'}
			triggerRef={ref}
		>
			<Button
				label={label}
				onClick={onClick}
				disabled={disabledPrimary}
				icon={primaryIcon}
				secondaryAction={secondaryAction}
				width={width}
				{...colorsAndType}
				{...rest}
			/>
		</StyledDropdown>
	);
});

export { MultiButton, MultiButtonProps };
