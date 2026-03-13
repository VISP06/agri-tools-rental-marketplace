const listEquipmentPage = () => `
  <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 px-6 py-16 text-white md:px-12">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400 blur-3xl"></div>
      <div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-emerald-300 blur-3xl"></div>
    </div>
    <div class="relative z-10 max-w-2xl">
      <span class="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">For Equipment Owners</span>
      <h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">Join Our Partner Network Today</h1>
      <p class="mt-4 text-base text-emerald-100/80">Keep your equipment at maximum utilization. List your farm machinery and start earning from idle assets.</p>
      <div class="mt-6 flex flex-wrap gap-4">
        <div class="flex items-center gap-2 text-sm text-emerald-200">
          <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          Drive more revenue
        </div>
        <div class="flex items-center gap-2 text-sm text-emerald-200">
          <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          Reach more farmers
        </div>
        <div class="flex items-center gap-2 text-sm text-emerald-200">
          <svg class="h-5 w-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
          Increase equipment utilization
        </div>
      </div>
      <a href="#partner-form" class="mt-6 inline-block rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-800 shadow-lg hover:bg-emerald-50 transition-colors">
        List Now
      </a>
    </div>
  </section>

  <section class="mt-12 grid gap-6 md:grid-cols-3">
    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <h3 class="mt-4 text-base font-semibold text-slate-900">Fast Transactions</h3>
      <p class="mt-2 text-sm text-slate-500">Quick and reliable rental processes. Get booking confirmations fast and receive payments on time.</p>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
        <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      </div>
      <h3 class="mt-4 text-base font-semibold text-slate-900">Transparent Pricing</h3>
      <p class="mt-2 text-sm text-slate-500">You set your own rates. No hidden fees, no surprises. Renters see exactly what they'll pay.</p>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
      <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      </div>
      <h3 class="mt-4 text-base font-semibold text-slate-900">Flexible Terms</h3>
      <p class="mt-2 text-sm text-slate-500">No long-term commitments. Set your availability, black-out dates, and rental windows as you like.</p>
    </div>
  </section>

  <section id="partner-form" class="mt-12 grid gap-6 lg:grid-cols-3">
    <article class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
      <h2 class="text-xl font-bold text-slate-900">List Your Equipment</h2>
      <p class="mt-1 text-sm text-slate-500">
        Add tractors, harvesters, irrigation systems, and more so nearby farmers can rent them.
      </p>

      <form id="add-equipment-form" class="mt-6 grid gap-4 md:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Owner Name</span>
          <input class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="ownerName" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Equipment Name</span>
          <input class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="name" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Category</span>
          <select class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="category" required>
            <option value="">Select a category</option>
            <option value="Tractor">Tractor</option>
            <option value="Harvester">Harvester</option>
            <option value="Irrigation">Irrigation System</option>
            <option value="Drone">Agricultural Drone</option>
            <option value="Plough">Plough / Tiller</option>
            <option value="Sprayer">Sprayer</option>
            <option value="Seeder">Seeder / Planter</option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Location</span>
          <input class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="location" placeholder="District, State" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Equipment Image</span>
          <div id="image-drop-zone" class="relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-3 py-6 cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/30 transition-colors">
            <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/></svg>
            <p class="mt-2 text-sm text-slate-500">Click or drag & drop to upload</p>
            <p class="mt-1 text-xs text-slate-400">PNG, JPG up to 5MB</p>
            <input class="absolute inset-0 cursor-pointer opacity-0" name="image" type="file" accept="image/*" />
            <img id="image-preview" class="mt-3 hidden max-h-32 rounded-lg object-cover" alt="Preview" />
          </div>
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Daily Rate (INR)</span>
          <input class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="dailyRate" type="number" min="0" required />
        </label>

        <label class="flex flex-col gap-2 text-sm md:col-span-2">
          <span class="font-medium text-slate-700">Description</span>
          <textarea class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="description" rows="4" placeholder="Condition, power, fuel type, operator availability..."></textarea>
        </label>

        <button class="rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors md:col-span-2" type="submit">
          Save Listing
        </button>
      </form>
    </article>

    <aside class="space-y-4">
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">How does it work?</h3>
        <div class="mt-4 space-y-4">
          <div class="flex gap-3">
            <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">1</div>
            <div>
              <p class="text-sm font-medium text-slate-800">List your equipment</p>
              <p class="text-xs text-slate-500">Fill out the form with your machinery details and pricing.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">2</div>
            <div>
              <p class="text-sm font-medium text-slate-800">Get booking requests</p>
              <p class="text-xs text-slate-500">Farmers in your area will find and request your equipment.</p>
            </div>
          </div>
          <div class="flex gap-3">
            <div class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">3</div>
            <div>
              <p class="text-sm font-medium text-slate-800">Earn income</p>
              <p class="text-xs text-slate-500">Confirm bookings, hand over equipment, and receive secure payments.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-base font-semibold text-slate-900">Listing Checklist</h3>
        <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>Include clear equipment name and category</li>
          <li>Set competitive hourly and daily rates</li>
          <li>Mention condition, fuel type, and HP</li>
          <li>Specify if operator is available</li>
          <li>Keep your location details accurate</li>
        </ul>
      </div>
    </aside>
  </section>

  <section class="mt-12">
    <div class="text-center">
      <h2 class="text-xl font-bold text-slate-900">Frequently Asked Questions</h2>
    </div>
    <div class="mt-6 grid gap-4 md:grid-cols-2">
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold text-slate-900">Is there a listing fee?</h3>
        <p class="mt-2 text-sm text-slate-500">No, listing your equipment on AgriRent is completely free. We only take a small commission when a booking is confirmed.</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold text-slate-900">How do I get paid?</h3>
        <p class="mt-2 text-sm text-slate-500">Payments are processed securely through our platform. You'll receive the rental amount directly in your bank account after each booking.</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold text-slate-900">What if my equipment gets damaged?</h3>
        <p class="mt-2 text-sm text-slate-500">We have a dispute resolution system and encourage renters to carry insurance. Detailed terms are agreed upon before each booking.</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 class="text-sm font-semibold text-slate-900">Can I set my own availability?</h3>
        <p class="mt-2 text-sm text-slate-500">Absolutely! You have full control over your rental calendar. Set blackout dates and availability windows that suit your schedule.</p>
      </div>
    </div>
  </section>
`;

export { listEquipmentPage };
