/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';
import { render } from '../../test-utils';
import { Icon } from './Icon';

describe('Icon', () => {
	test('Render an icon', () => {
		const { container } = render(<Icon icon="BulbOutline" />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an icon with a color of the palette with the variant', () => {
		const { container } = render(<Icon icon="BulbOutline" color="primary.hover" />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an icon with a color not of the palette with the variant', () => {
		const { container } = render(<Icon icon="BulbOutline" color="cadetblue.disabled" />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an icon with a color in the rgb form and a variant', () => {
		const { container } = render(
			<Icon icon="BulbOutline" color="rgba(100, 50, 50, 0.7).disabled" />
		);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an icon with a custom color', () => {
		const { container } = render(<Icon icon="BulbOutline" color="rgba(100, 50, 50, 0.7)" />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});
});
