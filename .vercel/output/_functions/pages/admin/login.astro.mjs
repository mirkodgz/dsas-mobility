import { e as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DKkSlRO1.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_Dz3TRyfT.mjs';
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Admin Login | DSAS Mobility" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="h-[calc(100vh-5rem)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl"> <div class="text-center"> <img class="mx-auto h-16 w-auto" src="/logo_dsas.webp" alt="DSAS Mobility"> <h2 class="mt-6 text-3xl font-extrabold text-gray-900 font-heading uppercase">
Admin Login
</h2> <p class="mt-2 text-sm text-gray-600">
Accedi per gestire la flotta veicoli
</p> </div> <form class="mt-8 space-y-6" id="loginForm"> <input type="hidden" name="remember" value="true"> <div class="rounded-md shadow-sm -space-y-px"> <div class="mb-4"> <label for="email" class="sr-only">Email address</label> <input id="email" name="email" type="email" autocomplete="email" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Email address"> </div> <div> <label for="password" class="sr-only">Password</label> <input id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm" placeholder="Password"> </div> </div> <div id="errorMessage" class="text-red-500 text-sm text-center hidden"></div> <div> <button type="submit" id="submitBtn" class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-lg hover:shadow-primary/30"> <span class="absolute left-0 inset-y-0 flex items-center pl-3"> <svg class="h-5 w-5 text-secondary group-hover:text-secondary-light" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"> <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path> </svg> </span>
ACCEDI AL PANNELLO
</button> <div id="loader" class="hidden text-center mt-2"> <svg class="animate-spin h-5 w-5 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> </div> </div> </form> </div> </div> ` })} ${renderScript($$result, "D:/dsas-mobility/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/dsas-mobility/src/pages/admin/login.astro", void 0);

const $$file = "D:/dsas-mobility/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
