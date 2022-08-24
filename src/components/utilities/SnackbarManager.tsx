/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useReducer, createContext } from 'react';
import { Snackbar, SnackbarProps } from '../feedback/Snackbar';

type CreateSnackbarFn = (props: SnackbarProps & { key?: string; replace?: boolean }) => void;

const SnackbarManagerContext = createContext<CreateSnackbarFn>(() =>
	console.error('snackbar manager context not initialized')
);

const SNACKBAR_ACTION = {
	PUSH: 'push',
	POP: 'pop',
	POP_AND_PREPEND: 'pop_and_prepend',
	REMOVE: 'remove'
} as const;

type SnackbarAction =
	| {
			type: typeof SNACKBAR_ACTION.PUSH;
			value: JSX.Element;
	  }
	| { type: typeof SNACKBAR_ACTION.POP }
	| { type: typeof SNACKBAR_ACTION.POP_AND_PREPEND; value: JSX.Element }
	| { type: typeof SNACKBAR_ACTION.REMOVE; key: string };

function snackbarsReducer(state: JSX.Element[], action: SnackbarAction): JSX.Element[] {
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

interface SnackbarManagerProps {
	autoHideDefaultTimeout?: number;
	children: React.ReactNode | React.ReactNode[];
}

function SnackbarManager({ children, autoHideDefaultTimeout }: SnackbarManagerProps): JSX.Element {
	const [snackbars, dispatchSnackbar] = useReducer(snackbarsReducer, []);

	const createSnackbar = useCallback<CreateSnackbarFn>(
		({ label, key, type = 'info', onActionClick, onClose, autoHideTimeout, replace, ...rest }) => {
			const handleClose = (): void => {
				onClose && onClose();
				dispatchSnackbar({ type: SNACKBAR_ACTION.POP });
			};
			const handleActionClick = (): void => {
				onActionClick ? onActionClick() : onClose && onClose();
				dispatchSnackbar({ type: SNACKBAR_ACTION.POP });
			};
			const snackKey = key || `${type}-${label}`;

			dispatchSnackbar({
				type: replace ? SNACKBAR_ACTION.POP_AND_PREPEND : SNACKBAR_ACTION.PUSH,
				value: (
					<Snackbar
						key={snackKey}
						open
						type={type}
						label={label}
						onActionClick={handleActionClick}
						onClose={handleClose}
						autoHideTimeout={autoHideTimeout || autoHideDefaultTimeout}
						{...rest}
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
export { SnackbarManagerContext, SnackbarManager, SnackbarManagerProps, CreateSnackbarFn };
