import { ContactDetailsRow } from "./CreateTaskForm";
import { CancelSvg } from "assets/svg/icon";
const Files = (props) => {
  const { dispatch } = props;
  return (
    <div>
      <ContactDetailsRow
        title="Files and Media"
        svgIcon={<CancelSvg />}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Files;
