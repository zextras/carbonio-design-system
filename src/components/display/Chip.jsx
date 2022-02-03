/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';
import map from 'lodash/map';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';
import Tooltip from './Tooltip';
import Padding from '../layout/Padding';
import Icon from '../basic/Icon';
import IconButton from '../inputs/IconButton';
import Avatar from '../basic/Avatar';
import Row from '../layout/Row';
import Text from '../basic/Text';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { useTheme, withPseudoClasses } from '../../theme/theme-utils';

const ChipContainer = styled(Row)`
	user-select: none;
	vertical-align: middle;
	${({ background, disabled, theme }) =>
		!disabled && theme.palette[background] && withPseudoClasses(theme, background)}
	border-radius: ${(props) => {
		switch (props.borderRadius) {
			case 'regular':
				return `calc(${props.theme.borderRadius} * 2)`;
			case 'round':
				return '100vh';
			default:
				return '100vh';
		}
	}};
	cursor: ${({ onClick, onDoubleClick }) => (onClick || onDoubleClick ? 'pointer' : 'default')};
`;

const Chip = React.forwardRef(function ChipFn(
	{
		actions,
		avatarIcon,
		avatarBackground,
		avatarColor,
		avatarLabel,
		avatarPicture,
		background,
		shape,
		closable,
		color,
		disabled,
		error,
		hasAvatar,
		keyLabel,
		label,
		maxWidth,
		onClick,
		onClose,
		onDoubleClick,
		size,
		...rest
	},
	ref
) {
	const innerRef = useRef();
	const chipRef = useCombinedRefs(ref, innerRef);
	const theme = useTheme();
	const [tooltipVisible, setTooltipVisible] = useState(false);

	const paddingSize = useMemo(() => {
		const sizes = Object.keys(theme.sizes.padding);
		const sizeIndex = sizes.indexOf(size);
		return sizeIndex > 0 ? sizes[sizeIndex - 1] : 'extrasmall';
	}, [size, theme]);

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
						<Tooltip key={action.id} label={action.label} disabled={actionDisabled}>
							<Padding
								horizontal={paddingSize}
								onMouseEnter={showTooltipHandler}
								onMouseLeave={hideTooltipHandler}
								onFocus={showTooltipHandler}
								onBlur={hideTooltipHandler}
							>
								<Icon
									icon={action.icon}
									color={error ? 'gray6' : action.color}
									disabled={!!disabled || action.disabled}
									size={size}
								/>
							</Padding>
						</Tooltip>
					);
				} else if (action.type === 'button') {
					const clickHandler = action.onClick
						? (event) => {
								event.preventDefault();
								action.onClick(event);
						  }
						: undefined;
					item = (
						<Tooltip key={action.id} label={action.label} disabled={actionDisabled}>
							<Padding
								value={`0 0 0 calc(${theme.sizes.padding[paddingSize]} / 2)`}
								onMouseEnter={showTooltipHandler}
								onMouseLeave={hideTooltipHandler}
								onFocus={showTooltipHandler}
								onBlur={hideTooltipHandler}
							>
								<IconButton
									icon={action.icon}
									iconColor={error ? 'error' : action.color}
									borderRadius={shape}
									backgroundColor={error || !action.background ? 'gray5' : action.background}
									disabled={!!disabled || action.disabled}
									onClick={clickHandler}
									customSize={{
										iconSize: size,
										paddingSize
									}}
									tabIndex={index}
								/>
							</Padding>
						</Tooltip>
					);
				}

				return item;
			}),
		[
			chipActions,
			disabled,
			paddingSize,
			showInnerTooltip,
			hideInnerTooltip,
			error,
			size,
			theme.sizes.padding,
			shape
		]
	);

	const clickHandler = useCallback(
		(event) => {
			event.preventDefault();
			onClick(event);
		},
		[onClick]
	);

	const dblClickHandler = useCallback(
		(event) => {
			event.preventDefault();
			onDoubleClick(event);
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
			maxWidth="auto"
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
				padding={{ all: paddingSize }}
				onClick={onClick && clickHandler}
				onDoubleClick={onDoubleClick && dblClickHandler}
				disabled={!!disabled}
				{...rest}
			>
				{hasAvatar && (
					<Avatar
						size={size}
						label={avatarLabel || (typeof label === 'string' && label) || ''}
						picture={avatarPicture}
						icon={avatarIcon}
						background={error ? 'error.active' : avatarBackground || (avatarIcon && 'secondary')}
						color={error ? 'gray6' : avatarColor}
						shape={shape === 'regular' ? 'square' : shape}
						disabled={!!disabled}
					/>
				)}
				<Row
					wrap="nowrap"
					minHeight={`calc(${theme.sizes.avatar[size].diameter} + ${theme.sizes.padding[paddingSize]})`}
					maxWidth={maxWidth && `calc(100% - ${theme.sizes.avatar[size].diameter})`}
				>
					{keyLabel && (
						<Row wrap="nowrap" flexShrink={0} padding={{ left: paddingSize }}>
							<Text
								weight="regular"
								size={size}
								color={error ? 'gray6' : color}
								disabled={!!disabled}
							>
								{keyLabel}
							</Text>
						</Row>
					)}
					{label && (
						<Tooltip
							label={(typeof label === 'string' && label) || ''}
							maxWidth="unset"
							disabled={!maxWidth || typeof label !== 'string'}
						>
							<Row
								wrap="nowrap"
								takeAvailableSpace={!!maxWidth}
								padding={{ horizontal: paddingSize }}
								onMouseEnter={showLabelTooltip}
								onMouseLeave={hideLabelTooltip}
								onFocus={showLabelTooltip}
								onBlur={hideLabelTooltip}
							>
								<Text
									weight="light"
									size={size}
									color={error ? 'gray6' : color}
									disabled={!!disabled}
								>
									{typeof label === 'string' ? label : <Row wrap="nowrap">{label}</Row>}
								</Text>
							</Row>
						</Tooltip>
					)}
					{actionItems && actionItems.length > 0 && (
						<Row wrap="nowrap" padding={{ left: paddingSize }}>
							{actionItems}
						</Row>
					)}
				</Row>
			</ChipContainer>
		</Tooltip>
	);
});

