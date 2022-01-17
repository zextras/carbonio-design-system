<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

This is a component that acts as Error Boundary limiting the propagation of errors to its children.

The onError function can be used to perform operations such as logging.


```jsx
import { useState } from 'react';
import { Button, Text, Container, Padding } from '@zextras/carbonio-design-system';

const [ evil, turnEvil ] = useState(false);

const GoodComponent = ({ good }) => {
    if (!good) {
        throw new Error('Join the dark side, accept my cookies!');
    }
    return (
        <>
            <Text size="large" color="success">I'm a good component!</Text>
        </>
    );
};

<Catcher>
    <Container width="50%">
        <Button
            icon="CodeDownload"
            label="Download virus"
            onClick={() => turnEvil(true)}
            backgroundColor="gray2"
            labelColor="error"
        />
        <Padding all="small">
            <Catcher>
                <GoodComponent good={true}/>
            </Catcher>
        </Padding>
        <Padding all="small">
            <Catcher>
                <GoodComponent good={true}/>
            </Catcher>
        </Padding>
        <Padding all="small">
            <Catcher>
                <GoodComponent good={true}/>
            </Catcher>
        </Padding>
        <Padding all="small">
            <Catcher onError={() => console.log('I caught an error')}>
                <GoodComponent good={!evil}/>
            </Catcher>
        </Padding>
        <Padding all="small">
            <Catcher>
                <GoodComponent good={true}/>
            </Catcher>
        </Padding>
        <Padding all="small">
            <Catcher>
                <GoodComponent good={true}/>
            </Catcher>
        </Padding>
    </Container>
</Catcher>
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