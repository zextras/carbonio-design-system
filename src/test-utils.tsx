/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { type ReactElement } from 'react';

import {
	ByRoleMatcher,
	ByRoleOptions,
	GetAllBy,
	queries,
	queryHelpers,
	render,
	RenderOptions,
	RenderResult,
	screen,
	within
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// FIXME: check how to make eslint resolve the alias
// eslint-disable-next-line import/no-unresolved
import { defaultKeyMap } from '@testing-library/user-event/keyboard/keyMap';
import { filter } from 'lodash';

import { ThemeProvider } from './theme/theme-context-provider';

export type UserEvent = ReturnType<(typeof userEvent)['setup']>;

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
	filter(
		screen.queryAllByRole('button', options),
		(element) => within(element).queryByTestId(icon) !== null
	);
const getByRoleWithIconMultipleError = (
	container: Element | null,
	role: ByRoleMatcher,
	options: ByRoleWithIconOptions
): string => `Found multiple elements with role ${role} and icon ${options.icon}`;
const getByRoleWithIconMissingError = (
	container: Element | null,
	role: ByRoleMatcher,
	options: ByRoleWithIconOptions
): string => `Unable to find an element with role ${role} and icon ${options.icon}`;

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

const Wrapper = ({ children }: WrapperProps): React.JSX.Element => (
	<ThemeProvider>{children}</ThemeProvider>
);

function customRender(
	ui: React.ReactElement,
	options: Omit<RenderOptions, 'queries' | 'wrapper'> = {}
): RenderResult<typeof queriesExtended> {
	return render(ui, {
		wrapper: ({ children }: Pick<WrapperProps, 'children'>) => <Wrapper>{children}</Wrapper>,
		queries: { ...queries, ...customQueries },
		...options
	});
}

type SetupOptions = {
	renderOptions?: Omit<RenderOptions, 'queries' | 'wrapper'>;
	setupOptions?: Parameters<(typeof userEvent)['setup']>[0];
};

export const setup = (
	ui: ReactElement,
	options?: SetupOptions
): { user: UserEvent } & ReturnType<typeof customRender> => ({
	user: userEvent.setup({
		keyboardMap: [{ code: 'Comma', key: ',' }, ...defaultKeyMap],
		advanceTimers: jest.advanceTimersByTime,
		...options?.setupOptions
	}),
	...customRender(ui, options?.renderOptions)
});
