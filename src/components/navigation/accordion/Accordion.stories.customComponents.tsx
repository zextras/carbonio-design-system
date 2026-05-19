/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { Accordion, AccordionItem } from './Accordion';
import type { AccordionItemType } from './Accordion';
import { Badge } from '../../basic/badge/Badge';
import { Button } from '../../basic/button/Button';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/padding/Padding';

export const AccordionCustomComponents = (): React.JSX.Element => {
	const CC1 = ({ item }: { item: AccordionItemType }): React.JSX.Element => (
		<AccordionItem item={item}>
			<Icon icon="Error" color="error" />
		</AccordionItem>
	);
	const CC2 = ({ item }: { item: AccordionItemType }): React.JSX.Element => (
		<AccordionItem item={item}>
			<Text size="small" color="secondary">
				Customized
			</Text>
		</AccordionItem>
	);
	const CC3 = ({ item }: { item: AccordionItemType }): React.JSX.Element => (
		<div style={{ width: '100%', border: '0.0625rem solid green' }}>
			<AccordionItem item={item} />
		</div>
	);
	const CC4 = ({ item }: { item: AccordionItemType }): React.JSX.Element => (
		<Container
			orientation="horizontal"
			mainAlignment="space-around"
			background="gray2"
			height="fit"
		>
			<Button onClick={() => console.log('Button')} icon={item.icon} label={item.label} />
			<Padding left="small">
				<Badge
					backgroundColor={item.badgeType === 'unread' ? 'primary' : 'gray2'}
					color={item.badgeType === 'unread' ? 'gray6' : 'gray0'}
					value={item.badgeCounter}
				/>
			</Padding>
		</Container>
	);
	const click = (m: number | string) => () => alert(m);
	const items: AccordionItemType[] = [
		{
			id: '0',
			label: 'hello',
			CustomComponent: CC2,
			onClick: click(0),
			items: [
				{
					id: '1',
					label: 'One Accordion',
					icon: 'CheckmarkCircleOutline',
					CustomComponent: CC1,
					onClick: click(1),
					items: [
						{
							id: '1a',
							label: 'Nested Accordion',
							icon: 'TrendingDown',
							onClick: click('1a'),
							CustomComponent: CC3
						},
						{
							id: '2',
							label: 'Another Nested Accordion',
							icon: 'AlertTriangleOutline',
							CustomComponent: CC4,
							onClick: click(2),
							badgeType: 'unread',
							badgeCounter: 23
						},
						{
							id: '3',
							onClick: click(3),
							label: 'Accordions!',
							icon: 'MicOff'
						}
					]
				}
			]
		}
	];

	return (
		<Container orientation="vertical" mainAlignment="space-around" height="fit" width={306}>
			<Accordion items={items} />
		</Container>
	);
};
