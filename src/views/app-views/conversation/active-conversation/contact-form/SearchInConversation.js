import { ContactDetailsRow } from "./CreateTaskForm";
import { CancelSvg } from "assets/svg/icon";
import { Input } from "antd";
const SearchInCoversation = (props) => {
  const { dispatch } = props;
  return (
    <div>
      <ContactDetailsRow
        title="Search in Conversation"
        svgIcon={<CancelSvg />}
        dispatch={dispatch}
      />
      <div className="create-task-input-div">
        <Input placeholder="Type something..." />
      </div>
    </div>
  );
};

export default SearchInCoversation;
