<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Use Portal component to output its children to a different HTML node instead of respecting the normal App flow.


```jsx
import { useState, useRef } from 'react';
import { Button, Container, Padding, Text } from '@zextras/carbonio-design-system';

const containerRef = useRef(undefined);
const [show, setShow] = useState(false);
const handleClick = () => {
  setShow(!show);
};

<Container mainAlignment="flex-start" crossAlignment="flex-start" width="50%">
  <Button
    type="outlined"
    label={show ? 'Unmount children' : 'Mount children'}
    onClick={handleClick}
    style={{ marginBottom: '8px' }}
  />
  <Padding
    ref={containerRef}
    value={show ? 'large' : '0'}
    style={{ border: show ? '2px solid red' : 'none', width: '100%' }}
  ></Padding>
  <Padding
    value="large large 0"
    style={{ border: '1px dashed green', marginTop: '8px', width: '100%' }}    
  >
    <Padding value="0 0 small" style={{ width: '100%' }}>
      <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sollicitudin nulla at bibendum fermentum. Interdum et malesuada fames ac ante ipsum primis in faucibus.</Text>
    </Padding>
    <Padding value="0 0 large" style={{ width: "100%" }}>
      <Text>It looks like I will render here.</Text>
      <Portal container={containerRef.current} show={show}>
        <Text>But I actually render here!</Text>
      </Portal>
    </Padding>
  </Padding>
</Container>
```

### Development status:
```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [{
    feature: 'Graphics',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Documentation',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Examples',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'I18n Compatibility',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Theme Compatibility',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Dark Mode',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Prop Types',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Index Export',
    status: 2,
    notes: 'To be checked'
},{
    feature: 'Customizability',
    status: 2,
    notes: 'To be checked'
},
];

<StatusTable items={items} />

```