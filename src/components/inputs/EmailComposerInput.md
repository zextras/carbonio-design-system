<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Input used in the Email Compose.

It can have the placeholder of two types:
+ **inline**: is in the same row of the text;
+ **default**: it goes above the text.

### Controlled EmailComposerInput

```jsx
import { useState, useRef } from 'react';

const [inputValue, setInputValue] = useState('');

<>
    <div>
        <EmailComposerInput placeholder="Object:" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
        <EmailComposerInput placeholder="Object:" placeholderType="inline" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
    </div>
</>
```

### Uncontrolled EmailComposerInput

```jsx
import { useState, useRef } from 'react';

<>
    <div>
        <EmailComposerInput placeholder="Object:" onChange={(e) => console.log("change", e.target.value)} />
        <EmailComposerInput placeholder="Object:" placeholderType="inline" onChange={(e) => console.log("change", e.target.value)} />
    </div>
</>
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