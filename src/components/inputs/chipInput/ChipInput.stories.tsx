/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */
import React, { useCallback, useRef, useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { times } from 'lodash';

import { ChipInput, ChipItem, DefaultOnAdd } from './ChipInput';
import { ChipInputControlledCleanInput } from './ChipInput.stories.cleanInput';
import { ControlledChipInput } from './ChipInput.stories.controlledMode';
import { ChipInputDisabledWithOptions } from './ChipInput.stories.disabledWithOptions';
import { ChipInputSuggestionMode } from './ChipInput.stories.suggestionMode';
import { Text } from '../../basic/text/Text';
import { Chip, ChipProps } from '../../display/Chip';
import { Popover } from '../../display/Popover';
import { Container } from '../../layout/Container';

const meta = {
	component: ChipInput,
	args: {
		onAdd: fn(DefaultOnAdd)
	}
} satisfies Meta<typeof ChipInput>;
export default meta;

type Story = StoryObj<typeof ChipInput>;

export const Default = {} satisfies Story;

export const DisabledInput = {
	args: {
		placeholder: 'Disabled input',
		disabled: true,
		icon: 'PeopleOutline'
	}
} satisfies Story;

export const DisabledDropdown = {
	args: {
		placeholder: 'Disabled dropdown',
		disableOptions: true,
		options: [],
		icon: 'PeopleOutline'
	}
} satisfies Story;

export const DisabledIcon = {
	args: {
		placeholder: 'Disabled icon',
		iconDisabled: true,
		icon: 'PeopleOutline'
	}
} satisfies Story;

export const FullDisabledWithOptions = {
	render: ChipInputDisabledWithOptions,
	args: {
		placeholder: 'Fully disabled with options',
		disabled: true,
		disableOptions: true,
		onOptionsDisplayChange: fn(),
		iconDisabled: true,
		icon: 'PeopleOutline'
	}
} satisfies Story;

export const ControlledMode = {
	render: ControlledChipInput,
	args: {
		requireUniqueChips: true,
		maxChips: 8
	}
} satisfies StoryObj<typeof ControlledChipInput>;

export const UncontrolledMode = {
	args: {
		defaultValue: [{ label: 'Initial chip' }],
		placeholder: 'Type something, then press comma to create the chip',
		onAdd: fn((value): ChipItem => ({ label: `Label: ${value}` })),
		onChange: fn()
	}
} satisfies Story;

export const WithValidation = {
	args: {
		placeholder: 'Emails',
		onAdd: fn((valueToAdd): ChipItem => {
			function isValidEmail(email: string): boolean {
				const emailRegexp = /\S+@\S+\.\S+/;
				return emailRegexp.test(email);
			}
			if (typeof valueToAdd === 'string') {
				return {
					label: valueToAdd,
					error: !isValidEmail(valueToAdd) && 'Invalid email',
					avatarIcon: 'EmailOutline'
				};
			}
			return { label: 'invalid chip', error: 'Value is not a string' };
		})
	}
} satisfies Story;

export const ChipWithDifferentStyle = {
	args: {
		placeholder: 'Chips with different style',
		onAdd: fn(
			(valueToAdd): ChipItem => ({
				label: typeof valueToAdd === 'string' ? valueToAdd : 'unknown label',
				value: valueToAdd,
				background: 'primary',
				color: 'gray6',
				shape: 'regular',
				hasAvatar: false
			})
		)
	}
} satisfies Story;

export const WithCustomSeparators = {
	args: {
		placeholder: 'Custom separators',
		separators: [
			{ key: 'a', ctrlKey: false },
			{ key: 'e', ctrlKey: false },
			{ key: 'i', ctrlKey: false },
			{ key: 'o', ctrlKey: false },
			{ key: 'u', ctrlKey: false }
		]
	}
} satisfies Story;

export const MaxChips = {
	args: {
		placeholder: 'Max chips',
		maxChips: 3,
		defaultValue: [{ label: 'Chip 1' }, { label: 'Chip 2' }, { label: 'Chip 3' }]
	}
} satisfies Story;

export const WithErrors = {
	args: {
		placeholder: 'With error',
		hasError: true,
		description: 'There is an error',
		defaultValue: [{ label: 'A chip' }]
	}
} satisfies Story;

export const WithUniqChips = {
	args: {
		placeholder: 'With uniq chips',
		defaultValue: [{ label: 'one' }, { label: 'two' }, { label: 'three' }],
		requireUniqueChips: true
	}
} satisfies Story;

export const CreateChipOnPaste = {
	args: {
		placeholder: 'Create chip on paste',
		createChipOnPaste: true
	}
} satisfies Story;

export const WithIcon = {
	args: {
		placeholder: 'With icon',
		icon: 'EyeOutline'
	}
} satisfies Story;

export const WithIconAction = {
	args: {
		placeholder: 'With icon action',
		icon: 'EyeOutline',
		iconAction: fn()
	}
} satisfies Story;

export const WithCustomChip = {
	args: {
		placeholder: 'With custom chip',
		defaultValue: [{ label: 'Chip 1' }, { label: 'Chip 2' }],
		ChipComponent: (props): React.JSX.Element => {
			const [open, setOpen] = useState(false);
			const chipRef = useRef<HTMLDivElement>(null);
			const openPopover = useCallback<NonNullable<ChipProps['onClick']>>((e) => {
				e.preventDefault();
				e.stopPropagation();
				setOpen(true);
			}, []);

			const closePopover = useCallback(() => {
				setOpen(false);
			}, []);

			return (
				<>
					<Container ref={chipRef} flexShrink={0} width="fit">
						<Chip {...props} onClick={openPopover} />
					</Container>
					<Popover open={open} anchorEl={chipRef} placement="bottom" onClose={closePopover}>
						<Text>Popover for the chip: {props.label}</Text>
					</Popover>
				</>
			);
		}
	}
} satisfies Story;

export const WithHorizontalOverflow = {
	args: {
		placeholder: 'With horizontal overflow',
		defaultValue: times(50, (i) => ({ label: `chip number ${i + 1}` })),
		wrap: 'nowrap',
		icon: 'PeopleOutline'
	}
} satisfies Story;

export const WithVerticalOverflow = {
	args: {
		placeholder: 'With vertical overflow',
		defaultValue: times(50, (i) => ({ label: `chip number ${i + 1}` })),
		wrap: 'wrap',
		icon: 'PeopleOutline'
	}
} satisfies Story;

export const EnabledWithOptions = {
	args: {
		placeholder: 'Enabled with options',
		options: [
			{ id: '1', label: 'First option' },
			{ id: '2', label: 'Second option' },
			{ id: '3', label: 'Third option' },
			{ id: '4', label: 'Fourth option' },
			{ id: '5', label: 'Fifth option' }
		],
		disableOptions: false
	}
} satisfies Story;

export const DisabledWithOptions = {
	args: {
		placeholder: 'Disabled with options',
		options: [
			{ id: '1', label: 'First option' },
			{ id: '2', label: 'Second option' },
			{ id: '3', label: 'Third option' },
			{ id: '4', label: 'Fourth option' },
			{ id: '5', label: 'Fifth option' }
		],
		disableOptions: false,
		disabled: true
	}
} satisfies Story;

export const SuggestionMode = {
	render: ChipInputSuggestionMode,
	args: {
		placeholder: 'Options are filtered on typing',
		icon: 'ChevronDown',
		description:
			'Here options are shown when user starts typing or when the chevron icon is clicked',
		disableOptions: true
	}
} satisfies StoryObj<typeof ChipInputSuggestionMode>;

export const SuggestionModeWithFocusListener = {
	render: ChipInputSuggestionMode,
	args: {
		withFocusListener: true,
		placeholder: 'Options are filtered on typing',
		icon: 'ChevronDown',
		description: 'Here options are shown when ChipInput get focus',
		disableOptions: true
	}
} satisfies StoryObj<typeof ChipInputSuggestionMode>;

export const OptionsDropdownWidth = {
	args: {
		placeholder: 'Custom options dropdown width',
		options: [
			{
				id: 'o1',
				label: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque ut ante quis eros sagittis placerat. 
					Praesent porttitor erat nec metus blandit lacinia. Quisque ac laoreet lacus. 
					Integer dolor odio, sollicitudin vitae finibus ut, dictum eget nibh. 
					Aenean turpis ipsum, dapibus sed egestas ac, vulputate sit amet tortor.`
			}
		],
		dropdownWidth: 'auto',
		dropdownMaxWidth: '100%',
		disableOptions: false
	}
} satisfies Story;

export const CleaningInput = {
	render: ChipInputControlledCleanInput,
	args: {
		placeholder: 'Cleaning the input after controlled change',
		confirmChipOnBlur: false
	}
} satisfies Story;
