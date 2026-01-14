import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_BIIt-_jr.mjs';
import { s as supabase } from '../chunks/supabase_84VYV0jg.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { count: totalVehicles } = await supabase.from("veicoli").select("*", { count: "exact", head: true });
  const { count: promoVehicles } = await supabase.from("veicoli").select("*", { count: "exact", head: true }).eq("promo", true);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-extrabold text-gray-900 font-heading">Dashboard</h1> <p class="text-gray-500 mt-2">Benvenuto nel pannello di amministrazione di DSAS Mobility.</p> </div> <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"> <div> <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">Veicoli Totali</p> <h3 class="text-3xl font-extrabold text-primary mt-1">${totalVehicles || 0}</h3> </div> <div class="h-12 w-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg> </div> </div> <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between"> <div> <p class="text-sm font-bold text-gray-500 uppercase tracking-wide">In Promo</p> <h3 class="text-3xl font-extrabold text-secondary mt-1">${promoVehicles || 0}</h3> </div> <div class="h-12 w-12 bg-orange-50 text-secondary rounded-xl flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> </div> </div> </div> <div class="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"> <h3 class="text-lg font-bold text-gray-800 mb-6">Azioni Rapide</h3> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> <a href="/admin/veicoli/create" class="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary hover:bg-blue-50/50 transition-all cursor-pointer"> <div class="h-14 w-14 bg-blue-100 text-primary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> </div> <h4 class="font-bold text-gray-900 group-hover:text-primary transition-colors">Aggiungi Veicolo</h4> <p class="text-sm text-gray-500 text-center mt-1">Carica un nuovo veicolo nella flotta</p> </a> <a href="/admin/veicoli" class="group relative flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-primary hover:bg-blue-50/50 transition-all cursor-pointer"> <div class="h-14 w-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg> </div> <h4 class="font-bold text-gray-900 group-hover:text-purple-600 transition-colors">Gestisci Veicoli</h4> <p class="text-sm text-gray-500 text-center mt-1">Modifica o elimina veicoli esistenti</p> </a> </div> </div> ` })}`;
}, "D:/dsas-mobility/src/pages/admin/index.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
