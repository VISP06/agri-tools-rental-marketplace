const dashboardPage = () => `
  <section class="grid gap-6 lg:grid-cols-3">
    <article class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
      <h2 class="text-xl font-semibold text-slate-900">List New Equipment</h2>
      <p class="mt-1 text-sm text-slate-500">
        Add tractors, harvesters, irrigation systems, and more so nearby farmers can rent them.
      </p>

      <form id="add-equipment-form" class="mt-6 grid gap-4 md:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm">
          Owner Name
          <input class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="ownerName" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          Equipment Name
          <input class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="name" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          Category
          <input class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="category" placeholder="Tractor, Harvester..." required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          Location
          <input class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="location" placeholder="District, State" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          Hourly Rate (INR)
          <input class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="hourlyRate" type="number" min="0" required />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          Daily Rate (INR)
          <input class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="dailyRate" type="number" min="0" required />
        </label>

        <label class="flex flex-col gap-2 text-sm md:col-span-2">
          Description
          <textarea class="rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500" name="description" rows="4" placeholder="Condition, power, fuel type, operator availability..."></textarea>
        </label>

        <button class="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 md:col-span-2" type="submit">
          Save Listing
        </button>
      </form>
    </article>

    <aside class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 class="text-lg font-semibold text-slate-900">Marketplace Checklist</h3>
      <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600">
        <li>Add at least 10 machinery listings from your area.</li>
        <li>Define rental windows and black-out dates.</li>
        <li>Track booking confirmation and payment status.</li>
        <li>Collect renter reviews and utilization metrics.</li>
      </ul>
    </aside>
  </section>
`;

export { dashboardPage };

