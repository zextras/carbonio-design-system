<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Vertical Padding
```jsx
<div style={{ border: '1px solid black' }}>
    <Padding vertical="small">
        <div style={{ backgroundColor: 'grey', height: '10px', width: '10px' }}/>
    </Padding>
</div>
```

Horizontal Padding
```jsx
<div style={{ border: '1px solid black' }}>
    <Padding horizontal="small">
        <div style={{ backgroundColor: 'grey', height: '10px', width: '10px' }}/>
    </Padding>
</div>
```

Selective Padding
```jsx
<div style={{ border: '1px solid black' }}>
    <Padding top="extrasmall" right="small" bottom="small" left="extrasmall">
        <div style={{ backgroundColor: 'grey', height: '10px', width: '10px' }}/>
    </Padding>
</div>
```

Padding through value
```jsx
<div style={{ border: '1px solid black' }}>
    <Padding value="10px small extralarge">
        <div style={{ backgroundColor: 'grey', height: '10px', width: '10px' }}/>
    </Padding>
</div>
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
