/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { SnackbarManager } from './SnackbarManager';
import { useSnackbar } from '../../../hooks/useSnackbar/useSnackbar';
import { Button } from '../../basic/button/Button';
import { Container } from '../../layout/container/Container';

export function App(): React.JSX.Element {
	const createSnackbar = useSnackbar();
	return (
		<Container orientation="horizontal" mainAlignment="space-between" width="25rem">
			<Button
				type="outlined"
				color="success"
				label="Success"
				onClick={() => {
					const ref = createSnackbar({ key: '1', severity: 'success', label: 'label' });
					setTimeout(ref, 1000);
				}}
			/>
			<Button
				type="outlined"
				color="info"
				label="Info"
				onClick={() => createSnackbar({ key: '2', severity: 'info', label: 'label' })}
			/>
			<Button
				type="outlined"
				color="warning"
				label="Warning"
				onClick={() => createSnackbar({ key: '3', severity: 'warning', label: 'label' })}
			/>
			<Button
				type="outlined"
				color="error"
				label="Error"
				onClick={() =>
					createSnackbar({
						key: new Date().toLocaleString(),
						severity: 'error',
						label: 'label',
						replace: true
					})
				}
			/>
		</Container>
	);
}

function App2(): React.JSX.Element {
	return (
		<>
			<SnackbarManager>
				<App />
			</SnackbarManager>
		</>
	);
}
