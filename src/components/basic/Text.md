<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Text represents a simple text. It can be customized in size, color, weight and overflow.
It accepts the disabled status, which is also set as attribute on the final div tag.

### Sizes
```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height="fill">
    <Text size="extralarge">Hello world</Text>
    <Text size="large">Hello world</Text>
    <Text size="medium">Hello world</Text>
    <Text size="small">Hello world</Text>
    <Text size="extrasmall">Hello world</Text>
</Container>
```

### Colors
```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height="fill">
    <Text color="primary">Hello world</Text>
    <Text color="secondary">Hello world</Text>
    <Text color="text">Hello world</Text>
    <Text color="success">Hello world</Text>
    <Text color="error">Hello world</Text>
</Container>
```

### Disabled
```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height="fill">
    <Text disabled color="primary">Hello world</Text>
    <Text disabled color="secondary">Hello world</Text>
    <Text disabled color="text">Hello world</Text>
    <Text disabled color="success">Hello world</Text>
    <Text disabled color="error">Hello world</Text>
</Container>
```

### Weight

```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height="fill">
    <Text weight="light">Hello world</Text>
    <Text weight="regular">Hello world</Text>
    <Text weight="medium">Hello world</Text>
    <Text weight="bold">Hello world</Text>
</Container>
```

### Overflow
```jsx
import { Container } from '@zextras/carbonio-design-system';

const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et augue risus. In fringilla sodales augue eu porttitor. Integer faucibus aliquam venenatis. Fusce eleifend sodales tellus vel malesuada. Mauris posuere diam ac tellus sollicitudin porta. Vestibulum pretium nulla nulla, vel blandit elit fringilla quis. Quisque neque nisl, condimentum malesuada turpis ac, viverra fermentum est. Nullam dui arcu, imperdiet quis placerat viverra, euismod eget odio. Ut id accumsan neque, vitae varius urna. Vestibulum scelerisque, velit eget mollis faucibus, libero nunc accumsan arcu, a dignissim ligula nunc nec nibh. Cras efficitur lobortis purus sit amet suscipit. Quisque pretium metus ut erat sagittis sollicitudin. Maecenas varius nisi eget rhoncus euismod.';

<Container orientation="horizontal" mainAlignment="space-around" height="fill">
    <Text overflow="ellipsis">{lorem}</Text>
    <Text overflow="break-word">{lorem}</Text>
</Container>
```

### Development status:

```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 1,
		notes: ''
	},
	{
		feature: 'Documentation',
		status: 1,
		notes: ''
	},
	{
		feature: 'Examples',
		status: 1,
		notes: ''
	},
	{
		feature: 'I18n Compatibility',
		status: 1,
		notes: ''
	},
	{
		feature: 'Theme Compatibility',
		status: 1,
		notes: ''
	},
	{
		feature: 'Dark Mode',
		status: 1,
		notes: ''
	},
	{
		feature: 'Prop Types',
		status: 1,
		notes: ''
	},
	{
		feature: 'Index Export',
		status: 1,
		notes: ''
	},
	{
		feature: 'Customizability',
		status: 1,
		notes: ''
	}
];

<StatusTable items={items} />;
```
