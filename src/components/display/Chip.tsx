/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { map } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { ThemeObj } from '../../theme/theme';
import Tooltip from './Tooltip';
import Icon from '../basic/Icon';
import IconButton from '../inputs/IconButton';
import Avatar from '../basic/Avatar';
import Row from '../layout/Row';
import Text from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useTheme } from '../../theme/theme-utils';
import { pseudoClasses } from '../utilities/functions';

type ChipAction = {
	/** Chip action icon color */
	color?: keyof ThemeObj['palette'];
	/** Chip action disabled status */
	disabled?: boolean;
	/** Chip action icon */
	icon: keyof ThemeObj['icons'];
	/** Chip action id (required for key attribute) */
	id: string;
	/** Chip action label value. It is shown in a tooltip. To not render the tooltip, just don't value the prop.
	 * Tooltips of the actions are not shown in case the chip is disabled */
	label?: string;
} & (
	| {
			/** Chip action type */
			type: 'button';
			/** Chip action click callback (button type only). NB: onClick event IS propagated. It's up to the dev to eventually stop the propagation */
			onClick: React.ReactEventHandler;
			/** Chip action background (button type only) */
			background?: keyof ThemeObj['palette'];
	  }
	| {
			/** Chip action type */
			type: 'icon';
	  }
);

interface ChipProps {
	/** Chip actions (buttons or icons) */
	actions?: ChipAction[];
	/** Chip Avatar Icon */
	avatarIcon?: keyof ThemeObj['icons'];
	/** Chip Avatar Background Color */
	avatarBackground?: keyof ThemeObj['palette'];
	/** Chip avatar color (icon color or capitals color) */
	avatarColor?: keyof ThemeObj['palette'];
	/** Chip avatar label. It allows to override the capitals for the avatar.
	 * If the main label is not a string, you have to fill this prop to show capitals in the avatar */
	avatarLabel?: string;
	/** Chip avatar picture */
	avatarPicture?: string;
	/** Chip background color */
	background?: keyof ThemeObj['palette'];
	/** Chip shape  */
	shape?: 'regular' | 'round';
	/** If an onClose callback is provided, this prop defines if the close action should be active or disabled */
	closable?: boolean;
	/** Chip text color */
	color?: keyof ThemeObj['palette'];
	/** Chip disabled status. If a string is provided it is shown in a tooltip */
	disabled?: boolean | string;
	/** Chip error. If a string is provided it is shown in a tooltip */
	error?: boolean | string;
	/** Define if the chip avatar is visible or hidden */
	hasAvatar?: boolean;
	/** Chip content key text */
	keyLabel?: string;
	/** Chip content text. It can be a simple string or a custom Component, which is then rendered inside a Row */
	label?: string | React.ReactElement;
	/** Chip max width */
	maxWidth?: string;
	/** Chip click callback */
	onClick?: React.ReactEventHandler;
	/** Callback to call when user tries to remove the Chip. If not provided, the close icon is hidden.
	 * Be aware that the close action can be also provided with the actions prop  */
	onClose?: React.ReactEventHandler;
	/** Chip double-click callback */
	onDoubleClick?: React.ReactEventHandler;
	/** Chip size */
	size?: 'small' | 'medium' | 'large';
	/** Tooltip placement */
	tooltipPlacement?: React.ComponentPropsWithoutRef<typeof Tooltip>['placement'];
}

const ActionIcon = styled(Icon)``;

const ActionIconButton = styled(IconButton)``;

const ActionContainer = styled.span<{ $spacing: string }>`
	& > ${ActionIcon}, & > ${ActionIconButton} {
		padding: ${({ $spacing }): SimpleInterpolation => css`calc(${$spacing} / 2)`};
	}
`;

const LabelRow = styled(Row)``;

const ContentRow = styled(Row)<{ $spacing: string }>`
	gap: ${({ $spacing }): string => $spacing};
	&:first-child > ${LabelRow}:first-child {
		padding-left: ${({ $spacing }): SimpleInterpolation => css`calc(${$spacing} * 2)`};
	}
	& > ${LabelRow}:last-child {
		padding-right: ${({ $spacing }): SimpleInterpolation => css`calc(${$spacing} * 2)`};
	}
`;

const ActionsRow = styled(Row)<{ $spacing: string }>`
	gap: ${({ $spacing }): SimpleInterpolation => css`calc(${$spacing} / 2)`};
`;

