<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

FormSection and FormSubSection are used to display parts of complex forms.

```jsx
import { Container, Padding, Text, FormSubSection, FormRow, Button } from '@zextras/zapp-ui';

<Container orientation="vertical" mainAlignment="space-around" background="gray5" width="60%">
    <FormSection label="Settings A">
        <FormSubSection label="SubSettings A">
            <FormRow label="Something">
                <Button label="Hello"/>
            </FormRow>
        </FormSubSection>
        <FormSubSection label="SubSettings B">
            <Button label="Hello"/>
        </FormSubSection>
        <FormSubSection label="SubSettings C">
            <Button label="Hello"/>
        </FormSubSection>
        <FormSubSection label="SubSettings D">
            <Button label="Hello"/>
        </FormSubSection>
    </FormSection>
    <FormSection label="Settings B">
        <FormSubSection label="SubSettings A">
            <Button label="Hello"/>
        </FormSubSection>
        <FormSubSection label="SubSettings B">
            <Button label="Hello"/>
        </FormSubSection>
        <FormSubSection label="SubSettings C">
            <Button label="Hello"/>
        </FormSubSection>
        <FormSubSection label="SubSettings D">
            <Button label="Hello"/>
        </FormSubSection>
    </FormSection>
</Container>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/zapp-ui';
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