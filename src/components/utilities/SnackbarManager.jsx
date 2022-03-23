/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useReducer, createContext } from 'react';
import { Snackbar } from '../feedback/Snackbar';

const SnackbarManagerContext = createContext();

function snackbarsReducer(state, action) {
	switch (action.type) {
		case 'push': {
			return [...state, action.value];
		}
		case 'pop': {
			return state.slice(1);
		}
		case 'pop_and_prepend': {
			return [action.value, ...state.slice(1)];
		}
		case 'remove': {
			return state.filter((snackbar) => snackbar.key !== action.key);
		}
		default: {
			return state;
		}
	}
}
function SnackbarManager({ children, autoHideDefaultTimeout }) {
	const [snackbars, dispatchSnackbar] = useReducer(snackbarsReducer, []);
	const createSnackbar = useCallback(
		({
			label,
			key,
			type = 'info',
			actionLabel,
			onActionClick,
			onClose,
			disableAutoHide,
			hideButton,
			zIndex,
			autoHideTimeout,
			replace
		}) => {
			const handleClose = () => {
				onClose && onClose();
				dispatchSnackbar({ type: 'pop' });
			};
			const handleActionClick = () => {
				onActionClick ? onActionClick() : onClose && onClose();
				dispatchSnackbar({ type: 'pop' });
			};
			const snackKey = key || `${type}-${label}`;

			dispatchSnackbar({
				type: replace ? 'pop_and_prepend' : 'push',
				value: (
					<Snackbar
						key={snackKey}
						open
						type={type}
						label={label}
						actionLabel={actionLabel}
						onActionClick={handleActionClick}
						onClose={handleClose}
						disableAutoHide={disableAutoHide}
						hideButton={hideButton}
						zIndex={zIndex}
						autoHideTimeout={autoHideTimeout || autoHideDefaultTimeout}
					/>
				)
			});

			return () => dispatchSnackbar({ type: 'remove', key: snackKey });
		},
		[dispatchSnackbar, autoHideDefaultTimeout]
	);

	return (
		<>
			<SnackbarManagerContext.Provider value={createSnackbar}>
				{children}
			</SnackbarManagerContext.Provider>
			{snackbars.length > 0 && snackbars[0]}
		</>
	);
}
export { SnackbarManagerContext, SnackbarManager };
