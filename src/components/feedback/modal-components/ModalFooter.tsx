/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useMemo } from 'react';

import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { Button } from '../../basic/Button';
import { Container } from '../../layout/Container';
import { Padding } from '../../layout/Padding';

const OptionalFooterContainer = styled(Container)`
	min-width: 0.0625rem;
	flex-basis: auto;
	flex-grow: 1;
`;

const ButtonContainer = styled(Container)<{ $pushLeftFirstChild?: boolean }>`
	min-width: 0.0625rem;
	flex-basis: auto;
	flex-grow: 1;
	${({ $pushLeftFirstChild }): SimpleInterpolation =>
		$pushLeftFirstChild &&
		css`
			> * {
				&:first-child {
					margin-right: auto;
				}
			}
		`}
`;
const DismissButton = styled(Button)`
	margin-right: ${(props): string => props.theme.sizes.padding.large};
	flex-basis: auto;
	min-width: 6.25rem;
	flex-shrink: 1;
`;

const ConfirmButton = styled(Button)`
	flex-basis: auto;
	min-width: 6.25rem;
	flex-shrink: 1;
`;

interface ModalFooterProps {
	/** Modal type */
	type?: 'default' | 'error';
	/** Centered Modal */
	centered?: boolean;
	/** Callback for main action */
	onConfirm?: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Label for the Main action Button */
	confirmLabel?: string;
	/** Disabled status for main action Button */
	confirmDisabled?: boolean;
	/** BackgroundColor for the Main action Button */
	confirmColor?: string | keyof DefaultTheme['palette'];
	/** Callback for secondary action */
	onSecondaryAction?: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
	/** Label for the Secondary action Button */
	secondaryActionLabel?: string;
	/** Disabled status for secondary action Button */
	secondaryActionDisabled?: boolean;
	/** Callback to close the Modal */
	onClose?: (event: React.MouseEvent | KeyboardEvent) => void;
	/** Label for the Modal close Button */
	dismissLabel?: string;
	/** Optional element to show in the footer of the Modal */
	optionalFooter?: React.ReactElement;
	/** Prop to override the default footer buttons */
	customFooter?: React.ReactElement;
	/** Label for dismiss button in the Error Modal */
	errorActionLabel?: string;
	/** Action called on error dismiss button */
	onErrorAction?: () => void;
}

type ModalFooterContentProps = Omit<ModalFooterProps, 'customFooter'>;

const ModalFooterContent: React.VFC<ModalFooterContentProps> = ({
	type,
	centered,
	onConfirm,
	confirmLabel,
	confirmDisabled,
	confirmColor,
	onSecondaryAction,
	secondaryActionLabel,
	secondaryActionDisabled,
	onClose,
	dismissLabel,
	errorActionLabel,
	optionalFooter,
	onErrorAction
}) => {
	const secondaryButton = useMemo(() => {
		let button;
		if (type === 'error' && onErrorAction) {
			button = <DismissButton onClick={onErrorAction} color="secondary" label={errorActionLabel} />;
		} else {
			button =
				(onSecondaryAction && secondaryActionLabel && (
					<DismissButton
						color="primary"
						type="outlined"
						onClick={onSecondaryAction}
						label={secondaryActionLabel}
						disabled={secondaryActionDisabled}
					/>
				)) ||
				(dismissLabel && onClose && (
					<DismissButton color="secondary" onClick={onClose} label={dismissLabel} />
				)) ||
				undefined;
		}
		return button;
	}, [
		type,
		onErrorAction,
		errorActionLabel,
		onSecondaryAction,
		secondaryActionLabel,
		secondaryActionDisabled,
		dismissLabel,
		onClose
	]);

	return (
		<>
			{optionalFooter && centered && (
				<OptionalFooterContainer
					padding={{ bottom: 'large' }}
					orientation="horizontal"
					mainAlignment="flex-start"
				>
					{optionalFooter}
				</OptionalFooterContainer>
			)}
			<ButtonContainer
				orientation="horizontal"
				mainAlignment={centered ? 'center' : 'flex-end'}
				$pushLeftFirstChild={optionalFooter != null && !centered}
			>
				{!centered && optionalFooter}
				{!centered && <Padding right="large" />}
				{secondaryButton}
				{(onConfirm || onClose) && (
					<ConfirmButton
						color={confirmColor}
						onClick={(onConfirm || onClose) as NonNullable<typeof onClose | typeof onConfirm>}
						label={confirmLabel}
						disabled={confirmDisabled}
					/>
				)}
			</ButtonContainer>
		</>
	);
};

const ModalFooter = ({
	customFooter,
	...modalFooterContentProps
}: ModalFooterProps): React.JSX.Element => (
	<Container
		orientation={modalFooterContentProps.centered ? 'vertical' : 'horizontal'}
		mainAlignment="flex-end"
		padding={{ top: 'large' }}
	>
		{customFooter ?? <ModalFooterContent {...modalFooterContentProps} />}
	</Container>
);

export { ModalFooter, ModalFooterContent, ModalFooterContentProps, ModalFooterProps };
