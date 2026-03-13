import { equipmentCard } from "../components/EquipmentCard.js";

// Sample equipment data for demonstration
const sampleEquipment = [
  {
    _id: "demo1",
    name: "Mahindra 575 DI",
    category: "Tractor",
    location: "Pune, Maharashtra",
    description: "45 HP tractor, well maintained, suitable for ploughing and harvesting.",
    hourlyRate: 500,
    dailyRate: 3500,
    ownerName: "Prakash Patil"
  },
  {
    _id: "demo2",
    name: "John Deere 5105",
    category: "Tractor",
    location: "Nashik, Maharashtra",
    description: "50 HP tractor with cabin, perfect for large farms.",
    hourlyRate: 600,
    dailyRate: 4000,
    ownerName: "Rajendra Singh"
  },
  {
    _id: "demo3",
    name: "New Holland 3110",
    category: "Harvester",
    location: "Ahmednagar, Maharashtra",
    description: "Combine harvester for wheat and paddy, operator included.",
    hourlyRate: 750,
    dailyRate: 5000,
    ownerName: "Vijay Mohite"
  },
  {
    _id: "demo4",
    name: "Kirloskar Sprayer",
    category: "Sprayer",
    location: "Solapur, Maharashtra",
    description: "Power sprayer for pesticide and fertilizer application.",
    hourlyRate: 200,
    dailyRate: 1200,
    ownerName: "Santosh Jadhav"
  },
  {
    _id: "demo5",
    name: "Landmaster Plough",
    category: "Plough",
    location: "Kolhapur, Maharashtra",
    description: "Disc plough for primary tillage, 3-bottom.",
    hourlyRate: 300,
    dailyRate: 2000,
    ownerName: "Dhanraj Gore"
  },
  {
    _id: "demo6",
    name: "Agri Drone Spray",
    category: "Drone",
    location: "Pune, Maharashtra",
    description: "Agricultural drone for precision spraying, 10L tank capacity.",
    hourlyRate: 800,
    dailyRate: 5500,
    ownerName: "TechFarm Solutions"
  }
];

