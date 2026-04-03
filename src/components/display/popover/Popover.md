<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

**Has all the props of the Popper component.**

A Popover can be used to display some content on top of another.

When rendered with activateOnHover=true, it ignores the open prop and the onClose callback.
In this case, it has a fixed 300ms of delay in activation.
 
```jsx
import { useState, useRef } from 'react';
import { Button, Container, IconButton, Input, Text, Modal } from '@zextras/carbonio-design-system';

const [open, setOpen] = useState(false);
const buttonRef = useRef(undefined);

<>
  <Button ref={buttonRef} label="Click me!" onClick={() => setOpen(true)} />
  <Popover open={open} anchorEl={buttonRef} placement="right" onClose={() => setOpen(false)}>
    <Container>
      <Button label={"asd"} />
      <IconButton icon="Close" />
      <IconButton icon="Open" />
      <Input label={"rly"}/>
    </Container>
  </Popover>
</>
```

On hover activation example:
```jsx
import { useRef } from 'react';
import { Button, Container, IconButton, Input } from '@zextras/carbonio-design-system';

const buttonRef = useRef(undefined);

<>
  <Button ref={buttonRef} label="Hover me!" />
  <Popover anchorEl={buttonRef} activateOnHover={true} placement="right">
    <Container>
      <Button label={"asd"} />
      <IconButton icon="Close" />
      <IconButton icon="Open" />
      <Input label={"rly"}/>
    </Container>
  </Popover>
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
    status: 3,
    notes: 'Some  props are not typed'
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