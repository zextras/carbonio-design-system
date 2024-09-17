/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useState } from 'react';

import { ChipInput, ChipInputProps, ChipItem } from './ChipInput';
import { Button } from '../../basic/button/Button';
import { Text } from '../../basic/text/Text';
import { DropdownItem } from '../../display/Dropdown';
import { Container } from '../../layout/Container';
import { Input, InputProps } from '../Input';

type User = {
	address?: string;
	lastName?: string;
	firstName: string;
};

type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

const initial: ChipItem<User>[] = [
	{
		value: {
			address: 'helensinclair@jourrapide.com',
			lastName: 'Sinclair',
			firstName: 'Helen'
		},
		label: 'Helen Sinclair'
	},
	{
		value: {
			address: 'pierrejohnson@rhyta.com',
			lastName: 'Johnson',
			firstName: 'Pierre'
		},
		label: 'Pierre Johnson'
	},
	{
		value: {
			firstName: 'Bob'
		},
		label: 'Bob'
	}
];

export const ControlledChipInput = (props: ChipInputProps<User>): React.JSX.Element => {
	const [value, setValue] = useState<ChipItem<User>[]>(initial);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState<NonNullable<ChipInputProps['options']>>([]);
	const [results, setResults] = useState<Post[]>();

	const addValue = useCallback(() => {
		setValue([...value, { label: inputValue }]);
		setInputValue('');
	}, [inputValue, value]);

	const onChange = useCallback<NonNullable<ChipInputProps<User>['onChange']>>((newValue) => {
		setValue(newValue);
	}, []);

	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then((response) => response.json() as Promise<Post[]>)
			.then((posts) => setResults(posts));
	}, []);

	const onChipInputType = useCallback<NonNullable<ChipInputProps['onInputType']>>(
		({ textContent }) => {
			if (textContent && results) {
				setOptions(
					results
						.filter((result) => result.title.includes(textContent))
						.map<DropdownItem>((result) => ({
							id: `${result.id}`,
							value: result.title,
							label: result.title
						}))
				);
			} else {
				setOptions([]);
			}
		},
		[results]
	);

	const onInputChange = useCallback<NonNullable<InputProps['onChange']>>((e) => {
		setInputValue(e.target.value);
	}, []);

	return (
		<div>
			<Container
				orientation="horizontal"
				mainAlignment="flex-start"
				width="31.25rem"
				padding={{ bottom: 'medium' }}
			>
				<Input value={inputValue} onChange={onInputChange} label="User to add" />
				<Button onClick={addValue} label="Add Element" />
			</Container>
			<ChipInput
				{...props}
				placeholder="User"
				value={value}
				onChange={onChange}
				onInputType={onChipInputType}
				options={options}
			/>
			<Container
				mainAlignment="flex-start"
				crossAlignment="flex-start"
				width="31.25rem"
				padding={{ top: 'medium' }}
				gap={'0.5rem'}
			>
				<Text>State value:</Text>
				{value.length > 0 && (
					<ul>
						{value.map((item, index) => (
							<li key={index}>
								<Text>{JSON.stringify(item)}</Text>
							</li>
						))}
					</ul>
				)}
				{!value.length && <Text>Empty!</Text>}
			</Container>
		</div>
	);
};
