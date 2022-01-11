<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

This Component is displayed at the bottom of a list.

```jsx
import { Container, List } from '@zextras/zapp-ui';

<Container orientation="vertical" mainAlignment="space-around" background="gray5" height="fit" width="60%">
    <LoadMore label="Loading..." onRender={() => console.log('You saw me!')}/>
</Container>
```

```jsx
import { useState } from 'react';
import { Container, List, Divider, Text } from '@zextras/zapp-ui';
const numbers = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
const [data, setData] = useState(numbers);

const itemFactory = ({ index }) => {
    return (
        <>
            <Container
                key={index}
                height="64px"
                orientation="horizontal"
                mainAlignment="flex-start"
                background="gray5"
                padding={{ all: 'small' }}
            >
                <Container
                    width="32px"
                    height="32px"
                    borderRadius="round"
                    background="highlight"
                />
                <Container
                    width="fit"
                    padding={{ all: 'medium' }}
                >
                    <Text>{data[index]}</Text>
                </Container>
            </Container>
            <Divider color='gray6'/>
        </>
    );
}
// The list will be rendered
<Container height="400px" width="50%" background="gray3">
    <List
        Factory={itemFactory}
        amount={data.length}
        footer={() => <LoadMore label="Hello"/>}
    />
</Container>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/zapp-ui';
import StatusTable from 'status-table';
const items = [{
    feature: 'Graphics',
    status: 2,
    notes: ''
},{
    feature: 'Documentation',
    status: 3,
    notes: ''
},{
    feature: 'Examples',
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
    status: 3,
    notes: ''
},
];

<StatusTable items={items} />

```