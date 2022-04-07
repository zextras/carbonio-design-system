<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Dropdowns are toggleable, contextual overlays for displaying lists of links and more. They’re toggled by clicking.

Dropdown list items can be customized with components and/or disabled.

```jsx
import { useMemo, useState } from "react";
import { Container, Padding, Text, Button, IconButton } from "@zextras/carbonio-design-system";

const CUSTOM=(props)=>{
 // console.log("propsdd:",props);

const action=(e)=>{
  e.preventDefault();

  console.log('vv hogya.....')
}
 return <div onClick={action} className="keepOpen" >
      <Button  label="click me!" data-keep-open />    
</div>
}
const items = [
  {
    id: "activity-1",
    icon: "Activity",
    label: "Some Item",
    click: () => console.log("click1"),
    items: [
      {
        id: "sub1",
        icon: "Activity",
        label: "Some Item",
        click: () => console.log("click1")
      },
      {
        id: "sub2",
        icon: "Activity",
        label: "Some Item",
        click: () => console.log("click1"),
      },
      {
        id: "sub3",
        icon: "Activity",
        label: "Some Item",
        click: () => console.log("click1"),
      },
      {
        id: "sub4",
        icon: "Activity",
        label: "Some Item",
        click: () => console.log("click1"),
      }
    ]
  },
  {
    id: "activity-2",
    icon: "Plus",
    label: "Some Other Item",
    click: () => console.log("click2"),
    disabled: true,
  },
  { type: 'divider', id: 'divider' },
  {
    id: "activity-3",
    icon: "Activity",
    label: "Yet Another Item",
    click: () => console.log("click3"),
  },
  {
    id: "activity-99",
    icon: "Tag",
    label: "mested Some Item ",
   click: () => console.log("dddddddddd3"),
    customComponent:CUSTOM,
  },
];


const itemsSet2 = [
	{
		id: "activity-1",
		icon: "Activity",
		label: "Some Item",
		click: () => console.log("click1")
	},
	{
		id: "activity-3",
		icon: "Activity",
		label: "Yet Another Item",
    keepOpen: true,
		items: [
			{
				
    id: "activity-99",
    icon: "Tag",
    label: "mested Some Item ",
    abcd:'dd',
    keepOpen:true,
   //  click: () => console.log("dddddddddd3"),
     customComponent:CUSTOM,
     closeOnClick:false
  
			},
			{
					
    id: "activity-99",
    icon: "Tag",
				label: "Some Item",
				click: () => console.log("click1"),
			},
     
		]
	}
];

const [open, setOpen] = useState(false);
<>
  

  <Container orientation="horizontal" mainAlignment="flex-start">

   
	<Padding left='small'>
	 <Dropdown itemPaddingBetween="large" itemIconSize="large" itemTextSize="large" selectedBackgroundColor="highlight" items={itemsSet2} multiple={true}>
	  <Button label="Custom size and highlight" />
	 </Dropdown>
	</Padding>

  </Container>
</>;
```

### Development status:

```jsx noEditor
import { Container, Icon } from "@zextras/carbonio-design-system";
import StatusTable from "status-table";
const items = [
  {
    feature: "Graphics",
    status: 1,
    notes: "",
  },
  {
    feature: "Documentation",
    status: 1,
    notes: "",
  },
  {
    feature: "Examples",
    status: 2,
    notes: "Needs more examples",
  },
  {
    feature: "I18n Compatibility",
    status: 1,
    notes: "",
  },
  {
    feature: "Theme Compatibility",
    status: 1,
    notes: "",
  },
  {
    feature: "Dark Mode",
    status: 1,
    notes: "",
  },
  {
    feature: "Prop Types",
    status: 1,
    notes: "",
  },
  {
    feature: "Index Export",
    status: 1,
    notes: "",
  },
  {
    feature: "Customizability",
    status: 1,
    notes: "Accepts custom list components as items",
  },
];

<StatusTable items={items} />;
```
