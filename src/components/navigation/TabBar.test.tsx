/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen, within } from '@testing-library/react';

import { DefaultTabBarItem, DefaultTabBarItemProps, TabBar } from './TabBar';
import { setup } from '../../test-utils';
import { Text } from '../basic/text/Text';

describe('TabBar', () => {
	test('The visually selected element always reflects the selected TabBar prop', async () => {
		const ReusedDefaultTabBar = ({
			item,
			selected,
			onClick,
			forceWidthEquallyDistributed,
			...rest
		}: DefaultTabBarItemProps): React.JSX.Element => (
			<DefaultTabBarItem
				item={item}
				selected={selected}
				onClick={onClick}
				orientation="horizontal"
				forceWidthEquallyDistributed={forceWidthEquallyDistributed}
				{...rest}
				background="secondary"
				underlineColor="primary"
			>
				<Text size="large">{`${item.label} is ${selected ? 'selected' : 'not selected'}`} </Text>
			</DefaultTabBarItem>
		);

		const items = [
			{ id: 'tab-one', label: 'First Tab', CustomComponent: ReusedDefaultTabBar },
			{ id: 'tab-two', label: 'Second Tab', CustomComponent: ReusedDefaultTabBar }
		];

		const changeFn = jest.fn();
		const { rerender, user } = setup(
			<TabBar items={items} selected={'tab-one'} onChange={changeFn} background="secondary" />
		);
		const teb0 = screen.getByTestId('tab0');
		expect(within(teb0).getByText('First Tab is selected')).toBeVisible();

		const tab1 = screen.getByTestId('tab1');
		expect(within(tab1).getByText('Second Tab is not selected')).toBeVisible();

		await user.click(tab1);

		expect(changeFn).toHaveBeenCalled();

		// the second tab is clicked but is not selected until the new selected TabBar prop is provided
		expect(within(teb0).getByText('First Tab is selected')).toBeVisible();
		expect(within(tab1).getByText('Second Tab is not selected')).toBeVisible();

		// simulate the change of selected item
		rerender(
			<TabBar items={items} selected={'tab-two'} onChange={changeFn} background="secondary" />
		);

		expect(within(teb0).getByText('First Tab is not selected')).toBeVisible();
		expect(within(tab1).getByText('Second Tab is selected')).toBeVisible();
	});
});
