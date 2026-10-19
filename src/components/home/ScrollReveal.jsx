import { motion } from 'framer-motion';

// Reusable scroll-reveal wrapper: fade + slide from bottom, fires once on enter.
// Stagger via the `delay` prop.
export default function ScrollReveal({ children, delay = 0, y = 40, className = '', as = 'div' }) {
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
