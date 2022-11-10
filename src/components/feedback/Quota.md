<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The quota element is used to display the user's quota usage percentage.

It can also accept all props of [Container](#/Components/Layout/Container) component.

```jsx
import { Container, Padding } from '@zextras/carbonio-design-system';
<Container padding={{ all: 'medium' }} width="fill" background="gray5" orientation="horizontal" crossAlignment="center">
  <Container>
    <Padding all="extrasmall">
        <Quota fill={10} />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={25} />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={50} />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={75} />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={90} />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={100} />
    </Padding>
  </Container>
  <Container>
    <Padding all="extrasmall">
        <Quota fill={10} />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={25} fillBackground="secondary" />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={50} fillBackground="success" />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={75} fillBackground="warning" />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={90} fillBackground="error" />
    </Padding>
    <Padding all="extrasmall">
        <Quota fill={100} fillBackground="info" />
    </Padding>
  </Container>
  <Container>
    <Padding all="extrasmall">
        <Quota background="gray1" fill={10} fillBackground="gray6" />
    </Padding>
    <Padding all="extrasmall">
        <Quota background="gray2" fill={25} fillBackground="secondary" />
    </Padding>
    <Padding all="extrasmall">
        <Quota background="gray3" fill={50} fillBackground="success" />
    </Padding>
    <Padding all="extrasmall">
        <Quota background="gray4" fill={75} fillBackground="warning" />
    </Padding>
    <Padding all="extrasmall">
        <Quota background="gray5" fill={90} fillBackground="error" />
    </Padding>
    <Padding all="extrasmall">
        <Quota background="gray6" fill={100} fillBackground="info" />
    </Padding>
  </Container>
</Container>
```

#### Custom height
```jsx
import { Container, Padding } from '@zextras/carbonio-design-system';

<Quota fill={40} height="1.25rem" background="gray4" /> 

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
    status: 1,
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
    status: 1,
    notes: ''
},
];

<StatusTable items={items} />

```
