import { useEffect } from "react";
import { signOut } from "redux/actions/Auth";
import { connect } from "react-redux";

const TimeOut = ({ signOut }) => {
  let idleLogout = 1000 * 60 * 120; // 2hrs
  let idleLogoutEvent;

  const events = ["click", "mousemove", "keypress"];

  const sessionTimeout = () => {
    if (!!idleLogoutEvent) clearTimeout(idleLogoutEvent);

    idleLogoutEvent = setTimeout(logOut, idleLogout); //Call logged out on session expire.
  };

  const logOut = () => {
    console.log("Session expired, logging out.");
    return signOut();
  };

  useEffect(() => {
    for (let e in events) {
      window.addEventListener(events[e], sessionTimeout);
    }

    return () => {
      for (let e in events) {
        window.removeEventListener(events[e], sessionTimeout);
      }
    };

    // eslint-disable-next-line
  }, []);

  return <></>;
};

const mapDispatchToProps = {
  signOut
};

export default connect(null, mapDispatchToProps)(TimeOut);
