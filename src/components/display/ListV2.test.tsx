/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ListItem } from './ListItem';
import { ListV2 } from './ListV2';
import { render } from '../../test-utils';
import { Container } from '../layout/Container';

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

		render(<ListV2>{listItems}</ListV2>);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
	});

	test('Render a list with a clickable item', () => {
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

		render(<ListV2>{listItems}</ListV2>);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		userEvent.click(screen.getByText('item 1'));
		expect(items[0].onClick).toHaveBeenCalled();
		expect(items[1].onClick).not.toHaveBeenCalled();
	});
});
