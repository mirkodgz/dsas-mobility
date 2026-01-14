import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Button from '../components/ui/Button';

interface Field {
    key: string;
    label: string;
    type?: 'text' | 'number' | 'email';
}

interface TableManagerProps {
    tableName: string;
    title: string;
    fields: Field[];
    orderBy?: string;
}

export default function TableManager({ tableName, title, fields, orderBy = 'name' }: TableManagerProps) {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any | null>(null);
    const [formData, setFormData] = useState<any>({});

    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        const { data: result, error } = await supabase
            .from(tableName)
            .select('*')
            .order(orderBy, { ascending: true });

        if (error) {
            console.error('Error fetching data:', error);
            alert(`Errore nel caricamento dei dati: ${error.message} (${error.code || 'N/A'})`);
        } else {
            setData(result || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, [tableName]);

    const handleOpenModal = (item: any = null) => {
        setEditingItem(item);
        if (item) {
            setFormData(item);
        } else {
            // Reset form based on fields
            const emptyData: any = {};
            fields.forEach(f => emptyData[f.key] = '');
            setFormData(emptyData);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let error;
        if (editingItem) {
            // Update
            const { error: updateError } = await supabase
                .from(tableName)
                .update(formData)
                .eq('id', editingItem.id);
            error = updateError;
        } else {
            // Insert
            const { error: insertError } = await supabase
                .from(tableName)
                .insert([formData]);
            error = insertError;
        }

        if (error) {
            console.error('Error saving:', error);
            alert('Errore nel salvataggio: ' + error.message);
        } else {
            handleCloseModal();
            fetchData();
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Sei sicuro di voler eliminare questo elemento?')) return;

        const { error } = await supabase
            .from(tableName)
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting:', error);
            alert('Errore: impossibile eliminare (probabilmente è usato in altri record)');
        } else {
            fetchData();
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <p className="text-gray-500 text-sm mt-1">Gestisci le opzioni per {title}</p>
                </div>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                    <span className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                        Aggiungi
                    </span>
                </Button>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
                                {fields.map(field => (
                                    <th key={field.key} className="pb-4 font-semibold">{field.label}</th>
                                ))}
                                <th className="pb-4 font-semibold text-right">Azioni</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan={fields.length + 1} className="py-8 text-center text-gray-400">
                                        Nessun dato presente
                                    </td>
                                </tr>
                            ) : (
                                data.map((item) => (
                                    <tr key={item.id} className="group hover:bg-gray-50 transition-colors">
                                        {fields.map(field => (
                                            <td key={field.key} className="py-4 font-medium text-gray-700">
                                                {item[field.key]}
                                            </td>
                                        ))}
                                        <td className="py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Modifica"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Elimina"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800">{editingItem ? 'Modifica' : 'Aggiungi'} elemento</h3>
                            <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {fields.map(field => (
                                <div key={field.key}>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                                    <input
                                        type={field.type || 'text'}
                                        name={field.key}
                                        value={formData[field.key] || ''}
                                        onChange={handleChange}
                                        className="w-full h-10 px-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        required
                                    />
                                </div>
                            ))}

                            <div className="pt-4 flex justify-end gap-3">
                                <Button variant="outline" type="button" onClick={handleCloseModal} className="border-gray-300 text-gray-600">Annulla</Button>
                                <Button variant="primary" type="submit">{editingItem ? 'Salva Modifiche' : 'Crea Elemento'}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
