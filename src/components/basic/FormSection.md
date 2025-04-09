<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

FormSection and FormSubSection are used to display parts of complex forms.

***Nb***. FormSubSection component has to be wrapped by FormSection one.

A ***common use*** of the FormSubSection is
to set a Container wrapper inside it with a gap of 0.5rem which is the default designed value,
but it is a developer responsibility to respect the design because in some cases it will be necessary to use a different gap (for this reason it is useless to define it on the DS side).

```jsx
import { Container, Padding, Text, FormSubSection, Button, Input } from '@zextras/carbonio-design-system';

<Container orientation="vertical" mainAlignment="space-around" background="gray5" width="60%">
    <FormSection label="FormSection title">
        <FormSubSection>
           <Container gap="0.5rem">
               <Input label="Label 1" />
               <Input label="Label 2" />
               <Input label="Label 3" />
           </Container>
        </FormSubSection>
        <FormSubSection label="FormSubSection with title">
            <Container gap="0.5rem">
                <Button label="Hello"/>
                <Button label="World"/>
            </Container>
        </FormSubSection>
        <FormSubSection label="FormSubSection with custom gap">
            <Container gap="2rem">
                <Input label="Label 1" />
                <Input label="Label 2" />
                <Input label="Label 3" />
            </Container>
        </FormSubSection>
    </FormSection>
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