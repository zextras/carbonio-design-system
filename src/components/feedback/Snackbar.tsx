/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect } from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { ScreenMode, useScreenMode } from '../../hooks/useScreenMode';
import { Button } from '../basic/Button';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { Container, ContainerProps } from '../layout/Container';
import { Padding } from '../layout/Padding';
import { Row } from '../layout/Row';
import { Transition } from '../utilities/Transition';
import { Portal } from '../utilities/Portal';

const SnackContainer = styled(Container)<{ $zIndex: number; $screenMode: ScreenMode }>`
	position: fixed;
	box-shadow: 0 0 4px 0 rgba(166, 166, 166, 0.5);
	user-select: none;
	z-index: ${({ $zIndex }): number => $zIndex};
	${({ $screenMode, theme }): SimpleInterpolation =>
		$screenMode === 'desktop' &&
		css`
			right: 0;
			bottom: 5vh;
			max-width: 400px;
			min-width: calc(320px - ${theme.sizes.padding.small} - ${theme.sizes.padding.small});
		`};
	${({ $screenMode, theme }): SimpleInterpolation =>
		$screenMode === 'mobile' &&
		css`
			right: 50%;
			transform: translateX(50%);
			bottom: ${theme.sizes.padding.small};
			min-width: calc(320px - ${theme.sizes.padding.small} - ${theme.sizes.padding.small});
			max-width: calc(100% - ${theme.sizes.padding.small} - ${theme.sizes.padding.small});
		`};
`;

const icons = {
	success: 'Checkmark',
	info: 'InfoOutline',
	warning: 'AlertTriangleOutline',
	error: 'Close'
};

interface SnackbarProps extends ContainerProps {
	/** Whether to show the Snackbar or not */
	open?: boolean;
	/** Snackbar Type */
	type?: 'success' | 'info' | 'warning' | 'error';
	/** Snackbar text message */
	label: string;
	/** Snackbar button text */
	actionLabel?: string;
	/** Button's click callback */
	onActionClick?: () => void;
	/** Callback to handle Snackbar closing */
	onClose?: () => void;
	/** Disable the autoHide functionality */
	disableAutoHide?: boolean;
	/** Hide the button in the Snackbar */
	hideButton?: boolean;
	/** zIndex of the snackbar */
	zIndex?: number;
	/** autoHide timing in milliseconds */
	autoHideTimeout?: number;
	/** Window object to use as reference to determine the screenMode */
	target?: Window;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Flag to disable the multiline implementation */
	singleLine?: boolean;
}

const Snackbar = React.forwardRef<HTMLDivElement, SnackbarProps>(function SnackbarFn(
	{
		open = false,
		type = 'info',
		label,
		disableAutoHide = false,
		hideButton = false,
		actionLabel = 'Ok',
		onActionClick,
		onClose,
		zIndex = 1000,
		autoHideTimeout = 4000,
		target = window,
		disablePortal = false,
		singleLine = false,
		...rest
	},
	ref
) {
	const screenMode = useScreenMode(target);
	const handleClick = useCallback(() => {
		onActionClick ? onActionClick() : onClose && onClose();
	}, [onActionClick, onClose]);

	useEffect(() => {
		let timeout: NodeJS.Timeout;
		if (open && !disableAutoHide && onClose) {
			timeout = setTimeout(onClose, autoHideTimeout);
		}
		return (): void => clearTimeout(timeout);
	}, [open, disableAutoHide, onClose, autoHideTimeout]);

	if (disablePortal && !open) return null;

	return (
		<Portal show={open} disablePortal={disablePortal}>
			<Transition ref={ref} type="fade-in-right">
				<SnackContainer
					$screenMode={screenMode}
					orientation="horizontal"
					mainAlignment="space-between"
					background={type}
					height="auto"
					width="auto"
					$zIndex={zIndex}
					data-testid="snackbar"
					{...rest}
				>
					<Row
						mainAlignment="flex-start"
						takeAvailableSpace
						padding={{
							top: 'small',
							bottom: 'small',
							left: 'small'
						}}
					>
						<Icon size="large" icon={icons[type]} color="gray6" />
						<Padding
							left="medium"
							right="medium"
							style={{
								flexBasis: 0,
								flexGrow: 1,
								minWidth: '1px'
							}}
						>
							<Text color="gray6" size="large" overflow={singleLine ? 'ellipsis' : 'break-word'}>
								{label}
							</Text>
						</Padding>
					</Row>
					{!hideButton && (
						<Padding right="extrasmall">
							<Button label={actionLabel} type="ghost" labelColor="gray6" onClick={handleClick} />
						</Padding>
					)}
				</SnackContainer>
			</Transition>
		</Portal>
	);
});

export { Snackbar, SnackbarProps };
