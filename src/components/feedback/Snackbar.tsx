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
import { Row } from '../layout/Row';
import { Portal } from '../utilities/Portal';
import { Transition } from '../utilities/Transition';

const SnackContainer = styled(Container)<{ $zIndex: number; $screenMode: ScreenMode }>`
	position: fixed;
	box-shadow: ${({ theme }): string => theme.shadows.snackbar};
	user-select: none;
	z-index: ${({ $zIndex }): number => $zIndex};
	right: 0;
	bottom: 5vh;
	${({ $screenMode }): SimpleInterpolation =>
		$screenMode === 'mobile' &&
		css`
			right: 50%;
			transform: translateX(50%);
		`};
`;

const icons = {
	success: 'CheckmarkOutline',
	info: 'InfoOutline',
	warning: 'AlertTriangleOutline',
	error: 'CloseCircleOutline'
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
					mainAlignment="flex-start"
					background={type}
					height="auto"
					width="auto"
					$zIndex={zIndex}
					data-testid="snackbar"
					padding={{
						top: '0.5rem',
						right: hideButton ? '1.5rem' : '0.5rem',
						bottom: '0.5rem',
						left: '1.5rem'
					}}
					gap={'1rem'}
					maxWidth={screenMode === 'mobile' ? '100%' : '40%'}
					{...rest}
				>
					<Row flexShrink={0}>
						<Icon size="large" icon={icons[type]} color="gray6" />
					</Row>
					<Container
						gap={'1rem'}
						wrap={'wrap'}
						flexBasis={'fit-content'}
						mainAlignment={'flex-start'}
						orientation={'row'}
						minWidth={0}
					>
						<Row
							mainAlignment="flex-start"
							flexBasis={'50%'}
							flexShrink={1}
							flexGrow={1}
							width={'auto'}
						>
							<Text color="gray6" size="medium" overflow={singleLine ? 'ellipsis' : 'break-word'}>
								{label}
							</Text>
						</Row>
						{!hideButton && (
							<Row
								margin={{ left: 'auto', right: '0' }}
								wrap={'nowrap'}
								flexGrow={0}
								flexShrink={0}
								minWidth={0}
								flexBasis={'fit-content'}
							>
								<Button label={actionLabel} type="ghost" color="gray6" onClick={handleClick} />
							</Row>
						)}
					</Container>
				</SnackContainer>
			</Transition>
		</Portal>
	);
});

export { Snackbar, SnackbarProps };
