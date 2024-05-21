/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Quota } from './Quota';
import { screen, setup } from '../../../test-utils';
import { SELECTORS } from '../../../testUtils/constants';

describe('Quota', () => {
	it('should render correctly', () => {
		setup(<Quota fill={50} />);
		expect(screen.getByTestId(SELECTORS.quota)).toBeVisible();
	});
});
