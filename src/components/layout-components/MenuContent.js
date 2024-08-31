import {
  CloseOutlined,
  LoadingOutlined,
  MessageOutlined,
  SearchOutlined
} from "@ant-design/icons";
import {
  Grid,
  Input,
  Menu,
  message as AndtMessage,
  Space,
  Typography,
  Tooltip
} from "antd";
import IntlMessage from "components/util-components/IntlMessage";
import navigationConfig from "configs/NavigationConfig";
import { NAV_TYPE_SIDE } from "constants/ThemeConstant";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  editThread,
  getAllThreads,
  removeFontIsValid,
  setNewThreadIsValid,
  setResponseStatus,
  setSelectedThread,
  switchToChat,
  switchToHome,
  updateThread
} from "redux/actions/Conversation";
import { onMobileNavToggle, toggleCollapsedNav } from "redux/actions/Theme";
import Swal from "sweetalert2";
import utils from "utils";
import Delete from "../../assets/svg/Delete.svg";
import Edit from "../../assets/svg/Editor.svg";
import Plus from "../../assets/svg/Plus.svg";
import { supabase } from "../../auth/SupabaseClient";
import ConversationNavLink from "./ConverstaionNavLink";
import CustomMenu from "./CustomMenu";
import WhatsAppNav from "./WhatsAppNav";
import { amplitude } from "App";
const { useBreakpoint } = Grid;

