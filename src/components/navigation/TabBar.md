<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The TabBar is a customizable navigation component, which can be used for in-page navigation between different tabs.

### Uncontrolled Plain TabBar
```jsx
import {useState} from 'react';
import {Container, Divider, Text} from '@zextras/carbonio-design-system';
const items = [
  { id: 'tab-one', label: 'First Tab' },
  { id: 'tab-two', label: 'Second Tab' },
  { id: 'tab-three', label: 'Disabled', disabled: true }
];
const [change, setChange] = useState('');
const [click, setClick] = useState('');
<>
  <TabBar
    items={items}
    defaultSelected="tab-one"
    onChange={setChange}
    onItemClick={setClick}
    width={512}
    height={48}
  />
  <Container
    background="gray4"
    width={512}
    padding={{ all: 'small'}}
    crossAlignment="flex-start"
  >
    <Text style={{ fontFamily: 'monospace' }}>
      {`Change Event: '${change}'`}
    </Text>
    <Text style={{ fontFamily: 'monospace' }}>
      {`ClickEvent.selectedItemId: '${click.selectedItemId}'`}
    </Text>
  </Container>
</>
```
### Controlled Plain TabBar
```jsx
import {useState} from 'react';
import {Container, Divider, Text, Row, Button, Padding} from '@zextras/carbonio-design-system';
const items = [
  { id: 'tab-one', label: 'First Tab' },
  { id: 'tab-two', label: 'Second Tab' }
];
const [selected, setSelected] = useState('tab-one');
<>
  <TabBar
    items={items}
    selected={selected}
    onChange={console.log}
    onItemClick={(ev) => setSelected(ev.selectedItemId)}
    width={512}
    height={48}
  />
  <Container
    background="gray4"
    width={512}
    padding={{ all: 'small'}}
    crossAlignment="flex-start"
  >
    <Text size="large">
      {`Selected: '${selected}'`}
    </Text>
    <Text style={{ fontFamily: 'monospace' }}>
      {`ClickEvent.selectedItemId: '${selected}'`}
    </Text>
    <Row>
      {items.map(
        (item) => (
          <Padding
            key={item.id}
            all="small"
          >
            <Button
              label={`Select ${item.id}`}
              onClick={() => setSelected(item.id)}
            />
          </Padding>
        )
      )}
    </Row>
  </Container>
</>
```

### forceWidthEquallyDistributed prop
```jsx
import {useState} from 'react';
import {Container, Divider, Text} from '@zextras/carbonio-design-system';
const items = [
  { id: 'tab-one', label: 'looooooooooooooooooooooooooooooong label' },
  { id: 'tab-two', label: 'Second Tab' },
  { id: 'tab-three', label: 'Tab 3' }
];
const [selected, setSelected] = useState('tab-one');

<>
  <TabBar
    items={items}
	selected={selected}
	onChange={console.log}
	onItemClick={(ev) => setSelected(ev.selectedItemId)}
    width={512}
    height={48}
  />
  <TabBar
   	items={items}
	selected={selected}
	onChange={console.log}
	onItemClick={(ev) => setSelected(ev.selectedItemId)}
	width={512}
	height={48}
    forceWidthEquallyDistributed
  />
  <Container
    background="gray4"
    width={512}
    padding={{ all: 'small'}}
    crossAlignment="flex-start"
  >
    <Text size="large">
	  {`Selected: '${selected}'`}
	</Text>
  </Container>
</>
```

### Customized TabBar
```jsx
import {useState} from 'react';
import {Container, Divider, Text, DefaultTabBarItem, Icon} from '@zextras/carbonio-design-system';
import styled, { css } from 'styled-components';

const CustomContainer = styled(Container)`
  min-width: 0;
  flex-basis: fit-content;
	${({ forceWidthEquallyDistributed }) =>
	forceWidthEquallyDistributed &&
	css`
      flex-basis: unset;
	`};
  flex-grow: 1;
