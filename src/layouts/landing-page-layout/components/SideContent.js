import React, { useState } from "react";
import { SearchOutlined, FileAddOutlined } from "@ant-design/icons";
import { Menu, Button, Tooltip, Input } from "antd";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";
import CustomMenu from "components/layout-components/CustomMenu";
import Plus from "assets/svg/Plus.svg";
import { Link } from "react-router-dom";

const navigationConfig = [
  {
    key: "chatgpt",
    path: `${APP_PREFIX_PATH}/home`,
    title: "New Thread",
    icon: FileAddOutlined,
    breadcrumb: false,
    submenu: []
  }
];

const SideContent = ({ isMobile, navCollapsed, openModal }) => {
  const [searchValue, setSearchValue] = useState("");
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    openModal();
  };
  return (
    <>
      <div style={{ marginTop: "4.5rem" }} className={`nav-menu-container`}>
        <Tooltip placement="right" title={isMobile && "Search Thread"}>
          <div
            className={`nav-search-thread ${
              navCollapsed ? "nav-search-thread-collapsed" : ""
            }`}
            onClick={(e) => console.log(e)}
          >
            <Input
              placeholder={"Search"}
              prefix={<SearchOutlined style={{ color: "#FFFFFF" }} />}
              value={searchValue}
              onChange={handleSearch}
              onClick={(e) => console.log(e)}
            />
          </div>
        </Tooltip>

        <CustomMenu>
          {navigationConfig.map((menu, index) => (
            <Menu.Item
              key={menu.key}
              className={
                navCollapsed
                  ? "new-Thread-Button-Collapsed"
                  : "new-Thread-Button"
              }
              onClick={() => openModal()}
            >
              <img
                src={Plus}
                alt={"Add New Thread"}
                className={
                  navCollapsed
                    ? "new-Thread-Button-Image-Collapsed"
                    : "new-Thread-Button-Image"
                }
              />
              {!navCollapsed && menu.title}
            </Menu.Item>
          ))}
        </CustomMenu>

        {!navCollapsed && (
          <Link to={AUTH_PREFIX_PATH}>
            <Button
              block
              style={{
                backgroundColor: "#05E283",
                position: "absolute",
                bottom: 0,
                border: "none",
                width: "92%",
                color: "#212936",
                fontSize: "14px",
                fontStyle: "normal",
                lineHeight: "21px",
                height: "37px",
                marginBottom: ".5rem"
              }}
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </>
  );
};

export default SideContent;
