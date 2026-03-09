/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState, useCallback } from 'react';

import { Checkbox } from './Checkbox';

export const CheckboxControlled = (): React.JSX.Element => {
	const [checked1, setChecked1] = useState(false);
	const [checked2, setChecked2] = useState(false);

	const onClick1 = useCallback(() => setChecked1((c) => !c), []);
	const onClick2 = useCallback(() => setChecked2((c) => !c), []);

	return (
		<>
			<Checkbox value={checked1} onClick={onClick1} />
			<Checkbox value={checked2} onClick={onClick2} label="I have a label!" />
			<Checkbox
				value={checked1}
				onClick={onClick1}
				label="The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! "
			/>
			<Checkbox value={checked2} onClick={onClick2} disabled label="Disabled" />
		</>
	);
};
