import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_BIIt-_jr.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { s as supabase } from '../../../chunks/supabase_84VYV0jg.mjs';
import { B as Button } from '../../../chunks/Button_CPrkWnPE.mjs';
export { renderers } from '../../../renderers.mjs';

function TableManager({ tableName, title, fields, orderBy = "name" }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const fetchData = async () => {
    setLoading(true);
    const { data: result, error } = await supabase.from(tableName).select("*").order(orderBy, { ascending: true });
    if (error) {
      console.error("Error fetching data:", error);
      alert(`Errore nel caricamento dei dati: ${error.message} (${error.code || "N/A"})`);
    } else {
      setData(result || []);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [tableName]);
  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      setFormData(item);
    } else {
      const emptyData = {};
      fields.forEach((f) => emptyData[f.key] = "");
      setFormData(emptyData);
    }
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let error;
    if (editingItem) {
      const { error: updateError } = await supabase.from(tableName).update(formData).eq("id", editingItem.id);
      error = updateError;
    } else {
      const { error: insertError } = await supabase.from(tableName).insert([formData]);
      error = insertError;
    }
    if (error) {
      console.error("Error saving:", error);
      alert("Errore nel salvataggio: " + error.message);
    } else {
      handleCloseModal();
      fetchData();
    }
  };
  const handleDelete = async (id) => {
    if (!confirm("Sei sicuro di voler eliminare questo elemento?")) return;
    const { error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) {
      console.error("Error deleting:", error);
      alert("Errore: impossibile eliminare (probabilmente è usato in altri record)");
    } else {
      fetchData();
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-8", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: title }),
        /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-sm mt-1", children: [
          "Gestisci le opzioni per ",
          title
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "primary", onClick: () => handleOpenModal(), children: /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }),
          /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })
        ] }),
        "Aggiungi"
      ] }) })
    ] }),
    loading ? /* @__PURE__ */ jsx("div", { className: "flex justify-center py-12", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-primary" }) }) : /* @__PURE__ */ jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-left border-collapse", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider", children: [
        fields.map((field) => /* @__PURE__ */ jsx("th", { className: "pb-4 font-semibold", children: field.label }, field.key)),
        /* @__PURE__ */ jsx("th", { className: "pb-4 font-semibold text-right", children: "Azioni" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { className: "divide-y divide-gray-50", children: data.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: fields.length + 1, className: "py-8 text-center text-gray-400", children: "Nessun dato presente" }) }) : data.map((item) => /* @__PURE__ */ jsxs("tr", { className: "group hover:bg-gray-50 transition-colors", children: [
        fields.map((field) => /* @__PURE__ */ jsx("td", { className: "py-4 font-medium text-gray-700", children: item[field.key] }, field.key)),
        /* @__PURE__ */ jsx("td", { className: "py-4 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleOpenModal(item),
              className: "p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors",
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
              onClick: () => handleDelete(item.id),
              className: "p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors",
              title: "Elimina",
              children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                /* @__PURE__ */ jsx("polyline", { points: "3 6 5 6 21 6" }),
                /* @__PURE__ */ jsx("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" }),
                /* @__PURE__ */ jsx("line", { x1: "10", y1: "11", x2: "10", y2: "17" }),
                /* @__PURE__ */ jsx("line", { x1: "14", y1: "11", x2: "14", y2: "17" })
              ] })
            }
          )
        ] }) })
      ] }, item.id)) })
    ] }) }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in", children: [
      /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50", children: [
        /* @__PURE__ */ jsxs("h3", { className: "font-bold text-lg text-gray-800", children: [
          editingItem ? "Modifica" : "Aggiungi",
          " elemento"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: handleCloseModal, className: "text-gray-400 hover:text-gray-600", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
          /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-4", children: [
        fields.map((field) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: field.label }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: field.type || "text",
              name: field.key,
              value: formData[field.key] || "",
              onChange: handleChange,
              className: "w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all",
              required: true
            }
          )
        ] }, field.key)),
        /* @__PURE__ */ jsxs("div", { className: "pt-4 flex justify-end gap-3", children: [
          /* @__PURE__ */ jsx(Button, { variant: "outline", type: "button", onClick: handleCloseModal, className: "border-gray-300 text-gray-600", children: "Annulla" }),
          /* @__PURE__ */ jsx(Button, { variant: "primary", type: "submit", children: editingItem ? "Salva Modifiche" : "Crea Elemento" })
        ] })
      ] })
    ] }) })
  ] });
}

const $$Astro = createAstro();
function getStaticPaths() {
  return [
    { params: { table: "marche" } },
    { params: { table: "categorie" } },
    { params: { table: "alimentazioni" } },
    { params: { table: "cambi" } },
    { params: { table: "tempi-consegna" } }
  ];
}
const $$table = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$table;
  const { table } = Astro2.params;
  const CONFIG = {
    "marche": {
      tableName: "marche",
      title: "Gestione Marche",
      fields: [
        { key: "nome", label: "Nome Marca", type: "text" }
      ],
      orderBy: "nome"
    },
    "categorie": {
      tableName: "categorie",
      title: "Gestione Categorie",
      fields: [
        { key: "nome", label: "Nome Categoria", type: "text" }
      ],
      orderBy: "nome"
    },
    "alimentazioni": {
      tableName: "alimentazioni",
      title: "Gestione Alimentazioni",
      fields: [
        { key: "nome", label: "Tipo Alimentazione", type: "text" }
      ],
      orderBy: "nome"
    },
    "cambi": {
      tableName: "cambi",
      title: "Gestione Cambi",
      fields: [
        { key: "nome", label: "Tipo Cambio", type: "text" }
      ],
      orderBy: "nome"
    },
    "tempi-consegna": {
      tableName: "tempi_consegna",
      title: "Gestione Tempi Consegna",
      fields: [
        { key: "nome", label: "Tempo Consegna", type: "text" }
      ],
      orderBy: "nome"
    }
  };
  const currentConfig = CONFIG[table || ""] || null;
  if (!currentConfig) {
    return Astro2.redirect("/404");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": currentConfig.title }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="text-3xl font-extrabold text-gray-900 font-heading">${currentConfig.title}</h1> <p class="text-gray-500 mt-2">Aggiungi, modifica o elimina le opzioni disponibili.</p> </div> ${renderComponent($$result2, "TableManager", TableManager, { "client:load": true, "tableName": currentConfig.tableName, "title": currentConfig.title, "fields": currentConfig.fields, "orderBy": currentConfig.orderBy, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/admin/TableManager", "client:component-export": "default" })} ` })}`;
}, "D:/dsas-mobility/src/pages/admin/config/[table].astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/admin/config/[table].astro";
const $$url = "/admin/config/[table]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$table,
    file: $$file,
    getStaticPaths,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
