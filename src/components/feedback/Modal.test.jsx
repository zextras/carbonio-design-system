/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { Button } from '../basic/Button';
import { Modal } from './Modal';
import { Text } from '../basic/Text';
import { render } from '../../test-utils';

const CustomModal = () => {
	const [open, setOpen] = useState(false);
	const clickHandler = () => setOpen(true);
	const closeHandler = () => setOpen(false);

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
	const modalButton = () => screen.getByText('TRIGGER MODAL');
	const modalTitle = () => screen.getByText('My Title');
	const modalText = () => screen.getByText('Lorem ipsum dolor sit amet.');

	test('Render Modal', () => {
		render(<CustomModal />);

		expect(modalButton()).toBeInTheDocument();
		expect(modalTitle).toThrowError();
		expect(modalText).toThrowError();

		userEvent.click(screen.getByText('TRIGGER MODAL'));

		expect(modalTitle).not.toThrowError();
		expect(modalText).not.toThrowError();
		expect(modalButton()).toBeInTheDocument();
		expect(modalTitle()).toBeInTheDocument();
		expect(modalText()).toBeInTheDocument();
	});
});
