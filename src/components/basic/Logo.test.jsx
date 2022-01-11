/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { render } from '../../test-utils';
import Logo from './Logo';

describe('Logo', () => {
	test('Render Logo', () => {
		const { container } = render(<Logo size="large" />);
		expect(container).toBeInTheDocument();
	});
});
