<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Snackbar is the component which informs the user of a process that an app has performed or will perform.
It appears temporarily, towards the bottom of the screen, it does not interrupt the user experience and by default it does not require user input to disappear.

```jsx
import { useState } from 'react';
import { Button, Container } from '@zextras/zapp-ui';

const [snack1, setSnack1] = useState(false);
const [snack2, setSnack2] = useState(false);
const [snack3, setSnack3] = useState(false);
const [snack4, setSnack4] = useState(false);
<>
    <Container orientation="horizontal" mainAlignment="space-between" width="400px">
        <Button type="outlined" color="success" label="Success" onClick={() => setSnack1(true)} />
        <Button type="outlined" color="info" label="Info" onClick={() => setSnack2(true)} />
        <Button type="outlined" color="warning" label="Warning" onClick={() => setSnack3(true)} />
        <Button type="outlined" color="error" label="Error" onClick={() => setSnack4(true)} />
    </Container>

    <Snackbar open={snack1} onClose={() => setSnack1(false)} type="success" label="Lorem Ipsum dolor sit amet" />
    <Snackbar open={snack2} onClose={() => setSnack2(false)} type="info" label="Lorem Ipsum dolor sit amet" />
    <Snackbar open={snack3} onClose={() => setSnack3(false)} type="warning" label="Lorem Ipsum dolor sit amet" />
    <Snackbar open={snack4} onClose={() => setSnack4(false)} type="error" label="Lorem Ipsum dolor sit amet" />
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
    status: 2,
    notes: 'Might need custom content at some point'
},
];

<StatusTable items={items} />

```