import { createServerClient, parseCookieHeader } from '@supabase/ssr';
import { d as defineMiddleware, s as sequence } from './chunks/index_DXgcVzsN.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_E2K7F1Zj.mjs';
import 'piccolore';
import './chunks/astro/server_DKkSlRO1.mjs';
import 'clsx';

const onRequest$1 = defineMiddleware(async (context, next) => {
  const supabase = createServerClient(
    "https://qudtubjjqhibwwwwafwb.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1ZHR1YmpqcWhpYnd3d3dhZndiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzMzAxMTYsImV4cCI6MjA4MzkwNjExNn0.FDDMHAoxMsfyCh7-ir5OKPllw_tJ5OJhGkzqV5b0yzs",
    {
      cookies: {
        getAll() {
          return parseCookieHeader(context.request.headers.get("Cookie") ?? "").map((cookie) => ({
            name: cookie.name,
            value: cookie.value ?? ""
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            context.cookies.set(name, value, options);
          });
        }
      }
    }
  );
  const {
    data: { user }
  } = await supabase.auth.getUser();
  context.locals.user = user;
  if (context.url.pathname.startsWith("/admin") && context.url.pathname !== "/admin/login") {
    if (!user) {
      return context.redirect("/admin/login");
    }
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
