import { Button } from "antd";

const ButtonGreen = ({ children, style, ...otherProps }) => (
  <Button
    style={{ background: "#1FC77E", color: "white", ...style }}
    {...otherProps}
  >
    {children}
  </Button>
);

export default ButtonGreen;
