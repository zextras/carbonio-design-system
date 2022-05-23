/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, ButtonProps } from '../basic/Button';
import { Dropdown, DropdownProps } from '../display/Dropdown';
import type { ThemeObj } from '../../theme/theme';

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
	/** Dropdown properties */
	dropdownProps?: DropdownProps;
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
		width,
		dropdownProps,
		...rest
	},
	ref
) {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const secondaryButtonRef = useRef<HTMLButtonElement>(null);

	const openDropdown = useCallback(() => {
		setDropdownOpen(true);
	}, []);

	const closeDropdown = useCallback(() => {
		setDropdownOpen(false);
		if (secondaryButtonRef.current) {
			secondaryButtonRef.current.focus();
		}
	}, []);

	const secondaryAction = useMemo<NonNullable<ButtonProps['secondaryAction']>>(
		() => ({
			icon,
			onClick: openDropdown,
			disabled: disabledSecondary,
			forceActive: dropdownOpen,
			ref: secondaryButtonRef
		}),
		[disabledSecondary, dropdownOpen, icon, openDropdown]
	);

	return (
		<StyledDropdown
			items={items}
			placement="bottom-end"
			forceOpen={dropdownOpen}
			onClose={closeDropdown}
			disabled
			disableRestoreFocus
			{...dropdownProps}
			$containerWidth={(width === 'fill' && '100%') || 'auto'}
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
				width={width}
				{...rest}
			/>
		</StyledDropdown>
	);
});

export { MultiButton, MultiButtonProps };
