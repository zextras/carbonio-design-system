/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Link } from './Link';
import {
	colorArgType,
	overflowArgType,
	sizeArgType,
	textAlignArgType,
	weightArgType
} from '../../../docs/utils';

const meta = {
	component: Link,
	argTypes: {
		color: colorArgType,
		weight: weightArgType,
		size: sizeArgType,
		textAlign: textAlignArgType,
		overflow: overflowArgType
	},
	args: {
		children: 'Link'
	}
} satisfies Meta<typeof Link>;
export default meta;

type Story = StoryObj<typeof Link>;

export const Default = {} satisfies Story;

export const Underlined = {
	args: {
		children: 'Link',
		underlined: true
	}
} satisfies Story;

export const Href = {
	args: {
		children: 'Link',
		href: 'https://zextras.com/'
	}
} satisfies Story;

export const WeightBold = {
	args: {
		children: 'Link',
		weight: 'bold'
	}
} satisfies Story;

export const WeightLight = {
	args: {
		children: 'Link',
		weight: 'light'
	}
} satisfies Story;

export const WeightRegular = {
	args: {
		children: 'Link',
		weight: 'regular'
	}
} satisfies Story;

export const WeightMedium = {
	args: {
		children: 'Link',
		weight: 'medium'
	}
} satisfies Story;

export const SizeSmall = {
	args: {
		children: 'Link',
		size: 'small'
	}
} satisfies Story;

export const SizeMedium = {
	args: {
		children: 'Link',
		size: 'medium'
	}
} satisfies Story;

export const SizeLarge = {
	args: {
		children: 'Link',
		size: 'large'
	}
} satisfies Story;

export const SizeExtraLarge = {
	args: {
		children: 'Link',
		size: 'extralarge'
	}
} satisfies Story;

export const SizeExtraSmall = {
	args: {
		children: 'Link',
		size: 'extrasmall'
	}
} satisfies Story;

export const ColorPrimary = {
	args: {
		children: 'Link',
		color: 'primary'
	}
} satisfies Story;

export const ColorSecondary = {
	args: {
		children: 'Link',
		color: 'secondary'
	}
} satisfies Story;

export const ColorText = {
	args: {
		children: 'Link',
		color: 'text'
	}
} satisfies Story;

export const ColorError = {
	args: {
		children: 'Link',
		color: 'error'
	}
} satisfies Story;

export const ColorSuccess = {
	args: {
		children: 'Link',
		color: 'success'
	}
} satisfies Story;

export const ColorWarning = {
	args: {
		children: 'Link',
		color: 'warning'
	}
} satisfies Story;
