/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { Placement } from '@floating-ui/dom';

import { Text, TextProps } from './Text';
import { Tooltip } from '../display/Tooltip';

interface TextWithTooltipProps extends TextProps {
	/** Text content */
	children: string | React.ReactNode;
	tooltipMaxWidth?: string;
	tooltipPlacement?: Placement;
	/** Tooltip delay */
	triggerDelay?: number;
}

const TextWithTooltip = React.forwardRef<HTMLDivElement, TextWithTooltipProps>(function TextFn(
	{ children, triggerDelay, tooltipMaxWidth, tooltipPlacement, ...rest },
	ref
) {
	return (
		<Tooltip
			label={children}
			overflowTooltip
			triggerDelay={triggerDelay}
			overflow="break-word"
			maxWidth={tooltipMaxWidth}
			placement={tooltipPlacement}
		>
			<Text ref={ref} {...rest}>
				{children}
			</Text>
		</Tooltip>
	);
});

export { TextWithTooltip, TextWithTooltipProps };
