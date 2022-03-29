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
import { Popover } from './Popover';
import { Button } from '../basic/Button';
import { Container } from '../layout/Container';
import { Input } from '../inputs/Input';

const CustomPopover = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);
	return (
		<>
			<Button
				label="Click me!"
				ref={buttonRef}
				onClick={(): void => setOpen(true)}
				data-testid={'button1'}
			/>
			<Popover
				open={open}
				anchorEl={buttonRef}
				placement="right"
				onClose={(): void => setOpen(false)}
				data-testid={'Popover'}
			>
				<Container>
					<Button label={'asd'} data-testid={'button2'} onClick={(): void => undefined} />
					<Input label={'rly'} />
				</Container>
			</Popover>
		</>
	);
};

describe('Popover', () => {
	test('Render closed Popover', () => {
		render(<CustomPopover />);

		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
		expect(screen.queryByTestId('Popover')).not.toBeInTheDocument();
		expect(screen.queryByTestId('button2')).not.toBeInTheDocument();

		expect(screen.getByTestId('button1')).toBeInTheDocument();
		expect(screen.getByTestId('button1')).toHaveTextContent(/click me!/i);
	});

	test('Render opened Popover', () => {
		render(<CustomPopover />);
		userEvent.click(screen.getByTestId('button1'));
		expect(screen.getByRole('textbox')).toBeInTheDocument();
		expect(screen.getByTestId('Popover')).toBeInTheDocument();
		expect(screen.getByTestId('button2')).toBeInTheDocument();

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByRole('button', { name: /click me!/i })).toBeVisible();
		expect(screen.getByRole('button', { name: /asd/i })).toBeVisible();
	});
});
