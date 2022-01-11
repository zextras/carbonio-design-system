/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Container from '../layout/Container';
import { FormSection, FormSubSection } from '../basic/FormSection';
import Padding from '../layout/Padding';

const sizes = {
	small: 5,
	medium: 10,
	large: 15
};

const backgroundColorShimmer = (theme) => `linear-gradient(
	to right,
	${theme.palette.gray4.regular} 20%,
	${theme.palette.gray5.regular} 40%,
	${theme.palette.gray4.regular} 100%
)`;

const backgroundColorShimmerDark = (theme) => `linear-gradient(
	to right,
	${theme.palette.gray3.regular} 20%,
	${theme.palette.gray4.regular} 40%,
	${theme.palette.gray3.regular} 100%
)`;

const backgroundColorShimmerExtraDark = (theme) => `linear-gradient(
	to right,
	${theme.palette.gray2.regular} 20%,
	${theme.palette.gray3.regular} 40%,
	${theme.palette.gray2.regular} 100%
)`;

const backgroundFunction = (variant, theme) => {
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
	0% {
		background-position: -1000px 0;
	}
	100% {
		background-position: 1000px 0;
	}
}`;

const animationOptions = '1.5s linear infinite';

const backgroundSize = `1000px 100%`;

const AvatarSkeletonComponent = styled.div`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
	aspect-ratio: 1/1;
	border-radius: ${({ radius }) => radius ?? '50%'};
	width: ${({ size, width }) => width ?? `${sizes[size] * 3.2}px`};
`;

const BadgeSkeletonComponent = styled.div`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
	display: inline-block;
	border-radius: ${({ radius }) => radius ?? '2em'};
	width: ${({ size, width }) => width ?? `${sizes[size] * 3.6}px`};
	height: ${({ size, height }) => height ?? `${sizes[size] * 1.9}px`};
`;

const ButtonSkeletonComponent = styled.div`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
	border-radius: ${({ radius }) => radius ?? '2px'};
	width: ${({ size, width }) => width ?? `${sizes[size] * 8.9}px`};
	height: ${({ size, height }) => height ?? `${sizes[size] * 3.2}px`};
`;

const FormSectionSkeletonComponent = styled(FormSection)`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
`;

const FormSubSectionSkeletonComponent = styled(FormSubSection)`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
`;

const IconSkeletonComponent = styled.div`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
	aspect-ratio: 1/1;
	border-radius: 2px;
	width: ${({ size, width }) => width ?? `${sizes[size] * 1.6}px`};
`;

const LogoSkeletonComponent = styled.div`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
	border-radius: ${({ radius }) => radius ?? '10px'};
	width: ${({ size, width }) => width ?? `${sizes[size] * 20}px`};
	height: ${({ size, height }) => height ?? `${sizes[size] * 10}px`};
`;

const SkeletonComponent = styled.div`
	animation: ${shimmerEffect} ${animationOptions};
	background: ${({ variant, theme }) => backgroundFunction(variant, theme)};
	background-size: ${backgroundSize};
	border-radius: ${({ radius }) => radius ?? '2px'};
	${({ orientation }) => `orientation: ${orientation}}` ?? ''};
	${({ mainAlignment }) => `mainAlignment: ${mainAlignment}}` ?? ''};
	width: ${({ width }) => width ?? '100%'};
	height: ${({ height }) => height ?? '16px'};
