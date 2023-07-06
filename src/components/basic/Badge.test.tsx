/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';

import { Badge } from './Badge';
import { render } from '../../test-utils';

describe('Badge', () => {
	test('Render a number < 999', () => {
		const number = faker.datatype.number({
			max: 998
		});
		render(<Badge value={number} />);
		expect(screen.getByText(number)).toBeInTheDocument();
	});

	test('Render a number > 999', () => {
		const number = faker.datatype.number({
			min: 1000
		});
		render(<Badge value={number} />);
		expect(screen.getByText('999+')).toBeInTheDocument();
	});

	test('Render a number = 999', () => {
		const number = 999;
		render(<Badge value={number} />);
		expect(screen.getByText(number)).toBeInTheDocument();
	});

	test('Render a text', () => {
		const value = faker.lorem.words(1);
		render(<Badge value={value} />);
		expect(screen.getByText(value)).toBeInTheDocument();
	});
});
