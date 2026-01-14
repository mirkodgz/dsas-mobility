import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dz3TRyfT.mjs';
import { H as Header, F as Footer } from '../chunks/Footer_BZ9xWnny.mjs';
import { B as Button } from '../chunks/Button_CPrkWnPE.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { V as VehicleCard } from '../chunks/VehicleCard_CpRIKVL1.mjs';
import { s as supabase } from '../chunks/supabase_84VYV0jg.mjs';
export { renderers } from '../renderers.mjs';

function OffersCarousel({ vehicles }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const maxIndex = Math.max(0, vehicles.length - itemsPerPage);
  const nextSlide = () => {
    setCurrentIndex((prev) => prev >= maxIndex ? 0 : prev + 1);
  };
  const prevSlide = () => {
    setCurrentIndex((prev) => prev <= 0 ? maxIndex : prev - 1);
  };
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4e3);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, itemsPerPage]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: "relative group px-0 md:px-12",
      onMouseEnter: () => setIsPaused(true),
      onMouseLeave: () => setIsPaused(false),
      onTouchStart: () => setIsPaused(true),
      onTouchEnd: () => setIsPaused(false),
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: prevSlide,
            className: "hidden md:block absolute -left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-primary hover:text-secondary transition-colors",
            "aria-label": "Previous",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "15 18 9 12 15 6" }) })
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "overflow-hidden md:p-4 -mx-4 md:mx-0 px-4 md:px-0", children: /* @__PURE__ */ jsx(
          "div",
          {
            className: "flex transition-transform duration-700 ease-in-out",
            style: { transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)` },
            children: vehicles.map((vehicle, index) => /* @__PURE__ */ jsx(
              "div",
              {
                style: { flex: `0 0 ${100 / itemsPerPage}%` },
                className: "h-full px-4",
                children: /* @__PURE__ */ jsx(VehicleCard, { vehicle })
              },
              index
            ))
          }
        ) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: nextSlide,
            className: "hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-primary hover:text-secondary transition-colors",
            "aria-label": "Next",
            children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "48", height: "48", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex md:hidden justify-center gap-4 mt-6", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: prevSlide,
              className: "p-3 bg-white rounded-full shadow-md text-primary",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "15 18 9 12 15 6" }) })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: nextSlide,
              className: "p-3 bg-white rounded-full shadow-md text-primary",
              children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "9 18 15 12 9 6" }) })
            }
          )
        ] })
      ]
    }
  );
}

const BRANDS = [
  { name: "Fiat", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Fiat_Automobiles_logo.svg/2048px-Fiat_Automobiles_logo.svg.png" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Audi-Logo_2016.svg/1024px-Audi-Logo_2016.svg.png" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1024px-BMW.svg.png" },
  { name: "Mercedes", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Mercedes-Benz_Star_2022.svg/1024px-Mercedes-Benz_Star_2022.svg.png" },
  { name: "Volkswagen", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1024px-Volkswagen_logo_2019.svg.png" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/640px-Tesla_logo.png" },
  { name: "Jeep", logo: "https://liberadores.es/wp-content/uploads/2018/02/Jeep-logo-3D-2560x1440-e1519302285966.png" },
  { name: "Peugeot", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Peugeot_Logo.svg/1024px-Peugeot_Logo.svg.png" },
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1024px-Toyota_carlogo.svg.png" },
  { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1024px-Ford_logo_flat.svg.png" }
];
function BrandsMarquee() {
  return /* @__PURE__ */ jsx("div", { className: "w-full overflow-hidden bg-white py-10 border-b border-gray-100", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute left-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-0 bottom-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" }),
    /* @__PURE__ */ jsxs("div", { className: "flex w-max animate-loop-scroll hover:pause-animation", children: [
      BRANDS.map((brand, index) => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mx-8 w-32 h-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: brand.logo,
          alt: brand.name,
          className: "max-w-full max-h-full object-contain",
          loading: "lazy",
          onError: (e) => {
            e.target.style.display = "none";
          }
        }
      ) }, `brand-${index}`)),
      BRANDS.map((brand, index) => /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center mx-8 w-32 h-20 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: brand.logo,
          alt: brand.name,
          className: "max-w-full max-h-full object-contain",
          loading: "lazy",
          onError: (e) => {
            e.target.style.display = "none";
          }
        }
      ) }, `brand-dup-${index}`))
    ] })
  ] }) });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: featuredData } = await supabase.from("veicoli").select("*").eq("promo", true).order("created_at", { ascending: false });
  const FEATURED_VEHICLES = featuredData?.map((v) => ({
    brand: v.marca,
    model: v.modello,
    version: v.versione || "",
    price: v.canone_mensile || 0,
    image: v.immagine_url || "https://via.placeholder.com/800x600?text=No+Image",
    fuel: v.alimentazione || "N/A",
    transmission: v.cambio || "N/A",
    available: v.tempo_consegna === "Pronta Consegna",
    slug: v.slug
  })) || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Header", "client:component-export": "default" })} ${maybeRenderHead()}<main>  <section class="relative bg-primary py-24 lg:py-60 text-white overflow-hidden">  <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center"></div> <div class="absolute inset-0 bg-primary/70"></div> <div class="relative container-custom text-center z-10"> <div class="animate-fade-in-up px-4"> <h1 class="heading-1 mb-4 md:mb-6 text-4xl md:text-6xl">
DSAS <span class="text-secondary">MOBILITY</span> </h1> <p class="text-white max-w-4xl mx-auto text-lg md:text-2xl font-bold leading-relaxed drop-shadow-md">
Scopri la libertà di guidare un'auto nuova <span class="text-secondary">senza pensieri</span>. <br class="hidden md:block">
Il canone <span class="text-secondary">All-Inclusive</span> che trasforma il tuo viaggio in pura emozione.
</p>  <div class="mt-8 md:mt-12 bg-white p-3 sm:p-2 rounded-[2rem] sm:rounded-full shadow-2xl flex flex-col sm:flex-row gap-3 sm:gap-2 max-w-lg mx-auto"> <input type="text" placeholder="Che auto cerchi?" class="flex-grow px-6 py-3 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none text-center sm:text-left"> ${renderComponent($$result2, "Button", Button, { "variant": "primary", "className": "rounded-full whitespace-nowrap px-8 py-3 w-full sm:w-auto shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" }, { "default": async ($$result3) => renderTemplate`
Cerca Auto
` })} </div> </div> </div> </section>   ${renderComponent($$result2, "BrandsMarquee", BrandsMarquee, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/BrandsMarquee", "client:component-export": "default" })}  <div class="bg-gray-50 py-16"> <div class="container-custom relative z-20">  <div class="text-center mb-16"> <h2 class="text-3xl md:text-5xl font-bold uppercase tracking-tight"> <span class="text-primary">NUOVE</span>${" "} <span class="text-secondary">OFFERTE</span>${" "} <span class="text-primary">DEL MESE</span> </h2> </div>  ${renderComponent($$result2, "OffersCarousel", OffersCarousel, { "vehicles": FEATURED_VEHICLES, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/dsas-mobility/src/components/OffersCarousel", "client:component-export": "default" })} </div> </div>  <section class="py-24 bg-white overflow-hidden"> <div class="container-custom"> <div class="text-center mb-20"> <span class="text-subtitle">Cosa offriamo</span> <h2 class="heading-2 text-primary">La Soluzione per Ogni Viaggio</h2> </div> <div class="space-y-24">  <div class="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 group"> <div class="w-full lg:w-1/2 relative z-10"> <div class="relative rounded-3xl overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]"> <div class="absolute inset-0 bg-primary/20 group-hover:bg-transparent transition-colors z-10"></div> <img src="https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1000" alt="Noleggio Breve Termine" class="w-full h-auto object-cover aspect-[4/3]">  <div class="absolute bottom-8 left-8 z-20 bg-white/90 backdrop-blur text-primary px-6 py-3 rounded-2xl font-bold border border-white">
Da 39€ /giorno
</div> </div> </div> <div class="w-full lg:w-1/2"> <div class="flex items-center gap-4 mb-6"> <div class="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" transform="rotate(90 12 13)"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="8" y1="10" x2="8" y2="10.01"></line><line x1="12" y1="10" x2="12" y2="10.01"></line><line x1="16" y1="10" x2="16" y2="10.01"></line><line x1="8" y1="14" x2="8" y2="14.01"></line><line x1="12" y1="14" x2="12" y2="14.01"></line><line x1="16" y1="14" x2="16" y2="14.01"></line></svg> </div> <h3 class="heading-2 text-primary">Breve Termine</h3> </div> <p class="text-lead text-gray-500 mb-8">
Hai bisogno di un'auto per il weekend o per una trasferta di lavoro? Il nostro noleggio breve termine è la risposta: flessibile, veloce e senza sorprese.
</p> <ul class="space-y-4 mb-10"> <li class="flex items-start gap-4"> <span class="mt-1 w-2 h-2 rounded-full bg-secondary flex-shrink-0"></span> <span class="text-gray-600 font-medium text-lg">Prenotazione online in 2 minuti</span> </li> <li class="flex items-start gap-4"> <span class="mt-1 w-2 h-2 rounded-full bg-secondary flex-shrink-0"></span> <span class="text-gray-600 font-medium text-lg">Assicurazione Kasko inclusa</span> </li> <li class="flex items-start gap-4"> <span class="mt-1 w-2 h-2 rounded-full bg-secondary flex-shrink-0"></span> <span class="text-gray-600 font-medium text-lg">Cancellazione gratuita fino a 24h</span> </li> </ul> ${renderComponent($$result2, "Button", Button, { "href": "/breve-termine", "as": "a", "variant": "primary", "size": "lg", "className": "px-10" }, { "default": async ($$result3) => renderTemplate`
Vedi Le Auto
` })} </div> </div>  <div class="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20 group"> <div class="w-full lg:w-1/2 relative z-10"> <div class="relative rounded-3xl overflow-hidden transform transition-transform duration-700 group-hover:scale-[1.02]"> <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div> <img src="https://images.unsplash.com/photo-1550355291-bbee04a92027?q=80&w=1000" alt="Noleggio Lungo Termine" class="w-full h-auto object-cover aspect-[4/3]">  <div class="absolute bottom-8 right-8 z-20 bg-primary/90 backdrop-blur text-white px-6 py-3 rounded-2xl font-bold border border-white/10">
Tutto incluso
</div> </div> </div> <div class="w-full lg:w-1/2"> <div class="flex items-center gap-4 mb-6"> <div class="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> </div> <h3 class="heading-2 text-primary">Lungo Termine</h3> </div> <p class="text-lead text-gray-500 mb-8">
La soluzione definitiva per privati e aziende. Guida l'auto dei tuoi sogni con un unico canone mensile che copre ogni spesa.
</p> <ul class="space-y-4 mb-10"> <li class="flex items-start gap-4"> <span class="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span> <span class="text-gray-600 font-medium text-lg">Zero anticipo disponibile</span> </li> <li class="flex items-start gap-4"> <span class="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span> <span class="text-gray-600 font-medium text-lg">Manutenzione, bollo e assicurazione</span> </li> <li class="flex items-start gap-4"> <span class="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></span> <span class="text-gray-600 font-medium text-lg">Permuta del tuo usato valutata al massimo</span> </li> </ul> ${renderComponent($$result2, "Button", Button, { "href": "/lungo-termine", "as": "a", "variant": "outline", "size": "lg", "className": "px-10 border-primary text-primary hover:bg-primary hover:text-white" }, { "default": async ($$result3) => renderTemplate`
Scopri i Vantaggi
` })} </div> </div> </div> </div> </section>    <section class="py-24 bg-white border-b border-gray-100"> <div class="container-custom">  <div class="text-center max-w-3xl mx-auto mb-16"> <span class="text-subtitle">Vantaggi</span> <h2 class="heading-2 text-primary">Perché noleggiare invece di acquistare?</h2> </div> <div class="flex flex-col lg:flex-row items-center gap-20">  <div class="lg:w-1/2 relative order-2 lg:order-1"> <div class="relative rounded-3xl overflow-hidden shadow-2xl h-[600px]"> <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop" alt="Modern Corporate Architecture" class="w-full h-full object-cover"> <div class="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>   <div class="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 text-white shadow-xl"> <p class="font-medium text-xl md:text-2xl leading-relaxed text-center">
"La scelta migliore per la mobilità aziendale. Servizio impeccabile e una gestione burocratica pari a zero."
</p> </div> </div> </div>  <div class="lg:w-1/2 order-1 lg:order-2"> <p class="text-lead text-gray-500 mb-10">
Dimentica la svalutazione e le spese impreviste. Il noleggio a lungo termine è la scelta intelligente per chi cerca certezze e flessibilità.
</p> <div class="space-y-8">  <div class="flex gap-6 group"> <div class="w-16 h-16 bg-white border-2 border-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> </div> <div> <h4 class="font-bold text-primary text-xl mb-2">Costi Certi e Fissi</h4> <p class="text-gray-500 leading-relaxed">Un unico canone mensile che include tutto. Nessuna maxi-rata finale a sorpresa, solo la certezza delle tue spese.</p> </div> </div>  <div class="flex gap-6 group"> <div class="w-16 h-16 bg-white border-2 border-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path></svg> </div> <div> <h4 class="font-bold text-primary text-xl mb-2">Manutenzione Inclusa</h4> <p class="text-gray-500 leading-relaxed">Tagliandi, revisioni e riparazioni straordinarie sono già pagate. Guida senza pensieri e senza costi extra.</p> </div> </div>  <div class="flex gap-6 group"> <div class="w-16 h-16 bg-white border-2 border-primary/10 rounded-2xl flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-all duration-300 flex-shrink-0"> <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg> </div> <div> <h4 class="font-bold text-primary text-xl mb-2">Nessuna Svalutazione</h4> <p class="text-gray-500 leading-relaxed">Il valore dell'auto scende ogni giorno. Con il noleggio, la svalutazione non è più un tuo problema finanziario.</p> </div> </div> </div> </div> </div> </div> </section>  <section class="py-24 bg-primary text-white relative overflow-hidden">  <div class="absolute inset-0 opacity-10" style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 32px 32px;"></div> <div class="container-custom relative z-10"> <div class="text-center max-w-2xl mx-auto mb-16"> <span class="text-subtitle">Semplice e Veloce</span> <h2 class="font-bold text-3xl lg:text-5xl mb-6">Come funziona il Noleggio?</h2> <p class="text-gray-300 text-lg">In soli 3 passaggi puoi metterti alla guida della tua nuova auto. Tutto digitale, zero stress.</p> </div> <div class="grid md:grid-cols-3 gap-12 relative">  <div class="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent border-t border-dashed border-white/20"></div>  <div class="relative flex flex-col items-center text-center"> <div class="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-white text-3xl font-bold mb-8 shadow-xl shadow-secondary/30 z-10 border-4 border-primary">
1
</div> <h3 class="text-2xl font-bold mb-4">Scegli l'Auto</h3> <p class="text-gray-400 leading-relaxed">
Sfoglia il nostro catalogo e trova il modello perfetto per le tue esigenze. Puoi filtrare per budget, marca o alimentazione.
</p> </div>  <div class="relative flex flex-col items-center text-center"> <div class="w-24 h-24 bg-white text-primary rounded-full flex items-center justify-center text-3xl font-bold mb-8 shadow-xl z-10 border-4 border-primary">
2
</div> <h3 class="text-2xl font-bold mb-4">Richiedi Offerta</h3> <p class="text-gray-400 leading-relaxed">
Compila il modulo o scrivici su WhatsApp. Un nostro consulente ti invierà un preventivo personalizzato in <span class="text-white font-bold">24 ore</span>.
</p> </div>  <div class="relative flex flex-col items-center text-center"> <div class="w-24 h-24 bg-white text-primary rounded-full flex items-center justify-center text-3xl font-bold mb-8 shadow-xl z-10 border-4 border-primary">
3
</div> <h3 class="text-2xl font-bold mb-4">Guida Senza Pensieri</h3> <p class="text-gray-400 leading-relaxed">
Una volta approvato, ritira l'auto (o ricevila a casa!). Manutenzione, assicurazione e soccorso sono tutti inclusi.
</p> </div> </div> <div class="text-center mt-16"> ${renderComponent($$result2, "Button", Button, { "variant": "primary", "size": "lg", "className": "transform hover:-translate-y-1" }, { "default": async ($$result3) => renderTemplate`
Inizia Ora
` })} </div> </div> </section> </main> ${renderComponent($$result2, "Footer", Footer, {})} ` })}`;
}, "D:/dsas-mobility/src/pages/index.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
