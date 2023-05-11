/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { act, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultTheme } from 'styled-components';
import 'jest-styled-components';
import { find as findStyled } from 'styled-components/test-utils';

import { render } from '../../test-utils';
import { Theme } from '../../theme/theme';
import { ModalManager } from '../utilities/ModalManager';
import { Banner, BannerProps, InfoContainer } from './Banner';

describe('Banner', () => {
	function makeTextCropped(
		resizeObserver: jest.MockInstance<ResizeObserver, [ResizeObserverCallback]>,
		infoContainerElement: HTMLElement
	): void {
		const resizeCallback = resizeObserver.mock.calls[0][0];
		jest.spyOn(infoContainerElement, 'clientHeight', 'get').mockReturnValue(20);
		jest.spyOn(infoContainerElement, 'scrollHeight', 'get').mockReturnValue(30);
		act(() => {
			resizeCallback(
				[
					{
						contentRect: {
							height: 20
						}
					} as ResizeObserverEntry
				],
				resizeObserver.mock.instances[0]
			);
		});
	}

	function makeTextFullyVisible(
		resizeObserver: jest.MockInstance<ResizeObserver, [ResizeObserverCallback]>,
		infoContainerElement: HTMLElement
	): void {
		const resizeCallback = resizeObserver.mock.calls[0][0];
		jest.spyOn(infoContainerElement, 'clientHeight', 'get').mockReturnValue(30);
		jest.spyOn(infoContainerElement, 'scrollHeight', 'get').mockReturnValue(30);
		act(() => {
			resizeCallback(
				[
					{
						contentRect: {
							height: 30
						}
					} as ResizeObserverEntry
				],
				resizeObserver.mock.instances[0]
			);
		});
	}

	async function openMoreInfoModal(): Promise<HTMLElement> {
		userEvent.click(screen.getByRole('button', { name: /more info/i }));
		const modal = await screen.findByTestId('modal');

		// run modal timeout
		await waitFor(
			() =>
				new Promise((resolve) => {
					setTimeout(resolve, 1);
				})
		);
		return modal;
	}

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
					primaryAction={{ label: 'Primary action', onClick: jest.fn() }}
					secondaryAction={{ label: 'Secondary action', onClick: jest.fn() }}
					showClose
					onClose={jest.fn()}
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

	test('More info button is shown if text is cropped', () => {
		const longDescription = faker.lorem.sentences(4);
		const longTitle = faker.lorem.sentences(2);
		const resizeObserver = jest.spyOn(window, 'ResizeObserver');
		render(<Banner description={longDescription} title={longTitle} data-testid={'banner'} />);
		const infoContainer = findStyled(screen.getByTestId('banner'), InfoContainer);
		expect(infoContainer).not.toBeNull();
		makeTextCropped(resizeObserver, infoContainer as HTMLElement);
		expect(screen.getByRole('button', { name: /more info/i })).toBeVisible();
	});

	test('More info button is hidden if text is entirely visible', () => {
		const longDescription = faker.lorem.sentences(4);
		const longTitle = faker.lorem.sentences(2);
		const resizeObserver = jest.spyOn(window, 'ResizeObserver');
		render(<Banner description={longDescription} title={longTitle} data-testid={'banner'} />);
		const infoContainer = findStyled(screen.getByTestId('banner'), InfoContainer);
		expect(infoContainer).not.toBeNull();
		makeTextFullyVisible(resizeObserver, infoContainer as HTMLElement);
		expect(screen.queryByRole('button', { name: /more info/i })).not.toBeInTheDocument();
	});

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

	test('Primary action is shown if prop is valued', () => {
		const clickFn = jest.fn();
		render(
			<Banner description={'banner'} primaryAction={{ label: 'primary', onClick: clickFn }} />
		);
		const action = screen.getByRole('button', { name: /primary/i });
		expect(action).toBeVisible();
		expect(action).toBeEnabled();
		userEvent.click(action);
		expect(clickFn).toHaveBeenCalled();
	});

	test('Actions are hidden by default', async () => {
		render(<Banner description={'banner'} />);
		expect(screen.queryByRole('button')).not.toBeInTheDocument();
	});

	test('Secondary action is shown if prop is valued', () => {
		const clickFn = jest.fn();
		render(
			<Banner description={'banner'} secondaryAction={{ label: 'secondary', onClick: clickFn }} />
		);
		const action = screen.getByRole('button', { name: /secondary/i });
		expect(action).toBeVisible();
		expect(action).toBeEnabled();
		userEvent.click(action);
		expect(clickFn).toHaveBeenCalled();
	});

	test('Both primary and secondary actions are visible if props are valued', () => {
		const primaryActionFn = jest.fn();
		const secondaryActionFn = jest.fn();
		render(
			<Banner
				description={'banner'}
				primaryAction={{ label: 'primary', onClick: primaryActionFn }}
				secondaryAction={{ label: 'secondary', onClick: secondaryActionFn }}
			/>
		);
		const primaryAction = screen.getByRole('button', { name: /primary/i });
		expect(primaryAction).toBeVisible();
		expect(primaryAction).toBeEnabled();
		userEvent.click(primaryAction);
		expect(primaryActionFn).toHaveBeenCalled();
		const secondaryAction = screen.getByRole('button', { name: /secondary/i });
		expect(secondaryAction).toBeVisible();
		expect(secondaryAction).toBeEnabled();
		userEvent.click(secondaryAction);
		expect(secondaryActionFn).toHaveBeenCalled();
		expect(primaryActionFn).toHaveBeenCalledTimes(1);
		expect(secondaryActionFn).toHaveBeenCalledTimes(1);
	});

	test('More info opens a modal containing title, description, primary and secondary actions', async () => {
		const longDescription = faker.lorem.sentences(4);
		const longTitle = faker.lorem.sentences(2);
		const resizeObserver = jest.spyOn(window, 'ResizeObserver');
		const primaryActionFn = jest.fn();
		const secondaryActionFn = jest.fn();

		render(
			<ModalManager>
				<Banner
					description={longDescription}
					title={longTitle}
					data-testid={'banner'}
					primaryAction={{ label: 'primary action', onClick: primaryActionFn }}
					secondaryAction={{ label: 'secondary action', onClick: secondaryActionFn }}
				/>
			</ModalManager>
		);
		const infoContainer = findStyled(screen.getByTestId('banner'), InfoContainer);
		expect(infoContainer).not.toBeNull();
		makeTextCropped(resizeObserver, infoContainer as HTMLElement);
		const modal = await openMoreInfoModal();
		expect(within(modal).getByText(longDescription)).toBeVisible();
		expect(within(modal).getByText(longTitle)).toBeVisible();
		expect(within(modal).getByRole('button', { name: /primary action/i })).toBeVisible();
		expect(within(modal).getByRole('button', { name: /secondary action/i })).toBeVisible();
		userEvent.click(within(modal).getByRole('button', { name: /primary action/i }));
		expect(primaryActionFn).toHaveBeenCalled();
		await waitFor(() => expect(modal).not.toBeInTheDocument());
		const modal2 = await openMoreInfoModal();
		userEvent.click(within(modal2).getByRole('button', { name: /secondary action/i }));
		expect(secondaryActionFn).toHaveBeenCalled();
		await waitFor(() => expect(modal2).not.toBeInTheDocument());
	});

	test('More info modal has the close icon button with a tooltip', async () => {
		const longDescription = faker.lorem.sentences(4);
		const longTitle = faker.lorem.sentences(2);
		const resizeObserver = jest.spyOn(window, 'ResizeObserver');

		const { getByRoleWithIcon } = render(
			<ModalManager>
				<Banner
					description={longDescription}
					title={longTitle}
					data-testid={'banner'}
					primaryAction={{ label: 'primary action', onClick: jest.fn() }}
					secondaryAction={{ label: 'secondary action', onClick: jest.fn() }}
				/>
			</ModalManager>
		);
		const infoContainer = findStyled(screen.getByTestId('banner'), InfoContainer);
		expect(infoContainer).not.toBeNull();
		makeTextCropped(resizeObserver, infoContainer as HTMLElement);
		const modal = await openMoreInfoModal();
		const closeAction = getByRoleWithIcon('button', { icon: 'Close' });
		expect(closeAction).toBeVisible();
		expect(closeAction).toBeVisible();
		userEvent.click(closeAction);
		await waitFor(() => expect(modal).not.toBeInTheDocument());
	});
});
