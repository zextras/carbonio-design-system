<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Select element maintains the same behavior of the [standard select element](https://www.w3.org/TR/2011/WD-html5-author-20110809/the-select-element.html).

His children will be built within the element, passing the options as `props`.
The dropdown menu and the items are rendered like [Dropdown](#/Components/Primitives/Dropdown)

**Single selection - uncontrolled mode - no default selection**

```jsx
import { useState, useMemo } from 'react';
import { Input, Text, Container, Icon } from '@zextras/carbonio-design-system';
import { find } from 'lodash';
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
		customComponent: (
			<Container width="fit" mainAlignment="flex-start" orientation="horizontal">
				<Icon icon="People" color="primary" />
				<Text weight="bold">Special Greeting</Text>
			</Container>
		)
	}
];
const [selected, setSelected] = useState();
const onChange = (newValue) => {
    console.log(newValue);
    setSelected(newValue);
};
const selectedLabel = useMemo(() => {
    const item = find(items, ['value', selected]);
    return item ? item.label : 'no selection';
}, [selected]);
<>
	<Select
		items={items}
		label="Select an item"
		onChange={onChange}
	/>
    <Text>Currently selected: {selectedLabel}</Text>
</>;
```

**Single selection - uncontrolled mode - default selection**

```jsx
import { useState, useMemo } from 'react';
import { Input, Text, Container, Icon } from '@zextras/carbonio-design-system';
import { find } from 'lodash';

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
		customComponent: (
			<Container width="fit" mainAlignment="flex-start" orientation="horizontal">
				<Icon icon="People" color="primary" />
				<Text weight="bold">Special Greeting</Text>
			</Container>
		)
	}
];
const [selected, setSelected] = useState('4');
const onChange = (newValue) => {
    console.log(newValue);
    setSelected(newValue);
};
const selection = useMemo(() => {
    return find(items, ['value', selected]);
}, [selected, items]);
const selectedLabel = useMemo(() => selection ? selection.label : 'no selection', [selection]);
<>
	<Select
		items={items}
		label="Select an item"
		onChange={onChange}
        defaultSelection={selection}
	/>
    <Text>Currently selected: {selectedLabel}</Text>
</>;
```

**Single selection - controlled mode**

```jsx
import { useState, useMemo } from 'react';
import { Input, Text, Container, Icon } from '@zextras/carbonio-design-system';
import { find } from 'lodash';

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
		customComponent: (
			<Container width="fit" mainAlignment="flex-start" orientation="horizontal">
				<Icon icon="People" color="primary" />
				<Text weight="bold">Special Greeting</Text>
			</Container>
		)
	}
];
const [selected, setSelected] = useState('4');
const onChange = (newValue) => {
    console.log(newValue);
    setSelected(newValue);
};
const selection = useMemo(() => {
    return find(items, ['value', selected]);
}, [selected]);
const selectedLabel = useMemo(() => selection ? selection.label : 'no selection', [selection]);
<>
	<Select
		items={items}
		label="Select an item"
		onChange={onChange}
        selection={selection}
	/>
    <Text>Currently selected: {selectedLabel}</Text>
</>;
```

**Multiple selection - controlled mode - no default selection**

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
                <Text size="medium" color={open || focus ? 'primary' : 'secondary'}>
                    {label}
                </Text>
            </Row>
            <Icon
                size="large"
                icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'}
                color={open || focus ? 'primary' : 'secondary'}
                style={{ alignSelf: 'center' }}
            />
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
        customComponent: (
            <Container width="fit" mainAlignment="flex-start" orientation="horizontal">
                <Icon icon="People" color="primary" />
                <Text weight="bold">Special Greeting</Text>
            </Container>
        )
    },
    {
        label: 'goodnight',
        value: '4',
        customComponent: (
            <Container width="fit" mainAlignment="flex-start" orientation="horizontal">
                <Icon icon="People" color="primary" />
                <Text weight="bold">Special Greeting</Text>
            </Container>
        )
    },
    {
        label: 'nothing',
        value: '5',
        disabled: true
    },
    {
        label: 'custom',
        value: '6',
        customComponent: (
            <Container width="fit" mainAlignment="flex-start" orientation="horizontal">
                <Icon icon="People" color="primary" />
                <Text weight="bold">Special Greeting</Text>
            </Container>
        )
    }
];
const [selected, setSelected] = useState([]);
const [values, setValues] = useState([]);
const onC = (v) => {
    console.log('called: ', v);
    setValues((a) => [v, ...a]);
    setSelected(v);
};

