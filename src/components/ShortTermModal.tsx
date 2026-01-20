import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from './ui/Button';

interface LeadData {
    vehicle: string;
    brand: string;
    model: string;
    version: string;
    plan: 'Giornaliero' | 'Settimanale' | 'Mensile';
    price: number | string;
    limit: string;
    image: string;
}

export default function ShortTermModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [leadData, setLeadData] = useState<LeadData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        message: '',
        privacy: false
    });

    useEffect(() => {
        // Expose function to global window object
        (window as any).openShortTermModal = (data: LeadData) => {
            setLeadData(data);
            setIsOpen(true);
            document.body.style.overflow = 'hidden';
        };

        return () => {
            delete (window as any).openShortTermModal;
            document.body.style.overflow = 'unset';
        };
    }, []);

    const onClose = () => {
        setIsOpen(false);
        document.body.style.overflow = 'unset';
        setFormData({
            name: '',
            surname: '',
            email: '',
            phone: '',
            message: '',
            privacy: false
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.privacy) {
            alert('Devi accettare la normativa sulla privacy per procedere.');
            return;
        }

        setIsLoading(true);

        try {
            const payload = {
                leadType: 'short_term',
                vehicle: leadData?.vehicle,
                version: leadData?.version,
                config: {
                    plan: leadData?.plan,
                    price: leadData?.price,
                    limit: leadData?.limit
                },
                user: {
                    name: `${formData.name} ${formData.surname}`,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                    type: 'private'
                }
            };

            const response = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                alert('Richiesta inviata con successo! Verrai ricontattato a breve.');
                onClose();
            } else {
                throw new Error(result.error || 'Errore sconosciuto');
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Errore durante l\'invio della richiesta. Riprova più tardi.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen || !leadData) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm transition-all animate-fadeIn">
            {/* Backdrop click to close */}
            <div className="absolute inset-0" onClick={onClose}></div>

            <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-scaleIn relative z-10 flex flex-col">

                {/* Close Button */}
                <div className="absolute top-4 right-4 z-20">
                    <button onClick={onClose} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 text-gray-500 hover:text-red-500 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                <div className="p-6 md:p-8 pt-12">
                    <div className="mb-6 border-b border-gray-100 pb-6">
                        <span className="inline-block bg-secondary/10 text-secondary px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider mb-3">
                            Tariffa {leadData.plan}
                        </span>
                        <h2 className="text-2xl font-bold text-primary mb-1">{leadData.brand} {leadData.model}</h2>
                        <p className="text-gray-500 text-sm mb-4">{leadData.version}</p>

                        <div className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-xl">
                            <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Prezzo</p>
                                <p className="text-xl font-bold text-primary">{leadData.price}€</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Incluso</p>
                                <p className="text-sm font-bold text-gray-700">{leadData.limit}</p>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 ml-1">Nome</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-700 ml-1">Cognome</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                    value={formData.surname}
                                    onChange={e => setFormData({ ...formData, surname: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700 ml-1">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700 ml-1">Telefono</label>
                            <input
                                type="tel"
                                required
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-700 ml-1">Messaggio (Opzionale)</label>
                            <textarea
                                rows={2}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all resize-none"
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="flex items-start gap-3 mt-2">
                            <input
                                type="checkbox"
                                id="privacy-st"
                                required
                                checked={formData.privacy}
                                onChange={e => setFormData({ ...formData, privacy: e.target.checked })}
                                className="mt-1 w-4 h-4 text-secondary rounded border-gray-300 focus:ring-secondary"
                            />
                            <label htmlFor="privacy-st" className="text-xs text-gray-500 leading-tight">
                                Acconsento al trattamento dei dati personali secondo la Privacy Policy.
                            </label>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full py-3 mt-2"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Invio in corso...' : 'Invia Richiesta'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>,
        document.body
    );
}
