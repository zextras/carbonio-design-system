/* eslint-disable import/no-extraneous-dependencies */

/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useState } from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import Popover from './Popover';
import Button from '../basic/Button';
import Container from '../layout/Container';
import Input from '../inputs/Input';

const CustomPopover = () => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef(undefined);
	return (
		<>
			<Button
				label="Click me!"
				ref={buttonRef}
				onClick={() => setOpen(true)}
				data-testid={'button1'}
			/>
			<Popover
				open={open}
				anchorEl={buttonRef}
				placement="right"
				onClose={() => setOpen(false)}
				data-testid={'Popover'}
			>
				<Container>
					<Button label={'asd'} data-testid={'button2'} />
					<Input label={'rly'} />
				</Container>
			</Popover>
		</>
	);
};

describe('Popover', () => {
	const input = () => screen.getByRole('textbox');
	const popover = () => screen.getByTestId('Popover');
	const button1 = () => screen.getByTestId('button1');
	const button2 = () => screen.getByTestId('button2');

	test('Render closed Popover', () => {
		render(<CustomPopover />);

		expect(input).toThrowError();
		expect(popover).toThrowError();
		expect(button2).toThrowError();

		expect(button1()).toBeInTheDocument();
		expect(button1()).toHaveTextContent('CLICK ME!');
	});

	test('Render opened Popover', () => {
		render(<CustomPopover />);
		userEvent.click(screen.getByTestId('button1'));
		expect(input).not.toThrowError();
		expect(popover).not.toThrowError();
		expect(button2).not.toThrowError();

		expect(input()).toBeInTheDocument();
		expect(popover()).toBeInTheDocument();
		expect(button2()).toBeInTheDocument();

		expect(input()).toHaveAttribute('name', 'rly');
		expect(button1()).toBeInTheDocument();
		expect(button1()).toHaveTextContent('CLICK ME!');
		expect(button2()).toHaveTextContent('ASD');
	});
});
