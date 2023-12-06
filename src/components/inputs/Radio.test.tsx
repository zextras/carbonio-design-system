/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { Radio } from './Radio';
import { setup } from '../../test-utils';
import { Text } from '../basic/Text';

describe('Radio', () => {
	test('should render a radio input with a label', () => {
		const label = 'the label';
		setup(<Radio label={label} />);
		expect(screen.getByRole('radio', { name: label })).toBeVisible();
	});

	test('should set different ids on different radio inputs', () => {
		setup(
			<>
				<Radio label={'radio 1'} />
				<Radio label={'radio 2'} />
				<Radio label={'radio 3'} />
			</>
		);
		expect(screen.getByRole('radio', { name: 'radio 1' })).toHaveAttribute('id', 'Radio-1');
		expect(screen.getByRole('radio', { name: 'radio 2' })).toHaveAttribute('id', 'Radio-2');
		expect(screen.getByRole('radio', { name: 'radio 3' })).toHaveAttribute('id', 'Radio-3');
	});

	describe('Uncontrolled mode', () => {
		test('should call onChange with the new checked status', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} onChange={onChangeFn} defaultChecked />);
			const radio = screen.getByRole('radio');
			// onChange is called on render
			expect(onChangeFn).toHaveBeenCalledTimes(1);
			expect(onChangeFn).toHaveBeenCalledWith(true);
			await user.click(radio);
			expect(onChangeFn).toHaveBeenCalledTimes(2);
			expect(onChangeFn).toHaveBeenCalledWith(false);
		});

		test('should toggle the radio checked status on multiple clicks', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} onChange={onChangeFn} defaultChecked />);
			const radio = screen.getByRole('radio');
			expect(radio).toBeChecked();
			expect(onChangeFn).toHaveBeenLastCalledWith(true);
			await user.click(radio);
			expect(radio).not.toBeChecked();
			expect(onChangeFn).toHaveBeenLastCalledWith(false);
			await user.click(radio);
			expect(radio).toBeChecked();
			expect(onChangeFn).toHaveBeenLastCalledWith(true);
		});

		test('should call onClick when clicking on radio input', async () => {
			const onClickFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} onClick={onClickFn} />);
			const radio = screen.getByRole('radio');
			await user.click(radio);
			expect(onClickFn).toHaveBeenCalledTimes(1);
		});
	});

	describe('Controlled mode', () => {
		test('should call onChange with the new checked status when checked prop change', () => {
			const onChangeFn = jest.fn();
			const { rerender } = setup(<Radio label={'the label'} onChange={onChangeFn} checked />);
			// onChange is called on render
			expect(onChangeFn).toHaveBeenCalledTimes(1);
			expect(onChangeFn).toHaveBeenCalledWith(true);
			rerender(<Radio label={'the label'} onChange={onChangeFn} checked={false} />);
			expect(onChangeFn).toHaveBeenCalledTimes(2);
			expect(onChangeFn).toHaveBeenCalledWith(false);
		});

		test('should not toggle the radio on click', async () => {
			const onChangeFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} checked onChange={onChangeFn} />);
			const radio = screen.getByRole('radio');
			expect(radio).toBeChecked();
			// onChange is called on render
			expect(onChangeFn).toHaveBeenCalledTimes(1);
			await user.click(radio);
			expect(radio).toBeChecked();
			expect(onChangeFn).toHaveBeenCalledTimes(1);
		});

		test('should update the radio checked status when checked prop change', () => {
			const { rerender } = setup(<Radio label={'the label'} checked />);
			const radio = screen.getByRole('radio');
			expect(radio).toBeChecked();
			rerender(<Radio label={'the label'} checked={false} />);
			expect(radio).not.toBeChecked();
		});

		test('should call onClick when clicking on radio input', async () => {
			const onClickFn = jest.fn();
			const { user } = setup(<Radio label={'the label'} checked onClick={onClickFn} />);
			const radio = screen.getByRole('radio');
			await user.click(radio);
			expect(onClickFn).toHaveBeenCalledTimes(1);
		});
	});

	test('should toggle the radio when clicking on the default label', async () => {
		const onClickFn = jest.fn();
		const { user } = setup(<Radio label={'the label'} onClick={onClickFn} />);
		expect(screen.getByRole('radio')).not.toBeChecked();
		await user.click(screen.getByText('the label'));
		expect(screen.getByRole('radio')).toBeChecked();
		expect(onClickFn).toHaveBeenCalledTimes(1);
	});

	test('should toggle the radio when clicking on a custom label', async () => {
		const onClickFn = jest.fn();
		const labelOnClick = jest.fn();
		const { user } = setup(
			<Radio label={<Text onClick={labelOnClick}>the label</Text>} onClick={onClickFn} />
		);
		expect(screen.getByRole('radio')).not.toBeChecked();
		await user.click(screen.getByText('the label'));
		expect(labelOnClick).toHaveBeenCalled();
		expect(screen.getByRole('radio')).toBeChecked();
		expect(onClickFn).toHaveBeenCalledTimes(1);
	});

	test('should not toggle the radio when clicking on a custom label which prevents default', async () => {
		const labelOnClick = jest.fn((event: React.MouseEvent) => {
			event.preventDefault();
		});
		const onClickFn = jest.fn();
		const { user } = setup(
			<Radio label={<Text onClick={labelOnClick}>the label</Text>} onClick={onClickFn} />
		);
		expect(screen.getByRole('radio')).not.toBeChecked();
		await user.click(screen.getByText('the label'));
		expect(labelOnClick).toHaveBeenCalled();
		expect(screen.getByRole('radio')).not.toBeChecked();
		expect(onClickFn).not.toHaveBeenCalled();
	});

	test('should get focus with tab', async () => {
		const { user } = setup(<Radio label={'the label'} />);
		const radio = screen.getByRole('radio');
		expect(radio).not.toHaveFocus();
		await user.tab();
		expect(radio).toHaveFocus();
	});

	test('should toggle radio when keyboard space is pressed', async () => {
		const onClickFn = jest.fn();
		const { user } = setup(<Radio label={'the label'} onClick={onClickFn} />);
		const radio = screen.getByRole('radio');
		expect(radio).not.toBeChecked();
		await user.tab();
		await user.keyboard('[Space]');
		expect(radio).toBeChecked();
		await user.keyboard('[Space]');
		expect(radio).not.toBeChecked();
		expect(onClickFn).toHaveBeenCalledTimes(2);
	});
});
