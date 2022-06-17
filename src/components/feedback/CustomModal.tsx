/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {
	useState,
	useEffect,
	useMemo,
	useCallback,
	useRef,
	useContext,
	HTMLAttributes
} from 'react';
import { Portal } from '../utilities/Portal';
import { Transition } from '../utilities/Transition';
import { KeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { ModalProps } from './Modal';
import {
	getScrollbarSize,
	isBodyOverflowing,
	ModalContainer,
	ModalContent,
	ModalWrapper
} from './ModalComponents';
import { ThemeContext } from '../../theme/theme-context-provider';

type CustomModalProps = Pick<
	ModalProps,
	'background' | 'size' | 'open' | 'onClose' | 'zIndex' | 'maxHeight' | 'disablePortal' | 'children'
> &
	Omit<HTMLAttributes<HTMLDivElement>, keyof ModalProps>;

const CustomModal = React.forwardRef<HTMLDivElement, CustomModalProps>(function ModalFn(
	{
		background = 'gray6',
		size = 'small',
		open = false,
		onClose,
		children,
		disablePortal = false,
		maxHeight = '60vh',
		zIndex = 999,
		...rest
	},
	ref
) {
	const [delayedOpen, setDelayedOpen] = useState(false);
	const { windowObj } = useContext(ThemeContext);

	const modalRef = useCombinedRefs<HTMLDivElement>(ref);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const startSentinelRef = useRef<HTMLDivElement>(null);
	const endSentinelRef = useRef<HTMLDivElement>(null);

	const onBackdropClick = useCallback(
		(e: KeyboardEvent | React.MouseEvent) => {
			if (e) {
				e.stopPropagation();
			}
			modalContentRef.current &&
				onClose &&
				!modalContentRef.current.contains(e.target as Node | null) &&
				onClose(e);
		},
		[onClose]
	);

	const onStartSentinelFocus = useCallback(() => {
		if (modalContentRef.current) {
			const nodeList = modalContentRef.current.querySelectorAll<HTMLElement>('[tabindex]');
			nodeList[nodeList.length - 1].focus();
		}
	}, []);

	const onEndSentinelFocus = useCallback(() => {
		if (modalContentRef.current) {
			const nodeEl = modalContentRef.current.querySelector<HTMLElement>('[tabindex]');
			nodeEl && nodeEl.focus();
		}
	}, []);

	const escapeEvent = useMemo<KeyboardPreset>(
		() => (onClose && [{ type: 'keydown', callback: onClose, keys: ['Escape'] }]) || [],
		[onClose]
	);
	useKeyboard(modalRef, escapeEvent);

	useEffect(() => {
		if (open) {
			const defaultOverflowY = windowObj.document.body.style.overflowY;
			const defaultPaddingRight = windowObj.document.body.style.paddingRight;

			windowObj.document.body.style.overflowY = 'hidden';
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
		const focusedElement = windowObj.document.activeElement as HTMLElement;
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;

		if (open) {
			modalContentRef.current && modalContentRef.current.focus();
			startSentinelRefSave && startSentinelRefSave.addEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.addEventListener('focus', onEndSentinelFocus);
		}

		return (): void => {
			startSentinelRefSave &&
				startSentinelRefSave.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.removeEventListener('focus', onEndSentinelFocus);
			open && focusedElement && focusedElement.focus();
		};
	}, [open, onStartSentinelFocus, onEndSentinelFocus, windowObj.document.activeElement]);

	useEffect(() => {
		setTimeout(() => setDelayedOpen(open), 1);
	}, [open]);

	const modalWrapperClickHandler = useCallback<React.MouseEventHandler>((e) => {
		if (e) {
			e.stopPropagation();
		}
	}, []);

	return (
		<Portal show={open} disablePortal={disablePortal}>
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
					<ModalWrapper onClick={modalWrapperClickHandler}>
						<ModalContent
							ref={modalContentRef}
							background={background}
							tabIndex={-1}
							$size={size}
							crossAlignment="flex-start"
							height="auto"
							maxHeight={maxHeight}
						>
							{children}
						</ModalContent>
					</ModalWrapper>
				</Transition>
				<div tabIndex={0} ref={endSentinelRef} />
			</ModalContainer>
		</Portal>
	);
});

export { CustomModal, CustomModalProps };
