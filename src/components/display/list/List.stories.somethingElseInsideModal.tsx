/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useState } from 'react';

import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Modal } from '../../feedback/Modal';
import { Container } from '../../layout/container/Container';

export const SomethingElseInsideModal = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = (): void => setOpen(true);
	const closeHandler = (): void => setOpen(false);

	return (
		<>
			<Button onClick={clickHandler} label={'click'} />
			<Modal
				secondaryActionLabel="very long secondary label"
				onSecondaryAction={() => {}}
				title="Title_bold_dark"
				open={open}
				onConfirm={closeHandler}
				onClose={closeHandler}
				showCloseIcon
				maxHeight={'80vh'}
			>
				<Text>This is a text</Text>
				<Container height={'100rem'}>Empty container</Container>
			</Modal>
		</>
	);
};
