/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { TooltipProps } from './Tooltip';
import { Tooltip } from './Tooltip';
import { Text } from '../../basic/text/Text';

export const TextWithTooltip = (props: TooltipProps): React.JSX.Element => (
	<Tooltip {...props}>
		<Text style={{ maxWidth: '10rem' }}>{props.label}</Text>
	</Tooltip>
);
