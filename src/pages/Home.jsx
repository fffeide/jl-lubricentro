import { motion } from 'framer-motion';
import { MessageCircle, Car } from 'lucide-react';
import HeroSection from '@/components/home/HeroSection';
import MiLubricentroSection from '@/components/home/MiLubricentroSection';
import BenefitsSection from '@/components/home/BenefitsSection';
import BrandsSection from '@/components/home/BrandsSection';
import ServicesSection from '@/components/home/ServicesSection';
import ContactSection from '@/components/home/ContactSection';
import EmpresasSection from '@/components/home/EmpresasSection';
import Footer from '@/components/home/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeroSection />
      <MiLubricentroSection />
      <BenefitsSection />
      <BrandsSection />
      <ServicesSection />
      <EmpresasSection />
      <ContactSection />
      <Footer />
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="/MiLubricentro" className="group">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-colors relative"
          >
            <Car className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              Mi Lubricentro
            </span>
          </motion.div>
        </a>
        <a
          href="https://wa.me/5491127963982"
          target="_blank"
          rel="noopener noreferrer"
          className="group"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-500 hover:bg-green-600 text-white p-3 sm:p-4 rounded-full shadow-2xl transition-colors relative"
          >
            <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              WhatsApp
            </span>
          </motion.div>
        </a>
      </div>
    </div>
  );
}
