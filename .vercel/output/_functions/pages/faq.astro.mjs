import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_Dz3TRyfT.mjs';
import { H as Header, F as Footer } from '../chunks/Footer_BZ9xWnny.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useState } from 'react';
export { renderers } from '../renderers.mjs';

function FAQ({ items }) {
  const [openIndex, setOpenIndex] = useState(0);
  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return /* @__PURE__ */ jsx("div", { className: "space-y-4 max-w-3xl mx-auto", children: items.map((item, index) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: `border border-gray-100 rounded-xl bg-white overflow-hidden transition-all duration-300 ${openIndex === index ? "shadow-lg ring-1 ring-primary/5" : "hover:border-gray-200"}`,
      children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            className: "w-full flex items-center justify-between p-6 text-left focus:outline-none",
            onClick: () => toggle(index),
            children: [
              /* @__PURE__ */ jsx("span", { className: `font-bold text-lg ${openIndex === index ? "text-primary" : "text-gray-700"}`, children: item.question }),
              /* @__PURE__ */ jsx("div", { className: `p-2 rounded-full transition-colors ${openIndex === index ? "bg-primary/10 text-primary" : "bg-gray-50 text-gray-400"}`, children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "20",
                  height: "20",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  className: `transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`,
                  children: /* @__PURE__ */ jsx("polyline", { points: "6 9 12 15 18 9" })
                }
              ) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            className: `overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`,
            children: /* @__PURE__ */ jsx("div", { className: "p-6 pt-0 text-gray-500 leading-relaxed", children: item.answer })
          }
        )
      ]
    },
    index
  )) });
}

const $$Faq = createComponent(($$result, $$props, $$slots) => {
  const FAQ_ITEMS = [
    {
      question: "Quali documenti servono per il noleggio?",
      answer: "Per i privati servono patente valida, carta d'identit\xE0 e codice fiscale. Per le aziende, visura camerale e documenti del legale rappresentante."
    },
    {
      question: "Cosa include il canone mensile?",
      answer: "Il canone include immatricolazione, assicurazione RCA, bollo, manutenzione ordinaria e straordinaria, soccorso stradale h24."
    },
    {
      question: "Posso guidare all'estero?",
      answer: "S\xEC, la copertura assicurativa \xE8 valida in tutti i paesi indicati sulla carta verde."
    },
    {
      question: "Cosa succede in caso di incidente?",
      answer: "Devi compilare il CAI e contattare il numero di assistenza dedicato fornito alla consegna del veicolo."
    },
    {
      question: "I neopatentati possono noleggiare?",
      answer: "S\xEC, ma solo i veicoli con potenza specifica consentita dalla legge per i neopatentati."
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "FAQ - Domande Frequenti | DSAS Mobility" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/components/Header", "client:component-export": "default" })} ${maybeRenderHead()}<main> <section class="bg-primary py-24 text-white relative overflow-hidden"> <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1621504450168-38f6473199e7?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div> <div class="container-custom relative z-10 text-center"> <h1 class="heading-1 mb-6">Domande Frequenti</h1> <p class="text-lead text-gray-300 max-w-2xl mx-auto">
Tutto quello che devi sapere sul noleggio a lungo e breve termine.
</p> </div> </section> <section class="py-24 bg-gray-50"> <div class="container-custom max-w-4xl"> ${renderComponent($$result2, "FAQ", FAQ, { "items": FAQ_ITEMS, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/dsas-mobility/src/components/FAQ", "client:component-export": "default" })} </div> </section> </main> ${renderComponent($$result2, "Footer", Footer, {})} ` })}`;
}, "D:/dsas-mobility/src/pages/faq.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/faq.astro";
const $$url = "/faq";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Faq,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
