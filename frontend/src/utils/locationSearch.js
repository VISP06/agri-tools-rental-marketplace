const API_BASE_URL = window.location.hostname === "localhost" ? "http://localhost:5000/api" : "/api";

let debounceTimer = null;

/**
 * Fetch location suggestions from the backend geocode proxy.
 */
const fetchLocationSuggestions = async (query) => {
  const response = await fetch(`${API_BASE_URL}/equipment/geocode?q=${encodeURIComponent(query)}`);
  const payload = await response.json();
  return payload.data || [];
};

/**
 * Shorten a Nominatim display_name to a concise city/district/state format.
 */
const shortenDisplayName = (displayName) => {
  const parts = displayName.split(",").map((p) => p.trim());
  // Typically: "City, District, State, Postal, Country" — take first 2-3 relevant parts
  if (parts.length >= 3) {
    return parts.slice(0, 3).join(", ");
  }
  return parts.join(", ");
};

/**
 * Initialize location search autocomplete on a given input element.
 * Stores selected lat/lng as data attributes on the input.
 *
 * @param {HTMLInputElement} inputEl - the location input
 */
const initLocationSearch = (inputEl) => {
  if (!inputEl) return;

  // Create dropdown container
  const dropdown = document.createElement("div");
  dropdown.className = "location-search-dropdown";
  dropdown.setAttribute("role", "listbox");
  inputEl.parentElement.appendChild(dropdown);
  inputEl.setAttribute("autocomplete", "off");

  let activeIndex = -1;
  let currentResults = [];

  const close = () => {
    dropdown.innerHTML = "";
    dropdown.classList.remove("open");
    activeIndex = -1;
    currentResults = [];
  };

  const selectItem = (item) => {
    inputEl.value = shortenDisplayName(item.display_name);
    inputEl.dataset.lat = item.lat;
    inputEl.dataset.lng = item.lon;
    close();
    inputEl.focus();
  };

  const renderDropdown = async () => {
    const query = inputEl.value.trim();
    if (query.length < 2) {
      close();
      return;
    }

    try {
      currentResults = await fetchLocationSuggestions(query);
    } catch {
      currentResults = [];
    }

    if (currentResults.length === 0) {
      close();
      return;
    }

    activeIndex = -1;
    dropdown.classList.add("open");
    dropdown.innerHTML = currentResults
      .map(
        (item, i) =>
          `<div class="location-search-item" role="option" data-index="${i}">
            <svg class="location-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${shortenDisplayName(item.display_name)}</span>
          </div>`
      )
      .join("");
  };

  const updateActive = () => {
    const items = dropdown.querySelectorAll(".location-search-item");
    items.forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
    });
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }
  };

  // Clear stored coordinates when user types (they need to re-select)
  inputEl.addEventListener("input", () => {
    delete inputEl.dataset.lat;
    delete inputEl.dataset.lng;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderDropdown, 400);
  });

  // Keyboard navigation
  inputEl.addEventListener("keydown", (e) => {
    if (!currentResults.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      activeIndex = (activeIndex + 1) % currentResults.length;
      updateActive();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      activeIndex = activeIndex <= 0 ? currentResults.length - 1 : activeIndex - 1;
      updateActive();
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      selectItem(currentResults[activeIndex]);
    } else if (e.key === "Escape") {
      close();
    }
  });

  // Click on suggestion
  dropdown.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const item = e.target.closest(".location-search-item");
    if (item) {
      const idx = Number(item.dataset.index);
      selectItem(currentResults[idx]);
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !dropdown.contains(e.target)) {
      close();
    }
  });
};

export { initLocationSearch };
