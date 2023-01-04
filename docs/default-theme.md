<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Colors

```jsx noeditor
import Palette from './components/Palette';
import { useTheme } from '@zextras/carbonio-design-system';

const theme = useTheme();

<Palette palette={theme.palette} />;

```

## Sizes

### Font

```jsx noeditor
import { map } from 'lodash';
import { useTheme, Container, Text } from '@zextras/carbonio-design-system';

const theme = useTheme();

<Container orientation="vertical" padding={{ all: 'large' }}>
	{
		map(
			theme.sizes.font,
			(size, key) => (
				<Text key={key} size={key}>This text is {size}</Text>
			)
		)
	}
</Container>;
```

## Default theme object

```jsx noeditor
import ThemePrinter from './components/ThemePrinter';

<ThemePrinter />
```
