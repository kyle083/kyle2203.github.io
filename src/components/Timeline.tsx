import { useEffect, useRef, useState } from 'react';

const milestones = [
  {
    year: '2021',
    title: '进入浙江财经大学',
    description: '开始攻读数字经济专业，接触数据思维与数字化技术',
    color: 'from-violet-500 to-blue-500',
  },
  {
    year: '2022',
    title: '开始学习人工智能',
    description: '系统学习机器学习、深度学习与神经网络，开启 AI 探索之路',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2024',
    title: '探索量化交易',
    description: '学习金融市场分析，研究技术指标与策略回测',
    color: 'from-emerald-500 to-amber-500',
  },
  {
    year: '2025',
    title: '持续精进',
    description: '深入 LLM 应用开发与量化策略优化，记录学习心得',
    color: 'from-amber-500 to-orange-500',
  },
];

export default function Timeline() {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.3 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-emerald-500/50 to-transparent" />
      
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div
            key={index}
            ref={(el) => { itemRefs.current[index] = el; }}
            data-index={index}
            className={`relative pl-12 transition-all duration-500 ${
              visibleItems.has(index)
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-5'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <span className="text-xs font-medium text-violet-400 mb-1 block">
                {milestone.year}
              </span>
              <h4 className="text-base font-semibold text-slate-50 mb-1">
                {milestone.title}
              </h4>
              <p className="text-sm text-slate-400">
                {milestone.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
