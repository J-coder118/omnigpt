import { Form, Input, Select } from "antd";
import Modal from "antd/lib/modal/Modal";

import ButtonGreen from "components/shared-components/Button/ButtonGreen";

import "./DownloadModal.css";

const { Option } = Select;
const DownloadModal = ({
  modalOpen,
  setModalOpen,
  submitForm,
  language,
  isSourceCode = false
}) => {
  const [form] = Form.useForm();
  const handleSubmit = (values) => {
    submitForm({
      name: values.fileName,
      option: values.type
    });
    setModalOpen(false);
  };

  form.setFieldsValue({
    type: language
  });

  return (
    <Modal
      width={350}
      footer={null}
      visible={modalOpen}
      onCancel={() => setModalOpen(false)}
    >
      <Form
        layout="vertical"
        name="login-form"
        autoComplete="off"
        onFinish={handleSubmit}
        form={form}
      >
        <Form.Item
          label="Title"
          name="fileName"
          rules={[
            {
              required: true,
              message: "Please Enter File Name"
            }
          ]}
        >
          <Input className="input-email" placeholder="Please Enter File Name" />
        </Form.Item>
        <Form.Item
          name="type"
          label="Type Of Documents"
          rules={[{ required: true }]}
        >
          {isSourceCode ? (
            <Input
              disabled={language}
              placeholder="Please enter extension file"
            />
          ) : (
            <Select
              placeholder={"Select a option and change input text above"}
              allowClear
            >
              <Option value="DOC">DOC</Option>
              <Option value="DOCX">DOCX</Option>
              <Option value="PDF">PDF</Option>
            </Select>
          )}
        </Form.Item>

        <ButtonGreen className="btn-download" htmlType="submit">
          Download
        </ButtonGreen>
      </Form>
    </Modal>
  );
};

export default DownloadModal;
