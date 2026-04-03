/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo, useState, useCallback, useEffect } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { map } from 'lodash';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import type { Theme } from '../../theme/theme';
import { getColor, pseudoClasses } from '../../theme/theme-utils';
import { Badge } from '../basic/badge/Badge';
import { Button } from '../basic/button/Button';
import { Icon } from '../basic/icon/Icon';
import type { TextProps } from '../basic/text/Text';
import { Text } from '../basic/text/Text';
import { Tooltip } from '../display/tooltip/Tooltip';
import type { ContainerProps } from '../layout/container/Container';
import { Container } from '../layout/container/Container';
import { Divider } from '../layout/divider/Divider';
import { Padding } from '../layout/padding/Padding';
import { Collapse } from '../utilities/Collapse';

const AccordionContainerEl = styled(Container)<{
	$level: number;
	$active?: boolean;
	$disableHover?: boolean;
}>`
	cursor: pointer;
	padding-left: ${({ theme, $level }): string =>
		`calc(${Math.min($level + 1, 5)} * ${theme.sizes.padding.small})`};
	padding-right: ${({ theme }): string => theme.sizes.padding.small};
	background-color: ${({ theme, background, $active }): string | undefined =>
		background && getColor(`${[$active ? 'highlight' : background]}.regular`, theme)};
	${({ theme, background, $disableHover, $active }): ReturnType<typeof css> | false | undefined =>
		!$disableHover && background && pseudoClasses(theme, $active ? 'highlight' : background)};
`;

const StyledText = styled(Text)`
	min-width: 0;
	flex-basis: 0;
	flex-grow: 1;
`;

