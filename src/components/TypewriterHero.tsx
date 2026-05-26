import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = ['AI 开发者', '量化交易员', '终身学习者'];

export default function TypewriterHero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const typingSpeed = isDeleting ? 50 : 120;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(role.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-emerald-500/5" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-slate-400 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            欢迎来到我的数字空间
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight mb-6"
        >
          <span className="bg-gradient-to-r from-slate-50 via-slate-200 to-slate-400 bg-clip-text text-transparent">
            我是 Kyle
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-2xl sm:text-3xl font-medium mb-8 h-10"
        >
          <span className="text-slate-400">一位</span>
          <span className="bg-gradient-to-r from-violet-400 to-emerald-400 bg-clip-text text-transparent ml-2">
            {displayText}
          </span>
          <span className="inline-block w-0.5 h-7 bg-violet-400 ml-1 animate-pulse align-middle" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          在这里记录我的 AI 开发学习旅程与量化交易策略研究。
          <br />
          探索智能与数据的交汇点，用代码构建对未来的理解。
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="/ai-lab"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-violet-500 text-white font-medium hover:from-violet-500 hover:to-violet-400 transition-all shadow-lg shadow-violet-500/25"
          >
            探索 AI 实验室
          </a>
          <a
            href="/quant"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-200 font-medium hover:bg-white/10 transition-all"
          >
            查看量化策略
          </a>
        </motion.div>
      </div>
    </div>
  );
}
