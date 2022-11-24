/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { HTMLAttributes, useMemo } from 'react';

import { map, noop } from 'lodash';
import styled from 'styled-components';

import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useSplitVisibility } from '../../hooks/useSplitVisibility';
import { IconButton, IconButtonProps } from '../inputs/IconButton';
import { Container } from '../layout/Container';
import { Dropdown, DropdownItem } from './Dropdown';
import { Tooltip } from './Tooltip';

const RefDiv = styled.div`
	max-width: 100%;
	width: 100%;
`;

type Action = { type?: never; iconType?: IconButtonProps['type'] } & IconButtonProps & DropdownItem;

interface CollapsingActionsProps extends HTMLAttributes<HTMLDivElement> {
	/** Actions to show
	 * <br />
	 * <code>type Action = { type?: never; iconType?: IconButtonProps['type'] } & IconButtonProps & DropdownItem;</code>
	 */
	actions: Action[];
	/** Size for the collapser and default size for the icons (can be overwritten with the single action prop) */
	size?: IconButtonProps['size'];
	/** Max number of actions to show when there is plenty of space */
	maxVisible?: number;
	/** Alignment of the actions inside the container */
	alignment?: 'start' | 'end';
	/** Color for the collapser and default color for the icons (can be overwritten with the single action prop) */
	color?: IconButtonProps['color'];
}

const CollapsingActions = React.forwardRef<HTMLDivElement, CollapsingActionsProps>(
	function CollapsingActionsFn(
		{
			actions,
			maxVisible,
			size: globalIconSize,
			alignment = 'end',
			color: globalIconColor,
			...rest
		},
		ref
	) {
		const [visibleItems, hiddenItems, visibilityRef] = useSplitVisibility<Action, HTMLDivElement>(
			actions,
			{ maxVisible, removeFrom: 'end' }
		);
		const containerRef = useCombinedRefs(ref, visibilityRef);

		const visibleActions = useMemo(
			() =>
				map(
					visibleItems,
					({
						iconType = 'ghost',
						color = globalIconColor,
						size = globalIconSize,
						label,
						...itemRest
					}) => (
						<Tooltip label={label} disabled={!label} key={itemRest.id}>
							<IconButton {...itemRest} type={iconType} color={color} size={size} />
						</Tooltip>
					)
				),
			[globalIconColor, globalIconSize, visibleItems]
		);

		return (
			<RefDiv ref={containerRef} {...rest}>
				<Container
					orientation="horizontal"
					mainAlignment={`flex-${alignment}`}
					width="fit"
					margin={{
						left: alignment === 'start' ? '0' : 'auto',
						right: alignment === 'end' ? '0' : 'auto'
					}}
				>
					{visibleActions}
					{hiddenItems.length > 0 && (
						<Dropdown items={hiddenItems} placement="bottom-end">
							<IconButton
								icon="MoreVertical"
								size={globalIconSize}
								iconColor={globalIconColor}
								onClick={noop}
							/>
						</Dropdown>
					)}
				</Container>
			</RefDiv>
		);
	}
);

export { CollapsingActions, CollapsingActionsProps, Action };
