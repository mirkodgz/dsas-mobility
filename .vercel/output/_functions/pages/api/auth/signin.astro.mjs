import { createServerClient, parseCookieHeader } from '@supabase/ssr';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request, cookies }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }
  const supabase = createServerClient(
    "https://qudtubjjqhibwwwwafwb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZHR1YmpqcWhpYnd3d3dhZndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzAxMTYsImV4cCI6MjA4MzkwNjExNn0.FDDMHAoxMsfyCh7-ir5OKPllw_tJ5OJhGkzqV5b0yzs",
    {
      cookies: {
        getAll() {
          return parseCookieHeader(request.headers.get("Cookie") ?? "").map((cookie) => ({
            name: cookie.name,
            value: cookie.value ?? ""
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookies.set(name, value, options);
          });
        }
      }
    }
  );
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  if (error) {
    return new Response(error.message, { status: 401 });
  }
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Location": "/admin" } });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
