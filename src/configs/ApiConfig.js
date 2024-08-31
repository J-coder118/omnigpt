export const sendMessageApiContent = (
  messageText,
  messages,
  activeCustomer
) => {
  return new Promise((resolve, reject) => {
    let body;
    if (messages.length === 0) {
      body = JSON.stringify({
        messaging_product: "whatsapp",
        to: activeCustomer.phone,
        type: "template",
        template: {
          name: "hello_world",
          language: {
            code: "en_US"
          }
        }
      });
    } else {
      body = JSON.stringify({
        messaging_product: "whatsapp",
        preview_url: false,
        recipient_type: "individual",
        to: activeCustomer.phone,
        type: "text",
        text: {
          body: messageText
        }
      });
    }
    const content = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_WHATSAPP_API_TOKEN}`
      }
    };

    resolve({ body, content });
  });
};

export const sendImageApiContent = (activeCustomer, imageURL) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      messaging_product: "whatsapp",
      to: activeCustomer.phone,
      type: "image",
      image: {
        link: imageURL
      }
    });
    const content = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_WHATSAPP_API_TOKEN}`
      }
    };

    resolve({ body, content });
  });
};
