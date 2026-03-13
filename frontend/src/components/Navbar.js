const navbar = (activePage) => `
  <nav class="sticky top-0 z-50 bg-white shadow-sm border-b border-slate-200">
    <div class="mx-auto max-w-7xl px-4 md:px-6">
      <div class="flex h-16 items-center justify-between">
        <button id="nav-home" class="flex items-center gap-2 text-xl font-bold text-emerald-700 hover:text-emerald-800 transition-colors">
          <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          AgriRent
        </button>

        <div class="hidden md:flex items-center gap-1">
          <button id="nav-home-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "home" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }">Home</button>
          <button id="nav-marketplace-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "marketplace" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }">Equipments</button>
          <button id="nav-about-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "about" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }">About Us</button>
          <button id="nav-contact-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "contact" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }">Contact</button>
        </div>

        <div class="flex items-center gap-3">
          <button id="nav-list-equipment-link" class="hidden md:inline-flex items-center gap-2 rounded-lg border-2 border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            List Equipment
          </button>
          <button id="nav-login-link" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
            Login
          </button>
          <button id="mobile-menu-toggle" class="md:hidden rounded-lg p-2 text-slate-600 hover:bg-slate-100">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      <div id="mobile-menu" class="hidden md:hidden pb-4">
        <div class="flex flex-col gap-1 pt-2 border-t border-slate-200">
          <button id="nav-home-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "home" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }">Home</button>
          <button id="nav-marketplace-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "marketplace" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }">Equipments</button>
          <button id="nav-about-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "about" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }">About Us</button>
          <button id="nav-contact-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "contact" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }">Contact</button>
          <button id="nav-list-equipment-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "list-equipment" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }">List Equipment</button>
        </div>
      </div>
    </div>
  </nav>
`;

export { navbar };
