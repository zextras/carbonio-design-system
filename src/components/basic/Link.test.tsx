/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { faker } from '@faker-js/faker';
import { render } from '../../test-utils';
import { Link } from './Link';

describe('Link', () => {
	const text = faker.lorem.words(3);
	test('Render a Link', () => {
		const { container } = render(
			<Link weight="bold" size="large" color="warning" underlined>
				{text}
			</Link>
		);
		expect(container.querySelector('a')).toBeInTheDocument();
		expect(container.querySelector('a')).toHaveTextContent(text);
	});
});
