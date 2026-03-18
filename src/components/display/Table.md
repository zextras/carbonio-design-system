<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

The Table component can be used to list long lists.

Each element of *headers* property represent a column in the head section of the table.
If *items* is provided the column will render the *label* provided as a **Select** component, otherwise as a string.

The *HeaderFactory* is responsible for rendering the head of the Table, and it receives these parameters:

- items: array - Each item of items represents a column of the header
- onChange: func - Callback of select all rows
- allSelected: bool - Whether all elements of the table are selected
- selectionMode: bool - Whether the table is in selection mode
- multiSelect: bool - Whether multiple rows are selectable

The *RowFactory* is responsible for rendering a single row of table, and it receives these parameters:

- index: int - Index of the row, starting from 1 if not specified in the row item itself
- item: object - Object representing the row
- onChange: func - callback of row selection
- selected: bool - Whether the row is selected
- selectionMode: bool - Whether the table is in selection mode
- clickable: bool - Whether the row is clickable
- multiSelect: bool - Whether multiple rows are selectable

```tsx
import { useState } from 'react';
import { Button, Container, Icon, Padding, Row, Text, Tooltip } from '@zextras/carbonio-design-system';

const [selectedRows, setSelectedRows] = useState([]);
const headers = [
  {
    id: 'date',
    label: "Date",
    width: "20%",
  },
  {
    id: 'server',
    label: "Server",
    width: "20%",
    i18nAllLabel: 'All',
    align: "left",
    items: [
      { label: 'Servername_1', value: '1'},
      { label: 'Servername_2', value: '2'},
      { label: 'Servername_3', value: '3'},
      { label: 'Servername_4', value: '4'},
      { label: 'Servername_5', value: '5'},
      { label: 'Servername_6', value: '6'},
      { label: 'Servername_7', value: '7'},
      { label: 'Servername_8', value: '8'},
    ],
    onChange: (e) => console.log("Filter changed", e)
  },
  {
    id: 'type',
    label: "Type",
    i18nAllLabel: 'All',
    width: "3.75rem",
    align: 'center',
    items: [
      { label: 'Information', value: '1'},
      { label: 'Warning', value: '2'},
      { label: 'Error', value: '3'},
    ],
    onChange: (e) => console.log("Filter changed", e)
  },
  {
    id: 'obj',
    label: "Object",
    width: "40%",
  }
];
const items = [
  {
    id: "1",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="Info" color="primary" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
  },
  {
    id: "2",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="AlertTriangle" color="warning" /></Container>, <Tooltip label="Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."><Text>Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text></Tooltip>],
    highlight: true,
    onClick: (e) => console.log("Row clicked", e),
  },
  {
    id: "3",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="CloseSquare" color="error" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
  },
  {
    id: "4",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="CloseSquare" color="error" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
  },
];

<>
    <Padding bottom="large"><Text size="large" weight="bold">Uncontrolled table</Text></Padding>    
    <Table
      rows={items}
      headers={headers}
      defaultSelection={['2', '3']}
      onSelectionChange={(selected) => console.log("Uncontrolled selection onChange", selected)}
    />
    <Row padding={{top: 'extralarge', bottom: 'large'}} mainAlignment="space-between" width="100%">
      <Text size="large" weight="bold">Controlled table</Text>
      <Button label="Reset" color="error" onClick={() => setSelectedRows([])} />
    </Row>    
    <Table
      rows={items}
      headers={headers}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
</>
```
### Single row selection
```jsx
import { useState } from 'react';
import { Button, Container, Icon, Padding, Row, Text, Tooltip } from '@zextras/carbonio-design-system';

const [selectedRows, setSelectedRows] = useState([]);
const headers = [
  {
    id: 'date',
    label: "Date",
    width: "20%",
  },
  {
    id: 'server',
    label: "Server",
    width: "20%",
    i18nAllLabel: 'All',
    align: 'left',
    items: [
      { label: 'Servername_1', value: '1'},
      { label: 'Servername_2', value: '2'},
      { label: 'Servername_3', value: '3'},
      { label: 'Servername_4', value: '4'},
      { label: 'Servername_5', value: '5'},
      { label: 'Servername_6', value: '6'},
      { label: 'Servername_7', value: '7'},
      { label: 'Servername_8', value: '8'},
    ],
    onChange: (e) => console.log("Filter changed", e)
  },
  {
    id: 'type',
    label: "Type",
    i18nAllLabel: 'All',
    width: "3.75rem",
    align: 'center',
    items: [
      { label: 'Information', value: '1'},
      { label: 'Warning', value: '2'},
      { label: 'Error', value: '3'},
    ],
    onChange: (e) => console.log("Filter changed", e)
  },
  {
    id: 'obj',
    label: "Object",
    width: "40%",
  }
];
const items = [
  {
    id: "1",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="Info" color="primary" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
  },
  {
    id: "2",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="AlertTriangle" color="warning" /></Container>, <Tooltip label="Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."><Text>Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text></Tooltip>],
    onClick: (e) => console.log("Row clicked", e),
  },
  {
    id: "3",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="CloseSquare" color="error" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
  },
  {
    id: "4",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="CloseSquare" color="error" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
  },
];

<>
    <Padding bottom="large"><Text size="large" weight="bold">Uncontrolled table</Text></Padding>    
    <Table
      rows={items}
      headers={headers}
      multiSelect={false}
      defaultSelection={['2']}
      onSelectionChange={(selected) => console.log("Uncontrolled selection onChange", selected)}
    />
    <Row padding={{top: 'extralarge', bottom: 'large'}} mainAlignment="space-between" width="100%">
      <Text size="large" weight="bold">Controlled table</Text>
      <Button label="Reset" color="error" onClick={() => setSelectedRows([])} />
    </Row>    
    <Table
      rows={items}
      headers={headers}
      multiSelect={false}
      selectedRows={selectedRows}
      onSelectionChange={setSelectedRows}
    />
</>
```
### Hide checkboxes and show custom indexes
```jsx  
import { useState } from 'react';
import { Button, Container, Icon, Padding, Row, Text, Tooltip } from '@zextras/carbonio-design-system';

const [selectedRows, setSelectedRows] = useState([]);
const headers = [
  {
    id: 'date',
    label: "Date",
    width: "20%",
    bold: true
  },
  {
    id: 'server',
    label: "Server",
    width: "20%",
    i18nAllLabel: 'All',
    align: 'left',
    bold: true,
    items: [
      { label: 'Servername_1', value: '1'},
      { label: 'Servername_2', value: '2'},
      { label: 'Servername_3', value: '3'},
      { label: 'Servername_4', value: '4'},
      { label: 'Servername_5', value: '5'},
      { label: 'Servername_6', value: '6'},
      { label: 'Servername_7', value: '7'},
      { label: 'Servername_8', value: '8'},
    ],
    onChange: (e) => console.log("Filter changed", e)
  },
  {
    id: 'type',
    label: "Type",
    i18nAllLabel: 'All',
    width: "3.75rem",
    align: 'center',
    bold: true,
    items: [
      { label: 'Information', value: '1'},
      { label: 'Warning', value: '2'},
      { label: 'Error', value: '3'},
    ],
    onChange: (e) => console.log("Filter changed", e)
  },
  {
    id: 'obj',
    label: "Object",
    bold: true,
    width: "40%",
  }
];
const items = [
  {
    id: "1",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="Info" color="primary" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
    index: 10
  },
  {
    id: "2",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="AlertTriangle" color="warning" /></Container>, <Tooltip label="Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."><Text>Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text></Tooltip>],
    onClick: (e) => console.log("Row clicked", e),
    index: 20
  },
  {
    id: "3",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="CloseSquare" color="error" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
    index: 30
  },
  {
    id: "4",
    columns: ["30 nov 2020, 06:01 AM", "Servernamerverylong", <Container><Icon icon="CloseSquare" color="error" /></Container>, "Zextras Backup Notifcation, Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    onClick: (e) => console.log("Row clicked", e),
    clickable: true,
    index: 40
  },
];

<>   
  <Table
    rows={items}
    headers={headers}
    showCheckbox={false}
    onSelectionChange={(selected) => console.log("Uncontrolled selection onChange", selected)}
  />
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
    status: 2,
    notes: 'Needs the possibility to disable the selection checkboxes (or the first column altogether)'
},
];

<StatusTable items={items} />

```