<>
    <Button type="outlined" label="Select one" color="error" onClick={() => setSelected([items[1]])} />
    <Button type="outlined" label="Select all" color="error" onClick={() => setSelected(items)} />
    <Select
        items={items}
        label="Select an item"
        onChange={onC}
        multiple={true}
        selection={selected}
        LabelFactory={LabelFactory}
    />
    <Text>Currently selected: {selected.length > 0 ? selected.map((x) => x.label).join(', ') : 'no selection'}</Text>
</>;
```

**Multiple selection - controlled mode - default selection**

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
                <Text size="medium" color={open || focus ? 'primary' : 'secondary'}>
                    {label}
                </Text>
            </Row>
            <Icon
                size="large"
                icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'}
                color={open || focus ? 'primary' : 'secondary'}
                style={{ alignSelf: 'center' }}
            />
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
        customComponent: (
            <Container width="fit" mainAlignment="flex-start" orientation="horizontal">
                <Icon icon="People" color="primary" />
                <Text weight="bold">Special Greeting</Text>
            </Container>
        )
    },
    {
        label: 'goodnight',
        value: '4',
        customComponent: (
            <Container width="fit" mainAlignment="flex-start" orientation="horizontal">
                <Icon icon="People" color="primary" />
                <Text weight="bold">Special Greeting</Text>
            </Container>
        )
    },
    {
        label: 'nothing',
        value: '5',
        disabled: true
    },
    {
        label: 'custom',
        value: '6',
        customComponent: (
            <Container width="fit" mainAlignment="flex-start" orientation="horizontal">
                <Icon icon="People" color="primary" />
                <Text weight="bold">Special Greeting</Text>
            </Container>
        )
    }
];
const [selected, setSelected] = useState(items);
const [values, setValues] = useState([]);
const onC = (v) => {
    console.log('called: ', v);
    setValues((a) => [v, ...a]);
    setSelected(v);
};

<>
    <Button type="outlined" label="Select one" color="error" onClick={() => setSelected([items[1]])} />
    <Button type="outlined" label="Select all" color="error" onClick={() => setSelected(items)} />
    <Select
        items={items}
        label="Select an item"
        onChange={onC}
        multiple={true}
        selection={selected}
        LabelFactory={LabelFactory}
    />
    <Text>Currently selected: {selected.map((x) => x.label).join(', ')}</Text>
</>;
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
				<Text size="medium" color={open || focus ? 'primary' : 'secondary'}>
					{label}
				</Text>
			</Row>
			<Icon
				size="large"
				icon={open ? 'ChevronUpOutline' : 'ChevronDownOutline'}
				color={open || focus ? 'primary' : 'secondary'}
				style={{ alignSelf: 'center' }}
			/>
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
		label="Type"
		onChange={console.log}
		LabelFactory={LabelFactory}
	/>
</>;
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
		label="Select an item"
		onChange={setSelected}
		defaultSelection={{ value: '4', label: 'goodnight' }}
		showCheckbox={false}
	/>
</>;
```

### Development status:

```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 1,
		notes: ''
	},
	{
		feature: 'Documentation',
		status: 1,
		notes: ''
	},
	{
		feature: 'Examples',
		status: 1,
		notes: ''
	},
	{
		feature: 'Controlled/Uncontrolled mode',
		status: 1,
		notes: ''
	},
	{
		feature: 'I18n Compatibility',
		status: 1,
		notes: ''
	},
	{
		feature: 'Theme Compatibility',
		status: 1,
		notes: ''
	},
	{
		feature: 'Dark Mode',
		status: 1,
		notes: ''
	},
	{
		feature: 'Prop Types',
		status: 1,
		notes: ''
	},
	{
		feature: 'Index Export',
		status: 1,
		notes: ''
	},
	{
		feature: 'Customizability',
		status: 1,
		notes: ''
	}
];

<StatusTable items={items} />;
```
