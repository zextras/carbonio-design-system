/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState } from 'react';

import { Radio } from './Radio';

export const MultipleRadios = (): React.JSX.Element => {
	const [selected, setSelected] = useState('option1');

	return (
		<div>
			<Radio
				label="Option 1"
				name="radio-group"
				value="option1"
				checked={selected === 'option1'}
				onChange={(value) => setSelected(value)}
			/>
			<Radio
				label="Option 2"
				name="radio-group"
				value="option2"
				checked={selected === 'option2'}
				onChange={(value) => setSelected(value)}
			/>
			<Radio
				label="Option 3"
				name="radio-group"
				value="option3"
				checked={selected === 'option3'}
				onChange={(value) => setSelected(value)}
			/>
			<Radio label="Disabled Option" name="radio-group" value="option4" disabled />
		</div>
	);
};
