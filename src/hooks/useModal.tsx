/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useContext } from 'react';

import { CreateModalFn, ModalManagerContext } from '../components/utilities/ModalManager';

function useModal(): CreateModalFn {
	const createModal = useContext(ModalManagerContext);
	const fallback = useCallback<CreateModalFn>(() => {
		console.error('Modal manager context not initialized');
		return (): void => undefined;
	}, []);
	return createModal ?? fallback;
}

export { useModal };
