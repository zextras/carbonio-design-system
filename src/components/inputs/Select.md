<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Select element maintains the same behavior of the [standard select element](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-select-element.html).

His children will be built within the element, passing the options as `props`.
The dropdown menu and the items are rendered like [Dropdown](#/Components/Primitives/Dropdown)
```jsx
import { useState } from 'react';
import { Input, Text, Container, Icon } from '@zextras/carbonio-design-system';
const items = [
    {
        label: 'hi',
        value: '1'
    },
    {
        label: 'hello',
        value: '2'
    },
    {
        label: 'good day',
        value: '3'
    },
    {
        label: 'goodnight',
        value: '4'
    },
    {
        label: 'nothing',
        value: '5',
        disabled: true
    },
    {
        label: 'custom',
        value: '6',
        customComponent: <Container width="fit" mainAlignment="flex-start" orientation="horizontal"><Icon icon="People" color="primary"/><Text weight="bold">Special Greeting</Text></Container>
    }
];
const [selected, setSelected] = useState(4);
<>
    <Select
        items={items}
        background="gray5"
        label="Select an item"
        onChange={setSelected}
        defaultSelection={{ value: '4', label: 'goodnight' }}
    />
    <Text>Currently selected: {items[selected - 1].label}</Text>
</>
```

**Multiple selection**
```jsx
import {Input} from '@zextras/carbonio-design-system';
const items = [
    {
        label: 'hi',
        value: '1'
    },
    {
        label: 'hello',
        value: '2'
    },
    {
        label: 'good day',
        value: '3'
    },
    {
        label: 'goodnight',
        value: '4'
    }, 
    {
        label: 'hello',
        value: '5'
    },
    {
        label: 'good day',
        value: '6'
    },
    {
        label: 'goodnight',
        value: '7'
    }

];
<>
    <Select
        items={items}
        multiple={true}
        background="gray5"
        maxHeight="80px"
        label="Select items"
        onChange={console.log}
    />
</>
```

**Custom Select Trigger**
```jsx
import { Container, Text, Row, Icon } from '@zextras/carbonio-design-system';
const LabelFactory = ({ selected, label, open, focus }) => {
  return (
    <Container
      orientation="horizontal"
      width="fill"
      crossAlignment="center"
      mainAlignment="space-between"
      borderRadius="half"
      padding={{
        vertical: 'small'
      }}
    >
      <Row takeAvailableSpace={true} mainAlignment="unset">
        <Text size="medium" color={open || focus ? 'primary' : 'secondary'}>{label}</Text>
      </Row>
      <Icon size="large" icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'} color={open || focus ? 'primary' : 'secondary'} style={{ alignSelf: 'center' }} />
    </Container>
  );
};

const items = [
    {
        label: 'hi',
        value: '1'
    },
    {
        label: 'hello',
        value: '2'
    },
    {
        label: 'good day',
        value: '3'
    },
    {
        label: 'goodnight',
        value: '4'
    }
];
<>
    <Select
        items={items}
        multiple={true}
        background="gray5"
        label="Type"
        onChange={console.log}
        LabelFactory={LabelFactory}
    />
</>
```

**Hide checkboxes**
```jsx
import { useState } from 'react';
import { Input, Text, Container, Icon } from '@zextras/carbonio-design-system';
const items = [
    {
        label: 'hi',
        value: '1'
    },
    {
        label: 'hello',
        value: '2'
    },
    {
        label: 'good day',
        value: '3'
    },
    {
        label: 'goodnight',
        value: '4'
    },
    {
        label: 'nothing',
        value: '5'
    }
];
const [selected, setSelected] = useState(4);
<>
    <Select
        items={items}
        background="gray5"
        label="Select an item"
        onChange={setSelected}
        defaultSelection={{ value: '4', label: 'goodnight' }}
        showCheckbox={false}
    />
</>
```
**Controlled mode - Single selection**
```jsx
import { useState } from 'react';
import { Input, Text, Container, Icon, Button } from '@zextras/carbonio-design-system';
const items = [
	{
		label: 'hi',
		value: '1'
	},
	{
		label: 'hello',
		value: '2'
	},
	{
		label: 'good day',
		value: '3'
	},
	{
		label: 'goodnight',
		value: '4'
	},
	{
		label: 'nothing',
		value: '5',
		disabled: true
	},
	{
		label: 'custom',
		value: '6',
		customComponent: <Container width="fit" mainAlignment="flex-start" orientation="horizontal"><Icon icon="People" color="primary"/><Text weight="bold">Special Greeting</Text></Container>
	}
];
const [selected, setSelected] = useState(4);

<>
	<Button type="outlined" label="Button" color="error" onClick={() => setSelected(2)}/>
	<Select
		items={items}
		background="gray5"
		label="Select an item"
		onChange={setSelected}
		selection={items[selected-1]}
	/>
	<Text>Currently selected: {items[selected-1].label}</Text>
</>
```

**Controlled mode - Multiple selection**
```jsx
import { useState } from 'react';
import { Input, Text, Container, Icon, Button, Row } from '@zextras/carbonio-design-system';
const LabelFactory = ({ selected, label, open, focus }) => {
	return (
		<Container
			orientation="horizontal"
			width="fill"
			crossAlignment="center"
			mainAlignment="space-between"
			borderRadius="half"
			padding={{
				vertical: 'small'
			}}
		>
			<Row takeAvailableSpace={true} mainAlignment="unset">
				<Text size="medium" color={open || focus ? 'primary' : 'secondary'}>{label}</Text>
			</Row>
			<Icon size="large" icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'} color={open || focus ? 'primary' : 'secondary'} style={{ alignSelf: 'center' }} />
		</Container>
	);
};
const items = [
    {
        label: 'hi',
        value: '1'
    },
    {
        label: 'hello',
        value: '2'
    },
    {
        label: 'good day',
        value: '3',
        customComponent: <Container width="fit" mainAlignment="flex-start" orientation="horizontal"><Icon icon="People" color="primary"/><Text weight="bold">Special Greeting</Text></Container>
    },
    {
        label: 'goodnight',
        value: '4',
        customComponent: <Container width="fit" mainAlignment="flex-start" orientation="horizontal"><Icon icon="People" color="primary"/><Text weight="bold">Special Greeting</Text></Container>
    },
    {
        label: 'nothing',
        value: '5',
        disabled: true
    },
    {
        label: 'custom',
        value: '6',
        customComponent: <Container width="fit" mainAlignment="flex-start" orientation="horizontal"><Icon icon="People" color="primary"/><Text weight="bold">Special Greeting</Text></Container>
    }
];
const [selected, setSelected] = useState(items);

<>
	<Button type="outlined" label="Button" color="error" onClick={() => setSelected([items[1]])}/> 
    <Select
        items={items}
        background="gray5"
        label="Select an item"
        onChange={setSelected}
        multiple={true}
        selection={selected}
        LabelFactory={LabelFactory}
    />
	<Text>Currently selected: {selected.map(x => x.label).join(', ')}</Text>
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
    feature: 'Controlled/Uncontrolled mode',
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