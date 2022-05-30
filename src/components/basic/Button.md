<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

### Colors and types

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
import { Container } from '@zextras/carbonio-design-system';

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

Button can optionally have an icon.

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around">
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button label="Button" icon="Activity" iconPlacement="left" color="primary" onClick={click} />
        <Button label="Button" icon="At" iconPlacement="right" color="secondary" onClick={click} />
        <Button icon="At" iconPlacement="right" color="secondary" onClick={click} />
    </Container>
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="outlined" label="Button" icon="Activity" iconPlacement="left" color="primary" onClick={click} />
        <Button type="outlined" label="Button" icon="At" iconPlacement="right" color="secondary" onClick={click} />
        <Button type="outlined" icon="At" iconPlacement="right" color="secondary" onClick={click} />
    </Container>
    <Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="ghost" label="Button" icon="Activity" iconPlacement="left" color="primary" onClick={click} />
        <Button type="ghost" label="Button" icon="At" iconPlacement="right" color="secondary" onClick={click} />
        <Button type="ghost" icon="At" iconPlacement="right" color="secondary" onClick={click} />
    </Container>
</Container>
```

### Size

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around" width="fill">
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button label="Button" icon="HeartOutline" type="default" onClick={click} size="extrasmall" />
        <Button label="Button" icon="HeartOutline" type="default" onClick={click} size="small" />
        <Button label="Button" icon="HeartOutline" type="default" onClick={click} size="medium" />
        <Button label="Button" icon="HeartOutline" type="default" onClick={click} size="large" />
        <Button label="Button" icon="HeartOutline" type="default" onClick={click} size="extralarge" />
    </Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="extrasmall" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="small" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="medium" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="large" />
		<Button label="Button" icon="HeartOutline" type="outlined" onClick={click} size="extralarge" />
	</Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="extrasmall" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="small" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="medium" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="large" />
		<Button label="Button" icon="HeartOutline" type="ghost" onClick={click} size="extralarge" />
	</Container>
</Container>
```

### Width
```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }}>
    <Button label="Button" color="primary" width="fit" />
    <Button type="outlined" label="Button" width="fill" />
  <Container orientation="horizontal" maxWidth="500px" gap="10px">
    <Button label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dui varius eleifend pharetra. Suspendisse tempus euismod semper." color="primary" width="fit" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
    <Button type="outlined" label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dui varius eleifend pharetra. Suspendisse tempus euismod semper." width="fill" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
  </Container>
	<Container orientation="horizontal" maxWidth="500px" gap="10px">
		<Button label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dui varius eleifend pharetra. Suspendisse tempus euismod semper." color="primary" width="fit" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
		<Button type="default" label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dui varius eleifend pharetra. Suspendisse tempus euismod semper." width="fit" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
	</Container>
	<Container orientation="vertical" maxWidth="500px" gap="10px">
		<Button label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dui varius eleifend pharetra. Suspendisse tempus euismod semper." color="primary" width="fit" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
		<Button type="outlined" label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam vestibulum dui varius eleifend pharetra. Suspendisse tempus euismod semper." width="fill" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
	</Container>
	<Container orientation="horizontal" maxWidth="500px" gap="10px">
		<Button color="primary" width="fit" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
		<Button color="primary" width="fit" icon="PeopleOutline" />
		<Button type="outlined" width="fill" icon="PeopleOutline" secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
		<Button type="outlined" width="fill" icon="PeopleOutline" />
	</Container>
</Container>
```

### Shape
```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" mainAlignment="space-around">
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="default" label="Button" shape="regular" />
        <Button type="default" label="Button" shape="round" />
        <Button type="default" label="Button" shape="round" icon="HeartOutline" iconPlacement="left" />
        <Button type="default" label="Button" shape="round" icon="HeartOutline" iconPlacement="right" />
    </Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="outlined" label="Button" shape="regular" />
        <Button type="outlined" label="Button" shape="round" />
        <Button type="outlined" label="Button" shape="round" icon="HeartOutline" iconPlacement="left" />
        <Button type="outlined" label="Button" shape="round" icon="HeartOutline" iconPlacement="right" />
    </Container>
	<Container orientation="vertical" mainAlignment="space-around" style={{ gap: '10px' }} width="30%">
        <Button type="ghost" label="Button" shape="regular" />
        <Button type="ghost" label="Button" shape="round" />
        <Button type="ghost" label="Button" shape="round" icon="HeartOutline" iconPlacement="left" />
        <Button type="ghost" label="Button" shape="round" icon="HeartOutline" iconPlacement="right" />
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

#### forceActive

forceActive property fix the status and styles the button as active

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="vertical" mainAlignment="space-around">
    <Button label="Button" color="primary" onClick={click} forceActive />
</Container>
```

Disabled has priority on forceActive

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');

<Container orientation="vertical" mainAlignment="space-around">
    <Button label="Button" color="primary" onClick={click} disabled forceActive />
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
		<Button label="Button" color="primary" forceActive={dropdownOpen} />
    </Dropdown>
</Container>
```

### Loading

```jsx
import { useState } from 'react'
import { Container, Switch } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');
const [loading, setLoading] = useState(true);

