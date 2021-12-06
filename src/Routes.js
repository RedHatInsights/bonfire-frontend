import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Bullseye, Spinner } from '@patternfly/react-core';

const OopsPage = lazy(() =>
  import(/* webpackChunkName: "OopsPage" */ './Routes/OopsPage/OopsPage')
);
const NamespacePage = lazy(() =>
  import(
    /* webpackChunkName: "NamespacePage" */ './Routes/NamespacePage/NamespacePage'
  )
);

export const Routes = () => (
  <Suspense
    fallback={
      <Bullseye>
        <Spinner />
      </Bullseye>
    }
  >
    <Switch>
      <Route path="/oops" component={OopsPage} />
      <Route path="/namespaces" component={NamespacePage} />
      {/* Finally, catch all unmatched routes */}
      <Route>
        <Redirect to="/namespaces" />
      </Route>
    </Switch>
  </Suspense>
);
