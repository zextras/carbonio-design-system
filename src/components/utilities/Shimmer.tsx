/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import styled, { DefaultTheme, keyframes, SimpleInterpolation } from 'styled-components';

import { LiteralUnion, With$Prefix } from '../../types/utils';
import { FormSection, FormSubSection } from '../basic/FormSection';
import { Container } from '../layout/Container';
import { Padding } from '../layout/Padding';

const SIZES = {
	small: 0.3125,
	medium: 0.625,
	large: 0.9375
} as const;

const backgroundColorShimmer = (theme: DefaultTheme): string => `linear-gradient(
	to right,
	${theme.palette.gray4.regular} 20%,
	${theme.palette.gray5.regular} 40%,
	${theme.palette.gray4.regular} 100%
)`;

const backgroundColorShimmerDark = (theme: DefaultTheme): string => `linear-gradient(
	to right,
	${theme.palette.gray3.regular} 20%,
	${theme.palette.gray4.regular} 40%,
	${theme.palette.gray3.regular} 100%
)`;

const backgroundColorShimmerExtraDark = (theme: DefaultTheme): string => `linear-gradient(
	to right,
	${theme.palette.gray2.regular} 20%,
	${theme.palette.gray3.regular} 40%,
	${theme.palette.gray2.regular} 100%
)`;

const backgroundFunction = (
	variant: LiteralUnion<'dark' | 'extraDark', string>,
	theme: DefaultTheme
): string => {
	switch (variant) {
		case 'dark':
			return backgroundColorShimmerDark(theme);
		case 'extraDark':
			return backgroundColorShimmerExtraDark(theme);
		default:
			return backgroundColorShimmer(theme);
	}
};

const shimmerEffect = keyframes`
	from {
		background-position: -1000px 0;
	}
	to {
		background-position: 1000px 0;
	}
`;

const backgroundSize = `1000px 100%`;

type AvatarSkeletonComponentProps = {
	variant?: string;
	radius?: string;
	size?: keyof typeof SIZES;
	width?: string;
};

const AvatarSkeletonComponent = styled.div<With$Prefix<AvatarSkeletonComponentProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant ?? '', theme)};
	background-size: ${backgroundSize};
	aspect-ratio: 1/1;
	border-radius: ${({ $radius }): string => $radius ?? '50%'};
	width: ${({ $size, $width }): SimpleInterpolation =>
		$width ?? ($size && `${SIZES[$size] * 3.2}rem`)};
`;

type BadgeSkeletonProps = {
	variant?: string;
	radius?: string;
	width?: string;
	height?: string;
	size?: keyof typeof SIZES;
	backgroundSize?: string;
};

const BadgeSkeletonComponent = styled.div<With$Prefix<BadgeSkeletonProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant ?? '', theme)};
	background-size: ${backgroundSize};
	display: inline-block;
	border-radius: ${({ $radius }): string => $radius ?? '2rem'};
	width: ${({ $size, $width }): SimpleInterpolation =>
		$width ?? ($size && `${SIZES[$size] * 3.6}rem`)};
	height: ${({ $size, $height }): SimpleInterpolation =>
		$height ?? ($size && `${SIZES[$size] * 1.9}rem`)};
`;

type ButtonSkeletonProps = {
	variant?: string;
	radius?: string;
	size?: keyof typeof SIZES;
	width?: string;
	height?: string;
};

const ButtonSkeletonComponent = styled.div<With$Prefix<ButtonSkeletonProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant ?? '', theme)};
	background-size: ${backgroundSize};
	border-radius: ${({ $radius }): string => $radius ?? '0.125rem'};
	width: ${({ $size, $width }): SimpleInterpolation =>
		$width ?? ($size && `${SIZES[$size] * 8.9}rem`)};
	height: ${({ $size, $height }): SimpleInterpolation =>
		$height ?? ($size && `${SIZES[$size] * 3.2}rem`)};
`;

type FormSectionSkeletonProps = {
	variant: string;
};
const FormSectionSkeletonComponent = styled(FormSection)<With$Prefix<FormSectionSkeletonProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant, theme)};
	background-size: ${backgroundSize};
`;

type FormSubSectionSkeletonProps = {
	variant: string;
};

const FormSubSectionSkeletonComponent = styled(FormSubSection)<
	With$Prefix<FormSubSectionSkeletonProps>
>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant, theme)};
	background-size: ${backgroundSize};
