/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useRef, useState } from 'react';

import { Popper } from './Popper';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Container } from '../../layout/container/Container';

export const PopperOnHover = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef(null);

	return (
		<Container>
			<Button
				ref={buttonRef}
				label="Hover me!"
				onMouseEnter={() => setOpen(true)}
				onMouseLeave={() => setOpen(false)}
				onClick={() => undefined}
			/>
			<Popper
				open={open}
				anchorEl={buttonRef}
				placement="right"
				onClose={() => setOpen(false)}
				disableRestoreFocus
			>
				<Text>This is the content of the Popper</Text>
			</Popper>
		</Container>
	);
};
