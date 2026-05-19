/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { TabBar } from './TabBar';
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
}: DefaultTabBarItemProps): React.JSX.Element => {
	const customItem = item as DefaultTabBarItemProps['item'] & {
		specialProp?: string;
		icon?: string;
	};

	return (
		<CustomContainer onClick={onClick} height={50} background={selected ? 'highlight' : 'gray4'}>
			<Text size="large" color={selected ? 'primary' : 'error'}>
				{customItem.label}
			</Text>
			{customItem.specialProp && (
				<Text size="large" color={selected ? 'primary' : 'text'}>
					{customItem.specialProp}
				</Text>
			)}
			{customItem.icon && (
				<Icon icon={customItem.icon} size="large" color={selected ? 'primary' : 'info'} />
			)}
		</CustomContainer>
	);
};

export const TabBarMixed = (): React.JSX.Element => {
	const items = [
		{ id: 'one', label: 'Hello' },
		{ id: 'two', label: 'Hello' },
		{ id: 'three', label: 'Hello', CustomComponent, specialProp: 'World' },
		{ id: 'four', label: 'Hello', CustomComponent, icon: 'AcceptanceMeeting' },
		{ id: 'five', label: 'Hello', disabled: true }
	];
	const [selected, setSelected] = useState('tab-one');

	return (
		<>
			<TabBar
				background={'transparent'}
				items={items}
				selected={selected}
				onChange={(ev, selectedId) => {
					console.log(ev);
					console.log(selectedId);
					setSelected(selectedId);
				}}
				width={512}
				height={48}
				underlineColor="success"
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
