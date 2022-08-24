<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Text with a tooltip which is visible only when text is ellipsed.

```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height={100}>
	<TextWithTooltip
		size="large"
		color="primary"
		weight="regular"
		style={{ maxWidth: '100px' }}
	>
		Hellooooooooooooooooooooooo world!
	</TextWithTooltip>
	<TextWithTooltip
		size="medium"
		color="primary"
		weight="regular"
		style={{ maxWidth: '30%' }}
	>
		Resize me to activate the tooltip!
	</TextWithTooltip>
</Container>;
```

### Change TextWithTooltip's trigger delay
```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="space-around" height={100}>
	<TextWithTooltip
        label="3 seconds before tooltip trigger Lorem ipsum dolor sit amet"
        triggerDelay={3000}
        style={{ maxWidth: '100px' }}
		overflowTooltip
	>
		3 seconds before tooltip trigger Lorem ipsum dolor sit amet
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
