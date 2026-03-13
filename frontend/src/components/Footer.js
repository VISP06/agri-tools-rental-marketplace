const footer = () => `
  <footer class="bg-slate-900 text-slate-300 mt-16">
    <div class="mx-auto max-w-7xl px-4 md:px-6 py-12">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

        <div>
          <div class="flex items-center gap-2 text-xl font-bold text-white">
            <svg class="h-7 w-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            AgriRent
          </div>
          <p class="mt-3 text-sm leading-relaxed text-slate-400">
            India's trusted agricultural equipment rental marketplace. Connecting farmers with quality machinery for every season.
          </p>
          <div class="mt-4 flex gap-3">
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.384 4.482A13.944 13.944 0 011.671 3.149a4.916 4.916 0 001.523 6.574 4.897 4.897 0 01-2.229-.616v.062a4.918 4.918 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 14.002-7.496 14.002-13.986 0-.21 0-.423-.015-.634A9.935 9.935 0 0024 4.557z"/></svg>
            </span>
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </span>
            <span class="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </span>
          </div>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h4>
          <ul class="mt-4 space-y-2 text-sm">
            <li><button id="footer-home" class="footer-link text-slate-400 hover:text-emerald-400 transition-colors">Home</button></li>
            <li><button id="footer-marketplace" class="footer-link text-slate-400 hover:text-emerald-400 transition-colors">Browse Equipment</button></li>
            <li><button id="footer-list-equipment" class="footer-link text-slate-400 hover:text-emerald-400 transition-colors">List Your Equipment</button></li>
            <li><button id="footer-about" class="footer-link text-slate-400 hover:text-emerald-400 transition-colors">About Us</button></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white">Need Help?</h4>
          <ul class="mt-4 space-y-2 text-sm">
            <li><button id="footer-contact" class="footer-link text-slate-400 hover:text-emerald-400 transition-colors">Contact Us</button></li>
            <li><span class="text-slate-400">Terms of Use</span></li>
            <li><span class="text-slate-400">Privacy Policy</span></li>
            <li><span class="text-slate-400">FAQs</span></li>
          </ul>
        </div>

        <div>
          <h4 class="text-sm font-semibold uppercase tracking-wider text-white">Contact Info</h4>
          <ul class="mt-4 space-y-3 text-sm">
            <li class="flex items-start gap-2 text-slate-400">
              <svg class="h-5 w-5 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              support@agrirent.in
            </li>
            <li class="flex items-start gap-2 text-slate-400">
              <svg class="h-5 w-5 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              +91 98765 43210
            </li>
            <li class="flex items-start gap-2 text-slate-400">
              <svg class="h-5 w-5 mt-0.5 shrink-0 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              Bangalore, India
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800 pt-6">
        <p class="text-xs text-slate-500">&copy; 2026 AgriRent. All rights reserved.</p>
        <p class="text-xs text-slate-500">Made with care in India</p>
      </div>
    </div>
  </footer>
`;

export { footer };
