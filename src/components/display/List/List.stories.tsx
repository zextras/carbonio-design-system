/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { List, ListProps } from './List';
import { PaginatedList } from './List.stories.paginated';
import { WithComplexItem } from './List.stories.withComplexItem';
import { Container } from '../../layout/Container';
import { ListItem } from '../ListItem';

const meta = {
	component: List,
	args: {
		height: '50vh',
		borderColor: 'info'
	}
} satisfies Meta<typeof List>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Basic = {
	args: {
		children: Array(100)
			.fill('')
			.map((item, index) => ({
				id: `${index}`,
				name: `Item ${index}`
			}))
			.map((item) => (
				<ListItem key={item.id}>
					{(visible) => <Container height={'50px'}>{visible && <div>{item.name}</div>}</Container>}
				</ListItem>
			))
	}
} satisfies Story;

export const WithPagination = {
	render: PaginatedList,
	args: {
		limit: 3
	}
} satisfies StoryObj<ListProps & { limit: number }>;

export const WithComplexListItem = {
	args: {
		children: []
	},
	render: WithComplexItem
} satisfies Story;

export const WithCustomBackground = {
	args: {
		children: [],
		selectedBackground: 'success',
		activeBackground: 'warning'
	},
	render: WithComplexItem
} satisfies Story;
