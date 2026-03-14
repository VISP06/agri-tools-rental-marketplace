// Known equipment types that always appear in suggestions (even with empty DB)
const KNOWN_TYPES = [
  "Tractor",
  "Harvester",
  "Irrigation System",
  "Drone",
  "Plough",
  "Tiller",
  "Sprayer",
  "Seeder",
  "Cultivator",
  "Rotavator",
  "Thresher",
  "Trailer",
  "Power Weeder",
  "Combine Harvester"
];

/**
 * Compute a fuzzy match score between a query and a candidate string.
 * Returns 0 if no match; higher scores = better match.
 */
const fuzzyScore = (query, candidate) => {
  const q = query.toLowerCase();
  const c = candidate.toLowerCase();

  // Exact full match
  if (q === c) return 100;

  // Starts-with bonus
  if (c.startsWith(q)) return 80 + (q.length / c.length) * 15;

  // Substring match
  if (c.includes(q)) return 60 + (q.length / c.length) * 15;

  // Fuzzy character-sequence match: walk through query chars in order,
  // allowing gaps in the candidate. Award bonuses for consecutive matches
  // and matches at word boundaries.
  let score = 0;
  let ci = 0;
  let consecutive = 0;
  let matchedChars = 0;

  for (let qi = 0; qi < q.length; qi++) {
    let found = false;
    while (ci < c.length) {
      if (c[ci] === q[qi]) {
        matchedChars++;
        consecutive++;

        // Bonus for consecutive matches
        score += 3 + consecutive * 2;

        // Bonus for matching at a word boundary (start or after space/hyphen)
        if (ci === 0 || c[ci - 1] === " " || c[ci - 1] === "-") {
          score += 5;
        }

        ci++;
        found = true;
        break;
      }
      consecutive = 0;
      ci++;
    }
    if (!found) {
      // Penalize but allow one missed character (typo tolerance)
      score -= 3;
      consecutive = 0;
    }
  }

  // Require at least 60% of query characters to match
  if (matchedChars / q.length < 0.6) return 0;

  // Normalize: bonus for shorter candidates (more specific matches)
  score += (q.length / c.length) * 10;

  return Math.max(0, score);
};

/**
 * Build a unique list of suggestion strings from equipment data + known types.
 */
const buildSuggestionPool = (equipment) => {
  const set = new Set(KNOWN_TYPES);
  for (const item of equipment) {
    if (item.name) set.add(item.name);
    if (item.category) set.add(item.category);
  }
  return Array.from(set);
};

/**
 * Build a unique list of location suggestions from equipment data.
 * Extracts full locations AND individual parts (district, state).
 */
const buildLocationPool = (equipment) => {
  const set = new Set();
  for (const item of equipment) {
    if (!item.location) continue;
    const loc = item.location.trim();
    if (loc) set.add(loc);
    // Split by comma to extract district and state individually
    const parts = loc.split(/\s*,\s*/);
    for (const part of parts) {
      const p = part.trim();
      if (p) set.add(p);
    }
  }
  return Array.from(set);
};

/**
 * Get ranked suggestions for a query.
 */
