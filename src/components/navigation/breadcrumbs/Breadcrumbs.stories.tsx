/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbsCollapsed } from './Breadcrumbs.stories.collapsed';
import { BreadcrumbsDragAndDrop } from './Breadcrumbs.stories.dragDrop';
import { BreadcrumbsPseudoClasses } from './Breadcrumbs.stories.preusoClasses';

const meta = {
	component: Breadcrumbs,
	args: {
		crumbs: [
			{ id: 'Home', label: 'Home' },
			{ id: 'Services', label: 'Services' },
			{ id: 'Products', label: 'Products' }
		]
	}
} satisfies Meta<typeof Breadcrumbs>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const Collapsed = {
	render: BreadcrumbsCollapsed
} satisfies Story;

export const DragAndDrop = {
	render: BreadcrumbsDragAndDrop
} satisfies Story;

export const Pseudoclasses = {
	render: BreadcrumbsPseudoClasses
} satisfies Story;
