import { Typography, Input, DatePicker, Select, Button } from "antd";
import { INITIAL } from "./Constants";
import { CancelSvg } from "assets/svg/icon";
import { getCustomerDeals } from "redux/actions/Conversation";
import { createTask } from "redux/actions/ContactForm";
import { connect } from "react-redux";
import { useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

export const ContactDetailsRow = (props) => {
  const { title, svgIcon, dispatch } = props;
  return (
    <div className="create-task-row">
      <Typography className="contact-details-row-title">{title}</Typography>
      <div
        className="contact-details-row-icon"
        onClick={() => dispatch({ type: INITIAL, payload: INITIAL })}
      >
        {svgIcon}
      </div>
    </div>
  );
};

const CreateTaskPicker = (props) => {
  const { title, data, onSelect } = props;
  const [id, setId] = useState(null);
  const handleSelect = (id, name) => {
    setId(id);
    onSelect(name);
  };
  return (
    <div className="create-task-input-div">
      <Typography className="create-task-heading">{title}</Typography>
      <div className="task-type-wrapper">
        {data.map((item) => {
          const className =
            item.id === id ? "selected-task-type-div" : "task-type-div";
          const textClassName =
            item.id === id
              ? "create-task-heading-selected"
              : "create-task-heading";
          return (
            <div
              key={item.id}
              className={className}
              onClick={() => handleSelect(item.id, item.name)}
            >
              <Typography className={textClassName}>{item.name}</Typography>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const taskTypeData = [
  {
    id: 1,
    name: "ToDo"
  },
  {
    id: 2,
    name: "Call"
  },
  {
    id: 3,
    name: "Email"
  }
];

const priorityData = [
  {
    id: 1,
    name: "Low"
  },
  {
    id: 2,
    name: "Medium"
  },
  {
    id: 3,
    name: "High"
  }
];

const CreateTaskForm = (props) => {
  const { dispatch, activeCustomer, owners, createTask } = props;

  const [taskData, setTaskData] = useState({});

  const createTaskHandler = (event) => {
    event.preventDefault();
    createTask({ ...taskData, contactId: activeCustomer.hubspot_contact_id });
    dispatch({ type: INITIAL, payload: INITIAL });
  };

  return (
    <div>
      <ContactDetailsRow
        title="Create a task"
        svgIcon={<CancelSvg />}
        dispatch={dispatch}
      />
      <form onSubmit={createTaskHandler}>
        <div className="create-task-input-div">
          <Typography className="create-task-heading ">Task name</Typography>
          <Input
            placeholder="Task name"
            className="create-task-input"
            onChange={(e) =>
              setTaskData({ ...taskData, subject: e.target.value })
            }
          />
        </div>
        <div className="create-task-input-div">
          <Typography className="create-task-heading">Due date</Typography>
          <DatePicker
            className="create-task-input"
            onChange={(date, dateString) =>
              setTaskData({
                ...taskData,
                dueDateTimestamp: new Date(dateString).getTime()
              })
            }
          />
        </div>
        <div className="create-task-input-div">
          <Typography className="create-task-heading">Assigned to</Typography>
          <Select
            className="create-task-input"
            onChange={(val) => setTaskData({ ...taskData, ownerId: val })}
          >
            {owners
              .filter((x) => x.role === "Sales")
              .map((x) => {
                return (
                  <Option key={x.id} value={x.id}>
                    {x.firstName + " " + x.lastName}
                  </Option>
                );
              })}
          </Select>
        </div>
        <CreateTaskPicker
          title="Type of task"
          data={taskTypeData}
          onSelect={(val) => setTaskData({ ...taskData, type: val })}
        />
        <CreateTaskPicker
          title="Priority"
          data={priorityData}
          onSelect={(val) => setTaskData({ ...taskData, priority: val })}
        />
        <div className="create-task-input-div">
          <Typography className="create-task-heading">
            Descriptions (Opional)
          </Typography>
          <TextArea
            className="create-task-input"
            onChange={(e) => setTaskData({ ...taskData, body: e.target.value })}
          />
        </div>
        <div className="create-task-button-div">
          <Button
            type="primary"
            className="create-task-button"
            htmlType="submit"
          >
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = ({ auth, conversation }) => {
  const { hubspotAccessToken } = auth;
  const { activeCustomer, owners } = conversation;
  return { hubspotAccessToken, activeCustomer, owners };
};

const mapDispatchToProps = {
  getCustomerDeals,
  createTask
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateTaskForm);