const homePage = ({ loading, error, equipment }) => {
  // Use sample equipment if no data from API
  const displayEquipment = equipment.length > 0 ? equipment : sampleEquipment;
  const heroSection = `
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 px-6 py-16 text-white md:px-12 md:py-24">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-300 blur-3xl"></div>
      </div>
      <div class="relative z-10 max-w-2xl">
        <span class="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">
          Trusted by 2,000+ Farmers
        </span>
        <h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-5xl">
          Rent Quality Farm Equipment Across India
        </h1>
        <p class="mt-4 text-base text-emerald-100/80 md:text-lg">
          Access tractors, harvesters, irrigation systems, and more at affordable rental rates. No need to buy expensive machinery — just rent what you need, when you need it.
        </p>
        <div class="mt-8 flex flex-wrap gap-3">
          <button id="hero-browse" class="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-lg hover:bg-emerald-50 transition-colors">
            Browse Equipment
          </button>
          <button id="hero-list" class="rounded-lg border-2 border-emerald-400/50 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700/50 transition-colors">
            List Your Equipment
          </button>
        </div>
      </div>
    </section>
  `;

  const searchSection = `
    <section class="relative -mt-7 z-20 mx-4 md:mx-8">
      <div class="rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:p-6">
        <form id="search-form" class="grid gap-3 md:grid-cols-4">
          <div class="relative">
            <label class="text-xs font-medium text-slate-500">Search Equipment</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              <input
                type="text"
                name="search"
                placeholder="Tractor, Harvester, Drone..."
                class="mt-1 w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
          <div class="relative">
            <label class="text-xs font-medium text-slate-500">Location</label>
            <div class="relative">
              <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              <input
                type="text"
                name="location"
                placeholder="District, State..."
                class="mt-1 w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>
          <div>
            <label class="text-xs font-medium text-slate-500">Category</label>
            <select
              name="category"
              class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="">All Categories</option>
              <option value="Tractor">Tractors</option>
              <option value="Harvester">Harvesters</option>
              <option value="Irrigation">Irrigation Systems</option>
              <option value="Drone">Agricultural Drones</option>
              <option value="Plough">Ploughs & Tillers</option>
              <option value="Sprayer">Sprayers</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div class="flex items-end">
            <button type="submit" class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
              <span class="flex items-center justify-center gap-2">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                Search
              </span>
            </button>
          </div>
        </form>
      </div>
    </section>
  `;

  const categoriesSection = `
    <section class="mt-16">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">Browse by Category</h2>
        <p class="mt-2 text-sm text-slate-500">Find the right machinery for your farming needs</p>
      </div>
      <div class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Tractor">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 group-hover:bg-emerald-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Tractors</p>
          <p class="mt-1 text-xs text-slate-500">Power tillers & more</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Harvester">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 group-hover:bg-amber-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Harvesters</p>
          <p class="mt-1 text-xs text-slate-500">Combine & crop cutters</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Irrigation">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Irrigation</p>
          <p class="mt-1 text-xs text-slate-500">Pumps & sprinklers</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Drone">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-violet-100 text-violet-600 group-hover:bg-violet-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Agri Drones</p>
          <p class="mt-1 text-xs text-slate-500">Spray & survey drones</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Plough">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-600 group-hover:bg-orange-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17l-5.8-3.35a1 1 0 00-1.49.88v6.6a1 1 0 001.49.88l5.8-3.35a1 1 0 000-1.73zM19.42 15.17l-5.8-3.35a1 1 0 00-1.49.88v6.6a1 1 0 001.49.88l5.8-3.35a1 1 0 000-1.73z"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Ploughs & Tillers</p>
          <p class="mt-1 text-xs text-slate-500">Soil preparation tools</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Sprayer">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600 group-hover:bg-teal-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Sprayers</p>
          <p class="mt-1 text-xs text-slate-500">Crop protection gear</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="Seeder">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-lime-100 text-lime-600 group-hover:bg-lime-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">Seeders</p>
          <p class="mt-1 text-xs text-slate-500">Planters & seed drills</p>
        </button>

        <button class="category-btn group rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm hover:border-emerald-300 hover:shadow-md transition-all" data-category="">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-600 group-hover:bg-slate-200 transition-colors">
            <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/></svg>
          </div>
          <p class="mt-3 text-sm font-semibold text-slate-800">All Equipment</p>
          <p class="mt-1 text-xs text-slate-500">View full catalog</p>
        </button>
      </div>
    </section>
  `;

  const partnerCTA = `
    <section class="mt-16 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/50 p-8 md:p-12">
      <div class="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <span class="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">For Equipment Owners</span>
          <h2 class="mt-4 text-2xl font-bold text-slate-900 md:text-3xl">Have idle farm machinery? Make it profitable!</h2>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">
            AgriRent takes care of everything for you — from connecting you with nearby farmers to managing bookings and payments. Turn your idle equipment into a steady income stream.
          </p>
          <div class="mt-6 flex flex-wrap gap-4 text-sm">
            <div class="flex items-center gap-2 text-slate-700">
              <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Zero listing fees
            </div>
            <div class="flex items-center gap-2 text-slate-700">
              <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Flexible scheduling
            </div>
            <div class="flex items-center gap-2 text-slate-700">
              <svg class="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
              Secure payments
            </div>
          </div>
          <button id="cta-list-equipment" class="mt-6 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            List Your Equipment Now
          </button>
        </div>
        <div class="flex justify-center">
          <div class="rounded-2xl bg-white p-6 shadow-lg border border-slate-100">
            <div class="grid grid-cols-2 gap-4 text-center">
              <div class="rounded-xl bg-emerald-50 p-4">
                <p class="text-2xl font-bold text-emerald-700">500+</p>
                <p class="mt-1 text-xs text-slate-600">Equipment Listed</p>
              </div>
              <div class="rounded-xl bg-amber-50 p-4">
                <p class="text-2xl font-bold text-amber-700">50+</p>
                <p class="mt-1 text-xs text-slate-600">Districts Covered</p>
              </div>
              <div class="rounded-xl bg-blue-50 p-4">
                <p class="text-2xl font-bold text-blue-700">2,000+</p>
                <p class="mt-1 text-xs text-slate-600">Happy Farmers</p>
              </div>
              <div class="rounded-xl bg-violet-50 p-4">
                <p class="text-2xl font-bold text-violet-700">98%</p>
                <p class="mt-1 text-xs text-slate-600">Satisfaction Rate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  let listingsSection = "";
  if (loading) {
    listingsSection = `
      <section class="mt-16">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">Featured Equipment</h2>
        <p class="mt-2 text-sm text-slate-500">Top-rated machinery available near you</p>
        <div class="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div class="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600"></div>
          <p class="mt-4 text-sm text-slate-500">Loading equipment listings...</p>
        </div>
      </section>
    `;
  } else if (error) {
    listingsSection = `
      <section class="mt-16">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">Featured Equipment</h2>
        <div class="mt-8 rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
          <h3 class="font-semibold">Could not load equipment</h3>
          <p class="mt-2 text-sm">${error}</p>
        </div>
      </section>
    `;
  } else if (!displayEquipment.length) {
    listingsSection = `
      <section class="mt-16">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">Featured Equipment</h2>
        <div class="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-sm">
          <h3 class="font-semibold">No listings yet</h3>
          <p class="mt-2 text-sm">Be the first to add farm machinery from the dashboard tab.</p>
        </div>
      </section>
    `;
  } else {
    listingsSection = `
      <section class="mt-16">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">Featured Equipment</h2>
            <p class="mt-2 text-sm text-slate-500">Top-rated machinery available near you</p>
          </div>
          <button id="view-all-equipment" class="hidden md:inline-flex items-center gap-1 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
            View All
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
        <div class="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          ${displayEquipment.slice(0, 6).map((item) => equipmentCard(item)).join("")}
        </div>
        ${displayEquipment.length > 6 ? `
          <div class="mt-6 text-center">
            <button id="view-all-equipment-bottom" class="rounded-lg border border-slate-300 px-6 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
              View All ${displayEquipment.length} Listings
            </button>
          </div>
        ` : ""}
      </section>
    `;
  }

  const howItWorks = `
    <section class="mt-16">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">How It Works</h2>
        <p class="mt-2 text-sm text-slate-500">Rent farm equipment in 3 simple steps</p>
      </div>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <div class="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">1</div>
          <h3 class="mt-4 text-base font-semibold text-slate-900">Search & Discover</h3>
          <p class="mt-2 text-sm text-slate-500">Browse equipment by category, location, or keyword. Filter results to find exactly what you need.</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">2</div>
          <h3 class="mt-4 text-base font-semibold text-slate-900">Book & Confirm</h3>
          <p class="mt-2 text-sm text-slate-500">Select your dates, submit a booking request, and get quick confirmation from the equipment owner.</p>
        </div>
        <div class="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">3</div>
          <h3 class="mt-4 text-base font-semibold text-slate-900">Use & Return</h3>
          <p class="mt-2 text-sm text-slate-500">Pick up or receive delivery of the equipment. Use it for your farming tasks and return when done.</p>
        </div>
      </div>
    </section>
  `;

  const testimonialsSection = `
    <section class="mt-16">
      <div class="text-center">
        <h2 class="text-2xl font-bold text-slate-900 md:text-3xl">What Farmers Say</h2>
        <p class="mt-2 text-sm text-slate-500">Trusted by farmers across India</p>
      </div>
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-1 text-amber-400">
            ${'<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'.repeat(5)}
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">"AgriRent helped me find a harvester during peak season when buying was out of my budget. The booking process was smooth and the owner was very helpful."</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">RK</div>
            <div>
              <p class="text-sm font-medium text-slate-900">Rajesh Kumar</p>
              <p class="text-xs text-slate-500">Farmer, Punjab</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-1 text-amber-400">
            ${'<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'.repeat(5)}
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">"I listed my tractor on AgriRent when it was sitting idle for months. Now I earn extra income every week without any hassle. Great platform for owners!"</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">SP</div>
            <div>
              <p class="text-sm font-medium text-slate-900">Sunita Patil</p>
              <p class="text-xs text-slate-500">Equipment Owner, Maharashtra</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div class="flex items-center gap-1 text-amber-400">
            ${'<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>'.repeat(5)}
          </div>
          <p class="mt-3 text-sm text-slate-600 leading-relaxed">"The drone rental service was a game changer for my 20-acre farm. I could survey and spray pesticides efficiently at a fraction of the buying cost."</p>
          <div class="mt-4 flex items-center gap-3">
            <div class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">VA</div>
            <div>
              <p class="text-sm font-medium text-slate-900">Venkat Appa</p>
              <p class="text-xs text-slate-500">Farmer, Karnataka</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  return `
    ${heroSection}
    ${searchSection}
    ${categoriesSection}
    ${listingsSection}
    ${partnerCTA}
    ${howItWorks}
    ${testimonialsSection}
  `;
};

export { homePage };
