/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from './Tooltip';
import { TooltipPlacement } from './Tooltip.stories.placement';
import TooltipPlacementSrc from './Tooltip.stories.placement?raw';
import { TextWithTooltip } from './Tooltip.stories.textWithTooltip';
import { placementArgType } from '../../../docs/utils';
import { Button } from '../../basic/button/Button';
import { IconCheckbox } from '../../inputs/IconCheckbox';

const meta = {
	component: Tooltip,
	parameters: {
		layout: 'centered'
	},
	args: {
		label: 'Tooltip',
		children: <Button onClick={() => undefined} label={'Button'} />
	},
	argTypes: {
		placement: placementArgType
	}
} satisfies Meta<typeof Tooltip>;

export default meta;

export type Story = StoryObj<typeof meta>;

export const Default = {
	args: {
		children: <Button onClick={() => undefined} label={'Button'} />
	}
} satisfies Story;

export const Placement = {
	render: TooltipPlacement,
	parameters: {
		docs: {
			source: {
				code: TooltipPlacementSrc
			}
		}
	}
} satisfies Story;

export const DisabledComponentButEnabledTooltip = {
	args: {
		children: <IconCheckbox disabled icon="Wifi" defaultChecked onChange={() => {}} />,
		label: 'Disable Wi-fi'
	}
} satisfies Story;

export const TooltipDisabled = {
	args: {
		children: <Button onClick={() => undefined} label={'Button'} />,
		disabled: true
	}
} satisfies Story;

export const OverflowTooltip = {
	render: TextWithTooltip,
	args: {
		label: 'The tooltip appears only if children is not fully visible!',
		overflow: 'break-word',
		overflowTooltip: true
	}
} satisfies Story;

export const TriggerDelay = {
	args: {
		children: <Button onClick={() => undefined} label={'Tooltip triggers after 2 seconds'} />,
		triggerDelay: 2000
	}
} satisfies Story;
