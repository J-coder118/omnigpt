import { useEffect, useState } from "react";
import { Typography, Button, Modal, Input } from "antd";
import { connect } from "react-redux";
import CountryPhoneInput, { ConfigProvider } from "antd-country-phone-input";
import en from "world_countries_lists/data/countries/en/world.json";
//user-imports
import {
  addNewCustomer,
  hideCustomerModal,
  hideAddNewCustomerError
} from "redux/actions/WhatsApp";
import AlertMessage from "./AlertMessage";

const AddCustomerModal = (props) => {
  const {
    session,
    isModalVisible,
    handleCancel,
    addNewCustomer,
    addCustomerLoading,
    addCustomerError,
    addCustomerErrorMessage,
    hideAddNewCustomerError
  } = props;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState({ short: "US", phone: "" });
  const [nameError, setNameError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

  const submitHandler = (event) => {
    event.preventDefault();
    if (name.trim().length === 0 && phone.phone.trim().length === 0) {
      setNameError("Required field");
      setPhoneError("Required field");
      return;
    }
    if (name.trim().length === 0) {
      setNameError("Required field");
      return;
    }
    if (phone.phone.trim().length === 0) {
      setPhoneError("Required field");
      return;
    }
    // const id = Math.floor(Math.random() * 1000);
    const contactNo = phone.code + phone.phone;
    const region = phone.short;
    addNewCustomer({
      name,
      phone: contactNo,
      region,
      user_identifier: session.user.email
    });
    setName("");
    setPhone({ short: "US", phone: "" });
  };

  useEffect(() => {
    if (name.trim().length >= 1) setNameError(null);
    if (phone.phone.trim().length > 0) setPhoneError(null);
  }, [name, phone]);

  useEffect(() => {
    if (addCustomerError) {
      setTimeout(() => {
        hideAddNewCustomerError();
      }, 3000);
    }
    //eslint-disable-next-line
  }, [addCustomerError]);

  const inputNameStyle = {
    height: "48px",
    border: nameError ? "1px solid #F24962" : "1px solid #e6ebf1"
  };
  const inputPhoneStyle = {
    height: "48px",
    border: phoneError ? "1px solid #F24962" : "1px solid #e6ebf1"
  };

  return (
    <Modal
      title="Add new customer"
      visible={isModalVisible}
      onCancel={handleCancel}
      width={320}
      footer={null}
    >
      <form onSubmit={submitHandler}>
        <div style={{ marginBottom: "20px" }}>
          <Typography className="conversation-modal-heading">
            Customer Name
          </Typography>

          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputNameStyle}
          />
          {nameError && (
            <Typography className="conversation-modal-error-heading">
              {nameError}
            </Typography>
          )}
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Typography className="conversation-modal-heading">
            Phone number
          </Typography>
          <ConfigProvider locale={en}>
            <CountryPhoneInput
              value={phone}
              onChange={(v) => {
                setPhone(v);
              }}
              style={inputPhoneStyle}
            />
          </ConfigProvider>
          {phoneError && (
            <Typography className="conversation-modal-error-heading">
              {phoneError}
            </Typography>
          )}
        </div>
        <AlertMessage
          alertType="error"
          showMessage={addCustomerError}
          message={addCustomerErrorMessage}
          width="100%"
        />
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          loading={addCustomerLoading}
        >
          Add
        </Button>
      </form>
    </Modal>
  );
};

const mapStateToProps = ({ auth, whatsApp }) => {
  const { session } = auth;
  const {
    customerData,
    addCustomerLoading,
    addCustomerError,
    addCustomerErrorMessage
  } = whatsApp;
  return {
    session,
    customerData,
    addCustomerLoading,
    addCustomerError,
    addCustomerErrorMessage
  };
};

const mapDispatchToProps = {
  addNewCustomer,
  hideCustomerModal,
  hideAddNewCustomerError
};
export default connect(mapStateToProps, mapDispatchToProps)(AddCustomerModal);
