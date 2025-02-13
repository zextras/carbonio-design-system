/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import {Tooltip, type TooltipProps} from './Tooltip';
import { TooltipPlacement } from './Tooltip.stories.placement';
import TooltipPlacementSrc from './Tooltip.stories.placement?raw';
import { TextWithTooltip } from './Tooltip.stories.textWithTooltip';
import { placementArgType } from '../../../docs/utils';
import { Button } from '../../basic/button/Button';
import { IconCheckbox } from '../../inputs/IconCheckbox';
import {Text} from "../../basic/text/Text";
import {Container} from "../../layout/container/Container";
import {Icon} from "../../basic/icon/Icon";
import {Padding} from "../../layout/Padding";

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
		label: 'This child wont dismiss the tooltip',
		overflow: 'break-word',
		overflowTooltip: true
	}
} satisfies Story;

const MultipleTooltip = (props: TooltipProps): React.JSX.Element => (
	<Container width={'2000px'} background={'red'}>
		<Text>This red container has no tooltips</Text>
		<Tooltip label={'green tooltip'} placement={'top'}>
			<Container width={'1000px'} background={'green'}>
				<Tooltip label={'blue tooltip'} placement={'bottom'}>
					<Container width={'40%'} background={'blue'} orientation={'vertical'} crossAlignment={'flex-start'}>
						<Text style={{ maxWidth: '10rem' }}>The tooltip appears only if children is not fully visible!</Text>
						<Padding vertical={'small'} />
						<Tooltip label={'yellow tooltip'}>
							<Container width={'100%'} background={'purple'} orientation={'vertical'} crossAlignment={'flex-start'}>
							<Text style={{ width: '80%', backgroundColor:'yellow'}}>Hovering this text will dismiss the tooltip!</Text>
							</Container>
						</Tooltip>
						<Padding vertical={'small'} />
						<Text>The tooltip appears only if children is not fully visible!</Text>
					</Container>
				</Tooltip>
			</Container>
		</Tooltip>
	</Container>
)

export const MultipleNestedTooltip = {
	render: MultipleTooltip,
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
