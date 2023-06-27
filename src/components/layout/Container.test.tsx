/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';
import 'jest-styled-components';

import { Container } from './Container';
import { render } from '../../test-utils';
import { Theme } from '../../theme/theme';

describe('Container', () => {
	test('Set all borders in one if a string is passed as prop', () => {
		render(<Container borderColor={'black'}>Test container</Container>);
		const containerEl = screen.getByText('Test container');
		expect(containerEl).toHaveStyleRule(
			'border',
			expect.stringContaining(Theme.palette.black.regular)
		);
		expect(containerEl).not.toHaveStyleRule('border-block-start');
		expect(containerEl).not.toHaveStyleRule('border-inline-end');
		expect(containerEl).not.toHaveStyleRule('border-block-end');
		expect(containerEl).not.toHaveStyleRule('border-inline-start');
	});

	test('Set only provided borders if an object is passed as prop', () => {
		render(<Container borderColor={{ top: 'black', right: 'black' }}>Test container</Container>);
		const containerEl = screen.getByText('Test container');
		expect(containerEl).toHaveStyleRule(
			'border-block-start',
			expect.stringContaining(Theme.palette.black.regular)
		);
		expect(containerEl).toHaveStyleRule(
			'border-inline-end',
			expect.stringContaining(Theme.palette.black.regular)
		);
		expect(containerEl).not.toHaveStyleRule('border-block-end');
		expect(containerEl).not.toHaveStyleRule('border-left');
		expect(containerEl).not.toHaveStyleRule('border');
	});
});
