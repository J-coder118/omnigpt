import { useState, useEffect } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { onSwitchTheme } from "redux/actions/Theme";
import { connect } from "react-redux";
import themeDarkSrc from "assets/svg/theme-dark.svg";
import themeLightSrc from "assets/svg/theme-light.svg";

const ThemeSwitcher = ({ onSwitchTheme }) => {
  const { switcher } = useThemeSwitcher();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("preferred-theme") === "dark" ? true : false
  );

  useEffect(() => {
    const toggle = document.querySelector(".toggle-inner");
    const theme = darkMode ? "dark" : "light";
    onSwitchTheme(theme);
    toggle.classList.toggle("toggle-active", darkMode);
    localStorage.setItem("preferred-theme", theme);
    switcher({ theme });
    //eslint-disable-next-line
  }, [darkMode]);

  return (
    <div id="toggle" onClick={() => setDarkMode((previous) => !previous)}>
      <div className="toggle-inner" />
      <div className="light">
        <div>
          <img src={themeLightSrc} alt="theme-mode" />
        </div>
        <div>Light</div>
      </div>
      <div className="dark">
        <div>
          <img src={themeDarkSrc} alt="theme-mode" />
        </div>
        <div>Dark</div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onSwitchTheme
};

export default connect(null, mapDispatchToProps)(ThemeSwitcher);
