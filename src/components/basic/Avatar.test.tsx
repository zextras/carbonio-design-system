/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import { screen } from '@testing-library/dom';
import { faker } from '@faker-js/faker';
import { render } from '../../test-utils';
import { Avatar } from './Avatar';

describe('Avatar', () => {
	test('Render an avatar with first name and last name', () => {
		const firstName = faker.name.firstName();
		const lastName = faker.name.lastName();
		const label = `${firstName} ${lastName}`;
		render(<Avatar label={label} />);
		expect(screen.getByText(`${firstName[0]}${lastName[0]}`.toUpperCase())).toBeInTheDocument();
	});

	test('Render an avatar with first name', () => {
		const firstName = faker.name.firstName();
		render(<Avatar label={firstName} />);
		expect(
			screen.getByText(`${firstName[0]}${firstName[firstName.length - 1]}`.toUpperCase())
		).toBeInTheDocument();
	});

	test('Render an avatar with an icon and a themed background', () => {
		const words = faker.lorem.words(2);
		const { container } = render(<Avatar label={words} background="primary" icon="BulbOutline" />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an avatar with an empty label, must render the default icon', () => {
		const { container } = render(<Avatar label="" />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an avatar with label composed by spaces, must render the default icon', () => {
		const { container } = render(<Avatar label="     " />);
		expect(container.querySelector('svg')).toBeInTheDocument();
	});

	test('Render an avatar with a label with a single letter', () => {
		render(<Avatar label="a" />);
		expect(screen.getByText('a'.toUpperCase())).toBeInTheDocument();
	});

	test('Render an avatar with first name and a space', () => {
		const firstName = faker.name.firstName();
		render(<Avatar label={`${firstName} `} />);
		expect(
			screen.getByText(`${firstName[0]}${firstName[firstName.length - 1]}`.toUpperCase())
		).toBeInTheDocument();
	});
});
