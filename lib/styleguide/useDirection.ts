/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

type GlobalState = {
	value: 'ltr' | 'rtl';
	subscribers: Array<Dispatch<SetStateAction<GlobalState['value']>>>;
};

const globalState: GlobalState = {
	value: 'ltr',
	subscribers: []
};

export function useDirection(): [GlobalState['value'], GlobalState['subscribers'][number]] {
	const [state, setState] = useState(globalState.value);
	useEffect(() => {
		globalState.subscribers.push(setState);
	}, []);

	const setGlobalState = useCallback<GlobalState['subscribers'][number]>((value) => {
		globalState.subscribers.forEach((subscriber) => {
			subscriber((prevState) => (typeof value === 'function' ? value(prevState) : value));
		});
	}, []);

	return [state, setGlobalState];
}
