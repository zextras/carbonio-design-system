/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useEffect, useMemo, useCallback, useRef, HTMLAttributes, useState } from 'react';

import { useTheme } from 'styled-components';

import {
	getScrollbarSize,
	isBodyOverflowing,
	ModalContainer,
	ModalContent,
	ModalWrapper
} from './modal-components/ModalComponents';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPresetObj, useKeyboard } from '../../hooks/useKeyboard';
import { AnyColor } from '../../types/utils';
import { TIMERS } from '../constants';
import { Portal } from '../utilities/Portal';
import { Transition } from '../utilities/Transition';

type BareModalProps = {
	/** Modal background */
	background?: AnyColor;
	/** Modal size */
	size?: 'extrasmall' | 'small' | 'medium' | 'large';
	/** Boolean to show the modal */
	open?: boolean;
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
	/** Callback to close the Modal */
	onClose?: (event: React.MouseEvent | KeyboardEvent) => void;
	/**
	 * The window where to insert the Portal's children.
	 * The default value is 'windowObj' obtained from the ThemContext.
	 * */
	containerWindow?: Window;
};

type CustomModalProps = BareModalProps &
	Omit<HTMLAttributes<HTMLDivElement>, keyof BareModalProps | 'title'>;

const CustomModal = React.forwardRef<HTMLDivElement, CustomModalProps>(function ModalFn(
	{
		background = 'gray6',
		size = 'small',
		open = false,
		onClose,
		children,
		disablePortal = false,
		minHeight,
		maxHeight,
		zIndex = 999,
		onClick,
		containerWindow,
		...rest
	},
	ref
) {
	const [delayedOpen, setDelayedOpen] = useState(false);
	const { windowObj: themeWindowObj } = useTheme();
	const windowObj = containerWindow ?? themeWindowObj;

	const modalRef = useCombinedRefs<HTMLDivElement>(ref);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const startSentinelRef = useRef<HTMLDivElement>(null);
	const endSentinelRef = useRef<HTMLDivElement>(null);

	const onBackdropClick = useCallback(
		(e: KeyboardEvent | React.MouseEvent<HTMLDivElement>) => {
			if (e) {
				e.stopPropagation();
			}
			if (
				!e.defaultPrevented &&
				modalContentRef.current &&
				onClose &&
				e.target instanceof Node &&
				!modalContentRef.current.contains(e.target)
			) {
				onClose(e);
			}
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

	const escapeEvent = useMemo<KeyboardPresetObj[]>(
		() =>
			(onClose && [
				{ type: 'keydown', callback: onClose, keys: [{ key: 'Escape', ctrlKey: false }] }
			]) ||
			[],
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
	}, [open, onStartSentinelFocus, onEndSentinelFocus, windowObj]);

	useEffect(() => {
		// delay the open of the modal after the show of the portal
		// in order to make the transition visible
		const timeout = setTimeout(() => setDelayedOpen(open), TIMERS.MODAL.DELAY_OPEN);
		return (): void => {
			clearTimeout(timeout);
		};
	}, [open]);

	return (
		<Portal show={open} disablePortal={disablePortal} container={windowObj.document.body}>
			<ModalContainer
				ref={modalRef}
				$open={delayedOpen}
				$mounted={open}
				onClick={onBackdropClick}
				$zIndex={zIndex}
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
