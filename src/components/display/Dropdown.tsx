/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, {
	useState,
	useRef,
	useEffect,
	useLayoutEffect,
	useCallback,
	useMemo,
	useContext,
	createRef,
	HTMLAttributes
} from 'react';
import {
	createPopper,
	Instance,
	OptionsGeneric,
	StrictModifiers,
	VirtualElement
} from '@popperjs/core';
import { find } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { pseudoClasses } from '../../theme/theme-utils';
import { Padding } from '../layout/Padding';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { Container } from '../layout/Container';
import { Portal } from '../utilities/Portal';
import { Divider } from '../layout/Divider';
import { useKeyboard, getKeyboardPreset, KeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import type { ThemeObj } from '../../theme/theme';
import { ThemeContext } from '../../theme/theme-context-provider';

const ContainerEl = styled(Container)<{
	$selectedBackgroundColor?: keyof ThemeObj['palette'];
	$disabled: boolean;
}>`
	user-select: none;
	outline: none;
	${({ theme, $disabled, $selectedBackgroundColor }): SimpleInterpolation =>
		!$disabled && pseudoClasses(theme, $selectedBackgroundColor || 'gray5')};
`;

interface ListItemContentProps {
	icon?: string;
	label: string;
	selected?: boolean;
	disabled?: boolean;
	itemIconSize: React.ComponentPropsWithRef<typeof Icon>['size'];
	itemTextSize: React.ComponentProps<typeof Text>['size'];
	itemPaddingBetween: keyof ThemeObj['sizes']['padding'];
}

function ListItemContent({
	icon,
	label,
	selected,
	disabled,
	itemIconSize,
	itemTextSize,
	itemPaddingBetween
}: ListItemContentProps): JSX.Element {
	return (
		<>
			{icon && (
				<Padding right={itemPaddingBetween}>
					<Icon
						icon={icon}
						size={itemIconSize}
						color={disabled ? 'secondary' : 'text'}
						style={{ pointerEvents: 'none' }}
					/>
				</Padding>
			)}
			<Text
				size={itemTextSize}
				weight={selected ? 'bold' : 'regular'}
				color={disabled ? 'secondary.regular' : 'text'}
				disabled={disabled}
			>
				{label}
			</Text>
		</>
	);
}

interface PopperListItemProps extends ListItemContentProps, HTMLAttributes<HTMLDivElement> {
	click?: (e: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => void;
	customComponent?: React.ReactNode;
	selectedBackgroundColor?: keyof ThemeObj['palette'];
	keepOpen?: boolean;
}

function PopperListItem({
	icon,
	label,
	click,
	selected,
	customComponent,
	disabled = false,
	selectedBackgroundColor,
	itemIconSize,
	itemTextSize,
	keepOpen,
	itemPaddingBetween,
	...rest
}: PopperListItemProps): JSX.Element {
	const itemRef = useRef<HTMLDivElement | null>(null);

	const keyEvents = useMemo(() => (click && getKeyboardPreset('listItem', click)) || [], [click]);
	useKeyboard(itemRef, keyEvents);

	const onClick = useCallback<React.MouseEventHandler<HTMLElement>>(
		(e) => {
			if (keepOpen) {
				e.stopPropagation();
			}
			if (!disabled && click) {
				click(e);
			}
		},
		[click, disabled, keepOpen]
	);

	return (
		<ContainerEl
			ref={itemRef}
			data-keep-open={keepOpen}
			className={selected ? 'zapp-selected' : ''}
			orientation="horizontal"
			mainAlignment="flex-start"
			padding={{ vertical: 'small', horizontal: 'large' }}
			style={{ cursor: click && !disabled ? 'pointer' : 'default' }}
			onClick={onClick}
			tabIndex={disabled ? -1 : 0}
			$disabled={disabled}
			$selectedBackgroundColor={selected ? selectedBackgroundColor : undefined}
			background={selected && selectedBackgroundColor ? selectedBackgroundColor : undefined}
			{...rest}
		>
			{customComponent || (
				<ListItemContent
					icon={icon}
					label={label}
					selected={selected}
					disabled={disabled}
					itemIconSize={itemIconSize}
					itemTextSize={itemTextSize}
					itemPaddingBetween={itemPaddingBetween}
				/>
			)}
		</ContainerEl>
	);
}

interface NestListItemProps extends PopperListItemProps {
	open?: boolean;
	items: Array<DropdownItem>;
}

function NestListItem({
	icon,
	label,
	click,
	selected,
	open,
	customComponent,
	disabled = false,
	items,
	selectedBackgroundColor,
	itemIconSize,
	itemTextSize,
	itemPaddingBetween,
	keepOpen,
	...rest
}: NestListItemProps): JSX.Element {
	const itemRef = useRef<HTMLDivElement | null>(null);

	const keyEvents = useMemo(() => (click && getKeyboardPreset('listItem', click)) || [], [click]);
	useKeyboard(itemRef, keyEvents);
	return (
		<ContainerEl
			data-keep-open={keepOpen}
			ref={itemRef}
			className={selected ? 'zapp-selected' : ''}
			orientation="horizontal"
			mainAlignment="flex-start"
			padding={{ vertical: 'small', horizontal: 'large' }}
			style={{ cursor: click && !disabled ? 'pointer' : 'default' }}
			onClick={disabled ? undefined : click}
			tabIndex={disabled ? undefined : 0}
			$disabled={disabled}
			$selectedBackgroundColor={selected ? selectedBackgroundColor : undefined}
			{...rest}
		>
			{/* eslint-disable-next-line @typescript-eslint/no-use-before-define */}
			<Dropdown
				display="block"
				items={items}
				forceOpen={open}
				placement="right-start"
				selectedBackgroundColor={selectedBackgroundColor}
				itemIconSize={itemIconSize}
				itemTextSize={itemTextSize}
				itemPaddingBetween={itemPaddingBetween}
			>
				<Container orientation="horizontal" mainAlignment="space-between">
					{customComponent || (
						<ListItemContent
							icon={icon}
							label={label}
							selected={selected}
							disabled={disabled}
							itemIconSize={itemIconSize}
							itemTextSize={itemTextSize}
							itemPaddingBetween={itemPaddingBetween}
						/>
					)}
					<Icon size={itemIconSize} icon="ChevronRight" style={{ alignSelf: 'flex-end' }} />
				</Container>
			</Dropdown>
		</ContainerEl>
	);
}

const PopperDropdownWrapper = styled.div<{ display: string }>`
	position: relative;
	display: ${({ display }): string => display};
	width: ${({ display }): string => (display === 'block' ? '100%' : 'auto')};
`;
const PopperList = styled.div<{
	width: string;
	maxWidth: string;
	maxHeight: string;
	triggerRef: React.RefObject<HTMLElement>;
	open: boolean;
}>`
	position: absolute;
	display: none;
	visibility: hidden;
	pointer-events: none;
	background-color: ${({ theme }): string => theme.palette.gray5.regular};
	box-shadow: 0 0 4px 0 rgba(166, 166, 166, 0.5);
	z-index: 999;

	padding: ${({ theme }): string => theme.sizes.padding.small} 0;
	max-width: ${({ width, maxWidth }): string => (width === '100%' ? '100%' : maxWidth)};
	max-height: ${({ maxHeight }): string => maxHeight};
	width: ${({ width, triggerRef }): string =>
		width === '100%' && triggerRef.current ? `${triggerRef.current.clientWidth}px` : width};
	overflow-y: auto;

	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 4px;
	}

	&,
	> [tabindex='-1']:focus {
		outline: none;
	}

	${({ open }): SimpleInterpolation =>
		open &&
		css`
			display: block;
			visibility: visible;
			pointer-events: auto;
		`};
`;

interface DropdownItem {
	type?: 'divider';
	id: string;
	label: string;
	icon?: string;
	click?: (e: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => void;
	selected?: boolean;
	customComponent?: React.ReactNode;
	disabled?: boolean;
	items?: Array<DropdownItem>;
	keepOpen?: boolean;
}

interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'contextMenu'> {
	/** Whether to disable the Dropdown or not */
	disabled?: boolean;
	/** Array of items to display */
	items: Array<DropdownItem>;
	/** Css display property */
	display?: 'block' | 'inline-block';
	/** Dropdown width type */
	width?: string;
	/** Css max-width property */
	maxWidth?: string;
	/** Css max-height property */
	maxHeight?: string;
	/** whether to manage the keyboard events for dropdown trigger */
	handleTriggerEvents?: boolean;
	/** whether to disable the re-focus of trigger */
	disableRestoreFocus?: boolean;
	/** whether to focus the first item of the Dropdown on open */
	disableAutoFocus?: boolean;
	/** whether user can select multiple items of dropdown aka do not close popover on item click */
	multiple?: boolean;
	/** Open dropdown on right click at cursor position */
	contextMenu?: boolean;
	/** Callback for opened Dropdown */
	onOpen?: () => void;
	/** Callback for closed Dropdown */
	onClose?: () => void;
	/** Only one component can be passed as children */
	children: React.ReactElement;
	/** Placement of the dropdown */
	placement?:
		| 'auto'
		| 'auto-start'
		| 'auto-end'
		| 'top'
		| 'top-start'
		| 'top-end'
		| 'bottom'
		| 'bottom-start'
		| 'bottom-end'
		| 'right'
		| 'right-start'
		| 'right-end'
		| 'left'
		| 'left-start'
		| 'left-end';
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Whether the Component is visible or not */
	forceOpen?: boolean;
	/** Whether to preventDefault on Dropdown click */
	preventDefault?: boolean;
	/** Customize selected background color */
	selectedBackgroundColor?: keyof ThemeObj['palette'];
	/** Item Icon size */
	itemIconSize?: React.ComponentPropsWithRef<typeof Icon>['size'];
	/** Item Text size */
	itemTextSize?: React.ComponentPropsWithRef<typeof Text>['size'];
	/** Item Padding Between */
	itemPaddingBetween?: keyof ThemeObj['sizes']['padding'];
	/** Ref assign to the dropdown list popper container */
	dropdownListRef?: React.RefObject<HTMLDivElement>;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(function DropdownFn(
	{
		forceOpen = false,
		disabled = false,
		items,
		placement = 'bottom-start',
		display = 'inline-block',
		width = 'auto',
		maxWidth = '300px',
		maxHeight = '50vh',
		handleTriggerEvents = false,
		disableRestoreFocus = false,
		disableAutoFocus = false,
		multiple = false,
		contextMenu = false,
		onOpen,
		onClose,
		children,
		disablePortal = false,
		preventDefault = true,
		selectedBackgroundColor,
		itemIconSize = 'medium',
		itemTextSize = 'medium',
		itemPaddingBetween = 'small',
		dropdownListRef = createRef<HTMLDivElement>(),
		...rest
	},
	ref
) {
	const { windowObj } = useContext(ThemeContext);
	const [open, setOpen] = useState<boolean>(forceOpen);
	const openRef = useRef<boolean>(open);
	const dropdownRef = useCombinedRefs<HTMLDivElement>(dropdownListRef);
	const triggerRef = useRef<HTMLElement | null>(null);
	const popperItemsRef = useRef<HTMLDivElement | null>(null);
	const startSentinelRef = useRef<HTMLDivElement | null>(null);
	const endSentinelRef = useRef<HTMLDivElement | null>(null);
	const [position, setPosition] = useState<VirtualElement | null>(null);
	const [currentHover, setCurrentHover] = useState<string | null>(null);

	useEffect(() => {
		setOpen(forceOpen);
	}, [forceOpen]);

	const openPopper = useCallback(() => {
		setOpen(true);
		onOpen && onOpen();
	}, [onOpen]);

	const closePopper = useCallback(
		(e?: React.SyntheticEvent | KeyboardEvent) => {
			e && e.stopPropagation();
			setOpen(forceOpen);
			!disableRestoreFocus && triggerRef.current && triggerRef.current.focus();
			onClose && onClose();
		},
		[disableRestoreFocus, forceOpen, onClose]
	);

	const handleClick = useCallback<(e: React.SyntheticEvent | KeyboardEvent) => void>(
		(e) => {
			e.preventDefault();
			if (openRef.current) {
				closePopper();
			} else if (!disabled) {
				openPopper();
			}
		},
		[closePopper, disabled, openPopper]
	);

	// TODO: it probably makes sense to merge this callback and the handleClick
	const handleLeftClick = useCallback<React.ReactEventHandler>(
		(e) => {
			children.props.onClick && children.props.onClick(e);
			handleClick(e);
		},
		[children.props, handleClick]
	);

	const handleRightClick = useCallback<React.MouseEventHandler<HTMLElement>>(
		(e) => {
			e.preventDefault();
			const virtualElement: VirtualElement = {
				getBoundingClientRect: () => ({
					width: 0,
					height: 0,
					top: e.clientY,
					right: e.clientX,
					bottom: e.clientY,
					left: e.clientX,
					x: e.clientX,
					y: e.clientY,
					toJSON: (): string => 'TODO' // TODO: check what this should return
				})
			};
			setPosition(virtualElement);
			setTimeout(() => {
				if (!disabled && !openRef.current) {
					openPopper();
				}
			}, 1);
		},
		[disabled, openPopper]
	);

	const clickOutsidePopper = useCallback(
		(e: Event) => {
			if (
				dropdownRef.current &&
				e.target !== dropdownRef.current &&
				!dropdownRef.current.contains(e.target as Node | null) &&
				triggerRef.current &&
				e.target !== triggerRef.current &&
				!triggerRef.current?.contains(e.target as Node | null) &&
				// check if the attribute is in the event path
				!find(
					e.composedPath?.() ?? [],
					(el) => (el as Element).hasAttribute && (el as Element).hasAttribute('data-keep-open')
				)
			) {
				closePopper();
			}
		},
		[closePopper, dropdownRef]
	);

	const onStartSentinelFocus = useCallback(() => {
		const lastChild =
			popperItemsRef.current &&
			popperItemsRef.current.querySelector<HTMLElement>('div[tabindex]:last-child');
		lastChild && lastChild.focus();
	}, []);
	const onEndSentinelFocus = useCallback(() => {
		const lastChild =
			popperItemsRef.current &&
			popperItemsRef.current.querySelector<HTMLElement>('div[tabindex]:first-child');
		lastChild && lastChild.focus();
	}, []);

	const triggerEvents = useMemo(
		() => (handleTriggerEvents ? getKeyboardPreset('button', handleClick) : []),
		[handleClick, handleTriggerEvents]
	);
	useKeyboard(triggerRef, triggerEvents);

	// We need to add 'open' as dependency because we want to reattach these events each time we open the dropdown
	const listEvents = useMemo(
		() => getKeyboardPreset('list', () => undefined, popperItemsRef),
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[open, popperItemsRef]
	);

	useKeyboard(popperItemsRef, listEvents);
	// We need to add 'open' as dependency because we want to reattach these events each time we open the dropdown
	const escapeEvent = useMemo<KeyboardPreset>(
		() => [{ type: 'keydown', callback: closePopper, keys: ['Escape'], modifier: false }],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[open, closePopper]
	);
	useKeyboard(dropdownRef, escapeEvent);

	useLayoutEffect(() => {
		let popperInstance: Instance | undefined;
		if (open) {
			const popperOptions: OptionsGeneric<StrictModifiers> = {
				placement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: (): [number, number] => [0, 4]
						}
					}
				],
				strategy: 'fixed'
			};

			const popperReference = contextMenu ? position : triggerRef.current;
			if (popperReference && dropdownRef.current) {
				popperInstance = createPopper<StrictModifiers>(
					popperReference,
					dropdownRef.current,
					popperOptions
				);
			}
		}
		return (): void => popperInstance && popperInstance.destroy();
	}, [open, placement, contextMenu, position, dropdownRef]);

	useEffect(() => {
		if (!disableAutoFocus) {
			open &&
				setTimeout(() => {
					const selectedItems = dropdownRef.current
						? dropdownRef.current.querySelectorAll<HTMLElement>('.zapp-selected')
						: [];
					selectedItems.length > 0
						? selectedItems[0].focus()
						: popperItemsRef.current &&
						  popperItemsRef.current.children[0] &&
						  popperItemsRef.current.children[0] instanceof HTMLElement &&
						  popperItemsRef.current.children[0].focus();
				}, 1);
		}
	}, [disableAutoFocus, dropdownRef, open]);

	useEffect(() => {
		openRef.current = open;
		if (open) {
			setTimeout(() => windowObj.document.addEventListener('click', clickOutsidePopper, true), 1);
			contextMenu &&
				setTimeout(
					() => windowObj.document.addEventListener('contextmenu', clickOutsidePopper, true),
					1
				);
		}

		return (): void => {
			windowObj.document.removeEventListener('click', clickOutsidePopper, true);
			windowObj.document.removeEventListener('contextmenu', clickOutsidePopper, true);
		};
	}, [open, closePopper, clickOutsidePopper, contextMenu, windowObj.document]);

	useEffect(() => {
		const popperItemRefElement = popperItemsRef.current;
		const startSentinelRefElement = startSentinelRef.current;
		const endSentinelRefElement = endSentinelRef.current;
		if (open && !disableAutoFocus) {
			popperItemRefElement && popperItemRefElement.focus({ preventScroll: true });
			startSentinelRefElement &&
				startSentinelRefElement.addEventListener('focus', onStartSentinelFocus);
			endSentinelRefElement && endSentinelRefElement.addEventListener('focus', onEndSentinelFocus);
		}
		return (): void => {
			startSentinelRefElement &&
				startSentinelRefElement.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefElement &&
				endSentinelRefElement.removeEventListener('focus', onEndSentinelFocus);
		};
	}, [
		open,
		startSentinelRef,
		endSentinelRef,
		onStartSentinelFocus,
		onEndSentinelFocus,
		disableAutoFocus
	]);

	const listItemClickHandler = useCallback<
		(
			onClick?: PopperListItemProps['click'],
			keepOpen?: boolean
		) => (event: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => void
	>(
		(onClick, keepOpen) =>
			(event): void => {
				onClick && onClick(event);
				!multiple && !keepOpen && closePopper();
			},
		[closePopper, multiple]
	);

	const listItemMouseEnterHandler = useCallback(
		(id: string) => (): void => {
			setCurrentHover(id);
		},
		[]
	);

	const popperListItems = useMemo(
		() =>
			items &&
			items.map(
				(
					{
						id,
						icon,
						label,
						click,
						selected,
						customComponent,
						items: subItems,
						disabled: itemDisabled,
						type,
						keepOpen,
						...itemProps
					},
					index
				) =>
					(type === 'divider' && <Divider key={id ?? `divider-${index}`} />) ||
					(subItems && (
						<NestListItem
							icon={icon}
							label={label}
							click={listItemClickHandler(click, keepOpen)}
							keepOpen={keepOpen}
							selected={selected}
							open={currentHover === id}
							key={id}
							customComponent={customComponent}
							disabled={itemDisabled}
							items={subItems}
							onMouseEnter={listItemMouseEnterHandler(id)}
							selectedBackgroundColor={selectedBackgroundColor}
							itemIconSize={itemIconSize}
							itemTextSize={itemTextSize}
							itemPaddingBetween={itemPaddingBetween}
							{...itemProps}
						/>
					)) || (
						<PopperListItem
							icon={icon}
							label={label}
							click={listItemClickHandler(click, keepOpen)}
							keepOpen={keepOpen}
							selected={selected}
							key={id}
							customComponent={customComponent}
							disabled={itemDisabled}
							onMouseEnter={(): void => {
								setCurrentHover(id);
							}}
							selectedBackgroundColor={selectedBackgroundColor}
							itemIconSize={itemIconSize}
							itemTextSize={itemTextSize}
							itemPaddingBetween={itemPaddingBetween}
							{...itemProps}
						/>
					)
			),
		[
			items,
			listItemClickHandler,
			currentHover,
			listItemMouseEnterHandler,
			selectedBackgroundColor,
			itemIconSize,
			itemTextSize,
			itemPaddingBetween
		]
	);

	const popperListPreventDefaultHandler = useCallback<React.MouseEventHandler>(
		(event) => {
			preventDefault && event.preventDefault();
		},
		[preventDefault]
	);

	const triggerComponent = useMemo(() => {
		const props = contextMenu ? { onContextMenu: handleRightClick } : { onClick: handleLeftClick };
		return React.cloneElement(children, { ref: triggerRef, ...props });
	}, [children, contextMenu, handleLeftClick, handleRightClick]);

	const popperListProps = useMemo(
		() =>
			contextMenu
				? { onContextMenu: popperListPreventDefaultHandler }
				: { onClick: popperListPreventDefaultHandler },
		[contextMenu, popperListPreventDefaultHandler]
	);

	return (
		<PopperDropdownWrapper ref={ref} display={display} {...rest}>
			{triggerComponent}
			<Portal show={open} disablePortal={disablePortal}>
				<PopperList
					ref={dropdownRef}
					open={open}
					width={width}
					maxWidth={maxWidth}
					maxHeight={maxHeight}
					triggerRef={triggerRef}
					data-testid="dropdown-popper-list"
					{...popperListProps}
				>
					<div tabIndex={0} ref={startSentinelRef} />
					<div ref={popperItemsRef} tabIndex={-1}>
						{popperListItems}
					</div>
					<div tabIndex={0} ref={endSentinelRef} />
				</PopperList>
			</Portal>
		</PopperDropdownWrapper>
	);
});

export { Dropdown, DropdownProps, DropdownItem };
