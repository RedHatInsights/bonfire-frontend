import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { AppModal } from '../Modals/AppModal';
import { Tbody, Tr, Td } from '@patternfly/react-table';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

const NamespaceTableBody = ({ namespaceData, reloadData }) => {
  const dispatch = useDispatch();
  const [modalNamespace, setModalNamespace] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlert = (variant, title, description) => {
    dispatch(
      addNotification({
        variant: variant,
        title: title,
        description: description,
      })
    );
  };

  const deployAction = (name) => {
    setModalNamespace(name);
    setIsModalOpen(true);
  };

  const extendAction = (name) => {
    handleAlert('info', `Extending the reservation for namespace ${name}`);
    fetch(`/namespaces/${name}`, {
      method: 'PUT',
    })
      .then(setTimeout(() => reloadData(), 2000))
      .catch((error) => console.log(error));
  };

  const releaseAction = (name) => {
    handleAlert('info', `Releasing the reservation for namespace ${name}`);
    fetch(`/namespaces/${name}`, {
      method: 'DELETE',
    })
      .then(setTimeout(() => reloadData(), 3000)) // Figure out better delay
      .catch((error) => console.log(error));
  };

  const nsActions = (name) => [
    {
      title: 'Deploy Apps',
      onClick: () => {
        deployAction(name);
      },
    },
    {
      title: 'Extend',
      onClick: () => {
        extendAction(name);
      },
    },
    {
      title: 'Release',
      onClick: () => {
        releaseAction(name);
      },
    },
  ];

  return (
    <React.Fragment>
      {namespaceData && (
        <Tbody>
          {namespaceData.map((ns) => (
            <Tr key={ns.name}>
              <Td> {ns.name} </Td>
              <Td> {ns.reserved.toString()} </Td>
              <Td> {ns.status} </Td>
              <Td> {ns.apps} </Td>
              <Td> {ns.requester} </Td>
              <Td> {ns.expires_in} </Td>
              <Td
                // Upgrade to ActionColumn
                actions={{
                  items: nsActions(ns.name),
                  disable: !ns.reserved,
                }}
              />
            </Tr>
          ))}
        </Tbody>
      )}
      <AppModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(!isModalOpen);
        }}
        namespace={modalNamespace}
      />
    </React.Fragment>
  );
};

export default NamespaceTableBody;

NamespaceTableBody.propTypes = {
  namespaceData: PropTypes.array,
  reloadData: PropTypes.func,
};
