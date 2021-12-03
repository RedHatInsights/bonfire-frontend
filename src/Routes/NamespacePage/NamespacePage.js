import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { StackItem, Stack, Level, LevelItem } from '@patternfly/react-core';
import { Main } from '@redhat-cloud-services/frontend-components/Main';
import {
  PageHeader,
  PageHeaderTitle,
} from '@redhat-cloud-services/frontend-components/PageHeader';

import './namespace-page.scss';
import { NamespaceList } from '../../Containers/NamespaceList';
import { ReserveButton } from '../../Components/ReserveButton';

const NamespacePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [namespaceData, setNamespaceData] = useState();

  useEffect(() => {
    insights?.chrome?.appAction?.('namespace-page');
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    console.log('fetching data');
    fetch(`/namespaces`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNamespaceData(data.namespaces);
        setIsLoaded(true);
      })
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      <PageHeader>
        <Level>
          <LevelItem>
            <PageHeaderTitle title="Ephemeral Namespaces" />
            <p> This is a proof of concept </p>
          </LevelItem>
          <LevelItem>
            <ReserveButton />
          </LevelItem>
        </Level>
      </PageHeader>
      <Main>
        <Stack hasGutter>
          <StackItem>
            {isLoaded ? (
              <NamespaceList namespaces={namespaceData} />
            ) : (
              <div> Gathering namespaces... </div>
            )}
          </StackItem>
        </Stack>
      </Main>
    </React.Fragment>
  );
};

export default withRouter(NamespacePage);
