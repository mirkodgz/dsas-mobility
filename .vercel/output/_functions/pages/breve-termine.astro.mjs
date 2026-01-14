import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dz3TRyfT.mjs';
import { H as Header, F as Footer } from '../chunks/Footer_BZ9xWnny.mjs';
import { B as Button } from '../chunks/Button_CPrkWnPE.mjs';
import { s as supabase } from '../chunks/supabase_84VYV0jg.mjs';
export { renderers } from '../renderers.mjs';

const $$BreveTermine = createComponent(async ($$result, $$props, $$slots) => {
  const { data: shortTermData } = await supabase.from("veicoli").select("*").eq("noleggio_breve", true).order("created_at", { ascending: false });
  const SHORT_TERM_FLEET = shortTermData?.map((v) => ({
    id: v.slug || v.id,
    brand: v.marca,
    model: v.modello,
    version: v.versione || "",
    image: v.immagine_url || "https://via.placeholder.com/800x600?text=No+Image",
    category: v.categoria,
    fuel: v.alimentazione,
    transmission: v.cambio,
    rates: {
      daily: { price: v.prezzo_giornaliero || 0, limit: `${v.km_giornaliero || 100} km`, label: "al giorno" },
      weekly: { price: v.prezzo_settimanale || 0, limit: `${v.km_settimanale || 500} km`, label: "a settimana" },
      monthly: { price: v.prezzo_mensile_breve || 0, limit: `${v.km_mensile_breve || 1500} km`, label: "al mese" }
    },
    deposit: v.cauzione_richiesta || 0,
    excess_cost: v.costo_per_km || 0
  })) || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Noleggio Breve Termine | DSAS Mobility" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Header", "client:component-export": "default" })} ${maybeRenderHead()}<main class="bg-gray-50 min-h-screen pb-20 pt-10"> <div class="container-custom">  <div class="text-center mb-16 pt-8"> <h1 class="text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary">
NOLEGGIO <span class="text-secondary">BREVE TERMINE</span> </h1> </div>  <div class="space-y-12"> ${SHORT_TERM_FLEET.map((vehicle) => renderTemplate`<div class="bg-white rounded-[20px] p-6 lg:p-10 shadow-sm border border-gray-100"> <div class="flex flex-col lg:flex-row gap-12 text-primary">  <div class="w-full lg:w-1/3 flex flex-col">  <div className="relative w-full aspect-[4/3] mb-6 flex items-center justify-center"> <a${addAttribute(`/veicoli/${vehicle.id}`, "href")} className="block w-full h-full hover:scale-105 transition-transform duration-300"> <img${addAttribute(vehicle.image, "src")}${addAttribute(`${vehicle.brand} ${vehicle.model}`, "alt")} class="object-contain w-full h-full max-h-[250px] mix-blend-multiply"> </a> </div>  <div class="mt-auto space-y-2 text-sm text-gray-600 pl-2"> <div class="flex items-center gap-2"> <div class="w-8 flex justify-center text-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> </div> <span class="font-bold text-primary">Categoria:</span> ${vehicle.category} </div> <div class="flex items-center gap-2"> <div class="w-8 flex justify-center text-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8"></path><path d="M12 10V2"></path><path d="m7 7 5-5 5 5"></path></svg> </div> <span class="font-bold text-primary">Alimentazione:</span> ${vehicle.fuel} </div> <div class="flex items-center gap-2"> <div class="w-8 flex justify-center text-primary"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg> </div> <span class="font-bold text-primary">Cambio:</span> ${vehicle.transmission} </div> </div> </div>  <div class="w-full lg:w-2/3">  <div class="mb-6"> <a${addAttribute(`/veicoli/${vehicle.id}`, "href")} className="group"> <h3 class="text-2xl font-bold uppercase text-primary group-hover:text-secondary transition-colors"> ${vehicle.brand} <span class="font-normal">${vehicle.model}</span> <span class="text-sm normal-case text-gray-500 ml-2 font-normal block md:inline">${vehicle.version}</span> </h3> </a> </div>  <div class="grid grid-cols-1 md:grid-cols-3 bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">  <div class="flex flex-col"> <div class="bg-[#21293c] text-white text-center py-2 font-bold uppercase text-sm tracking-wider">
Giornaliero
</div> <div class="p-6 text-center flex-grow flex flex-col justify-between items-center bg-white"> <div> <div class="flex items-baseline justify-center gap-1 mb-1"> <span class="text-3xl font-bold text-primary">${vehicle.rates.daily.price}€</span> <span class="text-xs text-gray-400">${vehicle.rates.daily.label}</span> </div> <p class="text-sm font-medium text-gray-600 mb-6">${vehicle.rates.daily.limit}</p> </div> ${renderComponent($$result2, "Button", Button, { "href": `/veicoli/${vehicle.id}`, "variant": "secondary", "size": "sm", "className": "w-full rounded-full text-xs uppercase font-bold tracking-wider py-2" }, { "default": async ($$result3) => renderTemplate`
Richiedi
` })} </div> </div>  <div class="flex flex-col"> <div class="bg-[#0f1521] text-white text-center py-2 font-bold uppercase text-sm tracking-wider">
Settimanale
</div> <div class="p-6 text-center flex-grow flex flex-col justify-between items-center bg-white"> <div> <div class="flex items-baseline justify-center gap-1 mb-1"> <span class="text-3xl font-bold text-primary">${vehicle.rates.weekly.price}€</span> <span class="text-xs text-gray-400">${vehicle.rates.weekly.label}</span> </div> <p class="text-sm font-medium text-gray-600 mb-6">${vehicle.rates.weekly.limit}</p> </div> ${renderComponent($$result2, "Button", Button, { "href": `/veicoli/${vehicle.id}`, "variant": "secondary", "size": "sm", "className": "w-full rounded-full text-xs uppercase font-bold tracking-wider py-2" }, { "default": async ($$result3) => renderTemplate`
Richiedi
` })} </div> </div>  <div class="flex flex-col"> <div class="bg-secondary text-white text-center py-2 font-bold uppercase text-sm tracking-wider">
Mensile
</div> <div class="p-6 text-center flex-grow flex flex-col justify-between items-center bg-white"> <div> <div class="flex items-baseline justify-center gap-1 mb-1"> <span class="text-3xl font-bold text-primary">${vehicle.rates.monthly.price}€</span> <span class="text-xs text-gray-400">${vehicle.rates.monthly.label}</span> </div> <p class="text-sm font-medium text-gray-600 mb-6">${vehicle.rates.monthly.limit}</p> </div> ${renderComponent($$result2, "Button", Button, { "href": `/veicoli/${vehicle.id}`, "variant": "secondary", "size": "sm", "className": "w-full rounded-full text-xs uppercase font-bold tracking-wider py-2" }, { "default": async ($$result3) => renderTemplate`
Richiedi
` })} </div> </div> </div>  <div class="mt-6 text-sm text-gray-500 flex flex-col md:flex-row gap-4 justify-between border-t border-gray-100 pt-4"> <p>Cauzione richiesta: <span class="font-semibold text-primary">${vehicle.deposit}€</span></p> <p>Costo per chilometro in eccesso: <span class="font-semibold text-primary">${vehicle.excess_cost.toFixed(2)}€</span></p> </div> </div> </div> </div>`)} </div> </div> </main> ${renderComponent($$result2, "Footer", Footer, {})} ` })}`;
}, "D:/dsas-mobility/src/pages/breve-termine.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/breve-termine.astro";
const $$url = "/breve-termine";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$BreveTermine,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
