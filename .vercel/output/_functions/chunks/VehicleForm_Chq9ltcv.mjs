import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button } from './Button_CPrkWnPE.mjs';
import { s as supabase } from './supabase_84VYV0jg.mjs';

const BRANDS = ["ALFA", "AUDI", "BDY", "BMW", "BYD", "CITROEN", "CUPRA", "DACIA", "DS", "FIAT", "FORD", "HONDA", "HYUNDAI", "JEEP", "KIA", "LANCIA", "LAND", "MASERATI", "MERCEDES-BENZ", "MG", "NISSAN", "OPEL", "PEUGEOT", "POLESTAR", "PORSCHE", "RENAULT", "SEAT", "SKODA", "SUZUKI", "TESLA", "TOYOTA", "VOLKSWAGEN", "VOLVO"];
const CATEGORIES = ["Berlina", "City Car", "Station Wagon", "SUV / Crossover", "Veicoli commerciali", "Cabrio", "Coupé", "Monovolume", "Pick-up", "Roadster", "Fuoristrada", "Elettrica"];
const FUELS = ["Benzina", "Diesel", "Elettrica", "Ibrida-Benzina", "Ibrida-Diesel", "GPL", "Metano"];
const TRANSMISSIONS = ["Manuale", "Automatico"];
const DELIVERY_TIMES = ["Garanzia di Mobilità", "Pronta Consegna", "Veicolo pre-ordinato"];
function VehicleForm({ initialData }) {
  const INITIAL_STATE = {
    title: "",
    brand: "",
    category: "",
    slug: "",
    image_url: "",
    promo: false,
    version: "",
    model: "",
    sku: "",
    transmission: "",
    fuel: "",
    delivery_time: "",
    monthly_price: "",
    duration_months: "",
    advance_payment: "",
    annual_km: "",
    is_short_term: false,
    daily_price: "",
    daily_km: "",
    weekly_price: "",
    weekly_km: "",
    monthly_short_price: "",
    monthly_short_km: "",
    deposit: "",
    extra_km_cost: ""
  };
  const [formData, setFormData] = useState(() => {
    if (initialData) {
      const normalize = (val, options) => {
        if (!val) return "";
        if (options.includes(val)) return val;
        const match = options.find((o) => o.toLowerCase() === val.toLowerCase());
        if (match) return match;
        if (options.includes("Automatico") && val.toLowerCase().includes("auto")) return "Automatico";
        if (options.includes("Manuale") && val.toLowerCase().includes("man")) return "Manuale";
        return "";
      };
      return {
        title: initialData.titolo || "",
        brand: initialData.marca || "",
        category: initialData.categoria || "",
        slug: initialData.slug || "",
        image_url: initialData.immagine_url || "",
        promo: initialData.promo || false,
        version: initialData.versione || "",
        model: initialData.modello || "",
        sku: initialData.sku || "",
        // key fix: normalize transmission and fuel
        transmission: normalize(initialData.cambio, TRANSMISSIONS),
        fuel: normalize(initialData.alimentazione, FUELS),
        delivery_time: initialData.tempo_consegna || "",
        monthly_price: initialData.canone_mensile || "",
        duration_months: initialData.durata_mesi || "",
        advance_payment: initialData.anticipo || "",
        annual_km: initialData.km_annui || "",
        is_short_term: initialData.noleggio_breve || false,
        daily_price: initialData.prezzo_giornaliero || "",
        daily_km: initialData.km_giornaliero || "",
        weekly_price: initialData.prezzo_settimanale || "",
        weekly_km: initialData.km_settimanale || "",
        monthly_short_price: initialData.prezzo_mensile_breve || "",
        monthly_short_km: initialData.km_mensile_breve || "",
        deposit: initialData.cauzione_richiesta || "",
        extra_km_cost: initialData.costo_per_km || ""
      };
    }
    return INITIAL_STATE;
  });
  const [uploading, setUploading] = useState(false);
  const isEditMode = !!initialData;
  useEffect(() => {
    if (!isEditMode && formData.title && !formData.slug) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      setFormData((p) => ({ ...p, slug }));
    }
  }, [formData.title, isEditMode]);
  useEffect(() => {
    if (!isEditMode && formData.model && !formData.sku) {
      const sku = `SKU-${formData.model.toUpperCase().replace(/[^A-Z0-9]/g, "").substring(0, 6)}`;
      setFormData((p) => ({ ...p, sku: sku + "-001" }));
    }
  }, [formData.model, isEditMode]);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((p) => ({ ...p, [name]: type === "checkbox" ? checked : value }));
  };
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const signRes = await fetch("/api/sign-cloudinary");
      const signData = await signRes.json();
      const data = new FormData();
      data.append("file", file);
      data.append("cloud_name", signData.cloud_name);
      data.append("folder", "dsas-mobility");
      data.append("api_key", signData.api_key);
      data.append("timestamp", signData.timestamp);
      data.append("signature", signData.signature);
      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${signData.cloud_name}/image/upload`,
        { method: "POST", body: data }
      );
      const uploadResult = await uploadRes.json();
      if (uploadResult.secure_url) {
        setFormData((p) => ({ ...p, image_url: uploadResult.secure_url }));
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Errore caricamento immagine");
    } finally {
      setUploading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        titolo: formData.title,
        marca: formData.brand,
        modello: formData.model,
        versione: formData.version,
        categoria: formData.category,
        slug: formData.slug,
        sku: formData.sku,
        immagine_url: formData.image_url,
        alimentazione: formData.fuel,
        cambio: formData.transmission,
        promo: formData.promo,
        tempo_consegna: formData.delivery_time,
        canone_mensile: formData.monthly_price ? Number(formData.monthly_price) : null,
        anticipo: formData.advance_payment ? Number(formData.advance_payment) : 0,
        durata_mesi: formData.duration_months ? Number(formData.duration_months) : 36,
        km_annui: formData.annual_km ? Number(formData.annual_km) : 1e4,
        noleggio_breve: formData.is_short_term,
        prezzo_giornaliero: formData.is_short_term ? Number(formData.daily_price || 0) : null,
        km_giornaliero: formData.is_short_term ? Number(formData.daily_km || 0) : null,
        prezzo_settimanale: formData.is_short_term ? Number(formData.weekly_price || 0) : null,
        km_settimanale: formData.is_short_term ? Number(formData.weekly_km || 0) : null,
        prezzo_mensile_breve: formData.is_short_term ? Number(formData.monthly_short_price || 0) : null,
        km_mensile_breve: formData.is_short_term ? Number(formData.monthly_short_km || 0) : null,
        cauzione_richiesta: formData.is_short_term ? Number(formData.deposit || 0) : null,
        costo_per_km: formData.is_short_term ? Number(formData.extra_km_cost || 0) : null
      };
      let error;
      if (isEditMode) {
        const res = await supabase.from("veicoli").update(payload).eq("id", initialData.id);
        error = res.error;
      } else {
        const res = await supabase.from("veicoli").insert([payload]);
        error = res.error;
      }
      if (error) throw error;
      alert(isEditMode ? "Veicolo aggiornato con successo!" : "Veicolo salvato con successo!");
      if (!isEditMode) {
        setFormData(INITIAL_STATE);
      } else {
        window.location.href = "/admin/veicoli";
      }
    } catch (error) {
      console.error("Error saving vehicle:", error);
      alert(`Errore nel salvataggio: ${error.message}`);
    }
  };
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start mb-8 pb-4 border-b border-gray-100", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "text-secondary p-2 bg-secondary/5 rounded-lg", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("path", { d: "M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" }),
          /* @__PURE__ */ jsx("circle", { cx: "7", cy: "17", r: "2" }),
          /* @__PURE__ */ jsx("circle", { cx: "17", cy: "17", r: "2" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold text-gray-800", children: isEditMode ? "Modifica Veicolo" : "Nuovo Veicolo" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1", children: isEditMode ? "Modifica le informazioni esistenti del veicolo." : "Inserisci le informazioni complete del veicolo." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase tracking-wider text-gray-400", children: "Promozione Home" }),
        /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", name: "promo", checked: formData.promo, onChange: handleChange, className: "sr-only peer" }),
          /* @__PURE__ */ jsx("div", { className: "w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-12 w-full", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 border-b pb-4", style: { borderBottomColor: "rgba(59, 130, 246, 0.15)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-blue-50 text-blue-600 rounded-lg", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
            /* @__PURE__ */ jsx("polyline", { points: "14 2 14 8 20 8" }),
            /* @__PURE__ */ jsx("line", { x1: "16", y1: "13", x2: "8", y2: "13" }),
            /* @__PURE__ */ jsx("line", { x1: "16", y1: "17", x2: "8", y2: "17" }),
            /* @__PURE__ */ jsx("polyline", { points: "10 9 9 9 8 9" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl", style: { color: "#1d4ed8" }, children: "Dati Principali" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gap-y-8 w-full", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Titolo Annuncio *" }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "title", value: formData.title, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-gray-400", placeholder: "Es. Fiat 500 Dolcevita", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Marca *" }),
            /* @__PURE__ */ jsxs("select", { name: "brand", value: formData.brand, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer", required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Selezionare..." }),
              BRANDS.map((b) => /* @__PURE__ */ jsx("option", { value: b, children: b }, b))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Modello *" }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "model", value: formData.model, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "Es. 500", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Versione" }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "version", value: formData.version, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "Es. 1.0 Hybrid" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Categoria *" }),
            /* @__PURE__ */ jsxs("select", { name: "category", value: formData.category, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer", required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Selezionare..." }),
              CATEGORIES.map((c) => /* @__PURE__ */ jsx("option", { value: c, children: c }, c))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "SKU" }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "sku", value: formData.sku, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "Generato autom." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Slug" }),
            /* @__PURE__ */ jsx("input", { type: "text", name: "slug", value: formData.slug, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder-gray-400" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Foto Veicolo *" }),
            formData.image_url ? /* @__PURE__ */ jsxs("div", { className: "relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group", children: [
              /* @__PURE__ */ jsx("img", { src: formData.image_url, alt: "Preview", className: "w-full h-full object-cover" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFormData((p) => ({ ...p, image_url: "" })),
                  className: "absolute top-2 right-2 bg-white/90 text-red-500 p-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity",
                  children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
                    /* @__PURE__ */ jsx("path", { d: "M3 6h18" }),
                    /* @__PURE__ */ jsx("path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" }),
                    /* @__PURE__ */ jsx("path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" })
                  ] })
                }
              )
            ] }) : /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: "image/*",
                  onChange: handleImageUpload,
                  className: "w-full text-sm text-gray-500\r\n                                        file:mr-4 file:py-2.5 file:px-4\r\n                                        file:rounded-lg file:border-0\r\n                                        file:text-sm file:font-semibold\r\n                                        file:bg-primary/5 file:text-primary\r\n                                        hover:file:bg-primary/10 file:cursor-pointer cursor-pointer border border-gray-200 rounded-lg",
                  required: !isEditMode
                }
              ),
              uploading && /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 right-4 flex items-center", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-5 w-5 border-b-2 border-primary" }) })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 border-b pb-4", style: { borderBottomColor: "rgba(192, 38, 211, 0.15)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-fuchsia-50 text-fuchsia-600 rounded-lg", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "3" }),
            /* @__PURE__ */ jsx("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl", style: { color: "#a21caf" }, children: "Specifiche Tecniche" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Alimentazione *" }),
            /* @__PURE__ */ jsxs("select", { name: "fuel", value: formData.fuel, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer", required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Selezionare..." }),
              FUELS.map((f) => /* @__PURE__ */ jsx("option", { value: f, children: f }, f))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Cambio *" }),
            /* @__PURE__ */ jsxs("select", { name: "transmission", value: formData.transmission, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer", required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Selezionare..." }),
              TRANSMISSIONS.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "md:col-span-2 lg:col-span-2", children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Consegna *" }),
            /* @__PURE__ */ jsxs("select", { name: "delivery_time", value: formData.delivery_time, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none appearance-none cursor-pointer", required: true, children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "Selezionare..." }),
              DELIVERY_TIMES.map((t) => /* @__PURE__ */ jsx("option", { value: t, children: t }, t))
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 mb-6 border-b pb-4", style: { borderBottomColor: "rgba(16, 185, 129, 0.15)" }, children: [
          /* @__PURE__ */ jsx("div", { className: "p-2 bg-emerald-50 text-emerald-600 rounded-lg", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("rect", { x: "3", y: "4", width: "18", height: "18", rx: "2", ry: "2" }),
            /* @__PURE__ */ jsx("line", { x1: "16", y1: "2", x2: "16", y2: "6" }),
            /* @__PURE__ */ jsx("line", { x1: "8", y1: "2", x2: "8", y2: "6" }),
            /* @__PURE__ */ jsx("line", { x1: "3", y1: "10", x2: "21", y2: "10" })
          ] }) }),
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl", style: { color: "#047857" }, children: "Noleggio Lungo Termine" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-primary mb-2", children: "Canone Mensile (€) *" }),
            /* @__PURE__ */ jsx("input", { type: "number", name: "monthly_price", value: formData.monthly_price, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-lg font-bold text-gray-800", placeholder: "0.00", required: true })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Anticipo (€)" }),
            /* @__PURE__ */ jsx("input", { type: "number", name: "advance_payment", value: formData.advance_payment, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "0" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Durata (Mesi)" }),
            /* @__PURE__ */ jsx("input", { type: "number", name: "duration_months", value: formData.duration_months, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "36" })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Km Annui" }),
            /* @__PURE__ */ jsx("input", { type: "number", name: "annual_km", value: formData.annual_km, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "10000" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 p-8 rounded-xl border border-gray-100 mt-4 w-full", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6 border-b pb-4", style: { borderBottomColor: "rgba(249, 115, 22, 0.15)" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("div", { className: "p-2 bg-orange-100 text-orange-600 rounded-lg", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
              /* @__PURE__ */ jsx("polyline", { points: "12 6 12 12 16 14" })
            ] }) }),
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-xl", style: { color: "#c2410c" }, children: "Noleggio Breve Termine" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-gray-500", children: formData.is_short_term ? "Attivo" : "Disattivato" }),
            /* @__PURE__ */ jsxs("label", { className: "relative inline-flex items-center cursor-pointer", children: [
              /* @__PURE__ */ jsx("input", { type: "checkbox", name: "is_short_term", checked: formData.is_short_term, onChange: handleChange, className: "sr-only peer" }),
              /* @__PURE__ */ jsx("div", { className: "w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" })
            ] })
          ] })
        ] }),
        formData.is_short_term && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-6 animate-fade-in", children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-lg border border-gray-100 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50 pb-2", children: "Tariffa Giornaliera" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Prezzo (€)" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "daily_price", value: formData.daily_price, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "0.00" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Km Inclusi" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "daily_km", value: formData.daily_km, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "100" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-lg border border-gray-100 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-blue-400 uppercase tracking-widest border-b border-gray-50 pb-2", children: "Tariffa Settimanale" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Prezzo (€)" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "weekly_price", value: formData.weekly_price, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "0.00" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Km Inclusi" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "weekly_km", value: formData.weekly_km, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "500" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-lg border border-gray-100 flex flex-col gap-4", children: [
              /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-secondary uppercase tracking-widest border-b border-gray-50 pb-2", children: "Tariffa Mensile" }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Prezzo (€)" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "monthly_short_price", value: formData.monthly_short_price, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "0.00" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Km Inclusi" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "monthly_short_km", value: formData.monthly_short_km, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "1500" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-white p-5 rounded-lg border border-gray-100", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-gray-500 uppercase tracking-widest border-b border-gray-50 pb-2 mb-4", children: "Condizioni Extra" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Cauzione Richiesta (€)" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "deposit", value: formData.deposit, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "Es. 500" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: "Costo Extra per Km (€)" }),
                /* @__PURE__ */ jsx("input", { type: "number", name: "extra_km_cost", value: formData.extra_km_cost, onChange: handleChange, className: "w-full h-12 px-4 rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:bg-white focus:border-secondary focus:ring-1 focus:ring-secondary outline-none", placeholder: "Es. 0.15" })
              ] })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-4 mt-12 pt-6 border-t border-gray-100", children: [
      /* @__PURE__ */ jsx(Button, { variant: "outline", type: "button", onClick: () => window.history.back(), className: "text-gray-600 border-gray-300 hover:bg-gray-50 px-8 h-12 rounded-lg font-bold", children: "Annulla" }),
      /* @__PURE__ */ jsx(Button, { variant: "primary", type: "submit", className: "px-10 h-12 bg-primary hover:bg-primary/90 text-white shadow-lg rounded-lg font-bold", children: isEditMode ? "Aggiorna Veicolo" : "Salva Veicolo" })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
                /* Hide Number Arrows */
                input[type=number]::-webkit-inner-spin-button, 
                input[type=number]::-webkit-outer-spin-button { 
                  -webkit-appearance: none; 
                  margin: 0; 
                }
            ` })
  ] });
}

export { VehicleForm as V };
