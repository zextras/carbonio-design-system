/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo, useState } from 'react';

import { List } from './List';
import { Button } from '../../basic/button/Button';
import { CustomModal } from '../../feedback/CustomModal';
import { ModalBody } from '../../feedback/modal-components/ModalBody';
import { ModalFooter } from '../../feedback/modal-components/ModalFooter';
import { ModalHeader } from '../../feedback/modal-components/ModalHeader';
import { Container } from '../../layout/container/Container';
import { Divider } from '../../layout/divider/Divider';
import { ListItem } from '../ListItem';

export const InsideCustomModal = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);
	const [items, setItems] = useState<{ id: string; name: string }[]>([
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
			<CustomModal open={open} onClose={closeHandler} maxHeight={'90vh'}>
				<ModalHeader title={'This is the title'} />
				<Divider />
				<ModalBody>
					<List>{listItems}</List>
				</ModalBody>
				<Divider />
				<ModalFooter confirmLabel={'confirm'} onConfirm={closeHandler} />
			</CustomModal>
		</>
	);
};
