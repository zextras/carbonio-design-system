/*
 * SPDX-FileCopyrightText: 2022 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { screen, act } from '@testing-library/react';

import { Action, CollapsingActions } from './CollapsingActions';
import { setup } from '../../test-utils';
import { ICONS } from '../../testUtils/constants';
import { Theme } from '../../theme/theme';

describe('Collapsing Actions', () => {
	test('Render a collapsing actions component', () => {
		const actions: Action[] = [
			{
				id: 'action1',
				icon: 'Activity',
				label: 'Action 1',
				onClick: () => undefined
			},
			{
				id: 'action2',
				icon: 'People',
				label: 'Action 2',
				onClick: () => undefined
			}
		];
		setup(<CollapsingActions actions={actions} />);
		expect(screen.getByTestId('icon: Activity')).toBeVisible();
		expect(screen.queryByText(/action 1/i)).not.toBeInTheDocument();
		expect(screen.getByTestId('icon: People')).toBeVisible();
		expect(screen.queryByText(/action 2/i)).not.toBeInTheDocument();
	});

	test('Only max number of action is visible, others are collapsed inside a dropdown', async () => {
		const actions = [];
		const icons = Object.keys(Theme.icons);
		for (let i = 0; i < 10; i += 1) {
			actions.push({
				id: `action${i}`,
				label: faker.word.noun(),
				icon: icons[i],
				onClick: () => undefined
			});
		}

		const { user } = setup(<CollapsingActions actions={actions} maxVisible={3} />);
		// first 3 actions are visible
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[1].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[1].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[2].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[2].label)).not.toBeInTheDocument();
		// action 4 is not visible
		expect(screen.queryByTestId(`icon: ${actions[3].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByText(actions[3].label)).not.toBeInTheDocument();
		// collapser icon button is visible instead
		expect(screen.getByTestId(ICONS.moreVertical)).toBeVisible();
		await user.click(screen.getByTestId(ICONS.moreVertical));
		await screen.findByText(actions[3].label);
		// first 3 actions are still visible as icon buttons
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[1].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[1].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[2].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[2].label)).not.toBeInTheDocument();
		// others are rendered inside the dropdown
		expect(screen.getByText(actions[3].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[3].icon}`)).toBeVisible();
		expect(screen.getByText(actions[4].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[4].icon}`)).toBeVisible();
		expect(screen.getByText(actions[5].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[5].icon}`)).toBeVisible();
		expect(screen.getByText(actions[6].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[6].icon}`)).toBeVisible();
		expect(screen.getByText(actions[7].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[7].icon}`)).toBeVisible();
		expect(screen.getByText(actions[8].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[8].icon}`)).toBeVisible();
		expect(screen.getByText(actions[9].label)).toBeVisible();
		expect(screen.getByTestId(`icon: ${actions[9].icon}`)).toBeVisible();
	});

	test('Resize event makes action to be collapsed or visible based on width', async () => {
		/*
		 * Considering that icon has 32px of width by default, 10 actions require 320px to be all visible.
		 * Default width of the window in jest is 1024, so the container is rendered initially with a
		 * width of 1024px -> all actions are visible.
		 * By resizing the window to 300px, 2 actions should be removed to make space to the "more vertical".
		 * We should have 8 actions visible plus the "more vertical" = 288px.
		 * By resizing again the window to 150px, we get 3 actions + "more vertical"
		 * By resizing the window to 200px, 5 action + "more vertical"
		 * Resizing again to 1024, all actions return visible
		 */
		const actions = [];
		const icons = Object.keys(Theme.icons);
		for (let i = 0; i < 10; i += 1) {
			actions.push({
				id: `action${i}`,
				label: faker.word.noun(),
				icon: icons[i],
				onClick: () => undefined
			});
		}

		setup(<CollapsingActions actions={actions} data-testid="collapsing-actions" />);

		const collapsingComponent = screen.getByTestId('collapsing-actions');
		const getOffsetWithMock = jest.spyOn(collapsingComponent, 'offsetWidth', 'get');
		const getScrollWidthMock = jest.spyOn(collapsingComponent, 'scrollWidth', 'get');

		getOffsetWithMock.mockImplementation(() => {
			throw new Error('should not call this. Mock single return value');
		});
		getScrollWidthMock.mockImplementation(() => {
			throw new Error('should not call this. Mock single return value');
		});

		// window width is 1024, container width is 512, 10 (all) actions visible, more vertical is hidden
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[9].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[9].label)).not.toBeInTheDocument();
		expect(screen.queryByTestId(ICONS.moreVertical)).not.toBeInTheDocument();
		// resize window to 300
		// container width is 300, 8 actions visible + more vertical
		getOffsetWithMock.mockReturnValue(300);
		getScrollWidthMock
			// all actions visible
			.mockReturnValueOnce(32 * 10)
			// 9 actions visible + more vertical
			.mockReturnValueOnce(32 * 10)
			// 8 actions visible + more vertical
			.mockReturnValueOnce(32 * 9);
		act(() => {
			window.resizeTo(300, 800);
		});
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[7].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[7].label)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[8].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[9].icon}`)).not.toBeInTheDocument();
		expect(screen.getByTestId(ICONS.moreVertical)).toBeVisible();
		// resize window to 150
		// container width is 150, 3 actions visible + more vertical
		getOffsetWithMock.mockReturnValue(150);
		getScrollWidthMock
			// 8 actions visible + more vertical
			.mockReturnValueOnce(32 * 9)
			// 7 actions visible + more vertical
			.mockReturnValueOnce(32 * 8)
			// 6 actions visible + more vertical
			.mockReturnValueOnce(32 * 7)
			// 5 actions visible + more vertical
			.mockReturnValueOnce(32 * 6)
			// 4 actions visible + more vertical
			.mockReturnValueOnce(32 * 5)
			// 3 actions visible + more vertical
			.mockReturnValueOnce(32 * 4);
		act(() => {
			window.resizeTo(150, 800);
		});
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[2].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[2].label)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[3].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[4].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[5].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[6].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[7].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[8].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[9].icon}`)).not.toBeInTheDocument();
		expect(screen.getByTestId(ICONS.moreVertical)).toBeVisible();
		// resize window to 200
		// container width is 200, 5 actions visible + more vertical
		getOffsetWithMock.mockReturnValue(200);
		getScrollWidthMock
			// 3 actions visible + more vertical
			.mockReturnValueOnce(32 * 4)
			// 4 actions visible + more vertical
			.mockReturnValueOnce(32 * 5)
			// 5 actions visible + more vertical
			.mockReturnValueOnce(32 * 6)
			// tentative of 6 actions visible + more vertical
			.mockReturnValueOnce(32 * 7)
			// 5 actions visible + more vertical
			.mockReturnValueOnce(32 * 6);

		act(() => {
			window.resizeTo(200, 800);
		});
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[4].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[4].label)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[5].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[6].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[7].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[8].icon}`)).not.toBeInTheDocument();
		expect(screen.queryByTestId(`icon: ${actions[9].icon}`)).not.toBeInTheDocument();
		expect(screen.getByTestId(ICONS.moreVertical)).toBeVisible();
		// reset window to 1024
		// container width is 1024, 10 (all) actions visible, more vertical is hidden
		getOffsetWithMock.mockReturnValue(1024);
		getScrollWidthMock
			// 5 actions visible + more vertical
			.mockReturnValueOnce(32 * 6)
			// 6 actions visible + more vertical
			.mockReturnValueOnce(32 * 7)
			// 7 actions visible + more vertical
			.mockReturnValueOnce(32 * 8)
			// 8 actions visible + more vertical
			.mockReturnValueOnce(32 * 9)
			// 9 actions visible + more vertical
			.mockReturnValueOnce(32 * 10)
			// 10 actions visible
			.mockReturnValueOnce(32 * 10);
		act(() => {
			window.resizeTo(1024, 800);
		});
		expect(screen.getByTestId(`icon: ${actions[0].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[0].label)).not.toBeInTheDocument();
		expect(screen.getByTestId(`icon: ${actions[9].icon}`)).toBeVisible();
		expect(screen.queryByText(actions[9].label)).not.toBeInTheDocument();
		expect(screen.queryByTestId(ICONS.moreVertical)).not.toBeInTheDocument();
	});
});
