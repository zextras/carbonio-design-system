/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useRef, useState } from 'react';

import { Popover } from './Popover';
import { Button } from '../../basic/button/Button';
import { Input } from '../../inputs/input/Input';
import { Container } from '../../layout/container/Container';

export const PopoverOnClick = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef(null);

	return (
		<Container>
			<Button ref={buttonRef} label="Click me!" onClick={() => setOpen(true)} />
			<Popover open={open} anchorEl={buttonRef} placement="right" onClose={() => setOpen(false)}>
				<Container>
					<Button label={'asd'} onClick={() => undefined} />
					<Button icon="Close" onClick={() => undefined} />
					<Button icon="Open" onClick={() => undefined} />
					<Input label={'rly'} />
				</Container>
			</Popover>
		</Container>
	);
};
