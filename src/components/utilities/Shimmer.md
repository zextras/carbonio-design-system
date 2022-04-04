<!--
SPDX-FileCopyrightText: 2021 Zextras <https://www.zextras.com>

SPDX-License-Identifier: AGPL-3.0-only
-->

This component is used to create a shimmering effect on the element that is passed in as a prop.

## BASIC

#### Skeleton.Avatar

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="100%">
    <Shimmer.Avatar size="large" />
    <Padding left="large" />
    <Shimmer.Avatar size="medium" />
    <Padding left="large" />
    <Shimmer.Avatar size="small" />
    <Padding left="large" />
    <Shimmer.Avatar size="large" radius="10px" />
    <Padding left="large" />
    <Shimmer.Avatar size="medium" radius="5px" />
    <Padding left="large" />
    <Shimmer.Avatar size="small" radius="2px" />
</Container>
```

#### Skeleton.Badge

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
    <Shimmer.Badge size="large" />
    <Padding left="large" />
    <Shimmer.Badge size="medium" />
</Container>
```

#### Skeleton.Button

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
    <Padding top="small" />
    <Shimmer.Button size="large" />
    <Padding left="large" />
    <Shimmer.Button />
    <Padding left="large" />
    <Shimmer.Button size="small" />
    <Padding left="large" />
    <Shimmer.Button size="large" radius="2em" />
    <Padding left="large" />
    <Shimmer.Button radius="2em" />
    <Padding left="large" />
    <Shimmer.Button size="small" radius="2em" />
</Container>
```

#### Skeleton.Icon

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
    <Shimmer.Icon size="large" />
    <Padding left="large" />
    <Shimmer.Icon />
</Container>
```

#### Skeleton.Logo

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
    <Shimmer.Logo size="large" />
    <Padding left="large" />
    <Shimmer.Logo />
    <Padding left="large" />
    <Shimmer.Logo size="small" />
    <Padding left="large" />
</Container>
```

#### Skeleton.Text

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="vertical" mainAlignment="flex-start" width="fill">
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Text size="large" width="500px" />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Text />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Text size="small" />
    </Container>
</Container>
```
## FORM

#### Skeleton.FormSection

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
<Shimmer.FormSection>
    <Shimmer.FormSubSection />
    <Shimmer.FormSubSection />
    <Shimmer.FormSubSection />
    <Shimmer.FormSubSection />
    <Shimmer.FormSubSection />
</Shimmer.FormSection>
```

#### Skeleton.Checkbox

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
<Shimmer.Checkbox />
```

#### Skeleton.Input

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
    <Shimmer.Input width="300px" />
    <Padding left="large" />
    <Shimmer.Input width="250px" checkbox />
</Container>
```

#### Skeleton.Searchbar

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="horizontal" mainAlignment="flex-start" width="fill">
    <Padding top="medium" />
    <Shimmer.Searchbar width="300px" />
</Container>
```

## NAVIGATION

#### Skeleton.Accordion

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="vertical" mainAlignment="flex-start" width="100%">
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Accordion width="182px" />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Accordion width="206px" iconStart />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Accordion width="252px" iconStart badge />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Accordion width="276px" iconStart badge iconEnd />
    </Container>
</Container>
```

#### Skeleton.Stepper

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="vertical" mainAlignment="flex-start" width="100%">
    <Shimmer.Stepper size="medium" steppersNumber="5" />
    <Padding top="medium" />
    <Shimmer.Stepper size="medium" steppersNumber="4" />
    <Padding top="medium" />
    <Shimmer.Stepper size="medium" steppersNumber="3" />
</Container>
```

## DATA DISPLAY

#### Skeleton.EmailChip

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="vertical" mainAlignment="flex-start" width="100%">
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.EmailChip width="89px" />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.EmailChip width="105px" iconStart />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.EmailChip width="121px" iconStart iconEnd />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.EmailChip width="141px" iconStart iconEnd iconEndAdditional />
    </Container>
</Container>
```

## FEEDBACK

#### Skeleton.Quota

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
<Shimmer.Quota height="8px" width="80%" />
```

#### Skeleton.Snackbar

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
import { Container } from '../layout/Container';

<Container orientation="vertical" mainAlignment="flex-start" width="100%">
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Snackbar width="198px" />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Snackbar width="264px" elementStart />
    </Container>
    <Padding top="medium" />
    <Container orientation="horizontal" width="100%" mainAlignment="flex-start">
        <Shimmer.Snackbar width="358px" elementStart elementEnd />
    </Container>
</Container>
```

## COMPOSITE COMPONENTS

#### List Item

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';
<>
    <Shimmer.ListItem width="455px" type={1} />
    <Padding top="extralarge" />
    <Shimmer.ListItem width="455px" type={2} />
    <Padding top="extralarge" />
    <Shimmer.ListItem width="455px" type={3} />
    <Padding top="extralarge" />
    <Shimmer.ListItem width="455px" type={4} />
    <Padding top="extralarge" />
    <Shimmer.ListItem width="455px" type={5} />
</>
```

#### Table List Item

```jsx
import { Shimmer } from '@zextras/carbonio-design-system';
import { Padding } from '../layout/Padding';

<>
    <Shimmer.TableListItem width="455px" type={1} />
    <Padding top="extralarge" />
    <Shimmer.TableListItem width="455px" type={2} />
    <Padding top="extralarge" />
    <Shimmer.TableListItem width="455px" type={3} />
</>
```

### Development status:

```jsx noEditor
import { Container, Icon } from '@zextras/carbonio-design-system';
import StatusTable from 'status-table';
const items = [
	{
		feature: 'Graphics',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Documentation',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Examples',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'I18n Compatibility',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Theme Compatibility',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Dark Mode',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Prop Types',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Index Export',
		status: 2,
		notes: 'To be checked'
	},
	{
		feature: 'Customizability',
		status: 2,
		notes: 'To be checked'
	}
];

<StatusTable items={items} />;
```
