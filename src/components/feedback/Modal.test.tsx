/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Modal, ModalProps } from './Modal';
import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Text } from '../basic/Text';

const ModalTester = (props: ModalProps): JSX.Element => {
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
				<Text overflow="break-word">Lorem ipsum dolor sit amet.</Text>
			</Modal>
		</>
	);
};

describe('Modal', () => {
	test('Render Modal', () => {
		render(<ModalTester />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();

		userEvent.click(button);

		expect(screen.getByText('My Title')).toBeInTheDocument();
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('click on overlay close modal', async () => {
		const onClick = jest.fn();
		render(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();

		userEvent.click(button);

		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText('My Title')).toBeVisible();
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeVisible();
		const overlayElement = screen.getByTestId('modal');
		expect(overlayElement).toBeVisible();
		userEvent.click(overlayElement);
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();
		expect(onClick).not.toHaveBeenCalled();
	});

	test('click on modal content does not close modal', async () => {
		const onClick = jest.fn();
		render(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();

		userEvent.click(button);

		// wait for listeners to be registered
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		expect(screen.getByText('My Title')).toBeVisible();
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeVisible();
		userEvent.click(screen.getByText('My Title'));
		expect(screen.getByText('My Title')).toBeVisible();
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeVisible();
		expect(onClick).toHaveBeenCalled();
	});
});
