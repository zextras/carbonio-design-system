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
		underlined: true
	}
} satisfies Story;

export const Href = {
	args: {
		href: 'https://zextras.com/'
	}
} satisfies Story;

export const WeightBold = {
	args: {
		weight: 'bold'
	}
} satisfies Story;

export const WeightLight = {
	args: {
		weight: 'light'
	}
} satisfies Story;

export const WeightRegular = {
	args: {
		weight: 'regular'
	}
} satisfies Story;

export const WeightMedium = {
	args: {
		weight: 'medium'
	}
} satisfies Story;

export const SizeSmall = {
	args: {
		size: 'small'
	}
} satisfies Story;

export const SizeMedium = {
	args: {
		size: 'medium'
	}
} satisfies Story;

export const SizeLarge = {
	args: {
		size: 'large'
	}
} satisfies Story;

export const SizeExtraLarge = {
	args: {
		size: 'extralarge'
	}
} satisfies Story;

export const SizeExtraSmall = {
	args: {
		size: 'extrasmall'
	}
} satisfies Story;

export const ColorPrimary = {
	args: {
		color: 'primary'
	}
} satisfies Story;

export const ColorSecondary = {
	args: {
		color: 'secondary'
	}
} satisfies Story;

export const ColorText = {
	args: {
		color: 'text'
	}
} satisfies Story;

export const ColorError = {
	args: {
		color: 'error'
	}
} satisfies Story;

export const ColorSuccess = {
	args: {
		color: 'success'
	}
} satisfies Story;

export const ColorWarning = {
	args: {
		color: 'warning'
	}
} satisfies Story;
