(() => {
  const REVEAL_DURATION = 700;
  const revealTimers = new WeakMap();

  const easeOutCubic = (value) => {
    return 1 - Math.pow(1 - value, 3);
  };

  const revealElement = (element) => {
    if (!element) {
      return;
    }

    const previousTimer = revealTimers.get(element);

    if (previousTimer) {
      cancelAnimationFrame(previousTimer);
    }

    let startTime = 0;
    element.classList.add("is-brush-revealing");
    element.style.setProperty("--brush-cover", "0%");

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / REVEAL_DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      element.style.setProperty("--brush-cover", `${Math.min(easedProgress * 106, 106)}%`);

      if (progress < 1) {
        revealTimers.set(element, requestAnimationFrame(animate));
        return;
      }

      element.classList.remove("is-brush-revealing");
      element.style.setProperty("--brush-cover", "100%");
      revealTimers.delete(element);
    };

    revealTimers.set(element, requestAnimationFrame(animate));
  };

  const revealAll = (root = document) => {
    root.querySelectorAll("[data-brush-reveal]").forEach((element) => {
      revealElement(element);
    });
  };

  const setupBrushReveal = () => {
    window.addEventListener("qinti:pagechange", (event) => {
      if (event.detail.page === "catalog") {
        revealAll(document.querySelector('[data-page="catalog"]'));
      }
    });
  };

  window.QintiBrushReveal = {
    revealAll,
    revealElement,
    setupBrushReveal,
  };
})();
