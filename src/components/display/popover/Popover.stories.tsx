/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Popover } from './Popover';
import { PopoverOnClick } from './Popover.onClick';
import PopoverOnClickStorySrc from './Popover.onClick?raw';
import { PopoverOnHover } from './Popover.onHover';
import PopoverOnHoverStorySrc from './Popover.onHover?raw';
import { Button } from '../../basic/button/Button';

const meta = {
	component: Popover,
	args: {
		anchorEl: undefined,
		children: <Button label="Click me!" onClick={() => undefined} />,
		onClose: (): void => undefined
	}
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnClick = {
	render: PopoverOnClick,
	parameters: { docs: { source: { code: PopoverOnClickStorySrc } } }
} satisfies Story;

export const OnHover = {
	render: PopoverOnHover,
	parameters: { docs: { source: { code: PopoverOnHoverStorySrc } } }
} satisfies Story;
