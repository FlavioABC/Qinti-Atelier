window.QintiI18n.setupI18n();
window.QintiBrushReveal.setupBrushReveal();
window.QintiCatalog.setupCatalog();
window.QintiNavigation.setupNavigation();
window.QintiWhatsApp.setupWhatsApp();

document.querySelectorAll("[data-placeholder-image]").forEach((image) => {
  const hideMissingImage = () => {
    if (!image.naturalWidth) {
      image.hidden = true;
    }
  };

  image.addEventListener("error", hideMissingImage);

  if (image.complete) {
    hideMissingImage();
  }
});
