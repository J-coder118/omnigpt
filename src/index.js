import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from "./configs/AppConfig";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserbackProvider } from "@userback/react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`
};

ReactDOM.render(
  <Provider store={store}>
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme={THEME_CONFIG.currentTheme}
      insertionPoint="styles-insertion-point"
    >
      <QueryClientProvider client={queryClient}>
        <UserbackProvider token="37642|73555|kmvT5ZJKjdBcxkaQ5S6Nk5qJL">
          <App />
        </UserbackProvider>
      </QueryClientProvider>
    </ThemeSwitcherProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
