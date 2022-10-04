/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Text } from '../basic/Text';
import { Modal } from './Modal';

const CustomModal = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);

	return (
		<>
			<Button label="Trigger Modal" onClick={clickHandler} />
			<Modal title="My Title" open={open} onConfirm={closeHandler} onClose={closeHandler}>
				<Text overflow="break-word">Lorem ipsum dolor sit amet.</Text>
			</Modal>
		</>
	);
};
describe('Modal', () => {
	test('Render Modal', () => {
		render(<CustomModal />);

		const button = screen.getByRole('button', { name: /trigger modal/i });
		expect(button).toBeInTheDocument();
		expect(screen.queryByText('My Title')).not.toBeInTheDocument();
		expect(screen.queryByText('Lorem ipsum dolor sit amet.')).not.toBeInTheDocument();

		userEvent.click(button);

		expect(screen.getByText('My Title')).toBeInTheDocument();
		expect(screen.getByText('Lorem ipsum dolor sit amet.')).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});
});
