<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

See [Input](#/Components/Inputs/Input) for details about Input component 

```jsx
import { useState } from 'react';
import { Container, Padding, Text, PasswordInput, Icon, Button } from '@zextras/carbonio-design-system';

const [value, setValue] = useState('Some Controlled value');

<Container orientation="horizontal" mainAlignment="center" background="gray5" height="fill" width="fill">
    <Container orientation="vertical" mainAlignment="space-around" height="18.75rem" width="50%">
        <PasswordInput hasError={true} label="Password"/>
        <PasswordInput disabled label="Disabled Password"/>
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
