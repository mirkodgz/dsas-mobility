import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Dz3TRyfT.mjs';
import { H as Header, F as Footer } from '../../chunks/Footer_BZ9xWnny.mjs';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button } from '../../chunks/Button_CPrkWnPE.mjs';
import { s as supabase } from '../../chunks/supabase_84VYV0jg.mjs';
export { renderers } from '../../renderers.mjs';

const MONTH_OPTIONS = [24, 36, 48, 60];
const KM_OPTIONS = ["10.000", "15.000", "20.000", "25.000", "30.000", "35.000", "40.000"];
function Configurator({
  initialMonths = 36,
  initialDistance = "15.000",
  basePrice,
  vehicleTitle = "Veicolo Selezionato",
  vehicleVersion = "",
  image,
  onSubmit
}) {
  const [selectedMonths, setSelectedMonths] = useState(initialMonths);
  const [selectedDistance, setSelectedDistance] = useState(initialDistance);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState("privato");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    fiscalCode: "",
    message: "",
    privacy: false,
    marketing: false
  });
  const handleKmChange = (val) => {
    setSelectedDistance(val);
  };
  let distanceIndex = KM_OPTIONS.indexOf(selectedDistance);
  if (distanceIndex === -1) {
    const normalized = KM_OPTIONS.find((opt) => opt.replace(".", "") === selectedDistance.toString().replace(".", ""));
    if (normalized) {
      distanceIndex = KM_OPTIONS.indexOf(normalized);
      if (normalized !== selectedDistance) setSelectedDistance(normalized);
    } else {
      distanceIndex = 1;
    }
  }
  const sliderPercentage = distanceIndex / (KM_OPTIONS.length - 1) * 100;
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", {
      vehicle: vehicleTitle,
      version: vehicleVersion,
      config: { months: selectedMonths, km: selectedDistance },
      user: { type: userType, ...formData }
    });
    setIsModalOpen(false);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-[20px] p-6 shadow-soft border border-gray-100", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-secondary font-extrabold tracking-widest uppercase text-lg mb-2 block !text-primary !mb-4", children: "COSTRUISCI LA TUA OFFERTA" }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mb-6", children: "Richiedi il tuo preventivo personalizzato" }),
      /* @__PURE__ */ jsxs("div", { className: "mb-6", children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-3", children: [
          "Seleziona i mesi di ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Noleggio" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2", children: MONTH_OPTIONS.map((m) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSelectedMonths(m),
            className: `py-2 px-1 rounded-full text-sm font-bold border transition-all ${selectedMonths === m ? "bg-primary text-white border-primary shadow-lg shadow-primary/30" : "bg-white text-gray-400 border-gray-200 hover:border-primary/50"}`,
            children: m
          },
          m
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxs("label", { className: "block text-sm font-bold text-gray-700 mb-3", children: [
          "Seleziona i ",
          /* @__PURE__ */ jsx("span", { className: "text-primary", children: "Chilometri Annui" })
        ] }),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "w-full bg-gray-200 rounded-full h-1.5 mb-4 relative cursor-pointer flex items-center",
            onClick: (e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = x / rect.width;
              const index = Math.round(percentage * (KM_OPTIONS.length - 1));
              const safeIndex = Math.max(0, Math.min(index, KM_OPTIONS.length - 1));
              handleKmChange(KM_OPTIONS[safeIndex]);
            },
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute left-0 h-full bg-primary/20 rounded-full transition-all duration-300 ease-out",
                  style: { width: `${sliderPercentage}%` }
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "absolute w-5 h-5 bg-secondary border-2 border-white rounded-full shadow-md transition-all duration-300 ease-out z-10 hover:scale-110",
                  style: {
                    left: `${sliderPercentage}%`,
                    top: "50%",
                    transform: "translate(-50%, -50%)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "flex justify-between text-[10px] font-medium px-1", children: KM_OPTIONS.map((km) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handleKmChange(km),
            className: `${selectedDistance === km ? "text-secondary font-bold scale-110" : "text-gray-400 hover:text-gray-600"} transition-all`,
            children: km
          },
          km
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-6", children: [
        /* @__PURE__ */ jsx("h4", { className: "text-primary font-bold text-lg mb-1", children: "RICHIEDI IL TUO PREVENTIVO" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-400 text-xs mb-4", children: "Un consulente ti contatterà entro 24 ore" }),
        /* @__PURE__ */ jsx(
          Button,
          {
            className: "w-full rounded-full py-4 text-base font-bold !bg-secondary !text-white hover:opacity-90 transition-opacity",
            onClick: () => setIsModalOpen(true),
            children: "RICHIEDI ORA"
          }
        )
      ] })
    ] }),
    isModalOpen && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm transition-all animate-fadeIn", children: /* @__PURE__ */ jsx("div", { className: "bg-white rounded-[20px] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn relative", children: /* @__PURE__ */ jsxs("div", { className: "p-6 md:p-8 bg-white relative", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setIsModalOpen(false),
          className: "absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-primary z-10",
          children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
            /* @__PURE__ */ jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
            /* @__PURE__ */ jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mb-8 border-b border-gray-100 pb-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-heading font-extrabold text-2xl text-primary mb-1 uppercase leading-tight pr-8", children: vehicleTitle }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-4 text-sm", children: vehicleVersion }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6 bg-gray-50 rounded-lg p-3 inline-flex", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-wider", children: "Durata" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-primary leading-none", children: [
              selectedMonths,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-gray-400", children: "Mesi" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-gray-200" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 font-bold uppercase tracking-wider", children: "Percorrenza" }),
            /* @__PURE__ */ jsxs("span", { className: "text-lg font-bold text-primary leading-none", children: [
              selectedDistance,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-xs font-normal text-gray-400", children: "Km" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
          /* @__PURE__ */ jsx("span", { className: "font-bold text-primary text-sm", children: "Sono un:" }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setUserType("privato"),
                className: `px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${userType === "privato" ? "bg-secondary text-white border-secondary shadow-md" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"}`,
                children: "Privato"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setUserType("piva"),
                className: `px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 ${userType === "piva" ? "bg-secondary text-white border-secondary shadow-md" : "bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100"}`,
                children: "P.IVA"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
              /* @__PURE__ */ jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "7", r: "4" })
            ] }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Nome e Cognome",
                className: "w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white",
                required: true,
                value: formData.name,
                onChange: (e) => setFormData({ ...formData, name: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
              /* @__PURE__ */ jsx("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2" }),
              /* @__PURE__ */ jsx("path", { d: "m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" })
            ] }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "email",
                placeholder: "Email",
                className: "w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white",
                required: true,
                value: formData.email,
                onChange: (e) => setFormData({ ...formData, email: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "tel",
                placeholder: "Telefono",
                className: "w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white",
                required: true,
                value: formData.phone,
                onChange: (e) => setFormData({ ...formData, phone: e.target.value })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", children: [
              /* @__PURE__ */ jsx("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }),
              /* @__PURE__ */ jsx("rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", ry: "1" })
            ] }) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                placeholder: "Codice Fiscale",
                className: "w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white",
                value: formData.fiscalCode,
                onChange: (e) => setFormData({ ...formData, fiscalCode: e.target.value })
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsx(
          "textarea",
          {
            placeholder: "Facci sapere se hai necessità particolari...",
            rows: 3,
            className: "w-full p-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium resize-none bg-gray-50/50 focus:bg-white",
            value: formData.message,
            onChange: (e) => setFormData({ ...formData, message: e.target.value })
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2 pt-1 border-t border-gray-50", children: [
          /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2.5 cursor-pointer group", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex items-center mt-0.5", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-secondary checked:border-secondary transition-colors",
                  required: true,
                  checked: formData.privacy,
                  onChange: (e) => setFormData({ ...formData, privacy: e.target.checked })
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "absolute w-2.5 h-2.5 text-white pointer-events-none hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors", children: [
              "Ho letto l'informativa sulla ",
              /* @__PURE__ */ jsx("a", { href: "#", className: "underline decoration-gray-300 hover:decoration-secondary hover:text-secondary transition-all", children: "Privacy" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-start gap-2.5 cursor-pointer group", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative flex items-center mt-0.5", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  className: "peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-secondary checked:border-secondary transition-colors",
                  checked: formData.marketing,
                  onChange: (e) => setFormData({ ...formData, marketing: e.target.checked })
                }
              ),
              /* @__PURE__ */ jsx("svg", { className: "absolute w-2.5 h-2.5 text-white pointer-events-none hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" }) })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors", children: "Marketing e profilazione" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            type: "submit",
            className: "w-full rounded-pill py-3.5 text-sm font-bold !bg-secondary !text-white hover:opacity-90 hover:scale-[1.01] shadow-lg shadow-secondary/20 transition-all uppercase tracking-wide",
            children: "INVIA RICHIESTA"
          }
        ) })
      ] })
    ] }) }) })
  ] });
}

