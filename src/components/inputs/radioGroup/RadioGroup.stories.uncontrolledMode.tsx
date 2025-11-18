/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { RadioGroup } from './RadioGroup';
import { Button } from '../../basic/button/Button';
import { Container } from '../../layout/container/Container';
import { Radio } from '../radio/Radio';

export const UncontrolledRadioGroup = (): React.JSX.Element => (
	<Container crossAlignment="flex-start" gap="1rem">
		<RadioGroup defaultValue="chicken">
			<Radio label="Chicken" value="chicken" />
			<Radio label="Salad" value="salad" />
			<Radio label="Tomato" value="tomato" />
			<Radio
				label={
					<Button
						type="outlined"
						label="Click me"
						color="info"
						onClick={() => {
							console.log('I got clicked!!');
						}}
					/>
				}
				value="click-me"
			/>
			<Radio label="Mayo" value="mayo" disabled />
		</RadioGroup>
	</Container>
);
