import { Tooltip } from "antd";
import { useState } from "react";
import {
  CopyOutlined,
  DownloadOutlined,
  CheckOutlined
} from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import rangeParser from "parse-numeric-range";
import { xonokai as syntaxTheme } from "react-syntax-highlighter/dist/esm/styles/prism";

import IntlMessage from "components/util-components/IntlMessage";
import { downloadCodeFile } from "../utils";
import DownloadModal from "components/layout-components/DownloadModal";

import "./CodeBlock.css";

const styleIcon = { color: "#8F9FB2", fontSize: "16px" };

const getTextOfNode = (node) => {
  return node?.children[0]?.value;
};

export default function CodeBlock({ node, inline, className, ...props }) {
  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const hasLang = /language-(\w+)/.exec(className || "");
  const language = hasLang && hasLang[1];
  const hasMeta = node?.data?.meta;

  const applyHighlights = (applyHighlights) => {
    if (hasMeta) {
      const RE = /{([\d,-]+)}/;
      const metadata = node.data.meta?.replace(/\s/g, "");
      const strlineNumbers = RE?.test(metadata) ? RE?.exec(metadata)[1] : "0";
      const highlightLines = rangeParser(strlineNumbers);
      const highlight = highlightLines;
      const data = highlight.includes(applyHighlights) ? "highlight" : null;
      return { data };
    } else {
      return {};
    }
  };

  const copyToClipboard = async () => {
    try {
      const text = getTextOfNode(node);
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  const submitForm = (value) => {
    const text = getTextOfNode(node);
    downloadCodeFile(text, language, value.name, value.option);
  };

  return !inline ? (
    <div className="code-block">
      <div className="code-block-title">
        <div>{language}</div>
        <div>
          <button onClick={copyToClipboard}>
            {copied ? (
              <>
                <CheckOutlined style={styleIcon} />{" "}
                <IntlMessage id="chatgpt.code.copied" />
              </>
            ) : (
              <>
                <CopyOutlined style={styleIcon} />{" "}
                <span style={{ letterSpacing: "-0.1em" }}>
                  <IntlMessage id="chatgpt.code.copy" />
                </span>
              </>
            )}
          </button>
          <Tooltip
            placement="topLeft"
            title={<IntlMessage id="download.text" />}
          >
            <button onClick={() => setModalOpen(true)}>
              <DownloadOutlined style={styleIcon} />
            </button>
          </Tooltip>
        </div>
      </div>
      <SyntaxHighlighter
        style={syntaxTheme}
        language={language}
        className="codeStyle"
        showLineNumbers={false}
        wrapLines={hasMeta}
        useInlineStyles={true}
        lineProps={applyHighlights}
      >
        {props.children}
      </SyntaxHighlighter>
      {!!modalOpen && (
        <DownloadModal
          modalOpen={modalOpen}
          setModalOpen={(e) => setModalOpen(e)}
          submitForm={(value) => submitForm(value)}
          isSourceCode={true}
          language={language}
        />
      )}
    </div>
  ) : (
    <>
      <code className={className} {...props} />
    </>
  );
}
