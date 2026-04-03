/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { RadioGroup } from './RadioGroup';
import { Container } from '../../layout/container/Container';
import { Radio } from '../radio/Radio';
import { Switch } from '../switch/Switch';

export const DisabledRadioGroup = (): React.JSX.Element => {
	const [disabled, setDisabled] = useState(false);

	const toggleDisabled = useCallback(() => {
		setDisabled((prevState) => !prevState);
	}, []);

	return (
		<Container crossAlignment="flex-start" gap="1rem">
			<Switch label="Disable group" onClick={toggleDisabled} value={disabled} />
			<RadioGroup disabled={disabled}>
				<Radio value="r1" label="Radio 1" />
				<Radio value="r2" label="Radio 2" disabled />
				<Radio value="r3" label="Radio 3" />
			</RadioGroup>
		</Container>
	);
};
