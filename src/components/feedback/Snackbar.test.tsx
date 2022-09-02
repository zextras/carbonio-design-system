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

const CustomSnackbar = (): JSX.Element => {
	const [snack1, setSnack1] = useState(false);

	return (
		<>
			<Container orientation="horizontal" mainAlignment="space-between" width="400px">
				<Button
					type="outlined"
					color="success"
					label="Success"
					onClick={(): void => setSnack1(true)}
				/>
			</Container>
			<Snackbar
				open={snack1}
				onClose={(): void => setSnack1(false)}
				type="success"
				label="Success, Lorem Ipsum dolor sit amet"
			/>
		</>
	);
};

describe('Snackbar', () => {
	test('Hidden Snackbar', () => {
		render(<CustomSnackbar />);

		expect(screen.queryByText(/Success, Lorem Ipsum dolor sit amet/i)).not.toBeInTheDocument();
	});

	test('Showing Success Snackbar and close it', () => {
		render(<CustomSnackbar />);
		userEvent.click(screen.getByText(/success/i));

		expect(screen.getByText(/Success, Lorem Ipsum dolor sit amet/i)).toBeInTheDocument();
		expect(screen.getByText(/Success, Lorem Ipsum dolor sit amet/i)).toBeVisible();

		userEvent.click(screen.getByText(/OK/i));

		expect(screen.queryByText(/Success, Lorem Ipsum dolor sit amet/i)).not.toBeInTheDocument();
	});

	test('Showing all snackbars at once', () => {
		render(<CustomSnackbar />);

		userEvent.click(screen.getByText(/success/i));

		expect(screen.getByText(/Success, Lorem Ipsum dolor sit amet/i)).toBeInTheDocument();
	});
});
