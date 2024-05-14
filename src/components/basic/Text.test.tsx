/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { Text } from './Text';
import { setup } from '../../test-utils';

describe('Text', () => {
	test('render a text with string content', () => {
		setup(<Text>ABCD</Text>);
		expect(screen.getByText('ABCD')).toBeVisible();
	});

	test('render text with a component as content', () => {
		setup(
			<Text>
				ABC <Text>DEF</Text>
			</Text>
		);
		expect(screen.getByText('ABC')).toBeVisible();
		expect(screen.getByText('DEF')).toBeVisible();
	});
});
