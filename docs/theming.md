<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

A theme is an extension of the default theme bundled within the `@zextras/carbonio-design-system` package.

The theme customization can be accomplished by providing a modifier function to the `extension` prop:

```jsx
import { useContext } from 'react';
import { Text, Container, ThemeProvider, ThemeContext, useSetCustomTheme, Button, generateColorSet } from '@zextras/carbonio-design-system';
import { map } from 'lodash';

const editTheme = (theme) => ({
	...theme,
	palette: {
		...theme.palette,
		primary: generateColorSet({ regular: 'pink' }),
		text: generateColorSet({ regular: 'white' }),
		additional: generateColorSet({ regular: 'slategray' }),
		green: generateColorSet({ regular: 'green' })
	}
});
<ThemeProvider loadDefaultFont extension={editTheme}>
		<Container background="additional" height={500}>
			<Text>
				Hello world
			</Text>
			<Button label="Pink Button" />
			<Button label="Green Button" backgroundColor="green" />
		</Container>
</ThemeProvider>
```

```jsx static

const editTheme = produce((theme) => {
    theme.palette.text = generateColorSet({ regular: 'lightgrey' });
    theme.palette.primary = generateColorSet({ regular: 'pink' });
    theme.palette.additional = generateColorSet({ regular: 'slategray' });
    theme.palette.green = generateColorSet({ regular: 'green' });
});

```

When using typescript and [styled-components](https://styled-components.com/),
in order to have the theme correctly typed inside a styled component declaration,
the augmentation of the styled-components module default theme is required.
To do so, create a declaration file styled-components.d.ts in the root folder of your project and
re-export the interface DefaultTheme, extending the Design System Theme type (or your theme type if case you have a custom theme)

```typescript noedit static
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeObj {}
}
```
