import { NavLink } from "react-router-dom";
import { APP_PREFIX_PATH } from "configs/AppConfig";
const ConversationNavLink = (props) => {
  const { item, notDraggable  , status} = props;
  return (
    <NavLink
    onClick={status ?  (e)=>e.preventDefault() : null }
      to={`${APP_PREFIX_PATH}/conversation/${item.thread_id}`}
      activeClassName="conversation-nav-list-active-wrapper"
      className="conversation-nav-list-wrapper"
      draggable={!notDraggable ? true : false}
      
    >
      {props.children}
    </NavLink>
  );
};

export default ConversationNavLink;
