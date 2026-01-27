
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './ui/Button';

export default function ValuationModal() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        vehicleInfo: '', // "Marca, Modello, Anno"
        message: '',
        privacy: false
    });

    useEffect(() => {
        // Expose open function to global window so it can be called from vanilla JS buttons
        (window as any).openValuationModal = () => setIsModalOpen(true);

        return () => {
            delete (window as any).openValuationModal;
        };
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
            // Reset form on close if needed, or keep state
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isModalOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const payload = {
                leadType: 'valuation',
                user: {
                    name: formData.name,
                    email: formData.email,
                    phone: formData.phone,
                    vehicleInfo: formData.vehicleInfo,
                    message: formData.message,
                    type: 'private' // Default for valuation
                }
            };

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (!response.ok) throw new Error(result.error || 'Errore sconosciuto');

            // alert('Richiesta inviata con successo! Un nostro esperto ti contatterà per la valutazione.');
            // setIsModalOpen(false);
            // setFormData({
            //     name: '', email: '', phone: '', vehicleInfo: '', message: '', privacy: false
            // });

            window.location.href = '/grazie';

        } catch (error: any) {
            console.error(error);
            alert(`Errore: ${error.message || 'Si è verificato un errore.'}`);
        } finally {
            setSubmitting(false);
        }
    };

    if (!isModalOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm transition-all animate-fadeIn">
            <div className="bg-white rounded-card shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scaleIn relative">

                <div className="p-6 md:p-8 bg-white relative">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-primary z-10"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="mb-6 border-b border-gray-100 pb-4">
                        <h2 className="font-heading font-extrabold text-2xl text-primary mb-2 uppercase leading-tight">Valutazione Gratuita</h2>
                        <p className="text-gray-500 text-sm">Compila il form per ricevere una stima della tua auto.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Vehicle Info */}
                        <div className="relative z-0">
                            <label className="block text-xs font-bold text-gray-700 mb-1 ml-1 uppercase">Veicolo da vendere</label>
                            <input
                                type="text"
                                placeholder="Marca, Modello, Anno (es. Fiat 500, 2018)"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                required
                                value={formData.vehicleInfo}
                                onChange={e => setFormData({ ...formData, vehicleInfo: e.target.value })}
                            />
                        </div>

                        {/* Contact Info */}
                        <div className="relative z-0">
                            <input
                                type="text"
                                placeholder="Nome e Cognome"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="relative z-0">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                required
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div className="relative z-0">
                            <input
                                type="tel"
                                placeholder="Telefono"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-gray-400 text-sm font-medium bg-gray-50/50 focus:bg-white text-gray-900"
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        {/* Privacy */}
                        <div className="space-y-2 pt-2 border-t border-gray-50">
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
                        </div>

                        <div className="pt-2">
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="w-full rounded-pill py-3.5 text-sm font-bold bg-secondary! text-white! hover:opacity-90 hover:scale-[1.01] shadow-lg shadow-secondary/20 transition-all uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {submitting ? 'INVIO IN CORSO...' : 'RICHIEDI VALUTAZIONE'}
                            </Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}