`

const CustomComponent = ({
    item,
    index,
    selected,
    onClick,
}) => (
  <CustomContainer onClick={onClick} background={selected ? 'highlight' : 'gray4'}>
    <Text size="large" color={selected ? 'primary' : 'error'}>{item.label}</Text>
  </CustomContainer>
);
const ReusedDefaultTabBar = ({
    item,
    index,
    selected,
    onClick,
    forceWidthEquallyDistributed
}) => (
  <DefaultTabBarItem
    item={item}
    index={index}
    selected={selected}
    onClick={onClick}
    orientation="horizontal"
	forceWidthEquallyDistributed={forceWidthEquallyDistributed}
  >
	{item.icon && <Icon size="large" icon={item.icon}/>}
    <Text size="large">{item.label}</Text>
  </DefaultTabBarItem>
);
const items = [
  { id: 'tab-one', label: 'First Tab', CustomComponent },
  { id: 'tab-two', label: 'Second Tab', CustomComponent: ReusedDefaultTabBar, icon: 'BriefcaseOutline' },
  { id: 'tab-three', label: 'Another Tab', CustomComponent },
  { id: 'tab-four', label: 'Car Tab', CustomComponent: ReusedDefaultTabBar, icon: 'CarOutline' }
];
const [change, setChange] = useState('');
const [click, setClick] = useState('');
<>
  <TabBar
    items={items}
    defaultSelected="tab-one"
    onChange={setChange}
    onItemClick={setClick}
    width={512}
    height={48}
  />
  <Container
    background="gray4"
    width={512}
    padding={{ all: 'small'}}
    crossAlignment="flex-start"
  >
    <Text style={{ fontFamily: 'monospace' }}>
      {`Change Event: '${change}'`}
    </Text>
    <Text style={{ fontFamily: 'monospace' }}>
      {`ClickEvent.selectedItemId: '${click.selectedItemId}'`}
    </Text>
  </Container>
</>
```
### Mixed TabBar
```jsx
import {useState} from 'react';
import {Container, Divider, Text, Icon} from '@zextras/carbonio-design-system';
import styled, { css } from 'styled-components';

const CustomContainer = styled(Container)`
  min-width: 0;
  flex-basis: fit-content;
	${({ forceWidthEquallyDistributed }) =>
	forceWidthEquallyDistributed &&
	css`
      flex-basis: unset;
	`};
  flex-grow: 1;
`

const CustomComponent = ({
    item,
    index,
    selected,
    onClick,
}) => (
  <CustomContainer onClick={onClick} height={50} background={selected ? 'highlight' : 'gray4'}>
    <Text size="large" color={selected ? 'primary' : 'error'}>{item.label}</Text>
    {item.specialProp && (<Text size="large" color={selected ? 'primary' : 'text'}>{item.specialProp}</Text>)}
    {item.icon && (<Icon icon={item.icon} size="large" color={selected ? 'primary' : 'info'}/>)}
  </CustomContainer>
);
const items = [
  { id: 'one', label: 'Hello' },
  { id: 'two', label: 'Hello' },
  { id: 'three', label: 'Hello', CustomComponent, specialProp: 'World' },
  { id: 'four', label: 'Hello', CustomComponent, icon: 'SmilingFaceOutline' },
  { id: 'five', label: 'Hello', disabled: true }
];
const [change, setChange] = useState('');
const [click, setClick] = useState('');
<>
  <TabBar
    items={items}
    defaultSelected="tab-one"
    onChange={setChange}
    onItemClick={setClick}
    width={512}
    height={48}
    underlineColor="success"
  />
  <Container
    background="gray4"
    width={512}
    padding={{ all: 'small'}}
    crossAlignment="flex-start"
  >
    <Text style={{ fontFamily: 'monospace' }}>
      {`Change Event: '${change}'`}
    </Text>
    <Text style={{ fontFamily: 'monospace' }}>
      {`ClickEvent.selectedItemId: '${click.selectedItemId}'`}
    </Text>
  </Container>
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
}
];

<StatusTable items={items} />

```