/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useState } from 'react';

import type { MultiButtonProps } from './MultiButton';
import { MultiButton } from './MultiButton';

export const MultiButtonCustomIcon = (props: MultiButtonProps): React.JSX.Element => {
	const [icon, setIcon] = useState('Plus');
	const onOpen = useCallback(() => {
		setIcon('Close');
	}, []);
	const onClose = useCallback(() => {
		setIcon('Plus');
	}, []);
	return <MultiButton {...props} icon={icon} dropdownProps={{ onOpen, onClose }} />;
};
