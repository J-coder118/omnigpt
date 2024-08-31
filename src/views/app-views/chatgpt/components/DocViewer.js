import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Typography,
  message as AndtMessage,
  Modal,
  Space,
  Tooltip
} from "antd";
import {
  FileWordOutlined,
  DownloadOutlined,
  ExpandOutlined,
  FilePdfOutlined
} from "@ant-design/icons";
import { supabase } from "auth/SupabaseClient";
import { saveAs } from "file-saver";
import useWindowSize from "hooks/WindowSize";
import { useIntl } from "react-intl";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import IntlMessage from "components/util-components/IntlMessage";

const { Title } = Typography;
const DocIframe = ({ source, name = "default.docx", folder }) => {
  const intl = useIntl();
  const [isModalOpen, setModalOpen] = useState(false);
  const windowSize = useWindowSize();
  let modalWidth = parseInt(windowSize.width / 2);

  if (modalWidth < 600) {
    modalWidth = parseInt(windowSize.width / 6);
  }

  if (!source) {
    return <div>Loading...</div>;
  }

  const handleDownload = async () => {
    AndtMessage.loading(intl.formatMessage({ id: "message.processing" }));
    const { data, error } = await supabase.storage
      .from("documents")
      .download(`${folder}/${name}`);

    if (error) {
      AndtMessage.error(
        intl.formatMessage({ id: "message.downloadDoc.error" })
      );
    } else {
      saveAs(data, name);
      AndtMessage.success(
        intl.formatMessage({ id: "message.downloadDoc.success" })
      );
    }
  };

  const handleExpandDoc = () => {
    setModalOpen(true);
  };

  const src = source;
  return (
    <div style={{ width: "100%" }}>
      <Card
        title={
          <>
            <Row align="middle">
              <Col>
              {name.endsWith('.pdf') ?  <FilePdfOutlined
                  style={{ fontSize: "40px", color: "#2b579a" }}
                /> :   <FileWordOutlined
                style={{ fontSize: "40px", color: "#2b579a" }}
              /> }
              </Col>
              <Col>
                <Row>
                  <Title level={4} style={{ marginBottom: "0" }}>
                    {name}
                  </Title>
                </Row>
                <Row>
                  <Title level={5}>View Document</Title>
                </Row>
              </Col>
            </Row>
          </>
        }
        extra={
          <Space>
            <Tooltip
              placement="topLeft"
              title={<IntlMessage id="expand.file" />}
            >
              <ExpandOutlined
                style={{
                  fontSize: "16px",
                  color: "#8F9FB2",
                  cursor: "pointer"
                }}
                onClick={handleExpandDoc}
              />
            </Tooltip>
            <Tooltip
              placement="topLeft"
              title={<IntlMessage id="download.file" />}
            >
              <DownloadOutlined
                onClick={handleDownload}
                style={{
                  fontSize: "20px",
                  color: "#8F9FB2",
                  cursor: "pointer"
                }}
              />
            </Tooltip>
          </Space>
        }
        style={{
          maxWidth: 600
        }}
      >
        <DocViewer
          documents={[{ uri: src }]}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false
            }
          }}
          style={{ height: 250 }}
        />
      </Card>

      <Modal
        title={`${name}`}
        visible={isModalOpen}
        footer={[
          <Tooltip
            placement="topLeft"
            title={<IntlMessage id="download.file" />}
          >
            <DownloadOutlined
              onClick={handleDownload}
              style={{ fontSize: "25px", color: "#8F9FB2", cursor: "pointer" }}
            />
          </Tooltip>
        ]}
        onCancel={() => setModalOpen(false)}
        width={`calc(100vw - ${modalWidth}px)`}
      >
        <DocViewer
          documents={[{ uri: src }]}
          pluginRenderers={DocViewerRenderers}
          config={{
            header: {
              disableHeader: true,
              disableFileName: true,
              retainURLParams: false
            }
          }}
          style={{ height: 550 }}
        />
      </Modal>
    </div>
  );
};

export default React.memo(DocIframe);
