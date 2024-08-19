/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Divider } from './Divider';
import { screen, setup } from '../../../test-utils';
import { SELECTORS } from '../../../testUtils/constants';
import { Theme } from '../../../theme/theme';

describe('Divider', () => {
	it('should render correctly', () => {
		setup(<Divider />);
		const divider = screen.getByTestId(SELECTORS.divider);
		expect(divider).toBeVisible();
		expect(divider).toHaveStyle({ backgroundColor: Theme.palette.gray2.regular });
	});

	it('should render color correctly', () => {
		setup(<Divider color={'primary'} />);
		const divider = screen.getByTestId(SELECTORS.divider);
		expect(divider).toHaveStyle({ backgroundColor: Theme.palette.primary.regular });
	});
});
