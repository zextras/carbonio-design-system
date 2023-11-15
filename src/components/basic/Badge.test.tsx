/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';

import { Badge } from './Badge';
import { setup } from '../../test-utils';

describe('Badge', () => {
	test('Render a number < 999', () => {
		const number = faker.number.int({
			max: 998
		});
		setup(<Badge value={number} />);
		expect(screen.getByText(number)).toBeInTheDocument();
	});

	test('Render a number > 999', () => {
		const number = faker.number.int({
			min: 1000
		});
		setup(<Badge value={number} />);
		expect(screen.getByText('999+')).toBeInTheDocument();
	});

	test('Render a number = 999', () => {
		const number = 999;
		setup(<Badge value={number} />);
		expect(screen.getByText(number)).toBeInTheDocument();
	});

	test('Render a text', () => {
		const value = faker.lorem.words(1);
		setup(<Badge value={value} />);
		expect(screen.getByText(value)).toBeInTheDocument();
	});
});
