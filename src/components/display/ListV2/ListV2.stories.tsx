/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { ListV2, ListV2Props } from './ListV2';
import { PaginatedList } from './ListV2.stories.paginated';
import { WithComplexItem } from './ListV2.stories.withComplexItem';
import { Container } from '../../layout/Container';
import { ListItem } from '../ListItem';

const meta = {
	component: ListV2,
	args: {
		height: '50vh',
		borderColor: 'info'
	}
} satisfies Meta<typeof ListV2>;

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
} satisfies StoryObj<ListV2Props & { limit: number }>;

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
