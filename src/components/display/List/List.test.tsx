/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { List } from './List';
import { setup } from '../../../test-utils';
import { Container } from '../../layout/Container';
import { ListItem } from '../ListItem';

describe('List', () => {
	test('Render a basic list', () => {
		const items = [
			{
				id: '1',
				name: 'item 1'
			},
			{
				id: '2',
				name: 'item 2'
			}
		];

		const listItems = items.map((item) => (
			<ListItem key={item.id}>{(): React.JSX.Element => <div>{item.name}</div>}</ListItem>
		));

		setup(<List>{listItems}</List>);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
	});

	test('Render a list with a clickable item', async () => {
		const items = [
			{
				id: '1',
				name: 'item 1',
				onClick: jest.fn()
			},
			{
				id: '2',
				name: 'item 2',
				onClick: jest.fn()
			}
		];

		const listItems = items.map((item) => (
			<ListItem key={item.id}>
				{(): React.JSX.Element => (
					<Container key={item.id} onClick={item.onClick}>
						{item.name}
					</Container>
				)}
			</ListItem>
		));

		const { user } = setup(<List>{listItems}</List>);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		await user.click(screen.getByText('item 1'));
		expect(items[0].onClick).toHaveBeenCalled();
		expect(items[1].onClick).not.toHaveBeenCalled();
	});
});
