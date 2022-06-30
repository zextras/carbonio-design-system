/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import { map } from 'lodash';
import styled, { css, SimpleInterpolation } from 'styled-components';
import type { ThemeObj } from '../../theme/theme';
import { Container, ContainerProps } from '../layout/Container';
import { Tooltip } from './Tooltip';
import { Icon } from '../basic/Icon';
import { IconButton, IconButtonProps } from '../inputs/IconButton';
import { Avatar } from '../basic/Avatar';
import { Row, RowProps } from '../layout/Row';
import { Text } from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useTheme, pseudoClasses } from '../../theme/theme-utils';

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
			onClick: IconButtonProps['onClick'];
			/** Chip action background (button type only) */
			background?: keyof ThemeObj['palette'];
	  }
	| {
			/** Chip action type */
			type: 'icon';
	  }
);

interface ChipProps extends RowProps {
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
	onClose?: IconButtonProps['onClick'];
	/** Chip double-click callback */
	onDoubleClick?: React.ReactEventHandler;
	/** Chip size */
	size?: 'small' | 'medium' | 'large';
	/** Tooltip placement */
	tooltipPlacement?: React.ComponentPropsWithoutRef<typeof Tooltip>['placement'];
}

const ActionIcon = styled(Icon)``;

const ActionIconButton = styled(IconButton)``;

const ActionContainer = styled.div<{ $spacing: string }>`
	min-width: fit-content;
	& > ${ActionIcon} {
		padding: ${({ $spacing }): SimpleInterpolation => css`calc(${$spacing} / 2)`};
	}
`;

const LabelContainer = styled(Container)``;

const ContentContainer = styled(Container)<{ gap: ContainerProps['gap'] }>`
	&:first-child > ${LabelContainer}:first-child {
		padding-left: ${({ gap }): SimpleInterpolation => css`calc(${gap} * 2)`};
	}
	& > ${LabelContainer}:last-child {
		padding-right: ${({ gap }): SimpleInterpolation => css`calc(${gap} * 2)`};
	}
`;

const ChipContainer = styled(Container)<{
	background: keyof ThemeObj['palette'];
	disabled: boolean;
	onClick?: React.ReactEventHandler;
	onDoubleClick?: React.ReactEventHandler;
}>`
	user-select: none;
	vertical-align: middle;
	line-height: 1.5;
	${({ background, disabled, onClick, onDoubleClick, theme }): SimpleInterpolation =>
		!disabled &&
		(onClick || onDoubleClick) &&
		theme.palette[background] &&
		pseudoClasses(theme, background)};
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
		onClick || onDoubleClick ? 'pointer' : 'default'};
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
			map(chipActions, (action) => {
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
					const clickHandler: IconButtonProps['onClick'] = (event) => {
						event.preventDefault();
						action.onClick(event);
					};
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
										paddingSize: `calc(${SIZES[size].spacing} / 2)`
									}}
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
				wrap="nowrap"
				orientation="horizontal"
				ref={chipRef}
				background={error ? 'error' : background}
				borderRadius={shape}
				maxWidth={maxWidth}
				mainAlignment="space-between"
				gap={SIZES[size].spacing}
				padding={{
					vertical: `calc(${SIZES[size].spacing} / 4)`,
					horizontal: `calc(${SIZES[size].spacing} / 2)`
				}}
				onClick={onClick && clickHandler}
				onDoubleClick={onDoubleClick && dblClickHandler}
				disabled={!!disabled}
				width="fit"
				height="fit"
				minWidth={maxWidth ? '0' : 'max-content'}
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
				<ContentContainer
					wrap="nowrap"
					orientation="horizontal"
					width="fit"
					minWidth={maxWidth ? '0' : 'fit'}
					minHeight={`calc(${theme.sizes.avatar[SIZES[size].avatar].diameter} + calc(${
						SIZES[size].spacing
					} / 4))`}
					maxWidth={
						maxWidth &&
						`calc(100% - calc(${theme.sizes.avatar[SIZES[size].avatar].diameter} + ${
							SIZES[size].spacing
						}))`
					}
					gap={SIZES[size].spacing}
				>
					{keyLabel && (
						<LabelContainer wrap="nowrap" width="auto">
							<Text
								weight="regular"
								size={SIZES[size].font}
								color={error ? 'gray6' : color}
								disabled={!!disabled}
							>
								{keyLabel}
							</Text>
						</LabelContainer>
					)}
					{label && (
						<LabelContainer
							width="fit"
							onMouseEnter={showLabelTooltip}
							onMouseLeave={hideLabelTooltip}
							onFocus={showLabelTooltip}
							onBlur={hideLabelTooltip}
							flexShrink={maxWidth ? 1 : 0}
							minWidth="0"
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
						</LabelContainer>
					)}
					{actionItems && actionItems.length > 0 && (
						<Container
							gap={`calc(${SIZES[size].spacing} / 2)`}
							orientation="horizontal"
							width="fit"
							minWidth="fit"
							flexShrink={0}
						>
							{actionItems}
						</Container>
					)}
				</ContentContainer>
			</ChipContainer>
		</Tooltip>
	);
});

export { Chip, ChipProps, ChipAction };
