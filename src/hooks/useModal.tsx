/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useContext } from 'react';

import {
	CloseModalFn,
	CreateModalFn,
	ModalManagerContext
} from '../components/utilities/ModalManager';

function useModal(): { createModal: CreateModalFn; closeModal: CloseModalFn } {
	const context = useContext(ModalManagerContext);
	const fallback = useCallback<CreateModalFn>(() => {
		console.error('Modal manager context not initialized');
		return (): void => undefined;
	}, []);
	const closeFallback = useCallback<CloseModalFn>(() => {
		console.error('Modal manager context not initialized');
		return (): void => undefined;
	}, []);
	return {
		createModal: context?.createModal ?? fallback,
		closeModal: context?.closeModal ?? closeFallback
	};
}

export { useModal };
