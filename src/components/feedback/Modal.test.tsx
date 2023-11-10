/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal, ModalProps } from './Modal';
import { ModalFooter } from './modal-components/ModalFooter';
import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Text } from '../basic/Text';

const ModalTester = ({ children, ...props }: ModalProps): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);

	return (
		<>
			<Button label="Trigger Modal" onClick={clickHandler} />
			<Modal
				{...props}
				title="My Title"
				open={open}
				onConfirm={closeHandler}
				onClose={closeHandler}
			>
				{children || <Text overflow="break-word">Lorem ipsum dolor sit amet.</Text>}
			</Modal>
		</>
	);
};

describe('Modal', () => {
	test('Render Modal', async () => {
		render(<ModalTester />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();
		userEvent.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeVisible();
		expect(button).toBeInTheDocument();
	});

	test('click on overlay close modal', async () => {
		const onClick = jest.fn();
		render(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		userEvent.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		const overlayElement = screen.getByTestId('modal');
		expect(overlayElement).toBeVisible();
		userEvent.click(overlayElement);
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(onClick).not.toHaveBeenCalled();
	});

	test('click on modal content does not close modal', async () => {
		const onClick = jest.fn();
		render(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		userEvent.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		userEvent.click(screen.getByText('My Title'));
		expect(screen.getByText('My Title')).toBeVisible();
		expect(onClick).toHaveBeenCalled();
	});

	test('should not blindly prevent default behavior of html elements', async () => {
		const originalConsoleError = console.error;
		const errors: string[] = [];
		console.error = (message): void => {
			errors.push(message);
		};
		const href = '/different-path';
		render(
			<ModalTester>
				<a href={href}>This is a link</a>
			</ModalTester>
		);
		userEvent.click(screen.getByRole('button'));
		userEvent.click(screen.getByRole('link'));
		await waitFor(
			() =>
				new Promise((resolve) => {
					// wait for the navigation callback of the jsdom hyperlink implementation to be called
					setTimeout(resolve, 1);
				})
		);
		expect(errors).toEqual([
			expect.stringContaining('Error: Not implemented: navigation (except hash changes)')
		]);
		console.error = originalConsoleError;
	});

	describe('Modal footer', () => {
		it('displays a disabled primary button if the "confirmDisabled" is set to true', async () => {
			render(<ModalFooter confirmLabel={'confirm'} confirmDisabled={true} onConfirm={jest.fn} />);
			const confirmButton = screen.getByRole('button', { name: /confirm/i });
			expect(confirmButton).toBeDisabled();
		});

		it('displays an enabled primary button if the "confirmDisabled" is set to false', async () => {
			render(<ModalFooter confirmLabel={'confirm'} confirmDisabled={false} onConfirm={jest.fn} />);
			const confirmButton = screen.getByRole('button', { name: /confirm/i });
			expect(confirmButton).toBeEnabled();
		});

		it('displays an enabled primary button if the "confirmDisabled" is not set', async () => {
			render(<ModalFooter confirmLabel={'confirm'} onConfirm={jest.fn} />);
			const confirmButton = screen.getByRole('button', { name: /confirm/i });
			expect(confirmButton).toBeEnabled();
		});
	});
});
