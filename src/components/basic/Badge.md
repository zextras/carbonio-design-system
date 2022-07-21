<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Counter Badge 

```jsx
<>
    <Badge value="1" />
    <br/>
    <Badge value={10} type="unread" />
    <br/>
    <Badge value={100} type="unread" />
    <br/>
    <Badge value={1000} type="unread" />

</>
```

### Label Badge
```jsx
import { Text, ContactListItem } from '@zextras/carbonio-design-system';
<>
    <Badge value="Sent" />
    <br/>
    <Badge value="Sent" type="unread" />
    <br/>
    <Text overflow="break-word">Lorem ipsum dolor sit <Badge value="amet" type="unread" /></Text>
</>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [{
    feature: 'Graphics',
    status: 1,
    notes: ''
},{
    feature: 'Documentation',
    status: 3,
    notes: ''
},{
    feature: 'Examples',
    status: 2,
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
    status: 2,
    notes: 'Only accepts a string or number as content'
},
];

<StatusTable items={items} />

```