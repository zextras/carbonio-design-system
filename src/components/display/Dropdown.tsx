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
	HTMLAttributes
} from 'react';

import {
	createPopper,
	Instance,
	OptionsGeneric,
	StrictModifiers,
	VirtualElement
} from '@popperjs/core';
import { find, first, some } from 'lodash';
import styled, { css, DefaultTheme, SimpleInterpolation, ThemeContext } from 'styled-components';

import { Tooltip } from './Tooltip';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useKeyboard, getKeyboardPreset, KeyboardPreset } from '../../hooks/useKeyboard';
import { pseudoClasses } from '../../theme/theme-utils';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { TIMERS } from '../constants';
import { Container } from '../layout/Container';
import { Divider } from '../layout/Divider';
import { Padding } from '../layout/Padding';
import { Portal } from '../utilities/Portal';

const ContainerEl = styled(Container)<{
	$selectedBackgroundColor?: keyof DefaultTheme['palette'];
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
	itemPaddingBetween: keyof DefaultTheme['sizes']['padding'];
	tooltipLabel?: string;
}

function ListItemContent({
	icon,
	label,
	selected,
	disabled,
	itemIconSize,
	itemTextSize,
	itemPaddingBetween,
	tooltipLabel
}: ListItemContentProps): React.JSX.Element {
	return (
		<Tooltip disabled={!disabled || !tooltipLabel} label={tooltipLabel} placement="bottom-end">
			<Container orientation="horizontal" mainAlignment="flex-start">
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
			</Container>
		</Tooltip>
	);
}

interface PopperListItemProps extends ListItemContentProps, HTMLAttributes<HTMLDivElement> {
	onClick?: (e: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => void;
	customComponent?: React.ReactNode;
	selectedBackgroundColor?: keyof DefaultTheme['palette'];
	keepOpen?: boolean;
}

function PopperListItem({
	icon,
	label,
	onClick,
	selected,
	customComponent,
	disabled = false,
	selectedBackgroundColor,
	itemIconSize,
	itemTextSize,
	keepOpen,
	itemPaddingBetween,
	tooltipLabel,
	...rest
}: PopperListItemProps): React.JSX.Element {
	const itemRef = useRef<HTMLDivElement | null>(null);

	const keyEvents = useMemo(
		() => (onClick && getKeyboardPreset('listItem', onClick)) || [],
		[onClick]
	);
	useKeyboard(itemRef, keyEvents);

	const onClickHandler = useCallback<React.MouseEventHandler<HTMLElement>>(
		(e) => {
			if (keepOpen) {
				e.stopPropagation();
			}
			if (!disabled && onClick) {
				onClick(e);
			}
		},
		[onClick, disabled, keepOpen]
	);

	return (
		<ContainerEl
			ref={itemRef}
			data-keep-open={keepOpen}
			className={selected ? 'zapp-selected' : ''}
			orientation="horizontal"
			mainAlignment="flex-start"
			padding={{ vertical: 'small', horizontal: 'large' }}
			style={{ cursor: onClick && !disabled ? 'pointer' : 'default' }}
			onClick={onClickHandler}
			tabIndex={disabled ? -1 : 0}
			$disabled={disabled}
			$selectedBackgroundColor={selected ? selectedBackgroundColor : undefined}
			background={selected && selectedBackgroundColor ? selectedBackgroundColor : undefined}
			data-testid={'dropdown-item'}
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
					tooltipLabel={tooltipLabel}
				/>
			)}
		</ContainerEl>
	);
}

interface NestListItemProps
	extends PopperListItemProps,
		Pick<DropdownProps, 'onOpen' | 'onClose' | 'dropdownListRef' | 'items'> {}

