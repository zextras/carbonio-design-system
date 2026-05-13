/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Accordion } from './Accordion';
import { AccordionCustomComponents } from './Accordion.stories.customComponents';
import { colorArgType } from '../../../docs/utils';

const meta = {
	component: Accordion,
	args: {
		items: [
			{ id: 'i1', label: 'item 1' },
			{ id: 'i2', label: 'item 2' },
			{ id: 'd1', divider: true },
			{
				id: 'i3',
				label: 'item 3',
				items: [
					{ id: 'i3-1', label: 'item 3-1' },
					{ id: 'i3-2', label: 'item 3-2' }
				]
			}
		]
	},
	argTypes: {
		background: colorArgType
	}
} satisfies Meta<typeof Accordion>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {} satisfies Story;

export const PlainAccordion = {
	args: {
		items: [
			{
				id: 'Root Accordion',
				icon: 'PersonOutline',
				label: 'Accordion Label',
				onClick: (): void => alert('root'),
				onOpen: (): void => console.log('open'),
				onClose: (): void => console.log('close'),
				items: [
					{
						id: '1',
						label: 'One Accordion',
						onClick: (): void => alert(1)
					},
					{
						id: '2',
						label: 'Two Accordion',
						onClick: (): void => alert(2),
						items: [
							{
								id: '3',
								label: 'Nested Accordion',
								onClick: (): void => alert(3)
							}
						]
					}
				]
			}
		],
		activeId: '3',
		openIds: ['Root Accordion'],
		disableTransition: true
	}
} satisfies Story;

export const AccordionWithIcons = {
	args: {
		items: [
			{
				id: '1',
				label: 'One Accordion',
				icon: 'CheckmarkCircleOutline',
				open: true,
				items: [
					{
						id: '1',
						label: 'Nested Accordion',
						icon: 'TrendingDown'
					},
					{
						id: '2',
						label: 'Another Nested Accordion',
						icon: 'AlertTriangleOutline'
					},
					{
						id: '3',
						label: 'Accordions!',
						icon: 'MicOff'
					}
				]
			},
			{
				id: '2',
				label: 'Two Accordion',
				icon: 'Attach'
			}
		],
		disableTransition: true
	}
} satisfies Story;

export const AccordionWithBadge = {
	args: {
		items: [
			{ id: '1', label: 'One Accordion', badgeCounter: 10 },
			{ id: '2', label: 'Two Accordion', badgeType: 'unread', badgeCounter: 100 }
		]
	}
} satisfies Story;

export const AccordionWithBackground = {
	args: {
		items: [
			{ id: '1', label: 'One Accordion', badgeCounter: 10 },
			{ id: '2', label: 'Two Accordion', badgeType: 'unread', badgeCounter: 100 }
		],
		background: 'highlight'
	}
} satisfies Story;

export const RealExampleAccordion = {
	args: {
		items: [
			{
				id: 'inbox',
				label: 'Inbox',
				badgeType: 'unread',
				badgeCounter: 10,
				items: [
					{
						id: 'starred',
						label: 'Starred',
						badgeCounter: 2
					},
					{
						id: 'important',
						label: 'Important',
						badgeType: 'unread',
						badgeCounter: 8
					}
				]
			},
			{
				id: 'spam',
				label: 'Spam',
				badgeCounter: 100
			},
			{
				id: 'outBox',
				label: 'outbox',
				badgeType: 'read',
				badgeCounter: 1,
				items: [
					{
						id: 'starred',
						label: 'Starred',
						badgeCounter: 2
					},
					{
						id: 'important',
						label: 'Important',
						badgeType: 'unread',
						badgeCounter: 8,
						items: [
							{
								id: 'inbox',
								label: 'Inbox',
								badgeType: 'unread',
								badgeCounter: 10,
								items: [
									{
										id: 'starred',
										label: 'Starred',
										badgeCounter: 2
									},
									{
										id: 'important',
										label: 'Important',
										badgeType: 'unread',
										badgeCounter: 8
									}
								]
							},
							{
								id: 'spam',
								label: 'Spam',
								badgeCounter: 100
							},
							{
								id: 'outBox',
								label: 'outbox',
								badgeType: 'read',
								badgeCounter: 1,
								items: [
									{
										id: 'starred',
										label: 'Starred',
										badgeCounter: 2
									},
									{
										id: 'important',
										label: 'Important',
										badgeType: 'unread',
										badgeCounter: 8,
										items: [
											{
												id: 'inbox',
												label: 'Inbox',
												badgeType: 'unread',
												badgeCounter: 10,
												items: [
													{
														id: 'starred',
														label: 'Starred',
														badgeCounter: 2
													},
													{
														id: 'important',
														label: 'Important',
														badgeType: 'unread',
														badgeCounter: 8
													}
												]
											},
											{
												id: 'spam',
												label: 'Spam',
												badgeCounter: 100
											},
											{
												id: 'outBox',
												label: 'outbox',
												badgeType: 'read',
												badgeCounter: 1,
												items: [
													{
														id: 'starred',
														label: 'Starred',
														badgeCounter: 2
													},
													{
														id: 'important',
														label: 'Important',
														badgeType: 'unread',
														badgeCounter: 8,
														items: []
													}
												]
											},
											{
												id: 'archive',
												label: 'Archive',
												badgeCounter: 100
											}
										]
									}
								]
							},
							{
								id: 'archive',
								label: 'Archive',
								badgeCounter: 100
							}
						]
					}
				]
			},
			{
				id: 'archive',
				label: 'Archive',
				badgeCounter: 100
			}
		]
	}
} satisfies Story;

export const CustomComponents = {
	render: AccordionCustomComponents
} satisfies Story;

export const CollapseAndExpandLabels = {
	args: {
		items: [
			{
				id: 'accordion 1',
				label: 'Accordion',
				items: [
					{
						id: 'starred',
						label: 'Starred'
					}
				]
			}
		],
		background: 'gray4',
		collapseLabel: 'collapse',
		expandLabel: 'expand'
	}
} satisfies Story;
