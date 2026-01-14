import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_BIIt-_jr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { s as supabase } from '../../chunks/supabase_84VYV0jg.mjs';
export { renderers } from '../../renderers.mjs';

function VehicleList({ initialVehicles }) {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const handleDelete = async (id) => {
    if (!confirm("Sei sicuro di voler eliminare questo veicolo? Questa azione non può essere annullata.")) {
      return;
    }
    setDeletingId(id);
    try {
      const { error } = await supabase.from("veicoli").delete().eq("id", id);
      if (error) throw error;
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    } catch (error) {
      console.error("Error deleting vehicle:", error);
      alert("Errore durante l'eliminazione del veicolo.");
    } finally {
      setDeletingId(null);
    }
  };
  const filteredVehicles = vehicles.filter(
    (vehicle) => vehicle.titolo.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.marca.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.modello.toLowerCase().includes(searchTerm.toLowerCase()) || vehicle.targa && vehicle.targa.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "relative w-full md:w-96", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none", children: /* @__PURE__ */ jsx("svg", { className: "h-5 w-5 text-gray-400", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", children: /* @__PURE__ */ jsx("path", { fillRule: "evenodd", d: "M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z", clipRule: "evenodd" }) }) }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Cerca veicolo per marca, modello o titolo...",
            className: "pl-10 pr-4 py-2 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "text-sm text-gray-500", children: [
        "Totale Veicoli: ",
        /* @__PURE__ */ jsx("span", { className: "font-bold text-gray-900", children: vehicles.length })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold", children: [
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Veicolo" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Titolo / Info" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Prezzo" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4", children: "Tipo" }),
        /* @__PURE__ */ jsx("th", { className: "px-6 py-4 text-right", children: "Azioni" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-100", children: filteredVehicles.length > 0 ? filteredVehicles.map((vehicle) => /* @__PURE__ */ jsxs("tr", { className: "hover:bg-gray-50/50 transition-colors group", children: [
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 w-24", children: /* @__PURE__ */ jsx("div", { className: "h-16 w-24 rounded-lg bg-gray-100 overflow-hidden border border-gray-200 relative", children: vehicle.immagine_url ? /* @__PURE__ */ jsx(
          "img",
          {
            src: vehicle.immagine_url,
            alt: vehicle.titolo,
            className: "w-full h-full object-cover"
          }
        ) : /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-full text-gray-400", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("image", { x: "1", y: "1", width: "22", height: "22" }) }) }) }) }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsx("div", { className: "font-bold text-gray-900 mb-1", children: vehicle.titolo }),
          /* @__PURE__ */ jsxs("div", { className: "text-xs text-gray-500 font-medium", children: [
            vehicle.marca,
            " ",
            vehicle.modello,
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-gray-300 mx-1", children: "|" }),
            " ",
            vehicle.versione
          ] })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "font-bold text-primary", children: [
            "€ ",
            vehicle.canone_mensile || vehicle.noleggio_breve ? "Variabile" : "0"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "text-xs text-gray-400", children: "Canone/Mese" })
        ] }),
        /* @__PURE__ */ jsxs("td", { className: "px-6 py-4", children: [
          vehicle.noleggio_breve ? /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 border border-orange-200", children: "Breve" }) : /* @__PURE__ */ jsx("span", { className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200", children: "Lungo" }),
          vehicle.promo && /* @__PURE__ */ jsx("span", { className: "ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200", children: "Promo" })
        ] }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/admin/veicoli/edit/${vehicle.id}`,
              className: "p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors",
              title: "Modifica",
              children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("path", { d: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" }),
                /* @__PURE__ */ jsx("path", { d: "M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(vehicle.id),
              disabled: deletingId === vehicle.id,
              className: "p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50",
              title: "Elimina",
              children: deletingId === vehicle.id ? /* @__PURE__ */ jsx("div", { className: "animate-spin h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full" }) : /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("polyline", { points: "3 6 5 6 21 6" }),
                /* @__PURE__ */ jsx("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
                /* @__PURE__ */ jsx("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
                /* @__PURE__ */ jsx("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
              ] })
            }
          )
        ] }) })
      ] }, vehicle.id)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: 5, className: "px-6 py-12 text-center text-gray-400", children: searchTerm ? "Nessun veicolo trovato per questa ricerca." : "Nessun veicolo presente nel database." }) }) })
    ] }) })
  ] });
}

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { data: vehicles } = await supabase.from("veicoli").select("id, titolo, marca, modello, versione, canone_mensile, immagine_url, promo, noleggio_breve").order("created_at", { ascending: false });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Lista Veicoli" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full py-6"> <div class="flex justify-between items-end mb-6"> <div> <h1 class="text-2xl font-bold text-gray-800">Gestione Veicoli</h1> <p class="text-gray-500 text-sm mt-1">Visualizza, modifica o elimina i veicoli del parco auto.</p> </div> <a href="/admin/veicoli/create" class="bg-primary text-white font-bold py-2.5 px-5 rounded-lg hover:bg-primary/90 transition-colors shadow-lg shadow-blue-900/10 flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
Nuovo Veicolo
</a> </div> ${renderComponent($$result2, "VehicleList", VehicleList, { "initialVehicles": vehicles || [], "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/admin/VehicleList", "client:component-export": "default" })} </div> ` })}`;
}, "D:/dsas-mobility/src/pages/admin/veicoli/index.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/admin/veicoli/index.astro";
const $$url = "/admin/veicoli";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
