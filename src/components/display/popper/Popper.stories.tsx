/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Popper } from './Popper';
import { PopperOnClick } from './Popper.stories.onClick';
import PopperOnClickStorySrc from './Popper.stories.onClick?raw';
import { PopperOnHover } from './Popper.stories.onHover';
import PopperOnHoverStorySrc from './Popper.stories.onHover?raw';
import { Button } from '../../basic/button/Button';

const meta = {
	component: Popper,
	args: {
		anchorEl: undefined,
		children: <Button label="Click me!" onClick={() => undefined} />,
		onClose: (): void => undefined
	}
} satisfies Meta<typeof Popper>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnClick = {
	render: PopperOnClick,
	parameters: { docs: { source: { code: PopperOnClickStorySrc } } }
} satisfies Story;

export const OnHover = {
	render: PopperOnHover,
	parameters: { docs: { source: { code: PopperOnHoverStorySrc } } }
} satisfies Story;
