<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The input component works like a standard html input, and can be either [controlled](https://reactjs.org/docs/forms.html#controlled-components) or [uncontrolled](https://reactjs.org/docs/uncontrolled-components.html).
```jsx
import { useState } from 'react';
import { Container, Padding, Text, PasswordInput, Icon, Button } from '@zextras/carbonio-design-system';

const [value, setValue] = useState('Some Controlled value');

<Container orientation="horizontal" mainAlignment="center" background="gray5" height="fill" width="fill">
    <Container orientation="vertical" mainAlignment="space-around" height="300px" width="50%">
        <Input autoComplete="on" autoFocus label="Input" defaultValue="Default Value" />
        <Input
            label="Some other Input"
            value={value}
            onChange={
                (ev) => {
                    setValue(ev.target.value)
                }
            }
            backgroundColor="gray6"
        />
        <Input 
            label="Input with custom icon"
            CustomIcon={({ hasFocus }) => <Icon icon="AgendaOutline" size="large" color={hasFocus ? 'primary' : 'text'} />}
        />
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