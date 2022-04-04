/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useContext } from 'react';
import { CreateModalFn, ModalManagerContext } from '../components/utilities/ModalManager';

function useModal(): CreateModalFn {
	return useContext(ModalManagerContext);
}

export { useModal };
