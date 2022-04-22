/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import { render } from '../../test-utils';
import { ChipInput, ChipItem } from './ChipInput';

describe('ChipInput', () => {
	test('render a chip input with a placeholder, two chips, an icon and a description', () => {
		const chips = [{ label: 'LabelChip 1' }, { label: 'LabelChip 2' }];
		render(
			<ChipInput
				value={chips}
				icon="PeopleOutline"
				description="This is the optional description"
				placeholder="A placeholder for the input"
			/>
		);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('LabelChip 1')).toBeInTheDocument();
		expect(screen.getByText('LabelChip 1')).toBeVisible();
		expect(screen.getByText('LabelChip 2')).toBeInTheDocument();
		expect(screen.getByText('LabelChip 2')).toBeVisible();
		expect(screen.getByText('This is the optional description')).toBeInTheDocument();
		expect(screen.getByText('This is the optional description')).toBeVisible();
		expect(screen.getByPlaceholderText('A placeholder for the input')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('A placeholder for the input')).toBeVisible();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeInTheDocument();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeVisible();
	});

	test('render a chip input without a placeholder', () => {
		const chips = [{ label: 'LabelChip 1' }, { label: 'LabelChip 2' }];
		render(
			<ChipInput
				value={chips}
				icon="PeopleOutline"
				description="This is the optional description"
			/>
		);

		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('LabelChip 1')).toBeInTheDocument();
		expect(screen.getByText('LabelChip 2')).toBeInTheDocument();
	});

	test('render a chip input without an icon', () => {
		const chips = [{ label: 'LabelChip 1' }, { label: 'LabelChip 2' }];
		render(
			<ChipInput
				value={chips}
				description="This is the optional description"
				placeholder="A placeholder for the input"
			/>
		);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('LabelChip 1')).toBeInTheDocument();
		expect(screen.getByText('LabelChip 2')).toBeInTheDocument();
	});

	test('render an empty chip input', () => {
		render(<ChipInput />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeVisible();
	});

	test('space, enter and comma are default separators and create a chip when typed', () => {
		render(<ChipInput />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip 1 with space
		userEvent.type(inputElement, 'ciao');
		expect(inputElement).toHaveValue('ciao');
		userEvent.type(inputElement, '{space}');
		// input is cleared
		expect(inputElement).not.toHaveValue('ciao');
		// chip 1 is visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeInTheDocument();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		// create chip 2 with enter
		userEvent.type(inputElement, 'hello');
		expect(inputElement).toHaveValue('hello');
		userEvent.type(inputElement, '{Enter}');
		// input is cleared
		expect(inputElement).not.toHaveValue('hello');
		// chip 1 is still visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		// chip 2 is visible
		expect(screen.getByText('hello')).toBeInTheDocument();
		expect(screen.getByText('hello')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(2);
		// create chip 3 with comma
		userEvent.type(inputElement, 'salut');
		expect(inputElement).toHaveValue('salut');
		// comma is not included in the default keyboard map https://testing-library.com/docs/user-event/options/#keyboardmap
		// so specify a custom map to assign the code
		userEvent.keyboard(',', { keyboardMap: [{ code: 'Comma', key: ',', keyCode: 188 }] });
		// input is cleared
		expect(inputElement).not.toHaveValue('salut');
		// chip 1 is still visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		// chip 2 is still visible
		expect(screen.getByText('hello')).toBeInTheDocument();
		expect(screen.getByText('hello')).toBeVisible();
		// chip 3 is visible
		expect(screen.getByText('salut')).toBeInTheDocument();
		expect(screen.getByText('salut')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(3);
	});

	test('if custom separators are provided, enter and comma does not create a chip when typed, the custom keys do it', () => {
		const separators = ['x'];
		render(<ChipInput separators={separators} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip 1 with space (space has its own boolean prop)
		userEvent.type(inputElement, 'ciao');
		expect(inputElement).toHaveValue('ciao');
		userEvent.type(inputElement, '{space}');
		// input is cleared
		expect(inputElement).not.toHaveValue('ciao');
		// chip 1 is visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeInTheDocument();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		// create chip 2 with x
		userEvent.type(inputElement, 'hello');
		expect(inputElement).toHaveValue('hello');
		// enter does not create a chip
		userEvent.type(inputElement, '{Enter}');
		userEvent.type(inputElement, 'There');
		expect(inputElement).toHaveValue('helloThere');
		userEvent.type(inputElement, 'x');
		// input is cleared
		expect(inputElement).not.toHaveValue('helloThere');
		// chip 1 is still visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		// chip 2 is visible
		expect(screen.getByText('helloThere')).toBeInTheDocument();
		expect(screen.getByText('helloThere')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(2);
		// comma does not create chip
		userEvent.type(inputElement, 'salut');
		expect(inputElement).toHaveValue('salut');
		// comma is not included in the default keyboard map https://testing-library.com/docs/user-event/options/#keyboardmap
		// so specify a custom map to assign the code
		userEvent.keyboard(',', { keyboardMap: [{ code: 'Comma', key: ',', keyCode: 188 }] });
		expect(inputElement).toHaveValue('salut,');
		userEvent.type(inputElement, 'bonjourx');
		// input is cleared
		expect(inputElement).not.toHaveValue('salut');
		// chip 1 is still visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		// chip 2 is still visible
		expect(screen.getByText('helloThere')).toBeInTheDocument();
		expect(screen.getByText('helloThere')).toBeVisible();
		// chip 3 is visible
		expect(screen.getByText('salut,bonjour')).toBeInTheDocument();
		expect(screen.getByText('salut,bonjour')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(3);
	});

	test('blur event creates a chip', () => {
		render(<ChipInput />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip with blur
		userEvent.type(inputElement, 'ciao');
		expect(inputElement).toHaveValue('ciao');
		userEvent.tab();
		// input is cleared
		expect(inputElement).not.toHaveValue('ciao');
		// chip 1 is visible
		expect(screen.getByText('ciao')).toBeInTheDocument();
		expect(screen.getByText('ciao')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeInTheDocument();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		expect(inputElement).not.toHaveFocus();
	});

	test('if space separator is disabled, space does not create a chip', () => {
		render(<ChipInput confirmChipOnSpace={false} separators={[',']} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip with space
		userEvent.type(inputElement, 'ciao ciao');
		// input keeps its value
		expect(inputElement).toHaveValue('ciao ciao');
		expect(screen.queryByTestId('icon: Close')).not.toBeInTheDocument();
		expect(inputElement).toHaveFocus();
	});

	test('if space separator is enabled, space create a chip', () => {
		render(<ChipInput separators={['Space']} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip with space
		userEvent.type(inputElement, 'ciao hello');
		// input value is text after space
		expect(inputElement).toHaveValue('hello');
		// chip is created with text before space
		expect(screen.getByText('ciao')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeInTheDocument();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
	});

	test('if blur separator is disabled, blur does not create a chip', () => {
		render(<ChipInput confirmChipOnBlur={false} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip with blur
		userEvent.type(inputElement, 'ciao');
		expect(inputElement).toHaveValue('ciao');
		userEvent.tab();
		// input keeps its value
		expect(inputElement).toHaveValue('ciao');
		expect(screen.queryByTestId('icon: Close')).not.toBeInTheDocument();
		expect(inputElement).not.toHaveFocus();
	});

	test('if chip input is disabled, user can not type inside input', () => {
		render(<ChipInput disabled />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip with blur
		userEvent.type(inputElement, 'ciao');
		expect(inputElement).not.toHaveValue('ciao');
		expect(screen.queryByText('ciao')).not.toBeInTheDocument();
		expect(inputElement).not.toHaveFocus();
	});

	test('if chip input is disabled, icon action and chip action are still interactive', () => {
		const chip = [{ label: 'chip' }];
		const changeFn = jest.fn();
		const iconActionFn = jest.fn();

		render(
			<ChipInput
				disabled
				value={chip}
				onChange={changeFn}
				icon="PeopleOutline"
				iconAction={iconActionFn}
			/>
		);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		expect(screen.getByText('chip')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		userEvent.click(screen.getByTestId('icon: Close'));
		expect(changeFn).toHaveBeenCalled();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeVisible();
		userEvent.click(screen.getByTestId('icon: PeopleOutline'));
		expect(iconActionFn).toHaveBeenCalled();
	});

	test('if chip input icon is disabled, icon action is not triggered', () => {
		const changeFn = jest.fn();
		const iconActionFn = jest.fn();

		render(
			<ChipInput
				disabled
				onChange={changeFn}
				icon="PeopleOutline"
				iconAction={iconActionFn}
				iconDisabled
			/>
		);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(screen.getByRole('button')).toBeVisible();
		expect(screen.getByRole('button')).toBeDisabled();
		userEvent.click(screen.getByTestId('icon: PeopleOutline'));
		expect(iconActionFn).not.toHaveBeenCalled();
	});

	test('click on chip input set focus on input', () => {
		render(<ChipInput placeholder="Placeholder" icon="PeopleOutline" />);
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeVisible();
		expect(screen.getByRole('textbox')).not.toHaveFocus();
		userEvent.click(screen.getByTestId('icon: PeopleOutline'));
		expect(screen.getByRole('textbox')).toHaveFocus();
	});

	test('options are not shown by default if dropdown is enabled on click', () => {
		const options = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		render(<ChipInput options={options} placeholder="Placeholder" disableOptions={false} />);
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
	});

	test('options are shown immediately if dropdown is disabled on click', () => {
		const options = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		render(<ChipInput options={options} placeholder="Placeholder" />);
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.queryByText('option 1')).toBeVisible();
		expect(screen.queryByText('option 2')).toBeVisible();
	});

	test('if options are provided and disableOptions is set to false, click on input open a dropdown with the options inside', () => {
		const options = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		render(<ChipInput options={options} disableOptions={false} placeholder="Placeholder" />);

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		userEvent.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
	});

	test('click on an option creates a chip and close dropdown', () => {
		const options = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		render(<ChipInput options={options} disableOptions={false} />);

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		userEvent.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		userEvent.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
	});

	test('if chip input should accept only uniq values, a duplicate text is not transformed in chip', () => {
		render(<ChipInput requireUniqueChips />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		// create first chip
		userEvent.type(inputElement, 'chip{space}');
		expect(screen.getByText('chip')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		// create second chip with different label
		userEvent.type(inputElement, 'other-chip{space}');
		expect(screen.getByText('other-chip')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(2);
		// try to create third chip with same label of first one
		userEvent.type(inputElement, 'chip{space}');
		// chip is not created, only the first one is visible, but input is cleared
		expect(screen.getByText('chip')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(2);
		expect(inputElement).toHaveValue('');
		expect(inputElement).toHaveFocus();
	});

	test('onAdd is called with string if text is typed in input', () => {
		const onAddFn = jest.fn().mockImplementation((value: string): ChipItem => ({ label: value }));

		render(<ChipInput onAdd={onAddFn} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		userEvent.type(inputElement, 'sunflower{Enter}');
		expect(onAddFn).toHaveBeenCalled();
		expect(onAddFn).toHaveBeenCalledWith('sunflower');
		expect(screen.getByText('sunflower')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
	});

	test('onAdd is called with option value if option has a value', () => {
		const onAddFn = jest.fn().mockImplementation((value: Option['value']): ChipItem => value);

		type Option = { id: string; label: string; value: { label: string } };
		const options: Array<Option> = [
			{ id: 'opt1', label: 'option 1', value: { label: 'chip 1' } },
			{ id: 'opt2', label: 'option 2', value: { label: 'chip 2' } }
		];
		render(<ChipInput onAdd={onAddFn} options={options} disableOptions={false} />);

		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		userEvent.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		expect(screen.queryByText('chip 1')).not.toBeInTheDocument();
		expect(screen.queryByText('chip 2')).not.toBeInTheDocument();
		userEvent.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(onAddFn).toHaveBeenCalled();
		expect(onAddFn).toHaveBeenCalledWith({ label: 'chip 1' });
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		expect(screen.getByText('chip 1')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
	});

	test('onAdd is called with option label if option does not have a value', () => {
		const onAddFn = jest.fn().mockImplementation((value: string): ChipItem => ({ label: value }));

		type Option = { id: string; label: string };
		const options: Array<Option> = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];
		render(<ChipInput onAdd={onAddFn} options={options} disableOptions={false} />);

		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		userEvent.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		expect(screen.queryByText('chip 1')).not.toBeInTheDocument();
		expect(screen.queryByText('chip 2')).not.toBeInTheDocument();
		userEvent.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(onAddFn).toHaveBeenCalled();
		expect(onAddFn).toHaveBeenCalledWith('option 1');
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
	});

	test('after a chip is added, onChange callback is called with the new item', () => {
		const onChangeFn = jest.fn();
		render(<ChipInput onChange={onChangeFn} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		userEvent.type(inputElement, 'hola{Enter}');
		expect(onChangeFn).toHaveBeenCalled();
		expect(onChangeFn).toHaveBeenCalledWith([{ label: 'hola' }]);
	});

	test('after a chip is removed, onChange callback is called without the item', () => {
		const chips = [{ label: 'hola' }, { label: 'hallo' }];
		const onChangeFn = jest.fn();
		render(<ChipInput onChange={onChangeFn} defaultValue={chips} />);
		expect(screen.getByText('hola')).toBeVisible();
		expect(screen.getByText('hallo')).toBeVisible();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(2);
		userEvent.click(screen.getAllByTestId('icon: Close')[0]);
		expect(onChangeFn).toHaveBeenCalled();
		expect(onChangeFn).toHaveBeenCalledWith([{ label: 'hallo' }]);
		expect(screen.queryByText('hola')).not.toBeInTheDocument();
		expect(screen.getByText('hallo')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
	});

	test('if max chip number is reached, input is disabled. If a chip is removed, then input is enabled again', () => {
		const chips = [{ label: 'こんにちは' }];
		render(<ChipInput maxChips={1} defaultValue={chips} />);
		expect(screen.getByText('こんにちは')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		expect(inputElement).toBeDisabled();
		userEvent.type(inputElement, 'olá');
		expect(screen.queryByText('olá')).not.toBeInTheDocument();
		expect(inputElement).not.toHaveValue('olá');
		expect(inputElement).not.toHaveFocus();
		userEvent.click(screen.getByTestId('icon: Close'));
		expect(screen.queryByText('こんにちは')).not.toBeInTheDocument();
		expect(screen.queryByTestId('icon: Close')).not.toBeInTheDocument();
		expect(inputElement).toBeEnabled();
		userEvent.type(inputElement, 'olá{space}');
		expect(screen.getByText('olá')).toBeVisible();
		expect(screen.getByTestId('icon: Close')).toBeVisible();
		expect(inputElement).toBeDisabled();
	});

	test('onInputType callback is called asynchronously and arg includes text content', async () => {
		const onInputTypeFn = jest.fn();
		render(<ChipInput onInputType={onInputTypeFn} />);
		userEvent.type(screen.getByRole('textbox'), 'hej');
		await waitFor(() => expect(onInputTypeFn).toHaveBeenCalled());
		expect(onInputTypeFn).toHaveBeenCalledWith(expect.objectContaining({ textContent: 'hej' }));
	});

	test('create chips on paste splitting text on wanted separators', () => {
		render(<ChipInput createChipOnPaste pasteSeparators={['x', 'z']} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// create chip with paste
		const dataTransferData: Record<string, string> = { Text: 'ciaoxhellozhola' };
		userEvent.paste(inputElement, 'ciaoxhellozhola', {
			clipboardData: {
				getData: jest.fn().mockImplementation((type: string) => dataTransferData[type])
			} as unknown as DataTransfer
		});
		// chip is created with text before space
		expect(screen.getByText('ciao')).toBeVisible();
		expect(screen.getByText('hello')).toBeVisible();
		expect(screen.getByText('hola')).toBeVisible();
		expect(screen.queryByText(/x/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/z/i)).not.toBeInTheDocument();
		expect(screen.getAllByTestId('icon: Close')).toHaveLength(3);
		expect(screen.queryByText('ciaoxhellozhola')).not.toBeInTheDocument();
	});

	test('if createChipOnPaste is set to false, paste event just paste text inside input', () => {
		render(<ChipInput createChipOnPaste={false} pasteSeparators={['x', 'z']} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toBeVisible();
		// paste text
		const dataTransferData: Record<string, string> = { Text: 'ciaoxhellozhola' };
		userEvent.paste(inputElement, 'ciaoxhellozhola', {
			clipboardData: {
				getData: jest.fn().mockImplementation((type: string) => dataTransferData[type])
			} as unknown as DataTransfer
		});
		// text is pastes as is
		expect(inputElement).toHaveValue('ciaoxhellozhola');
		// chips are not created
		expect(screen.queryByText('ciao')).not.toBeInTheDocument();
		expect(screen.queryByText('hello')).not.toBeInTheDocument();
		expect(screen.queryByText('hola')).not.toBeInTheDocument();
		expect(screen.queryByTestId('icon: Close')).not.toBeInTheDocument();
	});
});
