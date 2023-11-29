/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { faker } from '@faker-js/faker';
import { screen } from '@testing-library/react';

import { Avatar } from './Avatar';
import { setup } from '../../test-utils';

describe('Avatar', () => {
	test('Render an avatar with first name and last name', () => {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const label = `${firstName} ${lastName}`;
		setup(<Avatar label={label} />);
		expect(screen.getByText(`${firstName[0]}${lastName[0]}`.toUpperCase())).toBeVisible();
	});

	test('Render an avatar with first name', () => {
		const firstName = faker.person.firstName();
		setup(<Avatar label={firstName} />);
		expect(
			screen.getByText(`${firstName[0]}${firstName[firstName.length - 1]}`.toUpperCase())
		).toBeVisible();
	});

	test('Render an avatar with an icon and a themed background', () => {
		const words = faker.lorem.words(2);
		setup(<Avatar label={words} background="primary" icon="BulbOutline" />);
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Render an avatar with an empty label, must setup the default icon', () => {
		setup(<Avatar label="" />);
		expect(screen.getByTestId('icon: QuestionMark')).toBeVisible();
	});

	test('Render an avatar with label composed by spaces, must setup the default icon', () => {
		setup(<Avatar label="     " />);
		expect(screen.getByTestId('icon: QuestionMark')).toBeVisible();
	});

	test('Render an avatar with a label with a single letter', () => {
		setup(<Avatar label="a" />);
		expect(screen.getByText('a'.toUpperCase())).toBeVisible();
	});

	test('Render an avatar with first name and a space', () => {
		const firstName = faker.person.firstName();
		setup(<Avatar label={`${firstName} `} />);
		expect(
			screen.getByText(`${firstName[0]}${firstName[firstName.length - 1]}`.toUpperCase())
		).toBeVisible();
	});
});
