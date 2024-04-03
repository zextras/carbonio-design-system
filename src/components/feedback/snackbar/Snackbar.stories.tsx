/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

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
	render: ({
		label,
		type,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="success" label="Success" onClick={() => setSnack(true)} />
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
			</>
		);
	}
};

export const Info: Story = {
	args: {
		label: 'Lorem Ipsum dolor sit amet',
		type: 'info',
		actionLabel: 'Ok'
	},
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="info" label="Info" onClick={() => setSnack(true)} />
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
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
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="warning" label="Warning" onClick={() => setSnack(true)} />
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
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
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button type="outlined" color="error" label="Error" onClick={() => setSnack(true)} />
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
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
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="primary"
					label="Short text and long action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
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
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="secondary"
					label="Short text and long action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
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
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="gray4"
					label="Long text and short action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
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
	render: ({
		type,
		label,
		open,
		actionLabel,
		disableAutoHide,
		hideButton,
		zIndex,
		autoHideTimeout,
		disablePortal,
		singleLine
	}) => {
		const [snack, setSnack] = useState(false);

		return (
			<>
				<Button
					type="default"
					color="warning"
					label="Medium text and medium action"
					onClick={() => setSnack(true)}
				/>
				<Snackbar
					onClose={() => setSnack(false)}
					open={open || snack}
					type={type}
					label={label}
					actionLabel={actionLabel}
					disableAutoHide={disableAutoHide}
					hideButton={hideButton}
					zIndex={zIndex}
					autoHideTimeout={autoHideTimeout}
					disablePortal={disablePortal}
					singleLine={singleLine}
				/>
			</>
		);
	}
};
