/*
 * SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

// noinspection ES6PreferShortImport,HtmlUnknownTarget
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { enable, disable, auto, isEnabled } from 'darkreader';
import Text from '../../src/components/basic/Text';
import Button from '../../src/components/basic/Button';
import Container from '../../src/components/layout/Container';
import Padding from '../../src/components/layout/Padding';
import { ThemeProvider } from '../../src/theme/theme-context-provider';

const Logo: React.VFC = () => {
	const [mode, setMode] = useState('auto');

	useEffect(() => {
		switch (mode) {
			case 'light':
				disable();
				break;
			case 'dark':
				enable({ sepia: -10 });
				break;
			case 'auto':
			default:
				auto({ sepia: -10 });
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

	const changeMode = useCallback(() => setMode(next), [next]);

	return (
		<ThemeProvider>
			<Container crossAlignment="center">
				<img src="./BGURLest.png" width={150} alt={'Bgurl'} />
				<Padding top="small">
					<Text size="large" weight="medium" color="primary">
						Zextras Zapp UI
					</Text>
				</Padding>
				<Text size="large" weight="regular" color="primary">
					Style Guide
				</Text>
				<Padding top="medium">
					<Button width="fill" icon={icon} onClick={changeMode} label="MODE" />
				</Padding>
			</Container>
		</ThemeProvider>
	);
};
export default Logo;
