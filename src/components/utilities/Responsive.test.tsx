/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { screen } from '@testing-library/dom';
import { act } from '@testing-library/react';
import { Responsive } from './Responsive';
import { render } from '../../test-utils';

describe('Responsive', () => {
	let prevWidth: number;
	let prevHeight: number;

	beforeAll(() => {
		// Store the default value
		prevHeight = window.innerHeight;
		prevWidth = window.innerWidth;
	});

	afterEach(() => {
		// Reset to the default values
		Object.assign(window, {
			innerWidth: prevWidth,
			innerHeight: prevHeight
		});
	});

	test('Desktop mode', () => {
		Object.assign(window, {
			innerWidth: 1024,
			innerHeight: 768
		});

		render(
			<>
				<Responsive mode="desktop">
					<div>DESKTOP TEST ELEMENT</div>
				</Responsive>
				<Responsive mode="mobile">
					<div>MOBILE TEST ELEMENT</div>
				</Responsive>
			</>
		);
		expect(screen.getByText('DESKTOP TEST ELEMENT')).toBeInTheDocument();
		expect(screen.queryByText('MOBILE TEST ELEMENT')).not.toBeInTheDocument();
		// windowSpy.mockRestore();
	});

	test('Mobile mode', () => {
		Object.assign(window, {
			innerWidth: 768,
			innerHeight: 1024
		});
		render(
			<>
				<Responsive mode="desktop">
					<div>DESKTOP TEST ELEMENT</div>
				</Responsive>
				<Responsive mode="mobile">
					<div>MOBILE TEST ELEMENT</div>
				</Responsive>
			</>
		);
		expect(screen.queryByText('DESKTOP TEST ELEMENT')).not.toBeInTheDocument();
		expect(screen.getByText('MOBILE TEST ELEMENT')).toBeInTheDocument();
	});

	test('Switch between desktop and mobile mode', () => {
		Object.assign(window, {
			innerWidth: 1024,
			innerHeight: 768
		});

		render(
			<>
				<Responsive mode="desktop">
					<div>DESKTOP TEST ELEMENT</div>
				</Responsive>
				<Responsive mode="mobile">
					<div>MOBILE TEST ELEMENT</div>
				</Responsive>
			</>
		);
		expect(screen.getByText('DESKTOP TEST ELEMENT')).toBeInTheDocument();
		expect(screen.queryByText('MOBILE TEST ELEMENT')).not.toBeInTheDocument();

		act(() => {
			Object.assign(window, {
				innerWidth: 768,
				innerHeight: 1024
			}).dispatchEvent(new window.Event('resize'));
		});
		expect(screen.queryByText('DESKTOP TEST ELEMENT')).not.toBeInTheDocument();
		expect(screen.getByText('MOBILE TEST ELEMENT')).toBeInTheDocument();
	});
});
