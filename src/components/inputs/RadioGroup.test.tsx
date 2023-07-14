/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop } from 'lodash';

import { Radio } from './Radio';
import { RadioGroup, RadioGroupProps } from './RadioGroup';
import { render } from '../../test-utils';

describe('Radio Group', () => {
	test('Should render a group with the radio', () => {
		render(
			<RadioGroup>
				<Radio value={'r1'} label={`item 1`} />
				<Radio value={'r2'} label={`item 2`} />
				<Radio value={'r3'} label={`item 3`} />
			</RadioGroup>
		);
		expect(screen.getByRole('group')).toBeVisible();
		expect(screen.getAllByRole('radio')).toHaveLength(3);
	});

	test('should check the radio which match the defaultValue', () => {
		render(
			<RadioGroup defaultValue={'r2'}>
				<Radio value={'r1'} label={`item 1`} />
				<Radio value={'r2'} label={`item 2`} />
				<Radio value={'r3'} label={`item 3`} />
			</RadioGroup>
		);
		expect(screen.getByRole('radio', { name: 'item 1' })).not.toBeChecked();
		expect(screen.getByRole('radio', { name: 'item 2' })).toBeChecked();
		expect(screen.getByRole('radio', { name: 'item 3' })).not.toBeChecked();
	});

	test('should check the radio which match the value', () => {
		render(
			<RadioGroup defaultValue={'r2'} value={'r3'}>
				<Radio value={'r1'} label={`item 1`} />
				<Radio value={'r2'} label={`item 2`} />
				<Radio value={'r3'} label={`item 3`} />
			</RadioGroup>
		);
		expect(screen.getByRole('radio', { name: 'item 1' })).not.toBeChecked();
		expect(screen.getByRole('radio', { name: 'item 2' })).not.toBeChecked();
		expect(screen.getByRole('radio', { name: 'item 3' })).toBeChecked();
	});

	test('should call onClick of the radio component', () => {
		const onClick1Fn = jest.fn();
		const onClick2Fn = jest.fn();
		const onClick3Fn = jest.fn();
		render(
			<RadioGroup>
				<Radio value={'r1'} label={`item 1`} onClick={onClick1Fn} />
				<Radio value={'r2'} label={`item 2`} onClick={onClick2Fn} />
				<Radio value={'r3'} label={`item 3`} onClick={onClick3Fn} />
			</RadioGroup>
		);
		userEvent.click(screen.getByRole('radio', { name: 'item 2' }));
		expect(onClick1Fn).not.toHaveBeenCalled();
		expect(onClick2Fn).toHaveBeenCalled();
		expect(onClick3Fn).not.toHaveBeenCalled();
	});

	test('should set all radio as disabled when the group is disabled', () => {
		render(
			<RadioGroup defaultValue={'r2'} value={'r3'} disabled>
				<Radio value={'r1'} label={`item 1`} />
				<Radio value={'r2'} label={`item 2`} />
				<Radio value={'r3'} label={`item 3`} />
			</RadioGroup>
		);

		expect(screen.getByRole('group')).toBeDisabled();
		screen.getAllByRole('radio').forEach((radio) => {
			expect(radio).toBeDisabled();
		});
	});

	describe('Controlled mode', () => {
		test('should call onChange with the new value to set without updating the checked radio', () => {
			type RadioGroupOnChange = NonNullable<RadioGroupProps<`r${number}`>['onChange']>;
			const onChangeFn = jest.fn<ReturnType<RadioGroupOnChange>, Parameters<RadioGroupOnChange>>(
				(value) => noop(value)
			);
			render(
				<RadioGroup value={'r3'} onChange={onChangeFn}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
					<Radio value={undefined} label={`item 4`} />
				</RadioGroup>
			);
			userEvent.click(screen.getByRole('radio', { name: 'item 1' }));
			expect(onChangeFn).toHaveBeenCalledTimes(1);
			expect(onChangeFn).toHaveBeenCalledWith('r1');
			expect(screen.getByRole('radio', { name: 'item 1' })).not.toBeChecked();
			expect(screen.getByRole('radio', { name: 'item 3' })).toBeChecked();
			userEvent.click(screen.getByRole('radio', { name: 'item 4' }));
			expect(onChangeFn).toHaveBeenCalledTimes(2);
			expect(onChangeFn).toHaveBeenLastCalledWith(undefined);
			expect(screen.getByRole('radio', { name: 'item 4' })).not.toBeChecked();
			expect(screen.getByRole('radio', { name: 'item 3' })).toBeChecked();
		});

		test('should not call onChange if the new value to set is equal to the current one', () => {
			const onChangeFn = jest.fn();
			render(
				<RadioGroup value={'r3'} onChange={onChangeFn}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			userEvent.click(screen.getByRole('radio', { name: 'item 3' }));
			expect(onChangeFn).not.toHaveBeenCalled();
		});

		test('should update the checked radio when value change', () => {
			const { rerender } = render(
				<RadioGroup value={'r3'}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			rerender(
				<RadioGroup value={'r1'}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			expect(screen.getByRole('radio', { name: 'item 1' })).toBeChecked();
			expect(screen.getByRole('radio', { name: 'item 3' })).not.toBeChecked();
		});
	});

	describe('Uncontrolled mode', () => {
		test('should update the checked radio on click', () => {
			render(
				<RadioGroup defaultValue={'r3'}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			userEvent.click(screen.getByRole('radio', { name: 'item 1' }));
			expect(screen.getByRole('radio', { name: 'item 1' })).toBeChecked();
			expect(screen.getByRole('radio', { name: 'item 3' })).not.toBeChecked();
		});

		test('should not call onChange with the new value to set', () => {
			const onChangeFn = jest.fn();
			render(
				<RadioGroup defaultValue={'r3'} onChange={onChangeFn}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			userEvent.click(screen.getByRole('radio', { name: 'item 1' }));
			expect(onChangeFn).not.toHaveBeenCalled();
		});

		test('should not update the checked radio when defaultValue change', () => {
			const { rerender } = render(
				<RadioGroup defaultValue={'r3'}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			rerender(
				<RadioGroup defaultValue={'r1'}>
					<Radio value={'r1'} label={`item 1`} />
					<Radio value={'r2'} label={`item 2`} />
					<Radio value={'r3'} label={`item 3`} />
				</RadioGroup>
			);
			expect(screen.getByRole('radio', { name: 'item 1' })).not.toBeChecked();
			expect(screen.getByRole('radio', { name: 'item 3' })).toBeChecked();
		});
	});
});
