<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

```jsx
import { useState } from 'react';
import { Button, Container, IconButton, Row, Text, Tooltip } from '@zextras/carbonio-design-system';

const effects = [...Transition.types];
const [buttons, setButtons] = useState(effects.reduce((acc, currentValue) => { return { ...acc, [currentValue]: false }}, {}));

<>
    <Container crossAlignment="unset">
      { effects.map((effect, index) => {
        return (
          <React.Fragment key={index}>
            <Text size="large" style={{ textTransform: 'capitalize', paddingBottom: '0.5rem' }}>{ effect }</Text>
            <Row padding={{bottom: 'large'}}>
              <Row width="2.5rem">
                <Tooltip label={effect} placement="left">
                  <IconButton
                    icon="PlayCircle"
                    onClick={() => {
                      setButtons({ ...buttons, [effect]: !buttons[effect] });
                    }}
                  />
                </Tooltip>
              </Row>
              <Row takeAvailableSpace={true}>
                <Transition type={effect} apply={buttons[effect]}>
                  <Button color="error" label={effect} />
                </Transition>
              </Row>
            </Row>
          </React.Fragment>
        );
      })}
    </Container>
</>
```
```jsx
import { useState } from 'react';
import { Button, Container, IconButton, Row, Text, Tooltip } from '@zextras/carbonio-design-system';
const [open, setOpen] = useState(false);
<>
  <Container crossAlignment="unset">
    <Text size="large">Custom easing and timing</Text>
    <Row padding={{bottom: 'large'}}>
      <Row width="2.5rem">
        <IconButton
          icon="PlayCircle"
          onClick={() => setOpen(!open)}
        />
      </Row>
      <Row takeAvailableSpace={true}>
        <Transition
          type="fade"
          apply={open}
          transitionTiming="ease-in"
          transitionDuration={1000}
        >
          <Button color="error" label="Button" />
        </Transition>
      </Row>
    </Row>
  </Container>
</>
```

```jsx
import { useState, useReducer } from 'react';
import { Button, Container, Select, Padding, Text, Row } from '@zextras/carbonio-design-system';

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [ ...state, action.value ];
    case 'reset':
      return [];
    default:
      throw new Error();
  }
}
const effects = [...Transition.types];
const selectItems = effects.reduce((acc, currentValue) => [...acc, { label: currentValue, value: currentValue }], []);
const [toDos, dispatch] = useReducer(reducer, []);
const [effect, setEffect] = useState('fade');

<>
  <Container crossAlignment="flex-start" orientation="horizontal">
    <Row orientation="vertical" width="40%">
      <Select items={selectItems} defaultSelection={{ label: 'fade', value: 'fade' }} onChange={(value) => setEffect(value)} label="Select an effect" />
      <Row width="100%" mainAlignment="flex-start" padding={{ top: 'large' }}>
        <Button label="Add" onClick={() => dispatch({ type: 'add', value: 'Random value' })} />
        <Button type="ghost" color="error" label="Reset" onClick={() => dispatch({ type: 'reset' })} />
      </Row>
    </Row>
    <Row wrap="wrap" width="60%">
      { !toDos.length && <Text>No element added</Text> }
      { toDos.length > 0 && toDos.map((toDo, index) =>
        <Transition key={index} type={effect}>
          <Padding value="0.125rem"><Button label={ toDo } /></Padding>
        </Transition>
      )}
    </Row>
  </Container>
</>
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
