const contactPage = () => `
  <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 px-6 py-12 text-white md:px-12">
    <div class="relative z-10">
      <span class="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">Get In Touch</span>
      <h1 class="mt-4 text-3xl font-extrabold md:text-4xl">Have Any Queries?</h1>
      <p class="mt-2 text-base text-emerald-100/80">Your opinion matters! Tell us how we can help you.</p>
    </div>
  </section>

  <section class="mt-10 grid gap-8 lg:grid-cols-3">
    <article class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm lg:col-span-2">
      <h2 class="text-xl font-bold text-slate-900">Send Us a Message</h2>
      <p class="mt-1 text-sm text-slate-500">Fill out the form and we'll get back to you within 24 hours.</p>

      <form id="contact-form" class="mt-6 grid gap-4 md:grid-cols-2">
        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">First Name</span>
          <input
            type="text"
            name="firstName"
            required
            placeholder="John"
            class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Last Name</span>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Doe"
            class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label class="flex flex-col gap-2 text-sm">
          <span class="font-medium text-slate-700">Phone</span>
          <input
            type="tel"
            name="phone"
            placeholder="+91 98765 43210"
            class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          />
        </label>

        <label class="flex flex-col gap-2 text-sm md:col-span-2">
          <span class="font-medium text-slate-700">Message</span>
          <textarea
            name="message"
            required
            rows="5"
            placeholder="Tell us how we can help you..."
            class="rounded-lg border border-slate-300 px-3 py-2.5 outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
          ></textarea>
        </label>

        <button type="submit" class="rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors md:col-span-2">
          Send Message
        </button>
      </form>
    </article>

    <aside class="space-y-4">
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          <svg class="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Our Address</h3>
        <p class="mt-1 text-sm text-slate-500">AgriRent Technologies, 1st Floor, Innovation Hub, Koramangala, Bangalore - 560034</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
          <svg class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Call Us</h3>
        <p class="mt-1 text-sm text-slate-500">+91 98765 43210</p>
        <p class="text-xs text-slate-400 mt-1">Mon - Sat, 9:00 AM - 6:00 PM</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
          <svg class="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Email Us</h3>
        <p class="mt-1 text-sm text-slate-500">support@agrirent.in</p>
        <p class="text-xs text-slate-400 mt-1">We typically respond within 24 hours</p>
      </div>
    </aside>
  </section>

  <section class="mt-12 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-200/50 p-8 md:p-10">
    <div class="flex flex-col md:flex-row items-center justify-between gap-6">
      <div>
        <h2 class="text-xl font-bold text-slate-900">Have equipment sitting idle?</h2>
        <p class="mt-2 text-sm text-slate-600">List it on AgriRent and start earning. We handle everything from bookings to payments.</p>
      </div>
      <button id="contact-become-partner" class="shrink-0 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition-colors">
        Become a Partner
      </button>
    </div>
  </section>
`;

export { contactPage };
