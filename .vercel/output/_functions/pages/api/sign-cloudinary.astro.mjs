import { v2 } from 'cloudinary';
export { renderers } from '../../renderers.mjs';

const prerender = false;
v2.config({
  cloud_name: "dskliu1ig",
  api_key: "538724966551851",
  api_secret: "Q1fP7-pH6iiltPbFNkqPn0d93no"
});
const GET = async () => {
  const timestamp = Math.round((/* @__PURE__ */ new Date()).getTime() / 1e3);
  const signature = v2.utils.api_sign_request(
    {
      timestamp,
      folder: "dsas-mobility"
    },
    "Q1fP7-pH6iiltPbFNkqPn0d93no"
  );
  return new Response(
    JSON.stringify({
      timestamp,
      signature,
      cloud_name: "dskliu1ig",
      api_key: "538724966551851"
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
