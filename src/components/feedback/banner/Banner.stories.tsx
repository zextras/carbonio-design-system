/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import { noop } from 'lodash';

import { Banner } from './Banner';
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
	}
};

export const Title: Story = {
	args: {
		...Default.args,
		title: ' Title is optional',
		severity: 'warning'
	}
};

export const CloseBanner: Story = {
	args: {
		...Default.args,
		closeLabel: 'This is the close label',
		showClose: true,
		onClose: noop,
		primaryAction: { label: 'Primary action', onClick: noop },
		secondaryAction: { label: 'Secondary action', onClick: noop },
		severity: 'info'
	}
};

export const ErrorWithPrimaryAction: Story = {
	args: {
		...Default.args,
		title: 'This is the title',
		primaryAction: { label: 'Primary action', onClick: noop },
		severity: 'error'
	}
};

export const TypeOutline: Story = {
	args: {
		...Default.args,
		title: 'This is the title',
		primaryAction: { label: 'Primary action', onClick: noop },
		type: 'outline',
		showClose: true,
		onClose: () => noop
	}
};

export const SecondaryActionWithPrimaryAction: Story = {
	args: {
		...Default.args,
		title: 'This is the title',
		primaryAction: { label: 'Primary action', onClick: noop },
		secondaryAction: { label: 'Secondary action', onClick: noop },
		type: 'outline',
		severity: 'warning',
		showClose: true,
		onClose: () => noop
	}
};

export const OutlineWithInfoSeverity: Story = {
	args: {
		...Default.args,
		primaryAction: { label: 'Primary action', onClick: noop },
		secondaryAction: { label: 'Secondary action', onClick: noop },
		type: 'outline',
		severity: 'info'
	}
};

export const OutlineWithErrorSeverity: Story = {
	args: {
		...Default.args,
		primaryAction: { label: 'Primary action', onClick: noop },
		type: 'outline',
		severity: 'error'
	}
};

export const LongDescription: Story = {
	args: {
		...Default.args,
		description:
			'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry',
		primaryAction: { label: 'Primary action', onClick: noop },
		type: 'standard',
		showClose: true,
		onClose: () => noop
	}
};

export const ShortTitle: Story = {
	args: {
		...Default.args,
		title: 'Short title',
		description:
			'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry',
		primaryAction: { label: 'Primary action', onClick: noop },
		secondaryAction: { label: 'Secondary action', onClick: noop },
		type: 'standard',
		severity: 'warning',
		showClose: true,
		onClose: () => noop
	}
};

export const LongTitle: Story = {
	args: {
		...Default.args,
		title:
			'The "sixth sick sheik\'s sixth sheep\'s sick" is believed to be the toughest tongue twister in the English language.',
		description:
			'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry',
		primaryAction: { label: 'Primary action with long label', onClick: noop },
		secondaryAction: { label: 'Secondary action with long label', onClick: noop },
		type: 'standard',
		severity: 'info',
		showClose: true,
		onClose: () => noop
	}
};

export const PrimaryActionWithIcon: Story = {
	args: {
		...Default.args,
		title: 'Lorem ipsum dolor sit amet',
		description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		primaryAction: { label: 'Primary action', onClick: noop, icon: 'People' },
		secondaryAction: { label: 'Secondary action', onClick: noop },
		type: 'standard',
		severity: 'error',
		showClose: true,
		onClose: () => noop
	}
};
