import { homePage } from "./pages/HomePage.js";
import { dashboardPage } from "./pages/DashboardPage.js";
import { getEquipmentList, createEquipment, createBooking } from "./services/api.js";

const initApp = (rootElement) => {
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  const state = {
    activePage: "home",
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
      setState({ activePage: "home" });
      await fetchEquipment();
      window.alert("Equipment listed successfully.");
    } catch (error) {
      window.alert(`Could not save listing: ${error.message}`);
    }
  };

  const attachListeners = () => {
    const navHome = document.getElementById("nav-home");
    const navDashboard = document.getElementById("nav-dashboard");

    if (navHome) {
      navHome.addEventListener("click", () => setState({ activePage: "home" }));
    }

    if (navDashboard) {
      navDashboard.addEventListener("click", () => setState({ activePage: "dashboard" }));
    }

    if (state.activePage === "dashboard") {
      const form = document.getElementById("add-equipment-form");
      if (form) {
        form.addEventListener("submit", handleEquipmentSubmit);
      }
    }

    if (state.activePage === "home") {
      document.querySelectorAll(".book-equipment").forEach((button) => {
        button.addEventListener("click", () => submitBooking(button.dataset.bookEquipment));
      });
    }
  };

  const render = () => {
    const pageMarkup =
      state.activePage === "dashboard"
        ? dashboardPage()
        : homePage({
            loading: state.loading,
            error: state.error,
            equipment: state.equipment
          });

    rootElement.innerHTML = `
      <div class="mx-auto min-h-screen max-w-7xl px-4 py-6 md:px-6">
        <header class="mb-6 rounded-2xl bg-slate-900 p-6 text-white shadow-md">
          <p class="text-xs uppercase tracking-widest text-emerald-300">Hackathon Foundation</p>
          <h1 class="mt-2 text-2xl font-semibold md:text-3xl">Agri Tools Rental Marketplace</h1>
          <p class="mt-2 text-sm text-slate-300">
            List equipment, discover nearby machinery, and manage bookings in one dashboard.
          </p>

          <nav class="mt-5 flex flex-wrap gap-3">
            <button
              id="nav-home"
              class="rounded-lg px-4 py-2 text-sm font-medium ${
                state.activePage === "home" ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-200"
              }"
            >
              Marketplace
            </button>
            <button
              id="nav-dashboard"
              class="rounded-lg px-4 py-2 text-sm font-medium ${
                state.activePage === "dashboard" ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-200"
              }"
            >
              Owner Dashboard
            </button>
          </nav>
        </header>

        <main>${pageMarkup}</main>
      </div>
    `;

    attachListeners();
  };

  render();
  fetchEquipment();
};

export { initApp };

