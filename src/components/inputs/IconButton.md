<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The IconButton is a button that contains just an Icon and no label.
```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="vertical" mainAlignment="space-around" background="gray5" height={400} width="50%">
    <IconButton icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
    <IconButton iconColor="gray6" backgroundColor="gray1" icon="Plus" onClick={click}/>
    <IconButton size="large" icon="Activity" onClick={click}/>
    <IconButton size="large" icon="Activity" onClick={click} disabled />
</Container>
```

### Development status:

It could make sense to allow the normal Button to have no label and deprecate this component.
```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [{
    feature: 'Graphics',
    status: 1,
    notes: ''
},{
    feature: 'Documentation',
    status: 1,
    notes: ''
},{
    feature: 'Examples',
    status: 1,
    notes: ''
},{
    feature: 'Controlled/Uncontrolled mode',
    status: 1,
    notes: ''
},{
    feature: 'I18n Compatibility',
    status: 1,
    notes: ''
},{
    feature: 'Theme Compatibility',
    status: 1,
    notes: ''
},{
    feature: 'Dark Mode',
    status: 1,
    notes: ''
},{
    feature: 'Prop Types',
    status: 1,
    notes: ''
},{
    feature: 'Index Export',
    status: 1,
    notes: ''
},{
    feature: 'Customizability',
    status: 1,
    notes: ''
}
];

<StatusTable items={items} />

```