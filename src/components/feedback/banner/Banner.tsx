/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { HTMLAttributes, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styled, { css, DefaultTheme, SimpleInterpolation } from 'styled-components';

import { useCombinedRefs } from '../../../hooks/useCombinedRefs';
import { useModal } from '../../../hooks/useModal';
import { Button, ButtonProps } from '../../basic/Button';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { IconButton, IconButtonProps } from '../../inputs/IconButton';
import { Container } from '../../layout/Container';

type ActionButton = ButtonProps & { type?: never; color?: never; backgroundColor?: never };

type BannerProps = HTMLAttributes<HTMLDivElement> & {
	/**
	 * @deprecated use severity instead
	 */
	status?: 'success' | 'warning' | 'info' | 'error';
	severity?: 'success' | 'warning' | 'info' | 'error';
	type?: 'standard' | 'fill' | 'outline';
	title?: string;
	description: string;
	primaryAction?: ActionButton;
	secondaryAction?: ActionButton;
	moreInfoLabel?: string;
	closeLabel?: string;
	children?: never;
} & (
		| {
				showClose: true;
				onClose: IconButtonProps['onClick'];
		  }
		| {
				showClose?: false;
				onClose?: never;
		  }
	);

const BANNER_ICON: Record<NonNullable<BannerProps['severity']>, keyof DefaultTheme['icons']> = {
	success: 'CheckmarkCircle2Outline',
	warning: 'AlertTriangleOutline',
	info: 'InfoOutline',
	error: 'CloseCircleOutline'
};

const BANNER_GAP = '1rem';
const BANNER_WIDTH = '100%';

const InfoContainer = styled(Container)`
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	& > *:not(:is(:first-child)) {
		padding-top: 0.25rem;
	}
`;

const BannerText = styled(Text)`
	overflow: visible;
`;

const WrapAndGrowContainer = styled(Container).attrs(({ theme, gap, flexBasis }) => ({
	flexBasis: css`calc(${flexBasis} + ${theme.sizes.icon.large} + ${gap})`
}))``;

const ActionsContainer = styled(Container)`
	align-self: stretch;
`;

const CloseContainer = styled(Container)<{ $alignSelf?: string }>`
	align-self: ${({ $alignSelf }): SimpleInterpolation => $alignSelf};
`;

const BannerContainer = styled(Container)<{ $isMultiline: boolean }>`
	${WrapAndGrowContainer} {
		order: 1;
	}
	${({ $isMultiline }): SimpleInterpolation =>
		$isMultiline
			? css`
					${CloseContainer} {
						order: 2;
					}
					${ActionsContainer} {
						order: 3;
					}
				`
			: css`
					${CloseContainer} {
						order: 3;
					}
					${ActionsContainer} {
						order: 2;
					}
				`};
`;

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function BannerFn(
	{
		status = 'success',
		severity = status,
		type = 'fill',
		title,
		description,
		primaryAction,
		secondaryAction,
		showClose = false,
		onClose,
		moreInfoLabel = 'More info',
		closeLabel = 'Close',
		...rest
	}: BannerProps,
	ref
) {
	const bannerRef = useCombinedRefs(ref);
	const infoContainerRef = useRef<HTMLDivElement>(null);
	const actionsContainerRef = useRef<HTMLDivElement>(null);
	const closeContainerRef = useRef<HTMLDivElement>(null);

	const mainColor = useMemo(() => (type === 'fill' ? 'gray6' : severity), [type, severity]);
	const textColor = useMemo(() => (type === 'fill' ? 'gray6' : 'text'), [type]);
	const backgroundColor = useMemo(
		() => (type === 'outline' && 'gray6') || (type === 'fill' && severity) || `${severity}Banner`,
		[type, severity]
	);

	const [isMultiline, setIsMultiline] = useState<boolean>(false);
	const [isTextCropped, setIsTextCropped] = useState<boolean>(false);
	const { createModal, closeModal } = useModal();

	const onBannerResize = useCallback((bannerContentHeight: number) => {
		if (actionsContainerRef.current) {
			// actionsContainerRef must be align-self stretch in order to extend its height to the entire banner when inline
			setIsMultiline(actionsContainerRef.current.clientHeight < bannerContentHeight);
		}
		if (infoContainerRef.current) {
			setIsTextCropped(
				infoContainerRef.current.scrollHeight > infoContainerRef.current.clientHeight
			);
		}
	}, []);

	const resizeObserverRef = useRef<ResizeObserver>();

	useEffect(() => {
		if (bannerRef.current) {
			resizeObserverRef.current = new ResizeObserver((entries) => {
				entries.forEach((entry) => {
					onBannerResize(entry.contentRect.height);
				});
			});

			resizeObserverRef.current.observe(bannerRef.current);
		}

		return (): void => {
			resizeObserverRef.current?.disconnect();
		};
	}, [bannerRef, onBannerResize]);

	const contentFlexBasis = useMemo(() => {
		const titleLength = title?.length || 0;
		const descriptionLength = description.length * 0.875;
		// calculate the number of character which can be seen in a line,
		// in order to keep all text visible (both title and description - more or less, it is not super precise)
		const numberOfCharsPerLine = Math.ceil(
			Math.max(titleLength, descriptionLength) / (titleLength > 0 && descriptionLength > 0 ? 2 : 3)
		);
		const extraChars = 4;
		return `${numberOfCharsPerLine + extraChars}ch`;
	}, [title, description?.length]);

	const showMoreInfoModal = useCallback(() => {
		const id = Date.now().toString();
		createModal({
			id,
			title,
			showCloseIcon: true,
			onClose: () => {
				closeModal(id);
			},
			confirmLabel: primaryAction?.label,
			onConfirm: primaryAction
				? (event): void => {
						primaryAction.onClick(event);
						closeModal(id);
					}
				: undefined,
			secondaryActionLabel: secondaryAction?.label,
			onSecondaryAction: secondaryAction
				? (event): void => {
						secondaryAction.onClick(event);
						closeModal(id);
					}
				: undefined,
			closeIconTooltip: closeLabel,
			children: (
				<Text size={'medium'} overflow={'break-word'}>
					{description}
				</Text>
			)
		});
	}, [closeLabel, closeModal, createModal, description, primaryAction, secondaryAction, title]);

	return (
		<BannerContainer
			ref={bannerRef}
			background={backgroundColor}
			padding={{ vertical: '0.5rem', horizontal: '1rem' }}
			gap={BANNER_GAP}
			width={BANNER_WIDTH}
			height={'fit'}
			orientation={'horizontal'}
			borderColor={{ bottom: severity }}
			mainAlignment={'flex-start'}
			wrap={'wrap'}
			$isMultiline={isMultiline}
			{...rest}
		>
			<WrapAndGrowContainer
				width={'auto'}
				maxWidth={
					showClose &&
					closeContainerRef.current &&
					`calc(${BANNER_WIDTH} - ${BANNER_GAP} - ${closeContainerRef.current.clientWidth}px)`
				}
				minWidth={0}
				flexGrow={1}
				flexShrink={1}
				flexBasis={contentFlexBasis}
				height={'fit'}
				gap={'1rem'}
				orientation={'horizontal'}
				mainAlignment={'flex-start'}
			>
				<Container width={'fit'} minWidth={'fit'} height={'fit'} minHeight={'fit'}>
					<Icon icon={BANNER_ICON[severity]} color={mainColor} size={'large'} />
				</Container>
				<InfoContainer
					orientation={'vertical'}
					height={'fit'}
					maxHeight={'4rem'}
					width={'auto'}
					maxWidth={'100%'}
					minWidth={0}
					flexGrow={1}
					ref={infoContainerRef}
				>
					{title && (
						<BannerText color={textColor} size={'medium'} weight={'bold'} overflow={'break-word'}>
							{title}
						</BannerText>
					)}
					<BannerText color={textColor} size={'small'} overflow={'break-word'}>
						{description}
					</BannerText>
				</InfoContainer>
			</WrapAndGrowContainer>
			<ActionsContainer
				width={'auto'}
				flexBasis={'fit-content'}
				height={'auto'}
				gap={'0.5rem'}
				orientation={'horizontal'}
				margin={{ right: '0', left: 'auto' }}
				ref={actionsContainerRef}
			>
				{secondaryAction && <Button {...secondaryAction} type={'ghost'} color={mainColor} />}
				{primaryAction && (
					<Button
						{...primaryAction}
						type={'outlined'}
						backgroundColor={'transparent'}
						color={mainColor}
					/>
				)}
				{isTextCropped && (
					<Button
						type={'outlined'}
						backgroundColor={'transparent'}
						color={mainColor}
						label={moreInfoLabel}
						onClick={showMoreInfoModal}
					/>
				)}
			</ActionsContainer>
			{showClose && onClose && (
				<CloseContainer
					width={'fit'}
					height={'fit'}
					minWidth={'fit'}
					minHeight={'fit'}
					ref={closeContainerRef}
				>
					<IconButton
						onClick={onClose}
						icon={'Close'}
						color={textColor}
						type={'ghost'}
						size={'large'}
					/>
				</CloseContainer>
			)}
		</BannerContainer>
	);
});

export { Banner, type BannerProps, InfoContainer };
