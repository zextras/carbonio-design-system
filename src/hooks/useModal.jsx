/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useContext } from 'react';
import { ModalManagerContext } from '../components/utilities/ModalManager';

function useModal() {
	return useContext(ModalManagerContext);
}

export { useModal };