`;

const ShimmerObject = {
	Accordion: ({ width, iconStart, iconEnd, badge }) => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			width={width}
			height="52px"
		>
			<Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
				<Padding left="large" />
				{iconStart ? (
					<Padding left="small">
						<IconSkeletonComponent
							variant="dark"
							size="medium"
							style={{ margin: 'auto 0 auto 0' }}
						/>
					</Padding>
				) : null}
				<SkeletonComponent
					variant="dark"
					style={{ margin: '0 0 0 12px' }}
					width="70%"
					height="16px"
				/>
				{badge ? (
					<Padding left="small">
						<BadgeSkeletonComponent variant="dark" height="16px" size="large" />
					</Padding>
				) : null}
				{iconEnd ? (
					<Padding left="small">
						<IconSkeletonComponent
							variant="dark"
							size="medium"
							style={{ margin: 'auto 0 auto 0' }}
						/>
					</Padding>
				) : null}
				<Padding right="large" />
			</Container>
		</SkeletonComponent>
	),
	Avatar: ({ size = 'medium', width, ...rest }) => (
		<AvatarSkeletonComponent size={size} width={width} {...rest} />
	),
	Badge: ({ size = 'medium', width, ...rest }) => (
		<BadgeSkeletonComponent size={size} width={width} {...rest} />
	),
	Button: ({ size = 'medium', width, ...rest }) => (
		<ButtonSkeletonComponent size={size} width={width} {...rest}></ButtonSkeletonComponent>
	),
	Checkbox: ({ size = 'medium', ...rest }) => (
		<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
			<IconSkeletonComponent size={size} {...rest} />
			<Padding right="small" />
			<SkeletonComponent height="16px" width="150px" {...rest} />
		</Container>
	),
	EmailChip: ({ width, iconStart, iconEnd, iconEndAdditional }) => (
		<SkeletonComponent
			width={width}
			height="20px"
			style={{
				borderRadius: '2em',
				display: 'flex',
				flexDirection: 'row'
			}}
		>
			{iconStart ? (
				<IconSkeletonComponent
					variant="dark"
					style={{ borderRadius: '50%', height: '16px', margin: 'auto 0 auto 4px' }}
				/>
			) : null}
			<Padding left={iconStart ? 'extrasmall' : 'small'} />
			<SkeletonComponent
				variant="dark"
				width="100%"
				height="12px"
				radius="2px"
				style={{ margin: 'auto 0px' }}
			/>
			<Padding right={iconEnd ? 'extrasmall' : 'small'} />
			{iconEnd ? (
				<IconSkeletonComponent
					variant="dark"
					style={{ borderRadius: '50%', height: '16px', margin: 'auto 4px auto 0' }}
				/>
			) : null}
			{iconEndAdditional && iconEnd ? (
				<IconSkeletonComponent
					variant="dark"
					style={{ borderRadius: '50%', height: '16px', margin: 'auto 4px auto 0' }}
				/>
			) : null}
		</SkeletonComponent>
	),
	FormSection: ({ ...rest }) => <FormSectionSkeletonComponent {...rest} />,
	FormSubSection: ({ ...rest }) => <FormSubSectionSkeletonComponent {...rest} />,
	Icon: ({ size = 'medium', width, ...rest }) => (
		<IconSkeletonComponent size={size} width={width} {...rest} />
	),
	Input: ({ width, checkbox }) => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			width={width}
			height="fit"
		>
			<SkeletonComponent justify-content="flex-start" width="50%" height="fit">
				<SkeletonComponent
					variant="dark"
					width="fill"
					style={{ margin: '5px 0 0 12px' }}
					height="12px"
				/>
				<SkeletonComponent
					variant="dark"
					width="fill"
					style={{ margin: '5px 0 6px 12px' }}
					height="16px"
				/>
				<Padding bottom="6px" />
			</SkeletonComponent>
			{checkbox ? (
				<SkeletonComponent
					justify-content="flex-end"
					width="fill"
					height="fit"
					style={{ margin: 'auto 0 auto 0' }}
				>
					<IconSkeletonComponent variant="dark" size="medium" style={{ marginRight: '16px' }} />
				</SkeletonComponent>
			) : null}
		</SkeletonComponent>
	),
	ListItem: ({ width, type }) => {
		switch (type) {
			case 1:
				return (
					<SkeletonComponent height="64px" width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent variant="dark" width="48px" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent variant="dark" width="150px" size="medium" />
									<Padding top="small" />
									<SkeletonComponent variant="dark" width="220px" size="medium" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent variant="dark" width="60px" size="medium" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<BadgeSkeletonComponent variant="dark" width="38px" height="21px" />{' '}
									<Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 2:
				return (
					<SkeletonComponent height="64px" width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent variant="dark" width="48px" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent variant="dark" width="195px" size="medium" />
									<Padding top="small" />
									<SkeletonComponent variant="dark" width="83px" size="medium" />
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
										<IconSkeletonComponent size="medium" />
									</Padding>
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 3:
				return (
					<SkeletonComponent height="64px" width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent variant="dark" width="48px" radius="10px" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent variant="dark" width="134px" size="medium" />
									<Padding top="small" />
									<SkeletonComponent variant="dark" width="83px" size="medium" />
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
										<SkeletonComponent variant="dark" width="46px" size="medium" />
									</Padding>
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 4:
				return (
					<SkeletonComponent height="64px" width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent variant="dark" width="48px" radius="10px" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent variant="dark" width="134px" size="medium" />
									<Padding top="small" />
									<SkeletonComponent variant="dark" width="83px" size="medium" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent variant="dark" width="60px" size="medium" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent variant="dark" width="112px" size="medium" />{' '}
									<Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			case 5:
				return (
					<SkeletonComponent height="64px" width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent variant="dark" width="48px" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent variant="dark" width="134px" size="medium" />
									<Padding top="small" />
									<SkeletonComponent variant="dark" width="83px" size="medium" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent variant="dark" width="112px" size="medium" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<IconSkeletonComponent variant="dark" size="medium" /> <Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
			default:
				return (
					<SkeletonComponent height="64px" width={width}>
						<Container orientation="horizontal" mainAlignment="flex-start">
							<Padding left="medium" vertical="small">
								<AvatarSkeletonComponent variant="dark" width="48px" />
							</Padding>
							<Container
								height="fill"
								width="fit"
								orientation="vertical"
								mainAlignment="flex-start"
							>
								<Padding left="large" vertical="medium">
									<SkeletonComponent variant="dark" width="150px" size="medium" />
									<Padding top="small" />
									<SkeletonComponent variant="dark" width="220px" size="medium" />
								</Padding>
							</Container>
							<Container height="fit" width="fill" orientation="vertical" mainAlignment="flex-end">
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<SkeletonComponent variant="dark" width="60px" size="medium" />
									<Padding right="medium" />
								</Container>
								<Padding top="small" />
								<Container
									height="fit"
									width="fill"
									orientation="horizontal"
									mainAlignment="flex-end"
								>
									<BadgeSkeletonComponent variant="dark" width="38px" height="21px" />{' '}
									<Padding right="medium" />
								</Container>
							</Container>
						</Container>
					</SkeletonComponent>
				);
		}
	},

	Logo: ({ height, width, radius, size = 'medium', ...rest }) => (
		<LogoSkeletonComponent height={height} size={size} width={width} radius={radius} {...rest} />
	),
	Text: ({ width, height, size = 'medium', ...rest }) => (
		<SkeletonComponent size={size} width={width} height={height} {...rest} />
	),

	Quota: ({ width, height }) => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			width={width}
			height={height}
		>
			<IconSkeletonComponent variant="dark" size="medium" width="50%" />
		</SkeletonComponent>
	),
	RichTextEditor: ({ width }) => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
			width={width}
			height="40px"
		>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<SkeletonComponent variant="dark" width="40px" height="16px" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<SkeletonComponent variant="dark" width="48px" height="16px" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>
			<Padding vertical="medium" left="large">
				<SkeletonComponent variant="dark" width="52px" height="16px" />
			</Padding>
			<Padding vertical="medium" left="large">
				<IconSkeletonComponent variant="dark" size="medium" />
			</Padding>

			<Container
				orientation="horizontal"
				mainAlignment="flex-end"
				crossAlignment="center"
				width="50%"
			>
				<Padding vertical="medium" right="large">
					<IconSkeletonComponent variant="dark" size="medium" />
				</Padding>
			</Container>
		</SkeletonComponent>
	),
	Searchbar: ({ width }) => (
		<SkeletonComponent
			style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}
			width={width}
			height="36px"
		>
			<Container
				width="50%"
				style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}
			>
				<SkeletonComponent
					variant="dark"
					style={{ margin: '0 0 0 12px' }}
					width="70%"
					height="12px"
				/>
				<Padding left="small" />
				<IconSkeletonComponent variant="dark" size="medium" style={{ margin: 'auto 0 auto 0' }} />
			</Container>
			<Container
				orientation="horizontal"
				mainAlignment="flex-end"
				crossAlignment="center"
				width="50%"
			>
				<SkeletonComponent
					variant="dark"
					style={{ margin: 'auto 0 auto 12px', width: '50%' }}
					height="12px"
				/>
				<Padding left="small" />
				<IconSkeletonComponent variant="dark" size="large" style={{ marginRight: '16px' }} />
			</Container>
		</SkeletonComponent>
	),
	Snackbar: ({ width, elementStart, elementEnd }) => (
		<SkeletonComponent
			width={width}
			height="fit"
			style={{
				borderRadius: '2px',
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center'
			}}
		>
			<Padding left={elementStart ? 0 : 'extralarge'} />
			{elementStart ? (
				<Padding all="large" left="extralarge">
					<IconSkeletonComponent variant="dark" width="32px" />
				</Padding>
			) : null}
			<SkeletonComponent
				variant="dark"
				width="100%"
				height="16px"
				radius="2px"
				style={{ margin: '16px 0' }}
			/>
			{elementEnd ? (
				<Padding>
					<SkeletonComponent
						variant="dark"
						height="24px"
						width="94px"
						style={{ margin: '0 24px 0 16px' }}
					/>
				</Padding>
			) : (
				<Padding right={elementEnd ? 0 : 'extralarge'} />
			)}
		</SkeletonComponent>
	),
	Stepper: ({ size = 'medium', width, steppersNumber, ...rest }) => {
		const _steppers = [];
		for (let i = 0; i < steppersNumber - 1; i += 1) {
			_steppers.push(
				<Container key={i} orientation="horizontal" mainAlignment="flex-start" width="fit">
					<Padding top="medium" right="small">
						<SkeletonComponent height="1px" width="80px" style={{ margin: 'auto 0 auto 0' }} />
					</Padding>
					<Padding top="medium" right="small">
						<AvatarSkeletonComponent size={size} width={width} {...rest} />
					</Padding>
				</Container>
			);
		}
		return (
			<Container orientation="horizontal" mainAlignment="flex-start" width="100%">
				<Padding top="medium" right="small">
					<AvatarSkeletonComponent size={size} width={width} {...rest} />
				</Padding>
				{_steppers}
			</Container>
		);
	},
	TableListItem: ({ width, type }) => {
		switch (type) {
			case 1:
				return (
					<SkeletonComponent
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						width={width}
						height="40px"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="80px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="49px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="75px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="63px" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent variant="dark" width="30px" />
						</Padding>
					</SkeletonComponent>
				);
			case 2:
				return (
					<Container
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						width={width}
						height="40px"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="80px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="49px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="75px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="63px" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent variant="dark" width="30px" />
						</Padding>
					</Container>
				);
			case 3:
				return (
					<SkeletonComponent
						variant="dark"
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						width={width}
						height="40px"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="extraDark" width="80px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="extraDark" width="49px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="extraDark" width="75px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="extraDark" width="63px" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent variant="extraDark" width="30px" />
						</Padding>
					</SkeletonComponent>
				);
			default:
				return (
					<SkeletonComponent
						style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}
						width={width}
						height="40px"
					>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="80px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="49px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="75px" />
						</Padding>
						<Padding vertical="medium" left="large">
							<SkeletonComponent variant="dark" width="63px" />
						</Padding>
						<Padding vertical="medium" horizontal="large">
							<SkeletonComponent variant="dark" width="30px" />
						</Padding>
					</SkeletonComponent>
				);
		}
	}
};

const Shimmer = (props) => <SkeletonComponent {...props} />;

Shimmer.Accordion = ({ ...rest }) => <ShimmerObject.Accordion {...rest} />;
Shimmer.Avatar = ({ ...rest }) => <ShimmerObject.Avatar {...rest} />;
Shimmer.Badge = ({ ...rest }) => <ShimmerObject.Badge {...rest} />;
Shimmer.Button = ({ ...rest }) => <ShimmerObject.Button {...rest} />;
Shimmer.Checkbox = ({ ...rest }) => <ShimmerObject.Checkbox {...rest} />;
Shimmer.EmailChip = ({ ...rest }) => <ShimmerObject.EmailChip {...rest} />;
Shimmer.FormSection = ({ ...rest }) => <ShimmerObject.FormSection {...rest} />;
Shimmer.FormSubSection = ({ ...rest }) => <ShimmerObject.FormSubSection {...rest} />;
Shimmer.Icon = ({ ...rest }) => <ShimmerObject.Icon {...rest} />;
Shimmer.Input = ({ ...rest }) => <ShimmerObject.Input {...rest} />;
Shimmer.ListItem = ({ ...rest }) => <ShimmerObject.ListItem {...rest} />;
Shimmer.Logo = ({ ...rest }) => <ShimmerObject.Logo {...rest} />;
Shimmer.Quota = ({ ...rest }) => <ShimmerObject.Quota {...rest} />;
Shimmer.RichTextEditor = ({ ...rest }) => <ShimmerObject.RichTextEditor {...rest} />;
Shimmer.Searchbar = ({ ...rest }) => <ShimmerObject.Searchbar {...rest} />;
Shimmer.Snackbar = ({ ...rest }) => <ShimmerObject.Snackbar {...rest} />;
Shimmer.Stepper = ({ ...rest }) => <ShimmerObject.Stepper {...rest} />;
Shimmer.TableListItem = ({ ...rest }) => <ShimmerObject.TableListItem {...rest} />;
Shimmer.Text = ({ ...rest }) => <ShimmerObject.Text {...rest} />;

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
Shimmer.RichTextEditor.displayName = 'Shimmer.RichTextEditor';
Shimmer.Searchbar.displayName = 'Shimmer.Searchbar';
Shimmer.Snackbar.displayName = 'Shimmer.Snackbar';
Shimmer.Stepper.displayName = 'Shimmer.Stepper';
Shimmer.TableListItem.displayName = 'Shimmer.TableListItem';
Shimmer.Text.displayName = 'Shimmer.Text';

ShimmerObject.Accordion.displayName = 'ShimmerObject.Accordion';
ShimmerObject.Avatar.displayName = 'ShimmerObject.Avatar';
ShimmerObject.Badge.displayName = 'ShimmerObject.Badge';
ShimmerObject.Button.displayName = 'ShimmerObject.Button';
ShimmerObject.Checkbox.displayName = 'ShimmerObject.Checkbox';
ShimmerObject.EmailChip.displayName = 'ShimmerObject.EmailChip';
ShimmerObject.FormSection.displayName = 'ShimmerObject.FormSection';
ShimmerObject.FormSubSection.displayName = 'ShimmerObject.FormSubSection';
ShimmerObject.Icon.displayName = 'ShimmerObject.Icon';
ShimmerObject.Input.displayName = 'ShimmerObject.Input';
ShimmerObject.ListItem.displayName = 'ShimmerObject.ListItem';
ShimmerObject.Logo.displayName = 'ShimmerObject.Logo';
ShimmerObject.Quota.displayName = 'ShimmerObject.Quota';
ShimmerObject.RichTextEditor.displayName = 'ShimmerObject.RichTextEditor';
ShimmerObject.Searchbar.displayName = 'ShimmerObject.Searchbar';
ShimmerObject.Snackbar.displayName = 'ShimmerObject.Snackbar';
ShimmerObject.Stepper.displayName = 'ShimmerObject.Stepper';
ShimmerObject.TableListItem.displayName = 'ShimmerObject.TableListItem';
ShimmerObject.Text.displayName = 'ShimmerObject.Text';
ShimmerObject.displayName = 'ShimmerObject';
export default Shimmer;
