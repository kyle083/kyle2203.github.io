import { motion } from 'framer-motion';
import { GraduationCap, Code, TrendingUp } from 'lucide-react';

const milestones = [
  {
    year: '2023',
    title: '开始 AI 学习之旅',
    description: '接触机器学习和深度学习，完成吴恩达机器学习课程',
    icon: Code,
    color: 'from-violet-500 to-blue-500',
  },
  {
    year: '2024',
    title: '辅修人工智能',
    description: '在浙江财经大学辅修 AI 专业，系统学习神经网络与计算机视觉',
    icon: GraduationCap,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    year: '2024',
    title: '探索量化交易',
    description: '学习金融市场分析，研究技术指标与策略回测',
    icon: TrendingUp,
    color: 'from-emerald-500 to-amber-500',
  },
  {
    year: '2025',
    title: '持续精进',
    description: '深入 LLM 应用开发与量化策略优化，记录学习心得',
    icon: Code,
    color: 'from-amber-500 to-orange-500',
  },
];

export default function Timeline() {
  return (
    <div className="relative">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-violet-500/50 via-emerald-500/50 to-transparent" />
      
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-12"
          >
            <div className={`absolute left-0 top-0 w-8 h-8 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-lg`}>
              <milestone.icon size={14} className="text-white" />
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
