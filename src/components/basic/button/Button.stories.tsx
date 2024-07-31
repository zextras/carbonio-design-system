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
};

export const Color = {
	args: {
		color: 'warning',
		labelColor: 'error'
	}
};

export const Type = {
	args: { type: 'outlined' }
};

export const Icon = {
	args: {
		icon: 'AppointmentOutline'
	}
};

export const Size = {
	args: {
		size: 'extralarge'
	}
};

export const Width = {
	args: {
		width: 'fill'
	}
};

export const Shape = {
	args: {
		shape: 'round'
	}
};

export const ForceActive = {
	args: {
		forceActive: true
	}
};

export const Disabled = {
	args: {
		disabled: true
	}
};

export const IconPlacement = {
	args: {
		icon: 'AppointmentOutline',
		iconPlacement: 'left'
	}
};

export const Loading = {
	args: {
		loading: true
	}
};

export const SecondaryAction = {
	args: {
		icon: 'AppointmentOutline',
		secondaryAction: { onClick: fn(), icon: 'ChevronDown' }
	}
};
