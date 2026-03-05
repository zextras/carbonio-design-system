/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Text } from './Text';
import { colorArgType, sizeArgType, textAlignArgType } from '../../../docs/utils';

const meta = {
	component: Text,
	argTypes: {
		color: colorArgType,
		size: sizeArgType,
		textAlign: textAlignArgType
	},
	args: {
		children: 'Lorem Ipsum dolor sit amet'
	}
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Default = {} satisfies Story;

export const Size = {
	args: {
		size: 'extralarge'
	}
} satisfies Story;

export const Color = {
	args: {
		color: 'primary'
	}
} satisfies Story;

export const Weight = {
	args: {
		weight: 'bold'
	}
} satisfies Story;

export const Overflow = {
	args: {
		overflow: 'break-word',
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et augue risus. In fringilla sodales augue eu porttitor. Integer faucibus aliquam venenatis. Fusce eleifend sodales tellus vel malesuada. Mauris posuere diam ac tellus sollicitudin porta. Vestibulum pretium nulla nulla, vel blandit elit fringilla quis. Quisque neque nisl, condimentum malesuada turpis ac, viverra fermentum est. Nullam dui arcu, imperdiet quis placerat viverra, euismod eget odio. Ut id accumsan neque, vitae varius urna. Vestibulum scelerisque, velit eget mollis faucibus, libero nunc accumsan arcu, a dignissim ligula nunc nec nibh. Cras efficitur lobortis purus sit amet suscipit. Quisque pretium metus ut erat sagittis sollicitudin. Maecenas varius nisi eget rhoncus euismod.'
	}
} satisfies Story;

export const Disabled = {
	args: {
		disabled: true
	}
} satisfies Story;

export const Italic = {
	args: {
		italic: true
	}
} satisfies Story;

export const TextAlign = {
	args: {
		textAlign: 'right'
	}
} satisfies Story;

export const LineHeight = {
	args: {
		lineHeight: 2,
		overflow: 'break-word',
		children:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et augue risus. In fringilla sodales augue eu porttitor. Integer faucibus aliquam venenatis. Fusce eleifend sodales tellus vel malesuada. Mauris posuere diam ac tellus sollicitudin porta. Vestibulum pretium nulla nulla, vel blandit elit fringilla quis. Quisque neque nisl, condimentum malesuada turpis ac, viverra fermentum est. Nullam dui arcu, imperdiet quis placerat viverra, euismod eget odio. Ut id accumsan neque, vitae varius urna. Vestibulum scelerisque, velit eget mollis faucibus, libero nunc accumsan arcu, a dignissim ligula nunc nec nibh. Cras efficitur lobortis purus sit amet suscipit. Quisque pretium metus ut erat sagittis sollicitudin. Maecenas varius nisi eget rhoncus euismod.'
	}
} satisfies Story;