const StyledButton = styled(Button)<{
	$iconSize?: keyof Theme['sizes']['icon'];
	$paddingSize?: string;
}>`
	${({ $iconSize, theme }): ReturnType<typeof css> | undefined | string =>
		$iconSize &&
		css`
			svg {
				width: ${theme.sizes.icon[$iconSize]};
				min-width: ${theme.sizes.icon[$iconSize]};
				height: ${theme.sizes.icon[$iconSize]};
				min-height: ${theme.sizes.icon[$iconSize]};
			}
		`};
	${({ $paddingSize }): ReturnType<typeof css> | undefined | string =>
		$paddingSize &&
		css`
			padding: ${$paddingSize};
		`};
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
					<Icon icon={item.icon} color={item.iconColor} size="large" />
				</Padding>
			)}
			{item.label && (
				<StyledText size="medium" {...item.textProps}>
					{item.label}
				</StyledText>
			)}
			{item.badgeCounter !== undefined && (
				<Padding left="small">
					<Badge
						backgroundColor={(item.badgeType === 'unread' && 'primary') || 'gray2'}
						color={(item.badgeType === 'unread' && 'gray6') || 'gray0'}
						value={item.badgeCounter}
					/>
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
	icon?: keyof Theme['icons'];
	CustomComponent?: React.ComponentType<{ item: AccordionItemType }>;
	iconColor?: string;
	badgeType?: 'read' | 'unread';
	badgeCounter?: number;
	open?: boolean;
	background?: keyof Theme['palette'];
	disableHover?: boolean;
	active?: boolean;
	level?: number;
	textProps?: TextProps;
	onOpen?: (e: React.SyntheticEvent | KeyboardEvent) => void;
	onClose?: (e: React.SyntheticEvent | KeyboardEvent) => void;
};

type AccordionDivider = { divider: true; key?: string };

interface AccordionRootProps extends ContainerProps {
	level: number;
	item: AccordionItemType;
	background: keyof Theme['palette'];
	activeId?: string;
	openIds?: string[];
	disableTransition?: boolean;
	expandLabel?: string;
	collapseLabel?: string;
}

const AccordionRoot = React.forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRootFn(
	{
		level,
		item,
		background,
		activeId,
		openIds,
		disableTransition,
		expandLabel,
		collapseLabel,
		...rest
	},
	ref
) {
	const [open, setOpen] = useState(!!item.open);
	const [areItemsVisible, setAreItemsVisible] = useState(open);
	const accordionRef = useCombinedRefs<HTMLDivElement>(ref);

	// Set the initial open state
	useEffect(() => {
		const shouldBeOpen = !!item.open || !!openIds?.includes(item.id);
		setOpen(shouldBeOpen);
		setAreItemsVisible(shouldBeOpen);
	}, [item.id, item.open, openIds]);

	const handleClick = useCallback(
		(e: KeyboardEvent | React.SyntheticEvent) => {
			if (item.onClick) {
				item.onClick(e);
			}
		},
		[item]
	);

	/*
	 * Toggle the open state of the accordion, calls the onOpen and
	 * onClose callbacks, and, if transitions disabled, sync the
	 * visual state with the open state
	 */
	const toggleOpen = useCallback(
		(e: KeyboardEvent | React.SyntheticEvent) => {
			e.stopPropagation();

			/*
			 * If the transition is disabled or the accordion is not open,
			 * we immediately sync the areItemsVisible state with the next value
			 */
			if (disableTransition || !open) {
				setAreItemsVisible(!open);
			}
			const wasOpen = open;
			setOpen(!open);
			if (wasOpen) {
				item.onClose?.(e);
			} else {
				item.onOpen?.(e);
			}
		},
		[item, disableTransition, open]
	);

	/*
	 * At the end of the collapse transition, we want to sync the areItemsVisible state
	 * with the open state
	 */
	const onCollapseTransitionEnd = useCallback(() => {
		setAreItemsVisible(() => open);
	}, [open]);

	const hasItems = useMemo(() => item.items && item.items.length > 0, [item.items]);

	/*
	 * The items should be rendered when:
	 * - the accordion has items
	 * - the accordion is visually open
	 */
	const shouldRenderItems = useMemo(() => {
		if (!hasItems) {
			return false;
		}

		return areItemsVisible;
	}, [hasItems, areItemsVisible]);

	const keyEvents = useMemo(() => getKeyboardPreset('button', handleClick), [handleClick]);
	useKeyboard(accordionRef, keyEvents);

	const tooltipLabel = useMemo(
		() => (open ? collapseLabel : expandLabel),
		[collapseLabel, expandLabel, open]
	);

	return (
		<Container
			orientation="vertical"
			width="fill"
			height="fit"
			ref={ref}
			data-testid={'accordion-item'}
			{...rest}
		>
			<AccordionContainerEl
				$active={item.active || activeId === item.id}
				background={item.background ?? background}
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
				{hasItems && (
					<Padding right="small">
						<Tooltip label={tooltipLabel} disabled={!tooltipLabel} placement={'top'}>
							<StyledButton
								$iconSize={'large'}
								$paddingSize={'0'}
								onClick={toggleOpen}
								icon={open ? 'ChevronUp' : 'ChevronDown'}
								type={'ghost'}
								color={'text'}
							/>
						</Tooltip>
					</Padding>
				)}
			</AccordionContainerEl>
			{shouldRenderItems && (
				<Collapse
					crossSize="100%"
					orientation="vertical"
					open={open}
					disableTransition={disableTransition}
					onTransitionEnd={onCollapseTransitionEnd}
				>
					{/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
					<Accordion
						activeId={activeId}
						openIds={openIds}
						// The non-null assertion is used because the shouldRenderItems check guarantees that items is not null
						items={item.items!}
						level={item.level ?? level + 1}
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
	/** Accordion background */
	background?: keyof Theme['palette'];
	/** Depth level, internally used for recursion nesting */
	level?: number;
	/** id of the currently active item (alternative to the active item flag) */
	activeId?: string;
	/** list of ids of the currently open items (alternative to the open item flag) */
	openIds?: string[];
	/** disable animation of the accordion when expanding folders */
	disableTransition?: boolean;
	/** tooltip of the collapsed chevron */
	expandLabel?: string;
	/** tooltip of the expanded chevron */
	collapseLabel?: string;
}

function isDivider(item: AccordionItemType | AccordionDivider): item is AccordionDivider {
	return 'divider' in item && item.divider;
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(function AccordionFn(
	{
		items = [],
		level = 0,
		background = 'gray5',
		activeId,
		openIds,
		disableTransition,
		expandLabel,
		collapseLabel,
		...rest
	},
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
			data-testid={'accordion'}
			{...rest}
		>
			{map(items, (item, index) =>
				isDivider(item) ? (
					<Divider color="gray2" key={item.key ?? `divider-${index}`} />
				) : (
					<AccordionRoot
						key={item.id ?? item.label ?? index}
						level={level}
						item={item}
						background={background}
						activeId={activeId}
						openIds={openIds}
						disableTransition={disableTransition}
						expandLabel={expandLabel}
						collapseLabel={collapseLabel}
					/>
				)
			)}
		</Container>
	);
});

export {
	Accordion,
	type AccordionProps,
	AccordionItem,
	type AccordionItemProps,
	type AccordionItemType,
	type AccordionDivider
};
