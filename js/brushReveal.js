(() => {
  const REVEAL_DURATION = 700;
  const revealTimers = new WeakMap();
  const imageRequests = new WeakMap();
  const revealSelector = "[data-brush-reveal]";

  const prefersReducedMotion = () => {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  };

  const easeOutCubic = (value) => {
    return 1 - Math.pow(1 - value, 3);
  };

  const getRevealElement = (element) => {
    return element?.matches?.(revealSelector) ? element : element?.closest?.(revealSelector);
  };

  const setRevealProgress = (element, progress) => {
    element.style.setProperty("--brush-progress", `${Math.round(progress * 100)}%`);
    element.style.setProperty("--image-reveal-opacity", String(progress));
    element.style.setProperty("--image-reveal-offset", `${(1 - progress) * 10}px`);
  };

  const cancelReveal = (element) => {
    const previousTimer = revealTimers.get(element);

    if (previousTimer) {
      cancelAnimationFrame(previousTimer);
      revealTimers.delete(element);
    }
  };

  const revealElement = (element) => {
    const target = getRevealElement(element);

    if (!target) {
      return;
    }

    cancelReveal(target);

    if (prefersReducedMotion()) {
      target.classList.remove("is-brush-revealing");
      setRevealProgress(target, 1);
      return;
    }

    let startTime = 0;
    target.classList.add("is-brush-revealing");
    setRevealProgress(target, 0);

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / REVEAL_DURATION, 1);
      const easedProgress = easeOutCubic(progress);

      setRevealProgress(target, easedProgress);

      if (progress < 1) {
        revealTimers.set(target, requestAnimationFrame(animate));
        return;
      }

      target.classList.remove("is-brush-revealing");
      setRevealProgress(target, 1);
      revealTimers.delete(target);
    };

    revealTimers.set(target, requestAnimationFrame(animate));
  };

  const revealWhenReady = (element) => {
    const target = getRevealElement(element);
    const image = target?.querySelector("img");

    if (!target) {
      return;
    }

    if (!image) {
      revealElement(target);
      return;
    }

    if (image.complete) {
      if (image.naturalWidth > 0) {
        revealElement(target);
      }

      return;
    }

    image.addEventListener("load", () => revealElement(target), { once: true });
  };

  const revealAll = (root = document) => {
    root.querySelectorAll("[data-brush-reveal]").forEach((element) => {
      revealWhenReady(element);
    });
  };

  const decodeImage = (image) => {
    if (!image.decode) {
      return Promise.resolve();
    }

    return image.decode().catch(() => {});
  };

  const loadImage = (image, src, alt = "") => {
    if (!image || !src) {
      return Promise.resolve(false);
    }

    const requestId = Symbol(src);
    imageRequests.set(image, requestId);
    image.alt = alt;

    if (image.getAttribute("src") === src && image.complete) {
      if (image.naturalWidth > 0) {
        image.style.visibility = "";
        return decodeImage(image).then(() => true);
      }

      image.hidden = true;
      image.style.visibility = "hidden";
      return Promise.resolve(false);
    }

    image.hidden = false;
    image.style.visibility = "hidden";

    return new Promise((resolve) => {
      const finish = (didLoad) => {
        if (imageRequests.get(image) !== requestId) {
          resolve(false);
          return;
        }

        const hasLoadedImage = didLoad && image.naturalWidth > 0;

        if (hasLoadedImage) {
          image.style.visibility = "";
        } else {
          image.style.visibility = "hidden";
          image.hidden = true;
        }

        decodeImage(image).then(() => resolve(hasLoadedImage));
      };

      image.addEventListener("load", () => finish(true), { once: true });
      image.addEventListener("error", () => finish(false), { once: true });
      image.src = src;
    });
  };

  const loadAndRevealImage = ({ image, src, alt = "", revealRoot, animate = true }) => {
    const target = revealRoot || getRevealElement(image);

    if (target) {
      target.classList.add("is-image-loading");
    }

    return loadImage(image, src, alt).then((didLoad) => {
      if (target) {
        target.classList.remove("is-image-loading");
      }

      if (didLoad && animate && target) {
        revealElement(target);
      }

      return didLoad;
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
    loadAndRevealImage,
    loadImage,
    revealAll,
    revealElement,
    setupBrushReveal,
  };
})();
