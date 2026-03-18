/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ArgTypes, Meta, StoryObj } from '@storybook/react-webpack5';

import { FileLoader } from './FileLoader';
import { colorArgType } from '../../../docs/utils';
import type { ButtonProps } from '../../basic/button/Button';

const shape: NonNullable<ButtonProps['shape']>[] = ['regular', 'round'];
const iconPlacement: NonNullable<ButtonProps['iconPlacement']>[] = ['left', 'right'];
const size: NonNullable<ButtonProps['size']>[] = [
	'extrasmall',
	'small',
	'medium',
	'large',
	'extralarge'
];

const shapeArgType: ArgTypes[string] = {
	control: {
		type: 'radio'
	},
	options: shape
};

const iconPlacementArgType: ArgTypes[string] = {
	control: {
		type: 'radio'
	},
	options: iconPlacement
};

const sizeArgType: ArgTypes[string] = {
	control: {
		type: 'select'
	},
	options: size
};

const meta = {
	component: FileLoader,
	args: {
		icon: 'Attach',
		type: 'ghost'
	},
	argTypes: {
		icon: { control: 'text' },
		iconPlacement: iconPlacementArgType,
		shape: shapeArgType,
		color: colorArgType,
		backgroundColor: colorArgType,
		labelColor: colorArgType,
		size: sizeArgType
	}
} satisfies Meta<typeof FileLoader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;
