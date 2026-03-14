const paymentPage = ({ cart, equipment, renterName, renterPhone }) => {
  const resolveEquipment = (equipmentId) =>
    equipment.find((e) => String(e._id) === String(equipmentId));

  const formatPrice = (price) => `Rs ${price.toLocaleString("en-IN")}`;

  let totalPrice = 0;

  const orderItems = cart
    .map((item) => {
      const eq = resolveEquipment(item.equipmentId);
      if (!eq) return "";

      const dailyRate = eq.dailyRate || 0;
      const numberOfDays = item.numberOfDays || 1;
      const subtotal = dailyRate * numberOfDays;
      totalPrice += subtotal;

      const startDate = new Date(item.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
      const endDateObj = new Date(item.startDate);
      endDateObj.setDate(endDateObj.getDate() + numberOfDays);
      const endDate = endDateObj.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

      const image = eq.images && eq.images.length > 0
        ? `<img src="${eq.images[0]}" alt="${eq.name}" class="h-16 w-16 rounded-lg object-cover"/>`
        : `<div class="flex h-16 w-16 items-center justify-center rounded-lg bg-slate-100">
            <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
          </div>`;

      return `
        <div class="flex gap-4 py-4 border-b border-slate-100 last:border-0">
          ${image}
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-semibold text-slate-900">${eq.name}</h4>
            <p class="text-xs text-slate-500">${eq.location}</p>
            <p class="mt-1 text-xs text-slate-500">${startDate} — ${endDate} (${numberOfDays} day${numberOfDays > 1 ? "s" : ""})</p>
          </div>
          <div class="text-right shrink-0">
            <p class="text-xs text-slate-500">${formatPrice(dailyRate)}/day</p>
            <p class="text-sm font-semibold text-slate-900 mt-1">${formatPrice(subtotal)}</p>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="mb-6">
      <button id="payment-cancel-btn" class="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Back to Cart
      </button>
    </div>

    <h1 class="text-2xl font-bold text-slate-900 md:text-3xl mb-6">Payment</h1>

    <div class="grid gap-6 lg:grid-cols-5">
      <!-- Order Summary (Left) -->
      <div class="lg:col-span-3">
        <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 class="text-lg font-semibold text-slate-900 mb-1">Order Summary</h2>
          <p class="text-xs text-slate-500 mb-4">${cart.length} item${cart.length !== 1 ? "s" : ""}</p>

          <div>
            ${orderItems}
          </div>

          <div class="mt-4 pt-4 border-t border-slate-200">
            <div class="flex justify-between text-sm text-slate-500 mb-2">
              <span>Renter</span>
              <span class="text-slate-700 font-medium">${renterName}</span>
            </div>
            <div class="flex justify-between text-sm text-slate-500 mb-4">
              <span>Phone</span>
              <span class="text-slate-700 font-medium">${renterPhone}</span>
            </div>
            <div class="flex justify-between text-lg">
              <span class="font-semibold text-slate-900">Total Amount</span>
              <span class="font-bold text-emerald-700">${formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Payment Methods (Right) -->
      <div class="lg:col-span-2">
        <div class="sticky top-24 space-y-4">
          <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 class="text-lg font-semibold text-slate-900 mb-4">Payment Method</h2>

            <div class="space-y-3" id="payment-methods">
              <!-- UPI -->
              <label class="payment-method-option flex items-center gap-3 rounded-lg border-2 border-emerald-500 bg-emerald-50 p-4 cursor-pointer transition-all">
                <input type="radio" name="paymentMethod" value="upi" checked class="hidden"/>
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                  <svg class="h-5 w-5 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-slate-900">UPI</p>
                  <p class="text-xs text-slate-500">Google Pay, PhonePe, Paytm</p>
                </div>
                <div class="h-5 w-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-emerald-500 payment-radio-dot"></div>
                </div>
              </label>

              <!-- Credit/Debit Card -->
              <label class="payment-method-option flex items-center gap-3 rounded-lg border-2 border-slate-200 bg-white p-4 cursor-pointer transition-all hover:border-slate-300">
                <input type="radio" name="paymentMethod" value="card" class="hidden"/>
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <svg class="h-5 w-5 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-slate-900">Credit / Debit Card</p>
                  <p class="text-xs text-slate-500">Visa, Mastercard, Rupay</p>
                </div>
                <div class="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-transparent payment-radio-dot"></div>
                </div>
              </label>

              <!-- Net Banking -->
              <label class="payment-method-option flex items-center gap-3 rounded-lg border-2 border-slate-200 bg-white p-4 cursor-pointer transition-all hover:border-slate-300">
                <input type="radio" name="paymentMethod" value="netbanking" class="hidden"/>
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100">
                  <svg class="h-5 w-5 text-violet-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-slate-900">Net Banking</p>
                  <p class="text-xs text-slate-500">All major banks supported</p>
                </div>
                <div class="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center">
                  <div class="h-2.5 w-2.5 rounded-full bg-transparent payment-radio-dot"></div>
                </div>
              </label>
            </div>
          </div>

          <button id="payment-pay-btn" class="w-full rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors shadow-sm">
            <svg class="h-5 w-5 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Pay ${formatPrice(totalPrice)}
          </button>

          <p class="text-center text-xs text-slate-400 mt-2">
            <svg class="h-3 w-3 inline mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
            Secure payment - Your data is protected
          </p>
        </div>
      </div>
    </div>
  `;
};

const initPaymentMethods = () => {
  const options = document.querySelectorAll(".payment-method-option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      // Reset all options
      options.forEach((opt) => {
        opt.classList.remove("border-emerald-500", "bg-emerald-50");
        opt.classList.add("border-slate-200", "bg-white");
        const dot = opt.querySelector(".payment-radio-dot");
        if (dot) {
          dot.classList.remove("bg-emerald-500");
          dot.classList.add("bg-transparent");
          dot.parentElement.classList.remove("border-emerald-500");
          dot.parentElement.classList.add("border-slate-300");
        }
      });
      // Activate selected
      option.classList.remove("border-slate-200", "bg-white");
      option.classList.add("border-emerald-500", "bg-emerald-50");
      const dot = option.querySelector(".payment-radio-dot");
      if (dot) {
        dot.classList.remove("bg-transparent");
        dot.classList.add("bg-emerald-500");
        dot.parentElement.classList.remove("border-slate-300");
        dot.parentElement.classList.add("border-emerald-500");
      }
      option.querySelector("input").checked = true;
    });
  });
};

export { paymentPage, initPaymentMethods };
