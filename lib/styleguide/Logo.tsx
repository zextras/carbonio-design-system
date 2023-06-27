/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { auto, disable, enable, isEnabled } from 'darkreader';

import { useDirection } from './useDirection';
import { Button, Container, Switch, Text, ThemeProvider } from '../../src';

const Logo = (): JSX.Element => {
	const [mode, setMode] = useState('auto');
	const [direction, setDirection] = useDirection();

	useEffect(() => {
		switch (mode) {
			case 'light':
				auto(false);
				disable();
				break;
			case 'dark':
				auto(false);
				enable({ sepia: -10 });
				break;
			case 'auto':
			default:
				auto({});
				break;
		}
	}, [mode]);

	const icon = useMemo(() => {
		switch (mode) {
			case 'light':
				return 'MoonOutline';
			case 'dark':
				return 'SunOutline';
			case 'auto':
			default:
				return isEnabled() ? 'SunOutline' : 'MoonOutline';
		}
	}, [mode]);

	const next = useMemo(() => {
		switch (mode) {
			case 'light':
				return 'dark';
			case 'dark':
				return 'light';
			case 'auto':
			default:
				return isEnabled() ? 'light' : 'dark';
		}
	}, [mode]);

	const toggleRtl = useCallback(() => {
		setDirection((prevState) => {
			const nextState = prevState === 'ltr' ? 'rtl' : 'ltr';
			document.dir = nextState;
			return nextState;
		});
	}, [setDirection]);

	return (
		<ThemeProvider>
			<Container crossAlignment="center" gap={'0.5rem'}>
				<img src="./BGURLest.png" width={150} alt={'Bgurl'} />
				<Text size="large" weight="medium" color="primary">
					Zextras Zapp UI
				</Text>
				<Text size="large" weight="regular" color="primary">
					Style Guide
				</Text>
				<Button width="fill" icon={icon} onClick={(): void => setMode(next)} label="MODE" />
				<Switch label={'RTL'} onClick={toggleRtl} defaultChecked={direction === 'rtl'} />
			</Container>
		</ThemeProvider>
	);
};
export default Logo;
