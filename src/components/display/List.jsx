/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useEffect, useMemo, forwardRef, memo } from 'react';
import { map, some } from 'lodash';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container } from '../layout/Container';
import { useIsVisible } from '../../hooks/useIsVisible';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { pseudoClasses } from '../../theme/theme-utils';
import { Theme } from '../../theme/theme';

const StyledContainer = styled(Container)`
	overflow-y: overlay;
	&::-webkit-scrollbar {
		width: 12px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }) => theme.palette.gray3.regular};
		border-radius: 6px;
	}
`;

const StyledDiv = styled.div`
	user-select: none;
	outline: none;
	background: ${({ theme, background, selectedBackground, activeBackground, active, selected }) =>
		// eslint-disable-next-line no-nested-ternary
		theme.palette[active ? activeBackground : selected ? selectedBackground : background].regular};
	${({ theme, background, selectedBackground, activeBackground, active, selected }) =>
		pseudoClasses(
			theme,
			// eslint-disable-next-line no-nested-ternary
			active ? activeBackground : selected ? selectedBackground : background
		)};
`;

const LIWrapper = memo(function LIWrapperFn({
	listRef,
	ItemComponent,
	itemProps,
	disabled,
	background,
	selectedBackground,
	activeBackground,
	active,
	selected,
	...rest
}) {
	const [inView, ref] = useIsVisible(listRef);

	return (
		<StyledDiv
			tabIndex={rest.index}
			ref={ref}
			active={active}
			selected={selected}
			selectedBackground={selectedBackground}
			activeBackground={activeBackground}
			background={background}
		>
			<ItemComponent
				visible={inView}
				{...itemProps}
				{...rest}
				active={active}
				selected={selected}
				selectedBackground={selectedBackground}
				activeBackground={activeBackground}
				background={background}
			/>
		</StyledDiv>
	);
});

const BottomElement = ({ listRef, onVisible }) => {
	const [inView, ref] = useIsVisible(listRef);
	useEffect(() => {
		if (inView && onVisible) {
			onVisible();
		}
	}, [inView, onVisible]);
	return <div ref={ref} />;
};

const List = forwardRef(function ListFn(
	{
		items,
		itemProps,
		ItemComponent,
		selected,

		background,
		selectedBackground,
		activeBackground,

		active,
		onListBottom,
		keyboardShortcutsIsDisabled,
		...rest
	},
	ref
) {
	const selecting = useMemo(() => some(selected, (i) => !!i), [selected]);
	const listRef = useRef();
	const useKeyboardShortcuts = () => undefined;

	const keyEvents = useMemo(
		() =>
			keyboardShortcutsIsDisabled ? null : getKeyboardPreset('list', useKeyboardShortcuts, listRef),
		[listRef, keyboardShortcutsIsDisabled]
	);
	useKeyboard(listRef, keyEvents);

	return (
		<div ref={listRef} style={{ height: '100%', width: '100%' }}>
			<StyledContainer
				ref={ref}
				orientation="vertical"
				mainAlignment="flex-start"
				crossAlignment="stretch"
				{...rest}
			>
				{map(items, (item, index) => (
					<LIWrapper
						ItemComponent={ItemComponent}
						key={item.id}
						listRef={listRef}
						index={index}
						selectedBackground={selectedBackground}
						itemProps={itemProps}
						item={item}
						activeBackground={activeBackground}
						background={background}
						selected={!!selected[item.id]}
						selecting={selecting}
						active={item.id === active}
					/>
				))}
				{onListBottom && <BottomElement listRef={listRef} onVisible={onListBottom} />}
			</StyledContainer>
		</div>
	);
});
List.propTypes = {
	/** Array of items to be displayed */
	items: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.string })),
	/** props to be passed down to each item */
	itemProps: PropTypes.object,
	/** Component to be rendered for each item */
	ItemComponent: PropTypes.elementType.isRequired,
	/** object whose keys are the indexes of the selected items */
	selected: PropTypes.object,
	/** id of the active item */
	active: PropTypes.string,
	/** callback to be executed when the bottom element is rendered */
	onListBottom: PropTypes.func,
	/** List background color */
	background: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Selected list item background color */
	selectedBackground: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.palette))
	]),
	/** Active List item background color */
	activeBackground: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.palette))
	])
};

List.defaultProps = {
	items: [],
	selected: {},
	itemProps: {},
	active: undefined,
	onListBottom: undefined,
	background: 'transparent',
	selectedBackground: 'gray5',
	activeBackground: 'highlight'
};

export { List };
