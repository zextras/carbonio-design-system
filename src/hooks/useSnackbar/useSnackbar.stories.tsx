import React from 'react';

/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Meta, StoryObj } from '@storybook/react';
import { within, userEvent, screen, expect } from '@storybook/test';

import { Hook } from './stories-helpers';
import {
	CreateSnackbarFn,
	CreateSnackbarFnArgs,
	SnackbarManager
} from '../../components/utilities/SnackbarManager';
import { SELECTORS } from '../../testUtils/constants';

const meta = {
	component: Hook,
	subcomponents: { SnackbarManager },
	decorators: (Story): React.JSX.Element => (
		<SnackbarManager>
			<Story />
		</SnackbarManager>
	)
} satisfies Meta<CreateSnackbarFn>;

export default meta;

type Story = StoryObj<CreateSnackbarFnArgs>;

export const HookExample = {
	args: {
		label: 'Hook example'
	},
	render: Hook,
	play: async ({ canvasElement }): Promise<void> => {
		const canvas = within(canvasElement);
		await userEvent.click(canvas.getByRole('button'));
		await expect(screen.getByTestId(SELECTORS.snackbar)).toBeVisible();
	}
} satisfies Story;
