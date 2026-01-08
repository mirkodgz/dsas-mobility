import { useState } from 'react';

type FAQItem = {
    question: string;
    answer: string;
};

interface FAQProps {
    items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={`border border-gray-100 rounded-xl bg-white overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-lg ring-1 ring-primary/5' : 'hover:border-gray-200'
                        }`}
                >
                    <button
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                        onClick={() => toggle(index)}
                    >
                        <span className={`font-bold text-lg ${openIndex === index ? 'text-primary' : 'text-gray-700'}`}>
                            {item.question}
                        </span>
                        <div className={`p-2 rounded-full transition-colors ${openIndex === index ? 'bg-primary/10 text-primary' : 'bg-gray-50 text-gray-400'}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transform transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </button>

                    <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                            }`}
                    >
                        <div className="p-6 pt-0 text-gray-500 leading-relaxed">
                            {item.answer}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
