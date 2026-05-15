/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { CustomModal } from './CustomModal';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';

export const CustomModalExample = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const clickHandler = useCallback((): void => setOpen(true), []);
	const closeHandler = useCallback((): void => setOpen(false), []);

	return (
		<>
			<Button label="Trigger Modal" onClick={clickHandler} />
			<CustomModal open={open} onClose={closeHandler}>
				<Text overflow="break-word">
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat.
				</Text>
			</CustomModal>
		</>
	);
};
