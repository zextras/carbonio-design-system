/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';

import { TextArea } from './TextArea';
import { setup } from '../../../test-utils';
import { Theme } from '../../../theme/theme';

describe('TextArea', () => {
	test('Render an empty text area', () => {
		setup(<TextArea />);
		expect(screen.getByRole('textbox')).toBeVisible();
	});

	test('Render a text area with a label. Placeholder is set same as the label', () => {
		setup(<TextArea label={'A label'} />);
		expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
		expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'A label');
		expect(screen.getByText('A label')).toBeVisible();
	});

	test('Render a text area with a label and a different hidden placeholder', () => {
		setup(<TextArea label={'A label'} placeholder={'The placeholder'} />);
		// name is the accessible name -> the label associated to the element
		expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
		expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'The placeholder');
		expect(screen.getByText('A label')).toBeVisible();
		expect(screen.queryByText('The placeholder')).not.toBeInTheDocument();
	});

	test('Render a text area with a description', () => {
		setup(<TextArea label={'A label'} description={'Description for the textarea'} />);
		expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
		expect(screen.getByText('A label')).toBeVisible();
		expect(screen.getByText('Description for the textarea')).toBeVisible();
	});

	test('Click on the label sets focus on the textarea', async () => {
		const { user } = setup(
			<TextArea label={'A label'} description={'Description for the textarea'} />
		);
		await user.click(screen.getByText('A label'));
		expect(screen.getByRole('textbox')).toHaveFocus();
	});

	test('Click on the label does not set focus on the textarea if disabled', async () => {
		const { user } = setup(
			<TextArea label={'A label'} description={'Description for the textarea'} disabled />
		);
		await user.click(screen.getByText('A label'));
		expect(screen.getByRole('textbox')).not.toHaveFocus();
	});

	test('Render a text are with a default value', () => {
		const value = faker.lorem.lines();
		setup(<TextArea defaultValue={value} />);
		expect(screen.getByRole('textbox')).toHaveValue(value);
	});

	test('onFocus is called when textarea get focus', async () => {
		const onFocus = jest.fn();
		const { user } = setup(
			<TextArea onFocus={onFocus} label={'The label'} description={'The description'} />
		);
		const label = screen.getByText('The label');
		await user.click(label);
		expect(onFocus).toHaveBeenCalledTimes(1);
	});

	test('onBlur is called when textarea lose focus', async () => {
		const onBlur = jest.fn();
		const { user } = setup(
			<TextArea onBlur={onBlur} label={'The label'} description={'The description'} />
		);
		const label = screen.getByText('The label');
		const description = screen.getByText('The description');
		await user.click(label);
		await user.click(description);
		expect(onBlur).toHaveBeenCalledTimes(1);
	});

	test('Blur event remove focus from text area and reset color for label and description', async () => {
		const { user } = setup(<TextArea label={'The label'} description={'The description'} />);
		const textArea = screen.getByRole('textbox');
		const label = screen.getByText('The label');
		const description = screen.getByText('The description');
		expect(label).toHaveStyle(`color: ${Theme.palette.secondary.regular}`);
		await user.click(textArea);
		expect(textArea).toHaveFocus();
		expect(label).toHaveStyle(`color: ${Theme.palette.primary.regular}`);
		await user.click(description);
		expect(textArea).not.toHaveFocus();
		expect(label).toHaveStyle(`color: ${Theme.palette.secondary.regular}`);
	});

	test('Multiple text areas take different ids', () => {
		setup(
			<>
				<TextArea />
				<TextArea />
				<TextArea />
			</>
		);
		const textAreas = screen.getAllByRole('textbox');
		expect(textAreas).toHaveLength(3);
		expect(textAreas[0].id).not.toEqual(textAreas[1].id);
		expect(textAreas[0].id).not.toEqual(textAreas[2].id);
		expect(textAreas[1].id).not.toEqual(textAreas[2].id);
	});

	describe('Uncontrolled mode', () => {
		test('User can type into the textarea', async () => {
			const { user } = setup(<TextArea />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			await user.type(textArea, text);
			expect(textArea).toHaveValue(text);
		});

		test('User cannot type into a disabled textarea', async () => {
			const { user } = setup(<TextArea disabled />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			await user.type(textArea, text);
			expect(textArea).not.toHaveValue(text);
			expect(textArea).toHaveValue('');
		});
	});

	describe('Controlled mode', () => {
		test('Render a text are with a value', () => {
			const value = faker.lorem.lines();
			setup(<TextArea value={value} />);
			expect(screen.getByRole('textbox')).toHaveValue(value);
		});

		test('User can type into the textarea, onChange is called and value is not updated automatically', async () => {
			const onChange = jest.fn();
			const { user } = setup(<TextArea value={''} onChange={onChange} />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			await user.type(textArea, text);
			expect(onChange).toHaveBeenCalled();
			expect(textArea).toHaveValue('');
		});

		test('User cannot type into a disabled textarea', async () => {
			const onChange = jest.fn();
			const { user } = setup(<TextArea value={''} onChange={onChange} disabled />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			await user.type(textArea, text);
			expect(onChange).not.toHaveBeenCalled();
			expect(textArea).toHaveValue('');
		});

		test('Label change position when value is updated from outside', async () => {
			const onChange = jest.fn();
			const { rerender } = setup(<TextArea value={''} label={'The label'} onChange={onChange} />);
			expect(screen.getByText('The label')).toHaveStyle({ top: '50%' });
			rerender(
				<TextArea value={'value is changed from outside'} label={'The label'} onChange={onChange} />
			);
			expect(screen.getByText('The label')).toHaveStyle({ top: '0.0625rem' });
		});

		test('data-replicated-value to set height is updated when value is updated from outside', async () => {
			const onChange = jest.fn();
			const content = faker.lorem.paragraphs();
			const { rerender } = setup(<TextArea value={''} label={'The label'} onChange={onChange} />);
			rerender(<TextArea value={content} label={'The label'} onChange={onChange} />);
			// ugly but real height is not testable
			// eslint-disable-next-line testing-library/no-node-access
			expect(screen.getByRole('textbox').parentElement).toHaveAttribute(
				'data-replicated-value',
				content
			);
		});
	});
});
