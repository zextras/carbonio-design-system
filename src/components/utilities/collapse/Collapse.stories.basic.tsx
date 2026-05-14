/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useState } from 'react';

import { Collapse } from './Collapse';
import { Button } from '../../basic/button/Button';
import { Icon } from '../../basic/icon/Icon';
import { Padding } from '../../layout/padding/Padding';

export const CollapseBasic = (): React.JSX.Element => {
	const [open, setOpen] = useState(true);
	const toggle = useCallback(() => {
		setOpen((prev) => !prev);
	}, []);

	return (
		<>
			<Button onClick={toggle} label="Click Me!" />
			<Padding all="large">
				<Collapse orientation="vertical" open={open} crossSize="6.25rem">
					<div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }} />
					<div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }} />
					<Icon icon="Activity" size="large" />
					<div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }} />
				</Collapse>
			</Padding>
			<Padding all="large">
				<Collapse orientation="horizontal" open={open} crossSize="3.125rem">
					<div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }} />
					<div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }} />
					<Icon icon="Activity" size="large" />
					<div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }} />
				</Collapse>
			</Padding>
		</>
	);
};
