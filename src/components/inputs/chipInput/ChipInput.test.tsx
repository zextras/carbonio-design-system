/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { act, screen, waitFor } from '@testing-library/react';
import reduce from 'lodash/reduce';

import type { ChipInputProps, ChipItem } from './ChipInput';
import { ChipInput } from './ChipInput';
import type { KeyboardPresetKey } from '../../../hooks/useKeyboard';
import { ICONS, SELECTORS } from '../../../tests/constants';
import type { UserEvent } from '../../../tests/utils';
import { setup, within } from '../../../tests/utils';
import { TIMERS } from '../../constants';
import { Modal } from '../../feedback/modal/Modal';

describe('ChipInput', () => {
	test('render a chip input with a placeholder, two chips, an icon and a description', () => {
		const chips = [{ label: 'LabelChip 1' }, { label: 'LabelChip 2' }];
		setup(
			<ChipInput
				value={chips}
				icon="PeopleOutline"
				description="This is the optional description"
				placeholder="A placeholder for the input"
			/>
		);

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('LabelChip 1')).toBeVisible();
		expect(screen.getByText('LabelChip 2')).toBeVisible();
		expect(screen.getByText('This is the optional description')).toBeVisible();
		expect(screen.getByPlaceholderText('A placeholder for the input')).toBeVisible();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeVisible();
	});

	test('render a chip input without a placeholder', () => {
		const chips = [{ label: 'LabelChip 1' }, { label: 'LabelChip 2' }];
		setup(
			<ChipInput
				value={chips}
				icon="PeopleOutline"
				description="This is the optional description"
			/>
		);

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('LabelChip 1')).toBeVisible();
		expect(screen.getByText('LabelChip 2')).toBeVisible();
	});

	test('render a chip input without an icon', () => {
		const chips = [{ label: 'LabelChip 1' }, { label: 'LabelChip 2' }];
		setup(
			<ChipInput
				value={chips}
				description="This is the optional description"
				placeholder="A placeholder for the input"
			/>
		);
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('LabelChip 1')).toBeVisible();
		expect(screen.getByText('LabelChip 2')).toBeVisible();
	});

	test('render an empty chip input', () => {
		setup(<ChipInput />);
		expect(screen.getByRole('textbox')).toBeVisible();
	});

	describe('Separators', () => {
		test('space, enter and comma are default separators and create a chip when typed', async () => {
			const { user } = setup(<ChipInput />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toBeVisible();
			// create chip 1 with space
			await user.type(inputElement, 'ciao');
			expect(inputElement).toHaveValue('ciao');
			await act(async () => {
				await user.type(inputElement, '[Space]');
			});
			// input is cleared
			expect(inputElement).not.toHaveValue('ciao');
			// chip 1 is visible
			expect(screen.getByText('ciao')).toBeVisible();
			expect(screen.getByTestId(ICONS.close)).toBeVisible();
			// create chip 2 with enter
			await user.type(inputElement, 'hello');
			expect(inputElement).toHaveValue('hello');
			await act(async () => {
				await user.type(inputElement, '{Enter}');
			});
			// input is cleared
			expect(inputElement).not.toHaveValue('hello');
			// chip 1 is still visible
			expect(screen.getByText('ciao')).toBeVisible();
			// chip 2 is visible
			expect(screen.getByText('hello')).toBeVisible();
			expect(screen.getAllByTestId(ICONS.close)).toHaveLength(2);
			// create chip 3 with comma
			await user.type(inputElement, 'salut');
			expect(inputElement).toHaveValue('salut');
			// comma is not included in the default keyboard map https://testing-library.com/docs/user-event/options/#keyboardmap
			// so specify a custom map to assign the code
			await act(async () => {
				await user.keyboard(',');
			});
			// input is cleared
			expect(inputElement).not.toHaveValue('salut');
			// chip 1 is still visible
			expect(screen.getByText('ciao')).toBeVisible();
			// chip 2 is still visible
			expect(screen.getByText('hello')).toBeVisible();
			// chip 3 is visible
			expect(screen.getByText('salut')).toBeVisible();
			expect(screen.getAllByTestId(ICONS.close)).toHaveLength(3);
		});

		test('if custom separators are provided, enter, comma and space do not create a chip when typed, the custom keys do it', async () => {
			const separators = [{ key: 'x' }];
			const { user } = setup(<ChipInput separators={separators} />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toBeVisible();
			// space does not create a chip
			await user.type(inputElement, 'ciao');
			expect(inputElement).toHaveValue('ciao');
			await user.type(inputElement, '[Space]');
			expect(inputElement).toHaveValue('ciao ');
			await user.type(inputElement, 'hello');
			expect(inputElement).toHaveValue('ciao hello');
			// enter does not create a chip
			await user.type(inputElement, '{Enter}');
			await user.type(inputElement, 'There');
			expect(inputElement).toHaveValue('ciao helloThere');
			// create chip 1 with x
			await act(async () => {
				await user.type(inputElement, 'x');
			});
			// input is cleared
			expect(inputElement).toHaveValue('');
			// chip 1 is visible
			expect(screen.getByText('ciao helloThere')).toBeVisible();
			expect(screen.getByTestId(ICONS.close)).toBeVisible();
			// comma does not create chip
			await user.type(inputElement, 'salut');
			expect(inputElement).toHaveValue('salut');
			// comma is not included in the default keyboard map https://testing-library.com/docs/user-event/options/#keyboardmap
			// so specify a custom map to assign the code
			await user.keyboard(',');
			expect(inputElement).toHaveValue('salut,');
			await act(async () => {
				await user.type(inputElement, 'bonjourx');
			});
			// input is cleared
			expect(inputElement).not.toHaveValue('salut');
			// chip 1 is still visible
			expect(screen.getByText('ciao helloThere')).toBeVisible();
			// chip 2 is visible
			expect(screen.getByText('salut,bonjour')).toBeVisible();
			expect(screen.getAllByTestId(ICONS.close)).toHaveLength(2);
		});

		test('blur event creates a chip', async () => {
			const { user } = setup(<ChipInput />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toBeVisible();
			// create chip with blur
			await user.type(inputElement, 'ciao');
			expect(inputElement).toHaveValue('ciao');
			await user.tab();
			// input is cleared
			expect(inputElement).not.toHaveValue('ciao');
			// chip 1 is visible
			expect(screen.getByText('ciao')).toBeVisible();
			expect(screen.getByTestId(ICONS.close)).toBeVisible();
			expect(inputElement).not.toHaveFocus();
		});

		test('if space separator is provided, space create a chip', async () => {
			const { user } = setup(<ChipInput separators={[{ key: ' ' }]} />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toBeVisible();
			// create chip with space
			await act(async () => {
				await user.type(inputElement, 'ciao hello');
			});
			// input value is text after space
			expect(inputElement).toHaveValue('hello');
			// chip is created with text before space
			expect(screen.getByText('ciao')).toBeVisible();
			expect(screen.getByTestId(ICONS.close)).toBeVisible();
		});

		test('if blur separator is disabled, blur does not create a chip', async () => {
			const { user } = setup(<ChipInput confirmChipOnBlur={false} />);
			const inputElement = screen.getByRole('textbox');
			expect(inputElement).toBeVisible();
			// create chip with blur
			await user.type(inputElement, 'ciao');
			expect(inputElement).toHaveValue('ciao');
			await user.tab();
			// input keeps its value
			expect(inputElement).toHaveValue('ciao');
			expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
			expect(inputElement).not.toHaveFocus();
		});

		test.each<[string, NonNullable<ChipInputProps['separators']>]>([
			['empty array', []],
			['array with empty value', [{ key: '' }]]
		])('should not create chips if separators is an %s', async (_, separators) => {
			const { user } = setup(<ChipInput separators={separators} confirmChipOnBlur />);
			const inputElement = screen.getByRole('textbox');
			// write text with space
			await user.type(inputElement, 'hello world');
			expect(inputElement).toHaveValue('hello world');
			// no chip is visible
			expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
			// write text with comma
			await user.type(inputElement, ', ');
			await user.type(inputElement, 'ciao');
			expect(inputElement).toHaveValue('hello world, ciao');
			// no chip is visible
			expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
			// press enter
			await user.type(inputElement, '{Enter}');
			await user.type(inputElement, ' mondo');
			expect(inputElement).toHaveValue('hello world, ciao mondo');
			// no chip is visible
			expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
			await user.tab();
			// input is cleared
			expect(inputElement).not.toHaveValue('ciao');
			// chip is visible
			expect(screen.getByText('hello world, ciao mondo')).toBeVisible();
			expect(screen.getByTestId(ICONS.close)).toBeVisible();
		});

		describe('with modifiers', () => {
			describe.each<[string, Omit<KeyboardPresetKey, 'key' | 'code'>]>([
				['Shift', { shiftKey: true }],
				['Meta', { metaKey: true }],
				['Control', { ctrlKey: true }],
				['Alt', { altKey: true }]
			])('should create chip if separator specifies the modifier %s', (key, modifiers) => {
				test('and match both the event code and the modifier', async () => {
					const { user } = setup(<ChipInput separators={[{ code: 'KeyE', ...modifiers }]} />);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await act(async () => {
						await user.keyboard(`{${key}>}[KeyE]{/${key}}`);
					});
					expect(inputElement).toHaveValue('');
					expect(screen.getByText('ciao')).toBeVisible();
				});

				test('and match both the event key and the modifier', async () => {
					const { user } = setup(<ChipInput separators={[{ key: 'e', ...modifiers }]} />);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await act(async () => {
						await user.keyboard(`{${key}>}[KeyE]{/${key}}`);
					});
					expect(inputElement).toHaveValue('');
					expect(screen.getByText('ciao')).toBeVisible();
				});

				test('and match all the event key, the code and the modifier', async () => {
					const { user } = setup(
						<ChipInput separators={[{ key: 'e', code: 'KeyE', ...modifiers }]} />
					);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await act(async () => {
						await user.keyboard(`{${key}>}[KeyE]{/${key}}`);
					});
					expect(inputElement).toHaveValue('');
					expect(screen.getByText('ciao')).toBeVisible();
				});
			});

			describe.each<[string, Omit<KeyboardPresetKey, 'key' | 'code'>]>([
				['Shift', { shiftKey: true }],
				['Meta', { metaKey: true }],
				['Control', { ctrlKey: true }],
				['Alt', { altKey: true }]
			])('should not create chip if separator specifies the modifier %s', (key, modifiers) => {
				test('and match the event key but not the modifier', async () => {
					const { user } = setup(<ChipInput separators={[{ code: 'KeyE', ...modifiers }]} />);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await user.keyboard('[KeyE]');
					expect(inputElement).toHaveValue('ciaoe');
				});

				test('and match the event key but not the modifier', async () => {
					const { user } = setup(<ChipInput separators={[{ key: 'e', ...modifiers }]} />);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await user.keyboard('[KeyE]');
					expect(inputElement).toHaveValue('ciaoe');
				});

				test('and match the event key and the modifier, but not the code', async () => {
					const { user } = setup(
						<ChipInput separators={[{ key: 'e', code: 'wrongCode', ...modifiers }]} />
					);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await user.keyboard('[KeyE]');
					expect(inputElement).toHaveValue('ciaoe');
				});

				test('and match the event code and the modifier, but not the key', async () => {
					const { user } = setup(
						<ChipInput separators={[{ key: 'wrongKey', code: 'KeyE', ...modifiers }]} />
					);
					const inputElement = screen.getByRole<HTMLInputElement>('textbox');
					await user.type(inputElement, 'ciao');
					await user.keyboard('[KeyE]');
					expect(inputElement).toHaveValue('ciaoe');
				});
			});

			describe.each(['Shift', 'Meta', 'Control', 'Alt'])(
				'should create chip if separator does not specify the modifier %s',
				(key) => {
					test('and match the event code', async () => {
						const { user } = setup(<ChipInput separators={[{ code: 'KeyE' }]} />);
						const inputElement = screen.getByRole<HTMLInputElement>('textbox');
						await user.type(inputElement, 'ciao');
						await act(async () => {
							await user.keyboard(`{${key}>}[KeyE]{/${key}}`);
						});
						expect(inputElement).toHaveValue('');
						expect(screen.getByText('ciao')).toBeVisible();
					});

					test('and match the event key', async () => {
						const { user } = setup(<ChipInput separators={[{ key: 'e' }]} />);
						const inputElement = screen.getByRole<HTMLInputElement>('textbox');
						await user.type(inputElement, 'ciao');
						await act(async () => {
							await user.keyboard(`{${key}>}[KeyE]{/${key}}`);
						});
						expect(inputElement).toHaveValue('');
						expect(screen.getByText('ciao')).toBeVisible();
					});
				}
			);
		});
	});

	test('if chip input is disabled, user can not type inside input', async () => {
		const { user } = setup(<ChipInput disabled />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		// create chip with blur
		await user.type(inputElement, 'ciao');
		expect(inputElement).not.toHaveValue('ciao');
		expect(screen.queryByText('ciao')).not.toBeInTheDocument();
		expect(inputElement).not.toHaveFocus();
	});

	test('if chip input is disabled, icon action and chip action are still interactive', async () => {
		const chip = [{ label: 'chip' }];
		const changeFn = vi.fn();
		const iconActionFn = vi.fn();

		const { user } = setup(
			<ChipInput
				disabled
				value={chip}
				onChange={changeFn}
				icon="PeopleOutline"
				iconAction={iconActionFn}
			/>
		);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		expect(screen.getByText('chip')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.close));
		expect(changeFn).toHaveBeenCalled();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeVisible();
		await user.click(screen.getByTestId('icon: PeopleOutline'));
		expect(iconActionFn).toHaveBeenCalled();
	});

	test('if chip input icon is disabled, icon action is not triggered', async () => {
		const changeFn = vi.fn();
		const iconActionFn = vi.fn();

		const { user } = setup(
			<ChipInput
				disabled
				onChange={changeFn}
				icon="PeopleOutline"
				iconAction={iconActionFn}
				iconDisabled
			/>
		);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		expect(screen.getByRole('button')).toBeVisible();
		expect(screen.getByRole('button')).toBeDisabled();
		await user.click(screen.getByTestId('icon: PeopleOutline'));
		expect(iconActionFn).not.toHaveBeenCalled();
	});

	test('click on chip input set focus on input', async () => {
		const { user } = setup(<ChipInput placeholder="Placeholder" icon="PeopleOutline" />);
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.getByTestId('icon: PeopleOutline')).toBeVisible();
		expect(screen.getByRole('textbox')).not.toHaveFocus();
		await user.click(screen.getByTestId('icon: PeopleOutline'));
		expect(screen.getByRole('textbox')).toHaveFocus();
	});

	test('options are not shown by default if dropdown is enabled on click', () => {
		const options = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		setup(<ChipInput options={options} placeholder="Placeholder" disableOptions={false} />);
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

		setup(<ChipInput options={options} placeholder="Placeholder" />);
		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.queryByText('option 1')).toBeVisible();
		expect(screen.queryByText('option 2')).toBeVisible();
	});

	test('if options are provided and disableOptions is set to false, click on input open a dropdown with the options inside', async () => {
		const options = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		const { user } = setup(
			<ChipInput options={options} disableOptions={false} placeholder="Placeholder" />
		);

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByText('Placeholder')).toBeVisible();
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		await user.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
	});

	test('click on an option without a custom click callback creates a chip, close dropdown and clear the input', async () => {
		const options: NonNullable<ChipInputProps<never>['options']> = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];

		const { user } = setup(<ChipInput options={options} disableOptions={false} />);

		const chipInputInput = screen.getByRole('textbox');
		expect(chipInputInput).toBeVisible();
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		await user.type(chipInputInput, 'opt');
		expect(chipInputInput).toHaveValue('opt');
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		await user.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		expect(chipInputInput).toHaveValue('');
	});

	test('click on an option with a custom click callback creates a chip, close dropdown and clear the input', async () => {
		const options: NonNullable<ChipInputProps<never>['options']> = [
			{ id: 'opt1', label: 'option 1', onClick: vi.fn() },
			{ id: 'opt2', label: 'option 2', onClick: vi.fn() }
		];

		const { user } = setup(<ChipInput options={options} disableOptions={false} />);

		const chipInputInput = screen.getByRole('textbox');
		expect(chipInputInput).toBeVisible();
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		await user.type(chipInputInput, 'opt');
		expect(chipInputInput).toHaveValue('opt');
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		await user.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		expect(chipInputInput).toHaveValue('');
	});

	test('if chip input should accept only uniq values, a duplicate text is not transformed in chip', async () => {
		const { user } = setup(<ChipInput requireUniqueChips />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		// create first chip
		await act(async () => {
			await user.type(inputElement, 'chip[Space]');
		});
		expect(screen.getByText('chip')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		// create second chip with different label
		await act(async () => {
			await user.type(inputElement, 'other-chip[Space]');
		});
		expect(screen.getByText('other-chip')).toBeVisible();
		expect(screen.getAllByTestId(ICONS.close)).toHaveLength(2);
		// try to create third chip with same label of first one
		await act(async () => {
			await user.type(inputElement, 'chip[Space]');
		});
		// chip is not created, only the first one is visible, but input is cleared
		expect(screen.getByText('chip')).toBeVisible();
		expect(screen.getAllByTestId(ICONS.close)).toHaveLength(2);
		expect(inputElement).toHaveValue('');
		expect(inputElement).toHaveFocus();
	});

	test('onAdd is called with string if text is typed in input', async () => {
		const onAddFn = vi.fn().mockImplementation((value: string): ChipItem => ({ label: value }));

		const { user } = setup(<ChipInput onAdd={onAddFn} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		await act(async () => {
			await user.type(inputElement, 'sunflower{Enter}');
		});
		expect(onAddFn).toHaveBeenCalled();
		expect(onAddFn).toHaveBeenCalledWith('sunflower');
		expect(screen.getByText('sunflower')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
	});

	test('onAdd is called with option value if option has a value', async () => {
		const onAddFn = vi.fn().mockImplementation((value: Option['value']): ChipItem => value);

		type Option = { id: string; label: string; value: { label: string } };
		const options: Array<Option> = [
			{ id: 'opt1', label: 'option 1', value: { label: 'chip 1' } },
			{ id: 'opt2', label: 'option 2', value: { label: 'chip 2' } }
		];
		const { user } = setup(<ChipInput onAdd={onAddFn} options={options} disableOptions={false} />);

		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		await user.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		expect(screen.queryByText('chip 1')).not.toBeInTheDocument();
		expect(screen.queryByText('chip 2')).not.toBeInTheDocument();
		await user.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(onAddFn).toHaveBeenCalled();
		expect(onAddFn).toHaveBeenCalledWith({ label: 'chip 1' });
		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		expect(screen.getByText('chip 1')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
	});

	test('onAdd is called with option label if option does not have a value', async () => {
		const onAddFn = vi.fn().mockImplementation((value: string): ChipItem => ({ label: value }));

		type Option = { id: string; label: string };
		const options: Array<Option> = [
			{ id: 'opt1', label: 'option 1' },
			{ id: 'opt2', label: 'option 2' }
		];
		const { user } = setup(<ChipInput onAdd={onAddFn} options={options} disableOptions={false} />);

		expect(screen.queryByText('option 1')).not.toBeInTheDocument();
		await user.click(screen.getByRole('textbox'));
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByText('option 2')).toBeVisible();
		expect(screen.queryByText('chip 1')).not.toBeInTheDocument();
		expect(screen.queryByText('chip 2')).not.toBeInTheDocument();
		await user.click(screen.getByText('option 1'));
		expect(screen.queryByText('option 2')).not.toBeInTheDocument();
		expect(onAddFn).toHaveBeenCalled();
		expect(onAddFn).toHaveBeenCalledWith('option 1');
		expect(screen.getByText('option 1')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
	});

	test('after a chip is added, onChange callback is called with the new item', async () => {
		const onChangeFn = vi.fn();
		const { user } = setup(<ChipInput onChange={onChangeFn} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		await act(async () => {
			await user.type(inputElement, 'hola{Enter}');
		});
		expect(onChangeFn).toHaveBeenCalled();
		expect(onChangeFn).toHaveBeenCalledWith([{ label: 'hola' }]);
	});

	test('after a chip is removed, onChange callback is called without the item', async () => {
		const chips = [{ label: 'hola' }, { label: 'hallo' }];
		const onChangeFn = vi.fn();
		const { user } = setup(<ChipInput onChange={onChangeFn} defaultValue={chips} />);
		expect(screen.getByText('hola')).toBeVisible();
		expect(screen.getByText('hallo')).toBeVisible();
		expect(screen.getAllByTestId(ICONS.close)).toHaveLength(2);
		await user.click(screen.getAllByTestId(ICONS.close)[0]);
		expect(onChangeFn).toHaveBeenCalled();
		expect(onChangeFn).toHaveBeenCalledWith([{ label: 'hallo' }]);
		expect(screen.queryByText('hola')).not.toBeInTheDocument();
		expect(screen.getByText('hallo')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
	});

	test('if max chip number is reached, input is disabled. If a chip is removed, then input is enabled again', async () => {
		const chips = [{ label: 'こんにちは' }];
		const { user } = setup(<ChipInput maxChips={1} defaultValue={chips} />);
		expect(screen.getByText('こんにちは')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		expect(inputElement).toBeDisabled();
		await user.type(inputElement, 'olá');
		expect(screen.queryByText('olá')).not.toBeInTheDocument();
		expect(inputElement).not.toHaveValue('olá');
		expect(inputElement).not.toHaveFocus();
		await user.click(screen.getByTestId(ICONS.close));
		expect(screen.queryByText('こんにちは')).not.toBeInTheDocument();
		expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
		expect(inputElement).toBeEnabled();
		await act(async () => {
			await user.type(inputElement, 'olá[Space]');
		});
		expect(screen.getByText('olá')).toBeVisible();
		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		expect(inputElement).toBeDisabled();
	});

	test('if max chip number is reached, using dropdown options, input is disabled and label and placeholder are secondary colored. Then when input is reset label and placeholder remain colored of secondary and not of primary - CDS-115', async () => {
		const ControlledChipInput = ({
			forceReset = false
		}: {
			forceReset?: boolean;
		}): React.JSX.Element => {
			const [value, setValue] = useState<Array<ChipItem>>([]);
			useEffect(() => {
				if (forceReset) {
					setValue([]);
				}
			}, [forceReset]);
			const [filterValue, setFilterValue] = useState<string | null>(null);

			const itemTypeOnType = useCallback<NonNullable<ChipInputProps['onInputType']>>((ev) => {
				if (ev.key.length === 1 || ev.key === 'Delete' || ev.key === 'Backspace') {
					setFilterValue(ev.textContent);
				}
			}, []);

			const itemTypeOnChange = useCallback<NonNullable<ChipInputProps['onChange']>>(
				(newItemType) => {
					setFilterValue(null);
					setValue(newItemType);
				},
				[]
			);

			const dropdownItems = useMemo(() => {
				if (value.length > 0) {
					return [];
				}
				return reduce<
					{ id: string; label: string; icon: string; value: string; avatarIcon: string },
					NonNullable<ChipInputProps['options']>
				>(
					[
						{
							label: 'Folder',
							id: 'Folder',
							icon: 'FolderOutline',
							value: 'Folder',
							avatarIcon: 'Folder'
						},
						{
							label: 'Document',
							id: 'Document',
							icon: 'FileTextOutline',
							value: 'Text',
							avatarIcon: 'FileText'
						},
						{
							label: 'Spreadsheet',
							id: 'Spreadsheet',
							icon: 'FileCalcOutline',
							value: 'Spreadsheet',
							avatarIcon: 'FileCalc'
						}
					],
					(accumulator, item) => {
						if (
							filterValue === null ||
							item.label.toLowerCase().includes(filterValue.toLowerCase())
						) {
							accumulator.push({
								icon: item.icon,
								label: item.label,
								id: `$${item.id}`,
								value: { ...item }
							});
						}
						return accumulator;
					},
					[]
				);
			}, [value.length, filterValue]);

			return (
				<>
					<ChipInput
						placeholder={'placeholder value'}
						background="gray5"
						confirmChipOnBlur={false}
						value={value}
						separators={[]}
						disableOptions={false}
						maxChips={1}
						onChange={itemTypeOnChange}
						onInputType={itemTypeOnType}
						options={dropdownItems}
						icon={'ChevronDown'}
						singleSelection
						requireUniqueChips
						description={'description value'}
					/>
				</>
			);
		};

		const { rerender, user } = setup(<ControlledChipInput />);

		await user.click(screen.getByTestId(ICONS.accordionItemOpenAction));

		const folderOption = screen.getByText('Folder');
		expect(folderOption).toBeVisible();
		await user.click(folderOption);

		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		expect(inputElement).toBeDisabled();

		expect(screen.getByTestId(ICONS.close)).toBeVisible();
		const chipFolderIcon = screen.getByTestId('icon: Folder');
		expect(chipFolderIcon).toBeVisible();

		let placeholderLabel = screen.getByText('placeholder value');
		expect(placeholderLabel).toHaveStyle('color: #828282');
		let bottomDescription = screen.getByText('description value');
		expect(bottomDescription).toHaveStyle(`color: #828282`);

		// simulate reset with a forceReset because in tests onBlur event is triggered also when input is disabled
		// FF and Chrome do not trigger onBlur event
		rerender(<ControlledChipInput forceReset />);

		expect(chipFolderIcon).not.toBeInTheDocument();
		expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();

		placeholderLabel = screen.getByText('placeholder value');
		bottomDescription = screen.getByText('description value');
		expect(bottomDescription).toHaveStyle(`color: #828282`);
		expect(placeholderLabel).toHaveStyle('color: #828282');
	});

	test('onInputType callback is called asynchronously and arg includes text content', async () => {
		const onInputTypeFn = vi.fn();
		const { user } = setup(<ChipInput onInputType={onInputTypeFn} />);
		await user.type(screen.getByRole('textbox'), 'hej');
		await waitFor(() => expect(onInputTypeFn).toHaveBeenCalled());
		expect(onInputTypeFn).toHaveBeenCalledWith(expect.objectContaining({ textContent: 'hej' }));
	});

	test('a new onInputType given while the typing is debounced is called, so the text typed is not lost', async () => {
		const firstOnInputType = vi.fn();
		const newOnInputType = vi.fn();
		// a debounce long enough to give the new callback before it ends
		const { rerender, user } = setup(
			<ChipInput onInputType={firstOnInputType} onInputTypeDebounce={60000} />
		);
		await user.type(screen.getByRole('textbox'), 'hej');
		rerender(<ChipInput onInputType={newOnInputType} onInputTypeDebounce={60000} />);
		act(() => {
			vi.advanceTimersByTime(60000);
		});
		expect(newOnInputType).toHaveBeenCalledTimes(1);
		expect(newOnInputType).toHaveBeenCalledWith(expect.objectContaining({ textContent: 'hej' }));
		expect(firstOnInputType).not.toHaveBeenCalled();
	});

	test('create chips on paste splitting text on wanted separators', async () => {
		const { user } = setup(<ChipInput createChipOnPaste pasteSeparators={['x', 'z']} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		// create chip with paste
		const dataTransferData: Record<string, string> = {
			Text: 'ciaoxhellozhola',
			text: 'ciaoxhellozhola'
		};
		await user.click(inputElement);
		await user.paste({
			getData: vi.fn().mockImplementation((type: string) => dataTransferData[type])
		} as unknown as DataTransfer);
		// chip is created with text before space
		expect(screen.getByText('ciao')).toBeVisible();
		expect(screen.getByText('hello')).toBeVisible();
		expect(screen.getByText('hola')).toBeVisible();
		expect(screen.queryByText(/x/i)).not.toBeInTheDocument();
		expect(screen.queryByText(/z/i)).not.toBeInTheDocument();
		expect(screen.getAllByTestId(ICONS.close)).toHaveLength(3);
		expect(screen.queryByText('ciaoxhellozhola')).not.toBeInTheDocument();
	});

	test('if createChipOnPaste is set to false, paste event just paste text inside input', async () => {
		const { user } = setup(<ChipInput createChipOnPaste={false} pasteSeparators={['x', 'z']} />);
		const inputElement = screen.getByRole('textbox');
		expect(inputElement).toBeVisible();
		// paste text
		const dataTransferData: Record<string, string> = {
			Text: 'ciaoxhellozhola',
			text: 'ciaoxhellozhola'
		};
		await user.click(inputElement);
		await user.paste({
			getData: vi.fn().mockImplementation((type: string) => dataTransferData[type])
		} as unknown as DataTransfer);
		// text is pastes as is
		expect(inputElement).toHaveValue('ciaoxhellozhola');
		// chips are not created
		expect(screen.queryByText('ciao')).not.toBeInTheDocument();
		expect(screen.queryByText('hello')).not.toBeInTheDocument();
		expect(screen.queryByText('hola')).not.toBeInTheDocument();
		expect(screen.queryByTestId(ICONS.close)).not.toBeInTheDocument();
	});

	test('by default there is no limit to the maximum number of chips', async () => {
		const onChange = vi.fn();

		// Start with 19 existing chips
		const existingChips = Array.from({ length: 19 }, (_, i) => ({ label: `chip${i}` }));
		const { user } = setup(<ChipInput onChange={onChange} defaultValue={existingChips} />);
		const inputElement = screen.getByRole('textbox');

		// Add 2 more chips to reach 21 total
		await user.type(inputElement, 'chip19 chip20 ');

		const expectedChips = [...existingChips, { label: 'chip19' }, { label: 'chip20' }];
		expect(onChange).toHaveBeenLastCalledWith(expectedChips);
		expect(inputElement).not.toBeDisabled();
		expect(screen.getAllByText(/chip/)).toHaveLength(21);
	}, 10000);

	describe('onOptionsDisplayChange', () => {
		it('should not call onOptionsDisplayChange when options prop is empty', async () => {
			const onOptionsDisplayChangeFn = vi.fn();
			const { user } = setup(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					disableOptions={false}
					options={[]}
				/>
			);
			expect(onOptionsDisplayChangeFn).not.toHaveBeenCalled();
			await user.click(screen.getByRole('textbox'));
			expect(onOptionsDisplayChangeFn).not.toHaveBeenCalled();
		});

		it('should call onOptionsDisplayChange when options prop is valued (options are shown)', () => {
			const onOptionsDisplayChangeFn = vi.fn();
			setup(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					disableOptions
					options={[
						{
							id: '0',
							label: 'Helen'
						}
					]}
				/>
			);
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(1);
			expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(true);
		});

		it('should call onOptionsDisplayChange when the user clicks on the input element (disableOptions is false)', async () => {
			const onOptionsDisplayChangeFn = vi.fn();
			const { user } = setup(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					options={[
						{
							id: '0',
							label: 'Helen'
						}
					]}
					disableOptions={false}
				/>
			);
			const inputElement = screen.getByRole('textbox');
			await user.click(inputElement);
			await waitFor(() => expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(1));
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledWith(true);
			await user.click(inputElement);
			await waitFor(() => expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(2));
			expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(false);
		});

		it('should call onOptionsDisplayChange with false value when the user closes the dropdown by choosing an option', async () => {
			const onOptionsDisplayChangeFn = vi.fn();
			const { user } = setup(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					options={[
						{
							id: '0',
							label: 'Helen'
						}
					]}
					disableOptions={false}
				/>
			);
			const inputElement = screen.getByRole('textbox');
			await user.click(inputElement);
			await waitFor(() => expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(1));
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledWith(true);
			await user.click(screen.getByText('Helen'));
			await waitFor(() => expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(2));
			expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(false);
		});

		it('should call onOptionsDisplayChange when options change if disableOptions is true', async () => {
			const onOptionsDisplayChangeFn = vi.fn();
			const { rerender } = setup(
				<ChipInput onOptionsDisplayChange={onOptionsDisplayChangeFn} disableOptions options={[]} />
			);
			expect(onOptionsDisplayChangeFn).not.toHaveBeenCalled();
			rerender(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					disableOptions
					options={[{ id: '1', label: 'Option 1' }]}
				/>
			);
			await screen.findByText('Option 1');
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(1);
			expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(true);
			rerender(
				<ChipInput onOptionsDisplayChange={onOptionsDisplayChangeFn} disableOptions options={[]} />
			);
			await waitFor(() => expect(screen.queryByTestId(SELECTORS.dropdown)).not.toBeInTheDocument());
			expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(false);
		});

		it('should call onOptionsDisplayChange only when isVisible changes', async () => {
			const onOptionsDisplayChangeFn = vi.fn();
			const { rerender } = setup(
				<ChipInput onOptionsDisplayChange={onOptionsDisplayChangeFn} options={[]} />
			);
			expect(onOptionsDisplayChangeFn).not.toHaveBeenCalled();
			rerender(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					options={[{ id: '1', label: 'First option' }]}
				/>
			);
			await screen.findByText('First option');
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(1);
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledWith(true);
			rerender(
				<ChipInput
					onOptionsDisplayChange={onOptionsDisplayChangeFn}
					options={[
						{ id: '1', label: 'First option' },
						{ id: '2', label: 'Second option' }
					]}
				/>
			);
			await screen.findByText('Second option');
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(1);
			rerender(<ChipInput onOptionsDisplayChange={onOptionsDisplayChangeFn} options={[]} />);
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledTimes(2);
			expect(onOptionsDisplayChangeFn).toHaveBeenCalledWith(false);
		});
	});

	it('should call onOptionsDisplayChange with true value if options are valued and the number of chips created is equal to maxChips', async () => {
		const onOptionsDisplayChangeFn = vi.fn();
		const { user } = setup(
			<ChipInput
				onOptionsDisplayChange={onOptionsDisplayChangeFn}
				options={[{ id: '1', label: 'First option' }]}
				disableOptions={false}
				maxChips={1}
			/>
		);
		expect(onOptionsDisplayChangeFn).not.toHaveBeenCalled();
		await user.type(screen.getByRole('textbox'), 'test');
		await act(async () => {
			await user.keyboard('[Space]');
		});
		expect(screen.getByText('test')).toBeVisible();
		expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(true);
		// chips created is not greater than maxChips, so dropdown is closed
		await user.click(screen.getByTestId(ICONS.close));
		expect(onOptionsDisplayChangeFn).toHaveBeenLastCalledWith(false);
	});

	describe('Keyboard navigation of the options', () => {
		const options: NonNullable<ChipInputProps<string>['options']> = [
			{ id: 'opt1', label: 'Helen', value: 'helen@example.com' },
			{ id: 'opt2', label: 'Hector', value: 'hector@example.com' },
			{ id: 'opt3', label: 'Hannah', value: 'hannah@example.com' }
		];

		function getOption(label: string): HTMLElement {
			const option = screen
				.getAllByTestId(SELECTORS.dropdownItem)
				.find((item) => within(item).queryByText(label) !== null);
			if (option === undefined) {
				throw new Error(`option ${label} not found`);
			}
			return option;
		}

		// focus without a click: a click on the input closes the options shown in suggestion mode
		async function typeInInput(user: UserEvent, input: HTMLElement, text: string): Promise<void> {
			act(() => {
				input.focus();
			});
			await user.keyboard(text);
		}

		test('arrow down highlights the first option while the focus stays in the input', async () => {
			const { user } = setup(<ChipInput options={options} />);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'h');
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
			expect(getOption('Hector')).not.toHaveClass('zapp-active');
			expect(input).toHaveFocus();
		});

		test('arrow down and up move the highlight and wrap around at the ends', async () => {
			const { user } = setup(<ChipInput options={options} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.arrowDown();
			await user.arrowDown();
			expect(getOption('Hector')).toHaveClass('zapp-active');
			await user.arrowDown();
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
			await user.arrowUp();
			expect(getOption('Hannah')).toHaveClass('zapp-active');
		});

		test('disabled options, dividers and options with sub-items are skipped', async () => {
			const { user } = setup(
				<ChipInput
					options={[
						{ id: 'loading', label: 'Loading', disabled: true },
						{ id: 'opt1', label: 'Helen', value: 'helen@example.com' },
						{ id: 'divider', type: 'divider' },
						{ id: 'nested', label: 'Group', items: [{ id: 'sub', label: 'Sub' }] },
						{ id: 'opt2', label: 'Hector', value: 'hector@example.com' }
					]}
				/>
			);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
			await user.arrowDown();
			expect(getOption('Hector')).toHaveClass('zapp-active');
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
		});

		test('enter adds the highlighted option as a chip, as a click does, and keeps the focus in the input', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const onClick = vi.fn();
			const { user } = setup(
				<ChipInput options={[options[0], { ...options[1], onClick }, options[2]]} onAdd={onAdd} />
			);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'he');
			await user.arrowDown();
			await user.arrowDown();
			await user.enter();
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('hector@example.com');
			expect(onClick).toHaveBeenCalledTimes(1);
			expect(screen.getByText('chip of hector@example.com')).toBeVisible();
			expect(input).toHaveValue('');
			expect(input).toHaveFocus();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
		});

		test('enter without a highlighted option turns the typed text into a chip, as before', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(<ChipInput options={options} onAdd={onAdd} />);
			await typeInInput(user, screen.getByRole('textbox'), 'he');
			await user.enter();
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('he');
		});

		test('tab on a highlighted option does not add it and moves the focus to the next field', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput options={options} onAdd={onAdd} placeholder="To" />
					<input aria-label="next field" />
				</>
			);
			const input = screen.getByRole('textbox', { name: 'To' });
			await typeInInput(user, input, 'h');
			await user.arrowDown();
			await user.tab();
			expect(onAdd).not.toHaveBeenCalled();
			expect(input).toHaveValue('h');
			expect(screen.getByRole('textbox', { name: 'next field' })).toHaveFocus();
		});

		test('back in the field after a tab on a highlighted option, enter adds the typed text', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput options={options} onAdd={onAdd} placeholder="To" />
					<input aria-label="next field" />
				</>
			);
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			await user.arrowDown();
			await user.tab();
			await user.tab({ shift: true });
			await user.enter();
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('h');
		});

		test('tab without a highlighted option leaves the typed text in the input and adds no chip', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput options={options} onAdd={onAdd} placeholder="To" />
					<input aria-label="next field" />
				</>
			);
			const input = screen.getByRole('textbox', { name: 'To' });
			await typeInInput(user, input, 'he');
			await user.tab();
			expect(onAdd).not.toHaveBeenCalled();
			expect(input).toHaveValue('he');
			expect(screen.getByRole('textbox', { name: 'next field' })).toHaveFocus();
		});

		test('escape closes the options without adding a chip', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const onOptionsDisplayChange = vi.fn();
			const { user } = setup(
				<ChipInput
					options={options}
					onAdd={onAdd}
					onOptionsDisplayChange={onOptionsDisplayChange}
				/>
			);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'h');
			await user.arrowDown();
			await user.esc();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			expect(onOptionsDisplayChange).toHaveBeenLastCalledWith(false);
			expect(onAdd).not.toHaveBeenCalled();
			expect(input).toHaveValue('h');
			expect(input).toHaveFocus();
		});

		test('arrow down opens the options closed with escape and highlights the first one', async () => {
			const { user } = setup(<ChipInput options={options} />);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'h');
			await user.arrowDown();
			await user.esc();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
			expect(input).toHaveFocus();
		});

		test('arrow up opens the options closed with escape and highlights the last one, the closest to the input when the list opens above it', async () => {
			const { user } = setup(<ChipInput options={options} />);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'h');
			await user.esc();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			await user.arrowUp();
			expect(getOption('Hannah')).toHaveClass('zapp-active');
			expect(input).toHaveFocus();
		});

		test('arrows do not reopen the options closed by choosing one, which belong to the previous search', async () => {
			const { user } = setup(<ChipInput options={options} />);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'h');
			await user.click(screen.getByText('Helen'));
			expect(screen.queryByText('Hector')).not.toBeInTheDocument();
			await user.keyboard('x');
			await user.arrowDown();
			expect(screen.queryByText('Hector')).not.toBeInTheDocument();
			await user.arrowUp();
			expect(screen.queryByText('Hector')).not.toBeInTheDocument();
		});

		test('arrows do not reopen the options closed with escape once the typed text became a chip', async () => {
			const { user } = setup(<ChipInput options={options} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.esc();
			await user.enter();
			expect(screen.getByRole('textbox')).toHaveValue('');
			expect(screen.getByText('h')).toBeVisible();
			await user.arrowDown();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
		});

		test('enter on the typed text closes the options, which were suggestions for that text', async () => {
			const { user } = setup(<ChipInput options={options} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			expect(screen.getByText('Helen')).toBeVisible();
			await user.enter();
			expect(screen.getByText('h')).toBeVisible();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			await user.arrowDown();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
		});

		test('suggestions passed as the same array are shown again when typing after a chip is added', async () => {
			const { user } = setup(<ChipInput options={options} />);
			await typeInInput(user, screen.getByRole('textbox'), 'foo');
			await user.enter();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			await user.keyboard('h');
			expect(screen.getByText('Helen')).toBeVisible();
		});

		test('with onInputType, the suggestions hidden by a chip are shown again only after the debounced call', async () => {
			const onInputType = vi.fn();
			const { user } = setup(<ChipInput options={options} onInputType={onInputType} />);
			await typeInInput(user, screen.getByRole('textbox'), 'john');
			await user.enter();
			await act(async () => {
				await vi.advanceTimersByTimeAsync(500);
			});
			// the keyup of enter reaches onInputType too, with no text: the list stays hidden
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			await user.keyboard('m');
			// the options still belong to the previous text
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			await act(async () => {
				await vi.advanceTimersByTimeAsync(500);
			});
			expect(onInputType).toHaveBeenLastCalledWith(expect.objectContaining({ textContent: 'm' }));
			expect(screen.getByText('Helen')).toBeVisible();
		});

		test('enter adds the typed text after the list opened by a click was closed by disableOptions', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user, rerender } = setup(
				<ChipInput options={options} onAdd={onAdd} disableOptions={false} />
			);
			await user.click(screen.getByRole('textbox'));
			expect(screen.getByText('Helen')).toBeVisible();
			// the consumer switches to suggestion mode while the user types, as carbonio-search-ui does
			rerender(<ChipInput options={options} onAdd={onAdd} disableOptions />);
			await user.keyboard('foo{Enter}');
			rerender(<ChipInput options={options} onAdd={onAdd} disableOptions={false} />);
			await user.keyboard('bar');
			await user.arrowDown();
			await user.keyboard('{Enter}');
			expect(onAdd).toHaveBeenLastCalledWith('bar');
		});

		test('new options after a chip was created from the typed text are shown again', async () => {
			const { user, rerender } = setup(<ChipInput options={options} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.enter();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			rerender(<ChipInput options={[...options]} />);
			expect(await screen.findByText('Helen')).toBeVisible();
		});

		test('leaving the input while options are shown keeps the typed text in the input, as before', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput options={options} onAdd={onAdd} placeholder="To" />
					<input aria-label="next field" />
				</>
			);
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			await user.click(screen.getByRole('textbox', { name: 'next field' }));
			expect(onAdd).not.toHaveBeenCalled();
			expect(screen.getByRole('textbox', { name: 'To' })).toHaveValue('h');
		});

		test('with confirmChipOnBlurWithOptions, leaving the input turns the typed text into a chip also while options are shown', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput
						options={options}
						onAdd={onAdd}
						placeholder="To"
						confirmChipOnBlurWithOptions
					/>
					<input aria-label="next field" />
				</>
			);
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			expect(screen.getByText('Helen')).toBeVisible();
			await user.click(screen.getByRole('textbox', { name: 'next field' }));
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('h');
			expect(screen.getByText('chip of h')).toBeVisible();
			expect(screen.getByRole('textbox', { name: 'To' })).toHaveValue('');
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
		});

		test('with confirmChipOnBlurWithOptions, a click on an option adds only the option', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<ChipInput options={options} onAdd={onAdd} confirmChipOnBlurWithOptions />
			);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.click(screen.getByText('Hector'));
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('hector@example.com');
		});

		test('with confirmChipOnBlurWithOptions, tab on a highlighted option turns the typed text into a chip, not the option', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput
						options={options}
						onAdd={onAdd}
						placeholder="To"
						confirmChipOnBlurWithOptions
					/>
					<input aria-label="next field" />
				</>
			);
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			await user.arrowDown();
			await user.tab();
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('h');
			expect(screen.getByRole('textbox', { name: 'next field' })).toHaveFocus();
		});

		test('with confirmChipOnBlurWithOptions, tab without a highlighted option turns the typed text into a chip', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput
						options={options}
						onAdd={onAdd}
						placeholder="To"
						confirmChipOnBlurWithOptions
					/>
					<input aria-label="next field" />
				</>
			);
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			await user.tab();
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('h');
			expect(screen.getByRole('textbox', { name: 'next field' })).toHaveFocus();
		});

		test('with confirmChipOnBlurWithOptions, a click on an option that arrived after typing adds only the option', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user, rerender } = setup(
				<ChipInput options={[]} onAdd={onAdd} confirmChipOnBlurWithOptions />
			);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			// a disabled placeholder while the search runs, then its results
			rerender(
				<ChipInput
					options={[{ id: 'loading', label: 'Loading', disabled: true }]}
					onAdd={onAdd}
					confirmChipOnBlurWithOptions
				/>
			);
			await screen.findByText('Loading');
			rerender(<ChipInput options={options} onAdd={onAdd} confirmChipOnBlurWithOptions />);
			await user.click(await screen.findByText('Hector'));
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('hector@example.com');
		});

		test('with options opened by a click, enter on the typed text keeps the list open and navigable, as before', async () => {
			const { user } = setup(<ChipInput options={options} disableOptions={false} />);
			const input = screen.getByRole('textbox');
			await user.click(input);
			await user.keyboard('h');
			await user.enter();
			expect(screen.getByText('h')).toBeVisible();
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
		});

		test('with confirmChipOnBlurWithOptions, a press on the list keeps the focus and the typed text in the input', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<ChipInput options={options} onAdd={onAdd} confirmChipOnBlurWithOptions />
			);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'h');
			// e.g. the scrollbar of a long list
			await user.pointer({ keys: '[MouseLeft>]', target: screen.getByTestId(SELECTORS.dropdown) });
			expect(input).toHaveFocus();
			expect(onAdd).not.toHaveBeenCalled();
			expect(input).toHaveValue('h');
		});

		test('with confirmChipOnBlurWithOptions, the typed text becomes a chip when the field is left after a click on a disabled option', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput
						options={[{ id: 'loading', label: 'Loading', disabled: true }, ...options]}
						onAdd={onAdd}
						confirmChipOnBlurWithOptions
					/>
					<button type="button">Send</button>
				</>
			);
			await typeInInput(user, screen.getByRole('textbox'), 'hel');
			await user.click(screen.getByText('Loading'));
			await user.click(screen.getByRole('button', { name: 'Send' }));
			expect(onAdd).toHaveBeenCalledWith('hel');
		});

		test('with confirmChipOnBlurWithOptions, the typed text becomes a chip when the field is left after a press dragged off an option', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput options={options} onAdd={onAdd} confirmChipOnBlurWithOptions />
					<button type="button">Send</button>
				</>
			);
			await typeInInput(user, screen.getByRole('textbox'), 'hel');
			await user.pointer([
				{ keys: '[MouseLeft>]', target: screen.getByText('Helen') },
				{ target: document.body },
				{ keys: '[/MouseLeft]' }
			]);
			await user.click(screen.getByRole('button', { name: 'Send' }));
			expect(onAdd).toHaveBeenCalledWith('hel');
		});

		test('confirmChipOnBlurWithOptions does nothing when confirmChipOnBlur is off', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<>
					<ChipInput
						options={options}
						onAdd={onAdd}
						placeholder="To"
						confirmChipOnBlur={false}
						confirmChipOnBlurWithOptions
					/>
					<input aria-label="next field" />
				</>
			);
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			await user.click(screen.getByRole('textbox', { name: 'next field' }));
			expect(onAdd).not.toHaveBeenCalled();
		});

		test('enter adds only the highlighted option also when chips are already there', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user, rerender } = setup(<ChipInput options={options} onAdd={onAdd} />);
			const input = screen.getByRole('textbox');
			await typeInInput(user, input, 'first');
			await user.enter();
			expect(onAdd).toHaveBeenLastCalledWith('first');
			await user.keyboard('h');
			// the results of the search for the new text
			rerender(<ChipInput options={[...options]} onAdd={onAdd} />);
			await user.arrowDown();
			await user.arrowDown();
			await user.enter();
			expect(onAdd).toHaveBeenCalledTimes(2);
			expect(onAdd).toHaveBeenLastCalledWith('hector@example.com');
			expect(input).toHaveValue('');
		});

		test('a tab separator on a highlighted option adds the typed text, not the option', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(
				<ChipInput options={options} onAdd={onAdd} separators={[{ key: 'Tab' }]} />
			);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.arrowDown();
			await user.tab();
			expect(onAdd).toHaveBeenCalledTimes(1);
			expect(onAdd).toHaveBeenCalledWith('h');
		});

		test('escape inside a modal closes the options, not the modal', async () => {
			const onModalClose = vi.fn();
			const { user } = setup(
				<Modal open title="modal with a chip input" onClose={onModalClose}>
					<ChipInput options={options} placeholder="To" />
				</Modal>
			);
			act(() => {
				vi.advanceTimersByTime(TIMERS.MODAL.DELAY_OPEN);
			});
			await typeInInput(user, screen.getByRole('textbox', { name: 'To' }), 'h');
			await user.arrowDown();
			await user.esc();
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
			expect(onModalClose).not.toHaveBeenCalled();
			expect(screen.getByText('modal with a chip input')).toBeVisible();
		});

		test('typing after a highlight clears it, so enter adds the typed text', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(<ChipInput options={options} onAdd={onAdd} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
			await user.keyboard('a');
			expect(getOption('Helen')).not.toHaveClass('zapp-active');
			await user.enter();
			expect(onAdd).toHaveBeenCalledWith('ha');
		});

		test('new options reset the highlight', async () => {
			const { user, rerender } = setup(<ChipInput options={options} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await user.arrowDown();
			expect(getOption('Helen')).toHaveClass('zapp-active');
			rerender(<ChipInput options={[...options]} />);
			expect(getOption('Helen')).not.toHaveClass('zapp-active');
		});

		test('the options opened by a click are navigated and chosen with the keyboard too', async () => {
			const onAdd = vi.fn((value: unknown) => ({ label: `chip of ${String(value)}` }));
			const { user } = setup(<ChipInput options={options} onAdd={onAdd} disableOptions={false} />);
			await user.click(screen.getByRole('textbox'));
			await user.arrowDown();
			await user.arrowDown();
			expect(getOption('Hector')).toHaveClass('zapp-active');
			await user.enter();
			expect(onAdd).toHaveBeenCalledWith('hector@example.com');
			expect(screen.queryByText('Helen')).not.toBeInTheDocument();
		});

		test('navigation keys do not call onInputType, so they never start a search', async () => {
			const onInputType = vi.fn();
			const { user } = setup(<ChipInput options={options} onInputType={onInputType} />);
			await typeInInput(user, screen.getByRole('textbox'), 'h');
			await act(async () => {
				await vi.advanceTimersByTimeAsync(500);
			});
			expect(onInputType).toHaveBeenCalledTimes(1);
			await user.arrowDown();
			await act(async () => {
				await vi.advanceTimersByTimeAsync(500);
			});
			await user.arrowUp();
			await user.arrowLeft();
			await user.arrowRight();
			await user.keyboard(
				'[Home][End][PageUp][PageDown][ShiftLeft][ControlLeft][AltLeft][MetaLeft]'
			);
			await user.esc();
			await act(async () => {
				await vi.advanceTimersByTimeAsync(500);
			});
			expect(onInputType).toHaveBeenCalledTimes(1);
		});
	});
});
