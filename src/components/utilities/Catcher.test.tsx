/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { Catcher } from './Catcher';
import { setup } from '../../test-utils';

function ErrorComponent(): React.JSX.Element {
	throw new Error("Error from the test component, don't panic if You see this error.");
}

describe('Catcher', () => {
	test('Render a component', () => {
		const onError = jest.fn();
		setup(
			<Catcher onError={onError}>
				<div>CHILD ELEMENT</div>
			</Catcher>
		);
		expect(onError).not.toHaveBeenCalled();
		expect(screen.getByText(/CHILD ELEMENT/i)).toBeVisible();
	});

	test('Render a component with an error', () => {
		jest.spyOn(console, 'error').mockImplementation();
		const onError = jest.fn();
		setup(
			<Catcher onError={onError}>
				<ErrorComponent />
			</Catcher>
		);
		expect(onError).toHaveBeenCalled();
		expect(screen.getByText(/error from the test component/i)).toBeVisible();
	});
});
