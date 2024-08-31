import { Typography } from "antd";
import { ContactDetailsRow } from "./CreateTaskForm";
import { CancelSvg } from "assets/svg/icon";

const NoteDetail = (props) => {
  const { dispatch, noteText } = props;

  return (
    <div>
      <ContactDetailsRow
        title="Note details"
        svgIcon={<CancelSvg />}
        dispatch={dispatch}
      />
      <div className="note-detail-div">
        <div className="note-sideborder"></div>
        <Typography.Paragraph>
          {/^<div/.test(noteText) ? (
            <div
              className="note-content"
              dangerouslySetInnerHTML={{ __html: noteText }}
            />
          ) : (
            noteText
          )}
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default NoteDetail;
