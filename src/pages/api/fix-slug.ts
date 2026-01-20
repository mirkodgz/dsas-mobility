
export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const GET: APIRoute = async ({ request }) => {
    // 1. Init Supabase using the environment variables that ARE working
    const supabaseAdmin = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // 2. Update the slug
    const { data, error } = await supabaseAdmin
        .from('veicoli')
        .update({ slug: 'citroen-c3-puretech' })
        .eq('id', '89737d61-59a7-4726-bad6-5b688907249f')
        .select();

    if (error) {
        return new Response(JSON.stringify({ success: false, error }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify({ success: true, data }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
};
