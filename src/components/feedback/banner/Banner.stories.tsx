/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { expect, within } from '@storybook/test';
import { noop } from 'lodash';

import { Banner } from './Banner';
import { ICONS } from '../../../testUtils/constants';
import { ModalManager } from '../../utilities/ModalManager';

const meta: Meta = {
	title: 'Components/Feedback/Banner',
	component: Banner,
	parameters: {
		layout: 'padded'
	},
	decorators: [(Story): React.JSX.Element => <ModalManager>{Story()}</ModalManager>]
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const Default: Story = {
	args: {
		description: 'Description is required',
		severity: 'success'
	}
};

export const Description: Story = {
	args: {
		...Default.args,
		type: 'fill',
		title: '',
		moreInfoLabel: 'More info',
		closeLabel: 'Close label',
		showClose: false,
		onClose: noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.checkmarkCircle)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
	}
};

export const Title: Story = {
	args: {
		...Default.args,
		title: ' Title is optional',
		severity: 'warning'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.alertTriangleOutline)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByText(/title is optional/i)).toBeVisible();
	}
};

export const CloseBanner: Story = {
	args: {
		...Default.args,
		closeLabel: 'This is the close label',
		showClose: true,
		onClose: noop,
		primaryAction: { label: 'Primary action', onClick: console.log },
		secondaryAction: { label: 'Secondary action', onClick: console.log },
		severity: 'info'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.infoOutline)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByRole('button', { name: /secondary action/i })).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};

export const ErrorWithPrimaryAction: Story = {
	args: {
		...Default.args,
		title: 'This is the title',
		primaryAction: { label: 'Primary action', onClick: console.log },
		severity: 'error'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.closeCircleOutline)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
	}
};

export const TypeOutline: Story = {
	args: {
		...Default.args,
		title: 'This is the title',
		primaryAction: { label: 'Primary action', onClick: console.log },
		type: 'outline',
		showClose: true,
		onClose: () => noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.checkmarkCircle)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};

export const SecondaryActionWithPrimaryAction: Story = {
	args: {
		...Default.args,
		title: 'This is the title',
		primaryAction: { label: 'Primary action', onClick: console.log },
		secondaryAction: { label: 'Secondary action', onClick: console.log },
		type: 'outline',
		severity: 'warning',
		showClose: true,
		onClose: () => noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.alertTriangleOutline)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByRole('button', { name: /secondary action/i })).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};

export const OutlineWithInfoSeverity: Story = {
	args: {
		...Default.args,
		primaryAction: { label: 'Primary action', onClick: console.log },
		secondaryAction: { label: 'Secondary action', onClick: console.log },
		type: 'outline',
		severity: 'info'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.infoOutline)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByRole('button', { name: /secondary action/i })).toBeVisible();
	}
};

export const OutlineWithErrorSeverity: Story = {
	args: {
		...Default.args,
		primaryAction: { label: 'Primary action', onClick: console.log },
		type: 'outline',
		severity: 'error'
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.closeCircleOutline)).toBeVisible();
		await expect(canvas.getByText(/description is required/i)).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
	}
};

export const LongDescription: Story = {
	args: {
		...Default.args,
		description:
			'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry',
		primaryAction: { label: 'Primary action', onClick: console.log },
		type: 'standard',
		showClose: true,
		onClose: () => noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.checkmarkCircle)).toBeVisible();
		await expect(
			canvas.getByText(
				/Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry./i
			)
		).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};

export const ShortTitle: Story = {
	args: {
		...Default.args,
		title: 'Short title',
		description:
			'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry',
		primaryAction: { label: 'Primary action', onClick: console.log },
		secondaryAction: { label: 'Secondary action', onClick: console.log },
		type: 'standard',
		severity: 'warning',
		showClose: true,
		onClose: () => noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.alertTriangleOutline)).toBeVisible();
		await expect(canvas.getByText(/short title/i)).toBeVisible();
		await expect(
			canvas.getByText(
				/Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry./i
			)
		).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByRole('button', { name: /secondary action/i })).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};

export const LongTitle: Story = {
	args: {
		...Default.args,
		title:
			'The "sixth sick sheik\'s sixth sheep\'s sick" is believed to be the toughest tongue twister in the English language.',
		description:
			'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry',
		primaryAction: { label: 'Primary action with long label', onClick: console.log },
		secondaryAction: { label: 'Secondary action with long label', onClick: console.log },
		type: 'standard',
		severity: 'info',
		showClose: true,
		onClose: () => noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.infoOutline)).toBeVisible();
		await expect(
			canvas.getByText(
				/The "sixth sick sheik's sixth sheep's sick" is believed to be the toughest tongue twister in the/i
			)
		).toBeVisible();
		await expect(
			canvas.getByText(
				/Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry./i
			)
		).toBeVisible();
		await expect(
			canvas.getByRole('button', { name: /primary action with long label/i })
		).toBeVisible();
		await expect(
			canvas.getByRole('button', { name: /secondary action with long label/i })
		).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};

export const PrimaryActionWithIcon: Story = {
	args: {
		...Default.args,
		title: 'Lorem ipsum dolor sit amet',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		primaryAction: { label: 'Primary action', onClick: console.log, icon: 'People' },
		secondaryAction: { label: 'Secondary action', onClick: console.log },
		type: 'standard',
		severity: 'error',
		showClose: true,
		onClose: () => noop
	},
	play: async ({ canvasElement }) => {
		const canvas = within(canvasElement);
		await expect(canvas.getByTestId(ICONS.closeCircleOutline)).toBeVisible();
		await expect(canvas.getByText('Lorem ipsum dolor sit amet')).toBeVisible();
		await expect(
			canvas.getByText(/Lorem ipsum dolor sit amet, consectetur adipiscing elit./i)
		).toBeVisible();
		await expect(canvas.getByRole('button', { name: /primary action/i })).toBeVisible();
		await expect(canvas.getByTestId(ICONS.people)).toBeVisible();
		await expect(canvas.getByTestId(ICONS.close)).toBeVisible();
	}
};
