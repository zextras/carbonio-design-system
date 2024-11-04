/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, createContext, useReducer, Reducer, useMemo } from 'react';

import { useTheme } from 'styled-components';

import { CustomModal, CustomModalProps } from '../feedback/CustomModal';
import { Modal, ModalProps } from '../feedback/Modal';

type CreateModalArgs =
	| [modalProps: ModalProps & { id: string }, customModal?: false]
	| [customModalProps: CustomModalProps & { id: string }, customModal: true];
type CreateModalFn = (...args: CreateModalArgs) => void;
type CloseModalFn = (id: string) => void;

const ModalManagerContext = createContext<
	{ createModal: CreateModalFn; closeModal: CloseModalFn } | undefined
>(undefined);

const MODAL_ACTION = {
	PUSH: 'push',
	REMOVE: 'remove'
} as const;

type ModalState = { id: string; modal: React.JSX.Element };

type ModalsReducerAction =
	| {
			type: typeof MODAL_ACTION.PUSH;
			value: ModalState;
	  }
	| {
			type: typeof MODAL_ACTION.REMOVE;
			value: string;
	  };

function modalsReducer(state: ModalState[], action: ModalsReducerAction): ModalState[] {
	switch (action.type) {
		case 'push': {
			return [...state, action.value];
		}
		case 'remove': {
			return state.filter((modal) => modal.id !== action.value);
		}
		default: {
			return state;
		}
	}
}

type ModalManagerProps = React.PropsWithChildren<Record<string, unknown>>;

function isStandardModal(
	modalProps: ModalProps | CustomModalProps,
	customModal?: boolean
): modalProps is ModalProps {
	return !customModal;
}

function ModalManager({ children }: ModalManagerProps): React.JSX.Element {
	const [modals, dispatchModal] = useReducer<Reducer<ModalState[], ModalsReducerAction>>(
		modalsReducer,
		[]
	);
	const { windowObj } = useTheme();

	const createModal = useCallback<CreateModalFn>(
		({ id, onClose, children: modalChildren, ...rest }, custom = false) => {
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
					key={id}
					{...rest}
					onClose={handleClose}
					onConfirm={handleConfirmClick}
					onSecondaryAction={handleSecondaryAction}
					open
				>
					{modalChildren}
				</Modal>
			) : (
				<CustomModal key={id} {...rest} open onClose={handleClose}>
					{modalChildren}
				</CustomModal>
			);

			dispatchModal({
				type: 'push',
				value: { id, modal }
			});
		},
		[windowObj]
	);

	const closeModal = useCallback<CloseModalFn>((id) => {
		dispatchModal({ type: MODAL_ACTION.REMOVE, value: id });
	}, []);

	const modalElements = useMemo(() => modals.map((value) => value.modal), [modals]);

	const providerValue = useMemo(() => ({ createModal, closeModal }), [createModal, closeModal]);

	return (
		<>
			<ModalManagerContext.Provider value={providerValue}>{children}</ModalManagerContext.Provider>
			{modalElements}
		</>
	);
}

export {
	ModalManagerContext,
	ModalManager,
	type ModalManagerProps,
	type CreateModalFn,
	type CloseModalFn,
	type CreateModalArgs
};
