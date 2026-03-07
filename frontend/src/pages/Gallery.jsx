/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import axios from 'axios';
import DomeGallery from '../components/DomeGallery';

const FALLBACK_IMAGES = [
    { src: 'https://images.unsplash.com/photo-1678468736044-21ec37e9c86a?w=800', alt: 'Kedarnath Temple' },
    { src: 'https://images.unsplash.com/photo-1706194054764-893df50c6dd7?w=800', alt: 'Varanasi Ghat' },
    { src: 'https://images.unsplash.com/photo-1580127893847-5a2e4e72af78?w=800', alt: 'Tirupati Balaji' },
    { src: 'https://images.unsplash.com/photo-1544015759-62a2fa4b3d7a?w=800', alt: 'Rameshwaram Temple' },
    { src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800', alt: 'Shirdi Sai Baba' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800', alt: 'Pilgrims Journey' },
    { src: 'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=800', alt: 'Venkateswara Temple' },
    { src: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800', alt: 'Holy River' },
];

export default function Gallery() {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/gallery');

                let dbImages = [];
                if (res.data && res.data.length > 0) {
                    dbImages = res.data.map(img => ({ src: img.imageUrl, alt: img.title || 'Gallery Image' }));
                }

                // Always merge with fallbacks so the 3D grid is fully populated
                // Placed DB images first so they are front and center
                const combinedImages = [...dbImages, ...FALLBACK_IMAGES];
                setImages(combinedImages);
            } catch (err) {
                console.warn('Failed to fetch gallery images, using defaults.', err);
                setImages(FALLBACK_IMAGES);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    return (
        <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(180deg,#1e0903 0%,#2d0f05 100%)' }}>

            {/* Header — account for fixed navbar */}
            <div className="pt-24 pb-8 text-center px-4">
                <p className="text-amber-400 uppercase tracking-[0.35em] font-bold text-xs md:text-sm mb-3">
                    Sacred Moments
                </p>
                <h1 className="text-3xl md:text-5xl font-serif text-amber-50 mb-4">Our Gallery</h1>
                <div className="w-20 mx-auto mb-4" style={{ height: '2px', background: 'linear-gradient(90deg,transparent,#fbbf24,transparent)' }} />
                <p className="text-amber-200/55 text-sm md:text-base max-w-md mx-auto leading-relaxed">
                    Drag to explore divine moments from our past yatras. Tap any image to view it fully.
                </p>
            </div>

            {/* Dome Gallery — takes remaining height */}
            {loading ? (
                <div className="flex-1 flex items-center justify-center">
                    <p className="text-amber-400 font-serif text-lg tracking-widest animate-pulse">Loading Gallery...</p>
                </div>
            ) : (
                <div className="flex-1 w-full" style={{ minHeight: '500px' }}>
                    <DomeGallery
                        images={images}
                        fit={0.75}
                        minRadius={window.innerWidth < 768 ? 320 : 560}
                        maxVerticalRotationDeg={0}
                        segments={window.innerWidth < 768 ? 20 : 30}
                        dragDampening={2}
                        grayscale={false}
                    />
                </div>
            )}
        </div>
    );
}
