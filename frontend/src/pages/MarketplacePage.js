import { equipmentCard } from "../components/EquipmentCard.js";

const marketplacePage = ({ loading, error, equipment, loggedInUser }) => {
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

  const searchBar = `
    <form id="marketplace-search-form" class="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div class="grid gap-3 md:grid-cols-4">
        <div class="relative">
          <input
            type="text"
            id="smart-search-input"
            name="search"
            placeholder="Search equipment..."
            class="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <input
          type="text"
          name="location"
          placeholder="Location..."
          class="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        />
        <select
          name="category"
          class="rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
        >
          <option value="">All Categories</option>
          <option value="Tractor">Tractors</option>
          <option value="Harvester">Harvesters</option>
          <option value="Irrigation">Irrigation</option>
          <option value="Drone">Drones</option>
          <option value="Plough">Ploughs & Tillers</option>
          <option value="Sprayer">Sprayers</option>
          <option value="Seeder">Seeders</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" class="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          Search
        </button>
      </div>
    </form>
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
        <h2 class="font-semibold">No listings yet</h2>
        <p class="mt-2 text-sm">Be the first to add farm machinery. Head to the "List Equipment" page to get started.</p>
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
