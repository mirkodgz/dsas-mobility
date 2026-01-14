
import { createServerClient, parseCookieHeader } from "@supabase/ssr";
import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
    const supabase = createServerClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return parseCookieHeader(context.request.headers.get('Cookie') ?? '').map((cookie) => ({
                        name: cookie.name,
                        value: cookie.value ?? '',
                    }));
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        context.cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    context.locals.user = user;

    if (context.url.pathname.startsWith("/admin") && context.url.pathname !== "/admin/login") {
        if (!user) {
            return context.redirect("/admin/login");
        }
    }

    // Also protect the API auth actions if needed, but signin is public.
    // We generally only protect /admin routes essentially.

    return next();
});
