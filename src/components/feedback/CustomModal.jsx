/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import { Container } from '../layout/Container';
import { Portal } from '../utilities/Portal';
import { Transition } from '../utilities/Transition';
import { useKeyboard } from '../../hooks/useKeyboard';
import { useScreenMode } from '../../hooks/useScreenMode';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import {
	getScrollbarSize,
	isBodyOverflowing,
	ModalContainer,
	ModalContent,
	ModalWrapper
} from './ModalComponents';

const CustomModal = React.forwardRef(function ModalFn(
	{ background, size, open, onClose, children, disablePortal, maxHeight, zIndex, ...rest },
	ref
) {
	const [delayedOpen, setDelayedOpen] = useState(false);

	const innerRef = useRef(undefined);
	const modalRef = useCombinedRefs(ref, innerRef);
	const modalContentRef = useRef(undefined);
	const startSentinelRef = useRef(undefined);
	const endSentinelRef = useRef(undefined);

	const screenMode = useScreenMode();

	const onBackdropClick = useCallback(
		(e) => {
			if (e) {
				e.stopPropagation();
			}
			modalContentRef.current && !modalContentRef.current.contains(e.target) && onClose(e);
		},
		[onClose]
	);

	const onStartSentinelFocus = useCallback(() => {
		const nodeList = modalContentRef.current.querySelectorAll('[tabindex]');
		nodeList[nodeList.length - 1].focus();
	}, []);
	const onEndSentinelFocus = useCallback(
		() => modalContentRef.current.querySelector('[tabindex]').focus(),
		[]
	);

	const escapeEvent = useMemo(
		() => [{ type: 'keydown', callback: onClose, keys: ['Escape'] }],
		[onClose]
	);
	useKeyboard(modalRef, escapeEvent);

	useEffect(() => {
		if (open) {
			const defaultOverflowY = window.top.document.body.style.overflowY;
			const defaultPaddingRight = window.top.document.body.style.paddingRight;

			window.top.document.body.style.overflowY = 'hidden';
			isBodyOverflowing(modalRef) &&
				(window.top.document.body.style.paddingRight = `${getScrollbarSize()}px`);

			return () => {
				window.top.document.body.style.overflowY = defaultOverflowY;
				window.top.document.body.style.paddingRight = defaultPaddingRight;
			};
		}
		return () => undefined;
	}, [modalRef, open]);

	useEffect(() => {
		const focusedElement = window.top.document.activeElement;

		if (open) {
			modalContentRef.current.focus();
			startSentinelRef.current.addEventListener('focus', onStartSentinelFocus);
			endSentinelRef.current.addEventListener('focus', onEndSentinelFocus);
		}
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;
		return () => {
			startSentinelRefSave &&
				startSentinelRefSave.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.removeEventListener('focus', onEndSentinelFocus);
			open && focusedElement.focus();
		};
	}, [open, onStartSentinelFocus, onEndSentinelFocus]);

	useEffect(() => {
		setTimeout(() => setDelayedOpen(open), 1);
	}, [open]);

	return (
		<Portal show={open} disablePortal={disablePortal}>
			<ModalContainer
				ref={modalRef}
				open={delayedOpen}
				mounted={open}
				screenMode={screenMode}
				onClick={onBackdropClick}
				zIndex={zIndex}
				{...rest}
			>
				<div tabIndex={0} ref={startSentinelRef} />
				<Transition type="scale-in" apply={delayedOpen}>
					<ModalWrapper
						onClick={(e) => {
							if (e) {
								e.stopPropagation();
							}
						}}
					>
						<ModalContent
							ref={modalContentRef}
							background={background}
							tabIndex={-1}
							screenMode={screenMode}
							size={size}
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

CustomModal.propTypes = {
	/** Modal background */
	background: Container.propTypes.background,
	/** Modal size */
	size: PropTypes.oneOf(['extrasmall', 'small', 'medium', 'large']),
	/** Boolean to show the modal */
	open: PropTypes.bool,
	/** Callback to close the Modal */
	onClose: PropTypes.func,
	/** Css property to handle the stack order of multiple modals */
	zIndex: PropTypes.number,
	/** max height of the modal body */
	maxHeight: PropTypes.string,
	/** Flag to disable the Portal implementation */
	disablePortal: PropTypes.bool
};

CustomModal.defaultProps = {
	open: false,
	onClose: undefined,
	disablePortal: false,
	size: 'small',
	zIndex: 999,
	background: 'gray6',
	maxHeight: '60vh'
};

export { CustomModal };
