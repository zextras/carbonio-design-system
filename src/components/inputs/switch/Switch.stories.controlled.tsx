/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { Switch } from './Switch';

export const SwitchControlled = (): React.JSX.Element => {
	const [checked1, setChecked1] = useState(false);
	const [checked2, setChecked2] = useState(false);

	const onClick1 = useCallback(() => setChecked1((c) => !c), []);
	const onClick2 = useCallback(() => setChecked2((c) => !c), []);

	return (
		<>
			<Switch value={checked1} onClick={onClick1} />
			<Switch size={'small'} value={checked1} onClick={onClick1} />
			<Switch value={checked2} onClick={onClick2} label="I have a label!" />
			<Switch value={checked2} onClick={onClick2} disabled label="Disabled" />
		</>
	);
};
