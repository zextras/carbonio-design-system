/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

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
	dropdownProps?: Omit<DropdownProps, 'children' | 'items' | 'onClose'>;
} & Omit<ButtonProps, 'secondaryAction' | 'icon' | 'disabled'>;

const MultiButton = React.forwardRef<HTMLButtonElement, MultiButtonProps>(function MultiButtonFn(
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
		dropdownProps,
		...rest
	},
	ref
) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const secondaryButtonRef = useRef<HTMLButtonElement>(null);

	const toggleDropdown = useCallback(() => {
		setDropdownOpen((prevState) => !prevState);
	}, []);

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

	return (
		<StyledDropdown
			{...dropdownProps}
			items={items}
			placement="bottom-end"
			forceOpen={dropdownOpen}
			onClose={closeDropdown}
			disabled
			disableRestoreFocus
			$containerWidth={(width === 'fill' && '100%') || 'auto'}
			triggerRef={ref}
		>
			<Button
				backgroundColor={background}
				label={label}
				labelColor={color}
				onClick={onClick}
				disabled={disabledPrimary}
				icon={primaryIcon}
				secondaryAction={secondaryAction}
				width={width}
				{...rest}
			/>
		</StyledDropdown>
	);
});

export { MultiButton, MultiButtonProps };
