/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React from 'react';

import { faker } from '@faker-js/faker';
import { act, screen } from '@testing-library/react';

import { Button } from './Button';
import { setup } from '../../test-utils';
import { Tooltip } from '../display/Tooltip';

describe('Button', () => {
	test('The label must be Upper Case', () => {
		const label = faker.lorem.words(1);
		const clickFn = jest.fn();
		setup(<Button label={label} onClick={clickFn} />);
		expect(screen.getByText(label)).toBeVisible();
		expect(screen.getByText(label)).toHaveStyle('text-transform: uppercase');
	});

	test('Click on its label', async () => {
		const label = faker.lorem.words(1);
		const onClick = jest.fn();
		const { user } = setup(<Button label={label} onClick={onClick} />);
		await user.click(screen.getByText(new RegExp(label, 'i')));
		expect(onClick).toHaveBeenCalled();
	});

	test('Click on its label, button is disabled', async () => {
		const label = faker.lorem.words(1);
		const onClick = jest.fn();
		const { user } = setup(<Button label={label} onClick={onClick} disabled />);
		await user.click(screen.getByText(new RegExp(label, 'i')));
		expect(onClick).not.toHaveBeenCalled();
	});

	test('Trigger the onClick with the keyboard', async () => {
		const label = faker.lorem.words(1);
		const onClick = jest.fn();
		const { user } = setup(<Button label={label} onClick={onClick} />);
		await user.type(screen.getByText(new RegExp(label, 'i')), '{enter}');
		expect(onClick).toHaveBeenCalled();
	});

	test('Show an icon', () => {
		const label = faker.lorem.words(1);
		const clickFn = jest.fn();
		setup(<Button label={label} icon="BulbOutline" onClick={clickFn} />);
		expect(screen.getByText(new RegExp(label, 'i'))).toBeVisible();
		expect(screen.getByTestId('icon: BulbOutline')).toBeVisible();
	});

	test('Loading state', () => {
		const label = faker.lorem.words(1);
		const clickFn = jest.fn();
		setup(<Button label={label} loading onClick={clickFn} />);
		expect(screen.getByText(new RegExp(label, 'i'))).not.toBeVisible();
		expect(screen.getByTestId('spinner')).toBeVisible();
	});

	test('Show tooltip on disabled button', async () => {
		const clickFn = jest.fn();
		const { user } = setup(
			<Tooltip label={'Tooltip label'}>
				<Button label={'Button'} loading onClick={clickFn} disabled />
			</Tooltip>
		);
		// FIXME: hover event on disabled button is not bubbled up. Remove access on parentElement when possible
		// eslint-disable-next-line testing-library/no-node-access
		const button = screen.getByRole('button');
		expect(screen.queryByText('Tooltip label')).not.toBeInTheDocument();
		// wait for tooltip to register listeners
		jest.advanceTimersByTime(1);
		expect(screen.queryByText('Tooltip label')).not.toBeInTheDocument();
		await user.hover(button);
		await screen.findByText('Tooltip label');
		expect(screen.getByText('Tooltip label')).toBeVisible();
		await act(async () => {
			await user.unhover(button);
		});
		expect(screen.queryByText('Tooltip label')).not.toBeInTheDocument();
	});
});
