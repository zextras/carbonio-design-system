<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height={100}>
	<TextWithTooltip
		size="large"
		color="primary"
		weight="regular"
		style={{ maxWidth: '100px' }}
		overflowTooltip
	>
		Hellooooooooooooooooooooooo world!
	</TextWithTooltip>
	<TextWithTooltip
		size="medium"
		color="primary"
		weight="regular"
		style={{ maxWidth: '20%' }}
		overflowTooltip
	>
		Resize me to activate the tooltip!
	</TextWithTooltip>
</Container>;
```

### Development status:

```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Documentation',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Examples',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'I18n Compatibility',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Theme Compatibility',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Dark Mode',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Prop Types',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Index Export',
		status: 'In progress',
		notes: ''
	},
	{
		feature: 'Customizability',
		status: 'In progress',
		notes: ''
	}
];

<StatusTable items={items} />;
```
