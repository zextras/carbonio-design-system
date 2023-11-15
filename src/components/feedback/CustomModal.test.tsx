/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { screen, waitFor } from '@testing-library/react';

import { CustomModal, CustomModalProps } from './CustomModal';
import { setup } from '../../test-utils';
import { Button } from '../basic/Button';
import { Text } from '../basic/Text';

const ModalTester = ({ children, ...props }: CustomModalProps): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);

	return (
		<>
			<Button label="Trigger Modal" onClick={clickHandler} />
			<CustomModal {...props} open={open} onClose={closeHandler}>
				{children || (
					<>
						<Text>My Title</Text>
						<Text overflow="break-word">Lorem ipsum dolor sit amet.</Text>
					</>
				)}
			</CustomModal>
		</>
	);
};

describe('Custom Modal', () => {
	test('Render Modal', async () => {
		const { user } = setup(<ModalTester />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();

		await user.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeVisible();
		expect(button).toBeInTheDocument();
	});

	test('click on overlay close modal', async () => {
		const onClick = jest.fn();
		const { user } = setup(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		await user.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		const overlayElement = screen.getByTestId('modal');
		expect(overlayElement).toBeVisible();
		await user.click(overlayElement);
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(onClick).not.toHaveBeenCalled();
	});

	test('click on modal content does not close modal', async () => {
		const onClick = jest.fn();
		const { user } = setup(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		await user.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		await user.click(screen.getByText('My Title'));
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
		const { user } = setup(
			<ModalTester>
				<a href={href}>This is a link</a>
			</ModalTester>
		);
		await user.click(screen.getByRole('button'));
		await user.click(screen.getByRole('link'));
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
});
