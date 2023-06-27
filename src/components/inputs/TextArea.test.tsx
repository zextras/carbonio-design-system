/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextArea } from './TextArea';
import { render } from '../../test-utils';
import { Theme } from '../../theme/theme';

describe('TextArea', () => {
	test('Render an empty text area', () => {
		render(<TextArea />);
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeVisible();
	});

	test('Render a text area with a label. Placeholder is set same as the label', () => {
		render(<TextArea label={'A label'} />);
		expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
		expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'A label');
		expect(screen.getByText('A label')).toBeVisible();
	});

	test('Render a text area with a label and a different hidden placeholder', () => {
		render(<TextArea label={'A label'} placeholder={'The placeholder'} />);
		// name is the accessible name -> the label associated to the element
		expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
		expect(screen.getByRole('textbox')).toHaveAttribute('placeholder', 'The placeholder');
		expect(screen.getByText('A label')).toBeVisible();
		expect(screen.queryByText('The placeholder')).not.toBeInTheDocument();
	});

	test('Render a text area with a description', () => {
		render(<TextArea label={'A label'} description={'Description for the textarea'} />);
		expect(screen.getByRole('textbox', { name: 'A label' })).toBeVisible();
		expect(screen.getByText('A label')).toBeVisible();
		expect(screen.getByText('Description for the textarea')).toBeVisible();
	});

	test('Click on the label sets focus on the textarea', async () => {
		render(<TextArea label={'A label'} description={'Description for the textarea'} />);
		userEvent.click(screen.getByText('A label'));
		expect(screen.getByRole('textbox')).toHaveFocus();
	});

	test('Click on the label does not set focus on the textarea if disabled', async () => {
		render(<TextArea label={'A label'} description={'Description for the textarea'} disabled />);
		userEvent.click(screen.getByText('A label'));
		expect(screen.getByRole('textbox')).not.toHaveFocus();
	});

	test('Render a text are with a default value', () => {
		const value = faker.lorem.lines();
		render(<TextArea defaultValue={value} />);
		expect(screen.getByRole('textbox')).toHaveValue(value);
	});

	test('onFocus is called when textarea get focus', async () => {
		const onFocus = jest.fn();
		render(<TextArea onFocus={onFocus} label={'The label'} description={'The description'} />);
		const label = screen.getByText('The label');
		userEvent.click(label);
		expect(onFocus).toHaveBeenCalledTimes(1);
	});

	test('onBlur is called when textarea lose focus', async () => {
		const onBlur = jest.fn();
		render(<TextArea onBlur={onBlur} label={'The label'} description={'The description'} />);
		const label = screen.getByText('The label');
		const description = screen.getByText('The description');
		userEvent.click(label);
		userEvent.click(description);
		expect(onBlur).toHaveBeenCalledTimes(1);
	});

	test('Blur event remove focus from text area and reset color for label and description', async () => {
		render(<TextArea label={'The label'} description={'The description'} />);
		const textArea = screen.getByRole('textbox');
		const label = screen.getByText('The label');
		const description = screen.getByText('The description');
		expect(label).toHaveStyle(`color: ${Theme.palette.secondary.regular}`);
		userEvent.click(textArea);
		expect(textArea).toHaveFocus();
		expect(label).toHaveStyle(`color: ${Theme.palette.primary.regular}`);
		userEvent.click(description);
		expect(textArea).not.toHaveFocus();
		expect(label).toHaveStyle(`color: ${Theme.palette.secondary.regular}`);
	});

	test('Multiple text areas take different ids', () => {
		render(
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
			render(<TextArea />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			userEvent.type(textArea, text);
			expect(textArea).toHaveValue(text);
		});

		test('User cannot type into a disabled textarea', async () => {
			render(<TextArea disabled />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			userEvent.type(textArea, text);
			expect(textArea).not.toHaveValue(text);
			expect(textArea).toHaveValue('');
		});
	});

	describe('Controlled mode', () => {
		test('Render a text are with a value', () => {
			const value = faker.lorem.lines();
			render(<TextArea value={value} />);
			expect(screen.getByRole('textbox')).toHaveValue(value);
		});

		test('User can type into the textarea, onChange is called and value is not updated automatically', async () => {
			const onChange = jest.fn();
			render(<TextArea value={''} onChange={onChange} />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			userEvent.type(textArea, text);
			expect(onChange).toHaveBeenCalled();
			expect(textArea).toHaveValue('');
		});

		test('User cannot type into a disabled textarea', async () => {
			const onChange = jest.fn();
			render(<TextArea value={''} onChange={onChange} disabled />);
			const text = faker.lorem.lines();
			const textArea = screen.getByRole('textbox');
			userEvent.type(textArea, text);
			expect(onChange).not.toHaveBeenCalled();
			expect(textArea).toHaveValue('');
		});

		test('Label change position when value is updated from outside', async () => {
			const onChange = jest.fn();
			const { rerender } = render(<TextArea value={''} label={'The label'} onChange={onChange} />);
			expect(screen.getByText('The label')).toHaveStyle({ 'inset-block-start': '50%' });
			rerender(
				<TextArea value={'value is changed from outside'} label={'The label'} onChange={onChange} />
			);
			expect(screen.getByText('The label')).toHaveStyle({ 'inset-block-start': '0.0625rem' });
		});
	});
});
