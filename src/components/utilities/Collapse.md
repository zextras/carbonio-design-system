<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

This is a component that simplifies the control of components that should appear or disappear.

```jsx
import { Icon, Button, Padding } from '@zextras/carbonio-design-system';
import { useState } from 'react';
let [open, setOpen] = useState(true);
const toggle = () => {
	setOpen(!open);
};

<>
    <Button onClick={toggle} label="Click Me!"/>
    <Padding all="large">
        <Collapse orientation="vertical" open={open}>
            <div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }}/>
            <div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }}/>
            <Icon icon="Activity" size="large"/>
            <div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }}/>
        </Collapse>
    </Padding>
    <Padding all="large">
        <Collapse orientation="horizontal" open={open}>
            <div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }}/>
            <div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }}/>
            <Icon icon="Activity" size="large"/>
            <div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }}/>
        </Collapse>
    </Padding>
</>
```

### Development status:

```jsx
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Documentation',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Examples',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'I18n Compatibility',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Theme Compatibility',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Dark Mode',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Prop Types',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Index Export',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Customizability',
		status: 2,
		notes: 'To be checked'
	}
];

<StatusTable items={items} />;
```
