/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState, useEffect, useCallback, useMemo, useRef, HTMLAttributes } from 'react';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
import { map } from 'lodash';
import Container from '../layout/Container';
import Text from '../basic/Text';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ThemeObj } from '../../theme/theme';

const CustomText = styled(Text)`
	line-height: 1.5;
`;

const DefaultTabBarItemContainer = styled(Container)`
	outline: none;
	min-width: 0;
	flex-basis: fit-content;
	${({ forceWidthEquallyDistributed }): FlattenSimpleInterpolation =>
		forceWidthEquallyDistributed &&
		css`
			flex-basis: unset;
		`};
	flex-grow: 1;
	height: 100%;
	transition: 0.2s ease-out;
	border-bottom: ${({ theme, selected, underlineColor }): string =>
		selected
			? `1px solid ${theme.palette[underlineColor || 'primary'].regular}`
			: '1px solid transparent'};
	cursor: pointer;
	user-select: none;

	&:hover {
		background: ${({ theme, background, disabled }): string =>
			background
				? theme.palette[background][disabled ? 'disabled' : 'hover']
				: theme.palette.transparent[disabled ? 'regular' : 'hover']};
	}
	&:focus {
		background: ${({ theme, background, disabled }): string =>
			background
				? theme.palette[background][disabled ? 'disabled' : 'focus']
				: theme.palette.transparent[disabled ? 'regular' : 'focus']};
	}
`;

interface Item {
	id: string;
	label: string | React.ReactElement;
	CustomComponent?: React.ComponentType<DefaultTabBarItemProps & HTMLAttributes<HTMLDivElement>>;
	disabled?: boolean;
}

interface TabBarProps {
	/** List of elements, can have extra attributes to pass down to the CustomComponent */
	items: Array<Item>;
	/** id of the selected item */
	selected?: string;
	/** id of the default selected item */
	defaultSelected?: string;
	/** change callback, is called with the new selected id */
	onChange: (selectedId: string) => void;
	/** click (or also keyboard in the default component) event,
	 * the selectedItemId field is added to the event object */
	onItemClick: (ev: React.SyntheticEvent & { selectedItemId: string }) => void;
	/** background color of the tabBar */
	background: string | keyof ThemeObj['palette'];
	/** underline color of the selected tab */
	underlineColor: string | keyof ThemeObj['palette'];
	forceWidthEquallyDistributed: boolean;
}

interface DefaultTabBarItemProps {
	item: Item;
	selected: boolean;
	background: string | keyof ThemeObj['palette'];
	onClick: React.ReactEventHandler;
	underlineColor: string | keyof ThemeObj['palette'];
	forceWidthEquallyDistributed: boolean;
}

const DefaultTabBarItem = React.forwardRef<
	HTMLElement,
	DefaultTabBarItemProps & HTMLAttributes<HTMLDivElement>
>(function DefaultTabBarItemFn(
	{
		item,
		selected,
		background,
		onClick,
		underlineColor,
		forceWidthEquallyDistributed = false,
		children,
		...rest
	},
	ref
) {
	const activationCb = useCallback(
		(ev) => {
			if (!item.disabled) onClick(ev);
		},
		[item.disabled, onClick]
	);

	const innerRef = useRef<HTMLElement>(null);
	const combinedRef = useCombinedRefs<HTMLElement>(ref, innerRef);

	const keyEvents = useMemo(() => getKeyboardPreset('button', activationCb), [activationCb]);
	useKeyboard(combinedRef, keyEvents);

	return (
		<DefaultTabBarItemContainer
			padding={{ horizontal: 'small' }}
			onClick={activationCb}
			selected={selected}
			background={background}
			borderRadius="none"
			disabled={item.disabled}
			underlineColor={underlineColor}
			ref={combinedRef}
			forceWidthEquallyDistributed={forceWidthEquallyDistributed}
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
});

const TabBar = React.forwardRef<unknown, TabBarProps>(function TabBarFn(
	{
		items,
		selected,
		defaultSelected,
		onChange,
		onItemClick,
		background,
		underlineColor = 'primary',
		forceWidthEquallyDistributed = false,
		...rest
	},
	ref
) {
	const [currentSelection, setCurrentSelection] = useState(defaultSelected);
	useEffect(() => {
		if (typeof selected !== 'undefined') {
			setCurrentSelection(selected);
			onChange(selected);
		}
	}, [selected, onChange]);
	const onItemClickCb = useCallback(
		(id: string) =>
			(ev: React.SyntheticEvent): void => {
				setCurrentSelection(id);
				onChange(id);
				onItemClick({ ...ev, selectedItemId: id });
			},
		[onChange, onItemClick]
	);
	return (
		<Container
			ref={ref}
			orientation="horizontal"
			background={background}
			mainAlignment="flex-start"
			{...rest}
		>
			{map(items, (item) =>
				item.CustomComponent ? (
					<item.CustomComponent
						key={item.id}
						item={item}
						selected={item.id === currentSelection}
						onClick={onItemClickCb(item.id)}
						tabIndex={item.disabled ? undefined : 0}
						background={background}
						underlineColor={underlineColor}
						forceWidthEquallyDistributed={forceWidthEquallyDistributed}
					/>
				) : (
					<DefaultTabBarItem
						key={item.id}
						item={item}
						selected={item.id === currentSelection}
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

export { TabBar, DefaultTabBarItem };
