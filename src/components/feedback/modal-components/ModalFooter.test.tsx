/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { ModalFooter } from './ModalFooter';
import { SELECTORS } from '../../../tests/constants';
import { setup, within } from '../../../tests/utils';
import { TIMERS } from '../../constants';

describe('Modal footer', () => {
	it('displays a disabled primary button if the "confirmDisabled" is set to true', async () => {
		setup(<ModalFooter confirmLabel={'confirm'} confirmDisabled onConfirm={vi.fn()} />);
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
					onConfirm={vi.fn()}
				/>
			);
			const confirmButton = screen.getByRole('button', { name: /confirm/i });
			expect(confirmButton).toBeEnabled();
		}
	);

	it('should show the tooltip on the confirm action if confirmTooltip is set', async () => {
		const confirmTooltip = 'Confirm tooltip';
		const { user } = setup(
			<ModalFooter confirmLabel={'confirm'} confirmTooltip={confirmTooltip} onConfirm={vi.fn()} />
		);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		vi.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(confirmButton);
		const tooltip = await screen.findByTestId(SELECTORS.tooltip);
		expect(within(tooltip).getByText(confirmTooltip)).toBeVisible();
	});

	it.each(['', undefined])(
		'should not render the tooltip on the confirm action if the tooltip label is %s',
		async (confirmTooltip) => {
			const { user } = setup(
				<ModalFooter confirmLabel={'confirm'} confirmTooltip={confirmTooltip} onConfirm={vi.fn()} />
			);
			const secondaryButton = screen.getByRole('button', { name: /confirm/i });
			vi.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(secondaryButton);
			expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
		}
	);

	it('should disable secondary action button when secondaryActionDisabled is true', () => {
		setup(
			<ModalFooter
				secondaryActionDisabled
				secondaryActionLabel={'secondaryAction'}
				onSecondaryAction={vi.fn()}
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
					onSecondaryAction={vi.fn()}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
			expect(secondaryButton).toBeEnabled();
		}
	);

	it('should show the tooltip on the secondary action if secondaryActionTooltip is set', async () => {
		const secondaryActionTooltip = 'This is the secondary tooltip';
		const { user } = setup(
			<ModalFooter
				secondaryActionLabel={'secondaryAction'}
				onSecondaryAction={vi.fn()}
				secondaryActionTooltip={secondaryActionTooltip}
			/>
		);
		const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
		vi.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(secondaryButton);
		const tooltip = await screen.findByTestId(SELECTORS.tooltip);
		expect(within(tooltip).getByText(secondaryActionTooltip)).toBeVisible();
	});

	it.each(['', undefined])(
		'should not render the tooltip on the secondary action if the tooltip label is %s',
		async (secondaryActionTooltip) => {
			const { user } = setup(
				<ModalFooter
					secondaryActionLabel={'secondaryAction'}
					onSecondaryAction={vi.fn()}
					secondaryActionTooltip={secondaryActionTooltip}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
			vi.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(secondaryButton);
			expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
		}
	);
});
