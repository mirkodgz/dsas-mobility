import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_jRLnR3n7.mjs';
import { manifest } from './manifest_W4Lm1hzf.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/config/_table_.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/veicoli/create.astro.mjs');
const _page4 = () => import('./pages/admin/veicoli/edit/_id_.astro.mjs');
const _page5 = () => import('./pages/admin/veicoli.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/api/auth/signin.astro.mjs');
const _page8 = () => import('./pages/api/auth/signout.astro.mjs');
const _page9 = () => import('./pages/api/sign-cloudinary.astro.mjs');
const _page10 = () => import('./pages/breve-termine.astro.mjs');
const _page11 = () => import('./pages/chi-siamo.astro.mjs');
const _page12 = () => import('./pages/contatti.astro.mjs');
const _page13 = () => import('./pages/faq.astro.mjs');
const _page14 = () => import('./pages/lungo-termine.astro.mjs');
const _page15 = () => import('./pages/veicoli/_slug_.astro.mjs');
const _page16 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/config/[table].astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/veicoli/create.astro", _page3],
    ["src/pages/admin/veicoli/edit/[id].astro", _page4],
    ["src/pages/admin/veicoli/index.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/api/auth/signin.ts", _page7],
    ["src/pages/api/auth/signout.ts", _page8],
    ["src/pages/api/sign-cloudinary.ts", _page9],
    ["src/pages/breve-termine.astro", _page10],
    ["src/pages/chi-siamo.astro", _page11],
    ["src/pages/contatti.astro", _page12],
    ["src/pages/faq.astro", _page13],
    ["src/pages/lungo-termine.astro", _page14],
    ["src/pages/veicoli/[slug].astro", _page15],
    ["src/pages/index.astro", _page16]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "7b4f34fe-e503-42e6-a349-9a88aff8993c",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
