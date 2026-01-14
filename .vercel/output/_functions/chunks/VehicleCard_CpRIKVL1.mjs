import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { B as Button } from './Button_CPrkWnPE.mjs';

function Badge({
  variant = "neutral",
  children,
  className = ""
}) {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-pill text-xs font-bold uppercase tracking-wide border";
  const variants = {
    success: "bg-green-100 text-green-700 border-green-200",
    info: "bg-blue-50 text-blue-700 border-blue-200",
    warning: "bg-orange-50 text-orange-700 border-orange-200",
    neutral: "bg-gray-100 text-gray-600 border-gray-200",
    outline: "bg-transparent text-primary border-primary/20",
    glass: "bg-white/10 text-secondary border-white/20 backdrop-blur-sm"
  };
  return /* @__PURE__ */ jsx("span", { className: `${baseStyles} ${variants[variant]} ${className}`, children });
}

function VehicleCard({ vehicle }) {
  const CardContent = /* @__PURE__ */ jsxs("div", { className: "group relative bg-white rounded-card shadow-soft hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full transform hover:-translate-y-1", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute top-4 left-4 z-10", children: /* @__PURE__ */ jsx(Badge, { variant: vehicle.available ? "success" : "info", children: vehicle.available ? "Pronta Consegna" : "Ordinabile" }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/10] overflow-hidden bg-gray-200 border-b border-gray-100", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: vehicle.image,
          alt: `${vehicle.brand} ${vehicle.model}`,
          className: "w-full h-full object-contain p-6 object-center group-hover:scale-105 transition-transform duration-500 mix-blend-multiply",
          loading: "lazy"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-6 flex flex-col flex-grow relative", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-secondary font-bold text-sm tracking-wide uppercase mb-1", children: vehicle.brand }),
        /* @__PURE__ */ jsx("h2", { className: "text-primary font-bold text-xl leading-tight group-hover:text-secondary transition-colors", children: vehicle.model }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-sm mt-1 line-clamp-1", children: vehicle.version })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-2 py-4 border-t border-gray-100 mb-6", children: [
        /* @__PURE__ */ jsx(SpecItem, { icon: "fuel", label: vehicle.fuel }),
        /* @__PURE__ */ jsx(SpecItem, { icon: "transmission", label: vehicle.transmission })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-auto flex items-end justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("span", { className: "text-xs text-gray-500 font-medium", children: "Da" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-baseline gap-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "text-2xl font-bold text-primary", children: [
              "€",
              vehicle.price
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-gray-400 font-medium", children: "/mese" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400", children: "iva esclusa" })
        ] }),
        /* @__PURE__ */ jsx(Button, { variant: "primary", size: "icon", className: "group-hover:scale-110 rounded-full", children: /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
          /* @__PURE__ */ jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" }),
          /* @__PURE__ */ jsx("polyline", { points: "12 5 19 12 12 19" })
        ] }) })
      ] })
    ] })
  ] });
  return vehicle.slug ? /* @__PURE__ */ jsx("a", { href: `/veicoli/${vehicle.slug}`, className: "block h-full", children: CardContent }) : CardContent;
}
function SpecItem({ icon, label }) {
  const svgPaths = {
    fuel: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("path", { d: "M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" }),
      /* @__PURE__ */ jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" }),
      /* @__PURE__ */ jsx("circle", { cx: "7", cy: "18", r: "2" }),
      /* @__PURE__ */ jsx("circle", { cx: "17", cy: "18", r: "2" })
    ] }),
    transmission: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
      /* @__PURE__ */ jsx("path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" }),
      /* @__PURE__ */ jsx("line", { x1: "12", y1: "17", x2: "12.01", y2: "17" })
    ] }),
    seats: /* @__PURE__ */ jsx("path", { d: "M19 9l-7 7-7-7" })
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center p-2 bg-gray-50 rounded-lg", children: [
    /* @__PURE__ */ jsx("span", { className: "text-gray-400 mb-1", children: /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: svgPaths[icon] }) }),
    /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-700", children: label })
  ] });
}

export { VehicleCard as V };
