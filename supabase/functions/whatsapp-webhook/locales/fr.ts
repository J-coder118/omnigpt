const Fr = {
  paymentNotExist:
    "Il semble que votre abonnement Omnigpt ait expiré ou soit inactif. Pour continuer à utiliser Omnigpt sur WhatsApp, veuillez vous inscrire sur https://app.omnigpt.co.",
  phoneNumberNotExist:
    "Votre WhatsApp n'existe pas dans OmniGPT. Visitez www.omnigpt.com pour plus d'informations",
  welcome: {
    header: "Bienvenue sur OmniGPT.",
    body: `Cliquez sur le bouton Menu principal pour découvrir ce que vous pouvez faire dans cette conversation :

    1. Créer un nouveau fil
    2. Trouver un fil
    3. Apprendre à utiliser

Si vous préférez, commencez simplement à discuter avec moi comme vous le feriez avec n'importe quelle autre personne. Je suis là pour écouter et aider de toutes les manières possibles.
Pour accéder à nouveau au menu principal, tapez simplement */menu* dans le chat`,
    footer: "Visitez www.omnigpt.com pour plus d'informations",
    action: {
      button: "Menu principal",
      createNewThread: "Créer un nouveau fil",
      findAThread: "Trouver un fil",
      learnUse: "Apprendre à utiliser"
    }
  },
  error:
    "Actuellement, *OmniGPT* n'est pas disponible. Veuillez réessayer plus tard",
  remind:
    "Pour commencer, veuillez cliquer sur le bouton *Menu principal*. Vous pouvez accéder au *Menu principal* en tapant simplement */menu* dans le chat.",
  newThreadCreated:
    "Un nouveau fil a été créé. Vous pouvez l'utiliser pour discuter d'un sujet ou d'un problème spécifique dans le chat.",
  noThread: "Actuellement, vous n'avez aucun sujet",
  listThread: `Voici les _TOTAL_THREAD_ fils de discussion les plus récents
Tapez le numéro du fil que vous souhaitez sélectionner:

_LIST_THREAD_`,
  seeMore: "Voir plus",
  previousThread: {
    oldMessage: "*Voici les messages précédents dans ce fil*:",
    canContinue: `Vous pouvez maintenant poursuivre la conversation avec ce fil.`,
    error: `Votre sélection n'est pas correcte. Veuillez choisir à nouveau`
  },
  chatWithGPT: {
    introduceDoc:
      "Dites-moi de quoi traite ce document en une phrase ne dépassant pas 12 mots et demandez-moi : Avez-vous besoin d'aide avec ce document?",
    notice:
      "Votre message a été reçu. Nous vous enverrons une réponse dans quelques secondes",
    error: "Il y a eu une erreur avec votre réponse. Veuillez réessayer"
  },
  guide: {
    thank: `Merci de l'intérêt que vous portez à l'utilisation d'OmniGPT!

Pour commencer, tapez simplement votre message et OmniGPT vous répondra.`,
    suggest: `Voici quelques exemples de questions que vous pouvez poser.

- De quel sujet ou problème souhaitez-vous discuter ?
- Avez-vous des questions ou des préoccupations spécifiques que vous aimeriez explorer ?
- Souhaitez-vous que je fournisse quelques suggestions pour démarrer la conversation ?
- Vous cherchez des astuces pour communiquer plus efficacement avec les autres ?
- Avez-vous besoin d'aide pour résoudre un conflit ou un malentendu dans une conversation ?
- Aimeriez-vous pratiquer vos compétences en communication avec moi ?

Si vous avez besoin d'aide supplémentaire, n'hésitez pas à demander !`
  }
};

export default Fr;
