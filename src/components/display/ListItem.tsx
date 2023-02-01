/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import styled, { DefaultTheme, SimpleInterpolation } from 'styled-components';

import { useIsVisible } from '../../hooks/useIsVisible';
import { pseudoClasses } from '../../theme/theme-utils';

interface ListItemWrapperProps {
	/** Base background color for the item */
	background?: string | keyof DefaultTheme['palette'];
	/** Background color for the selected status */
	selectedBackground?: string | keyof DefaultTheme['palette'];
	/** Background color for the active status */
	activeBackground?: string | keyof DefaultTheme['palette'];
	/** Define if the item is active in order to show the activeBackground */
	active?: boolean;
	/** Define if the item is selected in order to show the selectedBackground */
	selected?: boolean;
}

const ListItemWrapper = styled.div.attrs<
	ListItemWrapperProps,
	{ backgroundColor?: string | keyof DefaultTheme['palette'] }
>(({ background, selectedBackground, activeBackground, active, selected }) => ({
	backgroundColor: (active && activeBackground) || (selected && selectedBackground) || background
}))`
	user-select: none;
	outline: none;
	${({ theme, backgroundColor }): SimpleInterpolation =>
		backgroundColor && pseudoClasses(theme, backgroundColor)};
`;

interface ListItemProps extends ListItemWrapperProps {
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
	{ listRef, children, ...rest }: ListItemProps,
	ref: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
	const [inView, itemRef] = useIsVisible<HTMLDivElement>(listRef, ref);

	return (
		<ListItemWrapper tabIndex={0} ref={itemRef} {...rest}>
			{children(inView)}
		</ListItemWrapper>
	);
}

const ListItem = React.forwardRef(ListItemFn);

export { ListItem, ListItemProps, ListItemWrapperProps };
