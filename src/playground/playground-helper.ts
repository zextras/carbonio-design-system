/*
 * SPDX-FileCopyrightText: 2024 Zextras <https://www.zextras.com>
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

const jsx = `() => {
    const ref = React.useRef('test')
    const { createModal, closeModal } = useModal();
    const [open, setOpen] = React.useState(false);
    const clickHandler = () => setOpen(true);
    const closeHandler = () => {
        setOpen(false)
        console.log('onConfirm')
    }
    
    const openModal = React.useCallback(() => {
        createModal({
            id: 'test',
            title: 'titolo',
            children: 'content',
            confirmLabel: 'Confermo',
            onConfirm: () => {
                closeModal('test');
            },
            onClose: () => closeModal('test')
        })
    }, [])
    
    const customComponent = () => {
        return (
            <Container>
                test
            </Container>
        )
    }
    
    const openModal2 = React.useCallback(() => {
        createModal({
            id: 'test2',
            children: customComponent
        }, true)
    }, [])
    
    return (
      <Container mainAlignment="flex-start" crossAlignment="center" orientation="horizontal" gap="1rem">
        <Button label="Trigger Modal" onClick={clickHandler} />
        <Modal
            optionalFooter={<Button label="opt footer"/>}
            secondaryActionLabel="very long secondary label"
            onSecondaryAction={() => {}}
            title="Title_bold_dark"
            open={open}
            onConfirm={closeHandler}
            onClose={closeHandler}
            showCloseIcon={true}
            ref={ref}
          >
        <Text overflow="break-word">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
        </Modal>
        <Button label="open with useModal" onClick={openModal} />
        <Button label="open with useModal customFooter" onClick={openModal2} />
      </Container>
    )
}`;

const css = `* {
    margin: 0;
    padding: 0;
}`;

export { jsx, css };
