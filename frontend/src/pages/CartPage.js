const cartPage = ({ cart, equipment, loggedInUser }) => {
  const today = new Date().toISOString().split("T")[0];

  const resolveEquipment = (equipmentId) =>
    equipment.find((e) => String(e._id) === String(equipmentId));

  const computeItemPrice = (dailyRate, numberOfDays) =>
    (dailyRate || 0) * (numberOfDays || 1);

  const formatPrice = (price) => `Rs ${price.toLocaleString("en-IN")}`;

  if (!cart || cart.length === 0) {
    return `
      <div class="flex flex-col items-center justify-center py-20 text-center">
        <svg class="h-20 w-20 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"/>
        </svg>
        <h2 class="mt-6 text-2xl font-bold text-slate-800">Your cart is empty</h2>
        <p class="mt-2 text-sm text-slate-500">Browse equipment and add items to get started</p>
        <button id="cart-browse-equipment" class="mt-6 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
          Browse Equipment
        </button>
      </div>
    `;
  }

  let totalPrice = 0;
  let totalItems = 0;

  const cartItems = cart
    .map((item) => {
      const eq = resolveEquipment(item.equipmentId);

      if (!eq) {
        return `
        <div class="cart-item-card rounded-xl border border-red-200 bg-red-50 p-4">
          <div class="flex items-center justify-between">
            <p class="text-sm text-red-600">This item is no longer available</p>
            <button class="cart-remove-item rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-200 transition-colors" data-equipment-id="${item.equipmentId}">Remove</button>
          </div>
        </div>
      `;
      }

      const dailyRate = eq.dailyRate || 0;
      const numberOfDays = item.numberOfDays || 1;
      const itemTotal = computeItemPrice(dailyRate, numberOfDays);
      totalPrice += itemTotal;

      const image = eq.images && eq.images.length > 0
        ? `<img src="${eq.images[0]}" alt="${eq.name}" class="h-24 w-24 rounded-lg object-cover"/>`
        : `<div class="flex h-24 w-24 items-center justify-center rounded-lg bg-slate-100">
            <svg class="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>`;

      return `
        <div class="cart-item-card rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div class="flex gap-4">
            ${image}
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h3 class="text-lg font-semibold text-slate-900">${eq.name}</h3>
                  <p class="text-xs text-slate-500">${eq.category} &bull; ${eq.location}</p>
                </div>
                <button class="cart-remove-item shrink-0 rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors" data-equipment-id="${item.equipmentId}" title="Remove">
                  <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>

              <div class="mt-3 grid grid-cols-3 gap-3">
                <div>
                  <label class="text-xs font-medium text-slate-500">Start Date</label>
                  <input type="date" min="${today}" value="${item.startDate || today}" class="cart-start-date mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" data-equipment-id="${item.equipmentId}"/>
                </div>
                <div>
                  <label class="text-xs font-medium text-slate-500">Days</label>
                  <input type="number" min="1" max="365" value="${numberOfDays}" class="cart-days mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" data-equipment-id="${item.equipmentId}"/>
                </div>
                <div>
                  <label class="text-xs font-medium text-slate-500">Rate/Day</label>
                  <p class="mt-1 py-2 text-sm font-medium text-slate-700">${formatPrice(dailyRate)}</p>
                </div>
              </div>

              <div class="mt-3 flex items-center justify-end">
                <p class="text-sm font-semibold text-emerald-700">Subtotal: ${formatPrice(itemTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 md:text-3xl">Your Cart</h1>
        <p class="mt-1 text-sm text-slate-500">${cart.length} item${cart.length !== 1 ? "s" : ""} in your cart</p>
      </div>
      <button id="cart-clear-all" class="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
        </svg>
        Clear Cart
      </button>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-4">
        ${cartItems}
      </div>

      <div class="lg:col-span-1">
        <div class="sticky top-24 space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-900">Order Summary</h2>
            <div class="mt-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-slate-500">Items</span>
                <span class="font-medium text-slate-700">${cart.length}</span>
              </div>
              <hr class="my-3 border-slate-200"/>
              <div class="flex justify-between text-lg">
                <span class="font-semibold text-slate-900">Total</span>
                <span class="font-bold text-emerald-700">${formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>

          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-900">Renter Details</h2>
            <div class="mt-4 space-y-3">
              <div>
                <label class="text-xs font-medium text-slate-500">Your Name</label>
                <input type="text" id="checkout-renter-name" placeholder="Enter your name" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"/>
              </div>
              <div>
                <label class="text-xs font-medium text-slate-500">Phone Number</label>
                <input type="tel" id="checkout-renter-phone" placeholder="Enter phone number" class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"/>
              </div>
            </div>
          </div>

          <button id="cart-checkout-btn" class="w-full rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
            <svg class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Proceed to Pay (${formatPrice(totalPrice)})
          </button>
        </div>
      </div>
    </div>
  `;
};

export { cartPage };
