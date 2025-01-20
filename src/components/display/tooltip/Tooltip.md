<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Tooltip component wraps other components to show some informative text when the wrapped elements are hovered or are focused.
 
```jsx
import { Avatar, Button, IconCheckbox, Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="flex-start">
    <Tooltip placement="bottom" label="Chrome 78+">
        <Button label="Button label!" />
    </Tooltip>
    <Tooltip placement="top" label="Disable Wi-fi">
        <IconCheckbox icon="Wifi" defaultChecked={true} onChange={() => {}} />
    </Tooltip>
    <Tooltip placement="right" label="Overflowing tooltip text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
        <Avatar size="large" label="Name Lastname"/>
    </Tooltip>
</Container>
```

### Enabled tooltip for disabled components
```jsx
import {
    Button,
    IconCheckbox,
    Container,
    Checkbox,
    IconButton,
    Input,
    Switch,
    Row
} from '@zextras/carbonio-design-system';
const onClick = () => console.log('onClick');
const onChange = () => console.log('onChange');
<Container mainAlignment="flex-start" crossAlignment="flex-start">
    <Row>
        <Tooltip placement="bottom" label="Chrome 78+">
            <Button disabled onClick={onClick} label="Button label!" />
        </Tooltip>
        <Tooltip placement="top" label="Disable Wi-fi">
            <IconCheckbox disabled onChange={onChange} icon="Wifi" defaultChecked={true} onChange={() => {}} />
        </Tooltip>
        <Tooltip placement="right" label="Overflowing tooltip text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
            <Checkbox disabled defaultChecked={true} label="Name Lastname"/>
        </Tooltip>
    </Row>
	<Row>
		<Tooltip placement="right" label="Overflowing tooltip text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
			<IconButton disabled size="large" icon="Activity" onClick={onClick} />
		</Tooltip>
        <Row takeAvailableSpace>
		    <Tooltip placement="right" label="Overflowing tooltip text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.">
		  	    <Input disabled defaultValue="value"	label="Disabled Password" />
            </Tooltip>
        </Row>
		<Tooltip placement="right" label="Overflowing tooltip text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." maxWidth="auto">
			<Switch disabled defaultChecked label="Name Lastname"/>
		</Tooltip>
	</Row>
</Container>
```

### Disabled tooltip
```jsx
import { Avatar, Button, IconCheckbox, Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="flex-start">
    <Tooltip placement="bottom" label="Chrome 78+" disabled>
        <Button label="Button label!" />
    </Tooltip>
    <Tooltip placement="top" label="Disable Wi-fi" disabled>
        <IconCheckbox icon="Wifi" defaultChecked={true} onChange={() => {}} disabled />
    </Tooltip>
    <Tooltip placement="right" label="Overflowing tooltip text, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." disabled maxWidth="auto">
        <Avatar size="large" label="Name Lastname"/>
    </Tooltip>
</Container>
```

### Change tooltip's trigger delay
```jsx
import { Button, Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" mainAlignment="flex-start">
    <Tooltip label="Overflowing tooltip text, Lorem ipsum dolor sit amet" triggerDelay={2000}>
        <Button label="Tooltip trigger after 2 seconds" />
    </Tooltip>
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
    notes: 'Maybe custom content, or text props?'
},
];

<StatusTable items={items} />

```
