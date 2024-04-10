/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useReducer, createContext } from 'react';

import { Snackbar, SnackbarProps } from '../feedback/Snackbar';

type CreateSnackbarFn = (props: SnackbarProps & { key?: string; replace?: boolean }) => void;

const SnackbarManagerContext = createContext<CreateSnackbarFn | undefined>(undefined);

const SNACKBAR_ACTION = {
	PUSH: 'push',
	POP: 'pop',
	POP_AND_PREPEND: 'pop_and_prepend',
	REMOVE: 'remove'
} as const;

type SnackbarAction =
	| {
			type: typeof SNACKBAR_ACTION.PUSH;
			value: React.JSX.Element;
	  }
	| { type: typeof SNACKBAR_ACTION.POP }
	| { type: typeof SNACKBAR_ACTION.POP_AND_PREPEND; value: React.JSX.Element }
	| { type: typeof SNACKBAR_ACTION.REMOVE; key: string };

function snackbarsReducer(state: React.JSX.Element[], action: SnackbarAction): React.JSX.Element[] {
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

type SnackbarManagerProps = React.PropsWithChildren<{
	autoHideDefaultTimeout?: number;
}>;

function SnackbarManager({
	children,
	autoHideDefaultTimeout
}: SnackbarManagerProps): React.JSX.Element {
	const [snackbars, dispatchSnackbar] = useReducer(snackbarsReducer, []);

	const createSnackbar = useCallback<CreateSnackbarFn>(
		({
			label,
			key,
			type = 'info',
			severity = type,
			onActionClick,
			onClose,
			autoHideTimeout,
			replace,
			...rest
		}) => {
			const handleClose = (): void => {
				onClose && onClose();
				dispatchSnackbar({ type: SNACKBAR_ACTION.POP });
			};
			const handleActionClick = (): void => {
				onActionClick ? onActionClick() : onClose && onClose();
				dispatchSnackbar({ type: SNACKBAR_ACTION.POP });
			};
			const snackKey = key ?? `${severity}-${label}`;

			dispatchSnackbar({
				type: replace ? SNACKBAR_ACTION.POP_AND_PREPEND : SNACKBAR_ACTION.PUSH,
				value: (
					<Snackbar
						key={snackKey}
						open
						severity={severity}
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
export {
	SnackbarManagerContext,
	SnackbarManager,
	type SnackbarManagerProps,
	type CreateSnackbarFn
};
