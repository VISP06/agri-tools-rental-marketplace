const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount || 0);

const escapeHtml = (value) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const equipmentCard = (equipment) => {
  const image = equipment.images && equipment.images.length > 0 ? equipment.images[0] : "";
  return `
  <article class="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
    ${image ? `<img src="${image}" alt="${escapeHtml(equipment.name)}" class="h-44 w-full object-cover" />` : `<div class="flex h-44 w-full items-center justify-center bg-slate-100"><svg class="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg></div>`}
    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">${escapeHtml(equipment.name)}</h3>
          <p class="text-sm text-slate-500">${escapeHtml(equipment.category)} • ${escapeHtml(equipment.location)}</p>
        </div>
        <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
      </div>

      <p class="mt-3 min-h-16 text-sm text-slate-600">${escapeHtml(equipment.description || "No description provided yet.")}</p>

      <div class="mt-4 rounded-lg bg-slate-100 px-3 py-2 text-sm inline-block">
        <p class="text-xs text-slate-500">Daily Rate</p>
        <p class="font-semibold text-slate-900">${formatCurrency(equipment.dailyRate)}</p>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">${escapeHtml(equipment.ownerName)}</span></p>
        <button
          class="book-equipment rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          data-book-equipment="${equipment._id}"
        >
          Book Now
        </button>
      </div>
    </div>
  </article>
`;
};

export { equipmentCard };

