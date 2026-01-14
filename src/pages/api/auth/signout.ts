
import type { APIRoute } from "astro";
import { createServerClient, parseCookieHeader } from "@supabase/ssr";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
    const supabase = createServerClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return parseCookieHeader(request.headers.get('Cookie') ?? '').map((cookie) => ({
                        name: cookie.name,
                        value: cookie.value ?? '',
                    }));
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => {
                        cookies.set(name, value, options);
                    });
                },
            },
        }
    );

    const { error } = await supabase.auth.signOut();

    if (error) {
        return new Response(error.message, { status: 500 });
    }

    return redirect("/admin/login");
};
