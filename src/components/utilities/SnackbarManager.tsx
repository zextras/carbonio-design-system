/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useReducer, createContext } from 'react';

import { Snackbar, SnackbarProps } from '../feedback/Snackbar';

interface CreateSnackbarFnArgs extends Omit<SnackbarProps, 'open'> {
	/** Component key */
	key?: string;
	/**
	 * Define the behavior over the previous snackbar in the stack.
	 * When true, hide the previous snackbar, show this snackbar immediately, by placing it at the head of the stack.
	 * When false, place the snackbar as last of the stack and show it when all the previous disappears.
	 */
	replace?: boolean;
}

type CloseSnackbarFn = () => void;
type CreateSnackbarFn = (props: CreateSnackbarFnArgs) => CloseSnackbarFn;

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
		({ label, key, type = 'info', onActionClick, onClose, autoHideTimeout, replace, ...rest }) => {
			const handleClose = (): void => {
				onClose?.();
				dispatchSnackbar({ type: SNACKBAR_ACTION.POP });
			};
			const handleActionClick = (): void => {
				onActionClick ? onActionClick() : onClose?.();
				dispatchSnackbar({ type: SNACKBAR_ACTION.POP });
			};
			const snackKey = key ?? `${type}-${label}`;

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
						autoHideTimeout={autoHideTimeout ?? autoHideDefaultTimeout}
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
	type CreateSnackbarFn,
	type CreateSnackbarFnArgs,
	type CloseSnackbarFn
};
