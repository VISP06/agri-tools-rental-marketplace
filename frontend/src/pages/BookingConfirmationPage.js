const bookingConfirmationPage = ({ confirmedBookings, paymentId, equipment, renterName, renterPhone }) => {
  const resolveEquipment = (equipmentId) =>
    equipment.find((e) => String(e._id) === String(equipmentId));

  const formatPrice = (price) => `Rs ${price.toLocaleString("en-IN")}`;

  let grandTotal = 0;

  const bookingCards = (confirmedBookings || [])
    .map((booking) => {
      const eq = resolveEquipment(booking.equipmentId);
      const name = eq?.name || "Equipment";
      const location = eq?.location || "";
      const dailyRate = eq?.dailyRate || 0;
      const days = booking.numberOfDays || Math.max(1, Math.round((new Date(booking.endDate) - new Date(booking.startDate)) / (1000 * 60 * 60 * 24)));
      const subtotal = booking.totalPrice || dailyRate * days;
      grandTotal += subtotal;

      const startDate = new Date(booking.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      const endDate = new Date(booking.endDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

      const image = eq?.images && eq.images.length > 0
        ? `<img src="${eq.images[0]}" alt="${name}" class="h-14 w-14 rounded-lg object-cover"/>`
        : `<div class="flex h-14 w-14 items-center justify-center rounded-lg bg-slate-100">
            <svg class="h-7 w-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>`;

      return `
        <div class="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
          ${image}
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h4 class="text-sm font-semibold text-slate-900">${name}</h4>
              <span class="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                Paid
              </span>
            </div>
            ${location ? `<p class="text-xs text-slate-500">${location}</p>` : ""}
            <p class="text-xs text-slate-500 mt-0.5">${startDate} — ${endDate} (${days} day${days > 1 ? "s" : ""})</p>
          </div>
          <p class="text-sm font-semibold text-slate-900 shrink-0">${formatPrice(subtotal)}</p>
        </div>
      `;
    })
    .join("");

  return `
    <div class="mx-auto max-w-2xl py-8">
      <!-- Success Animation -->
      <div class="flex flex-col items-center text-center mb-8">
        <div class="success-checkmark-circle">
          <svg class="success-checkmark-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <h1 class="mt-6 text-2xl font-bold text-slate-900 md:text-3xl">Booking Confirmed!</h1>
        <p class="mt-2 text-sm text-slate-500">Your payment was successful and your bookings are confirmed.</p>
        ${paymentId ? `<p class="mt-1 text-xs text-slate-400">Payment ID: ${paymentId}</p>` : ""}
      </div>

      <!-- Booking Details -->
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm mb-6">
        <h2 class="text-lg font-semibold text-slate-900 mb-1">Booking Details</h2>
        <p class="text-xs text-slate-500 mb-4">${confirmedBookings?.length || 0} item${(confirmedBookings?.length || 0) !== 1 ? "s" : ""} booked</p>

        <div>${bookingCards}</div>

        <div class="mt-4 pt-4 border-t border-slate-200">
          <div class="flex justify-between text-sm text-slate-500 mb-1">
            <span>Renter</span>
            <span class="text-slate-700 font-medium">${renterName || ""}</span>
          </div>
          <div class="flex justify-between text-sm text-slate-500 mb-3">
            <span>Phone</span>
            <span class="text-slate-700 font-medium">${renterPhone || ""}</span>
          </div>
          <div class="flex justify-between text-lg">
            <span class="font-semibold text-slate-900">Total Paid</span>
            <span class="font-bold text-emerald-700">${formatPrice(grandTotal)}</span>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3">
        <button id="confirmation-download-invoice" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          Download Invoice
        </button>
        <button id="confirmation-browse-more" class="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"/>
          </svg>
          Browse More Equipment
        </button>
      </div>
    </div>
  `;
};

export { bookingConfirmationPage };
