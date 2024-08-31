import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Views from "./views";
import { Route, Switch } from "react-router-dom";
import * as amplitude from "@amplitude/analytics-browser";
import SessionTimeout from "components/layout-components/SessionTimeout";

amplitude.init(process.env.REACT_APP_AMPLITUDE_KEY, {
  defaultTracking: false
});
const user = JSON.parse(localStorage.getItem("email_signin"))?.email;
amplitude.setUserId(user ?? "guest");
export { amplitude };
function App() {
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "90%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={Views} />
        </Switch>
      </Router>
      <SessionTimeout />
    </div>
  );
}

export default App;
