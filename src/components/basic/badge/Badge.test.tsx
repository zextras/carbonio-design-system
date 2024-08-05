/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { screen, within } from '@testing-library/react';

import { Badge } from './Badge';
import { setup } from '../../../test-utils';
import { TIMERS } from '../../constants';

describe('Badge', () => {
	describe('Value and maxValues', () => {
		it('should render the number if is less than 999', () => {
			const number = faker.number.int({
				max: 998
			});
			setup(<Badge value={number} />);
			expect(screen.getByText(number)).toBeVisible();
		});

		it('should render 999+ if the value is higher than 999 by default (maxValue is not set)', () => {
			const minValue = 1000;
			const number = faker.number.int({
				min: minValue
			});
			setup(<Badge value={number} />);
			expect(screen.queryByText(minValue)).not.toBeInTheDocument();
			expect(screen.getByText('999+')).toBeVisible();
		});

		it('should render the maxValue with + if the value is higher than the maxValue set', () => {
			const number = faker.number.int({ min: 2001 });
			const maxValue = 2000;
			setup(<Badge value={number} maxValue={maxValue} />);
			expect(screen.getByText(`${maxValue}+`)).toBeVisible();
		});

		it('should render a number = 999', () => {
			const number = 999;
			setup(<Badge value={number} />);
			expect(screen.getByText(number)).toBeVisible();
		});

		it('should render the text it the value is a string', () => {
			const value = faker.lorem.words(1);
			setup(<Badge value={value} />);
			expect(screen.getByText(value)).toBeVisible();
		});

		it('should render the tooltip if the value is higher than the maxValue', async () => {
			const number = faker.number.int({ min: 2001 });
			const maxValue = 2000;
			const { user } = setup(<Badge value={number} maxValue={maxValue} />);
			// wait for tooltip to register listeners
			jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
			await user.hover(screen.getByText(`${maxValue}+`));
			const tooltip = await screen.findByTestId('tooltip');
			expect(within(tooltip).getByText(number)).toBeVisible();
		});
	});

	describe('Icon', () => {
		it('should render the icon if it is set', () => {
			setup(<Badge icon={'BulbOutline'} />);
			expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
		});
	});
});
