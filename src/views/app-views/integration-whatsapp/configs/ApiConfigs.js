export const sendTemplateApiContent = (phone) => {
  let body;
  body = JSON.stringify({
    messaging_product: "whatsapp",
    to: phone,
    type: "template",
    template: {
      name: "hello_world",
      language: {
        code: "en_US"
      }
    }
  });
  const content = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.REACT_APP_WHATSAPP_API_TOKEN}`
    }
  };

  return { body, content };
};
