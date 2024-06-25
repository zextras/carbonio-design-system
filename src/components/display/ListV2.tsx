/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import styled, { DefaultTheme } from 'styled-components';

import { ListItemProps } from './ListItem';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver/useIntersectionObserver';
import { getKeyboardPreset, KeyboardPresetObj, useKeyboard } from '../../hooks/useKeyboard';
import { Container, ContainerProps } from '../layout/Container';

const ExternalContainer = styled(Container)`
	display: block;
`;

const StyledList = styled(Container)`
	overflow-y: auto;
	overflow-y: overlay;

	&::-webkit-scrollbar {
		width: 0.5rem;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 0.25rem;
	}
`;

interface ListV2Props extends ContainerProps {
	/** intersectionObserverInitOptions of the intersectionObserver inside BottomElement */
	intersectionObserverInitOptions?: IntersectionObserverInit;
	/** callback to be executed when the bottom element is rendered */
	onListBottom?: () => void;
	/** List background color */
	background?: keyof DefaultTheme['palette'];
	/** Selected list item background color */
	selectedBackground?: keyof DefaultTheme['palette'];
	/** Active List item background color */
	activeBackground?: keyof DefaultTheme['palette'];
	/** Disable keyboard shortcuts */
	keyboardShortcutsIsDisabled?: boolean;
	/** List items */
	children: React.ReactElement<ListItemProps>[];
}

const ListV2 = React.forwardRef(function ListV2Fn(
	{
		onListBottom,
		keyboardShortcutsIsDisabled,
		children,
		background = 'transparent',
		selectedBackground = 'gray5',
		activeBackground = 'highlight',
		intersectionObserverInitOptions,
		...rest
	}: ListV2Props,
	ref: React.ForwardedRef<HTMLDivElement>
) {
	const listRef = useCombinedRefs(ref);
	const useKeyboardShortcuts = (): undefined => undefined;

	const keyEvents = useMemo<KeyboardPresetObj[]>(
		() =>
			keyboardShortcutsIsDisabled ? [] : getKeyboardPreset('list', useKeyboardShortcuts, listRef),
		[listRef, keyboardShortcutsIsDisabled]
	);
	useKeyboard(listRef, keyEvents);

	const bottomElementRef = useRef<HTMLDivElement>(null);

	const listItems = useMemo(
		() =>
			children.map((child) =>
				React.cloneElement(child, {
					listRef,
					selectedBackground: child.props.selectedBackground ?? selectedBackground,
					activeBackground: child.props.activeBackground ?? activeBackground,
					background: child.props.background ?? background
				})
			),
		[activeBackground, background, children, listRef, selectedBackground]
	);

	const onListBottomRef = useRef(onListBottom);
	onListBottomRef.current = onListBottom;

	const onIntersect = useCallback((entry: IntersectionObserverEntry) => {
		if (entry.target === bottomElementRef.current && entry.isIntersecting) {
			onListBottomRef.current?.();
		}
	}, []);

	const { observe, unobserve } = useIntersectionObserver(
		listRef,
		onIntersect,
		intersectionObserverInitOptions
	);

	useEffect(
		() => {
			const bottomElement = bottomElementRef.current;
			if (bottomElement) {
				observe(bottomElement);
			}

			return (): void => {
				if (bottomElement) {
					unobserve(bottomElement);
				}
			};
		}
		/* do not define deps array -> un-observe and re-observe each time the component is re-rendered */
	);

	return (
		<ExternalContainer ref={listRef} {...rest}>
			<StyledList orientation="vertical" mainAlignment="flex-start" crossAlignment="stretch">
				{listItems}
				{onListBottom && (
					<div
						ref={bottomElementRef}
						style={{ minHeight: '4px', minWidth: '1px' }}
						data-testid={'list-bottom-element'}
					/>
				)}
			</StyledList>
		</ExternalContainer>
	);
});

export { ListV2, ListV2Props };
