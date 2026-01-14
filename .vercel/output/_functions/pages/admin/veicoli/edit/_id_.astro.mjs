import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../../../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_BIIt-_jr.mjs';
import { V as VehicleForm } from '../../../../chunks/VehicleForm_Chq9ltcv.mjs';
import { s as supabase } from '../../../../chunks/supabase_84VYV0jg.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  if (!id) {
    return Astro2.redirect("/admin/veicoli");
  }
  const { data: vehicle, error } = await supabase.from("veicoli").select("*").eq("id", id).single();
  if (error || !vehicle) {
    console.error("Error fetching vehicle for edit:", error);
    return Astro2.redirect("/admin/veicoli");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Modifica ${vehicle.titolo}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="w-full py-6"> ${renderComponent($$result2, "VehicleForm", VehicleForm, { "initialData": vehicle, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/dsas-mobility/src/admin/VehicleForm", "client:component-export": "default" })} </div> ` })}`;
}, "D:/dsas-mobility/src/pages/admin/veicoli/edit/[id].astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/admin/veicoli/edit/[id].astro";
const $$url = "/admin/veicoli/edit/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$id,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
