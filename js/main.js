window.QintiI18n.setupI18n();
window.QintiBrushReveal.setupBrushReveal();
window.QintiCatalog.setupCatalog();
window.QintiNavigation.setupNavigation();
window.QintiWhatsApp.setupWhatsApp();

const checkImageAvailability = (src) => new Promise((resolve) => {
  const testImage = new Image();
  testImage.onload = () => resolve(true);
  testImage.onerror = () => resolve(false);
  testImage.src = src;
});

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

const homeArtworkImage = document.querySelector('[data-home-artwork="back"]');
const homeArtworkCycle = [
  "images/home/malla1.png"
];

let homeArtworkIndex = 0;

const setHomeArtworkBackFace = async (index) => {
  if (!homeArtworkImage) {
    return;
  }

  const candidateSrc = homeArtworkCycle[index];
  const fallbackSrc = homeArtworkImage.dataset.fallbackSrc;

  if (!candidateSrc) {
    return;
  }

  const isAvailable = await checkImageAvailability(candidateSrc);

  homeArtworkImage.src = isAvailable ? candidateSrc : fallbackSrc;
};

const rotateHomeArtworkBackFace = async () => {
  homeArtworkIndex = (homeArtworkIndex + 1) % homeArtworkCycle.length;
  await setHomeArtworkBackFace(homeArtworkIndex);
};

if (homeArtworkImage) {
  setHomeArtworkBackFace(homeArtworkIndex);

  const artworkDuration = parseFloat(getComputedStyle(document.querySelector(".rotating-artwork")).animationDuration) * 1000;
  const swapInterval = artworkDuration / 4;

  window.setInterval(rotateHomeArtworkBackFace, swapInterval);
}
