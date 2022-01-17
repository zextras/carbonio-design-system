<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

Breadcrumbs allow users to make selections from a range of values.

If the Breadcrumb does not fit into the parent, the first breadcrumbs are collapsed into a `...` (three dot) element.

The `...` (three dot) element is a button, when clicked, a dropdown is shown wit the collapsed elements.
The order is defined this way:

| / | path | / | to | / | route |
|---|------|---|----|---|-------|
|   |  1   |   |  2 |   |   3   |

When collapsed, the result is defined with this order:

| ... | / | route |
|-----|---|-------|
| to  |||
| route |||

```jsx

const crumbs = [
    {
        id: 'crumb-1',
        label: 'Goodnight',
        click: () => console.log('Goodnight')
    },
    {
        id: 'crumb-2',
        label: 'Hello',
        click: () => console.log('Hello')
    },
    {
        id: 'crumb-3',
        label: 'AAAAAA',
        click: () => console.log('AAAAAA')
    },
    {
        id: 'crumb-4',
        label: 'Goodbye',
        click: () => console.log('Goodbye')
    },
    {
        id: 'crumb-5',
        label: 'Ok',
        click: () => console.log('Ok')
    }
];

<>
	<div style={{ width: '50%', height: '400px', border: '1px solid grey' }}>
		<Breadcrumbs crumbs={crumbs}/>
	</div>
	<h3>Collapsed</h3>
	<div style={{ width: '200px', maxWidth: '100%', border: '1px solid grey' }}>
		<Breadcrumbs crumbs={crumbs}/>
	</div>
</>
```

### Customization

Breadcrumb item props, dropdown props and collapser item props are spread, so all events can be handled. Below an example for drag and drop

#### Drag and drop
```jsx

import { useCallback, useRef, useEffect } from 'react';

const collapserRef = useRef();
const containerRef = useRef();
const openRef = useRef();

const closeCollapser = useCallback((event) => {
	if (openRef.current && !event.defaultPrevented) {
		containerRef.current.click();
		openRef.current = false;
	}
}, []);

const preventDropdownClose = useCallback((event) => {
	event.preventDefault();
}, []);

const dragEnterHandler = useCallback((event) => {
    event.currentTarget.style.background = "lightgray";
}, []);

const dragLeaveHandler = useCallback((event) => {
    event.currentTarget.style.background = "";
}, []);

const dragOverHandler = useCallback((event) => {
    event.currentTarget.style.background = "lightgray";
    event.preventDefault();
}, []);

const dropHandler = useCallback((event) => {
    event.preventDefault();
    const draggedData = event.dataTransfer.getData('text/plain');
    console.log('droppedData', draggedData, 'on', event.currentTarget)
    event.currentTarget.style.background = "";
}, []);

const dragStartHandler = useCallback((event) => {
    event.dataTransfer.setData('text/plain', 'bla bla data to be drag-n-dropped');
    event.target.style.opacity = 0.5;
}, []);

const dragEndHandler = useCallback((event) => {
    event.target.style.opacity = 1;
    closeCollapser(event);
}, []);

const collapserDragEnterHandler = useCallback((event) => {
    event.preventDefault();
	const alreadyOpen = openRef.current;
	event.currentTarget.style.background = "lightgray";
    if (!alreadyOpen && event.currentTarget === event.target) {
        collapserRef.current = event.currentTarget;
        event.currentTarget.click();
        openRef.current = true;
    }
}, []);

const collapserDragLeaveHandler = useCallback((event) => {
	event.currentTarget.style.background = "";
    event.preventDefault();
}, []);

const collapserDragOverHandler = useCallback((event) => {
	event.preventDefault();
	event.currentTarget.style.background = "lightgray";
}, []);


const collapserDropHandler = useCallback((event) => {
	event.currentTarget.style.background = "";
	collapserRef.current.click();
}, []);

useEffect(() => {
	document.addEventListener('dragenter', closeCollapser);
	
	return () => {
		document.removeEventListener('dragenter', closeCollapser)
    }
}, [closeCollapser])

const crumbs = [
	{
		id: 'crumb-1',
		label: 'Goodnight',
		click: () => console.log('Goodnight'),
		onDragEnter: dragEnterHandler,
		onDragLeave: dragLeaveHandler,
		onDragOver: dragOverHandler,
		onDrop: dropHandler,
        style: { cursor: 'pointer', borderRadius: '2px' }
	},
	{
		id: 'crumb-2',
		label: 'Hello',
		click: () => console.log('Hello'),
		onDragEnter: dragEnterHandler,
		onDragLeave: dragLeaveHandler,
		onDragOver: dragOverHandler,
		onDrop: dropHandler,
        style: { cursor: 'pointer', borderRadius: '2px' }
	},
	{
		id: 'crumb-3',
		label: 'AAAAAA',
		click: () => console.log('AAAAAA'),
		onDragEnter: dragEnterHandler,
		onDragLeave: dragLeaveHandler,
		onDragOver: dragOverHandler,
		onDrop: dropHandler,
        style: { cursor: 'pointer', borderRadius: '2px' }
	},
	{
		id: 'crumb-4',
		label: 'Goodbye',
		click: () => console.log('Goodbye'),
		onDragEnter: dragEnterHandler,
		onDragLeave: dragLeaveHandler,
		onDragOver: dragOverHandler,
		onDrop: dropHandler,
        style: { cursor: 'pointer', borderRadius: '2px' }
	},
	{
		id: 'crumb-5',
		label: 'Ok',
		click: () => console.log('Ok'),
		onDragEnter: dragEnterHandler,
		onDragLeave: dragLeaveHandler,
		onDragOver: dragOverHandler,
		onDrop: dropHandler,
        style: { cursor: 'pointer', borderRadius: '2px' }
	}
];


<div ref={containerRef}>
	<div
		draggable
		style={{border: '1px solid red', width: 'fit-content'}}
		onDragStart={dragStartHandler}
		onDragEnd={dragEndHandler}
	>
		Drag me
	</div>
	<div style={{ padding: '10px', border: '1px solid gray', margin: '10px 0' }}>
			<Breadcrumbs
				crumbs={crumbs}
				collapserProps={{
					onDragEnter: collapserDragEnterHandler,
					onDragOver: collapserDragOverHandler,
					onDragLeave: collapserDragLeaveHandler,
					onDrop: collapserDropHandler,
                    style: { cursor: 'pointer', borderRadius: '2px' }
				}}
				dropdownProps={{
					onDragEnter: preventDropdownClose
				}}
			/>
	</div>
    <h3>Collapsed</h3>
	<div style={{ width: '200px', maxWidth: '100%', padding: '10px', border: '1px solid gray', margin: '10px 0', boxSizing: 'border-box' }} onDragEnter={preventDropdownClose}>
			<Breadcrumbs
				crumbs={crumbs}
				collapserProps={{
					onDragEnter: collapserDragEnterHandler,
					onDragOver: collapserDragOverHandler,
					onDragLeave: collapserDragLeaveHandler,
					onDrop: collapserDropHandler,
                    style: { cursor: 'pointer', borderRadius: '2px' }
				}}
				dropdownProps={{
					onDragEnter: preventDropdownClose
				}}
			/>
	</div>
</div>
```

