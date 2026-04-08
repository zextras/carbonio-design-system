/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { screen, waitFor } from '@testing-library/react';

import type { ModalProps } from './Modal';
import { Modal } from './Modal';
import { setup } from '../../../tests/utils';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';

const ModalTester = ({ children, ...props }: ModalProps): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = useCallback((): void => setOpen(true), []);
	const closeHandler = useCallback((): void => setOpen(false), []);

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
		const { user } = setup(<ModalTester />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeVisible();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();
		await user.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeVisible();
		expect(button).toBeVisible();
	});

	test('click on overlay close modal', async () => {
		const onClick = vi.fn();
		const { user } = setup(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeVisible();
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
		const onClick = vi.fn();
		const { user } = setup(<ModalTester onClick={onClick} />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeVisible();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		await user.click(button);
		await waitFor(() => expect(screen.getByText('My Title')).toBeVisible());
		await user.click(screen.getByText('My Title'));
		expect(screen.getByText('My Title')).toBeVisible();
		expect(onClick).toHaveBeenCalled();
	});

	test('should not blindly prevent default behavior of html elements', async () => {
		const href = '/different-path';
		const { user } = setup(
			<ModalTester>
				<a href={href}>This is a link</a>
			</ModalTester>
		);
		await screen.findByRole('button');
		await user.click(screen.getByRole('button'));
		await screen.findByTestId('modal');
		await waitFor(() => expect(screen.getByRole('link')).toBeVisible());
		let wasDefaultPrevented = true;
		const link = screen.getByRole('link');
		link.addEventListener(
			'click',
			(event: MouseEvent) => {
				wasDefaultPrevented = event.defaultPrevented;
			},
			{ once: true }
		);
		await user.click(link);
		expect(wasDefaultPrevented).toBe(false);
	});

	it('should disable secondary action button when secondaryActionDisabled is true', () => {
		setup(
			<Modal
				open
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
				<Modal
					open
					secondaryActionDisabled={secondaryActionDisabled}
					secondaryActionLabel={'secondaryAction'}
					onSecondaryAction={vi.fn()}
				/>
			);
			const secondaryButton = screen.getByRole('button', { name: /secondaryAction/i });
			expect(secondaryButton).toBeEnabled();
		}
	);

	it('displays a disabled primary button if the "confirmDisabled" is set to true', async () => {
		setup(<Modal open confirmLabel={'confirm'} confirmDisabled onConfirm={vi.fn()} />);
		const confirmButton = screen.getByRole('button', { name: /confirm/i });
		expect(confirmButton).toBeDisabled();
	});

	it.each([false, undefined])(
		'displays an enabled primary button if the "confirmDisabled" is set to %s',
		async (confirmDisabled) => {
			setup(
				<Modal
					open
					confirmLabel={'confirm'}
					confirmDisabled={confirmDisabled}
					onConfirm={vi.fn()}
				/>
			);
			const confirmButton = screen.getByRole('button', { name: /confirm/i });
			expect(confirmButton).toBeEnabled();
		}
	);
});
