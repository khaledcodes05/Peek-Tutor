import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function AccordionItem({
  id,
  question,
  answer,
  isOpen,
  onToggle
}) {
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden bg-[#111A2E]/60 transition-colors hover:border-electric-500/30">
      <button
        type="button"
        id={`accordion-header-${id}`}
        aria-controls={`accordion-panel-${id}`}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-400 cursor-pointer"
      >
        <span className="font-bold text-sm sm:text-base text-slate-100 leading-snug">
          {question}
        </span>
        <div
          className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 shrink-0 transition-transform duration-200 ${
            isOpen ? 'rotate-180 bg-electric-500/10 text-electric-400' : ''
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-panel-${id}`}
            role="region"
            aria-labelledby={`accordion-header-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="p-5 pt-0 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
