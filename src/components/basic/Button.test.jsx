/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { getNodeText, screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import faker from 'faker';
import { render } from '../../test-utils';
import Button from './Button';

describe('Button', () => {
	test('The label must be Upper Case', () => {
		const label = faker.lorem.words(1);
		render(<Button label={label} />);
		expect(getNodeText(screen.getByText(new RegExp(label, 'i')))).toBe(label.toUpperCase());
	});

	test('Click on its label', () => {
		const label = faker.lorem.words(1);
		const onClick = jest.fn();
		render(<Button label={label} onClick={onClick} />);
		act(() => {
			userEvent.click(screen.getByText(new RegExp(label, 'i')));
		});
		expect(onClick).toBeCalled();
	});

	test('Click on its label, button is disbled', () => {
		const label = faker.lorem.words(1);
		const onClick = jest.fn();
		render(<Button label={label} onClick={onClick} disabled />);
		act(() => {
			userEvent.click(screen.getByText(new RegExp(label, 'i')));
		});
		expect(onClick).not.toBeCalled();
	});

	test('Trigger the onClick with the keyboard', () => {
		const label = faker.lorem.words(1);
		const onClick = jest.fn();
		render(<Button label={label} onClick={onClick} />);
		act(() => {
			userEvent.type(screen.getByText(new RegExp(label, 'i')), '{enter}');
		});
		expect(onClick).toBeCalled();
	});

	test('Show an icon', () => {
		const label = faker.lorem.words(1);
		const { container } = render(<Button label={label} icon="BulbOutline" />);
		expect(getNodeText(screen.getByText(new RegExp(label, 'i')))).toBe(label.toUpperCase());
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Loading state', () => {
		const label = faker.lorem.words(1);
		render(<Button label={label} loading />);
		expect(getNodeText(screen.getByText(new RegExp(label, 'i')))).toBe(label.toUpperCase());
		expect(screen.getByTestId('spinner')).toBeInTheDocument();
	});
});
