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

const equipmentCard = (equipment) => `
  <article class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
    <div class="flex items-start justify-between gap-4">
      <div>
        <h3 class="text-lg font-semibold text-slate-900">${escapeHtml(equipment.name)}</h3>
        <p class="text-sm text-slate-500">${escapeHtml(equipment.category)} • ${escapeHtml(equipment.location)}</p>
      </div>
      <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
    </div>

    <p class="mt-3 min-h-16 text-sm text-slate-600">${escapeHtml(equipment.description || "No description provided yet.")}</p>

    <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
      <div class="rounded-lg bg-slate-100 px-3 py-2">
        <p class="text-xs text-slate-500">Hourly</p>
        <p class="font-semibold text-slate-900">${formatCurrency(equipment.hourlyRate)}</p>
      </div>
      <div class="rounded-lg bg-slate-100 px-3 py-2">
        <p class="text-xs text-slate-500">Daily</p>
        <p class="font-semibold text-slate-900">${formatCurrency(equipment.dailyRate)}</p>
      </div>
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
  </article>
`;

export { equipmentCard };

