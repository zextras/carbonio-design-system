/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, createContext, useReducer, Reducer, useContext } from 'react';
import { Modal, ModalProps } from '../feedback/Modal';
import { CustomModal, CustomModalProps } from '../feedback/CustomModal';
import { ThemeContext } from '../../theme/theme-context-provider';

type CloseModalFn = () => void;
type CreateModalArgs =
	| [modalProps: ModalProps, customModal?: false]
	| [customModalProps: CustomModalProps, customModal: true];
type CreateModalFn = (...args: CreateModalArgs) => CloseModalFn;

const ModalManagerContext = createContext<CreateModalFn>(() => {
	// eslint-disable-next-line no-console
	console.error('Modal manager context not initialized');
	return (): void => undefined;
});

const MODAL_ACTION = {
	PUSH: 'push',
	REMOVE: 'remove'
} as const;

type ModalsReducerAction = {
	type: typeof MODAL_ACTION[keyof typeof MODAL_ACTION];
	value: JSX.Element;
};

function modalsReducer(state: JSX.Element[], action: ModalsReducerAction): JSX.Element[] {
	switch (action.type) {
		case 'push': {
			return [...state, action.value];
		}
		case 'remove': {
			return state.filter((modal) => modal !== action.value);
		}
		default: {
			return state;
		}
	}
}

interface ModalManagerProps {
	children: React.ReactNode | React.ReactNode[];
}

function isStandardModal(
	modalProps: ModalProps | CustomModalProps,
	customModal?: boolean
): modalProps is ModalProps {
	return !customModal;
}

function ModalManager({ children }: ModalManagerProps): JSX.Element {
	const [modals, dispatchModal] = useReducer<Reducer<JSX.Element[], ModalsReducerAction>>(
		modalsReducer,
		[]
	);
	const { windowObj } = useContext(ThemeContext);

	const createModal = useCallback<CreateModalFn>(
		(
			{ onClose, children: modalChildren, ...rest }: ModalProps | CustomModalProps,
			custom = false
		) => {
			const overflow = windowObj.document.body.style.overflowY;

			const handleClose = (event: KeyboardEvent | React.MouseEvent): void => {
				if (onClose) {
					onClose(event);
				}
				if (overflow) {
					windowObj.document.body.style.overflowY = overflow;
				}
			};

			const handleConfirmClick = (
				event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>
			): void => {
				if (isStandardModal(rest, custom) && rest.onConfirm) {
					rest.onConfirm(event);
				}
			};

			const handleSecondaryAction = (
				event: KeyboardEvent | React.MouseEvent<HTMLButtonElement>
			): void => {
				if (isStandardModal(rest, custom) && rest.onSecondaryAction) {
					rest.onSecondaryAction(event);
				}
			};

			const modal = isStandardModal(rest, custom) ? (
				<Modal
					key={`${rest.title}-${rest.type}`}
					{...rest}
					onClose={handleClose}
					onConfirm={handleConfirmClick}
					onSecondaryAction={handleSecondaryAction}
					open
				>
					{modalChildren}
				</Modal>
			) : (
				<CustomModal key={Date.now()} {...rest} open onClose={handleClose}>
					{modalChildren}
				</CustomModal>
			);

			const closeModal = (): void => {
				dispatchModal({ type: MODAL_ACTION.REMOVE, value: modal });
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

export {
	ModalManagerContext,
	ModalManager,
	ModalManagerProps,
	CreateModalFn,
	CloseModalFn,
	CreateModalArgs
};
