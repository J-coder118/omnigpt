const OptionsWrapper = ({
  title,
  options,
  optionsHandler,
  optionsIdentifier,
  suggestedPromptIsValid
}) => {
  return (
    <div style={{ margin: "15px 0" }}>
      <div className="options-heading-wrapper">
        <p className="options-heading">{title}</p>
      </div>
      <div
        style={{
          maxWidth: suggestedPromptIsValid ? "500px" : "278px",
          borderRadius: "5px",
          padding: "0px 20px",
          textAlign: "justify"
        }}
      >
        {options.map((item, index) => {
          return (
            <div
              key={`${title}-${index}`}
              style={{
                background: "#85DCF8",
                border: "0.5px solid #1C283F",
                borderRadius: "16px",
                marginBottom: "8px",
                cursor: "pointer"
              }}
              onClick={() => {
                optionsHandler(item);
              }}
            >
              <p
                style={{
                  marginTop: "15px",
                  marginLeft: "15px",
                  paddingRight: "15px",
                  color: "black"
                }}
              >
                {item[optionsIdentifier]}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsWrapper;
