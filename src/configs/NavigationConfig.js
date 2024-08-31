import { APP_PREFIX_PATH } from "configs/AppConfig";
import { FileAddOutlined } from "@ant-design/icons";

const dashBoardNavTree = [
  {
    key: "chatgpt",
    path: `${APP_PREFIX_PATH}/home`,
    title: "sidenav.chatgpt.newThread",
    icon: FileAddOutlined,
    breadcrumb: false,
    submenu: []
  }
  // {
  //   key: "integration",
  //   path: `${APP_PREFIX_PATH}/chatchannels`,
  //   title: "Integrations",
  //   icon: FileAddOutlined,
  //   breadcrumb: false,
  //   submenu: []
  // }
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