const ChipContainer = styled(Row)<{
	background: keyof ThemeObj['palette'];
	disabled: boolean;
	onClick?: React.ReactEventHandler;
	onDoubleClick?: React.ReactEventHandler;
	$spacing: string;
}>`
	user-select: none;
	vertical-align: middle;
	line-height: 1.5;
	padding: ${({ $spacing }): SimpleInterpolation =>
		css`calc(${$spacing} / 4) calc(${$spacing} / 2)`};
	gap: ${({ $spacing }): string => $spacing};
	${({ background, disabled, onClick, onDoubleClick, theme }): SimpleInterpolation =>
		!disabled &&
		(onClick || onDoubleClick) &&
		theme.palette[background] &&
		pseudoClasses(theme, background)}
	border-radius: ${(props): string => {
		switch (props.borderRadius) {
			case 'regular':
				return `calc(${props.theme.borderRadius} * 2)`;
			case 'round':
				return '100vh';
			default:
				return '100vh';
		}
	}};
	cursor: ${({ onClick, onDoubleClick }): SimpleInterpolation =>
		(onClick || onDoubleClick) && 'pointer'};
`;

const SIZES: Record<
	NonNullable<ChipProps['size']>,
	{
		avatar: keyof ThemeObj['sizes']['avatar'];
		font: keyof ThemeObj['sizes']['font'];
		icon: React.ComponentPropsWithoutRef<typeof Icon>['size'];
		spacing: string;
	}
