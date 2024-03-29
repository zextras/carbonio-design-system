/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { fireEvent, screen, within } from '@testing-library/react';

import { Slider } from './Slider';
import { setup } from '../../test-utils';
import { TIMERS } from '../constants';

describe('Slider', () => {
	test('Render a slider with a datalist', async () => {
		const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
		setup(<Slider options={options} />);
		expect(screen.getByRole('slider')).toBeVisible();
		expect(screen.getByRole('listbox')).toBeVisible();
		expect(screen.getAllByRole('option')).toHaveLength(options.length);
	});

	test('option shows tooltip', async () => {
		const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
		const { user } = setup(<Slider options={options} />);
		const option1 = screen.getByRole('option', { name: 'opt1' });
		expect(option1).toBeVisible();
		jest.advanceTimersByTime(TIMERS.TOOLTIP.REGISTER_LISTENER);
		await user.hover(option1);
		const tooltip = await screen.findByTestId('tooltip');
		expect(within(tooltip).getByText(/opt1/)).toBeVisible();
	});

	test('Click on option does nothing if element is disabled', async () => {
		const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
		const { user } = setup(<Slider options={options} value={4} disabled />);
		expect(screen.getByRole('slider')).toHaveDisplayValue('4');
		await user.click(screen.getByRole('option', { name: 'opt1' }));
		expect(screen.getByRole('slider')).toHaveDisplayValue('4');
	});

	describe('Uncontrolled component', () => {
		test('Click on option change value of the slider', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const { user } = setup(<Slider options={options} value={0} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			await user.click(screen.getByRole('option', { name: 'opt5' }));
			expect(screen.getByRole('slider')).toHaveDisplayValue('4');
		});

		test('Change of the value from outside does not update the slider value', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const { rerender } = setup(<Slider options={options} value={0} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			rerender(<Slider options={options} value={4} />);
			expect(slider).toHaveDisplayValue('0');
		});

		test('Input event on slider change value of the slider', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			setup(<Slider options={options} value={0} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// eslint-disable-next-line testing-library/prefer-user-event
			fireEvent.input(slider, { target: { value: '4' } });
			expect(slider).toHaveDisplayValue('4');
		});

		test('Click event on slider change value of the slider', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			setup(<Slider options={options} value={0} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// eslint-disable-next-line testing-library/prefer-user-event
			fireEvent.click(slider, { target: { value: '4' } });
			expect(slider).toHaveDisplayValue('4');
		});

		test('Arrow left decrease value of the slider', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const { user } = setup(<Slider options={options} value={4} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('4');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowLeft}');
			expect(slider).toHaveDisplayValue('3');
			await user.keyboard('{ArrowLeft}');
			expect(slider).toHaveDisplayValue('2');
		});

		test('Arrow left does not decrease value if already at minimum', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const { user } = setup(<Slider options={options} value={0} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowLeft}');
			expect(slider).toHaveDisplayValue('0');
		});

		test('Arrow right increase value of the slider', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const { user } = setup(<Slider options={options} value={0} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowRight}');
			expect(slider).toHaveDisplayValue('1');
			await user.keyboard('{ArrowRight}');
			expect(slider).toHaveDisplayValue('2');
		});

		test('Arrow right does not increase value if already at maximum', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const { user } = setup(<Slider options={options} value={4} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('4');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowRight}');
			expect(slider).toHaveDisplayValue('4');
		});
	});

	describe('Controlled component', () => {
		test('Click on option calls onChange but does not change the value of the slider implicitly', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			const { user } = setup(<Slider options={options} value={0} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			await user.click(screen.getByRole('option', { name: 'opt5' }));
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 4);
			expect(screen.getByRole('slider')).toHaveDisplayValue('0');
		});

		test('Change of the value from outside update the slider value', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			const { rerender } = setup(<Slider options={options} value={0} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			rerender(<Slider options={options} value={4} onChange={onChangeFn} />);
			expect(slider).toHaveDisplayValue('4');
		});

		test('Input event on slider calls onChange with the new value', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			setup(<Slider options={options} value={0} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// eslint-disable-next-line testing-library/prefer-user-event
			fireEvent.input(slider, { target: { value: '4' } });
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 4);
		});

		test('Click event on slider calls onChange with the new value', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			setup(<Slider options={options} value={0} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// eslint-disable-next-line testing-library/prefer-user-event
			fireEvent.click(slider, { target: { value: '4' } });
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 4);
		});

		test('Arrow left calls onChange with the value given as prop decreased by 1', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			const { user } = setup(<Slider options={options} value={4} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('4');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowLeft}');
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 3);
			await user.keyboard('{ArrowLeft}');
			// value is not changed so the starting value to decrease is still the initial
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 3);
		});

		test('Arrow left does not calls onChange if already at minimum', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			const { user } = setup(<Slider options={options} value={0} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowLeft}');
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 0);
		});

		test('Arrow right calls onChange with the given valued increased by one', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			const { user } = setup(<Slider options={options} value={0} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('0');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowRight}');
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 1);
			await user.keyboard('{ArrowRight}');
			// value is not changed so the starting value to decrease is still the initial
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 1);
		});

		test('Arrow right does not call onChange if already at maximum', async () => {
			const options = ['opt1', 'opt2', 'opt3', 'opt4', 'opt5'];
			const onChangeFn = jest.fn();
			const { user } = setup(<Slider options={options} value={4} onChange={onChangeFn} />);
			const slider = screen.getByRole('slider');
			expect(slider).toHaveDisplayValue('4');
			// set focus
			await user.click(slider);
			await user.keyboard('{ArrowRight}');
			expect(onChangeFn).toHaveBeenCalledWith(expect.anything(), 4);
		});
	});
});
