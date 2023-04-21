/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { noop } from 'lodash';
import { DefaultTheme } from 'styled-components';
import 'jest-styled-components';

import { render } from '../../test-utils';
import { Theme } from '../../theme/theme';
import { Banner, BannerProps } from './Banner';

describe('Banner', () => {
	test('Render a banner', () => {
		render(<Banner status={'success'} description={'Description'} />);
		expect(screen.getByText('Description')).toBeVisible();
	});

	test.each<
		[
			status: BannerProps['status'],
			type: BannerProps['type'],
			mainColor: keyof DefaultTheme['palette'],
			backgroundColor: keyof DefaultTheme['palette'],
			textColor: keyof DefaultTheme['palette']
		]
	>([
		['success', 'standard', 'success', 'successBanner', 'text'],
		['success', 'fill', 'gray6', 'success', 'gray6'],
		['success', 'outline', 'success', 'gray6', 'text'],
		['warning', 'standard', 'warning', 'warningBanner', 'text'],
		['warning', 'fill', 'gray6', 'warning', 'gray6'],
		['warning', 'outline', 'warning', 'gray6', 'text'],
		['info', 'standard', 'info', 'infoBanner', 'text'],
		['info', 'fill', 'gray6', 'info', 'gray6'],
		['info', 'outline', 'info', 'gray6', 'text'],
		['error', 'standard', 'error', 'errorBanner', 'text'],
		['error', 'fill', 'gray6', 'error', 'gray6'],
		['error', 'outline', 'error', 'gray6', 'text']
	])(
		'Banner with status %s and type %s has main color %s, background %s and text %s',
		(status, type, mainColor, backgroundColor, textColor) => {
			const { getByRoleWithIcon } = render(
				<Banner
					status={status}
					type={type}
					data-testid={'banner'}
					title={'Title'}
					description={'Description'}
					primaryAction={{ label: 'Primary action', onClick: noop }}
					secondaryAction={{ label: 'Secondary action', onClick: noop }}
					showClose
				/>
			);
			expect(screen.getByTestId('banner')).toHaveStyleRule(
				'background',
				Theme.palette[backgroundColor].regular
			);
			expect(screen.getByText('Title')).toHaveStyleRule('color', Theme.palette[textColor].regular);
			expect(screen.getByText('Description')).toHaveStyleRule(
				'color',
				Theme.palette[textColor].regular
			);
			expect(screen.getByRole('button', { name: 'Primary action' })).toHaveStyleRule(
				'color',
				Theme.palette[mainColor].regular
			);
			expect(screen.getByRole('button', { name: 'Secondary action' })).toHaveStyleRule(
				'color',
				Theme.palette[mainColor].regular
			);

			expect(getByRoleWithIcon('button', { icon: 'Close' })).toHaveStyleRule(
				'color',
				Theme.palette[textColor].regular
			);
		}
	);

	test.each<[status: BannerProps['status'], icon: keyof DefaultTheme['icons']]>([
		['success', 'CheckmarkCircle2Outline'],
		['warning', 'AlertTriangleOutline'],
		['info', 'InfoOutline'],
		['error', 'CloseCircleOutline']
	])('Banner with status %s has icon %s', (status, icon) => {
		render(
			<Banner
				status={status}
				type={faker.helpers.arrayElement<BannerProps['type']>([
					'fill',
					'outline',
					'standard',
					undefined
				])}
				description={'Description'}
			/>
		);
		expect(screen.getByTestId(`icon: ${icon}`)).toBeVisible();
	});

	test.todo('More info button is shown if text is cropped');

	test.todo('More info is hidden if text is entirely visible');

	test('Close action is hidden by default', () => {
		const { queryByRoleWithIcon } = render(<Banner description={'Banner'} />);
		expect(queryByRoleWithIcon('button', { icon: 'Close' })).not.toBeInTheDocument();
	});

	test('Close action is shown if showClose is true', () => {
		const closeFn = jest.fn();
		const { getByRoleWithIcon } = render(
			<Banner description={'Banner'} showClose onClose={closeFn} />
		);
		const closeAction = getByRoleWithIcon('button', { icon: 'Close' });
		expect(closeAction).toBeVisible();
		userEvent.click(closeAction);
		expect(closeFn).toHaveBeenCalled();
	});
});
