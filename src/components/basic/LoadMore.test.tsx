/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { LoadMore } from './LoadMore';
import { render } from '../../test-utils';

describe('LoadMore', () => {
	test('Render LoadMore', () => {
		const { container } = render(<LoadMore label="Hello" />);
		expect(container).toHaveTextContent('Hello');
	});
});
