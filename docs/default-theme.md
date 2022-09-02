<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Colors

```jsx noeditor
import Palette from './components/Palette';
import { Theme } from '../src/theme/theme';

<Palette palette={ Theme.palette }/>;

```

## Sizes

### Font

```jsx noeditor
import { map } from 'lodash';
import { Theme } from '../src/theme/theme';
import { Text } from '../src/components/basic/Text';
import { Container } from '../src/components/layout/Container';

<Container orientation="vertical" padding={{ all: 'large' }}>
	{
		map(
			Theme.sizes.font,
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
