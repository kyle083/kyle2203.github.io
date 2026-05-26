import { useState } from 'react';
import { motion } from 'framer-motion';

interface TagFilterProps {
  categories: { id: string; label: string; count: number }[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function TagFilter({ categories, activeCategory, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onChange(cat.id)}
          className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeCategory === cat.id
              ? 'text-slate-50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white/10 rounded-xl border border-white/10"
              transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {cat.label}
            <span className="text-xs text-slate-500">({cat.count})</span>
          </span>
        </button>
      ))}
    </div>
  );
}