const SideNavContent = (props) => {
  const {
    onMobileNavToggle,
    chatPage,
    threads,
    navCollapsed,
    fontBoldIsValid,
    removeFontIsValid,
    setNewThreadIsValid,
    session,
    getAllThreads,
    selectedThread,
    setSelectedThread,
    editThread,
    loadingEdit,
    editFailed,
    toggleCollapsedNav,
    updateThread,
    responseInProgress
  } = props;
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const closeMobileNav = () => {
    if (isMobile) {
      onMobileNavToggle(false);
    }
  };
  const [hoveredThread, setHoveredThread] = useState(selectedThread);
  const [searchValue, setSearchValue] = useState("");
  const [threadsToShow, setThreadsToShow] = useState([]);
  const [editingThread, setEditingThread] = useState("");
  const [threadUpdateTitle, setThreadUpdateTitle] = useState("");
  const [editValue, setEditValue] = useState("");
  const [statusFailed, setStatusFailed] = useState(editFailed);
  const [notDraggable, setNotDraggable] = useState(false);

  const intl = useIntl();

  useEffect(() => {
    const subcriptionThread = supabase
      .from("threads")
      .on("UPDATE", (payload) => {
        const newThread = payload.new;
        setThreadUpdateTitle(newThread.thread_id);
        setTimeout(() => {
          setThreadUpdateTitle("");
        }, 3500);
        updateThread(newThread.thread_id, newThread);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(subcriptionThread);
    };
  }, [updateThread]);

  useEffect(() => {
    setThreadsToShow(threads);
  }, [threads]);

  useEffect(() => {
    setStatusFailed(editFailed);
  }, [editFailed]);

  useEffect(() => {
    if (threads.length > 0) {
      let matchedThread = threads.filter((item) =>
        item.thread_name
          .toLowerCase()
          .includes(searchValue.toLowerCase().trim())
      );
      setThreadsToShow([...matchedThread]);
    }
  }, [searchValue, threads]);

  useEffect(() => {
    if (editingThread) {
      document.getElementById(editingThread).focus();
      const thread = threads.filter((item) => item.thread_id === editingThread);
      if (thread.length > 0) {
        setEditValue(thread[0].thread_name);
      }
    }
  }, [threads, editingThread]);

  const newThreadHandler = (index) => {
    if (responseInProgress) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title:
          "Please wait until the response is complete before switching to any chat.",
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    } else {
      setSelectedThread("");
      if (index === 0 && fontBoldIsValid) {
        removeFontIsValid();
        setNewThreadIsValid();
      }
    }
  };

  const deleteThread = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    AndtMessage.loading(intl.formatMessage({ id: "message.processing" }));
    supabase
      .from("threads")
      .delete()
      .eq("thread_id", id)
      .then((res, error) => {
        if (res) {
          getAllThreads(session.user.id);
          newThreadHandler(0);
          AndtMessage.success(
            intl.formatMessage({ id: "message.threadDelete.success" })
          );
        } else if (error) {
          console.error(
            `Error deleting thread with ID ${id}: ${error.message}`
          );
        }
      });
  };

  const handleUpdateThread = (e, item) => {
    let key = e.keyCode || e.which;
    if (key === 13) {
      const thread = threadsToShow.filter(
        (item) => item.thread_name === editValue
      );
      if (thread.length > 0 && item.thread_name !== editValue) {
        setStatusFailed(true);
      } else {
        if (item.thread_name !== editValue) {
          if (session.user.email) {
            editThread(
              {
                user_identifier: session.user.id,
                thread_id: item.thread_id
              },
              {
                thread_name: editValue
              }
            );
          }
        } else {
          setStatusFailed(false);
        }
      }
    }
  };

  useEffect(() => {
    if (!loadingEdit && !editFailed) {
      getAllThreads(session.user.id);
      setEditingThread("");
      setStatusFailed(false);
      setNotDraggable(false);
    }
    // eslint-disable-next-line
  }, [loadingEdit, editFailed]);

  const handleHover = (id) => {
    if (!(id === editingThread)) {
      setHoveredThread(id);
    }
  };

  const handleClickThread = (id) => {
    if (responseInProgress) {
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title:
          "Please wait until the response is complete before switching to any chat.",
        showConfirmButton: false,
        timer: 1500,
        toast: true
      });
    } else {
      removeFontIsValid();
      setSelectedThread(id);
    }
  };

  const handleClickEdit = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingThread(id);
    setHoveredThread("");
    setNotDraggable(true);
  };

  const handleChangeInput = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleBlur = (e, isClick) => {
    if (isClick) {
      e.preventDefault();
      e.stopPropagation();
    }
    setEditingThread("");
    setEditValue("");
    setStatusFailed(false);
    setNotDraggable(false);
  };

  const handleClickSearch = (e) => {
    amplitude.track("Search");
    e.preventDefault();
    e.stopPropagation();
    if (navCollapsed) {
      toggleCollapsedNav(false);
    }
  };

  useEffect(() => {
    if (isMobile) {
      toggleCollapsedNav(false);
    }
    // eslint-disable-next-line
  }, [isMobile]);

  return (
    <>
      {!chatPage ? (
        <div className={`nav-menu-container`}>
          <Tooltip
            placement="right"
            title={
              navCollapsed &&
              intl.formatMessage({
                id: "sidenav.chatgpt.search"
              })
            }
          >
            <div
              className={`nav-search-thread ${
                navCollapsed ? "nav-search-thread-collapsed" : ""
              }`}
              onClick={(e) => handleClickSearch(e)}
            >
              <Input
                placeholder={intl.formatMessage({
                  id: "sidenav.chatgpt.search"
                })}
                prefix={<SearchOutlined style={{ color: "#FFFFFF" }} />}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={(e) => handleClickSearch(e)}
              />
            </div>
          </Tooltip>
          <CustomMenu {...props}>
            {navigationConfig.map((menu, index) => (
              <Menu.Item
                key={menu.key}
                className={
                  navCollapsed
                    ? "new-Thread-Button-Collapsed"
                    : "new-Thread-Button"
                }
                onClick={() => newThreadHandler(index)}
              >
                <img
                  src={Plus}
                  alt={intl.formatMessage({ id: "sidenav.chatgpt.newThread" })}
                  className={
                    navCollapsed
                      ? "new-Thread-Button-Image-Collapsed"
                      : "new-Thread-Button-Image"
                  }
                />
                {!navCollapsed && (
                  <span>
                    <IntlMessage id={menu?.title} />
                  </span>
                )}
                {menu.path && !responseInProgress ? (
                  <Link onClick={() => closeMobileNav()} to={menu.path} />
                ) : null}
              </Menu.Item>
            ))}
          </CustomMenu>
          {threadsToShow.length > 0 && (
            <>
              {threadsToShow.map((item, index) => (
                <div key={`THREADS-${item.thread_id}`}>
                  {navCollapsed && !isMobile ? (
                    <ConversationNavLink
                      item={item}
                      status={responseInProgress}
                    >
                      <Tooltip placement="right" title={item.thread_name}>
                        <div
                          className={`add-thread-nav-wrapper-collapsed ${
                            item.thread_id === threadUpdateTitle
                              ? "animate-flash"
                              : ""
                          }`}
                          style={{
                            background:
                              item.thread_id === selectedThread
                                ? "rgba(5, 226, 131, 0.1)"
                                : ""
                          }}
                          onClick={() => handleClickThread(item.thread_id)}
                        >
                          <MessageOutlined
                            style={{
                              fontSize: "18px",
                              color:
                                item.thread_id === selectedThread
                                  ? "#05E283"
                                  : "#FFFFFF"
                            }}
                          />
                        </div>
                      </Tooltip>
                    </ConversationNavLink>
                  ) : (
                    <ConversationNavLink
                      item={item}
                      notDraggable={notDraggable}
                      status={responseInProgress}
                    >
                      <div
                        className={`add-thread-nav-wrapper ${
                          item.thread_id === threadUpdateTitle
                            ? "animate-flash"
                            : ""
                        }`}
                        tabIndex={0}
                        style={{
                          background:
                            item.thread_id === selectedThread
                              ? "rgba(5, 226, 131, 0.1)"
                              : ""
                        }}
                        onClick={() => handleClickThread(item.thread_id)}
                        onMouseOver={() => handleHover(item.thread_id)}
                        onMouseLeave={() => setHoveredThread("")}
                      >
                        <div className="add-thread-nav-container">
                          <MessageOutlined
                            style={{
                              fontSize: "18px",
                              color:
                                item.thread_id === selectedThread
                                  ? "#05E283"
                                  : "#FFFFFF"
                            }}
                          />
                          {item.thread_id === editingThread ? (
                            <Space
                              style={{ width: "100%" }}
                              onClick={(e) => handleClick(e)}
                            >
                              <Input
                                id={item.thread_id}
                                className={`thread-input ${
                                  statusFailed ? "thread-input-error" : ""
                                }`}
                                defaultValue={item.thread_name}
                                onClick={(e) => handleClick(e)}
                                onChange={(e) => handleChangeInput(e)}
                                onKeyPress={(e) => handleUpdateThread(e, item)}
                                onBlur={(e) => handleBlur(e, false)}
                                suffix={
                                  loadingEdit ? (
                                    <LoadingOutlined
                                      style={{ color: "#FFFFFF" }}
                                    />
                                  ) : (
                                    <CloseOutlined
                                      onClick={(e) => handleBlur(e, true)}
                                      style={{ color: "#FFFFFF" }}
                                    />
                                  )
                                }
                              />
                            </Space>
                          ) : (
                            <Typography
                              className={`add-thread-nav-text ${
                                item.thread_id === threadUpdateTitle
                                  ? "typewriter"
                                  : ""
                              }`}
                              style={{
                                fontWeight:
                                  fontBoldIsValid && index === 0 ? "bold" : "",
                                color:
                                  item.thread_id === selectedThread
                                    ? "#05E283"
                                    : "#FFFFFF"
                              }}
                            >
                              {item.thread_name}
                            </Typography>
                          )}
                        </div>
                        {hoveredThread === item.thread_id && (
                          <div className="menu-tools">
                            <img
                              tabIndex={0}
                              src={Edit}
                              alt={intl.formatMessage({
                                id: "sidenav.chatgpt.edit"
                              })}
                              style={{ marginRight: "5px" }}
                              onClick={(e) =>
                                handleClickEdit(e, item.thread_id)
                              }
                            ></img>
                            <img
                              src={Delete}
                              alt={intl.formatMessage({
                                id: "sidenav.chatgpt.delete"
                              })}
                              style={{ marginTop: "1px" }}
                              onClick={(e) => deleteThread(e, item.thread_id)}
                            ></img>
                          </div>
                        )}
                      </div>
                    </ConversationNavLink>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      ) : (
        <WhatsAppNav {...props} />
      )}
    </>
  );
};

const MenuContent = (props) => {
  return props.type === NAV_TYPE_SIDE ? <SideNavContent {...props} /> : null;
};

const mapStateToProps = ({ auth, theme, conversation }) => {
  const { sideNavTheme, topNavColor, navCollapsed } = theme;
  const { session } = auth;
  const {
    chatPage,
    threads,
    fontBoldIsValid,
    selectedThread,
    loadingEdit,
    editFailed,
    responseInProgress
  } = conversation;
  return {
    session,
    selectedThread,
    sideNavTheme,
    topNavColor,
    chatPage,
    navCollapsed,
    threads,
    loadingEdit,
    editFailed,
    fontBoldIsValid,
    responseInProgress
  };
};
const mapDispatchToProps = {
  switchToChat,
  switchToHome,
  onMobileNavToggle,
  removeFontIsValid,
  setNewThreadIsValid,
  getAllThreads,
  setSelectedThread,
  editThread,
  toggleCollapsedNav,
  updateThread,
  setResponseStatus
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContent);
