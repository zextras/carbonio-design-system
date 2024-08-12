/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

/* eslint-disable jsx-a11y/no-noninteractive-tabindex */

import React, { HTMLAttributes, useCallback, useRef } from 'react';

import { noop } from 'lodash';
import { useTheme } from 'styled-components';

import { CustomModal, CustomModalProps } from './CustomModal';
import { ModalBody } from './modal-components/ModalBody';
import { ModalFooter, ModalFooterProps } from './modal-components/ModalFooter';
import { ModalHeader } from './modal-components/ModalHeader';
import { Divider } from '../layout/Divider';

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

type ModalProps = CustomModalProps &
	Omit<ModalFooterProps, 'errorActionLabel' | 'onErrorAction'> & {
		/** Modal title */
		title?: string | React.ReactElement;
		/** Hide the footer completely */
		hideFooter?: boolean;
		/** Show icon to close Modal */
		showCloseIcon?: boolean;
		/** Label for copy button in the Error Modal */
		copyLabel?: ModalFooterProps['errorActionLabel'];
		/** Close icon tooltip label */
		closeIconTooltip?: string;
	} & Omit<HTMLAttributes<HTMLDivElement>, 'title'>;

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function ModalFn(
	{
		type = 'default',
		title: Title,
		centered = false,
		onConfirm,
		confirmLabel = 'OK',
		confirmDisabled,
		confirmTooltip,
		confirmColor = 'primary',
		onSecondaryAction,
		secondaryActionLabel,
		secondaryActionDisabled,
		secondaryActionTooltip,
		onClose = noop,
		dismissLabel,
		optionalFooter,
		customFooter,
		copyLabel = 'Copy',
		hideFooter = false,
		showCloseIcon = true,
		children,
		containerWindow,
		closeIconTooltip,
		...rest
	},
	ref
) {
	const { windowObj: themeWindowObj } = useTheme();
	const windowObj = containerWindow ?? themeWindowObj;

	const modalBodyRef = useRef<HTMLDivElement | null>(null);

	const onCopyClipboard = useCallback(
		() => copyToClipboard(modalBodyRef.current, windowObj),
		[windowObj]
	);

	return (
		<CustomModal onClose={onClose} ref={ref} {...rest}>
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
						confirmDisabled={confirmDisabled}
						confirmColor={confirmColor}
						dismissLabel={dismissLabel}
						onConfirm={onConfirm}
						onClose={onClose}
						onSecondaryAction={onSecondaryAction}
						secondaryActionLabel={secondaryActionLabel}
						secondaryActionDisabled={secondaryActionDisabled}
						onErrorAction={onCopyClipboard}
						errorActionLabel={copyLabel}
						secondaryActionTooltip={secondaryActionTooltip}
						confirmTooltip={confirmTooltip}
					/>
				</>
			)}
		</CustomModal>
	);
});

export { Modal, ModalProps };
