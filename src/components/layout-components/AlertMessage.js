import { motion } from "framer-motion";
import { Alert } from "antd";
const AlertMessage = (props) => {
  const { alertType, message, showMessage, width } = props;
  return (
    <motion.div
      initial={{ marginBottom: 0, display: "none", opacity: 0 }}
      animate={{
        display: showMessage ? "block" : "none",
        marginBottom: showMessage ? 20 : 10,
        transition: "opacity 2s ease-out",
        opacity: showMessage ? 1 : 0
      }}
    >
      <div style={{ width: "100%" }}>
        <Alert
          type={alertType}
          showIcon
          message={message}
          style={{ width, margin: "0 auto" }}
        />
      </div>
    </motion.div>
  );
};

export default AlertMessage;
