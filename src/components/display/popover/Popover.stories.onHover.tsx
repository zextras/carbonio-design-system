/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useRef } from 'react';

import { Popover } from './Popover';
import { Button } from '../../basic/button/Button';
import { Input } from '../../inputs/input/Input';
import { Container } from '../../layout/container/Container';

export const PopoverOnHover = (): React.JSX.Element => {
	const buttonRef = useRef(null);

	return (
		<Container>
			<Button ref={buttonRef} label="Hover me!" onClick={() => undefined} />
			<Popover anchorEl={buttonRef} activateOnHover placement="right" onClose={() => undefined}>
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
