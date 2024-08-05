/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState } from 'react';

import { act, screen, waitFor } from '@testing-library/react';

import { Input } from './Input';
import { setup } from '../../test-utils';
import { Button } from '../basic/button/Button';
import { Modal } from '../feedback/Modal';

const ModalWithInput = (): React.JSX.Element => {
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
		const { user } = setup(<ModalWithInput />);
		expect(screen.getByRole('button', { name: /open modal/i })).toBeVisible();
		await user.click(screen.getByRole('button', { name: /open modal/i }));
		await screen.findByText(/modal title/i);
		// run timers of modal
		act(() => jest.runOnlyPendingTimers());
		const inputElement = screen.getByRole('textbox', { name: /input label/i });
		expect(inputElement).toBeVisible();
		await user.click(inputElement);
		await waitFor(() => expect(inputElement).toHaveFocus());
		// type a character
		await user.type(inputElement, 'a', { skipClick: true });
		expect(inputElement).toHaveValue('a');
		expect(inputElement).toHaveFocus();
	});
});
