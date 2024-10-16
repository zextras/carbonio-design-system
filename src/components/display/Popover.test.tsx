/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useRef, useState } from 'react';

import { screen } from '@testing-library/react';

import { Popover } from './Popover';
import { setup } from '../../test-utils';
import { Button } from '../basic/button/Button';
import { Input } from '../inputs/input/Input';
import { Container } from '../layout/Container';

const CustomPopover = (): React.JSX.Element => {
	const [open, setOpen] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
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
		setup(<CustomPopover />);

		expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
		expect(screen.queryByTestId('Popover')).not.toBeInTheDocument();
		expect(screen.queryByTestId('button2')).not.toBeInTheDocument();

		expect(screen.getByTestId('button1')).toBeVisible();
		expect(screen.getByTestId('button1')).toHaveTextContent(/click me!/i);
	});

	test('Render opened Popover', async () => {
		const { user } = setup(<CustomPopover />);
		await user.click(screen.getByTestId('button1'));
		expect(screen.getByTestId('Popover')).toBeVisible();
		expect(screen.getByTestId('button2')).toBeVisible();

		expect(screen.getByRole('textbox')).toBeVisible();
		expect(screen.getByRole('button', { name: /click me!/i })).toBeVisible();
		expect(screen.getByRole('button', { name: /asd/i })).toBeVisible();
	});
});
