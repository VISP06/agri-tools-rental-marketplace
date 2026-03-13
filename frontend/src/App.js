import { navbar } from "./components/Navbar.js";
import { footer } from "./components/Footer.js";
import { homePage } from "./pages/HomePage.js";
import { marketplacePage } from "./pages/MarketplacePage.js";
import { listEquipmentPage } from "./pages/ListEquipmentPage.js";
import { aboutPage } from "./pages/AboutPage.js";
import { contactPage } from "./pages/ContactPage.js";
import { loginPage } from "./pages/LoginPage.js";
import { registerPage } from "./pages/RegisterPage.js";
import { getEquipmentList, createEquipment, createBooking } from "./services/api.js";

const initApp = (rootElement) => {
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const state = {
    activePage: "home",
    history: [],
    equipment: [],
    loading: false,
    error: ""
  };

  const setState = (patch) => {
    Object.assign(state, patch);
    render();
  };

  const fetchEquipment = async () => {
    setState({ loading: true, error: "" });

    try {
      const result = await getEquipmentList();
      setState({ equipment: result.data || [], loading: false });
    } catch (error) {
      setState({ error: error.message, loading: false });
    }
  };

  const submitBooking = async (equipmentId) => {
    const renterName = window.prompt("Renter name");
    if (!renterName) {
      return;
    }

    const renterPhone = window.prompt("Renter phone number");
    if (!renterPhone) {
      return;
    }

    const startDate = window.prompt("Rental start date (YYYY-MM-DD)");
    if (!startDate) {
      return;
    }

    const endDate = window.prompt("Rental end date (YYYY-MM-DD)");
    if (!endDate) {
      return;
    }

    try {
      await createBooking({ equipmentId, renterName, renterPhone, startDate, endDate });
      window.alert("Booking request submitted.");
    } catch (error) {
      window.alert(`Booking failed: ${error.message}`);
    }
  };

  const handleEquipmentSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const payload = {
      ownerName: formData.get("ownerName"),
      name: formData.get("name"),
      category: formData.get("category"),
      location: formData.get("location"),
      description: formData.get("description"),
      hourlyRate: Number(formData.get("hourlyRate")),
      dailyRate: Number(formData.get("dailyRate"))
    };

    try {
      await createEquipment(payload);
      event.target.reset();
      setState({ activePage: "marketplace" });
      await fetchEquipment();
      window.alert("Equipment listed successfully.");
    } catch (error) {
      window.alert(`Could not save listing: ${error.message}`);
    }
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();
    window.alert("Thank you for your message! We'll get back to you within 24 hours.");
    event.target.reset();
  };

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    window.alert("Login functionality will be connected to the backend soon.");
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    if (password !== confirmPassword) {
      window.alert("Passwords do not match.");
      return;
    }

    window.alert("Registration functionality will be connected to the backend soon.");
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = {};
    const search = formData.get("search");
    const location = formData.get("location");
    const category = formData.get("category");

    if (search) query.search = search;
    if (location) query.location = location;
    if (category) query.category = category;

    setState({ activePage: "marketplace", loading: true, error: "" });

    try {
      const result = await getEquipmentList(query);
      setState({ equipment: result.data || [], loading: false });
    } catch (error) {
      setState({ error: error.message, loading: false });
    }
  };

  const navigateTo = (page, options = {}) => {
    const { recordHistory = true } = options;
    if (page === state.activePage) {
      return;
    }

    const nextHistory = recordHistory ? [...state.history, state.activePage] : state.history;
    setState({ history: nextHistory, activePage: page });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    if (state.history.length === 0) {
      navigateTo("home", { recordHistory: false });
      return;
    }

    const prev = state.history[state.history.length - 1];
    setState({ history: state.history.slice(0, -1), activePage: prev });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const attachListeners = () => {
    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Navbar navigation
    const navMap = {
      "nav-home": "home",
      "nav-home-link": "home",
      "nav-home-mobile": "home",
      "nav-marketplace-link": "marketplace",
      "nav-marketplace-mobile": "marketplace",
      "nav-about-link": "about",
      "nav-about-mobile": "about",
      "nav-contact-link": "contact",
      "nav-contact-mobile": "contact",
      "nav-list-equipment-link": "list-equipment",
      "nav-list-equipment-mobile": "list-equipment",
      "nav-login-link": "login"
    };

    Object.entries(navMap).forEach(([id, page]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", () => navigateTo(page));
      }
    });

    // Footer navigation
    const footerMap = {
      "footer-home": "home",
      "footer-marketplace": "marketplace",
      "footer-list-equipment": "list-equipment",
      "footer-about": "about",
      "footer-contact": "contact"
    };

    Object.entries(footerMap).forEach(([id, page]) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", () => navigateTo(page));
      }
    });

    // Page-specific listeners
    if (state.activePage === "home") {
      const heroBrowse = document.getElementById("hero-browse");
      if (heroBrowse) heroBrowse.addEventListener("click", () => navigateTo("marketplace"));

      const heroList = document.getElementById("hero-list");
      if (heroList) heroList.addEventListener("click", () => navigateTo("list-equipment"));

      const ctaList = document.getElementById("cta-list-equipment");
      if (ctaList) ctaList.addEventListener("click", () => navigateTo("list-equipment"));

      const viewAll = document.getElementById("view-all-equipment");
      if (viewAll) viewAll.addEventListener("click", () => navigateTo("marketplace"));

      const viewAllBottom = document.getElementById("view-all-equipment-bottom");
      if (viewAllBottom) viewAllBottom.addEventListener("click", () => navigateTo("marketplace"));

      // Category buttons
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const category = btn.dataset.category;
          setState({ activePage: "marketplace", loading: true, error: "" });
          getEquipmentList(category ? { category } : {})
            .then((result) => setState({ equipment: result.data || [], loading: false }))
            .catch((err) => setState({ error: err.message, loading: false }));
        });
      });

      // Search form on home
      const searchForm = document.getElementById("search-form");
      if (searchForm) searchForm.addEventListener("submit", handleSearchSubmit);

      // Book buttons
      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => submitBooking(button.dataset.bookEquipment));
      });
    }

    if (state.activePage === "marketplace") {
      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => submitBooking(button.dataset.bookEquipment));
      });

      const searchForm = document.getElementById("marketplace-search-form");
      if (searchForm) searchForm.addEventListener("submit", handleSearchSubmit);
    }

    if (state.activePage === "list-equipment") {
      const form = document.getElementById("add-equipment-form");
      if (form) form.addEventListener("submit", handleEquipmentSubmit);
    }

    if (state.activePage === "contact") {
      const form = document.getElementById("contact-form");
      if (form) form.addEventListener("submit", handleContactSubmit);

      const partnerBtn = document.getElementById("contact-become-partner");
      if (partnerBtn) partnerBtn.addEventListener("click", () => navigateTo("list-equipment"));
    }

    if (state.activePage === "login") {
      const backBtn = document.getElementById("back-btn");
      if (backBtn) backBtn.addEventListener("click", goBack);

      const form = document.getElementById("login-form");
      if (form) form.addEventListener("submit", handleLoginSubmit);

      const gotoRegister = document.getElementById("goto-register");
      if (gotoRegister) gotoRegister.addEventListener("click", () => navigateTo("register", { recordHistory: false }));
    }

    if (state.activePage === "register") {
      const backBtn = document.getElementById("back-btn");
      if (backBtn) backBtn.addEventListener("click", goBack);

      const form = document.getElementById("register-form");
      if (form) form.addEventListener("submit", handleRegisterSubmit);

      const gotoLogin = document.getElementById("goto-login");
      if (gotoLogin) gotoLogin.addEventListener("click", () => navigateTo("login", { recordHistory: false }));
    }
  };

  const getPageMarkup = () => {
    switch (state.activePage) {
      case "marketplace":
        return marketplacePage({ loading: state.loading, error: state.error, equipment: state.equipment });
      case "list-equipment":
        return listEquipmentPage();
      case "about":
        return aboutPage();
      case "contact":
        return contactPage();
      case "login":
        return loginPage();
      case "register":
        return registerPage();
      case "home":
      default:
        return homePage({ loading: state.loading, error: state.error, equipment: state.equipment });
    }
  };

  const render = () => {
    const pageMarkup = getPageMarkup();
    const showNavFooter = !["login", "register"].includes(state.activePage);

    rootElement.innerHTML = `
      ${showNavFooter ? navbar(state.activePage) : ""}
      <div class="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-6">
        <main>${pageMarkup}</main>
      </div>
      ${showNavFooter ? footer() : ""}
    `;

    attachListeners();
  };

  render();
  fetchEquipment();
};

export { initApp };
