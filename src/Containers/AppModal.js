import React, { useState, useEffect } from 'react';
import { Modal, ModalVariant, Button, Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';

export const AppModal = (onClose) => {
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);

    const dropdownItems = [
        <DropdownItem key="link">Link</DropdownItem>,
        <DropdownItem key="action" component="button">
            Action
        </DropdownItem>,
        <DropdownItem key="disabled link" isDisabled>
            Disabled Link
        </DropdownItem>,
        <DropdownItem key="disabled action" isDisabled component="button">
            Disabled Action
        </DropdownItem>,
        <DropdownItem key="separated link">Separated Link</DropdownItem>,
        <DropdownItem key="separated action" component="button">
            Separated Action
        </DropdownItem>
    ];

    return (
        <React.Fragment>
            <Modal
                title="Select App"
                variant={ModalVariant.small}
                onClose={onClose}
                actions={[
                    <Button key="confirm" variant="primary" onClick={onClose}>
                    Confirm
                    </Button>,
                    <Button key="cancel" variant="link" onClick={onClose}>
                    Cancel
                    </Button>
                ]}
            >
                <div>
                    Use the dropdown menu to select which app you'd like to deploy into the selected namespace.
                </div>
                <div>
                    <Dropdown
                        onSelect={() => {setIsDropdownOpen(false)}}
                        toggle={
                            <DropdownToggle
                            id="toggle-id-menu-document-body"
                            onToggle={setIsDropdownOpen(isDropdownOpen ? false : true)}
                            toggleIndicator={CaretDownIcon}
                            >
                            Applications
                            </DropdownToggle>
                        }
                        isOpen={isDropdownOpen}
                        dropdownItems={dropdownItems}
                        menuAppendTo="parent"
                    />
                </div>
            </Modal>
        </React.Fragment>
    )
}