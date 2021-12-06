import React from 'react';
import { Button } from '@patternfly/react-core';
import { useDispatch } from 'react-redux';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';

const ReserveButton = ({refresh}) => {
  const dispatch = useDispatch();

  const handleAlert = (variant, title, description) => {
    dispatch(
      addNotification({
        variant: variant,
        title: title,
        description: description,
      })
    );
  };

  const handleReserveButtonClick = () => {
    handleAlert(
      'info',
      'Reserving an ephemeral namespace',
      'A request to reserve a namespace has been dispatched'
    );

    fetch(`/namespaces`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        handleAlert('success', `Reserved namespace ${data.namespace}`);
        refresh();
      })
      .catch((error) => console.log(error));
  };

  return <Button onClick={() => handleReserveButtonClick()}>Reserve</Button>;
};

export default ReserveButton;
