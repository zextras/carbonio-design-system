<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

IconCheckboxes can be used to turn an option on or off.

It can also be used with a label description.

The Icon and status of the component depend on the checked status, whose initial value can be set via the `defaultChecked` prop.

### Controlled

```jsx
import { useState, useCallback } from 'react';
import { Button, Container } from '@zextras/carbonio-design-system';

const [checked1, setChecked1] = useState(false);
const [checked2, setChecked2] = useState(true);
const onChange1 = useCallback(() => setChecked1((c) => !c), []);
const onChange2 = useCallback(() => setChecked2((c) => !c), []);
const invert = useCallback(() => {
    setChecked1((c) => !c);
    setChecked2((c) => !c);
}, []);
<>
    <Button style={{marginBottom: '1.25rem'}} onClick={invert} label="Invert state" />
    <Container orientation="horizontal" mainAlignment="flex-start" width="fill">
        <IconCheckbox value={checked1} onChange={onChange1} icon="Text" size="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="ArrowUpward" size="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="CheckmarkSquare" size="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="Edit2Outline" size="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="AttachOutline" size="small" />
    </Container>

    <Container orientation="horizontal" mainAlignment="flex-start" width="fill" style={{marginTop: '1.5rem'}}>
        <IconCheckbox value={checked1} onChange={onChange1} icon="Text" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="ArrowUpward" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="CheckmarkSquare" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="Edit2Outline" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="AttachOutline" />
    </Container>

    <Container orientation="horizontal" mainAlignment="flex-start" width="fill" style={{marginTop: '1.5rem'}}>
        <IconCheckbox value={checked1} onChange={onChange1} icon="Text" size="large" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="ArrowUpward" size="large" />
        <IconCheckbox disabled value={checked2} onChange={onChange2} icon="CheckmarkSquare" size="large" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="Edit2Outline" size="large" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="AttachOutline" size="large" />
    </Container>

    <Container orientation="horizontal" mainAlignment="flex-start" width="fill" style={{marginTop: '1.5rem'}}>
        <IconCheckbox value={checked1} onChange={onChange1} icon="Text" size="large" margin="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="ArrowUpward" size="large" margin="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="CheckmarkSquare" size="large" margin="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="Edit2Outline" size="large" margin="small" />
        <IconCheckbox value={checked2} onChange={onChange2} icon="AttachOutline" size="large" margin="small" />
    </Container>
</>
```

### Uncontrolled

```jsx
import {useState} from 'react';
import {Container} from '@zextras/carbonio-design-system';

<>
    <Container orientation="horizontal" mainAlignment="flex-start" width="fill">
        <IconCheckbox defaultChecked={true} onChange={console.log} borderRadius="regular" icon="Text" size="small" />
        <IconCheckbox defaultChecked={false} onChange={console.log} borderRadius="regular" icon="ArrowUpward" />
        <IconCheckbox defaultChecked={true} onChange={console.log} borderRadius="regular" icon="CheckmarkSquare" size="large" />
        <IconCheckbox defaultChecked={false} onChange={console.log} borderRadius="regular" icon="Edit2Outline" size="large" margin="small" />
        <IconCheckbox defaultChecked={true} onChange={console.log} borderRadius="regular" icon="AttachOutline" size="large" margin="medium" />
    </Container>
    
    <Container orientation="horizontal" mainAlignment="flex-start" width="fill" style={{marginTop: '1.5rem'}}>
        <IconCheckbox defaultChecked={true} onChange={console.log} icon="BookOpen" />
        <IconCheckbox defaultChecked={false} onChange={console.log} icon="Camera" label="I have a label!" />
    </Container>
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
    status: 3,
    notes: 'Color customizations are missing, also maybe an alternative to switch with the state'
}
];

<StatusTable items={items} />

```
