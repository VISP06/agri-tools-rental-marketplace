const listEquipmentPage = () => `
  <section class="mt-4 grid gap-6 lg:grid-cols-3">
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
          <span class="font-medium text-slate-700">Daily Rate (INR)</span>
          <input class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="dailyRate" type="number" min="0" required />
        </label>

        <label class="flex flex-col gap-2 text-sm md:col-span-2">
          <span class="font-medium text-slate-700">Description</span>
          <textarea class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20" name="description" rows="4" placeholder="Condition, power, fuel type, operator availability..."></textarea>
        </label>

        <div class="flex flex-col gap-2 text-sm md:col-span-2">
          <span class="font-medium text-slate-700">Equipment Photos</span>
          <label id="image-drop-zone" class="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 transition-colors hover:border-emerald-500 hover:bg-emerald-50/30">
            <svg class="h-8 w-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"/>
            </svg>
            <span class="text-sm text-slate-500">Click to upload or drag and drop</span>
            <span class="text-xs text-slate-400">PNG, JPG up to 5MB each</span>
            <input type="file" name="images" accept="image/png,image/jpeg" multiple class="hidden" />
          </label>
          <div id="image-preview-container" class="flex flex-wrap gap-3"></div>
        </div>

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
          <li>Set a competitive daily rate</li>
          <li>Mention condition, fuel type, and HP</li>
          <li>Specify if operator is available</li>
          <li>Upload clear photos of the equipment</li>
          <li>Keep your location details accurate</li>
        </ul>
      </div>
    </aside>
  </section>

`;

export { listEquipmentPage };
