/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { HTMLAttributes, useMemo } from 'react';

import { noop } from 'lodash';
import styled from 'styled-components';

import { Dropdown, DropdownItem } from './Dropdown';
import { Tooltip } from './Tooltip';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useSplitVisibility } from '../../hooks/useSplitVisibility';
import { AnyColor } from '../../types/utils';
import { Button, ButtonProps } from '../basic/button/Button';
import { Container, ContainerProps } from '../layout/Container';

const RefDiv = styled.div`
	max-width: 100%;
	width: 100%;
`;

type Action = {
	type?: never;
	iconType?: ButtonProps['type'];
	secondaryAction?: never;
} & ButtonProps &
	DropdownItem;

interface CollapsingActionsProps extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Actions to show
	 *
	 * `type Action = { type?: never; iconType?: ButtonProps['type'] } & ButtonProps & DropdownItem;`
	 */
	actions: Action[];
	/** Size for the collapser and default size for the icons (can be overwritten with the single action prop) */
	size?: ButtonProps['size'];
	/** Max number of actions to show when there is plenty of space */
	maxVisible?: number;
	/** Alignment of the actions inside the container */
	alignment?: 'start' | 'end';
	/** Color for the collapser and default color for the icons (can be overwritten with the single action prop) */
	color?: ButtonProps['color'];
	/** Gap for the visible items */
	gap?: ContainerProps['gap'];
}

const CollapsingActions = React.forwardRef<HTMLDivElement, CollapsingActionsProps>(
	function CollapsingActionsFn(
		{
			actions,
			maxVisible,
			size: globalIconSize,
			alignment = 'end',
			color: globalIconColor = 'text',
			gap,
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
				visibleItems.map(
					({
						iconType = 'ghost',
						color = globalIconColor,
						size = globalIconSize,
						label,
						labelColor,
						backgroundColor,
						...itemRest
					}) => {
						const colorsAndType = ():
							| { type: 'default' | 'outlined'; labelColor?: AnyColor; backgroundColor?: AnyColor }
							| { type: 'ghost'; color: AnyColor } => {
							if (iconType === 'ghost') {
								return {
									type: iconType,
									color: color ?? labelColor
								};
							}
							if (iconType === 'outlined') {
								return {
									type: iconType,
									labelColor: color ?? labelColor,
									backgroundColor
								};
							}
							return {
								type: iconType,
								labelColor,
								backgroundColor: color ?? backgroundColor
							};
						};
						return (
							<Tooltip label={label} disabled={!label} key={itemRest.id}>
								<Button {...colorsAndType()} size={size} {...itemRest} />
							</Tooltip>
						);
					}
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
					gap={gap}
				>
					{visibleActions}
					{hiddenItems.length > 0 && (
						<Dropdown items={hiddenItems} placement="bottom-end">
							<Button
								type={'ghost'}
								icon="MoreVertical"
								size={globalIconSize}
								color={globalIconColor}
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
