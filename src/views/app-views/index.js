import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loading from "components/shared-components/Loading";
import { APP_PREFIX_PATH } from "configs/AppConfig";

export const AppViews = () => {
  return (
    <Suspense fallback={<Loading cover="content" />}>
      <Switch>
        <Route
          path={`${APP_PREFIX_PATH}/home`}
          component={lazy(() => import(`./chatgpt`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/conversation/:id`}
          component={lazy(() => import(`./conversation/active-conversation`))}
        />
        <Route
          path={`${APP_PREFIX_PATH}/conversation`}
          component={lazy(() => import(`./conversation`))}
        />
       
        <Redirect from={`${APP_PREFIX_PATH}`} to={`${APP_PREFIX_PATH}/home`} />
      </Switch>
    </Suspense>
  );
};

export default React.memo(AppViews);
