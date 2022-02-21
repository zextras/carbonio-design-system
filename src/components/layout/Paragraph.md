<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Paragraph component **has all the props of the Text component** and it's styled to be behave like a p html tag.

```jsx
import { Container, Divider } from '@zextras/carbonio-design-system';

<>
  <Container padding={{ bottom: 'large' }}>
    <Paragraph size="small">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
    <Paragraph size="small">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
    <Paragraph size="small">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
  </Container>
  <Divider />
  <Container padding={{ vertical: 'large' }}>
    <Paragraph size="medium">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
    <Paragraph size="medium">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
    <Paragraph size="medium">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
  </Container>
  <Divider />
  <Container padding={{ vertical: 'large' }}>
    <Paragraph size="large">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
    <Paragraph size="large">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
    <Paragraph size="large">Lorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit ametLorem upsum dolor sit amet</Paragraph>
  </Container>
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