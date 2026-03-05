/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Checkbox } from './Checkbox';

export const CheckboxUncontrolled = (): React.JSX.Element => (
	<>
		<Checkbox defaultChecked onChange={console.log} />
		<Checkbox defaultChecked={false} onChange={console.log} label="I have a label!" />
	</>
);
