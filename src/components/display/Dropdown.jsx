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
	useContext
} from 'react';
import { createPopper } from '@popperjs/core';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { reduce } from 'lodash';
import Padding from '../layout/Padding';
import Icon from '../basic/Icon';
import Text from '../basic/Text';
import Container from '../layout/Container';
import Portal from '../utilities/Portal';
import Divider from '../layout/Divider';
import { useKeyboard, getKeyboardPreset } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { pseudoClasses } from '../utilities/functions';
import { Theme } from '../../theme/theme';
import { ThemeContext } from '../../theme/theme-context-provider';

const ContainerEl = styled(Container)`
	user-select: none;
	outline: none;
	${({ theme, disabled, selectedBackgroundColor }) =>
		!disabled &&
		pseudoClasses(theme, !selectedBackgroundColor ? 'gray5' : selectedBackgroundColor)};
`;

function ListItemContent({
	icon,
	label,
	selected,
	disabled,
	itemIconSize,
	itemTextSize,
	itemPaddingBetween
}) {
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
				color={disabled ? 'secondary' : 'text'}
			>
				{label}
			</Text>
		</>
	);
}

function PopperListItem({
	icon,
	label,
	click,
	selected,
	customComponent,
	disabled,
	selectedBackgroundColor,
	itemIconSize,
	itemTextSize,
	keepOpen,
	itemPaddingBetween,
	...rest
}) {
	const itemRef = useRef(undefined);

	const keyEvents = useMemo(() => getKeyboardPreset('listItem', click), [click]);
	useKeyboard(itemRef, keyEvents);
	const onClick = useCallback(
		(e) => {
			if (keepOpen) {
				e.stopPropagation();
			}
			if (!disabled) {
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
			tabIndex={disabled ? null : 0}
			disabled={disabled}
			selectedBackgroundColor={selected ? selectedBackgroundColor : undefined}
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

function NestListItem({
	icon,
	label,
	click,
	selected,
	open,
	customComponent: CustomComponent,
	disabled,
	items,
	selectedBackgroundColor,
	itemIconSize,
	itemTextSize,
	itemPaddingBetween,
	keepOpen,
	...rest
}) {
	const itemRef = useRef(undefined);

	const keyEvents = useMemo(() => getKeyboardPreset('listItem', click), [click]);
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
			onClick={disabled ? null : click}
			tabIndex={disabled ? null : 0}
			disabled={disabled}
			selectedBackgroundColor={selected ? selectedBackgroundColor : undefined}
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
					{CustomComponent ? (
						<CustomComponent items={{ ...rest }} />
					) : (
						<ListItemContent
							icon={icon}
							label={label}
							selected={selected}
							disabled={disabled}
							itemIconSize={itemIconSize}
							itemTextSize={itemTextSize}
							itemPaddingBetween={itemPaddingBetween}
							click={click}
						/>
					)}
					<Icon size={itemIconSize} icon="ChevronRight" style={{ alignSelf: 'flex-end' }} />
				</Container>
			</Dropdown>
		</ContainerEl>
	);
}

const PopperDropdownWrapper = styled.div`
	position: relative;
	display: ${({ display }) => display};
	width: ${({ display }) => (display === 'block' ? '100%' : 'auto')};
`;
const PopperList = styled.div`
	position: absolute;
	display: none;
	visibility: hidden;
	pointer-events: none;
	background-color: ${({ theme }) => theme.palette.gray5.regular};
	box-shadow: 0 0 4px 0 rgba(166, 166, 166, 0.5);
	z-index: 999;

	padding: ${({ theme }) => theme.sizes.padding.small} 0;
	max-width: ${({ width, maxWidth }) => (width === '100%' ? '100%' : maxWidth)};
	max-height: ${({ maxHeight }) => maxHeight};
	width: ${({ width, triggerRef }) =>
		width === '100%' && triggerRef.current ? `${triggerRef.current.clientWidth}px` : width};
	overflow-y: auto;

	&,
	> [tabindex='-1']:focus {
		outline: none;
	}

	${(props) =>
		props.open &&
		css`
			display: block;
			visibility: visible;
			pointer-events: auto;
		`};
`;

const Dropdown = React.forwardRef(function DropdownFn(
	{
		forceOpen,
		disabled,
		items,
		placement,
		display,
		width,
		maxWidth,
		maxHeight,
		handleTriggerEvents,
		disableRestoreFocus,
		disableAutoFocus,
		multiple,
		contextMenu,
		onOpen,
		onClose,
		children,
		disablePortal,
		preventDefault,
		selectedBackgroundColor,
		itemIconSize,
		itemTextSize,
		itemPaddingBetween,
		dropdownListRef,
		...rest
	},
	ref
) {
	const { windowObj } = useContext(ThemeContext);
	const [open, setOpen] = useState(forceOpen);
	const openRef = useRef(open);
	const dropdownRef = useCombinedRefs(dropdownListRef);
	const triggerRef = useRef(undefined);
	const popperItemsRef = useRef(undefined);
	const startSentinelRef = useRef(undefined);
	const endSentinelRef = useRef(undefined);
	const [position, setPosition] = useState(null);
	const [currentHover, setCurrentHover] = useState(null);
	useEffect(() => {
		setOpen(forceOpen);
	}, [forceOpen]);

	const openPopper = useCallback(() => {
		setOpen(true);
		onOpen && onOpen();
	}, [onOpen]);

	const closePopper = useCallback(
		(e) => {
			e && e.stopPropagation();
			setOpen(false);
			!disableRestoreFocus && triggerRef.current.focus();
			onClose && onClose();
		},
		[disableRestoreFocus, onClose]
	);

	const handleClick = useCallback(
		(e) => {
			if (!disabled && !openRef.current) {
				e.preventDefault();
				openPopper();
			}
		},
		[disabled, openPopper]
	);

	const handleRightClick = useCallback(
		(e) => {
			e.preventDefault();
			const virtualElement = {
				getBoundingClientRect: () => ({
					width: 0,
					height: 0,
					top: e.clientY,
					right: e.clientX,
					bottom: e.clientY,
					left: e.clientX
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
		(e) => {
			if (
				dropdownRef.current &&
				e.target !== dropdownRef.current &&
				!dropdownRef.current.contains(e.target) &&
				// check if the attribute is in the event path
				!reduce(
					e.path,
					(acc, el) => acc || (el.hasAttribute && el.hasAttribute('data-keep-open')),
					false
				)
			) {
				closePopper();
			}
		},
		[closePopper, dropdownRef]
	);

	const onStartSentinelFocus = useCallback(
		() => popperItemsRef.current.querySelector('div[tabindex]:last-child').focus(),
		[]
	);
	const onEndSentinelFocus = useCallback(
		() => popperItemsRef.current.querySelector('div[tabindex]:first-child').focus(),
		[]
	);

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
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const escapeEvent = useMemo(
		() => [{ type: 'keydown', callback: closePopper, keys: ['Escape'] }],
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[open, closePopper]
	);
	useKeyboard(dropdownRef, escapeEvent);

	useLayoutEffect(() => {
		if (open) {
			const popperOptions = {
				placement,
				modifiers: [
					{
						name: 'offset',
						options: {
							offset: () => [0, 4]
						}
					}
				]
			};

			const popperInstance = createPopper(
				contextMenu ? position : triggerRef.current,
				dropdownRef.current,
				popperOptions
			);

			return () => popperInstance.destroy();
		}
		return () => undefined;
	}, [open, placement, contextMenu, position, dropdownRef]);

	useEffect(() => {
		if (!disableAutoFocus) {
			open &&
				setTimeout(() => {
					const selectedItems = dropdownRef.current
						? dropdownRef.current.querySelectorAll('.zapp-selected')
						: [];
					selectedItems.length > 0
						? selectedItems[0].focus()
						: popperItemsRef.current &&
						  popperItemsRef.current.children[0] &&
						  popperItemsRef.current.children[0].focus();
				}, 1);
		}
	}, [disableAutoFocus, dropdownRef, open]);

	useEffect(() => {
		openRef.current = open;
		open &&
			setTimeout(() => windowObj.document.addEventListener('click', clickOutsidePopper, true), 1);
		contextMenu &&
			open &&
			setTimeout(
				() => windowObj.document.addEventListener('contextmenu', clickOutsidePopper, true),
				1
			);

		return () => {
			windowObj.document.removeEventListener('click', clickOutsidePopper, true);
			windowObj.document.removeEventListener('contextmenu', clickOutsidePopper, true);
		};
	}, [open, closePopper, clickOutsidePopper, contextMenu, windowObj.document]);

	useEffect(() => {
		if (open && !disableAutoFocus) {
			popperItemsRef.current.focus({ preventScroll: true });
			startSentinelRef.current.addEventListener('focus', onStartSentinelFocus);
			endSentinelRef.current.addEventListener('focus', onEndSentinelFocus);

			const startSentinelRefSave = startSentinelRef.current;
			const endSentinelRefSave = endSentinelRef.current;

			return () => {
				startSentinelRefSave &&
					startSentinelRefSave.removeEventListener('focus', onStartSentinelFocus);
				endSentinelRefSave && endSentinelRefSave.removeEventListener('focus', onEndSentinelFocus);
			};
		}
		return () => undefined;
	}, [
		open,
		startSentinelRef,
		endSentinelRef,
		onStartSentinelFocus,
		onEndSentinelFocus,
		disableAutoFocus
	]);
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
					// eslint-disable-next-line no-nested-ternary
					type === 'divider' ? (
						<Divider key={id ?? `divider-${index}`} />
					) : subItems ? (
						<NestListItem
							icon={icon}
							label={label}
							click={(e) => {
								click && click(e);
								!multiple && !keepOpen && closePopper();
							}}
							keepOpen={keepOpen}
							selected={selected}
							open={currentHover === id}
							key={id}
							customComponent={customComponent}
							disabled={itemDisabled}
							items={subItems}
							onMouseEnter={() => {
								setCurrentHover(id);
							}}
							selectedBackgroundColor={selectedBackgroundColor}
							itemIconSize={itemIconSize}
							itemTextSize={itemTextSize}
							itemPaddingBetween={itemPaddingBetween}
							{...itemProps}
						/>
					) : (
						<PopperListItem
							icon={icon}
							label={label}
							click={(e) => {
								click && click(e);
								!multiple && !keepOpen && closePopper();
							}}
							keepOpen={keepOpen}
							selected={selected}
							key={id}
							customComponent={customComponent}
							disabled={itemDisabled}
							onMouseEnter={() => {
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
			currentHover,
			selectedBackgroundColor,
			itemIconSize,
			itemTextSize,
			itemPaddingBetween,
			multiple,
			closePopper
		]
	);

	return (
		<PopperDropdownWrapper ref={ref} display={display} {...rest}>
			{contextMenu ? (
				<>
					{React.cloneElement(children, { ref: triggerRef, onContextMenu: handleRightClick })}
					<Portal show={open} disablePortal={disablePortal}>
						<PopperList
							ref={dropdownRef}
							open={open}
							width={width}
							maxWidth={maxWidth}
							maxHeight={maxHeight}
							triggerRef={triggerRef}
							onContextMenu={(ev) => preventDefault && ev.preventDefault()}
						>
							<div tabIndex={0} ref={startSentinelRef} />
							<div ref={popperItemsRef} tabIndex={-1}>
								{popperListItems}
							</div>
							<div tabIndex={0} ref={endSentinelRef} />
						</PopperList>
					</Portal>
				</>
			) : (
				<>
					{React.cloneElement(children, {
						ref: triggerRef,
						onClick: (e) => {
							children.props.onClick && children.props.onClick(e);
							handleClick(e);
						}
					})}
					<Portal show={open} disablePortal={disablePortal}>
						<PopperList
							ref={dropdownRef}
							open={open}
							width={width}
							maxWidth={maxWidth}
							maxHeight={maxHeight}
							triggerRef={triggerRef}
							onClick={(ev) => preventDefault && ev.preventDefault()}
						>
							<div tabIndex={0} ref={startSentinelRef} />
							<div ref={popperItemsRef} tabIndex={-1}>
								{popperListItems}
							</div>
							<div tabIndex={0} ref={endSentinelRef} />
						</PopperList>
					</Portal>
				</>
			)}
		</PopperDropdownWrapper>
	);
});

Dropdown.propTypes = {
	/** Whether to disable the Dropdown or not */
	disabled: PropTypes.bool,
	/** Array of items to display */
	items: PropTypes.arrayOf(
		PropTypes.shape({
			type: PropTypes.string,
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			icon: PropTypes.string,
			click: PropTypes.func,
			selected: PropTypes.bool,
			customComponent: PropTypes.node,
			disabled: PropTypes.bool,
			keepOpen: PropTypes.bool
		})
	).isRequired,
	/** Css display property */
	display: PropTypes.oneOf(['block', 'inline-block']),
	/** Dropdown width type */
	width: PropTypes.string,
	/** Css max-width property */
	maxWidth: PropTypes.string,
	/** Css max-height property */
	maxHeight: PropTypes.string,
	/** whether or not to manage the keyboard events for dropdown trigger */
	handleTriggerEvents: PropTypes.bool,
	/** whether or not to disable the re-focus of Dropdown's trigger */
	disableRestoreFocus: PropTypes.bool,
	/** whether or not to focus the Dropdown's first item on open */
	disableAutoFocus: PropTypes.bool,
	/** whether or not to user can select multiple items of dropdown aka do not close popover on item click */
	multiple: PropTypes.bool,
	/** Open dropdown on right click at cursor position */
	contextMenu: PropTypes.bool,
	/** Callback for opened Dropdown */
	onOpen: PropTypes.func,
	/** Callback for closed Dropdown */
	onClose: PropTypes.func,
	/** Only one component can be passed as children */
	children: PropTypes.element.isRequired,
	/** Placement of the dropdown */
	placement: PropTypes.oneOf([
		'auto',
		'auto-start',
		'auto-end',
		'top',
		'top-start',
		'top-end',
		'bottom',
		'bottom-start',
		'bottom-end',
		'right',
		'right-start',
		'right-end',
		'left',
		'left-start',
		'left-end'
	]),
	/** Flag to disable the Portal implementation */
	disablePortal: PropTypes.bool,
	/** Whether the Component is visible or not */
	forceOpen: PropTypes.bool,
	/** Whether or not to preventDefault on Dropdown click */
	preventDefault: PropTypes.bool,
	/** Customize selected background color */
	selectedBackgroundColor: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.palette))
	]),
	/** Item Icon size */
	itemIconSize: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.sizes.icon))
	]),
	/** Item Text size */
	itemTextSize: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.sizes.font))
	]),
	/** Item Padding Between */
	itemPaddingBetween: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.sizes.padding))
	]),
	/** Ref assign to the dropdown list popper container */
	dropdownListRef: PropTypes.object
};

Dropdown.defaultProps = {
	disabled: false,
	placement: 'bottom-start',
	display: 'inline-block',
	width: 'auto',
	maxWidth: '300px',
	maxHeight: '50vh',
	handleTriggerEvents: false,
	disableRestoreFocus: false,
	disableAutoFocus: false,
	multiple: false,
	contextMenu: false,
	disablePortal: false,
	onOpen: undefined,
	onClose: () => undefined,
	forceOpen: false,
	preventDefault: true,
	itemIconSize: 'medium',
	itemTextSize: 'medium',
	itemPaddingBetween: 'small'
};

export default Dropdown;
