/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import { Meta, StoryObj } from '@storybook/react';

import { Text } from './Text';
import { colorArgTypeControl } from '../../../docs/utils';

const meta = {
	component: Text,
	argTypes: {
		color: colorArgTypeControl
	}
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Base: Story = {
	args: {
		children: 'Lorem Ipsum dolor sit amet'
	}
};

export const Size: Story = {
	args: {
		...Base.args,
		size: 'extralarge'
	}
};

export const Color: Story = {
	args: {
		...Base.args,
		color: 'primary'
	}
};

export const Weight: Story = {
	args: {
		...Base.args,
		weight: 'bold'
	}
};

export const Overflow: Story = {
	args: {
		overflow: 'break-word',
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et augue risus. In fringilla sodales augue eu porttitor. Integer faucibus aliquam venenatis. Fusce eleifend sodales tellus vel malesuada. Mauris posuere diam ac tellus sollicitudin porta. Vestibulum pretium nulla nulla, vel blandit elit fringilla quis. Quisque neque nisl, condimentum malesuada turpis ac, viverra fermentum est. Nullam dui arcu, imperdiet quis placerat viverra, euismod eget odio. Ut id accumsan neque, vitae varius urna. Vestibulum scelerisque, velit eget mollis faucibus, libero nunc accumsan arcu, a dignissim ligula nunc nec nibh. Cras efficitur lobortis purus sit amet suscipit. Quisque pretium metus ut erat sagittis sollicitudin. Maecenas varius nisi eget rhoncus euismod.'
	}
};

export const Disabled: Story = {
	args: {
		...Base.args,
		disabled: true
	}
};

export const Italic: Story = {
	args: {
		...Base.args,
		italic: true
	}
};

export const TextAlign: Story = {
	args: {
		...Base.args,
		textAlign: 'right'
	}
};

export const LineHeight: Story = {
	args: {
		lineHeight: 2,
		overflow: 'break-word',
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et augue risus. In fringilla sodales augue eu porttitor. Integer faucibus aliquam venenatis. Fusce eleifend sodales tellus vel malesuada. Mauris posuere diam ac tellus sollicitudin porta. Vestibulum pretium nulla nulla, vel blandit elit fringilla quis. Quisque neque nisl, condimentum malesuada turpis ac, viverra fermentum est. Nullam dui arcu, imperdiet quis placerat viverra, euismod eget odio. Ut id accumsan neque, vitae varius urna. Vestibulum scelerisque, velit eget mollis faucibus, libero nunc accumsan arcu, a dignissim ligula nunc nec nibh. Cras efficitur lobortis purus sit amet suscipit. Quisque pretium metus ut erat sagittis sollicitudin. Maecenas varius nisi eget rhoncus euismod.'
	}
};
