const categoryIcons = {
  "": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>`,
  "Tractor": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>`,
  "Harvester": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
  "Irrigation": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>`,
  "Drone": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>`,
  "Plough": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.8-3.35a1 1 0 00-1.49.88v6.6a1 1 0 001.49.88l5.8-3.35a1 1 0 000-1.73zM19.42 15.17l-5.8-3.35a1 1 0 00-1.49.88v6.6a1 1 0 001.49.88l5.8-3.35a1 1 0 000-1.73z"/></svg>`,
  "Sprayer": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>`,
  "Seeder": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>`,
  "Other": `<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>`
};

const categoryColors = {
  "": "bg-slate-100 text-slate-600",
  "Tractor": "bg-emerald-100 text-emerald-600",
  "Harvester": "bg-amber-100 text-amber-600",
  "Irrigation": "bg-blue-100 text-blue-600",
  "Drone": "bg-violet-100 text-violet-600",
  "Plough": "bg-orange-100 text-orange-600",
  "Sprayer": "bg-teal-100 text-teal-600",
  "Seeder": "bg-lime-100 text-lime-600",
  "Other": "bg-slate-100 text-slate-600"
};

const chevronSvg = `<svg class="h-4 w-4 text-slate-400 transition-transform duration-200 category-chevron" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>`;

const categoryDropdown = (inputName, options, placeholder = "All Categories", selectedValue = "") => {
  const selected = selectedValue ? options.find((o) => o.value === selectedValue) : null;
  const selectedIcon = selected ? (categoryIcons[selected.value] || categoryIcons["Other"]) : categoryIcons[""];
  const selectedColor = selected ? (categoryColors[selected.value] || categoryColors[""]) : "bg-slate-100 text-slate-400";
  const selectedLabel = selected ? selected.label : placeholder;

  const optionItems = options.map((opt) => {
    const icon = categoryIcons[opt.value] || categoryIcons["Other"];
    const color = categoryColors[opt.value] || categoryColors["Other"];
    return `<li class="category-option flex items-center gap-3 px-3 py-2.5 cursor-pointer hover:bg-emerald-50 transition-colors rounded-lg mx-1${opt.value === selectedValue ? " bg-emerald-50" : ""}" data-value="${opt.value}">
      <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${color}">${icon}</span>
      <span class="text-sm font-medium text-slate-700">${opt.label}</span>
    </li>`;
  }).join("");

  return `<div class="category-dropdown relative" data-name="${inputName}">
    <input type="hidden" name="${inputName}" value="${selectedValue}" />
    <button type="button" class="category-trigger flex w-full items-center justify-between gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm ${selected ? "text-slate-700" : "text-slate-500"} outline-none hover:border-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all">
      <span class="flex items-center gap-2 category-label">
        <span class="flex h-6 w-6 items-center justify-center rounded-full ${selectedColor}">${selectedIcon}</span>
        ${selected ? `<span class="text-slate-700">${selectedLabel}</span>` : selectedLabel}
      </span>
      ${chevronSvg}
    </button>
    <ul class="category-menu absolute left-0 right-0 z-50 mt-1.5 max-h-64 overflow-y-auto rounded-xl border border-slate-200 bg-white py-1.5 shadow-xl hidden" style="scrollbar-width: thin;">
      ${optionItems}
    </ul>
  </div>`;
};

const initCategoryDropdowns = () => {
  document.querySelectorAll(".category-dropdown").forEach((dropdown) => {
    const trigger = dropdown.querySelector(".category-trigger");
    const menu = dropdown.querySelector(".category-menu");
    const hiddenInput = dropdown.querySelector("input[type=hidden]");
    const labelSpan = dropdown.querySelector(".category-label");
    const chevron = dropdown.querySelector(".category-chevron");

    if (!trigger || !menu) return;

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      // Close all other dropdowns first
      document.querySelectorAll(".category-menu").forEach((m) => {
        if (m !== menu) m.classList.add("hidden");
      });
      document.querySelectorAll(".category-chevron").forEach((c) => {
        if (c !== chevron) c.style.transform = "";
      });
      menu.classList.toggle("hidden");
      chevron.style.transform = menu.classList.contains("hidden") ? "" : "rotate(180deg)";
    });

    menu.querySelectorAll(".category-option").forEach((option) => {
      option.addEventListener("click", (e) => {
        e.stopPropagation();
        const value = option.dataset.value;
        const text = option.querySelector("span:last-child").textContent;
        const icon = categoryIcons[value] || categoryIcons["Other"];
        const color = categoryColors[value] || categoryColors[""];

        hiddenInput.value = value;
        labelSpan.innerHTML = `<span class="flex h-6 w-6 items-center justify-center rounded-full ${color}">${icon}</span><span class="text-slate-700">${text}</span>`;
        menu.classList.add("hidden");
        chevron.style.transform = "";

        // Highlight selected option
        menu.querySelectorAll(".category-option").forEach((o) => o.classList.remove("bg-emerald-50"));
        option.classList.add("bg-emerald-50");
      });
    });
  });

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    document.querySelectorAll(".category-menu").forEach((m) => m.classList.add("hidden"));
    document.querySelectorAll(".category-chevron").forEach((c) => { c.style.transform = ""; });
  });
};

export { categoryDropdown, initCategoryDropdowns };
