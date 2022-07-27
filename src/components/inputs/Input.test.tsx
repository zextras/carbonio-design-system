/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { screen } from '@testing-library/dom';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useCallback, useState } from 'react';
import { render } from '../../test-utils';
import { Button } from '../basic/Button';
import { Modal } from '../feedback/Modal';
import { Input } from './Input';

const ModalWithInput = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);

	const [inputValue, setInputValue] = useState('');
	const [inputHasError, setInputHasError] = useState(false);
	const inputLabel = 'Input Label';
	const inputLabelError = 'Input value longer than 140 characters';

	const handleChangeValue = useCallback<React.ChangeEventHandler<HTMLInputElement>>((e) => {
		if (e.target.value.length > 140) {
			setInputHasError(true);
			setInputValue(e.target.value.substring(0, 140));
		} else {
			setInputHasError(false);
			setInputValue(e.target.value);
		}
	}, []);

	return (
		<>
			<Button onClick={clickHandler} label="Open modal" />
			<Modal open={open} title="Modal title" onConfirm={closeHandler} onClose={closeHandler}>
				<Input
					value={inputValue}
					onChange={handleChangeValue}
					label={inputHasError ? inputLabelError : inputLabel}
					hasError={inputHasError}
				/>
			</Modal>
		</>
	);
};

describe('Input', () => {
	test('Input inside a Modal does not lose focus after typing first character', async () => {
		render(<ModalWithInput />);
		expect(screen.getByRole('button', { name: /open modal/i })).toBeVisible();
		userEvent.click(screen.getByRole('button', { name: /open modal/i }));
		await screen.findByText(/modal title/i);
		const inputElement = screen.getByRole('textbox', { name: /input label/i });
		expect(inputElement).toBeInTheDocument();
		userEvent.click(inputElement);
		await waitFor(() => expect(inputElement).toHaveFocus());
		// type a character
		await userEvent.type(inputElement, 'a', { delay: 10, skipClick: true });
		expect(inputElement).toHaveValue('a');
		expect(inputElement).toHaveFocus();
	});
});
