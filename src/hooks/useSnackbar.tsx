/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useCallback, useContext } from 'react';

import { CreateSnackbarFn, SnackbarManagerContext } from '../components/utilities/SnackbarManager';

function useSnackbar(): CreateSnackbarFn {
	const createSnackbar = useContext(SnackbarManagerContext);
	const fallback = useCallback<CreateSnackbarFn>(() => {
		console.error('snackbar manager context not initialized');
	}, []);
	return createSnackbar ?? fallback;
}

export { useSnackbar };
