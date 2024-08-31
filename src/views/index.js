import { ConfigProvider } from "antd";
import AppLocale from "lang";
import AppLayout from "layouts/app-layout";
import AuthLayout from "layouts/auth-layout";
import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";

import { supabase } from "auth/SupabaseClient";
import Loading from "components/shared-components/Loading";
import {
  APP_PREFIX_PATH,
  AUTH_PREFIX_PATH,
  REDIRECT_PREFIX_PATH
} from "configs/AppConfig";
import useBodyClass from "hooks/useBodyClass";
import { SettingLayout } from "layouts/setting-layout";
import { setUserInfo, supabase_authenticated } from "redux/actions/Auth";
import ThemeSwitcher from "components/layout-components/ThemeSwitcher";

import useUserInfo from "hooks/useUserInfo";
import WhatsAppSetting from "./app-views/whatsapp";
import { isAuthenticationPage } from "utils/localStorage";
import { amplitude } from "App";
import NotFound from "../views/auth-views/components/NotFound";
import LandingPageLayout from "layouts/landing-page-layout";
import Integrations from "./app-views/integrations";

function RouteInterceptor({ children, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

export const Views = ({
  location,
  direction,
  supabase_authenticated,
  session,
  setUserInfo,
  userInfo,
  navCollapsed
}) => {
  const locale = userInfo?.language || "en";
  const currentAppLocale = AppLocale[locale];
  useBodyClass(`dir-${direction}`);

  const { data, isLoading } = useUserInfo(session);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data?.id) {
      setUserInfo(data);
      amplitude.track("Sign In");
    }
  }, [data, setUserInfo]);

  useEffect(() => {
    setLoading(true);
    const newSession = supabase.auth.session();
    supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession == null) {
        window.location.reload();
        return;
      }
      supabase_authenticated(newSession);
      setLoading(false);
    });
    supabase_authenticated(newSession);
    if (newSession || isAuthenticationPage()) {
      setLoading(false);
    }
    if (!newSession) {
      setLoading(false);
    }
  }, [supabase_authenticated]);

  if (isLoading === true || loading) {
    return <Loading cover="page" />;
  }
  return (
    <IntlProvider locale={locale} messages={currentAppLocale.messages}>
      <ConfigProvider locale={locale} direction={direction}>
        {process.env.REACT_APP_ENV !== "production" && !navCollapsed && (
          <ThemeSwitcher />
        )}
        <Switch>
          <Route exact path="/">
            <LandingPageLayout />
          </Route>

          <Route exact path={REDIRECT_PREFIX_PATH}>
            <Redirect to={`${APP_PREFIX_PATH}/app`} />
          </Route>

          <Route path={AUTH_PREFIX_PATH}>
            <AuthLayout direction={direction} />
          </Route>

          <Route exact path={"/account"}>
            <SettingLayout direction={direction} location={location} />
          </Route>
          <Route exact path={"/whatsapp"}>
            <WhatsAppSetting direction={direction} location={location} />
          </Route>

          <Route exact path={`${APP_PREFIX_PATH}/integration`}>
            <Integrations />
          </Route>

          <RouteInterceptor path={APP_PREFIX_PATH} isAuthenticated={session}>
            <AppLayout direction={direction} location={location} />
          </RouteInterceptor>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </ConfigProvider>
    </IntlProvider>
  );
};

const mapStateToProps = ({ theme, auth }) => {
  const { direction, navCollapsed } = theme;
  const { session, userInfo } = auth;
  return { direction, session, userInfo, navCollapsed };
};

const mapDispatchToProps = {
  supabase_authenticated,
  setUserInfo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Views));
