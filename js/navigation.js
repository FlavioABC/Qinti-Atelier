(() => {
  const DEFAULT_PAGE = "home";

  const getRequestedPage = () => {
    const hashPage = window.location.hash.replace("#", "");
    return hashPage || DEFAULT_PAGE;
  };

  const setActivePage = (requestedPage, sections, controls) => {
    const pageExists = sections.some((section) => section.dataset.page === requestedPage);
    const activePage = pageExists ? requestedPage : DEFAULT_PAGE;

    sections.forEach((section) => {
      const isActive = section.dataset.page === activePage;
      section.hidden = !isActive;
      section.classList.toggle("page-section--active", isActive);
    });

    controls.forEach((control) => {
      const isActive = control.dataset.navTarget === activePage;
      control.setAttribute("aria-current", isActive ? "page" : "false");
    });

    if (window.location.hash !== `#${activePage}`) {
      history.replaceState(null, "", `#${activePage}`);
    }

    window.dispatchEvent(
      new CustomEvent("qinti:pagechange", {
        detail: {
          page: activePage,
        },
      })
    );
  };

  const setupNavigation = () => {
    const sections = Array.from(document.querySelectorAll("[data-page]"));
    const controls = Array.from(document.querySelectorAll("[data-nav-target]"));

    if (!sections.length || !controls.length) {
      return;
    }

    controls.forEach((control) => {
      control.addEventListener("click", (event) => {
        event.preventDefault();
        setActivePage(control.dataset.navTarget, sections, controls);
      });
    });

    window.addEventListener("hashchange", () => {
      setActivePage(getRequestedPage(), sections, controls);
    });

    setActivePage(getRequestedPage(), sections, controls);
  };

  window.QintiNavigation = {
    setupNavigation,
  };
})();
