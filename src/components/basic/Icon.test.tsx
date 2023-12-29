/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { screen } from '@testing-library/react';

import { Icon } from './Icon';
import { setup } from '../../test-utils';

describe('Icon', () => {
	test('Render an icon', () => {
		setup(<Icon icon="BulbOutline" />);
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Render an icon with a color of the palette with the variant', () => {
		setup(<Icon icon="BulbOutline" color="primary.hover" />);
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Render an icon with a color not of the palette with the variant', () => {
		setup(<Icon icon="BulbOutline" color="cadetblue.disabled" />);
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Render an icon with a color in the rgb form and a variant', () => {
		setup(<Icon icon="BulbOutline" color="rgba(100, 50, 50, 0.7).disabled" />);
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Render an icon with a custom color', () => {
		setup(<Icon icon="BulbOutline" color="rgba(100, 50, 50, 0.7)" />);
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});
});
