<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Colors

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around">
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button label="Button" color="primary" onClick={click}/>
        <Button label="Button" color="secondary" onClick={click}/>
        <Button label="Button" color="warning" onClick={click}/>
        <Button label="Button" color="error" onClick={click}/>
        <Button label="Button" color="success" onClick={click}/>
        <Button label="Button" color="info" onClick={click}/>
    </Container>
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="outlined" label="Button" color="primary" onClick={click}/>
        <Button type="outlined" label="Button" color="secondary" onClick={click}/>
        <Button type="outlined" label="Button" color="warning" onClick={click}/>
        <Button type="outlined" label="Button" color="error" onClick={click}/>
        <Button type="outlined" label="Button" color="success" onClick={click}/>
        <Button type="outlined" label="Button" color="info" onClick={click}/>
    </Container>
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="ghost" label="Button" color="primary" onClick={click}/>
        <Button type="ghost" label="Button" color="secondary" onClick={click}/>
        <Button type="ghost" label="Button" color="warning" onClick={click}/>
        <Button type="ghost" label="Button" color="error" onClick={click}/>
        <Button type="ghost" label="Button" color="success" onClick={click}/>
        <Button type="ghost" label="Button" color="info" onClick={click}/>
    </Container>
</Container>
```

#### Custom Colors

```jsx
import { Container } from '@zextras/zapp-ui';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around">
    <Button label="Button" color="rgb(0, 0, 0)" onClick={click} />
    <Button label="Button" color="#b6ffeb" onClick={click} />
    <Button label="Button" labelColor="error" backgroundColor="#ccc" onClick={click}/>
    <Button label="Button" labelColor="rgba(255, 0, 130, 0.5)" backgroundColor="gray2" onClick={click}/>
    <Button label="Button" labelColor="#fab000" backgroundColor="rgb(125, 125, 125)" onClick={click}/>
</Container>
```

### Icon

Button can optionally have an icon. See the IconButton documentation for more examples of buttons with icon only

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around">
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button label="Button" icon="Activity" iconPosition="left" color="primary" onClick={click} />
        <Button label="Button" icon="At" iconPosition="right" color="secondary" onClick={click} />
        <Button icon="At" iconPosition="right" color="secondary" onClick={click} />
    </Container>
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="outlined" label="Button" icon="Activity" iconPosition="left" color="primary" onClick={click} />
        <Button type="outlined" label="Button" icon="At" iconPosition="right" color="secondary" onClick={click} />
        <Button type="outlined" icon="At" iconPosition="right" color="secondary" onClick={click} />
    </Container>
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="ghost" label="Button" icon="Activity" iconPosition="left" color="primary" onClick={click} />
        <Button type="ghost" label="Button" icon="At" iconPosition="right" color="secondary" onClick={click} />
        <Button type="ghost" icon="At" iconPosition="right" color="secondary" onClick={click} />
    </Container>
</Container>
```

### Size

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around" width="fill">
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button label="Button" icon="HeartOutline" type="filled" onClick={click} size="extrasmall" />
        <Button label="Button" icon="HeartOutline" type="filled" onClick={click} size="small" />
        <Button label="Button" icon="HeartOutline" type="filled" onClick={click} size="medium" />
        <Button label="Button" icon="HeartOutline" type="filled" onClick={click} size="large" />
    </Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="extrasmall" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="small" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="medium" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="large" />
	</Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="extrasmall" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="small" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="medium" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="large" />
	</Container>
</Container>
```

### Width
```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }}>
    <Button label="Button" color="primary" width="fit" />
    <Button type="outlined" label="Button" width="fill" />
</Container>
```

### Shape
```jsx
import { Container } from '@zextras/zapp-ui';

<Container orientation="horizontal" mainAlignment="space-around">
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="filled" label="Button" shape="squared" />
        <Button type="filled" label="Button" shape="rounded" />
        <Button type="filled" label="Button" shape="rounded" icon="HeartOutline" iconPosition="left" />
        <Button type="filled" label="Button" shape="rounded" icon="HeartOutline" iconPosition="right" />
    </Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="outlined" label="Button" shape="squared" />
        <Button type="outlined" label="Button" shape="rounded" />
        <Button type="outlined" label="Button" shape="rounded" icon="HeartOutline" iconPosition="left" />
        <Button type="outlined" label="Button" shape="rounded" icon="HeartOutline" iconPosition="right" />
    </Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="ghost" label="Button" shape="squared" />
        <Button type="ghost" label="Button" s hape="rounded" />
        <Button type="ghost" label="Button" shape="rounded" icon="HeartOutline" iconPosition="left" />
        <Button type="ghost" label="Button" shape="rounded" icon="HeartOutline" iconPosition="right" />
    </Container>
</Container>
```


### Status

#### Disabled

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around">
    <Button label="Button" color="primary" onClick={click} disabled />
    <Button type="outlined" label="Button" color="primary" onClick={click} disabled />
    <Button type="ghost" label="Button" color="primary" onClick={click} disabled />
</Container>
```

#### Active

Active property fix the status

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="vertical" mainAlignment="space-around">
    <Button label="Button" color="primary" onClick={click} activated />
</Container>
```

Activated has priority on disabled

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="vertical" mainAlignment="space-around">
    <Button label="Button" color="primary" onClick={click} disabled activated />
</Container>
```

Use case with dropdown

```jsx
import { useState } from "react";
import { Container, Dropdown } from '@zextras/carbonio-design-system';

const [dropdownOpen, setDropdownOpen] =  useState(false);

const items = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
	},
	{
		id: "activity-3",
		icon: "Activity",
		label: "Yet Another Item",
	}
];

<Container orientation="vertical" mainAlignment="space-around">
	<Dropdown items={items} placement="right-start" onOpen={() => setDropdownOpen(true)} onClose={() => setDropdownOpen(false)}>
		<Button label="Button" color="primary" activated={dropdownOpen} />
    </Dropdown>
</Container>
```

### Loading

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around" width="fill">
  <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
    <Button label="Button" color="primary" onClick={click} loading />
    <Button label="Button" color="primary" onClick={click} icon="HeartOutline" loading />
    <Button label="Button" color="primary" onClick={click} icon="HeartOutline" iconPosition="right" loading />
  </Container>
  <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
    <Button type="outlined" label="Button" color="secondary" onClick={click} loading />
    <Button type="outlined" label="Button" color="secondary" onClick={click}  icon="HeartOutline" loading />
    <Button type="outlined" label="Button" color="secondary" onClick={click}  icon="HeartOutline" iconPosition="right" loading />
  </Container>
  <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
    <Button type="ghost" label="Button" color="error" onClick={click} loading />
    <Button type="ghost" label="Button" color="error" onClick={click}  icon="HeartOutline" loading />
    <Button type="ghost" label="Button" color="error" onClick={click}  icon="HeartOutline" iconPosition="right" loading />
  </Container>
</Container>
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
    status: 3,
    notes: ''
},{
    feature: 'Examples',
    status: 3,
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
    notes: 'Only accepts a string and icon as content'
},
];

<StatusTable items={items} />

```
