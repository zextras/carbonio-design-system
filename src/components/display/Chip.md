<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

A Chip element is composed by an avatar, a label and some actions. All elements are optional.
Chips can have different variants, based on contents and colors, and two shapes, rounded or regular.

#### Content:

- The avatar can show the capitals, a picture or an icon. Icon, background and color are customizable.
- The label can be a simple text, a pair in the "key value" form, or any custom component. 
  The chip can have a max width which causes the “value” text to be cropped if needed. 
  If a max width is set, a tooltip will show all the text content while hovering on the chip. 
  If no max width is set, then the chip will expand its width to show the entire content without a tooltip.
- The actions can be icons or buttons. Actions and icons can be mixed together. 
  The close action can be quickly set through the onClose prop.

#### Colors:

The chip has a default palette (light version), but can be customized with the props related to colors and backgrounds.
The given colors are used with their set for the pseudo statuses 
(if a set is not provided within the theme, a runtime set will be generated. See ```theme-utils.ts: colorSet```)

The chip has two special statuses: disabled and error.
- When a chip is disabled, all elements within are disabled. 
  **In the disabled status the click and double click callbacks remain active.**
  It's up to the dev the definition of what these two functions should do when the chip is disabled.
- When a chip is in error, the elements remain enabled, but they take the error status too.



### Chip Examples

#### Simple chip

```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{gap: '8px'}}>
  <Chip label="Walter White" onClose={() => console.log('closed')} />
  <Chip label="Jessy Pinkman" error onClose={() => console.log('closed')} />
  <Chip label="Tuco" color="primary" />
  <Chip label="Marie Schrader" hasAvatar={false} />
  <Chip label="Hank Schrader" background="info" color="gray6" />
  <Chip
    label="Saul Goodman"
    background="primary"
    color="gray6"
    hasAvatar={false}
    onClose={() => console.log('closed')}
  />
  <Chip
    label="Mike Ehrmantraut"
    background="error"
    color="gray6"
    onClose={() => console.log('closed')}
  />
  <Chip label="Walter Hartwell White Jr." hasAvatar={false} background="warning" color="text" />
  <Chip
    label="Gus Fring"
    avatarPicture="https://static.wikia.nocookie.net/breakingbad/images/b/be/Season_4_-_Gus.jpg"
    background="success"
    color="text"
  />
  <Chip
    label="Jane Margolis"
    background="mediumorchid"
    color="white"
  />
</Container>
```

#### Error and disabled statuses

```jsx
import { Container } from '@zextras/carbonio-design-system';

const actions = [
          {
            id: 'action1',
            label: 'One ring to rule them all',
            type: 'icon',
            icon: 'EyeOutline'
          }
        ];

<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{gap: '8px'}}>
  <Chip label="Frodo Baggins" onClose={() => console.log('closed')} avatarIcon="Eye" disabled actions={actions} />
  <Chip label="Samwise (Sam) Gamgee" onClose={() => console.log('closed')} error actions={actions} />
  <Chip label="Gandalf the Grey" disabled="Message to tell user why this chip is disabled" />
  <Chip label="Legolas" avatarIcon="DiagonalArrowRightUp" error="Message to tell user why this chip is in error" />
</Container>
```

#### Tooltip

Tooltip for label is shown only on overflow

```jsx
import { Container } from '@zextras/carbonio-design-system';

<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{gap: '8px'}}>
  <Chip label="Harry James Potter" maxWidth="150px" onClose={console.log} tooltipPlacement="top" />
  <Chip label="Hermione Jean Granger" maxWidth="150px" onClose={console.log} tooltipPlacement="bottom" />
  <Chip label="Ronald Bilius Weasley" maxWidth="150px" onClose={console.log} tooltipPlacement="right" />
  <Chip label="Albus Percival Wulfric Brian Dumbledore" onClose={console.log} maxWidth="150px" tooltipPlacement="left" />
</Container>
```

#### Chip shape and size

