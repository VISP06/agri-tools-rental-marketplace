const aboutPage = () => `
  <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-700 via-emerald-800 to-slate-900 px-6 py-16 text-white md:px-12">
    <div class="absolute inset-0 opacity-10">
      <div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-emerald-400 blur-3xl"></div>
    </div>
    <div class="relative z-10 max-w-2xl">
      <span class="inline-block rounded-full bg-emerald-500/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300 border border-emerald-500/30">About Us</span>
      <h1 class="mt-4 text-3xl font-extrabold leading-tight md:text-4xl">Empowering Indian Agriculture, One Rental at a Time</h1>
      <p class="mt-4 text-base text-emerald-100/80">We are building India's most accessible agricultural equipment marketplace — connecting farmers who need machinery with owners who have it.</p>
    </div>
  </section>

  <section class="mt-12 grid gap-8 md:grid-cols-2">
    <div class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
        <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
      </div>
      <h2 class="mt-4 text-xl font-bold text-slate-900">Who We Are</h2>
      <p class="mt-3 text-sm text-slate-600 leading-relaxed">
        We are a team of agriculture enthusiasts and technology professionals who understand the challenges Indian farmers face. Many small and marginal farmers cannot afford expensive machinery, while many equipment owners see their machines sitting idle for months. AgriRent bridges this gap.
      </p>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
        <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
      </div>
      <h2 class="mt-4 text-xl font-bold text-slate-900">Our Mission</h2>
      <p class="mt-3 text-sm text-slate-600 leading-relaxed">
        To democratize access to agricultural machinery across India. We believe no farmer should miss a harvest window because they couldn't afford or find the right equipment. Through technology, we make renting as easy as a few clicks.
      </p>
    </div>
  </section>

  <section class="mt-8 grid gap-8 md:grid-cols-2">
    <div class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
        <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
      </div>
      <h2 class="mt-4 text-xl font-bold text-slate-900">Our Vision</h2>
      <p class="mt-3 text-sm text-slate-600 leading-relaxed">
        A future where every farmer in India has instant access to the machinery they need — regardless of their financial capacity. We envision a sharing economy for agriculture that increases productivity, reduces costs, and promotes sustainability.
      </p>
    </div>

    <div class="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div class="flex h-12 w-12 items-center justify-center rounded-full bg-violet-100">
        <svg class="h-6 w-6 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
      </div>
      <h2 class="mt-4 text-xl font-bold text-slate-900">Why Trust Us</h2>
      <p class="mt-3 text-sm text-slate-600 leading-relaxed">
        Every listing is verified. Every booking is tracked. We facilitate transparent pricing with no hidden fees, provide secure payment handling, and offer dispute resolution. Your farming operations are in safe hands.
      </p>
    </div>
  </section>

  <section class="mt-12">
    <div class="text-center">
      <h2 class="text-2xl font-bold text-slate-900">Our Values</h2>
      <p class="mt-2 text-sm text-slate-500">The principles that guide everything we do</p>
    </div>
    <div class="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-2xl">
          <svg class="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Farmer First</h3>
        <p class="mt-2 text-xs text-slate-500">Every decision starts with the farmer's needs and ends with their success.</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-2xl">
          <svg class="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Always Innovate</h3>
        <p class="mt-2 text-xs text-slate-500">We continuously find better ways to connect equipment with those who need it most.</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-2xl">
          <svg class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Community Driven</h3>
        <p class="mt-2 text-xs text-slate-500">We build trust through community, enabling farmers to help each other grow.</p>
      </div>

      <div class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm text-center">
        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-2xl">
          <svg class="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h3 class="mt-3 text-sm font-semibold text-slate-900">Sustainable Growth</h3>
        <p class="mt-2 text-xs text-slate-500">Sharing equipment means fewer machines manufactured and a lighter environmental footprint.</p>
      </div>
    </div>
  </section>
`;

export { aboutPage };
