import { LoadingOutlined } from "@ant-design/icons";

//styles

export const version = "v14.0";
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
export const messageWrapperStyle = (item, phoneNumberId) => {
  return {
    display: "flex",
    justifyContent: item.sender === phoneNumberId ? "right" : "left",
    margin: "0px 15px"
  };
};

export const messageStyle = (item, phoneNumberId) => {
  return {
    background: item.sender === phoneNumberId ? "#1A66FF" : "#EDF0F2",
    color: item.sender === phoneNumberId ? "#FAFAFB" : "#0F1B33",
    padding: "8px 12px",
    borderRadius:
      item.sender === phoneNumberId
        ? "16px 16px 4px 16px"
        : "16px 16px 16px 4px"
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
