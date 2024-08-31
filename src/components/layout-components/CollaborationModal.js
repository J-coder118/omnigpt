import { useState } from "react";
import {
  Modal,
  Row,
  Col,
  Typography,
  Select,
  Input,
  Button,
  message as AndtMessage
} from "antd";
import en from "world_countries_lists/data/countries/en/world.json";
import { supabase } from "auth/SupabaseClient";
import { WAITLIST_TYPES } from "constants/common";
import IntlMessage from "components/util-components/IntlMessage";
import { useIntl } from "react-intl";

const { Title, Text } = Typography;
const { TextArea } = Input;

const CollaborationModal = ({
  open,
  setOpen,
  userInfo,
  setWaitListJoined,
  setCurrentNav,
  waitListJoined
}) => {
  const [description, setDescription] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const userId = userInfo?.id;
  const intl = useIntl();

  const addToWaitList = async () => {
    const { error, data } = await supabase.from("feature_waitlist").insert({
      user_id: userId,
      reason: description,
      country: selectedCountry,
      feature_type: WAITLIST_TYPES.COLLABORATION
    });

    if (error) {
      AndtMessage.error("Could not submit response. Please try again.");
      console.log(error);
    } else {
      AndtMessage.success("Response submitted successfully.");
      const rec = data[0];
      setWaitListJoined({
        joined: true,
        country: rec.country,
        reason: rec.reason
      });
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Modal
        centered
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={handleCancel}
        width={700}
        footer={null}
        className="collaboration-modal"
      >
        <Row justify="center">
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <div className="waitlist-col" style={{ textAlign: "center" }}>
              <Title level={3}>
                <IntlMessage id="collaboration.feature.heading" />
              </Title>
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center"
              }}
            >
              <Text>
                {waitListJoined.joined ? (
                  <IntlMessage id="collaboration.feature.waitlist.joined.message" />
                ) : (
                  <IntlMessage id="collaboration.feature.waitlist.message" />
                )}
              </Text>
            </div>
          </Col>

          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <div className="waitlist-col">
              {waitListJoined.joined ? (
                <Select
                  showSearch
                  defaultValue={waitListJoined.country}
                  placeholder={
                    <IntlMessage id="collaboration.feature.region" />
                  }
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  onChange={(country) => setSelectedCountry(country)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={en.map((country, i) => ({
                    value: country.name,
                    label: country.name
                  }))}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  disabled
                />
              ) : (
                <Select
                  showSearch
                  placeholder={
                    <IntlMessage id="collaboration.feature.region" />
                  }
                  optionFilterProp="children"
                  style={{ width: "100%" }}
                  onChange={(country) => setSelectedCountry(country)}
                  filterOption={(input, option) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={en.map((country, i) => ({
                    value: country.name,
                    label: country.name
                  }))}
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                />
              )}
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <div className="waitlist-col">
              <TextArea
                value={
                  waitListJoined.reason ? waitListJoined.reason : description
                }
                maxLength={1024}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={intl.formatMessage({
                  id: "collaboration.feature.plan"
                })}
                autoSize={{ minRows: 3, maxRows: 5 }}
                disabled={waitListJoined?.joined}
              />
            </div>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <div className="waitlist-col">
              <Button
                block
                disabled={
                  !(description && selectedCountry && !waitListJoined?.joined)
                }
                onClick={addToWaitList}
              >
                <IntlMessage id="collaboration.feature.waitlist.button" />
              </Button>
            </div>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default CollaborationModal;
