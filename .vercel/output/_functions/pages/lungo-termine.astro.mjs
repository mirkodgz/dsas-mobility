import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dz3TRyfT.mjs';
import { H as Header, F as Footer } from '../chunks/Footer_BZ9xWnny.mjs';
import { s as supabase } from '../chunks/supabase_84VYV0jg.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useMemo } from 'react';
import { V as VehicleCard } from '../chunks/VehicleCard_CpRIKVL1.mjs';
export { renderers } from '../renderers.mjs';

function FiltersSidebar({ filters, setFilters, brands, categories }) {
  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-card shadow-soft p-6 border border-gray-100 h-full", children: [
    /* @__PURE__ */ jsx("h3", { className: "heading-3 text-primary mb-6 uppercase tracking-wide text-lg border-b border-gray-100 pb-4", children: "Filtra la tua ricerca" }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: "Marca" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.brand,
            onChange: (e) => handleChange("brand", e.target.value),
            className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all appearance-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Tutte le marche" }),
              brands.map((brand) => /* @__PURE__ */ jsx("option", { value: brand, children: brand }, brand))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: "Categoria" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.category,
            onChange: (e) => handleChange("category", e.target.value),
            className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all appearance-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Tutte le categorie" }),
              categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat, children: cat }, cat))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: "Alimentazione" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.fuel,
            onChange: (e) => handleChange("fuel", e.target.value),
            className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all appearance-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Qualsiasi" }),
              /* @__PURE__ */ jsx("option", { value: "Diesel", children: "Diesel" }),
              /* @__PURE__ */ jsx("option", { value: "Benzina", children: "Benzina" }),
              /* @__PURE__ */ jsx("option", { value: "Ibrida", children: "Ibrida" }),
              /* @__PURE__ */ jsx("option", { value: "Elettrica", children: "Elettrica" }),
              /* @__PURE__ */ jsx("option", { value: "GPL", children: "GPL" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide", children: "Cambio" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: filters.transmission,
            onChange: (e) => handleChange("transmission", e.target.value),
            className: "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all appearance-none cursor-pointer",
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Qualsiasi" }),
              /* @__PURE__ */ jsx("option", { value: "Manuale", children: "Manuale" }),
              /* @__PURE__ */ jsx("option", { value: "Automatico", children: "Automatico" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide flex justify-between", children: [
          /* @__PURE__ */ jsx("span", { children: "Canone Mensile (Max)" }),
          /* @__PURE__ */ jsxs("span", { className: "text-secondary", children: [
            "€ ",
            filters.maxPrice
          ] })
        ] }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: "200",
            max: "2000",
            step: "50",
            value: filters.maxPrice,
            onChange: (e) => handleChange("maxPrice", parseInt(e.target.value)),
            className: "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-secondary"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-xs text-gray-400 mt-1", children: [
          /* @__PURE__ */ jsx("span", { children: "€ 200" }),
          /* @__PURE__ */ jsx("span", { children: "€ 2000+" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setFilters({ brand: "", category: "", fuel: "", transmission: "", maxPrice: 2e3 }),
          className: "w-full bg-gray-100 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors uppercase tracking-wide text-sm flex items-center justify-center gap-2",
          children: "Reset Filtri"
        }
      ) })
    ] })
  ] });
}

