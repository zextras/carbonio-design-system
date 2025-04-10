/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { ContainerProps } from '../../layout/container/Container';
import { Container } from '../../layout/container/Container';
import { Divider } from '../../layout/divider/Divider';
import { Padding } from '../../layout/Padding';
import { Text } from '../text/Text';
import type { TextProps } from '../text/Text';

interface FormSectionProps extends ContainerProps {
	label: TextProps['children'];
}

interface FormSubSectionProps extends ContainerProps {
	label?: TextProps['children'];
}

const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(function FormSectionFn(
	{ label, children, ...rest },
	ref
) {
	return (
		<Container
			ref={ref}
			padding={{ all: 'large' }}
			height="fit"
			crossAlignment="flex-start"
			background="gray6"
			{...rest}
		>
			<Padding top="small" bottom="small">
				<Text weight="bold" size="extralarge">
					{label}
				</Text>
			</Padding>
			<Divider />
			<Container padding={{ all: 'large' }} crossAlignment="flex-start" gap="1rem" height="fit">
				{children}
			</Container>
		</Container>
	);
});

const FormSubSection = React.forwardRef<HTMLDivElement, FormSubSectionProps>(
	function FormSubSectionFn({ label, children, ...rest }, ref) {
		return (
			<Container
				background="gray6"
				ref={ref}
				height="fit"
				crossAlignment="flex-start"
				gap="1rem"
				{...rest}
			>
				{label && (
					<Text weight="bold" size="large">
						{label}
					</Text>
				)}
				{children}
			</Container>
		);
	}
);

export type { FormSectionProps, FormSubSectionProps };
export { FormSection, FormSubSection };
