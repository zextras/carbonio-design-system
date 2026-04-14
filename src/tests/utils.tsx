/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { type ReactElement } from 'react';

import { matchers } from '@emotion/jest';
import type { RenderOptions, RenderResult, Screen } from '@testing-library/react';
import { act, render, screen as rtlScreen, within as rtlWithin } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultKeyMap } from '@testing-library/user-event/dist/cjs/keyboard/keyMap';
import type { Mock } from 'vitest';

import { queriesExtended } from './custom-queries';
import { ThemeProvider } from '../theme/theme-context-provider';

type User = ReturnType<(typeof userEvent)['setup']>;
interface KeyboardModifiers {
	ctrl?: boolean;
}
type KeyboardEventFn = (modifiers?: KeyboardModifiers) => ReturnType<User['keyboard']>;

export type UserEvent = User & {
	readonly arrowUp: KeyboardEventFn;
	readonly arrowDown: KeyboardEventFn;
	readonly arrowLeft: KeyboardEventFn;
	readonly arrowRight: KeyboardEventFn;
	readonly esc: KeyboardEventFn;
	readonly enter: KeyboardEventFn;
	readonly rightClick: (target: Element) => Promise<void>;
};

interface WrapperProps {
	children?: React.ReactNode;
}

expect.extend(matchers);

export function within(
	element: Parameters<typeof rtlWithin<typeof queriesExtended>>[0]
): ReturnType<typeof rtlWithin<typeof queriesExtended>> {
	return rtlWithin(element, queriesExtended);
}

export const screen: Screen<typeof queriesExtended> = { ...rtlScreen, ...within(document.body) };

const Wrapper = ({ children }: WrapperProps): React.JSX.Element => (
	<ThemeProvider>{children}</ThemeProvider>
);

function customRender(
	ui: React.ReactElement,
	options: Omit<RenderOptions, 'queries'> = {}
): RenderResult<typeof queriesExtended> {
	return render(ui, {
		wrapper: Wrapper,
		queries: queriesExtended,
		...options
	});
}

type SetupOptions = {
	renderOptions?: Omit<RenderOptions, 'queries'>;
	setupOptions?: Parameters<(typeof userEvent)['setup']>[0];
};

function wrapKeyboardTextWithModifier(text: string, modifiers?: KeyboardModifiers): string {
	let finalText = text;
	if (modifiers?.ctrl) {
		finalText = `{Control>}${finalText}{/Control}`;
	}
	return finalText;
}

function setupUserEvent(options?: SetupOptions['setupOptions']): UserEvent {
	const user = userEvent.setup({
		keyboardMap: [{ code: 'Comma', key: ',' }, ...defaultKeyMap],
		advanceTimers: vi.advanceTimersByTimeAsync,
		...options
	});
	return {
		...user,
		arrowUp: (modifiers) => user.keyboard(wrapKeyboardTextWithModifier('[ArrowUp]', modifiers)),
		arrowDown: (modifiers) => user.keyboard(wrapKeyboardTextWithModifier('[ArrowDown]', modifiers)),
		arrowLeft: () => user.keyboard('[ArrowLeft]'),
		arrowRight: () => user.keyboard('[ArrowRight]'),
		esc: () => user.keyboard('[Escape]'),
		enter: () => user.keyboard('[Enter]'),
		rightClick: (target: Element): Promise<void> => user.pointer({ target, keys: '[MouseRight]' })
	};
}

export const setup = (
	ui: ReactElement,
	options?: SetupOptions
): { user: UserEvent } & ReturnType<typeof customRender> => ({
	user: setupUserEvent(options?.setupOptions),
	...customRender(ui, options?.renderOptions)
});

export function makeItemsVisible(): void {
	const { calls, instances } = (
		window.IntersectionObserver as unknown as Mock<
			(
				...args: [callback: IntersectionObserverCallback, options?: IntersectionObserverInit]
			) => IntersectionObserver
		>
	).mock;
	calls.forEach(
		(call: [IntersectionObserverCallback, IntersectionObserverInit?], index: number) => {
			const [onChange] = call;
			// trigger the intersection on the observed element
			act(() => {
				onChange(
					[
						{
							intersectionRatio: 0,
							isIntersecting: true
						} as IntersectionObserverEntry
					],
					instances[index] as IntersectionObserver
				);
			});
		}
	);
}
