/*
 * SPDX-FileCopyrightText: 2025 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { Radio } from './Radio';
import { Text } from '../../basic/text/Text';
import { Padding } from '../../layout/Padding';
import { Row } from '../../layout/Row';
import { Select } from '../Select';

export const RadioCustomLabel = (): React.JSX.Element => (
	<Radio
		label={
			<Row
				onClick={(ev) => {
					ev.preventDefault();
				}}
				takeAvailableSpace
				mainAlignment="flex-start"
				wrap="nowrap"
			>
				<Text overflow="break-word">Label with interactive element</Text>
				<Padding horizontal="small">
					<Select
						display="inline-block"
						dropdownWidth="auto"
						background="gray5"
						label="Number"
						items={[
							{ label: 'First', value: '1' },
							{ label: 'Second', value: '2' }
						]}
						defaultSelection={{ value: '1', label: 'First' }}
						onChange={() => undefined}
					/>
				</Padding>
			</Row>
		}
	/>
);
