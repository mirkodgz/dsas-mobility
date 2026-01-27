
import React, { useState, useEffect, useCallback } from "react";

interface VehicleGalleryProps {
    images: string[];
}

export default function VehicleGallery({ images }: VehicleGalleryProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index: number) => {
        setCurrentIndex(index);
        setIsOpen(true);
        // Prevent body scroll
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = useCallback(() => {
        setIsOpen(false);
        // Restore body scroll
        document.body.style.overflow = "auto";
    }, []);

    const goToPrevious = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }, [images.length]);

    const goToNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, [images.length]);

    // Handle Keyboard Events
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") goToPrevious();
            if (e.key === "ArrowRight") goToNext();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, closeLightbox, goToPrevious, goToNext]);

    if (!images || images.length === 0) return null;

    return (
        <div className="col-span-1 lg:col-span-2 mt-8 pt-12 border-t border-gray-200">
            {/* MASONRY VIEW */}
            <div className="columns-1 md:columns-2 lg:columns-4 gap-6 space-y-6">
                {images.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => openLightbox(idx)}
                        className="break-inside-avoid mb-6 group cursor-pointer relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all"
                    >
                        <img
                            src={img}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 block"
                            loading="lazy"
                        />
                        {/* Overlay hint */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-bold shadow-lg transform scale-90 group-hover:scale-100 transition-all">
                                Ingrandisci
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* LIGHTBOX OVERLAY */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-9999 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors p-2 z-100"
                        aria-label="Chiudi"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>

                    {/* Navigation Buttons (Desktop) */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 hidden md:block z-100"
                        aria-label="Precedente"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 rounded-full hover:bg-white/10 hidden md:block z-100"
                        aria-label="Successiva"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>

                    {/* Main Image Container */}
                    <div
                        className="relative max-w-7xl max-h-[90vh] w-full flex flex-col items-center justify-center pointer-events-none"
                    >
                        <img
                            src={images[currentIndex]}
                            alt={`Gallery Fullscreen ${currentIndex + 1}`}
                            className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm pointer-events-auto"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Mobile Controls (Under image) */}
                        <div className="flex md:hidden items-center justify-between w-full max-w-xs mt-6 pointer-events-auto px-4">
                            <button
                                onClick={goToPrevious}
                                className="text-white/80 p-3 rounded-full bg-white/10 active:bg-white/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                            </button>
                            <span className="text-white/70 text-sm font-medium">
                                {currentIndex + 1} / {images.length}
                            </span>
                            <button
                                onClick={goToNext}
                                className="text-white/80 p-3 rounded-full bg-white/10 active:bg-white/20"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </button>
                        </div>

                        {/* Desktop Counter */}
                        <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white/50 text-sm font-medium tracking-widest hidden md:block">
                            {currentIndex + 1} DI {images.length}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
