export const prerender = false;

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
    try {
        const body = await request.json();
        const { vehicle, version, config, user, leadType = 'rental' } = body;

        // Use Public Anon Key (Allowed by RLS for Insert)
        const supabaseAdmin = createClient(
            import.meta.env.PUBLIC_SUPABASE_URL,
            import.meta.env.PUBLIC_SUPABASE_ANON_KEY
        );

        // 1. Insert into Supabase (Primary Source of Truth)
        let dbId = null;
        try {
            const { data: dbData, error: dbError } = await supabaseAdmin
                .from('leads')
                .insert([
                    {
                        full_name: user.name,
                        email: user.email,
                        phone: user.phone,
                        fiscal_code: user.fiscalCode,
                        customer_type: user.type === 'piva' ? 'P.IVA' : 'Privato',
                        message: user.message,
                        // For rentals: store vehicle snapshot. For valuation: might store the vehicle to sell in message or a new field if schema allowed.
                        // Storing in vehicle_snapshot for consistency but marking it.
                        vehicle_snapshot: leadType === 'valuation'
                            ? { title: 'VALUTAZIONE USATO', version: user.vehicleInfo || 'N/D' }
                            : { title: vehicle, version: version },
                        configuration: config || {},
                    }
                ])
                .select()
                .single();

            if (dbError) {
                console.error('Database Operation Failed (Continuing to Email):', dbError);
            } else {
                dbId = dbData.id;
            }
        } catch (dbEx) {
            console.error('Database Exception (Refusing to crash):', dbEx);
        }

        // 2. Send Email via Resend
        // Note: RESEND_API_KEY must be set in .env
        const resendApiKey = import.meta.env.RESEND_API_KEY;

        let emailStatus = 'skipped';
        if (resendApiKey) {
            const resend = new Resend(resendApiKey);

            // Dynamic Subject
            let subject = '';
            switch (leadType) {
                case 'valuation':
                    subject = `Valutazione Auto: ${user.name}`;
                    break;
                case 'contact':
                    subject = `Nuovo Messaggio: ${user.name}`;
                    break;
                case 'short_term':
                    subject = `Noleggio Breve: ${user.name} - ${vehicle}`;
                    break;
                default:
                    subject = `Lead: ${user.name} - ${vehicle || 'Generico'}`;
            }

            // Dynamic Template
            let htmlContent = '';

            if (leadType === 'valuation') {
                htmlContent = `
                    <h1>Richiesta Valutazione Usato</h1>
                    <p><strong>Auto da Valutare:</strong> ${user.vehicleInfo || 'Non specificato'}</p>
                    <hr />
                    <h3>Dati Contatto</h3>
                    <ul>
                        <li><strong>Nome:</strong> ${user.name}</li>
                        <li><strong>Email:</strong> ${user.email}</li>
                        <li><strong>Telefono:</strong> ${user.phone}</li>
                    </ul>
                    <p><strong>Messaggio:</strong><br/>${user.message || 'Nessuno'}</p>
                `;
            } else if (leadType === 'contact') {
                htmlContent = `
                    <h1>Nuovo Messaggio dal Sito</h1>
                    <p><strong>Oggetto:</strong> ${user.subject || 'Generico'}</p>
                    <hr />
                    <h3>Dati Contatto</h3>
                    <ul>
                        <li><strong>Nome:</strong> ${user.name} ${user.surname || ''}</li>
                        <li><strong>Email:</strong> ${user.email}</li>
                        <li><strong>Telefono:</strong> ${user.phone}</li>
                    </ul>
                    <p><strong>Messaggio:</strong><br/>${user.message || 'Nessuno'}</p>
                `;
            } else if (leadType === 'short_term') {
                htmlContent = `
                    <h1>Richiesta Noleggio Breve Termine</h1>
                    <p><strong>Veicolo:</strong> ${vehicle} ${version}</p>
                    <div style="background-color: #f3f4f6; padding: 15px; border-radius: 10px; margin: 15px 0;">
                        <p style="margin: 0; font-weight: bold; color: #0060DF;">Piano Scelto: ${config?.plan || 'N/D'}</p>
                        <p style="margin: 5px 0 0 0;">Prezzo: ${config?.price}€ | Limite: ${config?.limit}</p>
                    </div>
                    <hr />
                    <h3>Dati Cliente</h3>
                    <ul>
                        <li><strong>Nome:</strong> ${user.name}</li>
                        <li><strong>Email:</strong> ${user.email}</li>
                        <li><strong>Telefono:</strong> ${user.phone}</li>
                    </ul>
                    <p><strong>Messaggio:</strong><br/>${user.message || 'Nessuno'}</p>
                `;
            } else {
                htmlContent = `
                    <h1>Nuova Richiesta Preventivo</h1>
                    <p><strong>Veicolo:</strong> ${vehicle} ${version}</p>
                    <p><strong>Configurazione:</strong> ${config?.months || '?'} Mesi / ${config?.km || '?'} Km annui</p>
                    <hr />
                    <h3>Dati Cliente (${user.type === 'piva' ? 'P.IVA' : 'Privato'})</h3>
                    <ul>
                        <li><strong>Nome:</strong> ${user.name}</li>
                        <li><strong>Email:</strong> ${user.email}</li>
                        <li><strong>Telefono:</strong> ${user.phone}</li>
                        <li><strong>CF/P.IVA:</strong> ${user.fiscalCode || 'N/D'}</li>
                    </ul>
                    <p><strong>Messaggio:</strong><br/>${user.message || 'Nessuno'}</p>
                `;
            }

            const { data: emailData, error: emailError } = await resend.emails.send({
                from: 'DSAS Mobility <info@dsas-mobility.it>', // Requires domain verification in Resend
                to: ['info@dsas-mobility.it'],
                subject: subject,
                html: htmlContent,
            });

            if (emailError) {
                console.error('Email Error:', emailError);
                // We don't throw here to avoid failing the whole request if DB saved ok
                emailStatus = 'failed';
            } else {
                emailStatus = 'sent';
            }
        }

        return new Response(JSON.stringify({
            success: true,
            id: dbId || 'orphan-email',
            email: emailStatus,
            dbStatus: dbId ? 'saved' : 'failed-but-email-sent'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error: any) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({
            success: false,
            error: error.message
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
};
