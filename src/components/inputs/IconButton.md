<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The IconButton is a button that contains just an Icon and no label.

#### Shape
```jsx
import { Container } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');
<Container style={{ gap: '10px' }} background="gray5" padding={{ all: 'small' }}>
    <Container orientation="horizontal" mainAlignment="space-around">
        <IconButton icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
        <IconButton iconColor="gray6" backgroundColor="gray1" icon="Plus" onClick={click}/>
        <IconButton icon="Activity" onClick={click}/>
        <IconButton icon="Activity" onClick={click} disabled />
    </Container>
	<Container orientation="horizontal" mainAlignment="space-around">
		<IconButton borderRadius="round" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
		<IconButton borderRadius="round" iconColor="gray6" backgroundColor="gray1" icon="Plus" onClick={click}/>
		<IconButton borderRadius="round" icon="Activity" onClick={click}/>
		<IconButton borderRadius="round" icon="Activity" onClick={click} disabled />
	</Container>
</Container>
```

#### Size
```jsx
import { Container, Text } from '@zextras/carbonio-design-system';

const click = () => console.log('click!');
<Container orientation="horizontal" mainAlignment="space-around" background="gray5" crossAlignment="flex-start">
    <Container style={{ gap: '10px' }} background="gray5" padding={{ all: 'small' }}>
        <Text>Extrasmall</Text>
        <IconButton size="extrasmall" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
        <IconButton borderRadius="round" size="extrasmall" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
    </Container>
    <Container style={{ gap: '10px' }} background="gray5" padding={{ all: 'small' }}>
        <Text>Small</Text>
        <IconButton size="small" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
        <IconButton borderRadius="round" size="small" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
    </Container>
    <Container style={{ gap: '10px' }} background="gray5" padding={{ all: 'small' }}>
        <Text>Medium</Text>
        <IconButton size="medium" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
        <IconButton borderRadius="round" size="medium" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
    </Container>
    <Container style={{ gap: '10px' }} background="gray5" padding={{ all: 'small' }}>
        <Text>Large</Text>
        <IconButton size="large" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
        <IconButton borderRadius="round" size="large" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
    </Container>
	<Container style={{ gap: '10px' }} background="gray5" padding={{ all: 'small' }}>
		<Text>Extralarge</Text>
		<IconButton size="extralarge" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
		<IconButton borderRadius="round" size="extralarge" icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click}/>
	</Container>
</Container>
```

##### Custom size

A custom size object can be passed to IconButton. It has to contain
- **iconSize**: a valid css size or a key of the theme.sizes.icon object
- **paddingSize**: a valid css size or a key of the theme.sizes.padding object
```jsx
import { Container } from '@zextras/carbonio-design-system';
const click = () => console.log('click!');

<Container orientation="horizontal" mainAlignment="space-around" background="gray5" padding={{ all: 'small' }}>
    <IconButton icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click} customSize={{ iconSize: 'large', paddingSize: 'extrasmall' }} />
    <IconButton icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click} customSize={{ iconSize: 'medium', paddingSize: 0 }} />
    <IconButton icon="Pricetags" iconColor="gray6" backgroundColor="primary" onClick={click} customSize={{ iconSize: '20px', paddingSize: '15px' }} />
</Container>
```

### Props player

```jsx
import { useState, useCallback, useMemo } from 'react';
import { Checkbox, Container, Input, Select, useTheme } from '@zextras/carbonio-design-system';


const click = () => console.log('click!');

function mapToItems(values) {
	return values.map((val) => ({ label: val, value: val }));
}

const theme = useTheme();

const [iconButtonProps, setIconButtonProps] = useState({ size: 'medium' });

const sizeItems = useMemo(() => mapToItems(['extrasmall', 'small', 'medium', 'large', 'extralarge']), []);
const colorItems = useMemo(() => mapToItems(Object.keys(theme.palette)), [theme]);
const radiusItems = useMemo(() => mapToItems(['regular', 'round']), []);

const changeSelectProp = useCallback(
	(prop) => (value) => {
		setIconButtonProps((prevState) => ({ ...prevState, [prop]: value }));
    },
	[],
);

const changeCheckboxProp = useCallback(
	(prop) => () => {
      setIconButtonProps((prevState) => ({ ...prevState, [prop]: !prevState[prop] }));
    }, 
    []
);


const changeInputProp = useCallback(
	(prop) => ({ target: { value }}) => {
		value && setIconButtonProps((prevState) => ({ ...prevState, [prop]: value }));
	},
	[]
);


<Container style={{ gap: '10px' }} padding={{ all: 'small' }}>
    <Container orientation="horizontal" mainAlignment="flex-start" wrap="wrap" style={{ gap: '10px' }}>
        <Select label="Size" items={sizeItems} onChange={changeSelectProp('size')} style={{ width: '20%' }} defaultSelection={{ label: iconButtonProps.size, value: iconButtonProps.size }} />
        <Select label="Icon Color" items={colorItems} onChange={changeSelectProp('iconColor')} style={{ width: '20%' }} />
        <Select label="Background" items={colorItems} onChange={changeSelectProp('backgroundColor')} style={{ width: '20%' }} />
        <Select label="Border radius" items={radiusItems} onChange={changeSelectProp('borderRadius')} style={{ width: '20%' }} />
        <Checkbox label="Disabled" onClick={changeCheckboxProp('disabled')} />
        <Container style={{ width: '25%' }}><Input label="Icon" onChange={changeInputProp('icon')} defaultValue="Pricetags" /></Container>
    </Container>
    <IconButton icon="Pricetags" onClick={click} {...iconButtonProps} />
</Container>
```

### Development status:

It could make sense to allow the normal Button to have no label and deprecate this component.
```jsx noEditor
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
