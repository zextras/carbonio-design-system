<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Snackbar is the component which informs the user of a process that an app has performed or will perform.
It appears temporarily, towards the bottom of the screen, it does not interrupt the user experience and by default it does not require user input to disappear.

```jsx
import { useState, useCallback } from 'react';
import { Button, Container } from '@zextras/carbonio-design-system';

const [snack1, setSnack1] = useState(false);
const [snack2, setSnack2] = useState(false);
const [snack3, setSnack3] = useState(false);
const [snack4, setSnack4] = useState(false);
const [snack5, setSnack5] = useState(false);
const [snack6, setSnack6] = useState(false);
const [snack7, setSnack7] = useState(false);
const [snack8, setSnack8] = useState(false);

const openSnack1 = useCallback(() => { setSnack1(true); }, []);
const openSnack2 = useCallback(() => { setSnack2(true); }, []);
const openSnack3 = useCallback(() => { setSnack3(true); }, []);
const openSnack4 = useCallback(() => { setSnack4(true); }, []);
const openSnack5 = useCallback(() => { setSnack5(true); }, []);
const openSnack6 = useCallback(() => { setSnack6(true); }, []);
const openSnack7 = useCallback(() => { setSnack7(true); }, []);
const openSnack8 = useCallback(() => { setSnack8(true); }, []);

const closeSnack1 = useCallback(() => { setSnack1(false); }, []);
const closeSnack2 = useCallback(() => { setSnack2(false); }, []);
const closeSnack3 = useCallback(() => { setSnack3(false); }, []);
const closeSnack4 = useCallback(() => { setSnack4(false); }, []);
const closeSnack5 = useCallback(() => { setSnack5(false); }, []);
const closeSnack6 = useCallback(() => { setSnack6(false); }, []);
const closeSnack7 = useCallback(() => { setSnack7(false); }, []);
const closeSnack8 = useCallback(() => { setSnack8(false); }, []);

<>
    <Container orientation="horizontal" mainAlignment="space-between" wrap="wrap" gap="10px">
        <Button type="outlined" color="success" label="Success" onClick={openSnack1} />
        <Button type="outlined" color="info" label="Info" onClick={openSnack2} />
        <Button type="outlined" color="warning" label="Warning" onClick={openSnack3} />
        <Button type="outlined" color="error" label="Error" onClick={openSnack4} />
        <Button type="default" color="primary" label="Very long text and action" onClick={openSnack5} />
        <Button type="default" color="secondary" label="Short text and long action" onClick={openSnack6} />
        <Button type="default" color="gray4" label="Long text and short action" onClick={openSnack7} />
        <Button type="default" color="warning" label="Medium text and medium action" onClick={openSnack8} />
    </Container>

    <Snackbar id="s1" key="s1" open={snack1} onClose={closeSnack1} severity="success" label="Lorem Ipsum dolor sit amet" />
    <Snackbar id="s2" key="s2" open={snack2} onClose={closeSnack2} severity="info" label="Lorem Ipsum dolor sit amet" />
    <Snackbar id="s3" key="s3" open={snack3} onClose={closeSnack3} severity="warning" label="Lorem Ipsum dolor sit amet" />
    <Snackbar id="s4" key="s4" open={snack4} onClose={closeSnack4} severity="error" label="Lorem Ipsum dolor sit amet" disableAutoHide />
    <Snackbar id="s5" key="s5" open={snack5} onClose={closeSnack5} severity="info" label="Файл был перемещен в корзину" actionLabel="Откройте папку корзины"  disableAutoHide />
    <Snackbar id="s6" key="s6" open={snack6} onClose={closeSnack6} severity="info" label="Text" actionLabel="Very long action on snackbar with superlongwordwithlotofchars"  disableAutoHide />
    <Snackbar id="s7" key="s7" open={snack7} onClose={closeSnack7} severity="info" label="Very long action on snackbar with superlongwordwithlotofchars" actionLabel="Text"  disableAutoHide />
    <Snackbar id="s8" key="s8" open={snack8} onClose={closeSnack8} severity="info" label="Item moved to trash with success" actionLabel="Go to trash folder"  disableAutoHide />
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