function Catalog({ initialVehicles, brands, categories }) {
  const [filters, setFilters] = useState({
    brand: "",
    category: "",
    fuel: "",
    transmission: "",
    maxPrice: 2e3
  });
  const filteredVehicles = useMemo(() => {
    return initialVehicles.filter((v) => {
      if (filters.brand && v.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
      if (filters.category && v.category) {
        const vCat = v.category.toLowerCase().replace(/\s/g, "");
        const fCat = filters.category.toLowerCase().replace(/\s/g, "");
        if (!vCat.includes(fCat) && !fCat.includes(vCat)) return false;
      }
      if (filters.fuel && v.fuel.toLowerCase() !== filters.fuel.toLowerCase()) return false;
      if (filters.transmission && v.transmission.toLowerCase() !== filters.transmission.toLowerCase()) return false;
      if (v.price > filters.maxPrice) return false;
      return true;
    });
  }, [initialVehicles, filters]);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8 items-start", children: [
    /* @__PURE__ */ jsx("div", { className: "w-full lg:w-1/4 sticky top-24", children: /* @__PURE__ */ jsx(
      FiltersSidebar,
      {
        filters,
        setFilters,
        brands,
        categories
      }
    ) }),
    /* @__PURE__ */ jsxs("div", { className: "w-full lg:w-3/4", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-between items-center mb-6", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm font-semibold uppercase tracking-wider", children: [
        "Trovati ",
        /* @__PURE__ */ jsx("span", { className: "text-primary font-bold", children: filteredVehicles.length }),
        " veicoli"
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredVehicles.length > 0 ? filteredVehicles.map((vehicle, index) => /* @__PURE__ */ jsx("div", { className: "h-full", children: /* @__PURE__ */ jsx(VehicleCard, { vehicle }) }, index)) : /* @__PURE__ */ jsxs("div", { className: "col-span-full py-20 text-center bg-white rounded-card border-dashed border-2 border-gray-200", children: [
        /* @__PURE__ */ jsx("div", { className: "inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 text-gray-400", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
          /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
        ] }) }),
        /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-gray-800 mb-2", children: "Nessun veicolo trovato" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 max-w-sm mx-auto", children: "Prova a cambiare i filtri per vedere più risultati." }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setFilters({ brand: "", category: "", fuel: "", transmission: "", maxPrice: 2e3 }),
            className: "mt-6 px-6 py-2 bg-primary/10 text-primary font-bold rounded-lg hover:bg-primary/20 transition-colors",
            children: "Reset Filtri"
          }
        )
      ] }) })
    ] })
  ] });
}

const $$LungoTermine = createComponent(async ($$result, $$props, $$slots) => {
  const { data: vehiclesData } = await supabase.from("veicoli").select("*").not("noleggio_breve", "eq", true).order("created_at", { ascending: false });
  const UNIQUE_BRANDS = [...new Set(vehiclesData?.map((v) => v.marca).filter(Boolean))].sort();
  const UNIQUE_CATEGORIES = [...new Set(vehiclesData?.map((v) => v.categoria).filter(Boolean))].sort();
  const RENTAL_VEHICLES = vehiclesData?.map((v) => ({
    brand: v.marca,
    slug: v.slug,
    model: v.modello,
    version: v.versione || "",
    price: v.canone_mensile || 0,
    image: v.immagine_url || "https://via.placeholder.com/800x600?text=No+Image",
    fuel: v.alimentazione || "N/A",
    transmission: v.cambio || "N/A",
    available: v.tempo_consegna === "Pronta Consegna",
    category: v.categoria
    // Essential for filtering
  })) || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Header", "client:component-export": "default" })} ${maybeRenderHead()}<main class="bg-gray-50 min-h-screen pb-16 pt-10">  <div class="py-8"> <div class="container-custom">  <div class="text-center mb-16"> <h1 class="text-3xl md:text-5xl font-bold uppercase tracking-tight text-primary">
NOLEGGIO <span class="text-secondary">LUNGO TERMINE</span> </h1> </div>  ${renderComponent($$result2, "Catalog", Catalog, { "client:load": true, "initialVehicles": RENTAL_VEHICLES, "brands": UNIQUE_BRANDS, "categories": UNIQUE_CATEGORIES, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Catalog", "client:component-export": "default" })} </div> </div> </main> ${renderComponent($$result2, "Footer", Footer, {})} ` })}`;
}, "D:/dsas-mobility/src/pages/lungo-termine.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/lungo-termine.astro";
const $$url = "/lungo-termine";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$LungoTermine,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
