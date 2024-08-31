import { Button } from "antd";
const ButtonDefault = ({ children, style, ...otherProps }) => (
  <Button
    style={{
      background: "#F7F7F8",
      border: "1px solid #E6EBF1",
      ...style
    }}
    {...otherProps}
  >
    {children}
  </Button>
);

export default ButtonDefault;