const getSuggestions = (query, pool, maxResults = 7) => {
  if (!query || query.trim().length === 0) return [];

  const trimmed = query.trim();

  return pool
    .map((candidate) => ({ text: candidate, score: fuzzyScore(trimmed, candidate) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
};

/**
 * Highlight matched characters in a suggestion relative to the query.
 */
const highlightMatch = (text, query) => {
  const q = query.toLowerCase();
  const t = text.toLowerCase();

  // Try substring highlight first
  const idx = t.indexOf(q);
  if (idx !== -1) {
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    return `${before}<span class="smart-search-highlight">${match}</span>${after}`;
  }

  // Fuzzy highlight: mark each matched character
  let result = "";
  let qi = 0;
  for (let ci = 0; ci < text.length; ci++) {
    if (qi < q.length && t[ci] === q[qi]) {
      result += `<span class="smart-search-highlight">${text[ci]}</span>`;
      qi++;
    } else {
      result += text[ci];
    }
  }
  return result;
};

/**
 * Initialize the smart search autocomplete on a given input element.
 * Call this after the DOM is rendered.
 *
 * @param {HTMLInputElement} inputEl - the search input
 * @param {Array} equipment - the equipment array from state
 */
const initSmartSearch = (inputEl, equipment) => {
  if (!inputEl) return;

  const pool = buildSuggestionPool(equipment);

  // Create dropdown container
  const dropdown = document.createElement("div");
  dropdown.className = "smart-search-dropdown";
  dropdown.setAttribute("role", "listbox");
  inputEl.parentElement.appendChild(dropdown);
  inputEl.setAttribute("autocomplete", "off");
  inputEl.setAttribute("role", "combobox");
  inputEl.setAttribute("aria-expanded", "false");
  inputEl.setAttribute("aria-autocomplete", "list");

  let activeIndex = -1;
  let currentResults = [];
  let debounceTimer = null;

  const close = () => {
    dropdown.innerHTML = "";
    dropdown.classList.remove("open");
    inputEl.setAttribute("aria-expanded", "false");
    activeIndex = -1;
    currentResults = [];
  };

  const selectItem = (text) => {
    inputEl.value = text;
    close();
    inputEl.focus();
  };

  const renderDropdown = () => {
    const query = inputEl.value;
    currentResults = getSuggestions(query, pool);

    if (currentResults.length === 0) {
      close();
      return;
    }

    activeIndex = -1;
    inputEl.setAttribute("aria-expanded", "true");
    dropdown.classList.add("open");
    dropdown.innerHTML = currentResults
      .map(
        (r, i) =>
          `<div class="smart-search-item" role="option" data-index="${i}">
            <svg class="smart-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            <span>${highlightMatch(r.text, query)}</span>
          </div>`
      )
      .join("");
  };

  const updateActive = () => {
    const items = dropdown.querySelectorAll(".smart-search-item");
    items.forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
    });
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }
  };

  // Debounced input handler
  inputEl.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderDropdown, 150);
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
      selectItem(currentResults[activeIndex].text);
    } else if (e.key === "Escape") {
      close();
    }
  });

  // Click on suggestion
  dropdown.addEventListener("mousedown", (e) => {
    e.preventDefault(); // prevent blur from firing before click
    const item = e.target.closest(".smart-search-item");
    if (item) {
      const idx = Number(item.dataset.index);
      selectItem(currentResults[idx].text);
    }
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !dropdown.contains(e.target)) {
      close();
    }
  });

  // Show suggestions when focusing a non-empty input
  inputEl.addEventListener("focus", () => {
    if (inputEl.value.trim().length > 0) {
      renderDropdown();
    }
  });
};

/**
 * Initialize location autocomplete on a given input element.
 * Suggests districts, states, and full locations from equipment data.
 *
 * @param {HTMLInputElement} inputEl - the location input
 * @param {Array} equipment - the equipment array from state
 */
const initLocationSearch = (inputEl, equipment) => {
  if (!inputEl) return;

  const pool = buildLocationPool(equipment);

  const dropdown = document.createElement("div");
  dropdown.className = "smart-search-dropdown";
  dropdown.setAttribute("role", "listbox");

  // Ensure parent is positioned for the absolute dropdown
  if (inputEl.parentElement && getComputedStyle(inputEl.parentElement).position === "static") {
    inputEl.parentElement.style.position = "relative";
  }
  inputEl.parentElement.appendChild(dropdown);
  inputEl.setAttribute("autocomplete", "off");
  inputEl.setAttribute("role", "combobox");
  inputEl.setAttribute("aria-expanded", "false");

  let activeIndex = -1;
  let currentResults = [];
  let debounceTimer = null;

  const close = () => {
    dropdown.innerHTML = "";
    dropdown.classList.remove("open");
    inputEl.setAttribute("aria-expanded", "false");
    activeIndex = -1;
    currentResults = [];
  };

  const selectItem = (text) => {
    inputEl.value = text;
    close();
    inputEl.focus();
  };

  const renderDropdown = () => {
    const query = inputEl.value;
    currentResults = getSuggestions(query, pool);

    if (currentResults.length === 0) {
      close();
      return;
    }

    activeIndex = -1;
    inputEl.setAttribute("aria-expanded", "true");
    dropdown.classList.add("open");
    dropdown.innerHTML = currentResults
      .map(
        (r, i) =>
          `<div class="smart-search-item" role="option" data-index="${i}">
            <svg class="smart-search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            <span>${highlightMatch(r.text, query)}</span>
          </div>`
      )
      .join("");
  };

  const updateActive = () => {
    const items = dropdown.querySelectorAll(".smart-search-item");
    items.forEach((el, i) => {
      el.classList.toggle("active", i === activeIndex);
    });
    if (activeIndex >= 0 && items[activeIndex]) {
      items[activeIndex].scrollIntoView({ block: "nearest" });
    }
  };

  inputEl.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderDropdown, 150);
  });

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
      selectItem(currentResults[activeIndex].text);
    } else if (e.key === "Escape") {
      close();
    }
  });

  dropdown.addEventListener("mousedown", (e) => {
    e.preventDefault();
    const item = e.target.closest(".smart-search-item");
    if (item) {
      const idx = Number(item.dataset.index);
      selectItem(currentResults[idx].text);
    }
  });

  document.addEventListener("click", (e) => {
    if (!inputEl.contains(e.target) && !dropdown.contains(e.target)) {
      close();
    }
  });

  inputEl.addEventListener("focus", () => {
    if (inputEl.value.trim().length > 0) {
      renderDropdown();
    }
  });
};

export { initSmartSearch, initLocationSearch };
