/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-nested-ternary */
import React, { useMemo, useRef, useState, useCallback, useEffect } from 'react';
import { map } from 'lodash';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import Container from '../layout/Container';
import Text from '../basic/Text';
import Icon from '../basic/Icon';
import IconButton from '../inputs/IconButton';
import Padding from '../layout/Padding';
import Badge from '../basic/Badge';
import Divider from '../layout/Divider';
import Collapse from '../utilities/Collapse';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { pseudoClasses } from '../utilities/functions';

const AccordionContainerEl = styled(Container)`
	padding-left: ${({ theme, level }) =>
		css`calc(${Math.min(level + 1, 5)} * ${theme.sizes.padding.small})`};
	padding-right: ${({ theme }) => theme.sizes.padding.small};
	background-color: ${({ theme, background, active }) =>
		theme.palette[active ? 'highlight' : background].regular};
	${({ theme, background, item }) =>
		!item.disableHover && pseudoClasses(theme, item.active ? 'highlight' : background)};
`;
const AccordionItem = React.forwardRef(function AccordionItemFn({ item, children, ...rest }, ref) {
	return (
		<Container
			orientation="horizontal"
			mainAlignment="flex-start"
			padding={{ all: 'small' }}
			height={40}
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
				<Text size="medium" style={{ minWidth: 0, flexBasis: 0, flexGrow: 1 }} {...item.textProps}>
					{item.label}
				</Text>
			)}
			{typeof item.badgeCounter !== 'undefined' && (
				<Padding left="small">
					<Badge type={item.badgeType} value={item.badgeCounter} />
				</Padding>
			)}
			{children}
		</Container>
	);
});

const AccordionRoot = React.forwardRef(function AccordionRootFn(
	{ level, item, background, activeId, openIds, disableTransition, ...rest },
	ref
) {
	const [open, setOpen] = useState(!!item.open);
	const innerRef = useRef(undefined);
	const accordionRef = useCombinedRefs(ref, innerRef);

	useEffect(() => {
		setOpen(() => !!item.open || !!openIds?.includes(item.id));
	}, [item.id, item.open, openIds]);

	const handleClick = useCallback(
		(e) => {
			if (item.onClick) item.onClick(e);
		},
		[item]
	);
	const toggleOpen = useCallback(
		(e) => {
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
		<>
			<Container orientation="vertical" width="fill" height="fit" ref={ref} {...rest}>
				{item.divider && <Divider color="gray2" />}
				<AccordionContainerEl
					active={item.active || activeId === item.id}
					item={item}
					background={item.background || background}
					ref={ref}
					level={level}
					style={{ cursor: handleClick ? 'pointer' : 'default' }}
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
								style={{ cursor: 'pointer' }}
							/>
						</Padding>
					)}
				</AccordionContainerEl>
				{item.items && item.items.length > 0 && (
					<Collapse
						crossSize="100%"
						orientation="vertical"
						open={open}
						maxSize={`${item.items.length * 64}px`}
						disableTransition={disableTransition}
					>
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
		</>
	);
});

const Accordion = React.forwardRef(function AccordionFn(
	{ items, level, background, activeId, openIds, disableTransition, ...rest },
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
			{map(items, (item, index) => (
				<AccordionRoot
					key={item.id ?? item.label ?? index}
					level={level}
					item={item}
					background={background}
					activeId={activeId}
					openIds={openIds}
					disableTransition={disableTransition}
				/>
			))}
		</Container>
	);
});

Accordion.propTypes = {
	/** id of the currently active item (alternative to the active item flag) */
	activeId: PropTypes.string,
	/** list of ids of the currently open items (alternative to the open item flag) */
	openIds: PropTypes.arrayOf(PropTypes.string),
	/** Items tree object, can be nested (each property is forwarded to the item component as a prop) */
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			label: PropTypes.string,
			items: PropTypes.shape,
			onClick: PropTypes.func,
			icon: PropTypes.string,
			CustomComponent: PropTypes.elementType,
			iconCustomColor: PropTypes.string,
			iconColor: PropTypes.string,
			divider: PropTypes.bool,
			badgeType: PropTypes.oneOf(['read', 'unread']),
			badgeCounter: PropTypes.number,
			open: PropTypes.bool,
			onOpen: PropTypes.func,
			onClose: PropTypes.func,
			background: Container.propTypes.background,
			disableHover: PropTypes.bool,
			disableTransition: PropTypes.bool
		})
	),
	/** Depth level, internally used for recursion nesting */
	level: PropTypes.number,
	/** Accordion background */
	background: Container.propTypes.background
};

Accordion.defaultProps = {
	items: [],
	level: 0,
	background: 'gray5',
	disableTransition: false
};

export { Accordion, AccordionItem };