> = {
	small: {
		avatar: 'small',
		font: 'extrasmall',
		icon: 'small',
		spacing: '4px'
	},
	medium: {
		avatar: 'medium',
		font: 'small',
		icon: 'medium',
		spacing: '8px'
	},
	large: {
		avatar: 'large',
		font: 'medium',
		icon: 'large',
		spacing: '12px'
	}
};

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(function ChipFn(
	{
		actions = [],
		avatarIcon,
		avatarBackground,
		avatarColor,
		avatarLabel,
		avatarPicture,
		background = 'gray3',
		shape = 'round',
		closable = true,
		color,
		disabled,
		error,
		hasAvatar = true,
		keyLabel,
		label,
		maxWidth,
		onClick,
		onClose,
		onDoubleClick,
		size = 'small',
		tooltipPlacement,
		...rest
	},
	ref
) {
	const innerRef = useRef<HTMLDivElement | null>(null);
	const chipRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
	const theme = useTheme();
	const [tooltipVisible, setTooltipVisible] = useState(false);

	const chipActions = useMemo(() => {
		const $actions = [...actions];
		if (onClose) {
			$actions.push({
				id: 'CloseChipAction',
				icon: 'Close',
				onClick: onClose,
				type: 'button',
				disabled: !closable
			});
		}
		return $actions;
	}, [actions, closable, onClose]);

	const showInnerTooltip = useCallback(() => {
		setTooltipVisible(true);
	}, []);

	const hideInnerTooltip = useCallback(() => {
		setTooltipVisible(false);
	}, []);

	const showLabelTooltip = useCallback(() => {
		maxWidth && typeof label === 'string' && showInnerTooltip();
	}, [label, maxWidth, showInnerTooltip]);

	const hideLabelTooltip = useCallback(() => {
		maxWidth && typeof label === 'string' && hideInnerTooltip();
	}, [hideInnerTooltip, label, maxWidth]);

	const actionItems = useMemo(
		() =>
			map(chipActions, (action, index) => {
				let item;
				const actionDisabled = !!disabled || !action.label;
				const showTooltipHandler = (!actionDisabled && showInnerTooltip) || undefined;
				const hideTooltipHandler = (!actionDisabled && hideInnerTooltip) || undefined;
				if (action.type === 'icon') {
					item = (
						<Tooltip
							key={action.id}
							label={action.label}
							disabled={actionDisabled}
							placement={tooltipPlacement}
						>
							<ActionContainer
								onMouseEnter={showTooltipHandler}
								onMouseLeave={hideTooltipHandler}
								onFocus={showTooltipHandler}
								onBlur={hideTooltipHandler}
								$spacing={SIZES[size].spacing}
							>
								<ActionIcon
									icon={action.icon}
									color={error ? 'gray6' : action.color}
									disabled={!!disabled || action.disabled}
									size={SIZES[size].icon}
								/>
							</ActionContainer>
						</Tooltip>
					);
				} else if (action.type === 'button') {
					const clickHandler: React.ReactEventHandler | undefined = action.onClick
						? (event): void => {
								event.preventDefault();
								action.onClick(event);
						  }
						: undefined;
					item = (
						<Tooltip
							key={action.id}
							label={action.label}
							disabled={actionDisabled}
							placement={tooltipPlacement}
						>
							<ActionContainer
								onMouseEnter={showTooltipHandler}
								onMouseLeave={hideTooltipHandler}
								onFocus={showTooltipHandler}
								onBlur={hideTooltipHandler}
								$spacing={SIZES[size].spacing}
							>
								<ActionIconButton
									icon={action.icon}
									iconColor={error ? 'error' : action.color}
									borderRadius={shape}
									backgroundColor={error || !action.background ? 'gray5' : action.background}
									disabled={!!disabled || action.disabled}
									onClick={clickHandler}
									customSize={{
										iconSize: SIZES[size].icon,
										paddingSize: 0 // padding set through styled component
									}}
									tabIndex={index}
								/>
							</ActionContainer>
						</Tooltip>
					);
				}

				return item;
			}),
		[
			chipActions,
			disabled,
			showInnerTooltip,
			hideInnerTooltip,
			tooltipPlacement,
			size,
			error,
			shape
		]
	);

	const clickHandler = useCallback(
		(event) => {
			event.preventDefault();
			onClick && onClick(event);
		},
		[onClick]
	);

	const dblClickHandler = useCallback(
		(event) => {
			event.preventDefault();
			onDoubleClick && onDoubleClick(event);
		},
		[onDoubleClick]
	);

	return (
		<Tooltip
			disabled={
				((typeof error !== 'string' || !error) && (typeof disabled !== 'string' || !disabled)) ||
				tooltipVisible
			}
			label={
				(typeof error === 'string' && error) || (typeof disabled === 'string' && disabled) || ''
			}
			maxWidth="100%"
			placement={tooltipPlacement}
		>
			<ChipContainer
				display="inline-flex"
				wrap="nowrap"
				orientation="horizontal"
				ref={chipRef}
				background={error ? 'error' : background}
				borderRadius={shape}
				width="fit"
				maxWidth={maxWidth}
				mainAligment="space-between"
				$spacing={SIZES[size].spacing}
				onClick={onClick && clickHandler}
				onDoubleClick={onDoubleClick && dblClickHandler}
				disabled={!!disabled}
				{...rest}
			>
				{hasAvatar && (
					<Avatar
						size={SIZES[size].avatar}
						label={avatarLabel || (typeof label === 'string' && label) || ''}
						picture={avatarPicture}
						icon={avatarIcon}
						background={error ? 'error.active' : avatarBackground || (avatarIcon && 'secondary')}
						color={error ? 'gray6' : avatarColor}
						shape={shape === 'regular' ? 'square' : shape}
						disabled={!!disabled}
					/>
				)}
				<ContentRow
					wrap="nowrap"
					minHeight={`calc(${theme.sizes.avatar[SIZES[size].avatar].diameter} + calc(${
						SIZES[size].spacing
					} / 4))`}
					maxWidth={
						maxWidth &&
						`calc(100% - calc(${theme.sizes.avatar[SIZES[size].avatar].diameter} + ${
							SIZES[size].spacing
						}))`
					}
					$spacing={SIZES[size].spacing}
				>
					{keyLabel && (
						<LabelRow wrap="nowrap" flexShrink={0}>
							<Text
								weight="regular"
								size={SIZES[size].font}
								color={error ? 'gray6' : color}
								disabled={!!disabled}
							>
								{keyLabel}
							</Text>
						</LabelRow>
					)}
					{label && (
						<LabelRow
							wrap="nowrap"
							takeAvailableSpace={!!maxWidth}
							onMouseEnter={showLabelTooltip}
							onMouseLeave={hideLabelTooltip}
							onFocus={showLabelTooltip}
							onBlur={hideLabelTooltip}
						>
							<Tooltip
								label={(typeof label === 'string' && label) || ''}
								maxWidth="100%"
								disabled={!maxWidth || typeof label !== 'string'}
								overflowTooltip
								placement={tooltipPlacement}
							>
								<Text
									weight="light"
									size={SIZES[size].font}
									color={error ? 'gray6' : color}
									disabled={!!disabled}
								>
									{typeof label === 'string' ? label : <Row wrap="nowrap">{label}</Row>}
								</Text>
							</Tooltip>
						</LabelRow>
					)}
					{actionItems && actionItems.length > 0 && (
						<ActionsRow wrap="nowrap" $spacing={SIZES[size].spacing}>
							{actionItems}
						</ActionsRow>
					)}
				</ContentRow>
			</ChipContainer>
		</Tooltip>
	);
});

export default Chip;