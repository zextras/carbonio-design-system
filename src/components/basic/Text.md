<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-between" height={500}>
	<Container orientation="vertical" mainAlignment="space-around" height="fill">
		<Text size="large" color="primary" weight="regular">
			Hello world
		</Text>
		<Text size="medium" color="primary" weight="regular">
			Hello world
		</Text>
		<Text size="small" color="primary" weight="regular">
			Hello world
		</Text>
		<Text size="large" color="secondary" weight="regular">
			Hello world
		</Text>
		<Text size="medium" color="secondary" weight="regular">
			Hello world
		</Text>
		<Text size="small" color="secondary" weight="regular">
			Hello world
		</Text>
		<Text size="large" color="text" weight="regular">
			Hello world
		</Text>
		<Text size="medium" color="text" weight="regular">
			Hello world
		</Text>
		<Text size="small" color="text" weight="regular">
			Hello world
		</Text>
		<Text size="large" color="success" weight="regular">
			Hello world
		</Text>
		<Text size="medium" color="success" weight="regular">
			Hello world
		</Text>
		<Text size="small" color="success" weight="regular">
			Hello world
		</Text>
		<Text size="large" color="error" weight="regular">
			Hello world
		</Text>
		<Text size="medium" color="error" weight="regular">
			Hello world
		</Text>
		<Text size="small" color="error" weight="regular">
			Hello world
		</Text>
	</Container>
	<Container orientation="vertical" mainAlignment="space-around" height="fill">
		<Text size="large" color="primary" weight="medium">
			Hello world
		</Text>
		<Text size="medium" color="primary" weight="medium">
			Hello world
		</Text>
		<Text size="small" color="primary" weight="medium">
			Hello world
		</Text>
		<Text size="large" color="secondary" weight="medium">
			Hello world
		</Text>
		<Text size="medium" color="secondary" weight="medium">
			Hello world
		</Text>
		<Text size="small" color="secondary" weight="medium">
			Hello world
		</Text>
		<Text size="large" color="text" weight="medium">
			Hello world
		</Text>
		<Text size="medium" color="text" weight="medium">
			Hello world
		</Text>
		<Text size="small" color="text" weight="medium">
			Hello world
		</Text>
		<Text size="large" color="success" weight="medium">
			Hello world
		</Text>
		<Text size="medium" color="success" weight="medium">
			Hello world
		</Text>
		<Text size="small" color="success" weight="medium">
			Hello world
		</Text>
		<Text size="large" color="error" weight="medium">
			Hello world
		</Text>
		<Text size="medium" color="error" weight="medium">
			Hello world
		</Text>
		<Text size="small" color="error" weight="medium">
			Hello world
		</Text>
	</Container>
	<Container orientation="vertical" mainAlignment="space-around" height="fill">
		<Text size="large" color="primary" weight="bold">
			Hello world
		</Text>
		<Text size="medium" color="primary" weight="bold">
			Hello world
		</Text>
		<Text size="small" color="primary" weight="bold">
			Hello world
		</Text>
		<Text size="large" color="secondary" weight="bold">
			Hello world
		</Text>
		<Text size="medium" color="secondary" weight="bold">
			Hello world
		</Text>
		<Text size="small" color="secondary" weight="bold">
			Hello world
		</Text>
		<Text size="large" color="text" weight="bold">
			Hello world
		</Text>
		<Text size="medium" color="text" weight="bold">
			Hello world
		</Text>
		<Text size="small" color="text" weight="bold">
			Hello world
		</Text>
		<Text size="large" color="success" weight="bold">
			Hello world
		</Text>
		<Text size="medium" color="success" weight="bold">
			Hello world
		</Text>
		<Text size="small" color="success" weight="bold">
			Hello world
		</Text>
		<Text size="large" color="error" weight="bold">
			Hello world
		</Text>
		<Text size="medium" color="error" weight="bold">
			Hello world
		</Text>
		<Text size="small" color="error" weight="bold">
			Hello world
		</Text>
	</Container>
</Container>;
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
		status: 3,
		notes: ''
	},
	{
		feature: 'Examples',
		status: 1,
		notes: 'Could be improved by splitting up the prop examples'
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
