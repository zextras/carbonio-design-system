/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Container } from '../layout/Container';
import { Divider } from '../layout/Divider';
import { Padding } from '../layout/Padding';
import { Text } from './Text';

const FormSection = React.forwardRef(function FormSectionFn({ label, children, ...rest }, ref) {
	return (
		<Container
			ref={ref}
			padding={{ all: 'small' }}
			orientation="vertical"
			height="fit"
			crossAlignment="flex-start"
			width="fill"
			{...rest}
		>
			<Padding all="small">
				<Text weight="bold" size="large">
					{label}
				</Text>
			</Padding>
			<Container
				padding={{ all: 'small' }}
				direction="vertical"
				crossAlignment="flex-start"
				width="fill"
				height="fit"
			>
				{children}
			</Container>
		</Container>
	);
});

FormSection.propTypes = {
	label: PropTypes.string
};

FormSection.defaultProps = {
	label: ''
};

const FormSubSection = React.forwardRef(function FormSubSectionFn(
	{ label, children, ...rest },
	ref
) {
	return (
		<Padding bottom="small" style={{ width: '100%' }}>
			<Container
				background="gray6"
				ref={ref}
				orientation="vertical"
				height="fit"
				crossAlignment="flex-start"
				width="fill"
				{...rest}
			>
				<Padding all="small" left="medium">
					<Text weight="bold" size="large">
						{label}
					</Text>
				</Padding>
				<Divider />
				<Container
					padding={{ all: 'small' }}
					direction="vertical"
					crossAlignment="flex-start"
					width="fill"
					height="fit"
				>
					{children}
				</Container>
			</Container>
		</Padding>
	);
});

FormSubSection.propTypes = {
	label: PropTypes.string
};

FormSubSection.defaultProps = {
	label: ''
};

const FormRow = React.forwardRef(function FormRowFn({ label, children, ...rest }, ref) {
	return (
		<Container
			background="gray6"
			ref={ref}
			orientation="horizontal"
			height="fit"
			width="fill"
			crossAlignment="baseline"
			{...rest}
		>
			<Container
				padding={{ all: 'extrasmall', right: 'small' }}
				crossAlignment="flex-end"
				width="30%"
			>
				<Text weight="bold" size="large">
					{label}
				</Text>
			</Container>
			<Container direction="vertical" crossAlignment="flex-start" width="70%" height="fit">
				{children}
			</Container>
		</Container>
	);
});

FormRow.propTypes = {
	label: PropTypes.string
};

FormRow.defaultProps = {
	label: ''
};

export { FormSection, FormSubSection, FormRow };
