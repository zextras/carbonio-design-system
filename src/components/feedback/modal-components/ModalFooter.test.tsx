/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { ModalFooter } from './ModalFooter';
import { setup } from '../../../test-utils';

describe('Modal footer', () => {
	it('displays a disabled primary button if the "confirmDisabled" is set to true', async () => {
		setup(<ModalFooter confirmLabel={'confirm'} confirmDisabled onConfirm={jest.fn} />);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		expect(confirmButton).toBeDisabled();
	});

	it('displays an enabled primary button if the "confirmDisabled" is set to false', async () => {
		setup(<ModalFooter confirmLabel={'confirm'} confirmDisabled={false} onConfirm={jest.fn} />);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		expect(confirmButton).toBeEnabled();
	});

	it('displays an enabled primary button if the "confirmDisabled" is not set', async () => {
		setup(<ModalFooter confirmLabel={'confirm'} onConfirm={jest.fn} />);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		expect(confirmButton).toBeEnabled();
	});
});
