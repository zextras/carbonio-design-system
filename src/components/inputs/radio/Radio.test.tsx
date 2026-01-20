/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { Radio } from './Radio';
import { setup } from '../../../tests/utils';
import { Text } from '../../basic/text/Text';

describe('Radio', () => {
	test('should render a radio input with a label', () => {
		const label = 'the label';
		setup(<Radio label={label} value={'value'} />);
		expect(screen.getByRole('radio', { name: label })).toBeVisible();
	});

	test('should set different ids on different radio inputs', () => {
		setup(
			<>
				<Radio label={'radio 1'} value={'radio1'} />
				<Radio label={'radio 2'} value={'radio2'} />
				<Radio label={'radio 3'} value={'radio3'} />
			</>
		);
		expect(screen.getByRole('radio', { name: 'radio 1' })).toHaveAttribute('id', 'Radio-1');
		expect(screen.getByRole('radio', { name: 'radio 2' })).toHaveAttribute('id', 'Radio-2');
		expect(screen.getByRole('radio', { name: 'radio 3' })).toHaveAttribute('id', 'Radio-3');
	});

	describe('Uncontrolled mode', () => {
		test('should not call onChange if the radio is already checked', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(
				<Radio label={'the label'} value={'value'} onChange={onChangeFn} defaultChecked />
			);
			const radio = screen.getByRole('radio');
			expect(onChangeFn).not.toHaveBeenCalled();
			await user.click(radio);
			expect(onChangeFn).not.toHaveBeenCalled();
		});

		test('should call onChange when clicking on radio input', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} value={'value'} onChange={onChangeFn} />);
			const radio = screen.getByRole('radio');
			await user.click(radio);
			expect(onChangeFn).toHaveBeenCalledTimes(1);
		});

		test('should not toggle the radio on click', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} value={'value'} onChange={onChangeFn} />);
			const radio = screen.getByRole('radio');
			await user.click(radio);
			expect(radio).toBeChecked();
			await user.click(radio);
			expect(radio).toBeChecked();
		});
	});

	describe('Controlled mode', () => {
		test('should not toggle the radio on click', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(
				<Radio label={'the label'} value={'value'} checked onChange={onChangeFn} />
			);
			const radio = screen.getByRole('radio');
			expect(radio).toBeChecked();
			await user.click(radio);
			expect(radio).toBeChecked();
			expect(onChangeFn).not.toHaveBeenCalled();
		});

		test('should update the radio checked status when checked prop change', () => {
			const { rerender } = setup(<Radio label={'the label'} value={'value'} checked />);
			const radio = screen.getByRole('radio');
			expect(radio).toBeChecked();
			rerender(<Radio label={'the label'} value={'value'} checked={false} />);
			expect(radio).not.toBeChecked();
		});
	});

	test('should check the radio when clicking on the default label', async () => {
		const onChangeFn = jest.fn();
		const { user } = setup(<Radio label={'the label'} value={'value'} onChange={onChangeFn} />);
		expect(screen.getByRole('radio')).not.toBeChecked();
		await user.click(screen.getByText('the label'));
		expect(screen.getByRole('radio')).toBeChecked();
		expect(onChangeFn).toHaveBeenCalledTimes(1);
	});

	test('should check the radio when clicking on a custom label', async () => {
		const onChangeFn = jest.fn();
		const labelOnClick = jest.fn();
		const { user } = setup(
			<Radio
				label={<Text onClick={labelOnClick}>the label</Text>}
				value={'value'}
				onChange={onChangeFn}
			/>
		);
		expect(screen.getByRole('radio')).not.toBeChecked();
		await user.click(screen.getByText('the label'));
		expect(labelOnClick).toHaveBeenCalled();
		expect(screen.getByRole('radio')).toBeChecked();
		expect(onChangeFn).toHaveBeenCalledTimes(1);
	});

	test('should not toggle the radio when clicking on a custom label which prevents default', async () => {
		const labelOnClick = jest.fn((event: React.MouseEvent) => {
			event.preventDefault();
		});
		const onChangeFn = jest.fn();
		const { user } = setup(
			<Radio
				label={<Text onClick={labelOnClick}>the label</Text>}
				value={'value'}
				onChange={onChangeFn}
			/>
		);
		expect(screen.getByRole('radio')).not.toBeChecked();
		await user.click(screen.getByText('the label'));
		expect(labelOnClick).toHaveBeenCalled();
		expect(screen.getByRole('radio')).not.toBeChecked();
		expect(onChangeFn).not.toHaveBeenCalled();
	});

	test('should get focus with tab', async () => {
		const { user } = setup(<Radio label={'the label'} value={'value'} />);
		const radio = screen.getByRole('radio');
		expect(radio).not.toHaveFocus();
		await user.tab();
		expect(radio).toHaveFocus();
	});

	test('should toggle radio when keyboard space is pressed', async () => {
		const onChangeFn = jest.fn();
		const { user } = setup(<Radio label={'the label'} value={'value'} onChange={onChangeFn} />);
		const radio = screen.getByRole('radio');
		expect(radio).not.toBeChecked();
		await user.tab();
		await user.keyboard('[Space]');
		expect(radio).toBeChecked();
		await user.keyboard('[Space]');
		expect(radio).toBeChecked();
		expect(onChangeFn).toHaveBeenCalledTimes(1);
	});
});