Chip.propTypes = {
	/** Chip actions (buttons or icons) */
	actions: PropTypes.arrayOf(
		PropTypes.shape({
			/** Chip action background (button type only) */
			background: PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.oneOf(Object.keys(Theme.palette))
			]),
			/** Chip action icon color */
			color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
			/** Chip action disabled status */
			disabled: PropTypes.bool,
			/** Chip action icon */
			icon: PropTypes.string.isRequired,
			/** Chip action id (required for key attribute) */
			id: PropTypes.string.isRequired,
			/** Chip action label value. It is shown in a tooltip. To not render the tooltip, just don't value the prop.
			 * Tooltips of the actions are not shown in case the chip is disabled */
			label: PropTypes.string,
			/** Chip action click callback (button type only). NB: onClick event IS propagated. It's up to the dev to eventually stop the propagation */
			onClick: PropTypes.func,
			/** Chip action type */
			type: PropTypes.oneOf(['icon', 'button']).isRequired
		})
	),
	/** Chip Avatar Icon */
	avatarIcon: PropTypes.string,
	/** Chip Avatar Background Color */
	avatarBackground: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.oneOf(Object.keys(Theme.palette))
	]),
	/** Chip avatar color (icon color or capitals color) */
	avatarColor: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Chip avatar label. It allows to override the capitals for the avatar.
	 * If the label is not a string, you have to fill this prop to show capitals in the avatar */
	avatarLabel: PropTypes.string,
	/** Chip avatar picture */
	avatarPicture: PropTypes.string,
	/** Chip background color */
	background: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Chip shape  */
	shape: PropTypes.oneOf(['regular', 'round']),
	/** If an onClose callback is provided, this prop defines if the close action should be active or disabled */
	closable: PropTypes.bool,
	/** Chip text color */
	color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(Object.keys(Theme.palette))]),
	/** Chip disabled status. If a string is provided it is shown in a tooltip */
	disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	/** Chip error. If a string is provided it is shown in a tooltip */
	error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
	/** Define if the chip avatar is visible or hidden */
	hasAvatar: PropTypes.bool,
	/** Chip content key text */
	keyLabel: PropTypes.string,
	/** Chip content text. It can be a simple string or a custom Component, which is then rendered inside a Row */
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
	/** Chip max width */
	maxWidth: PropTypes.string,
	/** Chip click callback */
	onClick: PropTypes.func,
	/** Callback to call when user tries to remove the Chip. If not provided, the close icon is hidden.
	 * Be aware that the close action can be also provided with the actions prop  */
	onClose: PropTypes.func,
	/** Chip double-click callback */
	onDoubleClick: PropTypes.func,
	/** Chip size */
	size: PropTypes.oneOf(['small', 'medium', 'large'])
};

Chip.defaultProps = {
	actions: [],
	avatarLabel: '',
	background: 'gray3',
	shape: 'round',
	closable: true,
	hasAvatar: true,
	size: 'small'
};

export default Chip;
