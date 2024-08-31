import { useState } from "react";
import { connect } from "react-redux";
import { Button, Input, Switch, Typography } from "antd";
import { ContactDetailsRow } from "./CreateTaskForm";
import { CancelSvg } from "assets/svg/icon";
import { addNote } from "redux/actions/ContactForm";
import { INITIAL } from "./Constants";

const { TextArea } = Input;
const AddNote = (props) => {
  const { dispatch, addNote, activeCustomer } = props;
  const [value, setValue] = useState("");

  const addNoteHandler = (event) => {
    event.preventDefault();
    const noteData = {
      noteText: value,
      contactId: activeCustomer.hubspot_contact_id
    };
    addNote(noteData);
    dispatch({ type: INITIAL, payload: INITIAL });
  };
  return (
    <div>
      <ContactDetailsRow
        title="Add a Note"
        svgIcon={<CancelSvg />}
        dispatch={dispatch}
      />
      <form onSubmit={addNoteHandler}>
        <div className="create-task-input-div">
          <TextArea
            rows={7}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="contact-detials-row">
          <Typography className="contact-details-row-title">
            Create task to follow up
          </Typography>
          <div className="contact-details-row-icon">
            <Switch />
          </div>
        </div>
        <div className="create-task-button-div">
          <Button
            type="primary"
            className="create-task-button"
            htmlType="submit"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ contactForm, conversation }) => {
  const { notes } = contactForm;
  const { activeCustomer } = conversation;
  return { notes, activeCustomer };
};

const mapDispatchToProps = {
  addNote
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNote);
