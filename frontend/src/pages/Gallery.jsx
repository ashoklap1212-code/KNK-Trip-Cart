/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import DomeGallery from '../components/DomeGallery';

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/gallery');
                if (res.data && res.data.length > 0) {
                    const formatted = res.data.map(img => ({ src: img.imageUrl, alt: img.title || 'Gallery Image' }));
                    setImages(formatted);
                } else {
                    // Fallback to defaults shown in DomeGallery if no images found
                    setImages([]);
                }
            } catch (err) {
                console.warn('Failed to fetch gallery images, using defaults.', err);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    if (loading) {
        return (
            <div className="w-full bg-[#180a02] min-h-screen pt-20 flex flex-col items-center justify-center">
                <p className="text-amber-500 font-serif text-xl tracking-widest animate-pulse">Loading Sacred Gallery...</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-[#180a02] min-h-screen pt-20 flex flex-col items-center overflow-hidden">
            <div className="text-center py-10 z-10 relative">
                <p className="text-amber-500 uppercase tracking-[0.3em] font-semibold text-sm mb-2">Sacred Moments</p>
                <h2 className="text-4xl md:text-5xl font-serif text-amber-50">Our Gallery</h2>
                <p className="text-amber-200/60 mt-4 max-w-lg mx-auto px-4">
                    Click and drag to explore the divine atmosphere of our past yatras. Tap an image to view it fully.
                </p>
            </div>

            <div className="flex-1 w-full relative" style={{ height: 'calc(100vh - 200px)' }}>
                <DomeGallery
                    images={images.length > 0 ? images : undefined}
                    fit={0.8}
                    minRadius={600}
                    maxVerticalRotationDeg={0}
                    segments={34}
                    dragDampening={2}
                    grayscale={false}
                />
            </div>
        </div>
    );
}
