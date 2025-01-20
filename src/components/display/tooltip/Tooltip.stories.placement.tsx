/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Tooltip } from './Tooltip';
import { Button } from '../../basic/button/Button';
import { Container } from '../../layout/container/Container';

export const TooltipPlacement = (): React.JSX.Element => (
	<Container orientation="horizontal" mainAlignment="flex-start" gap={'1rem'}>
		<Tooltip placement="left" label="Chrome 78+">
			<Button label="Tooltip on left" onClick={() => undefined} />
		</Tooltip>
		<Tooltip placement="top" label="Chrome 78+">
			<Button label="Tooltip on top" onClick={() => undefined} />
		</Tooltip>
		<Tooltip placement="bottom" label="Chrome 78+">
			<Button label="Tooltip on bottom" onClick={() => undefined} />
		</Tooltip>
		<Tooltip placement="right" label="Chrome 78+">
			<Button label="Tooltip on right" onClick={() => undefined} />
		</Tooltip>
	</Container>
);
