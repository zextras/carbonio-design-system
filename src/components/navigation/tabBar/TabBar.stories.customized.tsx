/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { DefaultTabBarItem, TabBar } from './TabBar';
import type { DefaultTabBarItemProps } from './TabBar';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

const CustomContainer = styled(Container)<{ $forceWidthEquallyDistributed?: boolean }>`
	min-width: 0;
	flex-basis: fit-content;
	${({ $forceWidthEquallyDistributed }): ReturnType<typeof css> | false | undefined =>
		$forceWidthEquallyDistributed &&
		css`
			flex-basis: unset;
		`};
	flex-grow: 1;
`;

const CustomComponent = ({
	item,
	selected,
	onClick
}: DefaultTabBarItemProps): React.JSX.Element => (
	<CustomContainer onClick={onClick} background={selected ? 'highlight' : 'gray4'}>
		<Text size="large" color={selected ? 'primary' : 'error'}>
			{item.label}
		</Text>
	</CustomContainer>
);

const ReusedDefaultTabBar = ({
	item,
	selected,
	onClick,
	background,
	underlineColor,
	forceWidthEquallyDistributed
}: DefaultTabBarItemProps): React.JSX.Element => {
	const customItem = item as DefaultTabBarItemProps['item'] & { icon?: string };
	return (
		<DefaultTabBarItem
			item={item}
			selected={selected}
			onClick={onClick}
			background={background}
			underlineColor={underlineColor}
			orientation="horizontal"
			forceWidthEquallyDistributed={forceWidthEquallyDistributed}
		>
			{customItem.icon && <Icon size="large" icon={customItem.icon} />}
			<Text size="large">{item.label}</Text>
		</DefaultTabBarItem>
	);
};

export const TabBarCustomized = (): React.JSX.Element => {
	const items = [
		{ id: 'tab-one', label: 'First Tab', CustomComponent },
		{
			id: 'tab-two',
			label: 'Second Tab',
			CustomComponent: ReusedDefaultTabBar,
			icon: 'BriefcaseOutline'
		},
		{ id: 'tab-three', label: 'Another Tab', CustomComponent },
		{ id: 'tab-four', label: 'Car Tab', CustomComponent: ReusedDefaultTabBar, icon: 'CarOutline' }
	];
	const [selected, setSelected] = useState('');

	return (
		<>
			<TabBar
				background="transparent"
				items={items}
				onChange={(ev, selectedId) => {
					console.log(ev);
					console.log(selectedId);
					setSelected(selectedId);
				}}
				selected={selected}
				width={512}
				height={48}
			/>
			<Container
				background="gray4"
				width={512}
				padding={{ all: 'small' }}
				crossAlignment="flex-start"
			>
				<Text style={{ fontFamily: 'monospace' }}>{`selected: '${selected}'`}</Text>
			</Container>
		</>
	);
};
