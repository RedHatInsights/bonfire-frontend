import React, { Suspense, lazy, useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import {
  Button,
  StackItem,
  Stack,
  Title,
  Spinner,
  Level,
  LevelItem,
} from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';
import { addNotification } from '@redhat-cloud-services/frontend-components-notifications/redux';


const SampleComponent = lazy(() =>
  import('../../Components/SampleComponent/sample-component')
);

import './namespace-page.scss';
import { NamespaceList } from '../../Containers/NamespaceList'

/**
 * A smart component that handles all the api calls and data needed by the dumb components.
 * Smart components are usually classes.
 *
 * https://reactjs.org/docs/components-and-props.html
 * https://medium.com/@thejasonfile/dumb-components-and-smart-components-e7b33a698d43
 */
const NamespacePage = () => {
  const dispatch = useDispatch();
  const [ reload, setReload ] = useState(false);

  useEffect(() => {
    insights?.chrome?.appAction?.('namespace-page');
  }, []);

  const reloadData = () => {
    setReload(reload ? false : true);
  }

  const handleAlert = (variant, title, description) => {
    dispatch(
      addNotification({
        variant: variant,
        title: title,
        description: description,
      })
    );
  };

  const reserveButton = (
    <Button
        onClick={() => {
            handleAlert(
                "info",
                "Reserving an ephemeral namespace",
                "A request to reserve a namespace has been dispatched"
            )
            
            fetch(`/namespaces`, {
                method: 'POST'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                reloadData();
                handleAlert(
                    "success",
                    `Reserved namespace ${data.namespace}`
                )
            })
            .catch(error => console.log(error))
        }}
    >
        Reserve
    </Button>
);

  return (
    <React.Fragment>
      <PageHeader>
        <Level>
            <LevelItem>
              <PageHeaderTitle title="Ephemeral Namespaces" />
                <p> This is a proof of concept </p>
            </LevelItem>
            <LevelItem>
                {reserveButton}
            </LevelItem>
        </Level>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            <NamespaceList key={reload}/>
          </StackItem>
          <StackItem>
            <Suspense fallback={<Spinner />}>
              <SampleComponent />
            </Suspense>
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default withRouter(NamespacePage);