`;

type IconSkeletonProps = {
	variant?: string;
	size?: keyof typeof SIZES;
	width?: string;
};

const IconSkeletonComponent = styled.div<With$Prefix<IconSkeletonProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant ?? '', theme)};
	background-size: ${backgroundSize};
	aspect-ratio: 1/1;
	border-radius: 0.125rem;
	width: ${({ $size, $width }): SimpleInterpolation =>
		$width ?? ($size && `${SIZES[$size] * 1.6}rem`)};
`;

type LogoSkeletonProps = {
	variant?: string;
	radius?: string;
	size?: keyof typeof SIZES;
	width?: string;
	height?: string;
};

const LogoSkeletonComponent = styled.div<With$Prefix<LogoSkeletonProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant ?? '', theme)};
	border-radius: ${({ $radius }): string => $radius ?? '0.625rem'};
	width: ${({ $size, $width }): SimpleInterpolation =>
		$width ?? ($size && `${SIZES[$size] * 20}rem`)};
	height: ${({ $size, $height }): SimpleInterpolation =>
		$height ?? ($size && `${SIZES[$size] * 10}rem`)};
`;

type SkeletonProps = {
	variant?: string;
	radius?: string;
	orientation?: string;
	mainAlignment?: string;
	width?: string;
	height?: string;
};
const SkeletonComponent = styled.div<With$Prefix<SkeletonProps>>`
	animation: ${shimmerEffect} 1.5s linear infinite;
	background: ${({ $variant, theme }): string => backgroundFunction($variant ?? '', theme)};
	background-size: ${backgroundSize};
	border-radius: ${({ $radius }): string => $radius ?? '0.125rem'};
	width: ${({ $width }): string => $width ?? '100%'};
	height: ${({ $height }): string => $height ?? '1rem'};
