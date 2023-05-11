### Default and general guidelines

The Banner is the component which informs the user about status of a process.
It remains visible until user does something for resolving the status, or clicks on “Close” button.

There are four available status of this component:

- **Success**: it gives the user a positive feedback about the completion of a process.
- **Error**: it gives the user a negative feedback about an action that has not been completed or that an error has occurred.
  The Banner shows a standard error message and the user can learn more about it.
- **Warning**: it informs the user that he/she must pay attention to something when doing or after having done an action.
- **Info**: it informs the user about the processing of an action and gives the possibility to the user of undoing the action done.

And three possible types (called _styles_ in the UI kit):

- Fill
- Outline
- Standard

#### Actions:

The available actions are: **Primary** and **Secondary**.

The available actions are freely customizable, which means that you can use all the properties of the button (chevron, icon, etc...).

“**More info**” trigger the modal of example, and is programmatically shown when there is some text cropped.

There is also the **Close** action, which should be used to toggle the visibility of the Banner.

```jsx
import { Container, ModalManager } from '@zextras/carbonio-design-system';
import { noop } from 'lodash';

<ModalManager>
	<Container gap={'1rem'}>
		<Banner description={'Description is required'} />
		<Banner
			status={'warning'}
			title={'Title is optional'}
			description={'Description is required'}
		/>
		<Banner
			status={'info'}
			title={'Title is optional'}
			description={'Description is required'}
			showClose
			onClose={noop}
		/>
		<Banner
			status={'error'}
			title={'Title is optional'}
			description={'Description is required'}
			showClose={false}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
		/>
		<Banner
			status={'success'}
			type={'outline'}
			title={'Title is optional'}
			description={'Description is required'}
			showClose
			onClose={noop}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
		/>
		<Banner
			status={'warning'}
			type={'outline'}
			title={'Title is optional'}
			description={'Description is required'}
			showClose
			onClose={noop}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
			secondaryAction={{ label: 'Secondary action', onClick: console.log }}
		/>
		<Banner
			status={'info'}
			type={'outline'}
			description={'Description is required'}
			showClose={false}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
			secondaryAction={{ label: 'Secondary action', onClick: console.log }}
		/>
		<Banner
			status={'error'}
			type={'outline'}
			description={'Description is required'}
			showClose={false}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
		/>
		<Banner
			status={'success'}
			type={'standard'}
			description={
				'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry'
			}
			showClose
			onClose={noop}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
		/>
		<Banner
			status={'warning'}
			type={'standard'}
			title={'Short title'}
			description={
				'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry'
			}
			showClose
			onClose={noop}
			primaryAction={{ label: 'Primary action', onClick: console.log }}
			secondaryAction={{ label: 'Secondary action', onClick: console.log }}
		/>
		<Banner
			status={'info'}
			type={'standard'}
			title={
				'The "sixth sick sheik\'s sixth sheep\'s sick" is believed to be the toughest tongue twister in the English language.'
			}
			description={
				'Text to edit: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry, Lorem Ipsum has been the industry'
			}
			showClose={false}
			onClose={noop}
			primaryAction={{ label: 'Primary action with long label', onClick: console.log }}
			secondaryAction={{ label: 'Secondary action with long label', onClick: console.log }}
		/>
		<Banner
			status={'error'}
			type={'standard'}
			title={'Lorem ipsum dolor sit amet'}
			description={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
			showClose
			onClose={noop}
			primaryAction={{ label: 'Primary action', onClick: console.log, icon: 'People' }}
			secondaryAction={{ label: 'Secondary action', onClick: console.log }}
		/>
	</Container>
</ModalManager>
```
