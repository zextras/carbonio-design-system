/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React from 'react';

import { DefaultTheme } from 'styled-components';

import { Text, Container, ThemeProvider, Button, generateColorSet, Row } from '../../src';
import type { ThemeObj } from '../../src/theme/theme';

declare module 'styled-components' {
	interface DefaultTheme extends ThemeObj {
		palette: ThemeObj['palette'] & {
			additional: ThemeObj['palette'][keyof ThemeObj['palette']];
			green: ThemeObj['palette'][keyof ThemeObj['palette']];
		};
	}
}

const editTheme = (theme: ThemeObj): DefaultTheme =>
	({
		...theme,
		palette: {
			...theme.palette,
			primary: generateColorSet({ regular: 'pink' }),
			text: generateColorSet({ regular: 'white' }),
			additional: generateColorSet({ regular: 'slategray' }),
			green: generateColorSet({ regular: 'green' })
		}
	}) satisfies DefaultTheme;

export const CustomThemeProvider = (): React.JSX.Element => (
	<ThemeProvider loadDefaultFont extension={editTheme}>
		<Container background="additional" height={'fit'} padding={{ all: 'large' }} gap={'0.25rem'}>
			<Row background="highlight">
				<Text>Hello world</Text>
			</Row>
			<Button label="Pink Button" onClick={(): void => undefined} />
			<Button label="Green Button" color="green" onClick={(): void => undefined} />
		</Container>
	</ThemeProvider>
);
