/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { render } from '../../test-utils';
import { Container } from '../layout/Container';
import { ItemComponentProps, ItemType, List, ListProps } from './List';

describe('List', () => {
	test('Render a basic list', () => {
		type ListItemType = ItemType & { name: string };
		const items: ListProps<ListItemType>['items'] = [
			{
				id: '1',
				name: 'item 1'
			},
			{
				id: '2',
				name: 'item 2'
			}
		];

		const ItemComponent = ({ item }: ItemComponentProps<ListItemType>): JSX.Element => (
			<div key={item.id}>{item.name}</div>
		);
		render(<List items={items} ItemComponent={ItemComponent} />);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
	});

	test('Render a list with a clickable item', () => {
		type ListItemType = ItemType & {
			name: string;
			onClick: (e: React.SyntheticEvent | KeyboardEvent) => void;
		};
		const items: ListProps<ListItemType>['items'] = [
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

		const ItemComponent = ({ item }: ItemComponentProps<ListItemType>): JSX.Element => (
			<Container key={item.id} onClick={item.onClick}>
				{item.name}
			</Container>
		);
		render(<List items={items} ItemComponent={ItemComponent} />);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		userEvent.click(screen.getByText('item 1'));
		expect(items[0].onClick).toHaveBeenCalled();
		expect(items[1].onClick).not.toHaveBeenCalled();
	});
});