<Container style={{ gap: '20px' }}>
    <Switch label="Loading" value={loading} onClick={() => setLoading((prevState) => !prevState)} />
    <Container orientation="horizontal" mainAlignment="space-around" width="fill">
      <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
        <Button label="Button" color="primary" onClick={click} loading={loading} />
        <Button label="Button" color="primary" onClick={click} icon="HeartOutline" loading={loading} />
        <Button label="Button" color="primary" onClick={click} icon="HeartOutline" iconPlacement="left" loading={loading} />
        <Button label="Button" color="primary" onClick={click} icon="HeartOutline" iconPlacement="right" loading={loading} secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
      </Container>
      <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
        <Button type="outlined" label="Button" color="secondary" onClick={click} loading={loading} />
        <Button type="outlined" label="Button" color="secondary" onClick={click}  icon="HeartOutline" loading={loading} />
        <Button type="outlined" label="Button" color="secondary" onClick={click}  icon="HeartOutline" iconPlacement="left" loading={loading} />
        <Button type="outlined" label="Button" color="secondary" onClick={click}  icon="HeartOutline" iconPlacement="right" loading={loading} secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
      </Container>
      <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
        <Button type="ghost" label="Button" color="error" onClick={click} loading={loading} />
        <Button type="ghost" label="Button" color="error" onClick={click}  icon="HeartOutline" loading={loading} />
        <Button type="ghost" label="Button" color="error" onClick={click}  icon="HeartOutline" iconPlacement="left" loading={loading} />
        <Button type="ghost" label="Button" color="error" onClick={click}  icon="HeartOutline" iconPlacement="right" loading={loading} secondaryAction={{ icon: 'ChevronDown', onClick: () => undefined }} />
      </Container>
    </Container>
</Container>
```

### Secondary action

Secondary action is totally independent of main button, and so are its status.

To set the disabled and forceActive status on the secondary action, set the properties on the secondaryAction object prop.

```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click');

<Container style={{ gap: '50px' }}>
    <Container orientation="horizontal" mainAlignment="space-around" width="fill">
        <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
            <Button type="default" label="Button" color="primary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} />
            <Button type="default" label="Button" color="secondary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="left" />
            <Button type="default" label="Button" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" />
            <Button type="default" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" />
        </Container>
        <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
            <Button type="outlined" label="Button" color="primary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} />
            <Button type="outlined" label="Button" color="secondary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="left" />
            <Button type="outlined" label="Button" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" />
            <Button type="outlined" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" />
        </Container>
        <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
            <Button type="ghost" label="Button" color="primary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} />
            <Button type="ghost" label="Button" color="secondary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="left" />
            <Button type="ghost" label="Button" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" />
            <Button type="ghost" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" />
        </Container>
    </Container>
	<Container orientation="vertical" style={{ gap: '10px' }}>
		<Button type="default" label="Button" color="primary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} width="fill" />
		<Button type="default" label="Button" color="secondary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="left" width="fill" />
		<Button type="default" label="Button" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" width="fill" />
		<Button type="default" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" width="fill" />
	</Container>
	<Container orientation="vertical" style={{ gap: '10px' }}>
		<Button type="outlined" label="Button" color="primary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} width="fill" />
		<Button type="outlined" label="Button" color="secondary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="left" width="fill" />
		<Button type="outlined" label="Button" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" width="fill" />
		<Button type="outlined" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" width="fill" />
	</Container>
	<Container orientation="vertical" style={{ gap: '10px' }}>
		<Button type="ghost" label="Button" color="primary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} width="fill" />
		<Button type="ghost" label="Button" color="secondary" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="left" width="fill" />
		<Button type="ghost" label="Button" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" width="fill" />
		<Button type="ghost" color="error" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} icon="HeartOutline" iconPlacement="right" width="fill" />
	</Container>
</Container>

```

Examples of different combinations of statuses. Use dev tools to force css pseudo-classes.
```jsx
import { Container, Text } from '@zextras/carbonio-design-system';

const click = () => console.log('click');

<Container style={{ gap: '20px' }}>
  <Text>Main button is disabled</Text>
    <Container orientation="horizontal" mainAlignment="space-around" width="fill">
        <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
            <Button shape="round" type="default" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} disabled />
            <Button shape="round" type="default" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), forceActive: true }} disabled />
            <Button shape="round" type="default" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), disabled: true }} disabled />
        </Container>
        <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
            <Button shape="round" type="outlined" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} disabled />
            <Button shape="round" type="outlined" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), forceActive: true }} disabled />
            <Button shape="round" type="outlined" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), disabled: true }} disabled />
        </Container>
        <Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
            <Button shape="round" type="ghost" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} disabled />
            <Button shape="round" type="ghost" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), forceActive: true }} disabled />
            <Button shape="round" type="ghost" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), disabled: true }} disabled />
        </Container>
    </Container>
	<Text>Main button is forceActive</Text>
	<Container orientation="horizontal" mainAlignment="space-around" width="fill">
		<Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
			<Button shape="round" type="default" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} forceActive />
			<Button shape="round" type="default" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), forceActive: true }} forceActive />
			<Button shape="round" type="default" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), disabled: true }} forceActive />
		</Container>
		<Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
			<Button shape="round" type="outlined" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} forceActive />
			<Button shape="round" type="outlined" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), forceActive: true }} forceActive />
			<Button shape="round" type="outlined" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), disabled: true }} forceActive />
		</Container>
		<Container orientation="vertical" width="30%" style={{ gap: '10px' }}>
			<Button shape="round" type="ghost" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action') }} forceActive />
			<Button shape="round" type="ghost" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), forceActive: true }} forceActive />
			<Button shape="round" type="ghost" label="Button" onClick={click} secondaryAction={{ icon: 'ChevronDown', onClick: () => console.log('secondary action'), disabled: true }} forceActive />
		</Container>
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
