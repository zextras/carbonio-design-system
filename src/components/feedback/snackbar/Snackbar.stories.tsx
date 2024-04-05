/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within, userEvent } from '@storybook/test';

import { Snackbar } from './Snackbar';
import { Button } from '../../basic/Button';

const meta: Meta = {
	title: 'Components/Feedback/Snackbar',
	component: Snackbar,
	parameters: {
		layout: 'padded'
	}
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
	render: ({ open, label, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="success" label="Success" onClick={() => setSnack(true)} />
				<Snackbar onClose={() => setSnack(false)} label={label} open={open || snack} {...rest} />
			</>
		);
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		const { body } = canvasElement.ownerDocument;
		const button = canvas.getByRole('button', {
			name: /success/i
		});
		await expect(button).toBeVisible();
		await userEvent.click(button);
		expect(await within(body).findByText(/Lorem Ipsum dolor sit amet/i));
	}
};

export const Info: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'info',
		actionLabel: 'Ok'
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="info" label="Info" onClick={() => setSnack(true)} />
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};

export const Warning: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'warning',
		actionLabel: 'Ok'
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="warning" label="Warning" onClick={() => setSnack(true)} />
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};

export const Error: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'error',
		actionLabel: 'Ok',
		disableAutoHide: true
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="error" label="Error" onClick={() => setSnack(true)} />
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};

export const LongTextAction: Story = {
	name: 'Very Long Text and Action',
	args: {
		label: 'Файл был перемещен в корзину',
		type: 'info',
		actionLabel: 'Откройте папку корзины',
		disableAutoHide: true
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="primary"
					label="Short text and long action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};

export const ShortTextLongAction: Story = {
	name: 'Short Text and Long Action',
	args: {
		label: 'Text',
		type: 'info',
		actionLabel: 'Very long action on snackbar with superlongwordwithlotofchars',
		disableAutoHide: true
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="secondary"
					label="Short text and long action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};

export const LongTextShortAction: Story = {
	name: 'Long Text and Short Action',
	args: {
		label: 'Very long action on snackbar with superlongwordwithlotofchars',
		type: 'info',
		actionLabel: 'Text',
		disableAutoHide: true
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="gray4"
					label="Long text and short action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};

export const MediumTextAction: Story = {
	name: 'Medium Text and Medium Action',
	args: {
		label: 'Item moved to trash with success',
		type: 'info',
		actionLabel: 'Go to trash folder',
		disableAutoHide: true
	},
	render: ({ label, open, ...rest }) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="warning"
					label="Medium text and medium action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar onClose={() => setSnack(false)} open={open || snack} label={label} {...rest} />
			</>
		);
	}
};
