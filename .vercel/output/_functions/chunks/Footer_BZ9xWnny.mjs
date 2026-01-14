import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { B as Button } from './Button_CPrkWnPE.mjs';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);
  const navLinkClass = (path) => `hover:text-secondary transition-colors uppercase ${currentPath === path ? "text-secondary" : ""}`;
  const navLinkClassNormal = (path) => `hover:text-secondary transition-colors ${currentPath === path ? "text-secondary" : ""}`;
  return /* @__PURE__ */ jsxs("header", { className: "fixed top-0 w-full z-50 bg-white shadow-sm border-b border-gray-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("a", { href: "/", className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/logo_dsas.webp",
          alt: "DSAS Mobility Logo",
          className: "h-14 w-auto object-contain"
        }
      ) }),
      /* @__PURE__ */ jsxs("nav", { className: "hidden md:flex items-center gap-6 lg:gap-8 font-bold text-gray-800 text-sm lg:text-base", children: [
        /* @__PURE__ */ jsx("a", { href: "/lungo-termine", className: navLinkClass("/lungo-termine"), children: "Noleggio LUNGO TERMINE" }),
        /* @__PURE__ */ jsx("a", { href: "/breve-termine", className: navLinkClass("/breve-termine"), children: "Noleggio BREVE TERMINE" }),
        /* @__PURE__ */ jsx("a", { href: "/chi-siamo", className: navLinkClassNormal("/chi-siamo"), children: "Chi siamo" }),
        /* @__PURE__ */ jsx("a", { href: "/faq", className: navLinkClassNormal("/faq"), children: "FAQ" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "hidden md:flex items-center space-x-6", children: /* @__PURE__ */ jsx(Button, { variant: "primary", size: "sm", className: "!rounded-full px-6 shadow-md hover:shadow-lg transition-all", onClick: () => window.location.href = "/contatti", children: "RICHIEDI PREVENTIVO" }) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden p-2 text-primary",
          onClick: () => setIsMenuOpen(!isMenuOpen),
          children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("line", { x1: "4", x2: "20", y1: "12", y2: "12" }),
            /* @__PURE__ */ jsx("line", { x1: "4", x2: "20", y1: "6", y2: "6" }),
            /* @__PURE__ */ jsx("line", { x1: "4", x2: "20", y1: "18", y2: "18" })
          ] })
        }
      )
    ] }),
    isMenuOpen && /* @__PURE__ */ jsxs("div", { className: "md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto bg-white border-b border-gray-100 shadow-xl p-4 flex flex-col gap-4 pb-8", children: [
      /* @__PURE__ */ jsx("a", { href: "/lungo-termine", className: `text-lg font-medium uppercase ${currentPath === "/lungo-termine" ? "text-secondary" : "text-gray-800"}`, children: "Noleggio LUNGO TERMINE" }),
      /* @__PURE__ */ jsx("a", { href: "/breve-termine", className: `text-lg font-medium uppercase ${currentPath === "/breve-termine" ? "text-secondary" : "text-gray-800"}`, children: "Noleggio BREVE TERMINE" }),
      /* @__PURE__ */ jsx("a", { href: "/chi-siamo", className: `text-lg font-medium ${currentPath === "/chi-siamo" ? "text-secondary" : "text-gray-800"}`, children: "Chi siamo" }),
      /* @__PURE__ */ jsx("a", { href: "/faq", className: `text-lg font-medium ${currentPath === "/faq" ? "text-secondary" : "text-gray-800"}`, children: "FAQ" }),
      /* @__PURE__ */ jsx(Button, { variant: "primary", className: "w-full mt-auto", children: "Richiedi Preventivo" })
    ] })
  ] });
}

function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "bg-white border-t border-gray-100 pt-16 pb-8", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "font-bold text-2xl tracking-tighter text-primary mb-6", children: [
          "DSAS",
          /* @__PURE__ */ jsx("span", { className: "text-secondary", children: "Mobility" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 mb-6 leading-relaxed", children: "Il punto di riferimento per il noleggio a lungo termine in Italia. Semplice, trasparente, digitale." }),
        /* @__PURE__ */ jsxs("div", { className: "flex gap-4", children: [
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors cursor-pointer", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) }) }),
          /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary hover:bg-secondary hover:text-white transition-colors cursor-pointer", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
            /* @__PURE__ */ jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }),
            /* @__PURE__ */ jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }),
            /* @__PURE__ */ jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-primary text-lg mb-6", children: "Navigazione" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-500", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Home" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Chi Siamo" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Catalogo Auto" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Come Funziona" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Contatti" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-primary text-lg mb-6", children: "Legale" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-500", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Cookie Policy" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Termini e Condizioni" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-secondary transition-colors", children: "Reclami" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-primary text-lg mb-6", children: "Contattaci" }),
        /* @__PURE__ */ jsxs("ul", { className: "space-y-4 text-gray-500", children: [
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-secondary shrink-0", children: /* @__PURE__ */ jsx("path", { d: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" }) }),
            /* @__PURE__ */ jsx("span", { children: "+39 02 123 4567" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-secondary shrink-0", children: [
              /* @__PURE__ */ jsx("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }),
              /* @__PURE__ */ jsx("polyline", { points: "22,6 12,13 2,6" })
            ] }),
            /* @__PURE__ */ jsx("span", { children: "info@dsasmobility.it" })
          ] }),
          /* @__PURE__ */ jsxs("li", { className: "flex gap-3", children: [
            /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "text-secondary shrink-0", children: [
              /* @__PURE__ */ jsx("path", { d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" }),
              /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
            ] }),
            /* @__PURE__ */ jsx("span", { children: "Via Roma 123, Milano (MI)" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400", children: [
      /* @__PURE__ */ jsx("p", { children: "© 2024 DSAS Mobility S.r.l. - P.IVA 12345678901" }),
      /* @__PURE__ */ jsx("p", { children: "Designed with ❤️ for High Performance" })
    ] })
  ] }) });
}

export { Footer as F, Header as H };
