import { equipmentCard } from "../components/EquipmentCard.js";

const marketplacePage = ({ loading, error, equipment }) => {
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
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input
            type="text"
            name="search"
            placeholder="Search equipment..."
            class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
        <div class="relative">
          <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          <input
            type="text"
            name="location"
            placeholder="Location..."
            class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </div>
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
        ${equipment.map((item) => equipmentCard(item)).join("")}
      </div>
      
      <!-- Additional Equipment Cards - Displayed Vertically -->
      <div class="mt-12">
        <h2 class="text-xl font-bold text-slate-900 md:text-2xl">More Available Equipment</h2>
        <p class="mt-1 text-sm text-slate-500">Browse additional farm equipment available for rent</p>
        <div class="mt-6 grid gap-6">
          
          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Swaraj Pro Combine 7060</h3>
                <p class="text-sm text-slate-500">Harvester • Maharashtra</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">High-capacity combine harvester suitable for wheat, paddy, and soybean harvesting.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹750</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹5,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Rajendra Singh</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">AgriStar Rotavator</h3>
                <p class="text-sm text-slate-500">Plough • Punjab</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Heavy-duty rotavator for soil preparation and seedbed preparation.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹200</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹1,200</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Gurpreet Singh</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Disc Plough</h3>
                <p class="text-sm text-slate-500">Plough • Haryana</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Essential plough for breaking soil crust and turning over sod.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹150</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹800</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Ramesh Kumar</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Power Reaper</h3>
                <p class="text-sm text-slate-500">Harvester • Uttar Pradesh</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Efficient reaper for cutting and collecting wheat and other crops.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹180</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹1,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Suresh Patel</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Automatic Potato Harvester</h3>
                <p class="text-sm text-slate-500">Harvester • Gujarat</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Automated potato digging and collection machine.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹400</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹2,500</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Bhavesh Shah</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Mahindra 575 DI Tractor</h3>
                <p class="text-sm text-slate-500">Tractor • Karnataka</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">45 HP powerful tractor suitable for various farm operations.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹200</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹1,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Rajanna</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Tractor Boom Sprayer</h3>
                <p class="text-sm text-slate-500">Sprayer • Tamil Nadu</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Tractor-mounted boom sprayer for pesticide and herbicide application.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹100</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹600</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Muthu Kumar</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Round Hay Baler</h3>
                <p class="text-sm text-slate-500">Other • Madhya Pradesh</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Bales hay and straw for easy storage and transport.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹250</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹1,200</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Dinesh Sharma</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Laser Land Leveler</h3>
                <p class="text-sm text-slate-500">Other • Rajasthan</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Precision land leveling for efficient water distribution.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹300</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹1,500</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Hanuman Singh</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Multi-Crop Thresher</h3>
                <p class="text-sm text-slate-500">Harvester • Bihar</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Versatile thresher for multiple crops like wheat, paddy, and maize.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹300</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹1,800</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Rajeev Kumar</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Zero Till Seed Drill</h3>
                <p class="text-sm text-slate-500">Seeder • West Bengal</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">No-till seed drill for conservation agriculture.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹120</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹700</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Subrata Mondal</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Honda Power Tiller</h3>
                <p class="text-sm text-slate-500">Tiller • Kerala</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Compact power tiller for small to medium farms.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹150</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹800</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Joseph Thomas</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Spring Loaded Cultivator</h3>
                <p class="text-sm text-slate-500">Cultivator • Odisha</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Spring-loaded cultivator for inter-row cultivation.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-100">₹80</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹500</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Bikram Sahoo</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Diesel Water Pump Set</h3>
                <p class="text-sm text-slate-500">Irrigation • Andhra Pradesh</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">High-capacity diesel water pump for irrigation.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹80</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹400</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Venkatesh</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Heavy Duty Tractor Trolley</h3>
                <p class="text-sm text-slate-500">Tractor • Telangana</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Heavy-duty trolley for transport of farm produce.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹100</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹600</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Ravi Kumar</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Paddy Transplanter</h3>
                <p class="text-sm text-slate-500">Seeder • Kerala</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Mechanical paddy transplanter for efficient rice planting.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹350</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹2,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Pradeep Nair</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Advanced Combine Harvester</h3>
                <p class="text-sm text-slate-500">Harvester • Punjab</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">High-performance combine harvester for multiple crops.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹1,200</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹8,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Amarjeet Singh</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Automatic Cotton Picker</h3>
                <p class="text-sm text-slate-500">Harvester • Gujarat</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Automated cotton picking machine for efficient harvest.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹900</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹6,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Mahesh Patel</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Forage Harvester</h3>
                <p class="text-sm text-slate-500">Harvester • Maharashtra</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Forage harvester for chopping green fodder for livestock.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹800</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹5,500</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Vijay Wagh</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

          <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-slate-900">Sugarcane Harvester</h3>
                <p class="text-sm text-slate-500">Harvester • Tamil Nadu</p>
              </div>
              <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
            </div>
            <p class="mt-3 min-h-16 text-sm text-slate-600">Complete sugarcane harvesting solution.</p>
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Hourly</p>
                <p class="font-semibold text-slate-900">₹1,000</p>
              </div>
              <div class="rounded-lg bg-slate-100 px-3 py-2">
                <p class="text-xs text-slate-500">Daily</p>
                <p class="font-semibold text-slate-900">₹7,000</p>
              </div>
            </div>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">Karuppusamy</span></p>
              <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">Rent Now</button>
            </div>
          </article>

        </div>
      </div>
    `;
};

export { marketplacePage };
