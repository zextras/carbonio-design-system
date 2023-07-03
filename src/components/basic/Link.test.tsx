/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { Link } from './Link';
import { render } from '../../test-utils';

describe('Link', () => {
	test('Render a Link', () => {
		const text = 'some content';
		render(
			<Link weight="bold" size="large" color="warning" underlined href="https://test-link.test">
				{text}
			</Link>
		);
		expect(screen.getByRole('link', { name: text })).toBeVisible();
	});
});
