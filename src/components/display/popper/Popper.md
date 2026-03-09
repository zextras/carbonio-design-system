<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Component to use when you want to position a component in reference of another component.

```jsx
import { useState, useRef } from 'react';
import { Button, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const buttonRef = useRef(undefined);

<>
  <Button ref={buttonRef} label="Click me!" onClick={() => setOpen(true)} />
  <Popper open={open} anchorEl={buttonRef} placement="right" onClose={() => setOpen(false)}>
    <Text>This is the content of the Popper</Text>
  </Popper>
</>
```
```jsx
import { useState, useRef } from 'react';
import { Button, Text } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const buttonRef = useRef(undefined);

<>
  <Button ref={buttonRef} label="Hover me!" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)} />
  <Popper open={open} anchorEl={buttonRef} placement="right" onClose={() => setOpen(false)} disableRestoreFocus={true}>
    <Text>This is the content of the Popper</Text>
  </Popper>
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
    status: 1,
    notes: ''
},
];

<StatusTable items={items} />

```