/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { render } from '../../test-utils';
import Button from '../basic/Button';
import Dropdown from './Dropdown';

const items = [
	{
		id: 'activity-1',
		icon: 'Activity',
		label: 'Some Item',
		click: () => console.log('click1')
	},
	{
		id: 'activity-2',
		icon: 'Plus',
		label: 'Some Other Item',
		click: () => console.log('click2'),
		disabled: true
	},
	{
		id: 'activity-3',
		icon: 'Activity',
		label: 'Yet Another Item',
		click: () => console.log('click3')
	}
];

describe('Dropdown', () => {
	const item1 = () => screen.getByText('Some Item');
	const item2 = () => screen.getByText('Some Other Item');
	const item3 = () => screen.getByText('Yet Another Item');

	test('Render closed dropdown', () => {
		render(
			<>
				<Dropdown items={items} placement="bottom-end">
					<Button icon="ArrowDown" label="Create" />
				</Dropdown>
			</>
		);

		expect(item1).toThrowError();
		expect(item2).toThrowError();
		expect(item3).toThrowError();
	});

	test('Render opened dropdown', () => {
		render(
			<>
				<Dropdown items={items} placement="bottom-end">
					<Button icon="ArrowDown" label="Create" />
				</Dropdown>
			</>
		);

		userEvent.click(screen.getByRole('button'));

		expect(item1()).toBeInTheDocument();
		expect(item2()).toBeInTheDocument();
		expect(item3()).toBeInTheDocument();
	});
});
