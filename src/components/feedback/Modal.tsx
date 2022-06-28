/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { noop } from 'lodash';
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, {
	HTMLAttributes,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState
} from 'react';
import styled, { css, SimpleInterpolation } from 'styled-components';
import { useCombinedRefs } from '../../hooks/useCombinedRefs';
import { KeyboardPreset, useKeyboard } from '../../hooks/useKeyboard';
import type { ThemeObj } from '../../theme/theme';
import { ThemeContext } from '../../theme/theme-context-provider';
import { Button } from '../basic/Button';
import { Text } from '../basic/Text';
import { IconButton } from '../inputs/IconButton';
import { Container } from '../layout/Container';
import { Divider } from '../layout/Divider';
import { Row } from '../layout/Row';
import { Portal } from '../utilities/Portal';
import { Transition } from '../utilities/Transition';
import {
	getScrollbarSize,
	isBodyOverflowing,
	ModalContainer,
	ModalContent,
	ModalWrapper
} from './ModalComponents';

function copyToClipboard(node: HTMLDivElement | null, windowObj: Window): void {
	const el = windowObj.document.createElement('textarea');
	if (el && node?.textContent) {
		el.value = node.textContent;
		windowObj.document.body.appendChild(el);
		el.select();
		windowObj.document.execCommand('copy');
		windowObj.document.body.removeChild(el);
	}
}

const ModalTitle = styled(Text)<{ centered: boolean }>`
	box-sizing: border-box;
	width: 100%;
	flex-grow: 1;
	flex-basis: 0;
	line-height: 1.5;
	padding: ${(props): string =>
		`${props.theme.sizes.padding.small} ${props.theme.sizes.padding.small} ${props.theme.sizes.padding.small} 0`};
	${({ centered }): SimpleInterpolation =>
		centered &&
		css`
			text-align: center;
		`};
`;
const ModalBody = styled.div<{ maxHeight: string; centered: boolean }>`
	overflow-y: auto;
	max-height: ${(props): string => props.maxHeight};
	max-width: 100%;
	box-sizing: border-box;
	width: 100%;
	padding-top: ${(props): string => props.theme.sizes.padding.large};
	padding-bottom: ${(props): string => props.theme.sizes.padding.large};
	${(props): SimpleInterpolation =>
		props.centered &&
		css`
			text-align: center;
		`};
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: transparent;
	}

	&::-webkit-scrollbar-thumb {
		background-color: ${({ theme }): string => theme.palette.gray3.regular};
		border-radius: 4px;
	}
`;
const OptionalFooterContainer = styled(Container)`
	min-width: 1px;
	flex-basis: auto;
	flex-grow: 1;
`;
const ButtonContainer = styled(Container)`
	min-width: 1px;
	flex-basis: auto;
	flex-grow: 1;
`;
const DismissButton = styled(Button)`
	margin-right: ${(props): string => props.theme.sizes.padding.large};
	flex-basis: auto;
	min-width: 100px;
	flex-shrink: 1;
`;
const ConfirmButton = styled(Button)`
	flex-basis: auto;
	min-width: 100px;
	flex-shrink: 1;
`;

interface ModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	/** Modal background */
	background?: string | keyof ThemeObj['palette'];
	/** Modal type */
	type?: 'default' | 'error';
	/** Modal title */
	title?: string | React.ReactElement;
	/** Modal size */
	size?: 'extrasmall' | 'small' | 'medium' | 'large';
	/** Boolean to show the modal */
	open?: boolean;
	/** Centered Modal */
	centered?: boolean;
	/** Callback for main action */
	onConfirm?: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Label for the Main action Button */
	confirmLabel?: string;
	/** BackgroundColor for the Main action Button */
	confirmColor?: string | keyof ThemeObj['palette'];
	/** Callback for secondary action */
	onSecondaryAction?: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Label for the Secondary action Button */
	secondaryActionLabel?: string;
	/** Callback to close the Modal */
	onClose?: (event: React.MouseEvent | KeyboardEvent) => void;
	/** Label for the Modal close Button */
	dismissLabel?: string;
	/** Label for copy button in the Error Modal */
	copyLabel?: string;
	/** Optional element to show in the footer of the Modal */
	optionalFooter?: React.ReactElement;
	/** Prop to override the default footer buttons */
	customFooter?: React.ReactElement;
	/** Hide the footer completely */
	hideFooter?: boolean;
	/** Show icon to close Modal */
	showCloseIcon?: boolean;
	/** Css property to handle the stack order of multiple modals */
	zIndex?: number;
	/** max height of the modal body */
	maxHeight?: string;
	/** Flag to disable the Portal implementation */
	disablePortal?: boolean;
	/** Content of the modal */
	children?: React.ReactNode | React.ReactNode[];
}

