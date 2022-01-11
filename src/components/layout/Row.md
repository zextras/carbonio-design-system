<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

**Has all the props of the Container component and the props listed above.**

The 'Row' should be used in the 'Container' to compose custom components. 

### Row
```jsx
import { Container, Text } from '@zextras/zapp-ui';

<Container orientation="horizontal">
    <Row><Text>1</Text></Row>
    <Row><Text>2</Text></Row>
    <Row><Text>3</Text></Row>
    <Row><Text>4</Text></Row>
    <Row takeAvailableSpace={true}><Text>55555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555555</Text></Row>
    <Row><Text>6</Text></Row>
    <Row><Text>7</Text></Row>
    <Row><Text>8</Text></Row>
    <Row><Text>9</Text></Row>
    <Row><Text>10</Text></Row>
</Container>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/zapp-ui';
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