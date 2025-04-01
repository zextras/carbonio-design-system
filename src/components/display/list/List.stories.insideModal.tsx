/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo, useState } from 'react';

import { List } from './List';
import { Button } from '../../basic/button/Button';
import { Modal } from '../../feedback/Modal';
import { Container } from '../../layout/container/Container';
import { ListItem } from '../ListItem';

export const ListInsideModal = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);
	const [items, _setItems] = useState<{ id: string; name: string }[]>([
		...Array(30)
			.fill('')
			.map((_item, index) => ({
				id: `${index}`,
				name: `Item ${index}`
			}))
	]);

	const listItems = useMemo(
		() =>
			items.map((item) => (
				<ListItem key={item.id}>
					{(visible) => <Container height={'50px'}>{visible && <div>{item.name}</div>}</Container>}
				</ListItem>
			)),
		[items]
	);

	return (
		<>
			<Button onClick={clickHandler} label={'click'} />
			<Modal
				title="A List inside Modal"
				open={open}
				onConfirm={closeHandler}
				onClose={closeHandler}
				showCloseIcon
			>
				<Container height={'50vh'}>
					<List>{listItems}</List>
				</Container>
			</Modal>
		</>
	);
};
