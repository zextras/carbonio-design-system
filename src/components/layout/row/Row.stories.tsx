/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { Row } from './Row';
import { Text } from '../../basic/text/Text';
import { Container } from '../container/Container';

const meta = {
	component: Row
} satisfies Meta<typeof Row>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
	render: (): React.JSX.Element => (
		<Container orientation="horizontal">
			<Row>
				<Text>1</Text>
			</Row>
			<Row>
				<Text>2</Text>
			</Row>
			<Row>
				<Text>3</Text>
			</Row>
			<Row>
				<Text>4</Text>
			</Row>
			<Row takeAvailableSpace>
				<Text>{'5'.repeat(150)}</Text>
			</Row>
			<Row>
				<Text>6</Text>
			</Row>
			<Row>
				<Text>7</Text>
			</Row>
			<Row>
				<Text>8</Text>
			</Row>
			<Row>
				<Text>9</Text>
			</Row>
			<Row>
				<Text>10</Text>
			</Row>
		</Container>
	)
} satisfies Story;
