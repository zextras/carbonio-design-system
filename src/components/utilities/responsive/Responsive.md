<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

This utility components displays its childrens only when the specified screenMode is active.

The screenMode is determined by the useScreenMode hook.

In some instances it can be useful to provide a target Window to the useScreenmode to use as viewport reference, especially when the component is used within an iFrame.

```jsx
import { Icon, Text } from '@zextras/carbonio-design-system';

const condition = () => true;
<>
<Responsive mode="mobile">
    <Text>Mobile Mode!</Text>
    <div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }}/>   
    <div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }}/>
    <Icon icon="Activity" size="large"/>
    <div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }}/>
</Responsive>

<Responsive mode="desktop">
    <Text>Desktop Mode!</Text>
    <div style={{ background: 'lightblue', width: '1.5rem', height: '1.5rem' }}/>   
    <div style={{ background: 'darkblue', width: '1.5rem', height: '1.5rem' }}/>
    <Icon icon="Activity" size="large"/>
    <div style={{ background: 'blue', width: '1.5rem', height: '1.5rem' }}/>
</Responsive>
</>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [{
    feature: 'Graphics',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Documentation',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Examples',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'I18n Compatibility',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Theme Compatibility',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Dark Mode',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Prop Types',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Index Export',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Customizability',
    status: 2,
    notes: 'To be checked'
},
];

<StatusTable items={items} />

```
