/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import type { ListProps } from './List';
import { List } from './List';
import { InsideCustomModal } from './List.stories.insideCustomModal';
import { InsideModal } from './List.stories.insideModal';
import { OnlyListInsideModal } from './List.stories.onlyListInsideModal';
import { PaginatedList } from './List.stories.paginated';
import { SomethingElseInsideModal } from './List.stories.somethingElseInsideModal';
import { WithComplexItem } from './List.stories.withComplexItem';
import { Container } from '../../layout/container/Container';
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
	},
	parameters: {
		visualTest: {
			waitTime: 1000
		}
	}
} satisfies StoryObj<ListProps & { limit: number }>;

export const WithComplexListItem = {
	args: {
		children: []
	},
	render: WithComplexItem,
	parameters: {
		visualTest: {
			skip: true
		}
	}
} satisfies Story;

export const WithCustomBackground = {
	args: {
		children: [],
		selectedBackground: 'success',
		activeBackground: 'warning'
	},
	render: WithComplexItem,
	parameters: {
		visualTest: {
			skip: true
		}
	}
} satisfies Story;

export const OnlyListInsideModalStory = {
	name: 'Only List Inside Modal',
	args: {
		children: [],
		selectedBackground: 'success',
		activeBackground: 'warning'
	},
	render: OnlyListInsideModal,
	parameters: {
		visualTest: {
			skip: true
		}
	}
} satisfies Story;

export const ListInsideModal = {
	name: 'List And Something Else Inside Modal',
	args: {
		children: [],
		selectedBackground: 'success',
		activeBackground: 'warning'
	},
	render: InsideModal,
	parameters: {
		visualTest: {
			skip: true
		}
	}
} satisfies Story;

export const ListInsideCustomModal = {
	args: {
		children: [],
		selectedBackground: 'success',
		activeBackground: 'warning'
	},
	render: InsideCustomModal,
	parameters: {
		visualTest: {
			skip: true
		}
	}
} satisfies Story;

export const SomethingInsideModal = {
	name: 'Something else inside modal',
	args: {
		children: [],
		selectedBackground: 'success',
		activeBackground: 'warning'
	},
	render: SomethingElseInsideModal,
	parameters: {
		visualTest: {
			skip: true
		}
	}
};
