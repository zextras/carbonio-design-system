/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { useEffect, useState, useMemo, useCallback } from 'react';
import { getKeyboardPreset, useKeyboard } from './useKeyboard';

function useCheckbox({ ref, value, defaultChecked, disabled, onClick, onChange }) {
	const [checked, setChecked] = useState(value || defaultChecked || false);

	const uncontrolledMode = useMemo(() => typeof value === 'undefined', [value]);
	const handleClick = useCallback(
		(ev) => {
			if (!disabled) {
				if (uncontrolledMode) {
					setChecked((check) => !check);
				}
				if (onClick) {
					onClick(ev);
				}
			}
		},
		[disabled, uncontrolledMode, onClick]
	);

	const keyEvents = useMemo(() => getKeyboardPreset('button', handleClick), [handleClick]);
	useKeyboard(ref, keyEvents);

	useEffect(() => {
		typeof value !== 'undefined' && setChecked(value);
	}, [value]);

	useEffect(() => {
		onChange && onChange(checked);
	}, [onChange, checked]);

	useEffect(() => {
		ref.current && ref.current.addEventListener('click', handleClick);
		const refSave = ref.current;
		return () => {
			refSave && refSave.removeEventListener('click', handleClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref.current, handleClick]);

	return checked;
}

export { useCheckbox };
