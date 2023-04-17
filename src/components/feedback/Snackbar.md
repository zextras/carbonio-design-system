<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Snackbar is the component which informs the user of a process that an app has performed or will perform.
It appears temporarily, towards the bottom of the screen, it does not interrupt the user experience and by default it does not require user input to disappear.

```jsx
import { useState } from 'react';
import { Button, Container } from '@zextras/carbonio-design-system';

const [snack1, setSnack1] = useState(false);
const [snack2, setSnack2] = useState(false);
const [snack3, setSnack3] = useState(false);
const [snack4, setSnack4] = useState(false);
const [snack5, setSnack5] = useState(false);
const [snack6, setSnack6] = useState(false);
const [snack7, setSnack7] = useState(false);
const [snack8, setSnack8] = useState(false);
<>
    <Container orientation="horizontal" mainAlignment="space-between" wrap="wrap" gap="10px">
        <Button type="outlined" color="success" label="Success" onClick={() => setSnack1(true)} />
        <Button type="outlined" color="info" label="Info" onClick={() => setSnack2(true)} />
        <Button type="outlined" color="warning" label="Warning" onClick={() => setSnack3(true)} />
        <Button type="outlined" color="error" label="Error" onClick={() => setSnack4(true)} />
        <Button type="default" color="primary" label="Very long text and action" onClick={() => setSnack5(true)} />
        <Button type="default" color="secondary" label="Short text and long action" onClick={() => setSnack6(true)} />
        <Button type="default" color="gray4" label="Long text and short action" onClick={() => setSnack7(true)} />
        <Button type="default" color="warning" label="Medium text and medium action" onClick={() => setSnack8(true)} />
    </Container>

    <Snackbar open={snack1} onClose={() => setSnack1(false)} type="success" label="Lorem Ipsum dolor sit amet" />
    <Snackbar open={snack2} onClose={() => setSnack2(false)} type="info" label="Lorem Ipsum dolor sit amet" />
    <Snackbar open={snack3} onClose={() => setSnack3(false)} type="warning" label="Lorem Ipsum dolor sit amet" />
    <Snackbar open={snack4} onClose={() => setSnack4(false)} type="error" label="Lorem Ipsum dolor sit amet" disableAutoHide />
    <Snackbar open={snack5} onClose={() => setSnack5(false)} type="info" label="Файл был перемещен в корзину" actionLabel="Откройте папку корзины"  disableAutoHide />
    <Snackbar open={snack6} onClose={() => setSnack6(false)} type="info" label="Text" actionLabel="Very long action on snackbar with superlongwordwithlotofchars"  disableAutoHide />
    <Snackbar open={snack7} onClose={() => setSnack7(false)} type="info" label="Very long action on snackbar with superlongwordwithlotofchars" actionLabel="Text"  disableAutoHide />
    <Snackbar open={snack8} onClose={() => setSnack8(false)} type="info" label="Item moved to trash with success" actionLabel="Go to trash folder"  disableAutoHide />
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
