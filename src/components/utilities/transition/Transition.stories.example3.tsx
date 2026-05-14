/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useReducer, useState } from 'react';

import { Transition } from './Transition';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { Select } from '../../inputs/select/Select';
import { Container } from '../../layout/container/Container';
import { Padding } from '../../layout/padding/Padding';
import { Row } from '../../layout/row/Row';

export const TransitionExample3 = (): React.JSX.Element => {
	function reducer(
		state: string[],
		action: { type: 'add'; value: string } | { type: 'reset' }
	): string[] {
		switch (action.type) {
			case 'add':
				return [...state, action.value];
			case 'reset':
				return [];
			default:
				throw new Error();
		}
	}
	const effects = [...(Transition.types ?? [])];
	const selectItems = effects.reduce<Array<{ label: string; value: string }>>(
		(acc, currentValue) => [...acc, { label: currentValue, value: currentValue }],
		[]
	);
	const [toDos, dispatch] = useReducer(reducer, []);
	const [effect, setEffect] = useState('fade');

	return (
		<Container crossAlignment="flex-start" orientation="horizontal">
			<Row orientation="vertical" width="40%">
				<Select
					items={selectItems}
					defaultSelection={{ label: 'fade', value: 'fade' }}
					onChange={(value): void => setEffect(value ?? 'fade')}
					label="Select an effect"
				/>
				<Row width="100%" mainAlignment="flex-start" padding={{ top: 'large' }}>
					<Button label="Add" onClick={() => dispatch({ type: 'add', value: 'Random value' })} />
					<Button
						type="ghost"
						color="error"
						label="Reset"
						onClick={() => dispatch({ type: 'reset' })}
					/>
				</Row>
			</Row>
			<Row wrap="wrap" width="60%">
				{!toDos.length && <Text>No element added</Text>}
				{toDos.length > 0 &&
					toDos.map((toDo, index) => (
						<Transition key={index} type={effect}>
							<Padding value="0.125rem">
								<Button label={toDo} onClick={() => {}} />
							</Padding>
						</Transition>
					))}
			</Row>
		</Container>
	);
};
