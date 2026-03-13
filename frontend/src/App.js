import { navbar } from "./components/Navbar.js";
import { footer } from "./components/Footer.js";
import { homePage } from "./pages/HomePage.js";
import { marketplacePage } from "./pages/MarketplacePage.js";
import { listEquipmentPage } from "./pages/ListEquipmentPage.js";
import { aboutPage } from "./pages/AboutPage.js";
import { contactPage } from "./pages/ContactPage.js";
import { loginPage } from "./pages/LoginPage.js";
import { registerPage } from "./pages/RegisterPage.js";
import { profilePage } from "./pages/ProfilePage.js";

import { getEquipmentList, createEquipment, createBooking, loginUser, registerUser } from "./services/api.js";
import { initSmartSearch } from "./utils/smartSearch.js";


const initApp = (rootElement) => {
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const state = {
    activePage: "home",
    history: [],
    equipment: [],
    loading: false,
    error: "",
    loggedInUser: localStorage.getItem("agrirent_user_id") || ""
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

    const imageFile = formData.get("image");
    let imageBase64 = "";
    if (imageFile && imageFile.size > 0) {
      imageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(imageFile);
      });
    }

    const payload = {
      ownerName: formData.get("ownerName"),
      ownerId: state.loggedInUser,
      name: formData.get("name"),
      category: formData.get("category"),
      location: formData.get("location"),
      description: formData.get("description"),
      dailyRate: Number(formData.get("dailyRate")),
      images: imageBase64 ? [imageBase64] : []
    };

    try {
      await createEquipment(payload);
      event.target.reset();
      const preview = document.getElementById("image-preview");
      if (preview) {
        preview.classList.add("hidden");
        preview.src = "";
      }
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

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = formData.get("userId").trim();
    if (!userId) {
      window.alert("Please enter a valid ID.");
      return;
    }
    try {
      await loginUser(userId);
      localStorage.setItem("agrirent_user_id", userId);
      setState({ loggedInUser: userId, activePage: "home" });
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agrirent_user_id");
    setState({ loggedInUser: "", activePage: "home" });
  };

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userId = formData.get("userId").trim();
    if (!userId) {
      window.alert("Please enter a valid ID.");
      return;
    }
    try {
      await registerUser(userId);
      window.alert("ID created successfully! You can now log in.");
      setState({ activePage: "login" });
    } catch (error) {
      window.alert(error.message);
    }
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
    "nav-login-link": "login",
    "nav-profile": "profile",
    "profile-goto-list": "list-equipment",
    "footer-home": "home",
    "footer-marketplace": "marketplace",
    "footer-list-equipment": "list-equipment",
    "footer-about": "about",
    "footer-contact": "contact",
    "hero-browse": "marketplace",
    "hero-list": "list-equipment",
    "cta-list-equipment": "list-equipment",
    "view-all-equipment": "marketplace",
    "view-all-equipment-bottom": "marketplace"
  };

  // Use event delegation on the root element for reliable navigation
  rootElement.addEventListener("click", (event) => {
    const target = event.target.closest("[id]");
    if (!target) return;
    if (target.id === "nav-logout") {
      handleLogout();
      return;
    }
    if (navMap[target.id]) {
      navigateTo(navMap[target.id]);
    }
  });

  const attachListeners = () => {
    // Mobile menu toggle
    const mobileToggle = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileToggle && mobileMenu) {
      mobileToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });
    }

    // Page-specific listeners
    if (state.activePage === "home") {
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

      // Smart search autocomplete on home
      const homeSearchInput = document.getElementById("smart-search-input-home");
      if (homeSearchInput) initSmartSearch(homeSearchInput, state.equipment);

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

      // Smart search autocomplete on marketplace
      const marketplaceSearchInput = document.getElementById("smart-search-input");
      if (marketplaceSearchInput) initSmartSearch(marketplaceSearchInput, state.equipment);
    }

    if (state.activePage === "list-equipment") {
      const form = document.getElementById("add-equipment-form");
      if (form) form.addEventListener("submit", handleEquipmentSubmit);

      const imageInput = form && form.querySelector('input[name="image"]');
      const imagePreview = document.getElementById("image-preview");
      if (imageInput) {
        imageInput.addEventListener("change", (e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
              imagePreview.src = ev.target.result;
              imagePreview.classList.remove("hidden");
            };
            reader.readAsDataURL(file);
          }
        });
      }
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
        return marketplacePage({ loading: state.loading, error: state.error, equipment: state.equipment, loggedInUser: state.loggedInUser });
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
      case "profile":
        return profilePage({ loggedInUser: state.loggedInUser, equipment: state.equipment });
      case "home":
      default:
        return homePage({ loading: state.loading, error: state.error, equipment: state.equipment, loggedInUser: state.loggedInUser });
    }
  };

  const render = () => {
    const pageMarkup = getPageMarkup();
    const showNavFooter = !["login", "register"].includes(state.activePage);

    rootElement.innerHTML = `
      ${showNavFooter ? navbar(state.activePage, state.loggedInUser) : ""}
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
