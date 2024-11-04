/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: Button,
	args: {
		onClick: fn(),
		label: 'click'
	},
	argTypes: {
		color: colorArgType,
		backgroundColor: colorArgType,
		labelColor: colorArgType,
		icon: { control: 'text' }
	}
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base = {
	args: { label: 'click here' }
} satisfies Story;

export const Label = {
	args: {
		label: 'Label'
	}
} satisfies Story;

export const Color = {
	args: {
		backgroundColor: 'warning',
		labelColor: 'error'
	}
} satisfies Story;

export const Type = {
	args: { type: 'outlined' }
} satisfies Story;

export const Icon = {
	args: {
		icon: 'AppointmentOutline'
	}
} satisfies Story;

export const Size = {
	args: {
		size: 'extralarge'
	}
} satisfies Story;

export const Width = {
	args: {
		width: 'fill'
	}
} satisfies Story;

export const Shape = {
	args: {
		shape: 'round'
	}
} satisfies Story;

export const ForceActive = {
	args: {
		forceActive: true
	}
} satisfies Story;

export const Disabled = {
	args: {
		disabled: true
	}
} satisfies Story;

export const IconPlacement = {
	args: {
		icon: 'AppointmentOutline',
		iconPlacement: 'left'
	}
} satisfies Story;

export const Loading = {
	args: {
		loading: true
	}
} satisfies Story;

export const SecondaryAction = {
	args: {
		icon: 'AppointmentOutline',
		secondaryAction: { onClick: fn(), icon: 'ChevronDown' }
	}
} satisfies Story;
