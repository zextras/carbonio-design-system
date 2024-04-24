/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { ModalFooter } from './ModalFooter';
import { setup, within } from '../../../test-utils';
import { SELECTORS } from '../../../testUtils/constants';
import { TIMERS } from '../../constants';

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

	it('should show the tooltip on the confirm action if it is disabled', async () => {
		const confirmTooltip = 'Confirm tooltip';
		const { user } = setup(
			<ModalFooter
				confirmLabel={'confirm'}
				confirmTooltip={confirmTooltip}
				confirmDisabled
				onConfirm={jest.fn()}
			/>
		);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(confirmButton);
		const tooltip = await screen.findByTestId(SELECTORS.tooltip);
		expect(within(tooltip).getByText(confirmTooltip)).toBeVisible();
	});

	it.each([false, undefined])(
		'should not show the tooltip on the confirm action if it the "confirmDisabled" is set to %s',
		async (confirmDisabled) => {
			const confirmTooltip = 'Confirm tooltip';
			const { user } = setup(
				<ModalFooter
					confirmLabel={'confirm'}
					confirmTooltip={confirmTooltip}
					confirmDisabled={confirmDisabled}
					onConfirm={jest.fn()}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /confirm/i });
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(secondaryButton);
			expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
			expect(screen.queryByText(confirmTooltip)).not.toBeInTheDocument();
		}
	);

	it.each(['', undefined])(
		'should not render the tooltip on the confirm action if the tooltip label is %s',
		async (confirmTooltip) => {
			const { user } = setup(
				<ModalFooter
					confirmLabel={'confirm'}
					confirmTooltip={confirmTooltip}
					confirmDisabled
					onConfirm={jest.fn()}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /confirm/i });
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(secondaryButton);
			expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
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

	it('should show the tooltip on the secondary action if it is disabled', async () => {
		const secondaryActionTooltip = 'This is the secondary tooltip';
		const { user } = setup(
			<ModalFooter
				secondaryActionDisabled
				secondaryActionLabel={'secondaryAction'}
				onSecondaryAction={jest.fn()}
				secondaryActionTooltip={secondaryActionTooltip}
			/>
		);
		const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(secondaryButton);
		const tooltip = await screen.findByTestId(SELECTORS.tooltip);
		expect(within(tooltip).getByText(secondaryActionTooltip)).toBeVisible();
	});

	it.each([false, undefined])(
		'should not show the tooltip on the secondary action if "secondaryActionDisabled" is set to %s',
		async (secondaryActionDisabled) => {
			const secondaryActionTooltip = 'This is the secondary tooltip';
			const { user } = setup(
				<ModalFooter
					secondaryActionDisabled={secondaryActionDisabled}
					secondaryActionLabel={'secondaryAction'}
					onSecondaryAction={jest.fn()}
					secondaryActionTooltip={secondaryActionTooltip}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(secondaryButton);
			expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
			expect(screen.queryByText(secondaryActionTooltip)).not.toBeInTheDocument();
		}
	);

	it.each(['', undefined])(
		'should not render the tooltip on the secondary action if the tooltip label is %s',
		async (secondaryActionTooltip) => {
			const { user } = setup(
				<ModalFooter
					secondaryActionDisabled
					secondaryActionLabel={'secondaryAction'}
					onSecondaryAction={jest.fn()}
					secondaryActionTooltip={secondaryActionTooltip}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(secondaryButton);
			expect(screen.queryByTestId(SELECTORS.tooltip)).not.toBeInTheDocument();
		}
	);
});
