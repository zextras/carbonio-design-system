/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled, { SimpleInterpolation } from 'styled-components';

import { useIsVisible } from '../../hooks/useIsVisible/useIsVisible';
import { pseudoClasses } from '../../theme/theme-utils';
import { AnyColor } from '../../types/utils';

/**
 * @deprecated Use ListItemProps instead
 */
interface ListItemWrapperProps {
	/** Base background color for the item */
	background?: AnyColor;
	/** Background color for the selected status */
	selectedBackground?: AnyColor;
	/** Background color for the active status */
	activeBackground?: AnyColor;
	/** Define if the item is active in order to show the activeBackground */
	active?: boolean;
	/** Define if the item is selected in order to show the selectedBackground */
	selected?: boolean;
}

const ListItemWrapper = styled.div<{ $backgroundColor?: AnyColor }>`
	user-select: none;
	outline: none;
	${({ theme, $backgroundColor }): SimpleInterpolation =>
		$backgroundColor && pseudoClasses(theme, $backgroundColor)};
`;

interface ListItemProps {
	/** Base background color for the item */
	background?: AnyColor;
	/** Background color for the selected status */
	selectedBackground?: AnyColor;
	/** Background color for the active status */
	activeBackground?: AnyColor;
	/** Define if the item is active in order to show the activeBackground */
	active?: boolean;
	/** Define if the item is selected in order to show the selectedBackground */
	selected?: boolean;
	/**
	 * Ref of the list used to set the visibility of the item.
	 * The ref is set by the list itself.
	 *
	 * @ignore
	 */
	listRef?: React.RefObject<HTMLDivElement>;
	/**
	 * Content of the item (render prop).
	 * Visible arg define if the item is visible on the screen or if is in the hidden part of the list.
	 * This is useful to avoid rendering components which are not visible (virtual list), replacing
	 * them with a placeholder which allow the scrollbar to have the right height.
	 */
	children: (visible: boolean) => React.ReactElement;
	key: NonNullable<React.HTMLProps<HTMLDivElement>['key']>;
}

function ListItemFn(
	{
		listRef,
		children,
		active,
		activeBackground,
		selected,
		selectedBackground,
		background,
		...rest
	}: ListItemProps,
	ref: React.ForwardedRef<HTMLDivElement>
): React.JSX.Element {
	const [inView, itemRef] = useIsVisible<HTMLDivElement>(listRef, ref);

	return (
		<ListItemWrapper
			tabIndex={0}
			ref={itemRef}
			$backgroundColor={
				(active && activeBackground) || (selected && selectedBackground) || background
			}
			{...rest}
		>
			{children(inView)}
		</ListItemWrapper>
	);
}

const ListItem = React.forwardRef(ListItemFn);

export { ListItem, ListItemProps, ListItemWrapperProps };
