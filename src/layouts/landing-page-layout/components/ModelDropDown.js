import { Select, Typography, Space } from "antd";
import { CHAT_MODELS } from "views/app-views/chatgpt/constants";
import Features from "views/app-views/chatgpt/components/OmniFeatures";
import "./ModelDropDown.css";
const { Title } = Typography;

const SelectModel = ({ model, setModel, openModal }) => {
  const handleModelChange = (val) => setModel(val);

  return (
    <div className="chat-model-selector-mock font-inter">
      <Space direction="vertical" size="large" style={{ alignItems: "center" }}>
        <div>
          <Title
            style={{
              fontWeight: 510,
              color: "#455560",
              fontSize: 18,
              textAlign: "center",
              fontStyle: "normal",
              lineHeight: "26px",
              margin: 0
              // letterSpacing: "0.1px"
            }}
          >
            You can customize your chat experience
          </Title>
          <Title
            style={{
              fontWeight: 500,
              color: "#455560",
              fontSize: 14,
              textAlign: "center",
              marginTop: 0,
              fontStyle: "normal",
              lineHeight: "26px"
            }}
          >
            By selecting a language model
          </Title>
        </div>
        <Select
          defaultValue={model}
          onChange={handleModelChange}
          className="modal-dropdown"
          suffixIcon={
            <img
              srcSet="/img/arrow.svg"
              alt="arrow"
              style={{
                width: "34.8px",
                height: "33.6px",
                position: "relative",
                right: "3px"
              }}
            />
          }
          options={CHAT_MODELS.map((model, i) => ({
            label: (
              <div style={{ display: "flex", alignItems: "center" }}>
                {model.logo}
                <div>
                  <Title
                    style={{
                      fontWeight: 500,
                      color: "#455560",
                      fontSize: 16,
                      margin: 0,
                      height: 19.2,
                      lineHeight: "16px"
                    }}
                  >
                    {model.name}
                  </Title>
                  <Title
                    style={{
                      fontWeight: 500,
                      color: "#8F9FB2",
                      fontSize: 12,
                      margin: 0,
                      // lineHeight: '16px'
                    }}
                  >
                    Language Model
                  </Title>
                </div>
              </div>
            ),
            value: model.name
          }))}
          size={"large"}
        />

        <div>
          <Title
            style={{
              fontWeight: 500,
              color: "#8F9FB2",
              fontSize: 14,
              textAlign: "center",
              marginTop: 0,
              width: "395px",
              fontStyle: "normal",
              lineHeight: "26px"
            }}
          >
            Once you choose a language model, it cannot be changed during the
            conversation.
          </Title>
        </div>
        <div style={{ marginTop: 20 }}>
          <img
            srcSet={`/img/new-logo4x.png 4x`}
            alt={`OmniGPT logo`}
            style={{ cursor: "pointer" }}
          />
        </div>
        <Features openModal={openModal} />
      </Space>
    </div>
  );
};

export default SelectModel;