```jsx
import { Container, Row, Text } from '@zextras/carbonio-design-system';

<Container wrap="wrap" mainAlignment="flex-start" crossAlignment="flex-start" maxWidth="700px" style={{ gap: '8px' }}>
  <Text size="large" weight="bold">Small</Text>
  <Row style={{ gap: '8px' }}>
    <Chip
      label="SpongeBob SquarePants"
      shape="regular"
      onClose={() => {}}
      size="small"
    />
    <Chip
      label="Patrick Star"
      shape="round"
      onClose={() => {}}
      size="small"
    />
  </Row>
  <Text size="large" weight="bold">Medium</Text>
  <Row style={{ gap: '8px' }}>
    <Chip
      label="Squidward Tentacles"
      shape="regular"
      onClose={() => {}}
      size="medium"
    />
    <Chip
      label="Mr. Krabs"
      shape="round"
      onClose={() => {}}
      size="medium"
    />
  </Row>
  <Text size="large" weight="bold">Large</Text>
  <Row style={{ gap: '8px' }}>
    <Chip
      label="Plankton and Karen"
      shape="regular"
      onClose={() => {}}
      size="large"
    />
    <Chip
      label="Sandy Cheeks"
      shape="round"
      onClose={() => {}}
      size="large"
    />
  </Row>
</Container>
```

#### Avatar customization

```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{gap: '8px'}}>
  <Chip
    label="Anakin Skywalker"
    avatarPicture="https://pbs.twimg.com/profile_images/726995002660810752/38zzuVUY_400x400.jpg"
    shape="regular"
  />
  <Chip
    label="Han Solo"
    avatarIcon="StarOutline"
    shape="regular"
  />
  <Chip
    label="Luke Skywalker"
    avatarIcon="StarOutline"
    avatarColor="primary"
    avatarBackground="gray6"
  />
  <Chip
    label="Princess Leia"
    avatarIcon="Star"
    avatarColor="yellow"
    avatarBackground="black"
  />
  <Chip
    label="Chewbacca"
    avatarLabel="Star Wars"
    avatarColor="rgb(255, 232, 31)"
    avatarBackground="#000000"
  />
</Container>
```

#### Label customization

```jsx
import { Button, Container, Row, Text, Tooltip } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{gap: '8px'}}>
  <Chip
    keyLabel="The Mandalorian:"
    label="Kuiil"
    shape="regular"
    maxWidth="250px"
  />
  <Chip
    keyLabel="The Mandalorian:"
    label="Greef Karga (Leader of the Bounty Hunters' Guild)"
    shape="regular"
    icon="PersonOutline"
    maxWidth="250px"
  />
  <Chip
    keyLabel="The Mandalorian:"
    label={(
      <Tooltip label="Din Djarin (Mandalorians Bounty Hunter's Guild Children of the Watch)" maxWidth="unset">
        <Row wrap="nowrap" minWidth={0}>
          <Text overflow="break-word" size="extrasmall">Din Djarin&nbsp;</Text>
          <Text color="secondary" size="extrasmall">Mandalorians Bounty Hunter's Guild Children of the Watch</Text>
        </Row>
      </Tooltip>
    )}
    icon="PersonOutline"
    maxWidth="250px"
    onClose={() => console.log('This is the way')}
  />
  <Chip
    keyLabel="The Mandalorian:"
    label={'Carasynthia "Cara" Dune'}
    maxWidth="250px"
    disabled="Disabled tooltip"
  />
  <Chip
    keyLabel="Grogu"
    label={(
      <>
        <Text weight="bold" size="regular">Grogu</Text>&nbsp;
        <Text weight="bold" color="primary">The Child</Text>&nbsp;
        <Text size="large" color="error">Baby Yoda</Text>&nbsp;
        <Text size="small" color="orange">king of</Text>&nbsp;
        <Text size="small" color="success" weight="bold">memes</Text>
      </>
    )}
    shape="regular"
  />
</Container>
```
#### Actions

