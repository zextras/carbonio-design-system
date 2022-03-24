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
import { Container } from '../layout/Container';
import { render } from '../../test-utils';
import { Snackbar } from './Snackbar';

const CustomSnackbar = () => {
	const [snack1, setSnack1] = useState(false);

	return (
		<>
			<Container orientation="horizontal" mainAlignment="space-between" width="400px">
				<Button type="outlined" color="success" label="Success" onClick={() => setSnack1(true)} />
			</Container>
			<Snackbar
				open={snack1}
				onClose={() => setSnack1(false)}
				type="success"
				label="Success, Lorem Ipsum dolor sit amet"
			/>
		</>
	);
};

describe('Snackbar', () => {
	const successSnackBar = () => screen.getByText(/success/i);
	const successLabel = () => screen.getByText('Success, Lorem Ipsum dolor sit amet');
	const closeSnackBar = () => screen.getByText(/ok/i);

	test('Hidden Snackbar', () => {
		render(<CustomSnackbar />);

		expect(successLabel).toThrowError();
	});

	test('Showing Success Snackbar and close it', () => {
		render(<CustomSnackbar />);
		userEvent.click(successSnackBar());

		expect(successLabel()).toBeInTheDocument();

		userEvent.click(closeSnackBar());

		expect(successLabel).toThrowError();
	});

	test('Showing all snackbars at once', () => {
		render(<CustomSnackbar />);
		userEvent.click(successSnackBar());

		expect(successLabel()).toBeInTheDocument();
	});
});
