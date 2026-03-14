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
import { equipmentDetailPage } from "./pages/EquipmentDetailPage.js";
import { cartPage } from "./pages/CartPage.js";
import { paymentPage, initPaymentMethods } from "./pages/PaymentPage.js";
import { bookingConfirmationPage } from "./pages/BookingConfirmationPage.js";

import { getEquipmentList, createEquipment, createBooking, loginUser, registerUser, deleteEquipment, rateEquipment, createBatchBookings, getMyBookings } from "./services/api.js";
import { initSmartSearch } from "./utils/smartSearch.js";
import { initLocationSearch } from "./utils/locationSearch.js";
import { initCategoryDropdowns } from "./components/CategoryDropdown.js";


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
    loggedInUser: localStorage.getItem("agrirent_user_id") || "",
    selectedEquipmentId: null,
    searchQuery: { search: "", location: "", category: "" },
    cart: JSON.parse(localStorage.getItem("agrirent_cart") || "[]"),
    renterName: "",
    renterPhone: "",
    confirmedBookings: [],
    paymentId: "",
    bookings: [],
    userLat: null,
    userLng: null,
    userCity: ""
  };

  const setState = (patch) => {
    Object.assign(state, patch);
    if (patch.cart !== undefined) {
      localStorage.setItem("agrirent_cart", JSON.stringify(state.cart));
    }
    render();
  };

  const fetchEquipment = async (query = {}) => {
    setState({ loading: true, error: "" });

    try {
      // Auto-include user coordinates for proximity sorting if available and no explicit coords
      const q = { ...query };
      if (!q.lat && !q.lng && state.userLat && state.userLng) {
        q.lat = state.userLat;
        q.lng = state.userLng;
      }
      const result = await getEquipmentList(q);
      setState({ equipment: result.data || [], loading: false });
    } catch (error) {
      setState({ error: error.message, loading: false });
    }
  };

  const showToast = (message, type = "success") => {
    const existingToast = document.getElementById("toast-notification");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.id = "toast-notification";
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `<span>${message}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("toast-visible"));

    setTimeout(() => {
      toast.classList.remove("toast-visible");
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  const addToCart = (equipmentId) => {
    if (!state.loggedInUser) {
      showToast("Please login to add items to cart", "error");
      navigateTo("login");
      return;
    }
    const exists = state.cart.some((item) => String(item.equipmentId) === String(equipmentId));
    if (exists) {
      showToast("Already in cart");
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    setState({
      cart: [...state.cart, { equipmentId: String(equipmentId), startDate: today, numberOfDays: 1 }]
    });
    showToast("Added to cart");
  };

  const removeFromCart = (equipmentId) => {
    setState({ cart: state.cart.filter((item) => String(item.equipmentId) !== String(equipmentId)) });
    showToast("Removed from cart");
  };

  const updateCartItem = (equipmentId, field, value) => {
    const updatedCart = state.cart.map((item) => {
      if (String(item.equipmentId) === String(equipmentId)) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setState({ cart: updatedCart });
  };

  const clearCart = () => {
    setState({ cart: [] });
    showToast("Cart cleared");
  };

  const handleCheckout = async () => {
    if (state.cart.length === 0) {
      showToast("Your cart is empty", "error");
      return;
    }

    const renterName = document.getElementById("checkout-renter-name")?.value?.trim();
    const renterPhone = document.getElementById("checkout-renter-phone")?.value?.trim();

    if (!renterName) {
      showToast("Please enter your name", "error");
      return;
    }
    if (!renterPhone) {
      showToast("Please enter your phone number", "error");
      return;
    }

    for (const item of state.cart) {
      if (!item.startDate) {
        const eq = state.equipment.find((e) => String(e._id) === String(item.equipmentId));
        showToast(`Please set a start date for ${eq?.name || "an item"}`, "error");
        return;
      }
    }

    // Save renter details and navigate to payment page
    const nextHist = [...state.history, state.activePage];
    setState({ renterName, renterPhone, history: nextHist, activePage: "payment" });
    window.history.pushState({ page: "payment", history: [...nextHist] }, "", "#payment");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePayNow = async () => {
    const bookings = state.cart.map((item) => {
      const eq = state.equipment.find((e) => String(e._id) === String(item.equipmentId));
      const dailyRate = eq?.dailyRate || 0;
      const numberOfDays = item.numberOfDays || 1;
      const totalPrice = dailyRate * numberOfDays;

      const start = new Date(item.startDate);
      start.setDate(start.getDate() + numberOfDays);
      const endDate = start.toISOString().split("T")[0];

      return {
        equipmentId: item.equipmentId,
        renterId: state.loggedInUser,
        renterName: state.renterName,
        renterPhone: state.renterPhone,
        startDate: item.startDate,
        endDate,
        quantity: 1,
        totalPrice,
        numberOfDays
      };
    });

    const payBtn = document.getElementById("payment-pay-btn");
    if (payBtn) {
      payBtn.disabled = true;
      payBtn.innerHTML = `<svg class="h-5 w-5 inline mr-2 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg>Processing...`;
    }

    try {
      await createBatchBookings(bookings);

      const nextHist = [...state.history, state.activePage];
      setState({
        cart: [],
        confirmedBookings: bookings,
        paymentId: `AGRI-${Date.now()}`,
        history: nextHist,
        activePage: "booking-confirmation"
      });
      window.history.pushState({ page: "booking-confirmation", history: [...nextHist] }, "", "#booking-confirmation");
      window.scrollTo({ top: 0, behavior: "smooth" });
      showToast("Bookings confirmed successfully!");
    } catch (error) {
      showToast(`Booking failed: ${error.message}`, "error");
      if (payBtn) {
        payBtn.disabled = false;
        payBtn.innerHTML = `Confirm & Pay`;
      }
    }
  };

  const handleDownloadInvoice = () => {
    const bookings = state.confirmedBookings || [];
    let grandTotal = 0;
    const rows = bookings.map((b, i) => {
      const eq = state.equipment.find((e) => String(e._id) === String(b.equipmentId));
      const name = eq?.name || "Equipment";
      const days = b.numberOfDays || 1;
      const rate = eq?.dailyRate || 0;
      const subtotal = b.totalPrice || rate * days;
      grandTotal += subtotal;
      return `<tr>
        <td style="border:1px solid #e2e8f0;padding:8px 12px;text-align:center">${i + 1}</td>
        <td style="border:1px solid #e2e8f0;padding:8px 12px">${name}</td>
        <td style="border:1px solid #e2e8f0;padding:8px 12px;text-align:center">${b.startDate}</td>
        <td style="border:1px solid #e2e8f0;padding:8px 12px;text-align:center">${b.endDate}</td>
        <td style="border:1px solid #e2e8f0;padding:8px 12px;text-align:center">${days}</td>
        <td style="border:1px solid #e2e8f0;padding:8px 12px;text-align:right">Rs ${rate.toLocaleString("en-IN")}</td>
        <td style="border:1px solid #e2e8f0;padding:8px 12px;text-align:right;font-weight:600">Rs ${subtotal.toLocaleString("en-IN")}</td>
      </tr>`;
    }).join("");

    const invoiceHTML = `<!DOCTYPE html><html><head><title>AgriRent Invoice</title>
      <style>body{font-family:Inter,sans-serif;padding:40px;color:#1e293b}
      table{width:100%;border-collapse:collapse;margin:20px 0}
      th{background:#059669;color:#fff;padding:10px 12px;text-align:left;font-size:13px}
      td{font-size:13px}
      @media print{body{padding:20px}}</style></head>
      <body>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:30px">
          <div><h1 style="color:#059669;margin:0;font-size:28px">AgriRent</h1><p style="color:#64748b;margin:4px 0 0;font-size:13px">Farm Equipment Rental Marketplace</p></div>
          <div style="text-align:right"><h2 style="margin:0;font-size:20px;color:#1e293b">INVOICE</h2><p style="color:#64748b;margin:4px 0 0;font-size:13px">Date: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
          ${state.paymentId ? `<p style="color:#64748b;margin:2px 0 0;font-size:12px">Payment ID: ${state.paymentId}</p>` : ""}</div>
        </div>
        <div style="background:#f8fafc;border-radius:8px;padding:16px;margin-bottom:24px">
          <p style="margin:0;font-size:13px"><strong>Renter:</strong> ${state.renterName}</p>
          <p style="margin:4px 0 0;font-size:13px"><strong>Phone:</strong> ${state.renterPhone}</p>
        </div>
        <table>
          <thead><tr>
            <th style="text-align:center">#</th><th>Equipment</th><th style="text-align:center">Start Date</th><th style="text-align:center">End Date</th><th style="text-align:center">Days</th><th style="text-align:right">Rate/Day</th><th style="text-align:right">Subtotal</th>
          </tr></thead>
          <tbody>${rows}</tbody>
          <tfoot><tr>
            <td colspan="6" style="border:1px solid #e2e8f0;padding:10px 12px;text-align:right;font-weight:700;font-size:14px">Grand Total</td>
            <td style="border:1px solid #e2e8f0;padding:10px 12px;text-align:right;font-weight:700;font-size:14px;color:#059669">Rs ${grandTotal.toLocaleString("en-IN")}</td>
          </tr></tfoot>
        </table>
        <p style="text-align:center;color:#94a3b8;font-size:12px;margin-top:32px">Thank you for choosing AgriRent!</p>
      </body></html>`;

    const invoiceWindow = window.open("", "_blank");
    invoiceWindow.document.write(invoiceHTML);
    invoiceWindow.document.close();
    invoiceWindow.focus();
    invoiceWindow.print();
  };

  const handleDeleteEquipment = async (equipmentId) => {
    const confirmed = window.confirm("Are you sure you want to delete this equipment?");
    if (!confirmed) return;

    try {
      await deleteEquipment(equipmentId, state.loggedInUser);
      if (state.activePage === "equipment-detail") {
        goBack();
      }
      await fetchEquipment();
      window.alert("Equipment deleted successfully.");
    } catch (error) {
      window.alert(`Delete failed: ${error.message}`);
    }
  };

  const handleEquipmentSubmit = async (event) => {
    event.preventDefault();
    if (!state.loggedInUser) {
      showToast("Please login to list equipment", "error");
      navigateTo("login");
      return;
    }
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
      const nextHist1 = [...state.history, state.activePage];
      setState({ history: nextHist1, activePage: "marketplace" });
      window.history.pushState({ page: "marketplace", history: [...nextHist1] }, "", "#marketplace");
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
      window.history.pushState({ page: "home", history: [] }, "", "#home");
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agrirent_user_id");
    localStorage.removeItem("agrirent_cart");
    setState({ loggedInUser: "", activePage: "home", cart: [] });
    window.history.pushState({ page: "home", history: [] }, "", "#home");
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
      window.history.pushState({ page: "login", history: [] }, "", "#login");
    } catch (error) {
      window.alert(error.message);
    }
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = {};
    const search = (formData.get("search") || "").trim();
    const location = (formData.get("location") || "").trim();
    const category = (formData.get("category") || "").trim();

    if (search) query.search = search;
    if (location) query.location = location;
    if (category) query.category = category;

    // Read lat/lng from location input data attributes (set by location autocomplete)
    const locationInput = event.target.querySelector('input[name="location"]');
    if (locationInput && locationInput.dataset.lat && locationInput.dataset.lng) {
      query.lat = locationInput.dataset.lat;
      query.lng = locationInput.dataset.lng;
    }


    const nextHist2 = [...state.history, state.activePage];
    setState({ history: nextHist2, activePage: "marketplace", loading: true, error: "", searchQuery: query });
    window.history.pushState({ page: "marketplace", history: [...nextHist2] }, "", "#marketplace");

    try {
      const result = await getEquipmentList(query);
      setState({ equipment: result.data || [], loading: false });
    } catch (error) {
      setState({ error: error.message, loading: false });
    }
  };

  const clearSearch = async () => {
    setState({ searchQuery: { search: "", location: "", category: "" }, loading: true, error: "" });
    try {
      const q = {};
      if (state.userLat && state.userLng) {
        q.lat = state.userLat;
        q.lng = state.userLng;
      }
      const result = await getEquipmentList(q);
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
    if (recordHistory) {
      window.history.pushState({ page, history: [...nextHistory] }, "", `#${page}`);
    }

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

  // Handle browser back/forward buttons
  window.addEventListener("popstate", (event) => {
    if (event.state && event.state.page) {
      setState({ activePage: event.state.page, history: event.state.history || [] });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setState({ activePage: "home", history: [] });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  // Set initial browser history state
  window.history.replaceState({ page: "home", history: [] }, "", "#home");

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
    "nav-cart-link": "cart",
    "nav-cart-mobile": "cart",
    "cart-browse-equipment": "marketplace",
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
    "view-all-equipment-bottom": "marketplace",
    "confirmation-browse-more": "marketplace"
  };

  // Use event delegation on the root element for reliable navigation
  rootElement.addEventListener("click", (event) => {
    // Handle equipment card clicks (but not book/delete buttons)
    const card = event.target.closest(".view-equipment");
    if (card && !event.target.closest(".book-equipment") && !event.target.closest(".delete-equipment")) {
      const equipmentId = card.dataset.viewEquipment;
      setState({ selectedEquipmentId: equipmentId, history: [...state.history, state.activePage], activePage: "equipment-detail" });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const target = event.target.closest("[id]");
    if (!target) return;
    if (target.id === "nav-logout") {
      handleLogout();
      return;
    }
    if (navMap[target.id]) {
      const page = navMap[target.id];
      if ((page === "list-equipment" || page === "cart") && !state.loggedInUser) {
        showToast("Please login first", "error");
        navigateTo("login");
        return;
      }
      navigateTo(page);
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

    // Initialize custom category dropdowns on all pages
    initCategoryDropdowns();

    // Page-specific listeners
    if (state.activePage === "home") {
      // Category buttons
      document.querySelectorAll(".category-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const category = btn.dataset.category;
          const nextHist3 = [...state.history, state.activePage];
          setState({ history: nextHist3, activePage: "marketplace", loading: true, error: "" });
          window.history.pushState({ page: "marketplace", history: [...nextHist3] }, "", "#marketplace");

          const q = category ? { category } : {};
          if (state.userLat && state.userLng) {
            q.lat = state.userLat;
            q.lng = state.userLng;
          }
          getEquipmentList(q)
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

      // Location autocomplete on home
      const homeLocationInput = document.getElementById("location-search-input-home");
      if (homeLocationInput) initLocationSearch(homeLocationInput);

      // Book buttons
      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.bookEquipment));
      });

      // Delete buttons
      document.querySelectorAll(".delete-equipment").forEach((button) => {
        button.addEventListener("click", () => handleDeleteEquipment(button.dataset.deleteEquipment));
      });
    }

    if (state.activePage === "marketplace") {
      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.bookEquipment));
      });

      document.querySelectorAll(".delete-equipment").forEach((button) => {
        button.addEventListener("click", () => handleDeleteEquipment(button.dataset.deleteEquipment));
      });

      const searchForm = document.getElementById("marketplace-search-form");
      if (searchForm) searchForm.addEventListener("submit", handleSearchSubmit);

      const clearBtn = document.getElementById("clear-search-btn");
      if (clearBtn) clearBtn.addEventListener("click", clearSearch);

      // Smart search autocomplete on marketplace
      const marketplaceSearchInput = document.getElementById("smart-search-input");
      if (marketplaceSearchInput) initSmartSearch(marketplaceSearchInput, state.equipment);

      // Location autocomplete on marketplace
      const marketplaceLocationInput = document.getElementById("location-search-input");
      if (marketplaceLocationInput) initLocationSearch(marketplaceLocationInput);
    }

    if (state.activePage === "list-equipment") {
      const form = document.getElementById("add-equipment-form");
      if (form) form.addEventListener("submit", handleEquipmentSubmit);

      // Location autocomplete on list equipment form
      const listLocationInput = document.getElementById("location-search-input-list");
      if (listLocationInput) initLocationSearch(listLocationInput);

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
      if (partnerBtn) partnerBtn.addEventListener("click", () => {
        if (!state.loggedInUser) {
          showToast("Please login first", "error");
          navigateTo("login");
        } else {
          navigateTo("list-equipment");
        }
      });
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

    if (state.activePage === "equipment-detail") {
      const backBtn = document.getElementById("detail-back-btn");
      if (backBtn) backBtn.addEventListener("click", goBack);

      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.bookEquipment));
      });

      document.querySelectorAll(".delete-equipment").forEach((button) => {
        button.addEventListener("click", () => handleDeleteEquipment(button.dataset.deleteEquipment));
      });

      document.querySelectorAll(".rate-star").forEach((button) => {
        button.addEventListener("click", async () => {
          const rating = Number(button.dataset.rating);
          try {
            await rateEquipment(state.selectedEquipmentId, state.loggedInUser, rating);
            await fetchEquipment();
          } catch (error) {
            window.alert(error.message);
          }
        });
      });
    }

    if (state.activePage === "profile") {
      // Fetch user's bookings
      if (state.loggedInUser) {
        getMyBookings(state.loggedInUser)
          .then((result) => {
            if (result.data && JSON.stringify(result.data) !== JSON.stringify(state.bookings)) {
              state.bookings = result.data;
              render();
            }
          })
          .catch(() => {});
      }

      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => addToCart(button.dataset.bookEquipment));
      });

      document.querySelectorAll(".delete-equipment").forEach((button) => {
        button.addEventListener("click", () => handleDeleteEquipment(button.dataset.deleteEquipment));
      });
    }

    if (state.activePage === "cart") {
      document.querySelectorAll(".cart-remove-item").forEach((button) => {
        button.addEventListener("click", () => removeFromCart(button.dataset.equipmentId));
      });

      document.querySelectorAll(".cart-start-date").forEach((input) => {
        input.addEventListener("change", (e) => {
          updateCartItem(input.dataset.equipmentId, "startDate", e.target.value);
        });
      });

      document.querySelectorAll(".cart-days").forEach((input) => {
        input.addEventListener("change", (e) => {
          const val = Math.max(1, Math.min(365, parseInt(e.target.value) || 1));
          updateCartItem(input.dataset.equipmentId, "numberOfDays", val);
        });
      });

      const clearBtn = document.getElementById("cart-clear-all");
      if (clearBtn) clearBtn.addEventListener("click", clearCart);

      const checkoutBtn = document.getElementById("cart-checkout-btn");
      if (checkoutBtn) checkoutBtn.addEventListener("click", handleCheckout);
    }

    if (state.activePage === "payment") {
      const payBtn = document.getElementById("payment-pay-btn");
      if (payBtn) payBtn.addEventListener("click", handlePayNow);

      const cancelBtn = document.getElementById("payment-cancel-btn");
      if (cancelBtn) cancelBtn.addEventListener("click", goBack);

      initPaymentMethods();
    }

    if (state.activePage === "booking-confirmation") {
      const downloadBtn = document.getElementById("confirmation-download-invoice");
      if (downloadBtn) downloadBtn.addEventListener("click", handleDownloadInvoice);
    }
  };

  const getPageMarkup = () => {
    switch (state.activePage) {
      case "marketplace":
        return marketplacePage({ loading: state.loading, error: state.error, equipment: state.equipment, loggedInUser: state.loggedInUser, searchQuery: state.searchQuery });
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
      case "equipment-detail": {
        const selected = state.equipment.find((item) => String(item._id) === String(state.selectedEquipmentId));
        return equipmentDetailPage({ equipment: selected, loggedInUser: state.loggedInUser });
      }
      case "profile":
        return profilePage({ loggedInUser: state.loggedInUser, equipment: state.equipment, bookings: state.bookings });
      case "cart":
        return cartPage({ cart: state.cart, equipment: state.equipment, loggedInUser: state.loggedInUser });
      case "payment":
        return paymentPage({ cart: state.cart, equipment: state.equipment, renterName: state.renterName, renterPhone: state.renterPhone });
      case "booking-confirmation":
        return bookingConfirmationPage({ confirmedBookings: state.confirmedBookings, paymentId: state.paymentId, equipment: state.equipment, renterName: state.renterName, renterPhone: state.renterPhone });
      case "home":
      default:
        return homePage({ loading: state.loading, error: state.error, equipment: state.equipment, loggedInUser: state.loggedInUser });
    }
  };

  const render = () => {
    const pageMarkup = getPageMarkup();
    const showNavFooter = !["login", "register"].includes(state.activePage);

    rootElement.innerHTML = `
      ${showNavFooter ? navbar(state.activePage, state.loggedInUser, state.cart.length) : ""}
      <div class="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-6">
        <main>${pageMarkup}</main>
      </div>
      ${showNavFooter ? footer() : ""}
    `;

    attachListeners();
  };

  render();

  // Auto-detect user location and fetch equipment sorted by proximity
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        state.userLat = lat;
        state.userLng = lng;

        // Reverse geocode to get city name
        try {
          const res = await fetch(`/api/equipment/reverse-geocode?lat=${lat}&lng=${lng}`);
          const payload = await res.json();
          if (payload.success && payload.data.display_name) {
            state.userCity = payload.data.display_name;
          }
        } catch (e) {
          // Ignore reverse geocode failure
        }

        // Re-fetch equipment with user's coordinates for proximity sorting
        fetchEquipment();
      },
      () => {
        // User denied geolocation or not available — load without sorting
        fetchEquipment();
      },
      { timeout: 5000 }
    );
  } else {
    fetchEquipment();
  }
};

export { initApp };
