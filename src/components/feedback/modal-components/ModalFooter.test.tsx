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
		setup(<ModalFooter confirmLabel={'confirm'} confirmDisabled onConfirm={jest.fn()} />);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		expect(confirmButton).toBeDisabled();
	});

	it.each([false, undefined])(
		'displays an enabled primary button if the "confirmDisabled" is set to %s',
		async (confirmDisabled) => {
			setup(
				<ModalFooter
					confirmLabel={'confirm'}
					confirmDisabled={confirmDisabled}
					onConfirm={jest.fn()}
				/>
			);
			const confirmButton = screen.getByRole('button', { name: /confirm/i });
			expect(confirmButton).toBeEnabled();
		}
	);

	it('should disable secondary action button when secondaryActionDisabled is true', () => {
		setup(
			<ModalFooter
				secondaryActionDisabled
				secondaryActionLabel={'secondaryAction'}
				onSecondaryAction={jest.fn()}
			/>
		);
		const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
		expect(secondaryButton).toBeDisabled();
	});

	it.each([false, undefined])(
		'should enable secondary action button when secondaryActionDisabled is %s',
		(secondaryActionDisabled) => {
			setup(
				<ModalFooter
					secondaryActionDisabled={secondaryActionDisabled}
					secondaryActionLabel={'secondaryAction'}
					onSecondaryAction={jest.fn()}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
			expect(secondaryButton).toBeEnabled();
		}
	);
});
