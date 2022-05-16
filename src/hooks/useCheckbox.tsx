/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { getKeyboardPreset, useKeyboard } from './useKeyboard';

type UseCheckboxArgs = {
	ref: React.RefObject<HTMLElement>;
	value?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	onClick?: (event: Event) => void;
	onChange?: (newValue: boolean) => void;
};

function useCheckbox({
	ref,
	value,
	defaultChecked,
	disabled,
	onClick,
	onChange
}: UseCheckboxArgs): boolean {
	const [checked, setChecked] = useState<boolean>(value || defaultChecked || false);

	const uncontrolledMode = useMemo(() => value === undefined, [value]);

	const handleClick = useCallback(
		(ev: Event) => {
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
		value !== undefined && setChecked(value);
	}, [value]);

	useEffect(() => {
		onChange && onChange(checked);
	}, [onChange, checked]);

	useEffect(() => {
		const refSave = ref.current;
		refSave && refSave.addEventListener('click', handleClick);
		return () => {
			refSave && refSave.removeEventListener('click', handleClick);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref.current, handleClick]);

	return checked;
}

export { useCheckbox, UseCheckboxArgs };
