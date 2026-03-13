const registerPage = () => `
  <section class="flex min-h-[80vh] items-center justify-center px-4 py-8">
    <div class="w-full max-w-md">
      <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <div class="text-center">
          <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
            <svg class="h-7 w-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/>
            </svg>
          </div>
          <h2 class="mt-4 text-2xl font-bold text-slate-900">Create Account</h2>
          <p class="mt-1 text-sm text-slate-500">Join AgriRent and start renting or listing equipment</p>
        </div>

        <form id="register-form" class="mt-8 space-y-4">
          <div class="grid grid-cols-2 gap-3">
            <label class="block">
              <span class="text-sm font-medium text-slate-700">First Name</span>
              <input
                type="text"
                name="firstName"
                required
                placeholder="John"
                class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </label>
            <label class="block">
              <span class="text-sm font-medium text-slate-700">Last Name</span>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Doe"
                class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </label>
          </div>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Email Address</span>
            <div class="relative mt-1">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </span>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Phone Number</span>
            <div class="relative mt-1">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              </span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">I want to</span>
            <select
              name="role"
              required
              class="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="renter">Rent Equipment (Farmer)</option>
              <option value="owner">List My Equipment (Owner)</option>
              <option value="both">Both - Rent & List</option>
            </select>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Password</span>
            <div class="relative mt-1">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </span>
              <input
                type="password"
                name="password"
                required
                placeholder="Min 8 characters"
                minlength="8"
                class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </label>

          <label class="block">
            <span class="text-sm font-medium text-slate-700">Confirm Password</span>
            <div class="relative mt-1">
              <span class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
              </span>
              <input
                type="password"
                name="confirmPassword"
                required
                placeholder="Re-enter your password"
                minlength="8"
                class="w-full rounded-lg border border-slate-300 py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </label>

          <label class="flex items-start gap-2">
            <input type="checkbox" name="terms" required class="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
            <span class="text-sm text-slate-600">I agree to the <span class="font-medium text-emerald-600">Terms of Service</span> and <span class="font-medium text-emerald-600">Privacy Policy</span></span>
          </label>

          <button
            type="submit"
            class="w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            Create Account
          </button>
        </form>

        <p class="mt-6 text-center text-sm text-slate-600">
          Already have an account?
          <button id="goto-login" class="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">Sign in</button>
        </p>
      </div>
    </div>
  </section>
`;

export { registerPage };
