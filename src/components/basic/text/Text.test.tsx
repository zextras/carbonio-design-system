/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';

import { Text, TextProps } from './Text';
import { setup } from '../../../test-utils';
import { Theme } from '../../../theme/theme';

describe('Text', () => {
	test('render a text with string content', () => {
		setup(<Text>ABCD</Text>);
		expect(screen.getByText('ABCD')).toBeVisible();
	});

	test('render a text with disabled color', () => {
		setup(<Text disabled>ABCD</Text>);
		expect(screen.getByText('ABCD')).toHaveStyle({ color: Theme.palette.text.disabled });
	});

	test('render text with a component as content', () => {
		setup(
			<Text>
				ABC <Text>DEF</Text>
			</Text>
		);
		expect(screen.getByText('ABC')).toBeVisible();
		expect(screen.getByText('DEF')).toBeVisible();
	});

	it('should render the text with italic style if italic prop is true', () => {
		setup(<Text italic>ABCD</Text>);
		expect(screen.getByText('ABCD')).toHaveStyle('font-style: italic');
	});

	it.each<TextProps['textAlign']>(['left', 'right', 'center', 'justify', 'end', 'revert', 'start'])(
		'should render the text with textAlign %s',
		(textAlign) => {
			setup(<Text textAlign={textAlign}>ACB</Text>);
			expect(screen.getByText('ACB')).toHaveStyle({ textAlign });
		}
	);

	it('should render the text with line height', () => {
		const lineHeight = faker.number.int({ max: 10 });
		setup(<Text lineHeight={lineHeight}>ABC</Text>);
		expect(screen.getByText('ABC')).toHaveStyle({ lineHeight });
	});
});
