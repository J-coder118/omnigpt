import { LoadingOutlined } from "@ant-design/icons";

//styles

export const version = "v13.0";
export const phoneNumberId = "109946815136827";

export const icon1Style = { color: "#000000" };
export const icon2Style = {
  color: "#8f9fb2",
  cursor: "pointer"
};
export const inputStyle = { backgroundColor: "#edf0f2" };
export const elementStyle = {
  position: "relative",
  height: "80vh",
  overflowY: "scroll",
  paddingBottom: "100px",
  marginTop: "50px"
};
export const messageWrapperStyle = (item, userId) => {
  return {
    background: item.sender === userId ? "#EDF0F2" : "#CCCCCC",
    display: "flex",
    alignItems: "flex-start"
    // justifyContent: item.Sender === userId ? "right" : "left",
  };
};

export const messageStyle = (item, userId) => {
  return {
    color: "#000000",
    marginLeft: "15px"
  };
};

export const dateFormatHandler = (date) => {
  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.toLocaleString("en-US", { year: "numeric" });
  return `${year}-${month}-${day}`;
};

export const LoadingIcon = (
  <LoadingOutlined
    style={{
      fontSize: 14
    }}
    spin
  />
);
