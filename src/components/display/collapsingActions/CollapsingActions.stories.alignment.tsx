/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { CollapsingActions } from './CollapsingActions';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export const CollapsingActionsAlignment = (): React.JSX.Element => {
	const actions = [
		{
			id: 'action1',
			icon: 'Activity',
			label: 'Action 1',
			onClick: () => undefined
		},
		{
			id: 'action2',
			icon: 'People',
			label: 'Action 2',
			onClick: () => undefined
		},
		{
			id: 'action3',
			icon: 'ArrowUp',
			label: 'Action 3',
			color: 'error',
			onClick: () => undefined
		},
		{
			id: 'action4',
			icon: 'Airplane',
			label: 'Action 4',
			color: 'text',
			onClick: () => undefined
		},
		{
			id: 'action5',
			icon: 'AcceptanceMeeting',
			label: 'Action 5',
			onClick: () => undefined
		},
		{
			id: 'action6',
			icon: 'AddressBook',
			label: 'Action 6',
			onClick: () => undefined
		},
		{
			id: 'action7',
			icon: 'Archive',
			label: 'Action 7',
			onClick: () => undefined
		},
		{
			id: 'action8',
			icon: 'BackupMod',
			label: 'Action 8',
			color: 'warning',
			onClick: () => undefined
		}
	];

	return (
		<Container maxWidth="50%" background="gray5" orientation="vertical" gap="0.625rem">
			<Text>Default</Text>
			<CollapsingActions actions={actions} />
			<Text>Align at start</Text>
			<CollapsingActions actions={actions} alignment="start" />
		</Container>
	);
};
