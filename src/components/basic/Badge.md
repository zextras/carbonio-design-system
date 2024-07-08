<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Value / MaxValue

```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container crossAlignment={'flex-start'} gap={'1rem'}>
    <Badge value={''}/>
    <Badge value={'With text'}/>
    <Badge value="1" />
    <Badge value={10} />
    <Badge value={999} />
    <Badge value={1000} />
    <Badge value={2000} maxValue={1500} />    
</Container>
```

### BackgroundColor / Color
```jsx
import { Container, Text } from '@zextras/carbonio-design-system';
<Container crossAlignment={'flex-start'} gap={'1rem'}>
    <Badge value={10} backgroundColor={'error'} color={'gray6'} />
    <Badge value="Sent" backgroundColor={'gray4'} />
    <Badge value="Sent" backgroundColor={'primary'} color={'gray6'} />
    <Text overflow="break-word">Lorem ipsum dolor sit <Badge value="amet" backgroundColor={'warning'} /></Text>
</Container>
```

### Icon
```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container crossAlignment={'flex-start'}>
    <Container mainAlignment={'flex-start'} orientation={'horizontal'}>
        <Badge icon={'QuestionMarkOutline'} color={'primary'} />
        <Badge icon={'AcceptanceMeetingOutline'} color={'primary'} />
        <Badge icon={'AlertTriangle'} color={'error'}/>
        <Badge icon={'AlertTriangleOutline'} color={'error'} />
    </Container>
    <Container mainAlignment={'flex-start'} orientation={'horizontal'}>
        <Badge icon={'MoreVertical'} />
        <Badge icon={'Music'} color={'warning'} />
        <Badge icon={'ChevronUp'} backgroundColor={'primary'} color={'gray6'}  />
        <Badge icon={'ArrowIosDownwardOutline'} />
    </Container>    
</Container>
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