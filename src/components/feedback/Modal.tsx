/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, {
	HTMLAttributes,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';

import { noop } from 'lodash';
import { DefaultTheme, ThemeContext } from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { Divider } from '../layout/Divider';
import { Portal } from '../utilities/Portal';
import { Transition } from '../utilities/Transition';
import { ModalBody } from './modal-components/ModalBody';
import {
	getScrollbarSize,
	isBodyOverflowing,
	ModalContainer,
	ModalContent,
	ModalWrapper
} from './modal-components/ModalComponents';
import { ModalFooter, ModalFooterProps } from './modal-components/ModalFooter';
import { ModalHeader } from './modal-components/ModalHeader';

function copyToClipboard(node: HTMLDivElement | null, windowObj: Window): void {
	const el = windowObj.document.createElement('textarea');
	if (el && node?.textContent) {
		el.value = node.textContent;
		windowObj.document.body.appendChild(el);
		el.select();
		windowObj.document.execCommand('copy');
		windowObj.document.body.removeChild(el);
	}
}

type ModalProps = Omit<ModalFooterProps, 'errorActionLabel' | 'onErrorAction'> & {
	/** Modal background */
	background?: string | keyof DefaultTheme['palette'];
	/** Modal title */
	title?: string | React.ReactElement;
	/** Modal size */
	size?: 'extrasmall' | 'small' | 'medium' | 'large';
	/** Boolean to show the modal */
	open?: boolean;
	/** Hide the footer completely */
	hideFooter?: boolean;
	/** Show icon to close Modal */
	showCloseIcon?: boolean;
	/** Css property to handle the stack order of multiple modals */
	zIndex?: number;
	/** min height of the modal */
	minHeight?: string;
	/** max height of the modal */
	maxHeight?: string;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Content of the modal */
	children?: React.ReactNode | React.ReactNode[];
	/**
	 * The window where to insert the Portal's children.
	 * The default value is 'windowObj' obtained from the ThemContext.
	 * */
	containerWindow?: Window;
	/** Label for copy button in the Error Modal */
	copyLabel?: ModalFooterProps['errorActionLabel'];
	/** Close icon tooltip label */
	closeIconTooltip?: string;
} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function ModalFn(
	{
		background = 'gray6',
		type = 'default',
		title: Title,
		size = 'small',
		open = false,
		centered = false,
		onConfirm,
		confirmLabel = 'OK',
		confirmColor = 'primary',
		onSecondaryAction,
		secondaryActionLabel,
		onClose = noop,
		dismissLabel,
		copyLabel = 'Copy',
		optionalFooter,
		customFooter,
		hideFooter = false,
		showCloseIcon = true,
		minHeight,
		maxHeight,
		children,
		containerWindow,
		disablePortal = false,
		zIndex = 999,
		onClick,
		closeIconTooltip,
		...rest
	},
	ref
) {
	const [delayedOpen, setDelayedOpen] = useState(false);
	const { windowObj: themeWindowObj } = useContext(ThemeContext);
	const windowObj = containerWindow ?? themeWindowObj;

	const innerRef = useRef<HTMLDivElement | null>(null);
	const modalRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const modalBodyRef = useRef<HTMLDivElement | null>(null);
	const startSentinelRef = useRef<HTMLDivElement | null>(null);
	const endSentinelRef = useRef<HTMLDivElement | null>(null);

	const onBackdropClick = useCallback(
		(e: Event | React.SyntheticEvent) => {
			if (e) {
				e.stopPropagation();
			}
			if (
				!e.defaultPrevented &&
				modalContentRef.current &&
				e.target instanceof Node &&
				!modalContentRef.current.contains(e.target) &&
				onClose
			) {
				onClose(e);
			}
		},
		[onClose]
	);
	const onCopyClipboard = useCallback(
		() => copyToClipboard(modalBodyRef.current, windowObj),
		[windowObj]
	);

	const onStartSentinelFocus = useCallback(() => {
		if (modalContentRef.current) {
			const nodeList = modalContentRef.current.querySelectorAll<HTMLElement>('[tabindex]');
			nodeList[nodeList.length - 1].focus();
		}
	}, []);
	const onEndSentinelFocus = useCallback(() => {
		if (modalContentRef.current != null) {
			modalContentRef.current.querySelector<HTMLElement>('[tabindex]')?.focus();
		}
	}, []);

	const escapeEvent = useMemo<KeyboardPreset>(
		() => [{ type: 'keydown', callback: onClose || noop, keys: ['Escape'], modifier: false }],
		[onClose]
	);
	useKeyboard(modalRef, escapeEvent);

	useEffect(() => {
		if (open) {
			const defaultOverflowY = windowObj.document.body.style.overflowY;
			const defaultPaddingRight = windowObj.document.body.style.paddingRight;

			windowObj.document.body.style.overflowY = 'hidden';
			modalRef.current != null &&
				isBodyOverflowing(modalRef, windowObj) &&
				(windowObj.document.body.style.paddingRight = `${getScrollbarSize(windowObj)}px`);

			return (): void => {
				windowObj.document.body.style.overflowY = defaultOverflowY;
				windowObj.document.body.style.paddingRight = defaultPaddingRight;
			};
		}
		return (): void => undefined;
	}, [modalRef, open, windowObj]);

	useEffect(() => {
		const focusedElement = windowObj.document.activeElement;

		if (open) {
			modalContentRef.current?.focus();
			startSentinelRef.current?.addEventListener('focus', onStartSentinelFocus);
			endSentinelRef.current?.addEventListener('focus', onEndSentinelFocus);
		}
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;
		return (): void => {
			startSentinelRefSave &&
				startSentinelRefSave.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.removeEventListener('focus', onEndSentinelFocus);
			open && focusedElement && (focusedElement as HTMLElement).focus();
		};
	}, [open, onStartSentinelFocus, onEndSentinelFocus, windowObj]);

	useEffect(() => {
		const timeout = setTimeout(() => setDelayedOpen(open), 1);

		return (): void => {
			clearTimeout(timeout);
		};
	}, [open]);

	return (
		<Portal show={open} disablePortal={disablePortal} container={windowObj.document.body}>
			<ModalContainer
				ref={modalRef}
				open={delayedOpen}
				mounted={open}
				onClick={onBackdropClick}
				zIndex={zIndex}
				data-testid="modal"
				{...rest}
			>
				<div tabIndex={0} ref={startSentinelRef} />
				<Transition type="scale-in" apply={delayedOpen}>
					<ModalWrapper>
						<ModalContent
							ref={modalContentRef}
							background={background}
							$size={size}
							minHeight={minHeight}
							maxHeight={maxHeight}
							onClick={onClick}
						>
							<ModalHeader
								centered={centered}
								type={type}
								title={Title}
								showCloseIcon={showCloseIcon}
								onClose={onClose}
								closeIconTooltip={closeIconTooltip}
							/>
							<Divider />
							<ModalBody centered={centered} ref={modalBodyRef}>
								{children}
							</ModalBody>
							{!hideFooter && (
								<>
									<Divider />
									<ModalFooter
										centered={centered}
										customFooter={customFooter}
										type={type}
										optionalFooter={optionalFooter}
										confirmLabel={confirmLabel}
										confirmColor={confirmColor}
										dismissLabel={dismissLabel}
										onConfirm={onConfirm}
										onClose={onClose}
										onSecondaryAction={onSecondaryAction}
										secondaryActionLabel={secondaryActionLabel}
										onErrorAction={onCopyClipboard}
										errorActionLabel={copyLabel}
									/>
								</>
							)}
						</ModalContent>
					</ModalWrapper>
				</Transition>
				<div tabIndex={0} ref={endSentinelRef} />
			</ModalContainer>
		</Portal>
	);
});

export { Modal, ModalProps };
