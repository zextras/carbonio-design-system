/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { screen } from '@testing-library/react';

import { Container } from './Container';
import { setup } from '../../../tests/utils';
import { Theme } from '../../../theme/theme';

describe('Container', () => {
	test('Set all borders in one if a string is passed as prop', () => {
		setup(<Container borderColor={'black'}>Test container</Container>);
		const containerEl = screen.getByText('Test container');
		expect(containerEl).toHaveStyleRule(
			'border',
			expect.stringContaining(Theme.palette.black.regular)
		);
		expect(containerEl).not.toHaveStyleRule('border-top', undefined);
		expect(containerEl).not.toHaveStyleRule('border-right', undefined);
		expect(containerEl).not.toHaveStyleRule('border-bottom', undefined);
		expect(containerEl).not.toHaveStyleRule('border-left', undefined);
	});

	test('Set only provided borders if an object is passed as prop', () => {
		setup(<Container borderColor={{ top: 'black', right: 'black' }}>Test container</Container>);
		const containerEl = screen.getByText('Test container');
		expect(containerEl).toHaveStyleRule(
			'border-top',
			expect.stringContaining(Theme.palette.black.regular)
		);
		expect(containerEl).toHaveStyleRule(
			'border-right',
			expect.stringContaining(Theme.palette.black.regular)
		);
		expect(containerEl).not.toHaveStyleRule('border-bottom', undefined);
		expect(containerEl).not.toHaveStyleRule('border-left', undefined);
		expect(containerEl).not.toHaveStyleRule('border', undefined);
	});
});
