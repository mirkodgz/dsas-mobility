
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './ui/Button';

interface LuxuryLeadFormProps {
    vehicleTitle: string;
    vehicleVersion: string;
    image?: string;
}

export default function LuxuryLeadForm({
    vehicleTitle,
    vehicleVersion,
    image
}: LuxuryLeadFormProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [userType, setUserType] = useState<'privato' | 'piva'>('privato');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        fiscalCode: '', // Optional for luxury simple contact? keeping it as standard
        message: '',
        privacy: false,
        marketing: false
    });

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = {
                vehicle: vehicleTitle,
                version: vehicleVersion,
                leadType: 'luxury', // Correct param name for backend email logic
                config: { type: 'luxury' }, // Stored in DB for Dashboard classification
                user: { type: userType, ...formData }
            };

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Errore sconosciuto');

            // alert('Richiesta inviata con successo! Verrai contattato a breve.');
            // setIsModalOpen(false);
            // setFormData({ ...formData, message: '', privacy: false, marketing: false });

            // Redirect to Thank You Page
            window.location.href = '/grazie';

        } catch (error: any) {
            console.error(error);
            alert(`Errore: ${error.message || 'Si è verificato un errore.'}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Button
                className="w-full h-14 rounded-xl text-lg font-bold shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform bg-secondary! text-white!"
                onClick={() => setIsModalOpen(true)}
            >
                RICHIEDI ORA
            </Button>

            {/* MODAL */}
            {isModalOpen && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm transition-all animate-fadeIn">
                    <div className="bg-white rounded-card shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn relative">

                        <div className="p-6 md:p-8 bg-white relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-primary z-10"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            {/* Header / Vehicle Info */}
                            <div className="mb-8 border-b border-gray-100 pb-6 flex gap-6 items-center">
                                {image && (
                                    <div className="w-24 h-16 shrink-0 bg-gray-50 rounded-lg p-1 flex items-center justify-center border border-gray-100">
                                        <img src={image} alt="Vehicle" className="w-full h-full object-contain mix-blend-multiply" />
                                    </div>
                                )}
                                <div>
                                    <h2 className="font-heading font-extrabold text-xl md:text-2xl text-primary mb-1 uppercase leading-tight">{vehicleTitle}</h2>
                                    <p className="text-gray-500 text-sm">{vehicleVersion}</p>
                                    <span className="inline-block mt-2 px-2 py-0.5 bg-secondary/10 text-secondary text-[10px] font-bold rounded uppercase tracking-wider">
                                        Luxury Collection
                                    </span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Type Selector */}
                                <div className="flex items-center gap-4 mb-2">
                                    <span className="font-bold text-primary text-sm">Sono un:</span>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setUserType('privato')}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${userType === 'privato' ? 'bg-secondary text-white border-secondary shadow-md' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            Privato
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setUserType('piva')}
                                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all flex items-center gap-1.5 cursor-pointer ${userType === 'piva' ? 'bg-secondary text-white border-secondary shadow-md' : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'}`}
                                        >
                                            P.IVA
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    <div className="relative z-0">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Nome e Cognome"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative z-0">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative z-0">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                        </div>
                                        <input
                                            type="tel"
                                            placeholder="Telefono"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                            required
                                            value={formData.phone}
                                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>
                                    <div className="relative z-0">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect></svg>
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="Codice Fiscale (Opzionale)"
                                            className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                            value={formData.fiscalCode}
                                            onChange={e => setFormData({ ...formData, fiscalCode: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <textarea
                                        placeholder="Messaggio o richieste particolari..."
                                        rows={3}
                                        className="w-full p-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium resize-none bg-gray-50/50 focus:bg-white text-gray-900"
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <div className="space-y-2 pt-1 border-t border-gray-50">
                                    <label className="flex items-start gap-2.5 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-secondary checked:border-secondary transition-colors"
                                                required
                                                checked={formData.privacy}
                                                onChange={e => setFormData({ ...formData, privacy: e.target.checked })}
                                            />
                                            <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <span className="text-[11px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors">Ho letto l'informativa sulla <a href="#" className="underline decoration-gray-300 hover:decoration-secondary hover:text-secondary transition-all">Privacy</a></span>
                                    </label>

                                    <label className="flex items-start gap-2.5 cursor-pointer group">
                                        <div className="relative flex items-center mt-0.5">
                                            <input
                                                type="checkbox"
                                                className="peer appearance-none w-4 h-4 border-2 border-gray-300 rounded checked:bg-secondary checked:border-secondary transition-colors"
                                                checked={formData.marketing}
                                                onChange={e => setFormData({ ...formData, marketing: e.target.checked })}
                                            />
                                            <svg className="absolute w-2.5 h-2.5 text-white pointer-events-none hidden peer-checked:block left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </div>
                                        <span className="text-[11px] text-gray-500 leading-tight group-hover:text-gray-700 transition-colors">Acconsento al trattamento Marketing</span>
                                    </label>
                                </div>

                                <div className="pt-2">
                                    <Button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full rounded-pill py-3.5 text-sm font-bold bg-secondary! text-white! hover:opacity-90 hover:scale-[1.01] shadow-lg shadow-secondary/20 transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {submitting ? 'INVIO IN CORSO...' : 'INVIA RICHIESTA'}
                                    </Button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>,
                document.body
            )}
        </>
    );
}
