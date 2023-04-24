/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { render } from '../../test-utils';
import { DateTimePicker } from './DateTimePicker';

describe('DateTimePicker', () => {
	test('Value of default input component is validated', () => {
		render(<DateTimePicker label={''} />);
	});
});
