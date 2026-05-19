/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { ModalManager } from './ModalManager';
import { useModal } from '../../../hooks/useModal';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export function App(): React.JSX.Element {
	const { createModal, closeModal } = useModal();
	return (
		<Container orientation="horizontal" mainAlignment="space-between" width="25rem">
			<Button
				type="outlined"
				color="success"
				label="Success"
				onClick={() => {
					const id = 'id1';
					createModal({
						id,
						title: 'Title title title',
						confirmLabel: 'Second Modal',
						onConfirm: () => {
							console.log('confirm');
							const id2 = 'id2';
							createModal({
								id: id2,
								title: 'Title 2',
								confirmLabel: 'Close Both',
								onConfirm: () => {
									console.log('confirm 2');
									closeModal(id2);
									closeModal(id);
								},
								onSecondaryAction: () => {
									console.log('cancel 2');
									closeModal(id2);
								},
								onClose: () => {
									console.log('close 2');
									closeModal(id2);
								},
								dismissLabel: 'Cancel',
								children: <Text overflow="break-word">Lorem impsum</Text>
							});
						},
						onSecondaryAction: () => {
							console.log('cancel');
							closeModal(id);
						},
						onClose: () => {
							console.log('close');
							closeModal(id);
						},
						dismissLabel: 'Cancel',
						children: (
							<>
								<Text overflow="break-word">Lorem impsum</Text>
								<Text overflow="break-word">
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
									incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
									exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
									irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
									pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
									officia deserunt mollit anim id est laborum.
								</Text>
							</>
						)
					});
				}}
			/>
		</Container>
	);
}

function App2(): React.JSX.Element {
	return (
		<>
			<ModalManager>
				<App />
			</ModalManager>
		</>
	);
}
