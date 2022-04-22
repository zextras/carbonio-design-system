/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, createContext, useReducer, useContext } from 'react';
import { Modal } from '../feedback/Modal';
import { CustomModal } from '../feedback/CustomModal';
import { ThemeContext } from '../../theme/theme-context-provider';

const ModalManagerContext = createContext();

function modalsReducer(state, action) {
	switch (action.type) {
		case 'push': {
			return [...state, action.value];
		}
		case 'remove': {
			return state.filter((modal) => modal !== action.modal);
		}
		default: {
			return state;
		}
	}
}

function ModalManager({ children }) {
	const [modals, dispatchModal] = useReducer(modalsReducer, []);
	const { windowObj } = useContext(ThemeContext);
	const createModal = useCallback(
		(
			{
				background,
				centered,
				children: modalChildren,
				confirmColor,
				confirmLabel,
				copyLabel,
				customFooter,
				disablePortal,
				dismissLabel,
				hideFooter,
				maxHeight,
				onClose,
				onConfirm,
				onSecondaryAction,
				optionalFooter,
				secondaryActionLabel,
				showCloseIcon,
				size,
				title,
				type,
				zIndex
			},
			custom = false
		) => {
			const overflow = windowObj.document.body.style.overflowY;
			const handleClose = () => {
				if (onClose) onClose();
				if (overflow) windowObj.document.body.style.overflowY = overflow;
			};

			const handleConfirmClick = () => {
				if (onConfirm) onConfirm();
			};

			const handleSecondaryAction = () => {
				if (onSecondaryAction) onSecondaryAction();
			};

			const modal = custom ? (
				<CustomModal
					key={`${title}-${type}`}
					background={background}
					disablePortal={disablePortal}
					maxHeight={maxHeight}
					onClose={handleClose}
					open
					size={size}
					zIndex={zIndex}
				>
					{modalChildren}
				</CustomModal>
			) : (
				<Modal
					key={`${title}-${type}`}
					background={background}
					centered={centered}
					confirmColor={confirmColor}
					confirmLabel={confirmLabel}
					copyLabel={copyLabel}
					customFooter={customFooter}
					disablePortal={disablePortal}
					dismissLabel={dismissLabel}
					hideFooter={hideFooter}
					maxHeight={maxHeight}
					onClose={handleClose}
					onConfirm={handleConfirmClick}
					onSecondaryAction={handleSecondaryAction}
					open
					optionalFooter={optionalFooter}
					secondaryActionLabel={secondaryActionLabel}
					showCloseIcon={showCloseIcon}
					size={size}
					title={title}
					type={type}
					zIndex={zIndex}
				>
					{modalChildren}
				</Modal>
			);

			const closeModal = () => {
				dispatchModal({ type: 'remove', modal });
			};

			dispatchModal({
				type: 'push',
				value: modal
			});

			return closeModal;
		},
		[windowObj.document.body.style]
	);

	return (
		<>
			<ModalManagerContext.Provider value={createModal}>{children}</ModalManagerContext.Provider>
			{modals}
		</>
	);
}

ModalManager.propTypes = {};

ModalManager.defaultProps = {};

export { ModalManagerContext, ModalManager };
