/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent, screen } from '@storybook/test';

import { Snackbar, SnackbarProps } from './Snackbar';
import { Button } from '../../basic/Button';

const SnackbarStory = ({ open, ...rest }: SnackbarProps): React.JSX.Element => {
	const [snack, setSnack] = useState(false);

	return (
		<>
			<Button type="outlined" color="info" label="Click" onClick={() => setSnack(true)} />
			<Snackbar onClose={() => setSnack(false)} open={open || snack} {...rest} />
		</>
	);
};

const meta = {
	title: 'Components/Feedback/Snackbar',
	component: Snackbar,
	parameters: {
		layout: 'padded'
	},
	render: SnackbarStory
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'success',
		open: false,
		actionLabel: 'Ok',
		disableAutoHide: false,
		hideButton: false,
		zIndex: 1000,
		autoHideTimeout: 4000,
		disablePortal: false,
		singleLine: false
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole('button', {
			name: /click/i
		});
		await expect(button).toBeVisible();
		await userEvent.click(button);
		await expect(screen.getByText(/Lorem Ipsum dolor sit amet/i)).toBeVisible();
	}
};

export const Info: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'info',
		actionLabel: 'Ok'
	}
};

export const Warning: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'warning',
		actionLabel: 'Ok'
	}
};

export const Error: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'error',
		actionLabel: 'Ok',
		disableAutoHide: true
	}
};

export const LongTextAction: Story = {
	name: 'Very Long Text and Action',
	args: {
		label: 'Файл был перемещен в корзину',
		type: 'info',
		actionLabel: 'Откройте папку корзины',
		disableAutoHide: true
	}
};

export const ShortTextLongAction: Story = {
	name: 'Short Text and Long Action',
	args: {
		label: 'Text',
		type: 'info',
		actionLabel: 'Very long action on snackbar with superlongwordwithlotofchars',
		disableAutoHide: true
	}
};

export const LongTextShortAction: Story = {
	name: 'Long Text and Short Action',
	args: {
		label: 'Very long action on snackbar with superlongwordwithlotofchars',
		type: 'info',
		actionLabel: 'Text',
		disableAutoHide: true
	}
};

export const MediumTextAction: Story = {
	name: 'Medium Text and Medium Action',
	args: {
		label: 'Item moved to trash with success',
		type: 'info',
		actionLabel: 'Go to trash folder',
		disableAutoHide: true
	}
};
