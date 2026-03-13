const registerPage = () => `
  <section class="flex min-h-[80vh] items-center justify-center px-4">
    <div class="w-full max-w-md">
      <button type="button" id="back-btn" class="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors">
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
        Back
      </button>
      <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div class="text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg class="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <h2 class="mt-4 text-2xl font-bold text-slate-900">Create Your ID</h2>
          <p class="mt-1 text-sm text-slate-500">Choose a unique ID to get started on AgriRent</p>
        </div>

        <form id="register-form" class="mt-8 space-y-5">
          <label class="block">
            <span class="text-sm font-medium text-slate-700">Choose Your Unique ID</span>
            <div class="relative mt-1">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>
              </span>
              <input
                type="text"
                name="userId"
                required
                placeholder="e.g. farmer123"
                class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </label>

          <button
            type="submit"
            class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            Create ID
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-600">
          Already have an ID?
          <button type="button" id="goto-login" class="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Sign in</button>
        </p>
      </div>
    </div>
  </section>
`;

export { registerPage };
