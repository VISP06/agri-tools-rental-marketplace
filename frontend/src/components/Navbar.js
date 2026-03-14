const navbar = (activePage, loggedInUser = "", cartCount = 0) => {
  const cartBadge = cartCount > 0
    ? `<span class="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">${cartCount > 99 ? "99+" : cartCount}</span>`
    : "";

  const authButton = loggedInUser
    ? `<div class="flex items-center gap-2">
        <button id="nav-profile" class="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-300 cursor-pointer hover:bg-emerald-200 transition-colors">
          <svg class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        </button>
        <button id="nav-logout" class="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600 transition-colors">Logout</button>
      </div>`
    : `<button id="nav-login-link" class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">Login</button>`;

  return `
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
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>Home</button>
          <button id="nav-marketplace-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "marketplace" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>Equipments</button>
          <button id="nav-about-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "about" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>About Us</button>
          <button id="nav-contact-link" class="nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            activePage === "contact" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Contact</button>
        </div>

        <div class="flex items-center gap-3">
          ${loggedInUser ? `<button id="nav-list-equipment-link" class="hidden md:inline-flex items-center gap-2 rounded-lg border-2 border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors">
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/>
            </svg>
            List Equipment
          </button>` : ""}
          ${loggedInUser ? `<button id="nav-cart-link" class="relative rounded-lg p-2 transition-colors ${
            activePage === "cart" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
            </svg>
            ${cartBadge}
          </button>` : ""}
          ${authButton}
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
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>Home</button>
          <button id="nav-marketplace-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "marketplace" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/></svg>Equipments</button>
          <button id="nav-about-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "about" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>About Us</button>
          <button id="nav-contact-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "contact" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>Contact</button>
          ${loggedInUser ? `<button id="nav-list-equipment-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "list-equipment" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>List Equipment</button>
          <button id="nav-cart-mobile" class="nav-link rounded-lg px-3 py-2 text-left text-sm font-medium ${
            activePage === "cart" ? "bg-emerald-50 text-emerald-700" : "text-slate-600 hover:bg-slate-100"
          }"><svg class="h-4 w-4 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/></svg>Cart${cartCount > 0 ? ` (${cartCount})` : ""}</button>` : ""}
        </div>
      </div>
    </div>
  </nav>
`;
};

export { navbar };
