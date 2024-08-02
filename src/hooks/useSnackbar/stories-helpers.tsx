/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef } from 'react';

import { useSnackbar } from './useSnackbar';
import { Button } from '../../components/basic/button/Button';
import { CreateSnackbarFnArgs } from '../../components/utilities/SnackbarManager';

export const Hook = (createSnackbarArgs: CreateSnackbarFnArgs): React.JSX.Element => {
	const indexRef = useRef(1);
	const createSnackbar = useSnackbar();

	return (
		<Button
			onClick={() => {
				createSnackbar({
					...createSnackbarArgs,
					key: `snack-${indexRef.current}`,
					label: `${createSnackbarArgs.label} ${indexRef.current}`
				});
				indexRef.current += 1;
			}}
			label={'Create snackbar'}
		/>
	);
};
