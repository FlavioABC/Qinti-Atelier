(() => {
  const WHATSAPP_URL = "https://wa.me/";

  const getMessageText = (key) => {
    return window.QintiI18n.getText(`catalog.orderMessage.${key}`);
  };

  const buildOrderMessage = (details) => {
    return [
      getMessageText("greeting"),
      "",
      getMessageText("intro"),
      "",
      getMessageText("category"),
      details.category,
      "",
      getMessageText("model"),
      details.model,
      "",
      getMessageText("color"),
      details.color,
      "",
      getMessageText("size"),
      details.size,
      "",
      getMessageText("customization"),
      details.customization,
      "",
      getMessageText("thanks"),
    ].join("\n");
  };

  const buildWhatsAppUrl = (message) => {
    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
  };

  const openWhatsAppOrder = () => {
    const details = window.QintiCatalog.getOrderDetails();

    if (!details) {
      return;
    }

    const url = buildWhatsAppUrl(buildOrderMessage(details));
    const openedWindow = window.open(url, "_blank", "noopener");

    if (!openedWindow) {
      window.location.href = url;
    }
  };

  const setupWhatsApp = () => {
    const orderButton = document.querySelector("[data-whatsapp-order]");
    const floatingButton = document.querySelector("[data-floating-whatsapp]");

    if (orderButton) {
      orderButton.addEventListener("click", openWhatsAppOrder);
    }

    if (floatingButton) {
      floatingButton.addEventListener("click", openWhatsAppOrder);
    }
  };

  window.QintiWhatsApp = {
    buildOrderMessage,
    buildWhatsAppUrl,
    setupWhatsApp,
  };
})();
