(() => {
  const DEFAULT_LANGUAGE = "english";
  const LANGUAGE_FILES = {
    english: "data/english.json",
    spanish: "data/spanish.json",
  };
  const languageCache = {};
  let currentLanguage = DEFAULT_LANGUAGE;

  const getNestedValue = (source, path) => {
    return path.split(".").reduce((value, key) => {
      return value && Object.prototype.hasOwnProperty.call(value, key) ? value[key] : "";
    }, source);
  };

  const readInlineLanguage = (language) => {
    const source = document.querySelector(`[data-language-inline="${language}"]`);

    if (!source) {
      throw new Error(`Missing inline language: ${language}`);
    }

    languageCache[language] = JSON.parse(source.textContent);
    return languageCache[language];
  };

  const loadLanguageSync = (language) => {
    const request = new XMLHttpRequest();
    request.overrideMimeType("application/json");
    request.open("GET", LANGUAGE_FILES[language], false);
    request.send(null);

    if (request.status !== 0 && (request.status < 200 || request.status >= 300)) {
      throw new Error(`Unable to load language: ${language}`);
    }

    languageCache[language] = JSON.parse(request.responseText);
    return languageCache[language];
  };

  const loadLanguage = async (language) => {
    if (languageCache[language]) {
      return languageCache[language];
    }

    try {
      if (window.location.protocol === "file:") {
        return loadLanguageSync(language);
      }

      const response = await fetch(LANGUAGE_FILES[language]);

      if (!response.ok) {
        throw new Error(`Unable to load language: ${language}`);
      }

      languageCache[language] = await response.json();
    } catch (error) {
      languageCache[language] = readInlineLanguage(language);
    }

    return languageCache[language];
  };

  const applyLanguage = (language, dictionary) => {
    currentLanguage = language;
    document.documentElement.lang = dictionary.meta.htmlLang;
    document.title = dictionary.meta.title;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      element.textContent = getNestedValue(dictionary, element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((element) => {
      element.dataset.i18nAttr.split(";").forEach((binding) => {
        const [attribute, path] = binding.split(":");
        element.setAttribute(attribute, getNestedValue(dictionary, path));
      });
    });

    document.querySelectorAll(".nav-link[data-nav-target]").forEach((control) => {
      const key = `navigation.${control.dataset.navTarget}`;
      const value = getNestedValue(dictionary, key);

      if (value) {
        control.textContent = value;
      }
    });

    document.querySelectorAll("[data-language-option]").forEach((control) => {
      control.setAttribute(
        "aria-pressed",
        control.dataset.languageOption === language ? "true" : "false"
      );
    });

    window.dispatchEvent(
      new CustomEvent("qinti:languagechange", {
        detail: {
          language,
        },
      })
    );
  };

  const setLanguage = async (language) => {
    const dictionary = await loadLanguage(language);
    applyLanguage(language, dictionary);
  };

  const setupI18n = () => {
    document.querySelectorAll("[data-language-option]").forEach((control) => {
      control.addEventListener("click", () => {
        setLanguage(control.dataset.languageOption);
      });
    });

    try {
      const dictionary = loadLanguageSync(DEFAULT_LANGUAGE);
      applyLanguage(DEFAULT_LANGUAGE, dictionary);
    } catch (error) {
      const dictionary = readInlineLanguage(DEFAULT_LANGUAGE);
      applyLanguage(DEFAULT_LANGUAGE, dictionary);
    }
  };

  window.QintiI18n = {
    getText(path) {
      return getNestedValue(languageCache[currentLanguage] || {}, path);
    },
    setupI18n,
  };
})();
