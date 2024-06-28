<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Value / MaxValue

```jsx
<>
    <Badge />
    <br />
    <Badge value={'With text'}/>
    <br/>
    <Badge value="1" />
    <br />
    <Badge value={10} />
    <br/ >
    <Badge value={999} />
    <br />
    <Badge value={1000} />
    <br />
    <Badge value={2000} maxValue={1500} />    
</>
```

### BackgroundColor / Color
```jsx
import { Text } from '@zextras/carbonio-design-system';
<>
    <Badge value={10} backgroundColor={'error'} color={'gray6'} />
    <br />
    <Badge value="Sent" backgroundColor={'gray4'} />
    <br/>
    <Badge value="Sent" backgroundColor={'primary'} color={'gray6'} />
    <br/>
    <Text overflow="break-word">Lorem ipsum dolor sit <Badge value="amet" backgroundColor={'warning'} /></Text>
</>
```

### Icon
```jsx
<>
    <Badge icon={'AcceptanceMeeting'} color={'primary'} /> <Badge icon={'AcceptanceMeetingOutline'} color={'primary'} /> <Badge icon={'AlertTriangle'} color={'error'}/> <Badge icon={'AlertTriangleOutline'} color={'error'} />
    <br/>
    <Badge icon={'MoreVertical'} /> <Badge icon={'Music'} color={'warning'} /> <Badge icon={'ArrowIosUpwardOutline'} /> <Badge icon={'ArrowIosDownwardOutline'} /> 
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