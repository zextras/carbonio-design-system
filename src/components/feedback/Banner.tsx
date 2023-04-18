/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useMemo } from 'react';

import styled, { css, DefaultTheme } from 'styled-components';

import { Button, ButtonProps } from '../basic/Button';
import { Icon } from '../basic/Icon';
import { Text } from '../basic/Text';
import { IconButton, IconButtonProps } from '../inputs/IconButton';
import { Container } from '../layout/Container';

type ActionButton = ButtonProps & { type?: never; color?: never; backgroundColor?: never };
interface BannerProps {
	status?: 'success' | 'warning' | 'info' | 'error';
	type?: 'standard' | 'fill' | 'outline';
	title?: string;
	description: string;
	primaryAction?: ActionButton;
	secondaryAction?: ActionButton;
	showClose?: boolean;
	onClose?: IconButtonProps['onClick'];
	children?: never;
}

const BANNER_ICON: Record<NonNullable<BannerProps['status']>, keyof DefaultTheme['icons']> = {
	success: 'CheckmarkCircle2Outline',
	warning: 'AlertTriangleOutline',
	info: 'InfoOutline',
	error: 'CloseCircleOutline'
};

const InfoContainer = styled(Container)`
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
`;

const BannerText = styled(Text)`
	white-space: normal;
	overflow: visible;
`;

const WrapAndGrowContainer = styled(Container).attrs(({ theme, gap, flexBasis }) => ({
	flexBasis: css`calc(${flexBasis} + ${theme.sizes.icon.large} + ${gap})`
}))``;

const CloseIconButton = ({
	onClick,
	color
}: Pick<IconButtonProps, 'onClick' | 'color'>): JSX.Element => (
	<IconButton onClick={onClick} icon={'Close'} color={color} type={'ghost'} />
);

const Banner = React.forwardRef<HTMLDivElement, BannerProps>(function BannerFn(
	{
		status = 'success',
		type = 'fill',
		title,
		description,
		primaryAction,
		secondaryAction,
		showClose = false,
		onClose = (): void => undefined,
		...rest
	},
	ref
) {
	const mainColor = type === 'fill' ? 'gray6' : status;
	const textColor = type === 'fill' ? 'gray6' : 'text';
	const backgroundColor =
		(type === 'outline' && 'gray6') || (type === 'fill' && status) || `${status}Banner`;

	const isMultiline = false;

	const contentFlexBasis = useMemo(() => {
		const titleLength = title?.length || 0;
		const descriptionLength = description.length * 0.875;
		// calculate the number of character which can be seen in a line,
		// in order to keep all text visible (both title and description - more or less, it is not super precise)
		return `${Math.ceil(
			Math.max(titleLength, descriptionLength) / (titleLength > 0 && descriptionLength > 0 ? 2 : 3)
		)}ch`;
	}, [title, description?.length]);

	return (
		<Container
			ref={ref}
			background={backgroundColor}
			padding={{ vertical: '0.5rem', horizontal: '1rem' }}
			gap={'1rem'}
			width={'fill'}
			height={'fit'}
			orientation={'horizontal'}
			borderColor={{ bottom: status }}
			mainAlignment={'flex-start'}
			wrap={'wrap'}
			{...rest}
		>
			<WrapAndGrowContainer
				width={'auto'}
				maxWidth={'100%'}
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
					<Icon icon={BANNER_ICON[status]} color={mainColor} size={'large'} />
				</Container>
				<Container
					orientation={'horizontal'}
					height={'fit'}
					width={'auto'}
					maxWidth={'100%'}
					minWidth={0}
					gap={'0.25rem'}
					mainAlignment={'flex-start'}
				>
					<InfoContainer
						orientation={'vertical'}
						height={'fit'}
						maxHeight={'3.5em'}
						width={'auto'}
						maxWidth={'100%'}
						minWidth={0}
						crossAlignment={'flex-start'}
						mainAlignment={'flex-start'}
					>
						<BannerText color={textColor} size={'medium'} weight={'bold'} overflow={'break-word'}>
							{title}
						</BannerText>
						<BannerText color={textColor} size={'small'} overflow={'break-word'}>
							{description}
						</BannerText>
					</InfoContainer>
					{showClose && isMultiline && (
						<Container width={'fit'} height={'fit'} minWidth={'fit'} minHeight={'fit'}>
							<CloseIconButton onClick={onClose} color={textColor} />
						</Container>
					)}
				</Container>
			</WrapAndGrowContainer>
			<Container
				width={'auto'}
				flexBasis={'fit-content'}
				height={'fit'}
				gap={'0.5rem'}
				orientation={'horizontal'}
				margin={{ right: '0', left: 'auto' }}
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
				{showClose && !isMultiline && (
					<Container width={'fit'} height={'fit'} minWidth={'fit'} minHeight={'fit'}>
						<IconButton onClick={onClose} icon={'Close'} color={textColor} type={'ghost'} />
					</Container>
				)}
			</Container>
		</Container>
	);
});

export { Banner, BannerProps };
