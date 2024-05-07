/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, HTMLAttributes, useMemo } from 'react';

import { map } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { getKeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { getColor } from '../../theme/theme-utils';
import { AnyColor } from '../../types/utils';
import { Text } from '../basic/Text';
import { Container, ContainerProps } from '../layout/Container';

const CustomText = styled(Text)`
	line-height: 1.5;
`;

const DefaultTabBarItemContainer = styled(Container)<{
	$forceWidthEquallyDistributed: boolean;
	$selected: boolean;
	$underlineColor: AnyColor;
	$disabled?: boolean;
}>`
	outline: none;
	min-width: 0;
	flex-basis: fit-content;
	${({ $forceWidthEquallyDistributed }): SimpleInterpolation =>
		$forceWidthEquallyDistributed &&
		css`
			flex-basis: unset;
		`};
	flex-grow: 1;
	height: 100%;
	transition: 0.2s ease-out;
	border-bottom: ${({ theme, $selected, $underlineColor }): string =>
		$selected
			? `0.0625rem solid ${getColor($underlineColor, theme)}`
			: '0.0625rem solid transparent'};
	cursor: pointer;
	user-select: none;

	&:hover {
		background: ${({ theme, background = 'transparent', $disabled }): string =>
			getColor(`${background}.${$disabled ? 'disabled' : 'hover'}`, theme)};
	}
	&:focus {
		background: ${({ theme, background = 'transparent', $disabled }): string =>
			getColor(`${background}.${$disabled ? 'disabled' : 'focus'}`, theme)};
	}
`;

interface Item {
	id: string;
	label: string | React.ReactElement;
	CustomComponent?: React.ComponentType<DefaultTabBarItemProps & HTMLAttributes<HTMLDivElement>>;
	disabled?: boolean;
}

interface TabBarProps extends Omit<ContainerProps, 'onChange'> {
	/** List of elements, can have extra attributes to pass down to the CustomComponent */
	items: Array<Item>;
	/** id of the selected item */
	selected: string;
	/** change callback, is called with the new selected id */
	onChange: (ev: React.MouseEvent<HTMLDivElement> | KeyboardEvent, selectedId: string) => void;
	/** background color of the tabBar */
	background: AnyColor;
	/** underline color of the selected tab */
	underlineColor?: AnyColor;
	/** Force tabs to have all the same width */
	forceWidthEquallyDistributed?: boolean;
}

interface DefaultTabBarItemProps extends ContainerProps {
	item: Item;
	selected: boolean;
	background: AnyColor;
	onClick: (ev: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => void;
	underlineColor: AnyColor;
	forceWidthEquallyDistributed: boolean;
}

const DefaultTabBarItem = React.forwardRef<HTMLDivElement, DefaultTabBarItemProps>(
	function DefaultTabBarItemFn(
		{
			item,
			selected,
			background,
			onClick,
			underlineColor = 'primary',
			forceWidthEquallyDistributed = false,
			children,
			...rest
		},
		ref
	) {
		const activationCb = useCallback(
			(ev: React.MouseEvent<HTMLDivElement> | KeyboardEvent) => {
				if (!item.disabled) {
					onClick(ev);
				}
			},
			[item.disabled, onClick]
		);

		const combinedRef = useCombinedRefs<HTMLDivElement>(ref);

		const keyEvents = useMemo(() => getKeyboardPreset('button', activationCb), [activationCb]);
		useKeyboard(combinedRef, keyEvents);

		return (
			<DefaultTabBarItemContainer
				padding={{ horizontal: 'small' }}
				onClick={activationCb}
				$selected={selected}
				background={background}
				borderRadius="none"
				$disabled={item.disabled}
				$underlineColor={underlineColor}
				ref={combinedRef}
				$forceWidthEquallyDistributed={forceWidthEquallyDistributed}
				{...rest}
			>
				{children || (
					<CustomText
						overflow="ellipsis"
						size="small"
						color={selected ? 'text' : 'secondary'}
						disabled={item.disabled}
					>
						{item.label}
					</CustomText>
				)}
			</DefaultTabBarItemContainer>
		);
	}
);

const TabBar = React.forwardRef<HTMLDivElement, TabBarProps>(function TabBarFn(
	{
		items,
		selected,
		onChange,
		background,
		underlineColor = 'primary',
		forceWidthEquallyDistributed = false,
		...rest
	},
	ref
) {
	const onItemClickCb = useCallback(
		(id: string) =>
			(ev: React.MouseEvent<HTMLDivElement> | KeyboardEvent): void => {
				onChange(ev, id);
			},
		[onChange]
	);
	return (
		<Container
			ref={ref}
			orientation="horizontal"
			background={background}
			mainAlignment="flex-start"
			{...rest}
		>
			{map(items, (item, index) =>
				item.CustomComponent ? (
					<item.CustomComponent
						data-testid={`tab${index}`}
						key={item.id}
						item={item}
						selected={item.id === selected}
						onClick={onItemClickCb(item.id)}
						tabIndex={item.disabled ? undefined : 0}
						background={background}
						underlineColor={underlineColor}
						forceWidthEquallyDistributed={forceWidthEquallyDistributed}
					/>
				) : (
					<DefaultTabBarItem
						data-testid={`tab${index}`}
						key={item.id}
						item={item}
						selected={item.id === selected}
						background={background}
						onClick={onItemClickCb(item.id)}
						tabIndex={item.disabled ? undefined : 0}
						underlineColor={underlineColor}
						forceWidthEquallyDistributed={forceWidthEquallyDistributed}
					/>
				)
			)}
		</Container>
	);
});

export { TabBar, DefaultTabBarItem, TabBarProps, DefaultTabBarItemProps };
