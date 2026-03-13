import { renderStars } from "../components/EquipmentCard.js";

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

const equipmentDetailPage = ({ equipment, loggedInUser }) => {
  if (!equipment) {
    return `
      <section class="mt-4">
        <div class="rounded-xl border border-red-200 bg-red-50 p-8 text-center text-red-700">
          <h2 class="text-xl font-bold">Equipment not found</h2>
          <p class="mt-2 text-sm">This listing may have been removed.</p>
          <button id="detail-back-btn" class="mt-4 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">Go Back</button>
        </div>
      </section>
    `;
  }

  const image = equipment.images && equipment.images.length > 0 ? equipment.images[0] : "";
  const isOwner = loggedInUser && String(equipment.ownerId) === String(loggedInUser);

  const avgRating = equipment.avgRating || 0;
  const totalRatings = equipment.totalRatings || 0;

  const canRate = loggedInUser && !isOwner;
  const ratingStarsInteractive = canRate
    ? `<div class="flex items-center gap-1">
        ${[1, 2, 3, 4, 5].map((star) => `<button class="rate-star text-slate-300 hover:text-amber-400 transition-colors" data-rating="${star}"><svg class="h-7 w-7" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg></button>`).join("")}
      </div>
      <p class="mt-1 text-xs text-slate-400">Click a star to rate</p>`
    : "";

  const actionButton = isOwner
    ? `<div class="flex items-center gap-3">
        <span class="rounded-lg bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-600">Your Listing</span>
        <button class="delete-equipment rounded-lg bg-red-500 px-5 py-3 text-sm font-semibold text-white hover:bg-red-600 transition-colors" data-delete-equipment="${equipment._id}">Delete</button>
      </div>`
    : `<button class="book-equipment rounded-lg bg-emerald-600 px-8 py-3 text-base font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm" data-book-equipment="${equipment._id}">Book Now</button>`;

  return `
    <section class="mt-4">
      <button id="detail-back-btn" class="mb-6 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>

      <div class="grid gap-8 lg:grid-cols-2">
        <!-- Image -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          ${image
            ? `<img src="${image}" alt="${escapeHtml(equipment.name)}" class="h-72 w-full object-cover md:h-96" />`
            : `<div class="flex h-72 w-full items-center justify-center bg-slate-100 md:h-96">
                <svg class="h-20 w-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/></svg>
              </div>`
          }
        </div>

        <!-- Details -->
        <div class="flex flex-col gap-6">
          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h1 class="text-3xl font-bold text-slate-900 md:text-4xl">${escapeHtml(equipment.name)}</h1>
                <div class="mt-3 flex flex-wrap items-center gap-3">
                  <span class="rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-semibold text-emerald-700">${escapeHtml(equipment.category)}</span>
                  <span class="flex items-center gap-1 text-sm text-slate-500">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    ${escapeHtml(equipment.location)}
                  </span>
                </div>
              </div>
              <span class="rounded-full bg-green-100 px-4 py-1.5 text-sm font-semibold text-green-700">Available</span>
            </div>

            <hr class="my-6 border-slate-200" />

            <div>
              <h2 class="text-lg font-bold text-slate-900">Description</h2>
              <p class="mt-3 text-base leading-relaxed text-slate-600">${escapeHtml(equipment.description || "No description provided yet.")}</p>
            </div>

            <hr class="my-6 border-slate-200" />

            <div class="flex flex-wrap items-center gap-6">
              <div class="rounded-xl bg-emerald-50 border border-emerald-200 px-6 py-4">
                <p class="text-xs font-medium text-slate-500">Daily Rate</p>
                <p class="mt-1 text-2xl font-bold text-emerald-700">${formatCurrency(equipment.dailyRate)}</p>
              </div>
              <div class="rounded-xl bg-slate-50 border border-slate-200 px-6 py-4">
                <p class="text-xs font-medium text-slate-500">Listed by</p>
                <p class="mt-1 text-lg font-semibold text-slate-800">${escapeHtml(equipment.ownerName)}</p>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 class="text-lg font-bold text-slate-900">Rating</h2>
            <div class="mt-3 flex items-center gap-2">
              ${renderStars(avgRating)}
              <span class="text-lg font-bold text-slate-800">${avgRating > 0 ? avgRating : "-"}</span>
              <span class="text-sm text-slate-500">(${totalRatings} ${totalRatings === 1 ? "rating" : "ratings"})</span>
            </div>
            ${ratingStarsInteractive ? `<div class="mt-4 border-t border-slate-200 pt-4"><p class="text-sm font-medium text-slate-700 mb-2">Rate this equipment:</p>${ratingStarsInteractive}</div>` : ""}
          </div>

          <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 class="text-lg font-bold text-slate-900">Interested in this equipment?</h2>
            <p class="mt-2 text-sm text-slate-500">Click below to submit a booking request to the owner.</p>
            <div class="mt-5">
              ${actionButton}
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
};

export { equipmentDetailPage };
