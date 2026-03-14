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

const starSvg = `<svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>`;

const renderStars = (avgRating) => {
  const full = Math.floor(avgRating);
  const half = avgRating - full >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  let html = "";
  for (let i = 0; i < full; i++) html += `<span class="text-amber-400">${starSvg}</span>`;
  if (half) html += `<span class="text-amber-300">${starSvg}</span>`;
  for (let i = 0; i < empty; i++) html += `<span class="text-slate-300">${starSvg}</span>`;
  return html;
};

const equipmentCard = (equipment, loggedInUserId = "") => {
  const image = equipment.images && equipment.images.length > 0 ? equipment.images[0] : "";
  const isOwner = loggedInUserId && String(equipment.ownerId) === String(loggedInUserId);
  const avgRating = equipment.avgRating || 0;
  const totalRatings = equipment.totalRatings || 0;
  const actionButton = isOwner
    ? `<div class="flex items-center gap-2">
        <span class="rounded-lg bg-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">Your Listing</span>
        <button class="delete-equipment rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white hover:bg-red-600 transition-colors" data-delete-equipment="${equipment._id}">Delete</button>
      </div>`
    : `<button class="book-equipment rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700" data-book-equipment="${equipment._id}">Book Now</button>`;
  return `
  <article class="view-equipment rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow" data-view-equipment="${equipment._id}">
    ${image ? `<img src="${image}" alt="${escapeHtml(equipment.name)}" class="h-44 w-full object-cover" />` : `<div class="flex h-44 w-full items-center justify-center bg-slate-100"><svg class="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg></div>`}
    <div class="p-5">
      <div class="flex items-start justify-between gap-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-900">${escapeHtml(equipment.name)}</h3>
          <p class="text-sm text-slate-500">${escapeHtml(equipment.category)} • ${escapeHtml(equipment.location)}${equipment.distance != null ? ` • <span class="font-medium text-emerald-600">${equipment.distance} km away</span>` : ""}</p>
        </div>
        <span class="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">Available</span>
      </div>

      <p class="mt-3 min-h-16 text-sm text-slate-600">${escapeHtml(equipment.description || "No description provided yet.")}</p>

      <div class="mt-3 flex items-center gap-1">
        ${renderStars(avgRating)}
        <span class="ml-1 text-xs text-slate-500">${avgRating > 0 ? `${avgRating} (${totalRatings})` : "No ratings"}</span>
      </div>

      <div class="mt-3 rounded-lg bg-slate-100 px-3 py-2 text-sm inline-block">
        <p class="text-xs text-slate-500">Daily Rate</p>
        <p class="font-semibold text-slate-900">${formatCurrency(equipment.dailyRate)}</p>
      </div>

      <div class="mt-4 flex items-center justify-between">
        <p class="text-xs text-slate-500">Owner: <span class="font-medium text-slate-700">${escapeHtml(equipment.ownerName)}</span></p>
        ${actionButton}
      </div>
    </div>
  </article>
`;
};

export { equipmentCard, renderStars };

