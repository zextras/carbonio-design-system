/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { Tooltip } from '../display/Tooltip';
import { Text, TextProps } from './Text';

interface TextWithTooltipProps extends TextProps {
	/** Text content */
	children: string;
	/** Tooltip delay */
	triggerDelay?: number;
}

const TextWithTooltip = React.forwardRef<HTMLDivElement, TextWithTooltipProps>(function TextFn(
	{ children, triggerDelay, ...rest },
	ref
) {
	return (
		<Tooltip label={children} overflowTooltip triggerDelay={triggerDelay}>
			<Text ref={ref} {...rest}>
				{children}
			</Text>
		</Tooltip>
	);
});

export { TextWithTooltip, TextWithTooltipProps };
