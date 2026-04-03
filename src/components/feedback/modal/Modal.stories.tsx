/*
 * SPDX-FileCopyrightText: 2026 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import React, { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react-webpack5';

import type { ModalProps } from './Modal';
import { Modal } from './Modal';
import { Button } from '../../basic/button/Button';
import { Icon } from '../../basic/icon/Icon';
import { Text } from '../../basic/text/Text';
import { Checkbox } from '../../inputs/checkbox/Checkbox';
import { Container } from '../../layout/container/Container';
import { Row } from '../../layout/Row';

const meta = {
	component: Modal
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleModal = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />
				<Modal
					optionalFooter={<Button label="opt footer" onClick={(): void => undefined} />}
					secondaryActionLabel="very long secondary label"
					onSecondaryAction={(): void => {}}
					title="Title_bold_dark"
					open={open}
					onConfirm={closeHandler}
					onClose={closeHandler}
					showCloseIcon
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const ModalSizeVariants = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const [size, setSize] = useState<ModalProps['size']>('extrasmall');

		const clickHandlerExtrasmall = (): void => {
			setOpen(true);
			setSize('extrasmall');
		};
		const clickHandlerSmall = (): void => {
			setOpen(true);
			setSize('small');
		};
		const clickHandlerMedium = (): void => {
			setOpen(true);
			setSize('medium');
		};
		const clickHandlerLarge = (): void => {
			setOpen(true);
			setSize('large');
		};

		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Row takeAvailableSpace mainAlignment="space-around">
					<Button label="extrasmall" onClick={clickHandlerExtrasmall} />
					<Button label="small" onClick={clickHandlerSmall} />
					<Button label="medium" onClick={clickHandlerMedium} />
					<Button label="large" onClick={clickHandlerLarge} />
				</Row>
				<Modal
					title="Title_bold_dark"
					open={open}
					onConfirm={closeHandler}
					onClose={closeHandler}
					showCloseIcon
					size={size}
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const ErrorModal = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />
				<Modal
					type="error"
					title="Title_bold_dark"
					open={open}
					onConfirm={closeHandler}
					onClose={closeHandler}
					showCloseIcon
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const CenteredErrorModal = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />
				<Modal
					type="error"
					title="Title_bold_dark"
					open={open}
					centered
					onConfirm={closeHandler}
					onClose={closeHandler}
					showCloseIcon
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const ConfirmationModal = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />
				<Modal
					title="Title_bold_dark"
					open={open}
					dismissLabel="Cancel"
					onConfirm={closeHandler}
					confirmLabel="Proceed"
					onClose={closeHandler}
					optionalFooter={<Checkbox label="Never ask again!" />}
					showCloseIcon
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const MultipleActions = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />
				<Modal
					title="Title_bold_dark"
					open={open}
					onConfirm={closeHandler}
					confirmLabel="Main Action"
					onSecondaryAction={closeHandler}
					secondaryActionLabel="Secondary Action"
					onClose={closeHandler}
					showCloseIcon
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const CustomFooter = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />
				<Modal
					title="Title_bold_dark"
					open={open}
					customFooter={<Button label={"I'm a custom footer"} onClick={closeHandler} />}
					showCloseIcon
					onClose={closeHandler}
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const NestedModal = {
	name: 'Nested Modal (never use)',
	render: (): React.JSX.Element => {
		const [open1, setOpen1] = useState(false);
		const [open2, setOpen2] = useState(false);
		const clickHandler1 = (): void => setOpen1(true);
		const clickHandler2 = (): void => setOpen2(true);
		const closeHandler1 = (): void => setOpen1(false);
		const closeHandler2 = (): void => setOpen2(false);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler1} />
				<Modal
					size="medium"
					title="Modal 1"
					open={open1}
					confirmLabel="Open 2nd Modal"
					onConfirm={clickHandler2}
					onClose={closeHandler1}
				>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
				<Modal title="Modal 2" open={open2} onClose={closeHandler2}>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;

export const ModalWithCustomComponent = {
	render: (): React.JSX.Element => {
		const [open, setOpen] = useState(false);
		const clickHandler = (): void => setOpen(true);
		const closeHandler = (): void => setOpen(false);

		const TitleComponent = (
			<Container background="gray5" orientation="horizontal">
				<Icon icon="Award" color="secondary" size="medium" />
				<Text color="primary" weight="bold">
					Title
				</Text>
			</Container>
		);

		return (
			<>
				<Button label="Trigger Modal" onClick={clickHandler} />

				<Modal title={TitleComponent} open={open} onConfirm={closeHandler} onClose={closeHandler}>
					<Text overflow="break-word">
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
						incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
					</Text>
				</Modal>
			</>
		);
	}
} satisfies Story;
