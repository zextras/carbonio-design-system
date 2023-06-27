/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useState, useCallback, useEffect } from 'react';

import { map } from 'lodash';
import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { pseudoClasses } from '../../theme/theme-utils';
import { Badge } from '../basic/Badge';
import { Icon } from '../basic/Icon';
import { Text, TextProps } from '../basic/Text';
import { IconButton } from '../inputs/IconButton';
import { Container, ContainerProps } from '../layout/Container';
import { Divider } from '../layout/Divider';
import { Padding } from '../layout/Padding';
import { Collapse } from '../utilities/Collapse';

const AccordionContainerEl = styled(Container)<{
	$level: number;
	background: keyof DefaultTheme['palette'];
	$active?: boolean;
	$disableHover?: boolean;
}>`
	cursor: pointer;
	padding-inline-start: ${({ theme, $level }): SimpleInterpolation =>
		css`calc(${Math.min($level + 1, 5)} * ${theme.sizes.padding.small})`};
	padding-inline-end: ${({ theme }): string => theme.sizes.padding.small};
	background-color: ${({ theme, background, $active }): string =>
		theme.palette[$active ? 'highlight' : background].regular};
	${({ theme, background, $disableHover, $active }): SimpleInterpolation =>
		!$disableHover && pseudoClasses(theme, $active ? 'highlight' : background)};
`;

const StyledText = styled(Text)`
	min-width: 0;
	flex-basis: 0;
	flex-grow: 1;
`;

interface AccordionItemProps extends ContainerProps {
	item: AccordionItemType;
	children?: React.ReactNode | React.ReactNode[];
}
const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItemFn(
	{ item, children, ...rest },
	ref
) {
	return (
		<Container
			orientation="horizontal"
			mainAlignment="flex-start"
			padding={{ all: 'small' }}
			height="2.5rem"
			ref={ref}
			style={{ minWidth: 0, flexBasis: 0, flexGrow: 1 }}
			{...rest}
		>
			{item.icon && (
				<Padding right="small">
					<Icon
						icon={item.icon}
						customColor={item.iconCustomColor}
						color={item.iconColor}
						size="large"
					/>
				</Padding>
			)}
			{item.label && (
				<StyledText size="medium" {...item.textProps}>
					{item.label}
				</StyledText>
			)}
			{item.badgeCounter !== undefined && (
				<Padding left="small">
					<Badge type={item.badgeType} value={item.badgeCounter} />
				</Padding>
			)}
			{children}
		</Container>
	);
});

type AccordionItemType = {
	id: string;
	label?: string;
	items?: AccordionItemType[];
	onClick?: (event: KeyboardEvent | React.SyntheticEvent) => void;
	icon?: keyof DefaultTheme['icons'];
	CustomComponent?: React.ComponentType<{ item: AccordionItemType }>;
	iconCustomColor?: string;
	iconColor?: string;
	badgeType?: 'read' | 'unread';
	badgeCounter?: number;
	open?: boolean;
	background?: keyof DefaultTheme['palette'];
	disableHover?: boolean;
	active?: boolean;
	level?: number;
	textProps?: TextProps;
	onOpen?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	onClose?: (e: React.SyntheticEvent | KeyboardEvent) => void;
};

type AccordionDivider = { divider: true };

interface AccordionRootProps extends ContainerProps {
	level: number;
	item: AccordionItemType;
	background: keyof DefaultTheme['palette'];
	activeId?: string;
	openIds?: string[];
	disableTransition?: boolean;
}

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRootFn(
	{ level, item, background, activeId, openIds, disableTransition, ...rest },
	ref
) {
	const [open, setOpen] = useState(!!item.open);
	const accordionRef = useCombinedRefs<HTMLDivElement>(ref);

	useEffect(() => {
		setOpen(() => !!item.open || !!openIds?.includes(item.id));
	}, [item.id, item.open, openIds]);

	const handleClick = useCallback(
		(e: KeyboardEvent | React.SyntheticEvent) => {
			if (item.onClick) {
				item.onClick(e);
			}
		},
		[item]
	);

	const toggleOpen = useCallback(
		(e: KeyboardEvent | React.SyntheticEvent) => {
			e.stopPropagation();
			setOpen((op) => {
				op ? item.onClose && item.onClose(e) : item.onOpen && item.onOpen(e);
				return !op;
			});
		},
		[item]
	);

	const keyEvents = useMemo(() => getKeyboardPreset('button', handleClick), [handleClick]);
	useKeyboard(accordionRef, keyEvents);

	return (
		<Container orientation="vertical" width="fill" height="fit" ref={ref} {...rest}>
			<AccordionContainerEl
				$active={item.active || activeId === item.id}
				background={item.background || background}
				ref={ref}
				$level={level}
				$disableHover={item.disableHover}
				onClick={handleClick}
				orientation="horizontal"
				width="fill"
				height="fit"
				mainAlignment="space-between"
				tabIndex={0}
				{...rest}
			>
				{item.CustomComponent ? (
					<item.CustomComponent item={item} />
				) : (
					<AccordionItem item={item} />
				)}
				{item.items && item.items.length > 0 && (
					<Padding right="small">
						<IconButton
							customSize={{ iconSize: 'large', paddingSize: 0 }}
							onClick={toggleOpen}
							icon={open ? 'ChevronUp' : 'ChevronDown'}
						/>
					</Padding>
				)}
			</AccordionContainerEl>
			{item.items && item.items.length > 0 && (
				<Collapse
					crossSize="100%"
					orientation="vertical"
					open={open}
					disableTransition={disableTransition}
				>
					{/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
					<Accordion
						activeId={activeId}
						openIds={openIds}
						items={item.items}
						level={item.level !== undefined ? item.level : level + 1}
						background={background}
						disableTransition={disableTransition}
					/>
				</Collapse>
			)}
		</Container>
	);
});

interface AccordionProps extends ContainerProps {
	/** Items tree object, can be nested (each property is forwarded to the item component as a prop) */
	items: Array<AccordionItemType | AccordionDivider>;
	/** Depth level, internally used for recursion nesting */
	level?: number;
	/** Accordion background */
	background?: keyof DefaultTheme['palette'];
	/** id of the currently active item (alternative to the active item flag) */
	activeId?: string;
	/** list of ids of the currently open items (alternative to the open item flag) */
	openIds?: string[];
	/** disable animation of the accordion when expanding folders */
	disableTransition?: boolean;
}

function isDivider(item: AccordionItemType | AccordionDivider): item is AccordionDivider {
	return 'divider' in item && item.divider;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function AccordionFn(
	{ items = [], level = 0, background = 'gray5', activeId, openIds, disableTransition, ...rest },
	ref
) {
	return (
		<Container
			orientation="vertical"
			height="fit"
			width="fill"
			crossAlignment="flex-start"
			background={background}
			ref={ref}
			{...rest}
		>
			{map(items, (item, index) =>
				isDivider(item) ? (
					<Divider color="gray2" />
				) : (
					<AccordionRoot
						key={item.id ?? item.label ?? index}
						level={level}
						item={item}
						background={background}
						activeId={activeId}
						openIds={openIds}
						disableTransition={disableTransition}
					/>
				)
			)}
		</Container>
	);
});

export {
	Accordion,
	AccordionProps,
	AccordionItem,
	AccordionItemProps,
	AccordionItemType,
	AccordionDivider
};
