/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { screen } from '@testing-library/dom';
import { render } from '../../test-utils';
import { Catcher } from './Catcher';

function ErrorComponent(): JSX.Element {
	throw new Error("Error from the test component, don't panic if You see this error.");
}

describe('Catcher', () => {
	test('Render a component', () => {
		const onError = jest.fn();
		render(
			<Catcher onError={onError}>
				<div>CHILD ELEMENT</div>
			</Catcher>
		);
		expect(onError).not.toBeCalled();
		expect(screen.getByText(/CHILD ELEMENT/i)).toBeInTheDocument();
	});

	test('Render a component with an error', () => {
		jest.spyOn(console, 'error');
		const onError = jest.fn();
		render(
			<Catcher onError={onError}>
				<ErrorComponent />
			</Catcher>
		);
		expect(onError).toBeCalled();
		expect(screen.getByText(/error from the test component/i)).toBeInTheDocument();
	});
});
