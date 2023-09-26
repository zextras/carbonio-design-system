/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import {
	queries,
	screen as rtlScreen,
	render as rtlRender,
	within as rtlWithin,
	type RenderResult,
	RenderOptions,
	Screen
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { keyboard } from '@testing-library/user-event/dist/keyboard';

import { customQueries } from './testUtils/custom-queries';
import { ThemeProvider } from './theme/theme-context-provider';

type KeyboardEventFn = (options?: Parameters<typeof keyboard>[1]) => ReturnType<typeof keyboard>;

export type UserEvent = typeof userEvent & {
	readonly arrowUp: KeyboardEventFn;
	readonly arrowDown: KeyboardEventFn;
	readonly arrowLeft: KeyboardEventFn;
	readonly arrowRight: KeyboardEventFn;
	readonly esc: KeyboardEventFn;
};

const extendedQueries = { ...queries, ...customQueries };

export function within(element: HTMLElement): ReturnType<typeof rtlWithin<typeof extendedQueries>> {
	return rtlWithin<typeof extendedQueries>(element, extendedQueries);
}

export const screen: Screen = {
	...rtlScreen,
	...within(document.body)
};

function buildKeyboardEventFn(key: string): KeyboardEventFn {
	return (options = {}) => Promise.resolve(userEvent.keyboard(key, options));
}

function setupUserEvent(): UserEvent {
	return {
		...userEvent,
		arrowUp: buildKeyboardEventFn('[ArrowUp]'),
		arrowDown: buildKeyboardEventFn('[ArrowDown]'),
		arrowLeft: buildKeyboardEventFn('[ArrowLeft]'),
		arrowRight: buildKeyboardEventFn('[ArrowRight]'),
		esc: buildKeyboardEventFn('[Escape]')
	};
}
export function render(
	ui: React.ReactElement,
	{ ...options } = {}
): RenderResult<typeof queries & typeof customQueries> & { user: UserEvent } {
	const Wrapper = ({
		children
	}: React.ComponentPropsWithoutRef<NonNullable<RenderOptions['wrapper']>>): React.JSX.Element => (
		<ThemeProvider>{children}</ThemeProvider>
	);

	return {
		...rtlRender(ui, {
			wrapper: Wrapper,
			queries: extendedQueries,
			...options
		}),
		user: setupUserEvent()
	};
}
