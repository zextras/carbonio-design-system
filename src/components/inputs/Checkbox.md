<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Checkboxes can be used to turn an option on or off.

It can also be used with a label description.

The Icon and status of the component depend on the checked status, whose initial value can be set via the `defaultChecked` prop.

### Controlled

```jsx
import {useState, useCallback} from 'react';
const [checked1, setChecked1] = useState(false);
const [checked2, setChecked2] = useState(false);

const onClick1 = useCallback(() => setChecked1((c) => !c), []);
const onClick2 = useCallback(() => setChecked2((c) => !c), []);
<>
    <Checkbox value={checked1} onClick={onClick1} />
    <Checkbox value={checked2} onClick={onClick2} label="I have a label!" />
    <Checkbox value={checked2} onClick={onClick2} disabled={true} label="Disabled" />
</>
```

### Uncontrolled

```jsx
import {useState} from 'react';

<>
    <Checkbox defaultChecked={true} onChange={console.log}/>
    <Checkbox defaultChecked={false} onChange={console.log} label="I have a label!"/>
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
    status: 1,
    notes: ''
}
];

<StatusTable items={items} />

```