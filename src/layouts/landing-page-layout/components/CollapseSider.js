import { useEffect } from "react";
import { connect } from "react-redux";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { toggleCollapsedNav, onMobileNavToggle } from "redux/actions/Theme";

const ButtonCollapse = ({
  navCollapsed,
  isMobile,
  mobileNav,
  toggleCollapsedNav,
  onMobileNavToggle
}) => {
  const onToggle = () => {
    toggleCollapsedNav(!navCollapsed);
  };

  let left = 0;
  if (!isMobile) {
    left = navCollapsed ? 80 : 250;
  } else {
    left = navCollapsed ? 77 : 250;
  }

  useEffect(() => {
    if (!isMobile) {
      return toggleCollapsedNav(false);
    }
    return !navCollapsed ? toggleCollapsedNav(!navCollapsed) : "";
    // eslint-disable-next-line
  }, [isMobile]);

  return (
    <button
      onClick={onToggle}
      style={{
        background: "#111826",
        borderRadius: "0px 12px 12px 0px",
        position: "absolute",
        left: `${left}px`,
        top: "50%",
        width: "18px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
        border: "none",
        cursor: "pointer",
        zIndex: 2,
        transition: "left 0.1s"
      }}
      className="collapse-btn"
    >
      {navCollapsed ? <RightOutlined /> : <LeftOutlined />}
    </button>
  );
};

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, mobileNav } = theme;
  return { navCollapsed, mobileNav };
};

export default connect(mapStateToProps, {
  toggleCollapsedNav,
  onMobileNavToggle
})(ButtonCollapse);
