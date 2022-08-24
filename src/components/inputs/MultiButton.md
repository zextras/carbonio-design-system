<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

MultiButton is basically a Button with a Dropdown linked to the secondary action.
It can have a label or an icon as primary element.
Secondary icon can be customized.

```jsx
import { Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
		click: () => console.log("click1"),
	},
	{
		id: "activity-2",
		icon: "Plus",
		label: "Some Other Item",
		click: () => console.log("click2"),
		disabled: true,
	}];
  
<Container orientation="horizontal" style={{ gap: '10px'}} >
    <MultiButton label="Hello" onClick={console.log} items={items} />
    <MultiButton label="Hello" icon="Plus" onClick={console.log} items={items} />
    <MultiButton primaryIcon="Plus" onClick={console.log} items={items} />
    <MultiButton primaryIcon="Plus" icon="Activity" onClick={console.log} items={items} />
</Container>

```

### Sizes
MultiButton is available only from medium size and above. Small sizes are not available.
```jsx
import { Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
		click: () => console.log("click1"),
	},
	{
		id: "activity-2",
		icon: "Plus",
		label: "Some Other Item",
		click: () => console.log("click2"),
		disabled: true,
	}];

<Container orientation="vertical" style={{ gap: '10px'}} >
    <Container orientation="horizontal" style={{ gap: '10px'}}>
        <MultiButton size="medium" label="Hello" onClick={console.log} items={items} />
        <MultiButton size="large" label="Hello" onClick={console.log} items={items} />
        <MultiButton size="extralarge" label="Hello" onClick={console.log} items={items} />
    </Container>
    <Container orientation="horizontal" style={{ gap: '10px'}}>
        <MultiButton size="medium" primaryIcon="Plus" onClick={console.log} items={items} />
        <MultiButton size="large" primaryIcon="Plus" onClick={console.log} items={items} />
        <MultiButton size="extralarge" primaryIcon="Plus" onClick={console.log} items={items} />
    </Container>
</Container>

```
### Width

```jsx
import { Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
		click: () => console.log("click1"),
	},
	{
		id: "activity-2",
		icon: "Plus",
		label: "Some Other Item",
		click: () => console.log("click2"),
		disabled: true,
	}];

<Container orientation="vertical" style={{ gap: '10px'}} >
    <Container orientation="horizontal" style={{ gap: '10px'}}>
        <MultiButton width="fit" size="medium" primaryIcon="Plus" iconPlacement="left" label="Hello" onClick={console.log} items={items} />
        <MultiButton width="fit" size="large" primaryIcon="Plus" iconPlacement="left" label="Hello" onClick={console.log} items={items} />
        <MultiButton width="fit" size="extralarge" primaryIcon="Plus" iconPlacement="left" label="Hello" onClick={console.log} items={items} />
    </Container>
    <Container orientation="horizontal" style={{ gap: '10px'}}>
        <MultiButton width="fill" dropdownProps={{width:"100%"}} size="medium" primaryIcon="Plus" iconPlacement="left" label="Hello" onClick={console.log} items={items} />
        <MultiButton width="fill" dropdownProps={{width:"100%"}} size="large" primaryIcon="Plus" iconPlacement="left" label="Hello" onClick={console.log} items={items} />
        <MultiButton width="fill" dropdownProps={{width:"100%"}} size="extralarge" primaryIcon="Plus" iconPlacement="left" label="Hello" onClick={console.log} items={items} />
    </Container>
</Container>

```

### Type

```jsx
import { Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
		click: () => console.log("click1"),
	},
	{
		id: "activity-2",
		icon: "Plus",
		label: "Some Other Item",
		click: () => console.log("click2"),
		disabled: true,
	}];

<Container orientation="vertical" style={{ gap: '10px'}}>
    <Container orientation="horizontal" style={{ gap: '10px'}}>
        <MultiButton type="default" label="Hello" onClick={console.log} items={items} />
        <MultiButton type="outlined" label="Hello" icon="Plus" onClick={console.log} items={items} />
        <MultiButton type="ghost" label="Hello" icon="Plus" onClick={console.log} items={items} />
    </Container>
    <Container orientation="horizontal" style={{ gap: '10px'}}>
        <MultiButton type="default" primaryIcon="Plus" onClick={console.log} items={items} />
        <MultiButton type="outlined" primaryIcon="Plus" icon="Activity" onClick={console.log} items={items} />
        <MultiButton type="ghost" primaryIcon="Plus" icon="Activity" onClick={console.log} items={items} />
    </Container>
</Container>

```

### Shape

```jsx
import { Container } from '@zextras/carbonio-design-system';

const items = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
		click: () => console.log("click1"),
	},
	{
		id: "activity-2",
		icon: "Plus",
		label: "Some Other Item",
		click: () => console.log("click2"),
		disabled: true,
	}];

<Container orientation="horizontal" style={{ gap: '10px'}}>
    <MultiButton shape="regular" type="default" label="Hello" onClick={console.log} items={items} />
    <MultiButton shape="round" type="outlined" label="Hello" onClick={console.log} items={items} />
    <MultiButton shape="regular" type="default" primaryIcon="Plus" icon="Activity" onClick={console.log} items={items} />
    <MultiButton shape="round" type="outlined" primaryIcon="Plus" icon="Activity" onClick={console.log} items={items} />
</Container>

```