```jsx
import { Button, Container, Row, Text, Tooltip } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{gap: '8px'}}>
  <Chip
    label="Daenerys Targaryen"
    shape="round"
    onClose={() => console.log('Dracarys')}
    actions={[
      {
        id: 'action1',
        label: 'The Dragon Queen',
        type: 'icon',
        icon: 'Crown'
      },
      {
        id: 'action2',
        label: 'The Queen Across the Water',
        type: 'button',
        icon: 'Globe2',
        onClick: () => console.log('Lady of Dragonstone')
      }
    ]}
  />
  <Chip
    label="Jon Snow"
    avatarPicture="https://64.media.tumblr.com/avatar_0aeca7a262ac_128.pnj"
    actions={[
      {
        id: 'action1',
        label: '998th Lord Commander of the Night\'s Watch',
        type: 'icon',
        icon: 'Moon'
      },
      {
        id: 'action2',
        label: 'Knows nothing',
        type: 'icon',
        icon: 'QuestionMark'
      }
    ]}
  />
  <Chip
    label="Eddard 'Ned' Stark"
    actions={[
      {
        id: 'action1',
        label: 'label for icon 1',
        type: 'icon',
        icon: 'Star',
      },
      {
        id: 'action2',
        label: 'label for action 1',
        type: 'button',
        icon: 'EyeOutline',
        onClick: () => console.log('clicked action 2'),
        disabled: true,
        background: 'primary',
        color: 'gray6'
      },
      {
        id: 'action3',
        type: 'button',
        icon: 'Close',
        onClick: () => console.log('clicked action 3'),
        background: 'primary',
        color: 'gray6'
      },
      {
        id: 'action4',
        label: 'label for icon 4',
        type: 'icon',
        icon: 'Share'
      }
    ]}
    onClick={() => console.log('chip click')}
  />
  <Chip
    label="Robert Baratheon"
    shape="regular"
    actions={[
      {
        id: 'action1',
        label: 'label for icon 1',
        type: 'icon',
        icon: 'Star'
      },
      {
        id: 'action2',
        label: 'label for action 1',
        type: 'button',
        icon: 'EyeOutline',
        onClick: () => console.log('clicked action 2')
      }
    ]}
    onClose={() => console.log('close')}
  />
  <Chip
    label="Jaime Lannister"
    shape="regular"
    error="Lost his hand while captured with Brienne of Tarth"
    actions={[
      {
        id: 'action1',
        label: 'label for icon 1',
        type: 'icon',
        icon: 'Star'
      },
      {
        id: 'action2',
        label: 'label for icon 2',
        type: 'button',
        icon: 'EyeOutline',
        onClick: () => {}
      }
    ]}
    onClose={() => console.log('close')}
  />
  <Chip
    label="Catelyn Stark"
    shape="regular"
    disabled="Disabled because why"
    actions={[
      {
        id: 'action1',
        label: 'label for icon 1',
        type: 'icon',
        icon: 'Star'
      },
      {
        id: 'action2',
        label: 'label for icon 2',
        type: 'icon',
        icon: 'EyeOutline'
      }
    ]}
    onClose={() => console.log('close')}
    onClick={() => console.log('click on disabled chip')}
  />
  <Chip
    hasAvatar={false}
    keyLabel="Queen:"
    label="Cersei Lannister"
    onClick={() => console.log('chip click')}
  />
  <Chip
    shape="regular"
    avatarLabel="IG-11"
    actions={[
      {
        id: 'action1',
        label: 'label for icon 1',
        type: 'icon',
        icon: 'Star'
      },
      {
        id: 'action2',
        label: 'label for icon 2',
        type: 'icon',
        icon: 'EyeOutline'
      }
    ]}
    onClose={() => console.log('close')}
    closable={false}
    onClick={() => console.log('chip click')}
    onDoubleClick={() => console.log('double click')}
  />
</Container>
```

#### Interaction (for click events)
Css pseudo classes are applied only if chip has a click or double click callback and is not disabled.

For now, double click handler does not prevent the click event.
It's up to the dev to eventually avoid the click callback to be called when double click is fired.
```jsx
import { Container } from '@zextras/carbonio-design-system';
<Container orientation="horizontal" wrap="wrap" mainAlignment="flex-start" maxWidth="700px" style={{ gap: '8px' }}>
  <Chip
    label="Buffy Summers"
    shape="round"
    onClose={() => console.log('What are we gonna do now?')}
    actions={[
      {
        id: 'action1',
        label: 'Vampire Slayer',
        type: 'icon',
        icon: 'MoonOutline'
      }
    ]}
    onClick={() => console.log('click')}
  />
  <Chip
      label="Xander Harris"
      shape="round"
      onClick={() => console.log('click')}
      onDoubleClick={() => console.log('double click')}
  />
  <Chip
      label="Willow Rosenberg"
      shape="round"
      onDoubleClick={() => console.log('double click')}
  />
  <Chip
      label="Cordelia Chase"
      shape="regular"
      onClick={() => console.log('click')}
      onDoubleClick={() => console.log('double click')}
      disabled
  />
</Container>
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