`;

const ShimmerObject = {
	Accordion: ({
		width,
		iconStart,
		iconEnd,
		badge
	}: {
		width: string;
		iconStart: boolean;
		iconEnd: boolean;
		badge: boolean;
	}): React.JSX.Element => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			$width={width}
			$height="3.25rem"
		>
			<Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Padding left="large" />
				{iconStart ? (
					<Padding left="small">
						<IconSkeletonComponent
							$variant="dark"
							$size="medium"
							style={{ margin: 'auto 0 auto 0' }}
						/>
					</Padding>
				) : null}
				<SkeletonComponent
					$variant="dark"
					style={{ margin: '0 0 0 0.75rem' }}
					$width="70%"
					$height="1rem"
				/>
				{badge ? (
					<Padding left="small">
						<BadgeSkeletonComponent $variant="dark" $height="1rem" $size="large" />
					</Padding>
				) : null}
				{iconEnd ? (
					<Padding left="small">
						<IconSkeletonComponent
							$variant="dark"
							$size="medium"
							style={{ margin: 'auto 0 auto 0' }}
						/>
					</Padding>
				) : null}
				<Padding right="large" />
			</Container>
		</SkeletonComponent>
	),
	Avatar: ({
		size = 'medium',
		width,
		variant,
		radius,
		...rest
	}: AvatarSkeletonComponentProps): React.JSX.Element => (
		<AvatarSkeletonComponent
			$size={size}
			$width={width}
			$variant={variant}
			$radius={radius}
			{...rest}
		/>
	),
	Badge: ({
		size = 'medium',
		variant,
		radius,
		width,
		height,
		...rest
	}: BadgeSkeletonProps): React.JSX.Element => (
		<BadgeSkeletonComponent
			$size={size}
			$variant={variant}
			$radius={radius}
			$width={width}
			$height={height}
			{...rest}
		/>
	),
	Button: ({
		size = 'medium',
		width,
		variant,
		radius,
		height,
		...rest
	}: ButtonSkeletonProps): React.JSX.Element => (
		<ButtonSkeletonComponent
			$size={size}
			$width={width}
			$variant={variant}
			$radius={radius}
			$height={height}
			{...rest}
		/>
	),
	Checkbox: ({
		size = 'medium',
		variant,
		width,
		...rest
	}: IconSkeletonProps): React.JSX.Element => (
		<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
			<IconSkeletonComponent $size={size} $variant={variant} $width={width} {...rest} />
			<Padding right="small" />
			<SkeletonComponent
				$height="1rem"
				$width={width ?? '13.125rem'}
				$variant={variant}
				{...rest}
			/>
		</Container>
	),
	EmailChip: ({
		width,
		iconStart,
		iconEnd,
		iconEndAdditional
	}: {
		width?: string;
		iconStart?: boolean;
		iconEnd?: boolean;
		iconEndAdditional?: boolean;
	}): React.JSX.Element => (
		<SkeletonComponent
			$width={width}
			$height="1.25rem"
			style={{
				borderRadius: '2em',
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			{iconStart ? (
				<IconSkeletonComponent
					$variant="dark"
					style={{ borderRadius: '50%', height: '1rem', margin: 'auto 0 auto 0.25rem' }}
				/>
			) : null}
			<Padding left={iconStart ? 'extrasmall' : 'small'} />
			<SkeletonComponent
				$variant="dark"
				$width="100%"
				$height="0.75rem"
				$radius="0.125rem"
				style={{ margin: 'auto 0' }}
			/>
			<Padding right={iconEnd ? 'extrasmall' : 'small'} />
			{iconEnd ? (
				<IconSkeletonComponent
					$variant="dark"
					style={{ borderRadius: '50%', height: '1rem', margin: 'auto 0.25rem auto 0' }}
				/>
			) : null}
			{iconEndAdditional && iconEnd ? (
				<IconSkeletonComponent
					$variant="dark"
					style={{ borderRadius: '50%', height: '1rem', margin: 'auto 0.25rem auto 0' }}
				/>
			) : null}
		</SkeletonComponent>
	),
	FormSection: ({ variant }: FormSectionSkeletonProps): React.JSX.Element => (
		<FormSectionSkeletonComponent $variant={variant} />
	),
	FormSubSection: ({ variant }: FormSectionSkeletonProps): React.JSX.Element => (
		<FormSubSectionSkeletonComponent $variant={variant} />
	),
	Icon: ({ size = 'medium', variant, width, ...rest }: IconSkeletonProps): React.JSX.Element => (
		<IconSkeletonComponent $size={size} $variant={variant} $width={width} {...rest} />
	),
	Input: ({ width, checkbox }: { width?: string; checkbox?: boolean }): React.JSX.Element => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			$width={width}
			$height="fit"
		>
			<SkeletonComponent $width="50%" $height="fit">
				<SkeletonComponent
					$variant="dark"
					$width="fill"
					style={{ margin: '0.3125rem 0 0 0.75rem' }}
					$height="0.75rem"
				/>
				<SkeletonComponent
					$variant="dark"
					$width="fill"
					style={{ margin: '0.3125rem 0 0.375rem 0.75rem' }}
					$height="1rem"
				/>
				<Padding bottom="0.375rem" />
			</SkeletonComponent>
			{checkbox ? (
				<SkeletonComponent
					justify-content="flex-end"
					$width="fill"
					$height="fit"
					style={{ margin: 'auto 0 auto 0' }}
				>
					<IconSkeletonComponent $variant="dark" $size="medium" style={{ marginRight: '1rem' }} />
				</SkeletonComponent>
			) : null}
		</SkeletonComponent>
	),
	ListItem: ({ width, type }: { width?: string; type?: number }): React.JSX.Element => {
		switch (type) {
			case 2:
				return (
					<SkeletonComponent $height="4rem" $width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent $variant="dark" $width="3rem" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent $variant="dark" $width="12.1875rem" />
									<Padding top="small" />
									<SkeletonComponent $variant="dark" $width="5.1875rem" />
								</Padding>
							</Container>
							<Container height="fill" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fill"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
									crossAlignment="flex-start"
								>
									<Padding all="medium">
										<IconSkeletonComponent $size="medium" />
									</Padding>
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 3:
				return (
					<SkeletonComponent $height="4rem" $width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent $variant="dark" $width="3rem" $radius="0.625rem" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent $variant="dark" $width="8.375rem" />
									<Padding top="small" />
									<SkeletonComponent $variant="dark" $width="5.1875rem" />
								</Padding>
							</Container>
							<Container height="fill" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fill"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
									crossAlignment="flex-start"
								>
									<Padding all="medium">
										<SkeletonComponent $variant="dark" $width="2.875rem" />
									</Padding>
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 4:
				return (
					<SkeletonComponent $height="4rem" $width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent $variant="dark" $width="3rem" $radius="0.625rem" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent $variant="dark" $width="8.375rem" />
									<Padding top="small" />
									<SkeletonComponent $variant="dark" $width="5.1875rem" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent $variant="dark" $width="3.75rem" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent $variant="dark" $width="7rem" />
									<Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 5:
				return (
					<SkeletonComponent $height="4rem" $width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent $variant="dark" $width="3rem" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent $variant="dark" $width="8.375rem" />
									<Padding top="small" />
									<SkeletonComponent $variant="dark" $width="5.1875rem" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent $variant="dark" $width="7rem" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<IconSkeletonComponent $variant="dark" $size="medium" />
									<Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 1:
			default:
				return (
					<SkeletonComponent $height="4rem" $width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent $variant="dark" $width="3rem" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent $variant="dark" $width="13.125rem" />
									<Padding top="small" />
									<SkeletonComponent $variant="dark" $width="13.75rem" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent $variant="dark" $width="3.75rem" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<BadgeSkeletonComponent $variant="dark" $width="2.375rem" $height="1.3125rem" />{' '}
									<Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
		}
	},

	Logo: ({
		size = 'medium',
		variant,
		radius,
		height,
		width,
		...rest
	}: LogoSkeletonProps): React.JSX.Element => (
		<LogoSkeletonComponent
			$size={size}
			$variant={variant}
			$radius={radius}
			$height={height}
			$width={width}
			{...rest}
		/>
	),
	Text: SkeletonComponent,
	Quota: ({
		radius,
		height,
		width,
		variant,
		orientation,
		mainAlignment
	}: SkeletonProps): React.JSX.Element => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			$radius={radius}
			$height={height}
			$width={width}
			$variant={variant}
			$orientation={orientation}
			$mainAlignment={mainAlignment}
		>
			<IconSkeletonComponent $variant="dark" $size="medium" $width="50%" />
		</SkeletonComponent>
	),
	Searchbar: ({
		radius,
		height,
		variant,
		orientation,
		mainAlignment,
		width
	}: SkeletonProps): React.JSX.Element => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			$radius={radius}
			$height={height ?? '2.25rem'}
			$variant={variant}
			$orientation={orientation}
			$mainAlignment={mainAlignment}
			$width={width}
		>
			<Container
				width="50%"
				style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
			>
				<SkeletonComponent
					$variant="dark"
					style={{ margin: '0 0 0 0.75rem' }}
					$width="70%"
					$height="0.75rem"
				/>
				<Padding left="small" />
				<IconSkeletonComponent $variant="dark" $size="medium" style={{ margin: 'auto 0 auto 0' }} />
			</Container>
			<Container
				orientation="horizontal"
				mainAlignment="flex-end"
				crossAlignment="center"
				width="50%"
			>
				<SkeletonComponent
					$variant="dark"
					style={{ margin: 'auto 0 auto 0.75rem', width: '50%' }}
					$height="0.75rem"
				/>
				<Padding left="small" />
				<IconSkeletonComponent $variant="dark" $size="large" style={{ marginRight: '1rem' }} />
			</Container>
		</SkeletonComponent>
	),
	Snackbar: ({
		width,
		elementStart,
		elementEnd
	}: {
		width?: string;
		elementStart?: boolean;
		elementEnd?: boolean;
	}): React.JSX.Element => (
		<SkeletonComponent
			$width={width}
			$height="fit"
			style={{
				borderRadius: '0.125rem',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Padding left={elementStart ? 0 : 'extralarge'} />
			{elementStart ? (
				<Padding all="large" left="extralarge">
					<IconSkeletonComponent $variant="dark" $width="2rem" />
				</Padding>
			) : null}
			<SkeletonComponent
				$variant="dark"
				$width="100%"
				$height="1rem"
				$radius="0.125rem"
				style={{ margin: '1rem 0' }}
			/>
			{elementEnd ? (
				<Padding right="1.5rem" left="1rem">
					<SkeletonComponent $variant="dark" $height="1.5rem" $width="5.875rem" />
				</Padding>
			) : (
				<Padding right={elementEnd ? 0 : 'extralarge'} />
			)}
		</SkeletonComponent>
	),
	Stepper: ({
		size = 'medium',
		steppersNumber,
		variant,
		radius,
		width
	}: AvatarSkeletonComponentProps & { steppersNumber: number }): React.JSX.Element => {
		const _steppers = [];
		for (let i = 0; i < steppersNumber - 1; i += 1) {
			_steppers.push(
				<Container key={i} orientation="horizontal" mainAlignment="flex-start" width="fit">
					<Padding top="medium" right="small">
						<SkeletonComponent
							$height="0.0625rem"
							$width="5rem"
							style={{ margin: 'auto 0 auto 0' }}
						/>
					</Padding>
					<Padding top="medium" right="small">
						<AvatarSkeletonComponent
							$size={size}
							$variant={variant}
							$radius={radius}
							$width={width}
						/>
					</Padding>
				</Container>
			);
		}
		return (
			<Container orientation="horizontal" mainAlignment="flex-start" width="100%">
				<Padding top="medium" right="small">
					<AvatarSkeletonComponent
						$size={size}
						$variant={variant}
						$radius={radius}
						$width={width}
					/>
				</Padding>
				{_steppers}
			</Container>
		);
	},
	TableListItem: ({ width, type }: { width?: string; type?: number }): React.JSX.Element => {
		switch (type) {
			case 2:
				return (
					<Container
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						width={width}
						height="2.5rem"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="5rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="3.0625rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="4.6875rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="3.9375rem" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent $variant="dark" $width="1.875rem" />
						</Padding>
					</Container>
				);
			case 3:
				return (
					<SkeletonComponent
						$variant="dark"
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						$width={width}
						$height="2.5rem"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="extraDark" $width="5rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="extraDark" $width="3.0625rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="extraDark" $width="4.6875rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="extraDark" $width="3.9375rem" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent $variant="extraDark" $width="1.875rem" />
						</Padding>
					</SkeletonComponent>
				);
			case 1:
			default:
				return (
					<SkeletonComponent
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						$width={width}
						$height="2.5rem"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="5rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="3.0625rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="4.6875rem" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent $variant="dark" $width="3.9375rem" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent $variant="dark" $width="1.875rem" />
						</Padding>
					</SkeletonComponent>
				);
		}
	}
};

type Shimmer = React.VFC<SkeletonProps> & {
	[K in keyof typeof ShimmerObject]: React.VFC<Parameters<(typeof ShimmerObject)[K]>[number]>;
};
const Shimmer: Shimmer = ({
	radius,
	height,
	variant,
	orientation,
	mainAlignment,
	width
}: SkeletonProps): React.JSX.Element => (
	<SkeletonComponent
		$radius={radius}
		$height={height}
		$variant={variant}
		$orientation={orientation}
		$mainAlignment={mainAlignment}
		$width={width}
	/>
);

Shimmer.Accordion = ShimmerObject.Accordion;
Shimmer.Avatar = ShimmerObject.Avatar;
Shimmer.Badge = ShimmerObject.Badge;
Shimmer.Button = ShimmerObject.Button;
Shimmer.Checkbox = ShimmerObject.Checkbox;
Shimmer.EmailChip = ShimmerObject.EmailChip;
Shimmer.FormSection = ShimmerObject.FormSection;
Shimmer.FormSubSection = ShimmerObject.FormSubSection;
Shimmer.Icon = ShimmerObject.Icon;
Shimmer.Input = ShimmerObject.Input;
Shimmer.ListItem = ShimmerObject.ListItem;
Shimmer.Logo = ShimmerObject.Logo;
Shimmer.Quota = ShimmerObject.Quota;
Shimmer.Searchbar = ShimmerObject.Searchbar;
Shimmer.Snackbar = ShimmerObject.Snackbar;
Shimmer.Stepper = ShimmerObject.Stepper;
Shimmer.TableListItem = ShimmerObject.TableListItem;
Shimmer.Text = ShimmerObject.Text;

Shimmer.displayName = 'Shimmer';
Shimmer.Accordion.displayName = 'Shimmer.Accordion';
Shimmer.Avatar.displayName = 'Shimmer.Avatar';
Shimmer.Badge.displayName = 'Shimmer.Badge';
Shimmer.Button.displayName = 'Shimmer.Button';
Shimmer.Checkbox.displayName = 'Shimmer.Checkbox';
Shimmer.EmailChip.displayName = 'Shimmer.EmailChip';
Shimmer.FormSection.displayName = 'Shimmer.FormSection';
Shimmer.FormSubSection.displayName = 'Shimmer.FormSubSection';
Shimmer.Icon.displayName = 'Shimmer.Icon';
Shimmer.Input.displayName = 'Shimmer.Input';
Shimmer.ListItem.displayName = 'Shimmer.ListItem';
Shimmer.Logo.displayName = 'Shimmer.Logo';
Shimmer.Quota.displayName = 'Shimmer.Quota';
Shimmer.Searchbar.displayName = 'Shimmer.Searchbar';
Shimmer.Snackbar.displayName = 'Shimmer.Snackbar';
Shimmer.Stepper.displayName = 'Shimmer.Stepper';
Shimmer.TableListItem.displayName = 'Shimmer.TableListItem';
Shimmer.Text.displayName = 'Shimmer.Text';

export { Shimmer, SkeletonProps };
