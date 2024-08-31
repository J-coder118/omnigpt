const Es = {
  paymentNotExist:
    "Parece que su suscripción a Omnigpt ha caducado o está inactiva. Para continuar usando Omnigpt en WhatsApp, suscríbase en https://app.omnigpt.co.",
  phoneNumberNotExist:
    "Tu whatsapp no existe en OmniGPT. Visita www.omnigpt.com para más información",
  welcome: {
    header: "Bienvenido a OmniGPT.",
    body: `Haga clic en el botón Menú principal para explorar lo que puede hacer en esta conversación:

    1. Crear un nuevo hilo
    2. Encontrar un hilo
    3. Aprende cómo usar

Si lo prefieres, empieza a chatear conmigo como lo harías con cualquier otra persona. Estoy aquí para escuchar y ayudar en todo lo que pueda.
Para volver a acceder al menú principal, simplemente escriba */menu* en el chat`,
    footer: "Visite www.omnigpt.com para más información",
    action: {
      button: "Menú principal",
      createNewThread: "Crear un nuevo hilo",
      findAThread: "Encontrar un hilo",
      learnUse: "Aprende cómo usar"
    }
  },
  error:
    "Actualmente, *OmniGPT* no está disponible. Por favor, inténtelo de nuevo más tarde",
  remind:
    "Para comenzar, haga clic en el botón *Menú principal*. Puede acceder al *Menú principal* simplemente escribiendo */menu* en el chat.",
  newThreadCreated:
    "Se creó un nuevo hilo. Puede usarlo para discutir un tema o problema específico en el chat.",
  noThread: "Actualmente, no tienes ningún hilo",
  listThread: `Aquí están los últimos _TOTAL_THREAD_ hilos
Escriba el número del hilo que desea seleccionar:

_LIST_THREAD_`,
  seeMore: "Ver más",
  previousThread: {
    oldMessage: "*Aquí están los mensajes anteriores en este hilo.*:",
    canContinue: `Ahora puede continuar la conversación con este hilo.`,
    error: `Su selección no es correcta. Por favor elige de nuevo`
  },
  chatWithGPT: {
    introduceDoc:
      "Dime de qué trata este documento en una oración que no supere las 12 palabras y pregúntame: ¿Necesitas ayuda con este documento?",
    notice:
      "Su mensaje fue recibido. Te enviaremos una respuesta en unos segundos.",
    error: "Hubo un error con tu respuesta. Inténtalo de nuevo"
  },
  guide: {
    thank: `¡Gracias por su interés en aprender a usar OmniGPT!

Para comenzar, simplemente escriba su mensaje y OmniGPT responderá.`,
    suggest: `Estos son algunos ejemplos de preguntas que puede hacer.

- ¿Qué tema o asunto le interesa tratar?
- ¿Tiene alguna pregunta o inquietud específica que le gustaría explorar?
- ¿Le gustaría que le diera algunas sugerencias para iniciar una conversación?
- ¿Está buscando consejos sobre cómo comunicarse de manera más efectiva con los demás?
- ¿Necesita ayuda para resolver un conflicto o malentendido en una conversación?
- ¿Te gustaría practicar tus habilidades de comunicación conmigo?

Si necesita más ayuda, ¡no dude en preguntar!`
  }
};

export default Es;
