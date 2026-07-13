(() => {
  const DEFAULT_CATEGORY = "training";
  const DEFAULT_SIZE = "CM";
  const PRODUCTS_FILE = "data/products.json";
  const CATEGORY_LABELS = {
    training: {
      english: "Training",
      spanish: "Entrenamiento",
    },
    competition: {
      english: "Competition",
      spanish: "Competencia",
    },
  };
  const catalogState = {
    products: null,
    category: DEFAULT_CATEGORY,
    colorIndex: 0,
    selectedSize: DEFAULT_SIZE,
    customizationExpanded: false,
    customizationText: "",
  };

  const getLanguage = () => {
    return document.documentElement.lang === "es" ? "spanish" : "english";
  };

  const getLocalizedValue = (value) => {
    if (typeof value === "string") {
      return value;
    }

    return value[getLanguage()] || value.english || "";
  };

  const readInlineProducts = () => {
    const source = document.querySelector("[data-products-inline]");

    if (!source) {
      throw new Error("Missing inline products data");
    }

    return JSON.parse(source.textContent);
  };

  const loadProducts = () => {
    const request = new XMLHttpRequest();
    request.overrideMimeType("application/json");

    try {
      request.open("GET", PRODUCTS_FILE, false);
      request.send(null);

      if (request.status === 0 || (request.status >= 200 && request.status < 300)) {
        return JSON.parse(request.responseText);
      }
    } catch (error) {
      return readInlineProducts();
    }

    return readInlineProducts();
  };

  const getCurrentProduct = () => {
    const categoryProducts = catalogState.products.categories[catalogState.category] || [];
    return categoryProducts[0] || null;
  };

  const getSelectedColor = (product) => {
    return product.colors[catalogState.colorIndex] || product.colors[0] || null;
  };

  const renderCategoryButtons = () => {
    const toggle = document.querySelector("[data-catalog-category-toggle]");
    const toggleLabel = document.querySelector("[data-catalog-category-toggle-label]");
    const isCompetition = catalogState.category === "competition";

    if (toggle) {
      toggle.setAttribute("aria-pressed", isCompetition ? "true" : "false");
    }

    if (toggleLabel) {
      toggleLabel.textContent = isCompetition ? getLocalizedValue(CATEGORY_LABELS.competition) : getLocalizedValue(CATEGORY_LABELS.training);
    }

    document.querySelectorAll("[data-catalog-category]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.catalogCategory === catalogState.category ? "true" : "false"
      );
    });
  };

  const renderSwatches = (product) => {
    const swatches = Array.from(document.querySelectorAll("[data-catalog-swatch]"));

    swatches.forEach((swatch, index) => {
      const color = product.colors[index];

      if (!color) {
        swatch.hidden = true;
        return;
      }

      swatch.hidden = false;
      swatch.style.background = color.value;
      swatch.setAttribute("aria-label", getLocalizedValue(color.name));
      swatch.setAttribute("aria-pressed", index === catalogState.colorIndex ? "true" : "false");
    });
  };

  const renderSizeButtons = () => {
    document.querySelectorAll("[data-catalog-size]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        button.dataset.catalogSize === catalogState.selectedSize ? "true" : "false"
      );
    });
  };

  const renderCustomization = () => {
    const toggle = document.querySelector("[data-catalog-customize-toggle]");
    const panel = document.querySelector(".catalog-customization");
    const field = document.querySelector("[data-catalog-customization]");

    if (toggle) {
      toggle.setAttribute("aria-expanded", catalogState.customizationExpanded ? "true" : "false");
    }

    if (panel) {
      panel.hidden = !catalogState.customizationExpanded;
    }

    if (field && document.activeElement !== field) {
      field.value = catalogState.customizationText;
    }
  };

  const renderProduct = ({ animateImage = false } = {}) => {
    const product = getCurrentProduct();

    if (!product) {
      return;
    }

    const selectedColor = getSelectedColor(product);
    const image = document.querySelector("[data-catalog-image]");
    const name = document.querySelector("[data-catalog-name]");
    const description = document.querySelector("[data-catalog-description]");

    if (name) {
      name.textContent = getLocalizedValue(product.name);
    }

    if (description) {
      description.textContent = getLocalizedValue(product.description);
    }

    if (image && selectedColor) {
      const productName = getLocalizedValue(product.name);
      const colorName = getLocalizedValue(selectedColor.name);

      window.QintiBrushReveal.loadAndRevealImage({
        image,
        src: selectedColor.image,
        alt: `${productName}, ${colorName}`,
        revealRoot: image.closest("[data-brush-reveal]"),
        animate: animateImage,
      });
    }

    renderCategoryButtons();
    renderSwatches(product);
    renderSizeButtons();
    renderCustomization();
  };

  const setupCatalog = () => {
    catalogState.products = loadProducts();

    const toggleButton = document.querySelector("[data-catalog-category-toggle]");
    const detailsPanel = document.querySelector("[data-catalog-details-panel]");
    const detailsToggle = document.querySelector("[data-catalog-details-toggle]");

    const switchCategory = (nextCategory) => {
      catalogState.category = nextCategory;
      catalogState.colorIndex = 0;
      renderProduct({ animateImage: true });
    };

    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        switchCategory(catalogState.category === "training" ? "competition" : "training");
      });
    }

    document.querySelectorAll("[data-catalog-category]").forEach((button) => {
      button.addEventListener("click", () => {
        switchCategory(button.dataset.catalogCategory);
      });
    });

    document.querySelectorAll("[data-catalog-swatch]").forEach((button) => {
      button.addEventListener("click", () => {
        catalogState.colorIndex = Number(button.dataset.colorIndex);
        renderProduct({ animateImage: true });
      });
    });

    document.querySelectorAll("[data-catalog-size]").forEach((button) => {
      button.addEventListener("click", () => {
        catalogState.selectedSize = button.dataset.catalogSize;
        renderSizeButtons();
      });
    });

    if (detailsToggle && detailsPanel) {
      detailsToggle.addEventListener("click", () => {
        const isExpanded = detailsPanel.classList.toggle("is-open");
        detailsPanel.classList.toggle("is-collapsed", !isExpanded);
        detailsToggle.setAttribute("aria-expanded", String(isExpanded));
        document.querySelector(".floating-actions")?.classList.toggle("is-hidden", isExpanded);
      });
    }

    const customizeToggle = document.querySelector("[data-catalog-customize-toggle]");
    const customizationField = document.querySelector("[data-catalog-customization]");

    if (customizeToggle) {
      customizeToggle.addEventListener("click", () => {
        catalogState.customizationExpanded = !catalogState.customizationExpanded;
        renderCustomization();

        if (catalogState.customizationExpanded && customizationField) {
          customizationField.focus();
        }
      });
    }

    if (customizationField) {
      customizationField.addEventListener("input", () => {
        catalogState.customizationText = customizationField.value;
      });
    }

    window.addEventListener("qinti:languagechange", renderProduct);

    window.addEventListener("qinti:pagechange", (event) => {
      if (event.detail.page === "catalog") {
        const detailsPanel = document.querySelector("[data-catalog-details-panel]");
        const detailsToggle = document.querySelector("[data-catalog-details-toggle]");

        if (detailsPanel) {
          detailsPanel.classList.remove("is-open");
          detailsPanel.classList.add("is-collapsed");
        }

        if (detailsToggle) {
          detailsToggle.setAttribute("aria-expanded", "false");
        }

        document.querySelector(".floating-actions")?.classList.remove("is-hidden");
      }
    });

    renderProduct();
  };

  const getOrderDetails = () => {
    const product = getCurrentProduct();

    if (!product) {
      return null;
    }

    const selectedColor = getSelectedColor(product);

    return {
      category: getLocalizedValue(CATEGORY_LABELS[catalogState.category]),
      model: getLocalizedValue(product.name),
      color: selectedColor ? getLocalizedValue(selectedColor.name) : "",
      size: catalogState.selectedSize,
      customization: catalogState.customizationText.trim(),
    };
  };

  window.QintiCatalog = {
    getOrderDetails,
    renderProduct,
    setupCatalog,
  };
})();
