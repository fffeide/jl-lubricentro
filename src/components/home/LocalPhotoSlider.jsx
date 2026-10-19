import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const photos = [
  { src: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/d10dccaf8_DSC00813.jpg', alt: 'Stock de lubricantes' },
  { src: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/666ad12fe_DSC01343.jpg', alt: 'Trabajo en el local' },
  { src: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/00a21352e_DSC01560.jpg', alt: 'El local' },
  { src: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/6ae08b2e2_DSC01979.jpg', alt: 'Trabajo en el motor' },
  { src: 'https://media.base44.com/images/public/696aa1f97e380e2a77bc63ce/a07536786_DSC02003.jpg', alt: 'Diagnóstico computarizado' },
];

export default function LocalPhotoSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % photos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={photos[current].src}
          alt={photos[current].alt}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
}
