import { equipmentCard } from "../components/EquipmentCard.js";

const profilePage = ({ loggedInUser, equipment }) => {
  const myEquipment = equipment.filter((item) => item.ownerId === loggedInUser);

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
