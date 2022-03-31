/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useState } from 'react';
import { Button, ButtonProps } from '../basic/Button';
import { Dropdown, DropdownProps } from '../display/Dropdown';
import type { ThemeObj } from '../../theme/theme';

type MultiButtonProps = {
	/** MultiButton text */
	label?: string;
	/** whether to disable the Primary Button or not */
	disabledPrimary?: boolean;
	/** whether to disable the Secondary Dropdown or not */
	disabledSecondary?: boolean;
	/** MultiButton icon */
	icon?: keyof ThemeObj['icons'];
	/** Main icon */
	primaryIcon?: keyof ThemeObj['icons'];
	/** Color of the Button label */
	color?: string;
	/** Color of the Button background */
	background?: string;
	/** Dropdown items */
	items: DropdownProps['items'];
	/** Button size */
	size?: Extract<ButtonProps['size'], 'medium' | 'large' | 'extralarge'>;
} & Omit<ButtonProps, 'secondaryAction' | 'icon' | 'disabled'>;

const MultiButton = React.forwardRef<HTMLButtonElement, MultiButtonProps>(function MultiButtonFn(
	{
		background,
		color,
		label,
		disabledPrimary,
		disabledSecondary,
		icon = 'ChevronDownOutline',
		items,
		onClick,
		primaryIcon,
		...rest
	},
	ref
) {
	const [dropdownOpen, setDropdownOpen] = useState(false);

	const openDropdown = useCallback(() => {
		setDropdownOpen(true);
	}, []);

	const closeDropdown = useCallback(() => {
		setDropdownOpen(true);
	}, []);

	const secondaryAction = useMemo<NonNullable<ButtonProps['secondaryAction']>>(
		() => ({
			icon,
			onClick: openDropdown,
			disabled: disabledSecondary,
			forceActive: dropdownOpen
		}),
		[disabledSecondary, dropdownOpen, icon, openDropdown]
	);

	return (
		<Dropdown
			items={items}
			placement="bottom-end"
			forceOpen={dropdownOpen}
			onOpen={openDropdown}
			onClose={closeDropdown}
		>
			<Button
				backgroundColor={background}
				label={label}
				labelColor={color}
				onClick={onClick}
				disabled={disabledPrimary}
				icon={primaryIcon}
				secondaryAction={secondaryAction}
				ref={ref}
				{...rest}
			/>
		</Dropdown>
	);
});

export { MultiButton, MultiButtonProps };
