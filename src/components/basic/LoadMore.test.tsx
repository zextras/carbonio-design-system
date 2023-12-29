/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { LoadMore } from './LoadMore';
import { setup } from '../../test-utils';

describe('LoadMore', () => {
	test('Render LoadMore', () => {
		const { container } = setup(<LoadMore label="Hello" />);
		expect(container).toHaveTextContent('Hello');
	});
});