const $$Astro = createAstro();
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const { data: vehicle, error } = await supabase.from("veicoli").select("*").eq("slug", slug).single();
  if (error || !vehicle) {
    console.error("Vehicle not found:", error);
    return Astro2.redirect("/404");
  }
  const { data: relatedData } = await supabase.from("veicoli").select("titolo, canone_mensile, immagine_url, slug, marca, modello, alimentazione, categoria").neq("id", vehicle.id).limit(10);
  const relatedVehicles = relatedData ? relatedData.sort(() => 0.5 - Math.random()).slice(0, 3) : [];
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val);
  };
  const INCLUDED_SERVICES = [
    { label: "Manutenzione ordinaria e straordinaria", active: true },
    { label: "Assicurazione RCAuto", active: true },
    { label: "Assicurazione Incendio e Furto", active: true },
    { label: "Assicurazione Kasco Full", active: true },
    { label: "Assicurazione Eventi Naturali", active: true },
    { label: "Assicurazione Atti Vandalici", active: true },
    { label: "Assicurazione Cristalli", active: true },
    { label: "Assistenza Stradale 24/7", active: true },
    { label: "Gestione pagamento Bollo - Tasse - Multe", active: true },
    { label: "Consegna a domicilio", active: true },
    { label: "Vettura in pre-assegnazione", active: true }
  ];
  const SPECS = [
    { icon: "category", label: "Categoria", value: vehicle.categoria },
    { icon: "fuel", label: "Alimentazione", value: vehicle.alimentazione },
    { icon: "transmission", label: "Cambio", value: vehicle.cambio }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${vehicle.titolo} | Noleggio Lungo Termine` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Header", "client:component-export": "default" })} ${maybeRenderHead()}<main class="bg-gray-50 min-h-screen pb-20 pt-8"> <div class="container-custom">  <div class="flex flex-col lg:flex-row gap-8 lg:gap-16">  <div class="w-full lg:w-1/3 order-2 lg:order-1 space-y-8">  ${renderComponent($$result2, "Configurator", Configurator, { "client:load": true, "basePrice": vehicle.canone_mensile || 0, "initialMonths": vehicle.durata_mesi || 36, "initialDistance": vehicle.km_annui || "15.000", "vehicleTitle": `${vehicle.marca} ${vehicle.modello}`, "vehicleVersion": vehicle.versione, "image": vehicle.immagine_url, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Configurator", "client:component-export": "default" })}  <div class="bg-white rounded-[20px] p-6 shadow-soft border border-gray-100"> <h4 class="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Caratteristiche del <span class="text-primary">Veicolo</span></h4> <div class="grid grid-cols-2 gap-y-4 gap-x-2"> ${SPECS.map((spec) => renderTemplate`<div class="flex flex-col"> <span class="text-xs text-gray-400 mb-1 flex items-center gap-1.5"> ${spec.icon === "category" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`} ${spec.icon === "fuel" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.77 10-10 10Z"></path><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path></svg>`} ${spec.icon === "transmission" && renderTemplate`<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>`} ${spec.label} </span> <span class="font-bold text-primary text-sm">${spec.value || "N/D"}</span> </div>`)} </div> </div>  <div class="bg-white rounded-[20px] p-6 shadow-soft border border-gray-100"> <h4 class="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-50">Servizi inclusi nel <span class="text-primary">Canone</span></h4> <ul class="space-y-3"> ${INCLUDED_SERVICES.map((service) => renderTemplate`<li class="flex items-start gap-3 group"> <div class="mt-0.5 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> </div> <span class="text-sm text-gray-600 leading-snug">${service.label}</span> </li>`)} </ul> </div> </div>  <div class="w-full lg:w-2/3 order-1 lg:order-2">  <div class="bg-white rounded-[30px] p-6 md:p-10 shadow-soft border border-gray-100 mb-12 relative overflow-hidden group">  <div class="relative w-full aspect-[16/10] md:aspect-[2/1] mb-8 flex items-center justify-center"> <img${addAttribute(vehicle.immagine_url || "https://via.placeholder.com/800x600?text=No+Image", "src")}${addAttribute(vehicle.titolo, "alt")} class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500"> </div>  <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-t border-gray-100 pt-8"> <div> <h1 class="font-heading font-extrabold text-3xl md:text-5xl text-primary mb-2 leading-tight"> ${vehicle.marca} <br> <span class="text-secondary">${vehicle.modello}</span> </h1> <p class="text-gray-400 font-medium text-lg">${vehicle.versione}</p> </div> <div class="text-right"> <p class="text-gray-400 text-sm mb-1 font-medium">Canone a partire da:</p> <div class="flex items-baseline justify-end gap-1"> <span class="font-heading font-extrabold text-4xl md:text-5xl text-secondary">${vehicle.canone_mensile ? Math.floor(vehicle.canone_mensile) : "N/D"}€</span> <span class="text-gray-400 font-medium">/ mese i.e.</span> </div> <p class="text-xs text-gray-300 mt-1">Anticipo: ${formatCurrency(vehicle.anticipo)}</p> </div> </div>  <div class="mt-8 bg-gray-50 rounded-xl py-3 px-6 flex items-center justify-center gap-3 text-gray-600 font-bold"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
Optional Inclusi
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg> </div> </div>  <div class="space-y-6"> <h3 class="text-primary font-bold text-lg uppercase tracking-widest mb-6">Potrebbe piacerti anche:</h3> <div class="grid gap-6"> ${relatedVehicles.map((related) => renderTemplate`<a${addAttribute(`/veicoli/${related.slug}`, "href")} class="bg-white rounded-[20px] p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col md:flex-row items-center gap-6 group"> <div class="w-full md:w-1/3 aspect-[4/3] overflow-hidden rounded-xl bg-gray-50 flex items-center justify-center"> <img${addAttribute(related.immagine_url, "src")}${addAttribute(related.titolo, "alt")} class="w-full h-full object-contain mix-blend-multiply p-2 group-hover:scale-110 transition-transform duration-500"> </div> <div class="flex-grow w-full md:w-auto text-center md:text-left"> <div class="flex md:flex-col gap-2 mb-2 items-center md:items-start justify-center"> <h4 class="font-heading font-bold text-xl text-primary"> <span class="text-secondary">${related.marca}</span> ${related.modello} </h4> <span class="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">${related.categoria || "SUV"}</span> </div> <p class="text-gray-400 text-sm mb-4 line-clamp-1">${related.titolo}</p> <div class="flex items-center justify-center md:justify-start gap-4"> <div class="border border-gray-200 rounded-lg px-3 py-1 text-xs font-semibold text-gray-500"> ${related.alimentazione} </div> <div class="text-primary font-bold"> ${related.canone_mensile}€ <span class="text-gray-400 text-xs font-normal">/mese</span> </div> </div> </div> <div class="hidden md:block"> <div class="w-10 h-10 rounded-full border-2 border-primary/10 flex items-center justify-center text-primary group-hover:bg-secondary group-hover:border-secondary group-hover:text-white transition-all"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg> </div> </div> </a>`)} </div> </div> </div> </div> </div> </main> ${renderComponent($$result2, "Footer", Footer, {})} ` })}`;
}, "D:/dsas-mobility/src/pages/veicoli/[slug].astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/veicoli/[slug].astro";
const $$url = "/veicoli/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
