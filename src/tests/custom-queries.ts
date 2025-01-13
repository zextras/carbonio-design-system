/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import type { ByRoleMatcher, ByRoleOptions, GetAllBy } from '@testing-library/react';
import { queries, queryHelpers, within as rtlWithin } from '@testing-library/react';

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

export const queriesExtended = { ...queries, ...customQueries };