function NestListItem({
	icon,
	label,
	onClick,
	selected,
	customComponent,
	disabled = false,
	items,
	selectedBackgroundColor,
	itemIconSize,
	itemTextSize,
	itemPaddingBetween,
	keepOpen,
	dropdownListRef = null,
	tooltipLabel,
	onOpen,
	onClose,
	...rest
}: NestListItemProps): React.JSX.Element {
	const [open, setOpen] = useState(false);
	const itemRef = useRef<HTMLDivElement | null>(null);
	const innerDropdownListRef = useCombinedRefs(dropdownListRef);
	const closeNestedDropdownTimeoutRef = useRef<NodeJS.Timeout>();

	useEffect(
		() => () => {
			if (closeNestedDropdownTimeoutRef.current !== undefined) {
				clearTimeout(closeNestedDropdownTimeoutRef.current);
			}
		},
		[]
	);
	const openNestedDropdown = useCallback(() => {
		if (closeNestedDropdownTimeoutRef.current !== undefined) {
			clearTimeout(closeNestedDropdownTimeoutRef.current);
			closeNestedDropdownTimeoutRef.current = undefined;
		}
		setOpen(true);
		onOpen?.();
	}, [onOpen]);

	const closeNestedDropdown = useCallback(() => {
		if (closeNestedDropdownTimeoutRef.current !== undefined) {
			clearTimeout(closeNestedDropdownTimeoutRef.current);
			closeNestedDropdownTimeoutRef.current = undefined;
		}
		setOpen(false);
		onClose?.();
		itemRef.current?.focus({ preventScroll: true });
	}, [onClose]);

	const itemKeyEvents = useMemo((): KeyboardPreset => {
		const presets: KeyboardPreset = [
			{ type: 'keydown', callback: openNestedDropdown, keys: ['ArrowRight'] }
		];
		if (onClick) {
			presets.push(...getKeyboardPreset('listItem', onClick));
		}
		return presets;
	}, [onClick, openNestedDropdown]);

	useKeyboard(itemRef, itemKeyEvents);

	const dropdownKeyEvents = useMemo(
		(): KeyboardPreset => [
			{ type: 'keydown', callback: closeNestedDropdown, keys: ['Escape'] },
			{ type: 'keydown', callback: closeNestedDropdown, keys: ['ArrowLeft'] }
		],
		[closeNestedDropdown]
	);

	const [registerNestedListener, setRegisterNestedListener] = useState(open);
	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (open) {
			timeout = setTimeout(() => {
				setRegisterNestedListener(true);
			}, TIMERS.DROPDOWN.IS_OPEN);
		}

		return (): void => {
			setRegisterNestedListener(false);
			if (timeout) {
				clearTimeout(timeout);
			}
		};
	}, [open]);

	useKeyboard(innerDropdownListRef, dropdownKeyEvents, registerNestedListener);

	const closeOnMouseLeave = useCallback(
		(event: Event) => {
			if (event.target instanceof Node) {
				const eventIsOnTrigger = itemRef.current?.contains(event.target);
				const eventIsOnDropdown = innerDropdownListRef.current?.contains(event.target);
				if (!eventIsOnDropdown && !eventIsOnTrigger) {
					if (closeNestedDropdownTimeoutRef.current === undefined) {
						closeNestedDropdownTimeoutRef.current = setTimeout(() => {
							closeNestedDropdown();
						}, TIMERS.DROPDOWN.CLOSE_NESTED);
					}
				} else if (closeNestedDropdownTimeoutRef.current !== undefined) {
					clearTimeout(closeNestedDropdownTimeoutRef.current);
					closeNestedDropdownTimeoutRef.current = undefined;
				}
			}
		},
		[closeNestedDropdown, innerDropdownListRef]
	);

	useEffect(() => {
		if (open) {
			window.addEventListener('mouseover', closeOnMouseLeave);
		}
		return (): void => {
			window.removeEventListener('mouseover', closeOnMouseLeave);
		};
	}, [closeOnMouseLeave, open]);

	return (
		<ContainerEl
			data-keep-open={keepOpen}
			ref={itemRef}
			className={selected ? 'zapp-selected' : ''}
			orientation="horizontal"
			mainAlignment="flex-start"
			style={{ cursor: onClick && !disabled ? 'pointer' : 'default' }}
			onClick={disabled ? undefined : onClick}
			tabIndex={disabled ? undefined : 0}
			$disabled={disabled}
			$selectedBackgroundColor={selected ? selectedBackgroundColor : undefined}
			data-testid={'dropdown-item'}
			onMouseEnter={openNestedDropdown}
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
				dropdownListRef={innerDropdownListRef}
			>
				<Container
					orientation="horizontal"
					mainAlignment="space-between"
					padding={{ vertical: 'small', horizontal: 'large' }}
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
							tooltipLabel={tooltipLabel}
						/>
					)}
					<Icon size={itemIconSize} icon="ChevronRight" />
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
	box-shadow: 0 0 0.25rem 0 ${({ theme }): string => theme.palette.shadow.regular};
	z-index: 999;

	max-width: ${({ width, maxWidth }): string => (width === '100%' ? '100%' : maxWidth)};
	max-height: ${({ maxHeight }): string => maxHeight};
	width: ${({ width, triggerRef }): string =>
		width === '100%' && triggerRef.current ? `${triggerRef.current.clientWidth}px` : width};
	overflow-y: auto;

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
	onClick?: (e: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => void;
	selected?: boolean;
	customComponent?: React.ReactNode;
	disabled?: boolean;
	items?: Array<DropdownItem>;
	keepOpen?: boolean;
	tooltipLabel?: string | undefined;
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
	/** trigger ref that can be used instead of lost children ref caused by cloneElement */
	triggerRef?: React.Ref<HTMLElement> | null;
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
	selectedBackgroundColor?: keyof DefaultTheme['palette'];
	/** Item Icon size */
	itemIconSize?: React.ComponentPropsWithRef<typeof Icon>['size'];
	/** Item Text size */
	itemTextSize?: React.ComponentPropsWithRef<typeof Text>['size'];
	/** Item Padding Between */
	itemPaddingBetween?: keyof DefaultTheme['sizes']['padding'];
	/** Ref assign to the dropdown list popper container */
	dropdownListRef?: React.RefObject<HTMLDivElement> | null;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(function DropdownFn(
	{
		forceOpen = false,
		disabled = false,
		items,
		placement = 'bottom-start',
		display = 'inline-block',
		width = 'auto',
		maxWidth = '18.75rem',
		maxHeight = '50vh',
		handleTriggerEvents = false,
		disableRestoreFocus = false,
		disableAutoFocus = false,
		multiple = false,
		contextMenu = false,
		onOpen,
		onClose,
		children,
		triggerRef = null,
		disablePortal = false,
		preventDefault = true,
		selectedBackgroundColor,
		itemIconSize = 'medium',
		itemTextSize = 'medium',
		itemPaddingBetween = 'small',
		dropdownListRef = null,
		...rest
	},
	ref
) {
	const { windowObj } = useContext(ThemeContext);
	const [open, setOpen] = useState<boolean>(forceOpen);
	const openRef = useRef<boolean>(open);
	const dropdownRef = useCombinedRefs<HTMLDivElement>(dropdownListRef);
	const innerTriggerRef = useCombinedRefs(triggerRef);
	const popperItemsRef = useRef<HTMLDivElement | null>(null);
	const startSentinelRef = useRef<HTMLDivElement | null>(null);
	const endSentinelRef = useRef<HTMLDivElement | null>(null);
	const [position, setPosition] = useState<VirtualElement | null>(null);
	const nestedDropdownsRef = useRef<React.RefObject<HTMLDivElement>[]>([]);

	useEffect(() => {
		setOpen(forceOpen);
		openRef.current = forceOpen;
	}, [forceOpen]);

	const openPopper = useCallback(() => {
		setOpen(true);
		openRef.current = true;
		onOpen && onOpen();
	}, [onOpen]);

	const closePopper = useCallback(
		(e?: React.SyntheticEvent | KeyboardEvent) => {
			e?.stopPropagation();
			setOpen(forceOpen);
			openRef.current = forceOpen;
			!disableRestoreFocus && innerTriggerRef.current?.focus();
			onClose?.();
		},
		[disableRestoreFocus, forceOpen, innerTriggerRef, onClose]
	);

	const handleClick = useCallback<(e: React.SyntheticEvent | KeyboardEvent) => void>(
		(e) => {
			if (openRef.current) {
				e.preventDefault();
				closePopper();
			} else if (!disabled) {
				e.preventDefault();
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
					toJSON: (): string => ''
				})
			};
			setPosition(virtualElement);
			if (!disabled && !openRef.current) {
				openPopper();
			}
		},
		[disabled, openPopper]
	);

	const clickOutsidePopper = useCallback(
		(e: Event) => {
			const clickedOnDropdown =
				dropdownRef.current &&
				(e.target === dropdownRef.current || dropdownRef.current.contains(e.target as Node | null));
			const clickedOnTrigger =
				!contextMenu &&
				innerTriggerRef.current &&
				(e.target === innerTriggerRef.current ||
					innerTriggerRef.current?.contains(e.target as Node | null));
			const clickedOnNestedItem =
				nestedDropdownsRef.current &&
				some(
					nestedDropdownsRef.current,
					(nestedItemRef) =>
						nestedItemRef.current && nestedItemRef.current.contains(e.target as Node | null)
				);
			if (
				!clickedOnDropdown &&
				!clickedOnTrigger &&
				!clickedOnNestedItem &&
				// check if the attribute is in the event path
				!find(
					e.composedPath?.() ?? [],
					(el) => (el as Element).hasAttribute && (el as Element).hasAttribute('data-keep-open')
				)
			) {
				closePopper();
			}
		},
		[closePopper, contextMenu, dropdownRef, innerTriggerRef]
	);

	const onStartSentinelFocus = useCallback(() => {
		const lastChild = popperItemsRef.current?.querySelector<HTMLElement>('[tabindex]:last-child');
		lastChild?.focus();
	}, []);
	const onEndSentinelFocus = useCallback(() => {
		const firstChild = popperItemsRef.current?.querySelector<HTMLElement>('[tabindex]:first-child');
		firstChild?.focus();
	}, []);

	const triggerEvents = useMemo(
		() => (handleTriggerEvents ? getKeyboardPreset('button', handleClick) : []),
		[handleClick, handleTriggerEvents]
	);
	useKeyboard(innerTriggerRef, triggerEvents);

	const listEvents = useMemo(
		() => getKeyboardPreset('list', undefined, popperItemsRef),
		[popperItemsRef]
	);

	useKeyboard(popperItemsRef, listEvents, open);

	const escapeEvent = useMemo<KeyboardPreset>(
		() => [
			{
				type: 'keydown',
				callback: closePopper,
				keys: ['Escape'],
				modifier: false
			}
		],
		[closePopper]
	);
	useKeyboard(dropdownRef, escapeEvent, open);

	useLayoutEffect(() => {
		let popperInstance: Instance | undefined;
		if (open) {
			const popperOptions: OptionsGeneric<StrictModifiers> = {
				placement,
				modifiers: [],
				strategy: 'fixed'
			};

			const popperReference = contextMenu ? position : innerTriggerRef.current;
			if (popperReference && dropdownRef.current) {
				popperInstance = createPopper<StrictModifiers>(
					popperReference,
					dropdownRef.current,
					popperOptions
				);
			}
		}
		return (): void => popperInstance && popperInstance.destroy();
	}, [open, placement, contextMenu, position, dropdownRef, innerTriggerRef]);

	useEffect(() => {
		let timeout: ReturnType<typeof setTimeout>;
		if (!disableAutoFocus && open) {
			timeout = setTimeout(() => {
				const selectedItems = dropdownRef.current?.querySelectorAll<HTMLElement>('.zapp-selected');
				if (selectedItems && selectedItems.length > 0) {
					selectedItems[0].focus();
				} else {
					const firstElement = first(popperItemsRef.current?.children);
					if (firstElement instanceof HTMLElement) {
						firstElement.focus();
					}
				}
			}, TIMERS.DROPDOWN.IS_OPEN);
		}
		return (): void => {
			timeout && clearTimeout(timeout);
		};
	}, [disableAutoFocus, dropdownRef, open]);

	useEffect(() => {
		if (open) {
			windowObj.document.addEventListener('click', clickOutsidePopper, true);
			contextMenu && windowObj.document.addEventListener('contextmenu', clickOutsidePopper, true);
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
			popperItemRefElement?.focus({ preventScroll: true });
			startSentinelRefElement?.addEventListener('focus', onStartSentinelFocus);
			endSentinelRefElement?.addEventListener('focus', onEndSentinelFocus);
		}
		return (): void => {
			startSentinelRefElement?.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefElement?.removeEventListener('focus', onEndSentinelFocus);
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
			onClick?: PopperListItemProps['onClick'],
			keepOpen?: boolean
		) => (event: React.SyntheticEvent<HTMLElement> | KeyboardEvent) => void
	>(
		(onClick, keepOpen) =>
			(event): void => {
				onClick?.(event);
				if (!multiple && !keepOpen) {
					closePopper();
				}
			},
		[closePopper, multiple]
	);

	const popperListItems = useMemo(() => {
		nestedDropdownsRef.current = [];
		if (items) {
			return items.map(
				(
					{
						id,
						icon,
						label,
						onClick,
						selected,
						customComponent,
						items: subItems,
						disabled: itemDisabled,
						type,
						keepOpen,
						...itemProps
					},
					index
				) => {
					const nestedRef = React.createRef<HTMLDivElement>();
					nestedDropdownsRef.current.push(nestedRef);
					return (
						(type === 'divider' && <Divider key={id ?? `divider-${index}`} />) ||
						(subItems && (
							<NestListItem
								icon={icon}
								label={label}
								onClick={listItemClickHandler(onClick, keepOpen)}
								keepOpen={keepOpen}
								selected={selected}
								key={id}
								customComponent={customComponent}
								disabled={itemDisabled}
								items={subItems}
								selectedBackgroundColor={selectedBackgroundColor}
								itemIconSize={itemIconSize}
								itemTextSize={itemTextSize}
								itemPaddingBetween={itemPaddingBetween}
								dropdownListRef={nestedRef}
								{...itemProps}
							/>
						)) || (
							<PopperListItem
								icon={icon}
								label={label}
								onClick={listItemClickHandler(onClick, keepOpen)}
								keepOpen={keepOpen}
								selected={selected}
								key={id}
								customComponent={customComponent}
								disabled={itemDisabled}
								selectedBackgroundColor={selectedBackgroundColor}
								itemIconSize={itemIconSize}
								itemTextSize={itemTextSize}
								itemPaddingBetween={itemPaddingBetween}
								{...itemProps}
							/>
						)
					);
				}
			);
		}
		return null;
	}, [
		items,
		listItemClickHandler,
		selectedBackgroundColor,
		itemIconSize,
		itemTextSize,
		itemPaddingBetween
	]);

	const popperListPreventDefaultHandler = useCallback<React.MouseEventHandler>(
		(event) => {
			preventDefault && event.preventDefault();
		},
		[preventDefault]
	);

	const triggerComponent = useMemo(() => {
		const props = contextMenu ? { onContextMenu: handleRightClick } : { onClick: handleLeftClick };
		return React.cloneElement(children, { ref: innerTriggerRef, ...props });
	}, [children, innerTriggerRef, contextMenu, handleLeftClick, handleRightClick]);

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
					triggerRef={innerTriggerRef}
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
