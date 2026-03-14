import { equipmentCard } from "../components/EquipmentCard.js";

const profilePage = ({ loggedInUser, equipment, bookings }) => {
  const myEquipment = equipment.filter((item) => item.ownerId === loggedInUser);
  const myBookings = bookings || [];

  const statusBadge = (status) => {
    const colors = {
      requested: "bg-amber-100 text-amber-700",
      confirmed: "bg-emerald-100 text-emerald-700",
      completed: "bg-blue-100 text-blue-700",
      cancelled: "bg-red-100 text-red-700"
    };
    return `<span class="rounded-full px-2.5 py-0.5 text-xs font-semibold ${colors[status] || "bg-slate-100 text-slate-600"}">${status}</span>`;
  };

  return `
    <section class="mt-4">
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex items-center gap-4">
          <div class="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 border-2 border-emerald-300">
            <svg class="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <div>
            <h1 class="text-2xl font-bold text-slate-900">My Profile</h1>
            <p class="mt-1 text-sm text-slate-500">User ID: <span class="font-semibold text-emerald-700">${loggedInUser}</span></p>
          </div>
        </div>
      </div>

      <!-- My Bookings Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900">My Bookings</h2>
          <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">${myBookings.length} booking${myBookings.length !== 1 ? "s" : ""}</span>
        </div>

        ${myBookings.length > 0
          ? `<div class="mt-4 space-y-4">
              ${myBookings.map((b) => {
                const eq = b.equipment || {};
                const img = (eq.images && eq.images.length > 0) ? eq.images[0] : "";
                const days = Math.max(1, Math.round((new Date(b.endDate) - new Date(b.startDate)) / (1000 * 60 * 60 * 24)));
                return `
                  <div class="flex gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div class="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
                      ${img
                        ? `<img src="${img}" alt="${eq.name || ""}" class="h-full w-full object-cover" />`
                        : `<div class="flex h-full w-full items-center justify-center text-slate-400">
                            <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          </div>`
                      }
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-start justify-between gap-2">
                        <h3 class="font-semibold text-slate-900 truncate">${eq.name || "Equipment"}</h3>
                        ${statusBadge(b.status)}
                      </div>
                      <p class="mt-1 text-xs text-slate-500">${eq.category || ""} ${eq.location ? "• " + eq.location : ""}</p>
                      <div class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-600">
                        <span class="flex items-center gap-1">
                          <svg class="h-3.5 w-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          ${b.startDate} → ${b.endDate}
                        </span>
                        <span>${days} day${days !== 1 ? "s" : ""}</span>
                        <span class="font-semibold text-emerald-700">Rs ${(b.totalPrice || 0).toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>`
          : `<div class="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-500 shadow-sm text-center">
              <svg class="mx-auto h-10 w-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
              <p class="mt-2 font-medium">No bookings yet</p>
              <p class="mt-1 text-sm">Browse the marketplace and rent equipment to see your bookings here.</p>
            </div>`
        }
      </div>

      <!-- My Listings Section -->
      <div class="mt-8">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-bold text-slate-900">My Listings</h2>
          <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">${myEquipment.length} equipment</span>
        </div>

        ${myEquipment.length > 0
          ? `<div class="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              ${myEquipment.map((item) => equipmentCard(item, loggedInUser)).join("")}
            </div>`
          : `<div class="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-sm">
              <h3 class="font-semibold">No listings yet</h3>
              <p class="mt-2 text-sm">You haven't listed any equipment. Head to the <button id="profile-goto-list" class="font-semibold text-emerald-600 hover:text-emerald-700 underline">List Equipment</button> page to get started.</p>
            </div>`
        }
      </div>
    </section>
  `;
};

export { profilePage };
