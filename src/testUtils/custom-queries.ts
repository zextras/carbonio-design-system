/*
 * SPDX-FileCopyrightText: 2023 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import {
	ByRoleMatcher,
	ByRoleOptions,
	GetAllBy,
	queryHelpers,
	screen,
	within
} from '@testing-library/react';
import { filter } from 'lodash';

export type ByRoleWithIconOptions = ByRoleOptions & {
	icon: string | RegExp;
};
/**
 * Matcher function to search an icon button through the icon data-testid
 */
export const queryAllByRoleWithIcon: GetAllBy<[ByRoleMatcher, ByRoleWithIconOptions]> = (
	container,
	role,
	{ icon, ...options }
) =>
	filter(
		screen.queryAllByRole('button', options),
		(element) => within(element).queryByTestId(icon) !== null
	);
export const getByRoleWithIconMultipleError = (
	container: Element | null,
	role: ByRoleMatcher,
	options: ByRoleWithIconOptions
): string => `Found multiple elements with role ${role} and icon ${options.icon}`;
export const getByRoleWithIconMissingError = (
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

/**
 * Matcher function to search a focusable element with the given element inside
 */
// export const queryAllByFocus: GetAllBy<[Element]> = (container, innerElement) =>
// 	filter(
// 		container.querySelectorAll<HTMLElement>('[tabindex]'),
// 		(element) =>
// 			element.tabIndex >= 0 &&
// 			element.querySelector('[tabindex]') === null &&
// 			element.contains(innerElement)
// 	);
// export const getByRoleWithIconMultipleError = (
// 	container: Element | null,
// 	role: ByRoleMatcher,
// 	options: ByRoleWithIconOptions
// ): string => `Found multiple elements with role ${role} and icon ${options.icon}`;
// export const getByRoleWithIconMissingError = (
// 	container: Element | null,
// 	role: ByRoleMatcher,
// 	options: ByRoleWithIconOptions
// ): string => `Unable to find an element with role ${role} and icon ${options.icon}`;

// const [
// 	queryByRoleWithIcon,
// 	getAllByRoleWithIcon,
// 	getByRoleWithIcon,
// 	findAllByRoleWithIcon,
// 	findByRoleWithIcon
// ] = queryHelpers.buildQueries<[ByRoleMatcher, ByRoleWithIconOptions]>(
// 	queryAllByRoleWithIcon,
// 	getByRoleWithIconMultipleError,
// 	getByRoleWithIconMissingError
// );

export const customQueries = {
	// byRoleWithIcon
	queryByRoleWithIcon,
	getAllByRoleWithIcon,
	getByRoleWithIcon,
	findAllByRoleWithIcon,
	findByRoleWithIcon
};
