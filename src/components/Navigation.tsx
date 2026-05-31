import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain, TrendingUp, Folder, BookOpen, User, Home } from 'lucide-react';

const baseUrl = import.meta.env.BASE_URL;

const navItems = [
  { href: baseUrl, label: '首页', icon: Home },
  { href: baseUrl + 'ai-lab', label: 'AI实验室', icon: Brain },
  { href: baseUrl + 'quant', label: '量化交易', icon: TrendingUp },
  { href: baseUrl + 'projects', label: '项目集', icon: Folder },
  { href: baseUrl + 'blog', label: '博客', icon: BookOpen },
  { href: baseUrl + 'about', label: '关于', icon: User },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-slate-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href={baseUrl} className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <span className="font-semibold text-slate-50 group-hover:text-violet-400 transition-colors">
              Kyle
            </span>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-50 hover:bg-white/5 transition-all"
              >
                <item.icon size={16} />
                {item.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-slate-50 hover:bg-white/5"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-slate-50 hover:bg-white/5 transition-all"
                  onClick={() => setMobileOpen(false)}
                >
                  <item.icon size={16} />
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
