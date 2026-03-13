import { equipmentCard } from "../components/EquipmentCard.js";

const homePage = ({ loading, error, equipment }) => {
  if (loading) {
    return `
      <section class="rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p class="text-slate-500">Loading equipment listings...</p>
      </section>
    `;
  }

  if (error) {
    return `
      <section class="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700 shadow-sm">
        <h2 class="font-semibold">Could not load equipment</h2>
        <p class="mt-2 text-sm">${error}</p>
      </section>
    `;
  }

  if (!equipment.length) {
    return `
      <section class="rounded-xl border border-amber-200 bg-amber-50 p-6 text-amber-800 shadow-sm">
        <h2 class="font-semibold">No listings yet</h2>
        <p class="mt-2 text-sm">Be the first to add farm machinery from the dashboard tab.</p>
      </section>
    `;
  }

  return `
    <section class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      ${equipment.map((item) => equipmentCard(item)).join("")}
    </section>
  `;
};

export { homePage };

