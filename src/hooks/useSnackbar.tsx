/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useContext } from 'react';
import { CreateSnackbarFn, SnackbarManagerContext } from '../components/utilities/SnackbarManager';

function useSnackbar(): CreateSnackbarFn {
	return useContext(SnackbarManagerContext);
}

export { useSnackbar };
