import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead, p as Fragment, h as addAttribute } from '../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dz3TRyfT.mjs';
import { H as Header, F as Footer } from '../chunks/Footer_BZ9xWnny.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$ChiSiamo = createComponent(($$result, $$props, $$slots) => {
  const VALUES = [
    {
      title: "Esperienza Ventennale",
      text: "Non improvvisiamo. La nostra storia \xE8 fatta di competenza consolidata nel settore automotive.",
      icon: "award",
      colSpan: "md:col-span-2"
    },
    {
      title: "Trasparenza Totale",
      text: "Nessuna sorpresa. Contratti chiari e condizioni limpide dal primo preventivo.",
      icon: "file-check",
      colSpan: "md:col-span-1"
    },
    {
      title: "Consulenza Reale",
      text: "Non siamo un algoritmo. Siamo persone che ascoltano le tue esigenze reali.",
      icon: "users",
      colSpan: "md:col-span-1"
    },
    {
      title: "Assistenza Completa",
      text: "Dalla scelta dell'auto alla gestione burocratica, siamo sempre al tuo fianco.",
      icon: "phone",
      colSpan: "md:col-span-2"
    }
  ];
  const TEAM = [
    {
      name: "Alessandro Villa",
      role: "Fondatore & CEO",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Beatrice Romano",
      role: "Responsabile Commerciale",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Davide Esposito",
      role: "Fleet Manager",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Chiara Lombardi",
      role: "Customer Care Specialist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Chi Siamo | DSAS Mobility", "data-astro-cid-n4e7tuox": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Header", "client:component-export": "default", "data-astro-cid-n4e7tuox": true })} ${maybeRenderHead()}<main data-astro-cid-n4e7tuox>  <section class="py-20 lg:py-32 bg-white overflow-hidden relative" data-astro-cid-n4e7tuox> <div class="container-custom relative z-10" data-astro-cid-n4e7tuox> <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24" data-astro-cid-n4e7tuox>  <div class="lg:w-1/2" data-astro-cid-n4e7tuox> <span class="text-subtitle" data-astro-cid-n4e7tuox>La Nostra Visione</span> <h1 class="heading-1 text-primary mb-8 text-balance" data-astro-cid-n4e7tuox>
Più di un Noleggio, <br data-astro-cid-n4e7tuox> <span class="text-secondary" data-astro-cid-n4e7tuox>una Promessa.</span> </h1> <p class="text-lead text-gray-500 mb-10 max-w-lg" data-astro-cid-n4e7tuox>
DSAS Mobility ridefinisce il concetto di possesso dell'auto. Siamo il ponte tra le tue esigenze di movimento e la libertà di guidare senza pensieri.
</p> </div>  <div class="lg:w-1/2 relative" data-astro-cid-n4e7tuox>  <div class="absolute -top-10 -right-10 w-[120%] h-[120%] bg-gray-50 rounded-full blur-3xl opacity-50 -z-10" data-astro-cid-n4e7tuox></div> <div class="relative grid grid-cols-1 sm:grid-cols-2 gap-6" data-astro-cid-n4e7tuox> <div class="transform sm:translate-y-12" data-astro-cid-n4e7tuox> <img src="https://img.freepik.com/foto-gratis/vista-frontal-mujer-conduciendo-divirtiendose_23-2148691783.jpg?semt=ais_hybrid&w=740&q=80" class="rounded-[20px] shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover animate-float" alt="Woman Driving" data-astro-cid-n4e7tuox> </div> <div data-astro-cid-n4e7tuox> <img src="https://i.pinimg.com/736x/1c/df/31/1cdf31c9cc3e47fce0db9d5dd886597f.jpg" class="rounded-[20px] shadow-2xl w-full h-64 sm:h-80 lg:h-96 object-cover animate-float-delayed" alt="Car Lifestyle" data-astro-cid-n4e7tuox> </div> </div> </div> </div> </div> </section>  <section class="py-24 bg-gray-50" data-astro-cid-n4e7tuox> <div class="container-custom" data-astro-cid-n4e7tuox> <div class="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24" data-astro-cid-n4e7tuox> <div class="lg:w-1/2 relative" data-astro-cid-n4e7tuox> <div class="absolute -top-4 -left-4 w-24 h-24 bg-secondary/10 rounded-full -z-10" data-astro-cid-n4e7tuox></div> <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" alt="DSAS Mobility Meeting" class="rounded-[20px] shadow-2xl w-full object-cover h-64 lg:h-[500px] animate-float" data-astro-cid-n4e7tuox> </div> <div class="lg:w-1/2" data-astro-cid-n4e7tuox> <span class="text-subtitle" data-astro-cid-n4e7tuox>Chi Siamo</span> <h2 class="heading-2 text-primary mb-6" data-astro-cid-n4e7tuox>Un punto di riferimento per la mobilità moderna.</h2> <div class="space-y-6 text-lg text-gray-500 leading-relaxed" data-astro-cid-n4e7tuox> <p data-astro-cid-n4e7tuox> <strong class="text-primary font-bold" data-astro-cid-n4e7tuox>DSAS Mobility</strong> non è solo un'agenzia di noleggio, è il tuo consulente personale nel complesso mondo dell'automotive.
</p> <p data-astro-cid-n4e7tuox>
Nati come partner strategico di <strong class="text-primary" data-astro-cid-n4e7tuox>GA Mobility</strong>, uniamo la forza contrattuale di un grande gruppo nazionale con la cura e l'attenzione al dettaglio di una boutique locale.
</p> <p data-astro-cid-n4e7tuox>
Che tu sia un privato alla ricerca della tua prima auto a noleggio, o un Fleet Manager che deve gestire una flotta complessa, il nostro approccio rimane lo stesso: <strong data-astro-cid-n4e7tuox>ascolto, analisi, soluzione.</strong> </p> <ul class="space-y-3 mt-4" data-astro-cid-n4e7tuox> <li class="flex items-center gap-3" data-astro-cid-n4e7tuox> <div class="w-2 h-2 rounded-full bg-secondary" data-astro-cid-n4e7tuox></div> <span data-astro-cid-n4e7tuox>Specialisti in Noleggio a Lungo Termine</span> </li> <li class="flex items-center gap-3" data-astro-cid-n4e7tuox> <div class="w-2 h-2 rounded-full bg-secondary" data-astro-cid-n4e7tuox></div> <span data-astro-cid-n4e7tuox>Soluzioni flessibili Breve e Medio Termine</span> </li> <li class="flex items-center gap-3" data-astro-cid-n4e7tuox> <div class="w-2 h-2 rounded-full bg-secondary" data-astro-cid-n4e7tuox></div> <span data-astro-cid-n4e7tuox>Gestione pratiche e burocrazia inclusa</span> </li> </ul> </div> </div> </div> </div> </section>  <section class="bg-gray-900 py-24 text-white" data-astro-cid-n4e7tuox> <div class="container-custom" data-astro-cid-n4e7tuox> <div class="text-center mb-16 max-w-2xl mx-auto" data-astro-cid-n4e7tuox> <span class="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block" data-astro-cid-n4e7tuox>Perché Sceglierci</span> <h2 class="heading-2 text-white mb-6" data-astro-cid-n4e7tuox>"Il nostro obiettivo è renderti libero di muoverti, senza il peso della proprietà."</h2> </div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12" data-astro-cid-n4e7tuox> ${VALUES.map((value) => renderTemplate`<div class="text-center group" data-astro-cid-n4e7tuox> <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-secondary mb-6 mx-auto group-hover:bg-secondary group-hover:text-white transition-colors duration-300 border border-white/5" data-astro-cid-n4e7tuox> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-astro-cid-n4e7tuox> ${value.icon === "award" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-n4e7tuox": true }, { "default": ($$result3) => renderTemplate`<circle cx="12" cy="8" r="7" data-astro-cid-n4e7tuox></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" data-astro-cid-n4e7tuox></polyline>` })}`} ${value.icon === "users" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-n4e7tuox": true }, { "default": ($$result3) => renderTemplate`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" data-astro-cid-n4e7tuox></path><circle cx="9" cy="7" r="4" data-astro-cid-n4e7tuox></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87" data-astro-cid-n4e7tuox></path><path d="M16 3.13a4 4 0 0 1 0 7.75" data-astro-cid-n4e7tuox></path>` })}`} ${value.icon === "file-check" && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-n4e7tuox": true }, { "default": ($$result3) => renderTemplate`<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" data-astro-cid-n4e7tuox></path><polyline points="14 2 14 8 20 8" data-astro-cid-n4e7tuox></polyline><path d="M9 15l2 2 4-4" data-astro-cid-n4e7tuox></path>` })}`} ${value.icon === "phone" && renderTemplate`<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" data-astro-cid-n4e7tuox></path>`} </svg> </div> <h3 class="text-xl font-bold text-white mb-3" data-astro-cid-n4e7tuox>${value.title}</h3> <p class="text-gray-400 leading-relaxed text-sm" data-astro-cid-n4e7tuox>${value.text}</p> </div>`)} </div> </div> </section>  <section class="py-24 bg-white overflow-hidden" data-astro-cid-n4e7tuox> <div class="container-custom" data-astro-cid-n4e7tuox> <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6" data-astro-cid-n4e7tuox> <div class="max-w-xl" data-astro-cid-n4e7tuox> <span class="text-subtitle" data-astro-cid-n4e7tuox>Il Nostro Team</span> <h2 class="heading-2 text-primary" data-astro-cid-n4e7tuox>Esperti al tuo fianco</h2> </div> <div class="hidden md:block h-px bg-gray-100 flex-grow ml-12 mb-4" data-astro-cid-n4e7tuox></div> </div> <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8" data-astro-cid-n4e7tuox> ${TEAM.map((member, i) => renderTemplate`<div class="group animate-float"${addAttribute({ animationDelay: `${i * 0.2}s` }, "style")} data-astro-cid-n4e7tuox> <div class="relative overflow-hidden rounded-xl mb-6 shadow-lg bg-gray-100 h-96" data-astro-cid-n4e7tuox> <img${addAttribute(member.image, "src")}${addAttribute(member.name, "alt")} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" data-astro-cid-n4e7tuox> <div class="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" data-astro-cid-n4e7tuox></div> </div> <h3 class="text-xl font-bold text-primary" data-astro-cid-n4e7tuox>${member.name}</h3> <p class="text-secondary font-medium uppercase text-sm tracking-wider mt-1" data-astro-cid-n4e7tuox>${member.role}</p> </div>`)} </div> </div> </section> </main> ${renderComponent($$result2, "Footer", Footer, { "data-astro-cid-n4e7tuox": true })} ` })} `;
}, "D:/dsas-mobility/src/pages/chi-siamo.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/chi-siamo.astro";
const $$url = "/chi-siamo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$ChiSiamo,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
