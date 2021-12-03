import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, ModalVariant, Button, Dropdown, DropdownToggle, DropdownItem } from '@patternfly/react-core';
import CaretDownIcon from '@patternfly/react-icons/dist/esm/icons/caret-down-icon';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

export const AppModal = ({isOpen, onClose, namespace}) => {
    const dispatch = useDispatch();
    const [ isDropdownOpen, setIsDropdownOpen ] = useState(false);
    const [ selectedApp, setSelectedApp ] = useState('Applications');

    const handleAlert = (variant, title, description) => {
        dispatch(
            addNotification({
                variant: variant,
                title: title,
                description: description,
            })
        );
    };

    const dropdownItems = [
        <DropdownItem onClick={() => {setSelectedApp("RBAC")}}>RBAC</DropdownItem>,
        <DropdownItem onClick={() => {setSelectedApp("Host Inventory")}}>Host Inventory</DropdownItem>,
        <DropdownItem onClick={() => {setSelectedApp("Engine")}}>Engine</DropdownItem>
    ];

    return (
        <React.Fragment>
            <Modal
                title="Select App"
                variant={ModalVariant.small}
                isOpen={isOpen}
                onClose={() => {onClose(); setSelectedApp('Applications')}}
                actions={[
                    <Button key="confirm" variant="primary"
                        onClick={() => {
                            onClose();
                            handleAlert(
                                "info",
                                `Now deploying ${selectedApp} to ${namespace}`
                            )
                            setSelectedApp('Applications');
                        }}>
                    Confirm
                    </Button>,
                    <Button key="cancel" variant="link" onClick={() => {onClose(); setSelectedApp('Applications')}}>
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
                                id="toggle-id-menu-body"
                                onToggle={() => {setIsDropdownOpen(!isDropdownOpen)}}
                                toggleIndicator={CaretDownIcon}
                            >
                            {selectedApp}
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