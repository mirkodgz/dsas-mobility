import { e as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_BIIt-_jr.mjs';
import { V as VehicleForm } from '../../../chunks/VehicleForm_Chq9ltcv.mjs';
export { renderers } from '../../../renderers.mjs';

const $$Create = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nuovo Veicolo" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full py-6"> ${renderComponent($$result2, "VehicleForm", VehicleForm, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/admin/VehicleForm", "client:component-export": "default" })} </div> ` })}`;
}, "D:/dsas-mobility/src/pages/admin/veicoli/create.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/admin/veicoli/create.astro";
const $$url = "/admin/veicoli/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
