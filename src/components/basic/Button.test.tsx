/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { faker } from '@faker-js/faker';
import { render } from '../../test-utils';
import { Button } from './Button';

describe('Button', () => {
	test('The label must be Upper Case', () => {
		const label = faker.lorem.words(1);
		const clickFn = jest.fn();
		render(<Button label={label} onClick={clickFn} />);
		expect(screen.getByText(label)).toBeVisible();
		expect(screen.getByText(label)).toHaveStyle('text-transform: uppercase');
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

	test('Click on its label, button is disabled', () => {
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
		const clickFn = jest.fn();
		render(<Button label={label} icon="BulbOutline" onClick={clickFn} />);
		expect(screen.getByText(new RegExp(label, 'i'))).toBeVisible();
		expect(screen.getByTestId('icon: BulbOutline')).toBeInTheDocument();
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Loading state', () => {
		const label = faker.lorem.words(1);
		const clickFn = jest.fn();
		render(<Button label={label} loading onClick={clickFn} />);
		expect(screen.getByText(new RegExp(label, 'i'))).toBeInTheDocument();
		expect(screen.getByText(new RegExp(label, 'i'))).not.toBeVisible();
		expect(screen.getByTestId('spinner')).toBeInTheDocument();
		expect(screen.getByTestId('spinner')).toBeVisible();
	});
});
