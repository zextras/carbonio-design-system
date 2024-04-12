/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { screen } from '@testing-library/react';

import { Snackbar } from './Snackbar';
import { setup } from '../../../test-utils';
import { Button } from '../../basic/Button';
import { Container } from '../../layout/Container';

const CustomSnackbar = (): React.JSX.Element => {
	const [snack1, setSnack1] = useState(false);

	return (
		<>
			<Container orientation="horizontal" mainAlignment="space-between" width="25rem">
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
		setup(<CustomSnackbar />);

		expect(screen.queryByText(/Success, Lorem Ipsum dolor sit amet/i)).not.toBeInTheDocument();
	});

	test('Showing Success Snackbar and close it', async () => {
		const { user } = setup(<CustomSnackbar />);
		await user.click(screen.getByText(/success/i));

		expect(screen.getByText(/Success, Lorem Ipsum dolor sit amet/i)).toBeVisible();

		await user.click(screen.getByText(/OK/i));

		expect(screen.queryByText(/Success, Lorem Ipsum dolor sit amet/i)).not.toBeInTheDocument();
	});

	test('Showing all snackbars at once', async () => {
		const { user } = setup(<CustomSnackbar />);

		await user.click(screen.getByText(/success/i));

		expect(screen.getByText(/Success, Lorem Ipsum dolor sit amet/i)).toBeVisible();
	});
});