const ModalFooter: React.VFC<
	Pick<
		ModalProps,
		| 'type'
		| 'centered'
		| 'onConfirm'
		| 'confirmLabel'
		| 'confirmColor'
		| 'onSecondaryAction'
		| 'secondaryActionLabel'
		| 'onClose'
		| 'dismissLabel'
		| 'copyLabel'
		| 'optionalFooter'
	> & { onCopyClipboard: () => void }
> = ({
	type,
	centered,
	onConfirm,
	confirmLabel,
	confirmColor,
	onSecondaryAction,
	secondaryActionLabel,
	onClose,
	dismissLabel,
	copyLabel,
	optionalFooter,
	onCopyClipboard
}) => {
	const secondaryButton = useMemo(() => {
		let button;
		if (type === 'error') {
			button = <DismissButton onClick={onCopyClipboard} color="secondary" label={copyLabel} />;
		} else {
			button =
				onSecondaryAction && secondaryActionLabel ? (
					<DismissButton
						color="primary"
						type="outlined"
						onClick={onSecondaryAction}
						label={secondaryActionLabel}
					/>
				) : dismissLabel && onClose ? (
					<DismissButton color="secondary" onClick={onClose} label={dismissLabel} />
				) : undefined;
		}
		return button;
	}, [
		type,
		onCopyClipboard,
		copyLabel,
		onSecondaryAction,
		secondaryActionLabel,
		dismissLabel,
		onClose
	]);

	return (
		<>
			{optionalFooter && (
				<OptionalFooterContainer
					padding={centered ? { bottom: 'large' } : { right: 'large' }}
					orientation="horizontal"
					mainAlignment="flex-start"
				>
					{optionalFooter}
				</OptionalFooterContainer>
			)}
			<ButtonContainer orientation="horizontal" mainAlignment={centered ? 'center' : 'flex-end'}>
				{secondaryButton}
				{(onConfirm || onClose) && (
					<ConfirmButton
						color={confirmColor}
						onClick={(onConfirm || onClose) as NonNullable<typeof onClose | typeof onConfirm>}
						label={confirmLabel}
					/>
				)}
			</ButtonContainer>
		</>
	);
};

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(function ModalFn(
	{
		background = 'gray6',
		type = 'default',
		title: Title,
		size = 'small',
		open = false,
		centered = false,
		onConfirm,
		confirmLabel = 'OK',
		confirmColor = 'primary',
		onSecondaryAction,
		secondaryActionLabel,
		onClose = noop,
		dismissLabel,
		copyLabel = 'Copy',
		optionalFooter,
		customFooter,
		hideFooter = false,
		showCloseIcon = true,
		maxHeight = '60vh',
		children,
		disablePortal = false,
		zIndex = 999,
		...rest
	},
	ref
) {
	const [delayedOpen, setDelayedOpen] = useState(false);
	const { windowObj } = useContext(ThemeContext);

	const innerRef = useRef<HTMLDivElement | null>(null);
	const modalRef = useCombinedRefs<HTMLDivElement>(ref, innerRef);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const modalBodyRef = useRef<HTMLDivElement | null>(null);
	const startSentinelRef = useRef<HTMLDivElement | null>(null);
	const endSentinelRef = useRef<HTMLDivElement | null>(null);

	const onBackdropClick = useCallback(
		(e) => {
			if (e) {
				e.stopPropagation();
			}
			modalContentRef.current &&
				!e.isDefaultPrevented() &&
				!modalContentRef.current.contains(e.target) &&
				onClose &&
				onClose(e);
		},
		[onClose]
	);
	const onCopyClipboard = useCallback(
		() => copyToClipboard(modalBodyRef.current, windowObj),
		[windowObj]
	);

	const onStartSentinelFocus = useCallback(() => {
		if (modalContentRef.current) {
			const nodeList = modalContentRef.current.querySelectorAll<HTMLElement>('[tabindex]');
			nodeList[nodeList.length - 1].focus();
		}
	}, []);
	const onEndSentinelFocus = useCallback(() => {
		if (modalContentRef.current != null) {
			modalContentRef.current.querySelector<HTMLElement>('[tabindex]')?.focus();
		}
	}, []);

	const escapeEvent = useMemo<KeyboardPreset>(
		() => [{ type: 'keydown', callback: onClose || noop, keys: ['Escape'], modifier: false }],
		[onClose]
	);
	useKeyboard(modalRef, escapeEvent);

	useEffect(() => {
		if (open) {
			const defaultOverflowY = windowObj.document.body.style.overflowY;
			const defaultPaddingRight = windowObj.document.body.style.paddingRight;

			windowObj.document.body.style.overflowY = 'hidden';
			modalRef.current != null &&
				isBodyOverflowing(modalRef, windowObj) &&
				(windowObj.document.body.style.paddingRight = `${getScrollbarSize(windowObj)}px`);

			return (): void => {
				windowObj.document.body.style.overflowY = defaultOverflowY;
				windowObj.document.body.style.paddingRight = defaultPaddingRight;
			};
		}
		return (): void => undefined;
	}, [modalRef, open, windowObj]);

	useEffect(() => {
		const focusedElement = windowObj.document.activeElement;

		if (open) {
			modalContentRef.current?.focus();
			startSentinelRef.current?.addEventListener('focus', onStartSentinelFocus);
			endSentinelRef.current?.addEventListener('focus', onEndSentinelFocus);
		}
		const startSentinelRefSave = startSentinelRef.current;
		const endSentinelRefSave = endSentinelRef.current;
		return (): void => {
			startSentinelRefSave &&
				startSentinelRefSave.removeEventListener('focus', onStartSentinelFocus);
			endSentinelRefSave && endSentinelRefSave.removeEventListener('focus', onEndSentinelFocus);
			open && focusedElement && (focusedElement as HTMLElement).focus();
		};
	}, [open, onStartSentinelFocus, onEndSentinelFocus, windowObj.document.activeElement]);

	useEffect(() => {
		setTimeout(() => setDelayedOpen(open), 1);
	}, [open]);

	return (
		<Portal show={open} disablePortal={disablePortal}>
			<ModalContainer
				ref={modalRef}
				open={delayedOpen}
				mounted={open}
				onClick={onBackdropClick}
				zIndex={zIndex}
				data-testid="modal"
				{...rest}
			>
				<div tabIndex={0} ref={startSentinelRef} />
				<Transition type="scale-in" apply={delayedOpen}>
					<ModalWrapper>
						<ModalContent
							ref={modalContentRef}
							background={background}
							tabIndex={-1}
							$size={size}
							crossAlignment="flex-start"
							height="auto"
						>
							<Row width="100%" padding={{ bottom: 'small' }}>
								<ModalTitle
									centered={centered}
									color={type === 'error' ? 'error' : undefined}
									size="medium"
									weight="bold"
								>
									{Title}
								</ModalTitle>
								{showCloseIcon && <IconButton icon="Close" size="large" onClick={onClose} />}
							</Row>
							<Divider />
							<ModalBody centered={centered} ref={modalBodyRef} maxHeight={maxHeight}>
								{children}
							</ModalBody>
							{!hideFooter && (
								<>
									<Divider />
									<Container
										orientation={centered ? 'vertical' : 'horizontal'}
										mainAlignment="flex-end"
										padding={{ top: 'large' }}
									>
										{customFooter || (
											<ModalFooter
												type={type}
												centered={centered}
												optionalFooter={optionalFooter}
												confirmLabel={confirmLabel}
												confirmColor={confirmColor}
												dismissLabel={dismissLabel}
												onConfirm={onConfirm}
												onClose={onClose}
												onSecondaryAction={onSecondaryAction}
												secondaryActionLabel={secondaryActionLabel}
												onCopyClipboard={onCopyClipboard}
												copyLabel={copyLabel}
											/>
										)}
									</Container>
								</>
							)}
						</ModalContent>
					</ModalWrapper>
				</Transition>
				<div tabIndex={0} ref={endSentinelRef} />
			</ModalContainer>
		</Portal>
	);
});

export { Modal, ModalProps };
