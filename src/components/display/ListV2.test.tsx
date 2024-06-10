/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { ListItem } from './ListItem';
import { ListV2 } from './ListV2';
import { setup, triggerLoadMore } from '../../test-utils';
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

		setup(<ListV2>{listItems}</ListV2>);

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

		const { user } = setup(<ListV2>{listItems}</ListV2>);

		expect(screen.getByText('item 1')).toBeVisible();
		expect(screen.getByText('item 2')).toBeVisible();
		await user.click(screen.getByText('item 1'));
		expect(items[0].onClick).toHaveBeenCalled();
		expect(items[1].onClick).not.toHaveBeenCalled();
	});

	it('should not invoke onVisible when element is already visible and the callback reference change', async () => {
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
		const onListBottomFn1 = jest.fn();
		const onListBottomFn2 = jest.fn();

		const { rerender } = setup(<ListV2 onListBottom={onListBottomFn1}>{listItems}</ListV2>);
		triggerLoadMore();
		expect(onListBottomFn1).toHaveBeenCalledTimes(1);
		rerender(<ListV2 onListBottom={onListBottomFn2}>{listItems}</ListV2>);
		expect(onListBottomFn1).toHaveBeenCalledTimes(1);
		expect(onListBottomFn2).toHaveBeenCalledTimes(0);
	});
});
