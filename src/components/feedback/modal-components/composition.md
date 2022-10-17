Modal components are the ones used for the modal. They allow the dev to compose a custom modal with the same style of the standard modal

```tsx
import { useState } from 'react';
import { Button, CustomModal, Text, ModalHeader, ModalBody, ModalFooter, Divider, Modal, Container } from '@zextras/carbonio-design-system';

const [openCustomModal, setOpenCustomModal] = useState(false);
const [openStandardModal, setOpenStandardModal] = useState(false);
const openCustomHandler = () => setOpenCustomModal(true);
const closeCustomHandler = () => setOpenCustomModal(false);
const confirmCustomHandler = () => {
	console.log('confirm custom');
    closeCustomHandler()
}
const clickCustomHandler = () => {
	console.log('click custom modal content');
}
const openStandardHandler = () => setOpenStandardModal(true);
const closeStandardHandler = () => setOpenStandardModal(false);
const confirmStandardHandler = () => {
	console.log('confirm standard');
	closeStandardHandler();
}
const clickStandardHandler = () => {
	console.log('click standard modal content');
}

<Container orientation="horizontal" gap="0.625rem">
    <Button label="Trigger Custom Modal" onClick={openCustomHandler}/>
    <Button label="Trigger Standard Modal" onClick={openStandardHandler}/>
    <CustomModal
        open={openCustomModal}
        onClose={closeCustomHandler}
        onClick={clickCustomHandler}
    >
        <ModalHeader
            title="Custom modal composition"
            showCloseIcon
            onClose={closeCustomHandler}
            closeIconTooltip="Close"
        />
        <Divider />
        <ModalBody>
          <Text>This is a custom modal composed by modal components</Text>
        </ModalBody>
        <Divider />
        <ModalFooter
            confirmLabel="Confirm"
            onConfirm={confirmCustomHandler}
            onClose={closeCustomHandler}
        />
    </CustomModal>
    <Modal
        title="Standard modal"
        open={openStandardModal}
        onConfirm={confirmStandardHandler}
        onClose={closeStandardHandler}
        showCloseIcon={true}
        confirmLabel="Confirm"
        onClick={clickStandardHandler}
        closeIconTooltip="Close"
    >
      <Text>This is a standard modal composed by modal components</Text>
    </Modal>
</Container>
```
