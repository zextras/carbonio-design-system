/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { type ReactElement } from 'react';

import {
	act,
	ByRoleMatcher,
	ByRoleOptions,
	GetAllBy,
	queries,
	queryHelpers,
	render,
	RenderOptions,
	RenderResult,
	Screen,
	screen as rtlScreen,
	within as rtlWithin
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { defaultKeyMap } from '@testing-library/user-event/dist/cjs/keyboard/keyMap';

import { ThemeProvider } from './theme/theme-context-provider';

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

type ByRoleWithIconOptions = ByRoleOptions & {
	icon: string | RegExp;
};

/**
 * Matcher function to search an icon button through the icon data-testid
 */
const queryAllByRoleWithIcon: GetAllBy<[ByRoleMatcher, ByRoleWithIconOptions]> = (
	container,
	role,
	{ icon, ...options }
) =>
	rtlWithin(container)
		.queryAllByRole(role, options)
		.filter((element) => rtlWithin(element).queryByTestId(icon) !== null);

const getByRoleWithIconMultipleError = (
	_container: Element | null,
	role: ByRoleMatcher,
	options: ByRoleWithIconOptions
): string => `Found multiple elements with role ${role as string} and icon ${options.icon}`;
const getByRoleWithIconMissingError = (
	_container: Element | null,
	role: ByRoleMatcher,
	options: ByRoleWithIconOptions
): string => `Unable to find an element with role ${role as string} and icon ${options.icon}`;

const [
	queryByRoleWithIcon,
	getAllByRoleWithIcon,
	getByRoleWithIcon,
	findAllByRoleWithIcon,
	findByRoleWithIcon
] = queryHelpers.buildQueries<[ByRoleMatcher, ByRoleWithIconOptions]>(
	queryAllByRoleWithIcon,
	getByRoleWithIconMultipleError,
	getByRoleWithIconMissingError
);

const customQueries = {
	// byRoleWithIcon
	queryByRoleWithIcon,
	getAllByRoleWithIcon,
	getByRoleWithIcon,
	findAllByRoleWithIcon,
	findByRoleWithIcon
};

const queriesExtended = { ...queries, ...customQueries };

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
		queries: { ...queries, ...customQueries },
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
		advanceTimers: jest.advanceTimersByTimeAsync,
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
		window.IntersectionObserver as jest.Mock<
			IntersectionObserver,
			[callback: IntersectionObserverCallback, options?: IntersectionObserverInit]
		>
	).mock;
	calls.forEach((call, index) => {
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
				instances[index]
			);
		});
	});
}
