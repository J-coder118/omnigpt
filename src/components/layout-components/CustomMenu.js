import { Menu } from "antd";

const setDefaultOpen = (key) => {
  let keyList = [];
  let keyString = "";
  if (key) {
    const arr = key.split("-");
    for (let index = 0; index < arr.length; index++) {
      const elm = arr[index];
      index === 0 ? (keyString = elm) : (keyString = `${keyString}-${elm}`);
      keyList.push(keyString);
    }
  }
  return keyList;
};
const CustomMenu = (props) => {
  const { routeInfo, hideGroupTitle } = props;
  return (
    <Menu
      theme="light"
      mode="inline"
      style={{ height: "auto", borderRight: 0 }}
      defaultSelectedKeys={[routeInfo?.key]}
      defaultOpenKeys={setDefaultOpen(routeInfo?.key)}
      className={hideGroupTitle ? "hide-group-title" : ""}
    >
      {props.children}
    </Menu>
  );
};

export default CustomMenu;