#### Pseudo statuses on crumbs

Another example of how the spread props can be used to customize the breadcrumb

```jsx
import styled from 'styled-components';
import { getColor } from '@zextras/carbonio-design-system';

const crumbs = Array.from({ length: 5 }, (_, i) => ({
	id: `crumb-${i}`,
	label: `crumb ${i}`,
	click: () => i!== 0 && console.log('click crumb', i),
	className: 'breadcrumbCrumb',
    disabled: i === 0
}));

crumbs[crumbs.length - 1].className = `${crumbs[crumbs.length - 1].className} currentCrumb`

const CustomBreadcrumbs = styled(Breadcrumbs)`
	.breadcrumbCrumb {
		border-radius: 2px;
		&:not([disabled]):hover {
			background-color: ${getColor('gray5.hover')};
		}
		&[disabled], &[disabled] * {
		  cursor: default;
		  color: ${getColor('text.disabled')}
		}
		&.currentCrumb {
			cursor: default;
			&:hover {
				background-color: inherit;
			}
		}
	}

	.breadcrumbCollapser {
		border-radius: 2px;
		&:active,
		&.active {
			background-color: ${getColor('gray4.active')};
		}
		&:hover {
			background-color: ${getColor('gray4.hover')};
		}
	}
`;

<div>
	<div style={{ width: '50%', border: '1px solid grey', padding: '4px 0' }}>
		<CustomBreadcrumbs crumbs={crumbs} collapserProps={{ className: 'breadcrumbCollapser' }} />
	</div>
	<h3>Collapsed</h3>
	<div style={{ width: '200px', maxWidth: '100%', border: '1px solid grey', padding: '4px 0' }}>
		<CustomBreadcrumbs 
          crumbs={crumbs}
          collapserProps={{ className: 'breadcrumbCollapser' }}
          dropdownProps={{
            onOpen: () => document.querySelector('.breadcrumbCollapser').classList.add('active'),
            onClose: () => document.querySelector('.breadcrumbCollapser').classList.remove('active')
          }}
        />
	</div>
</div>
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
}];

<StatusTable items={items} />

```
