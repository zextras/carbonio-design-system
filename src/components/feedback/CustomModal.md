<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

A simplified and customizable Modal with no defined content.

```jsx
import { useState } from 'react';
import { Button, Checkbox, Text } from '@zextras/zapp-ui';

const [open, setOpen] = useState(false);
const clickHandler = () => setOpen(true);
const closeHandler = () => setOpen(false);

<>
    <Button label="Trigger Modal" onClick={clickHandler}/>
    <CustomModal
        title="Title_bold_dark"
        open={open}
        onConfirm={closeHandler}
        onClose={closeHandler}
    >
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
    </CustomModal>
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
    status: 2,
    notes: 'Barebones, needs more explanation'
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