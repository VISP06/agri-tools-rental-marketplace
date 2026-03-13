import { equipmentCard } from "../components/EquipmentCard.js";
import { categoryDropdown } from "../components/CategoryDropdown.js";

const searchCategories = [
  { value: "", label: "All Categories" },
  { value: "Tractor", label: "Tractors" },
  { value: "Harvester", label: "Harvesters" },
  { value: "Irrigation", label: "Irrigation" },
  { value: "Drone", label: "Drones" },
  { value: "Plough", label: "Ploughs & Tillers" },
  { value: "Sprayer", label: "Sprayers" },
  { value: "Seeder", label: "Seeders" },
  { value: "Other", label: "Other" },
];

const escapeAttr = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;");

const marketplacePage = ({ loading, error, equipment, loggedInUser, searchQuery = {} }) => {
  const sq = searchQuery || {};
  const hasFilters = sq.search || sq.location || sq.category;

  const header = `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 md:text-3xl">Browse Equipment</h1>
        <p class="mt-1 text-sm text-slate-500">Find and rent the machinery you need for your farm</p>
      </div>
      <div class="flex items-center gap-2 text-sm text-slate-500">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
        ${equipment.length} listings found
      </div>
    </div>
  `;

  const filterTags = hasFilters ? `
    <div class="mt-4 flex flex-wrap items-center gap-2">
      <span class="text-xs font-medium text-slate-500">Active filters:</span>
      ${sq.search ? `<span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>${escapeAttr(sq.search)}</span>` : ""}
      ${sq.location ? `<span class="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700"><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>${escapeAttr(sq.location)}</span>` : ""}
      ${sq.category ? `<span class="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700"><svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/></svg>${escapeAttr(sq.category)}</span>` : ""}
      <button id="clear-search-btn" class="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100 transition-colors cursor-pointer">
        <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        Clear all
      </button>
    </div>
  ` : "";

  const searchBar = `
    <form id="marketplace-search-form" class="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="grid gap-3 md:grid-cols-4">
        <div class="relative">
          <input
            type="text"
            id="smart-search-input"
            name="search"
            value="${escapeAttr(sq.search)}"
            placeholder="Search equipment..."
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <input
          type="text"
          name="location"
          value="${escapeAttr(sq.location)}"
          placeholder="Location..."
          class="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        ${categoryDropdown("category", searchCategories, "All Categories", sq.category)}
        <button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          Search
        </button>
      </div>
    </form>
    ${filterTags}
  `;

  if (loading) {
    return `
      ${header}
      ${searchBar}
      <div class="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
        <p class="mt-4 text-sm text-slate-500">Loading equipment listings...</p>
      </div>
    `;
  }

  if (error) {
    return `
      ${header}
      ${searchBar}
      <div class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
        <h2 class="font-semibold">Could not load equipment</h2>
        <p class="mt-2 text-sm">${error}</p>
      </div>
    `;
  }

  if (!equipment.length) {
    return `
      ${header}
      ${searchBar}
      <div class="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-sm">
        <h2 class="font-semibold">${hasFilters ? "No matching equipment found" : "No listings yet"}</h2>
        <p class="mt-2 text-sm">${hasFilters ? "Try adjusting your search or clearing filters to see all listings." : "Be the first to add farm machinery. Head to the \"List Equipment\" page to get started."}</p>
      </div>
    `;
  }

  return `
    ${header}
    ${searchBar}
    <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      ${equipment.map((item) => equipmentCard(item, loggedInUser)).join("")}
    </div>
  `;
};

export { marketplacePage };
