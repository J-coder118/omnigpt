import { Select, Typography, Space } from "antd";
import { CHAT_MODELS } from "../constants";

const { Title } = Typography;

const SelectModel = ({ model, setModel }) => {
  const handleModelChange = (val) => setModel(val);

  return (
    <Space direction="vertical" size="large" className="chat-model-selector">
      <div>
        <img
          srcSet={`/img/new-logo4x.png 4x`}
          alt={`OmniGPT logo`}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div>
        <Title
          style={{
            fontWeight: 600,
            color: "inherit",
            fontSize: 18,
            textAlign: "center",
            fontStyle : "normal",
            lineHeight : "26px",
            
          }}
        >
          You can customize your chat experience
        </Title>
        <Title
          style={{
            fontWeight: 500,
            color: "inherit",
            fontSize: 14,
            textAlign: "center",
            marginTop: 0,
            fontStyle : "normal",
            lineHeight : "26px"
          }}
        >
          By selecting a language model
        </Title>
      </div>

      <Select
        defaultValue={model}
        onChange={handleModelChange}
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
                    margin: 0
                  }}
                >
                  {model.name}
                </Title>
                <Title
                  style={{
                    fontWeight: 500,
                    color: "#8F9FB2",
                    fontSize: 12,
                    margin: 0
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
            fontWeight: 600,
            color: "inherit",
            fontSize: 18,
            textAlign: "center"
          }}
        >
          Start a conversation by entering a message
        </Title>
        <Title
          style={{
            fontWeight: 500,
            color: "#8F9FB2",
            fontSize: 14,
            textAlign: "center",
            marginTop: 0
          }}
        >
          Once you choose a language model, it cannot be changed during the
          conversation.
        </Title>
      </div>
    </Space>
  );
};

export default SelectModel;
