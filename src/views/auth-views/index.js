import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { AUTH_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="page" />}>
      <Switch>
        <Route
          path={`${AUTH_PREFIX_PATH}/login`}
          component={lazy(() => import(`./authentication/login`))}
        />
        <Route
          path={`${AUTH_PREFIX_PATH}/welcome`}
          component={lazy(() => import(`./welcome`))}
        />
        <Redirect
          from={`${AUTH_PREFIX_PATH}`}
          to={`${AUTH_PREFIX_PATH}/login`}
        />
      </Switch>
    </Suspense>
  );
};

export default AppViews;
