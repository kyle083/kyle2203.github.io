import { useEffect, useRef } from 'react';
import { createChart, ColorType, LineStyle } from 'lightweight-charts';

export default function BacktestChart() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#8888a0',
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' },
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' },
      },
      crosshair: {
        mode: 1,
        vertLine: { color: '#8b5cf6', style: LineStyle.Dashed },
        horzLine: { color: '#8b5cf6', style: LineStyle.Dashed },
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      timeScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)',
      },
      width: chartContainerRef.current.clientWidth,
      height: 300,
    });

    const lineSeries = chart.addLineSeries({
      color: '#8b5cf6',
      lineWidth: 2,
      title: '策略收益',
    });

    const benchmarkSeries = chart.addLineSeries({
      color: 'rgba(255, 255, 255, 0.3)',
      lineWidth: 1,
      title: '基准收益',
    });

    // Generate mock backtest data
    const generateData = () => {
      const data = [];
      const benchmark = [];
      let value = 100;
      let bench = 100;
      const startDate = new Date('2024-01-01');

      for (let i = 0; i < 252; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const timeStr = date.toISOString().split('T')[0];

        value *= 1 + (Math.random() - 0.45) * 0.02;
        bench *= 1 + (Math.random() - 0.48) * 0.015;

        data.push({ time: timeStr, value: Number(value.toFixed(2)) });
        benchmark.push({ time: timeStr, value: Number(bench.toFixed(2)) });
      }
      return { data, benchmark };
    };

    const { data, benchmark } = generateData();
    lineSeries.setData(data);
    benchmarkSeries.setData(benchmark);
    chart.timeScale().fitContent();

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, []);

  return (
    <div className="w-full rounded-xl bg-white/[0.03] border border-white/[0.08] p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-medium text-slate-300">策略回测曲线</h4>
        <div className="flex items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-violet-500" />
            策略收益
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 rounded-full bg-slate-500/50" />
            基准收益
          </span>
        </div>
      </div>
      <div ref={chartContainerRef} />
    </div>
  );
}
