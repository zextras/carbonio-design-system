/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test-utils';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
	test('Render a checkbox with a label', () => {
		const onChange = jest.fn();
		render(<Checkbox label="Checkbox label" />);
		expect(onChange).not.toHaveBeenCalled();
		expect(screen.getByText(/checkbox label/i)).toBeInTheDocument();
		expect(screen.getByTestId('icon: Square')).toBeInTheDocument();
	});

	test('Click on the checkbox', () => {
		const onChange = jest.fn();
		render(<Checkbox onChange={onChange} />);
		act(() => {
			userEvent.click(screen.getByTestId('icon: Square'));
		});
		expect(onChange).toHaveBeenCalled();
		expect(screen.getByTestId('icon: CheckmarkSquare')).toBeInTheDocument();
	});
});
