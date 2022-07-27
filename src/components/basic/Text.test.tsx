/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';
import { screen } from '@testing-library/react';
import { Text } from './Text';
import { render } from '../../test-utils';

describe('Text', () => {
	test('render a text with string content', () => {
		render(<Text>ABCD</Text>);
		expect(screen.getByText('ABCD')).toBeVisible();
	});

	test('render a div with disabled attribute', () => {
		render(<Text disabled>ABCD</Text>);
		expect(screen.getByText('ABCD')).toHaveAttribute('disabled', '');
	});

	test('render text with a component as content', () => {
		render(
			<Text>
				ABC <Text>DEF</Text>
			</Text>
		);
		expect(screen.getByText('ABC')).toBeVisible();
		expect(screen.getByText('DEF')).toBeVisible();
	});
});
