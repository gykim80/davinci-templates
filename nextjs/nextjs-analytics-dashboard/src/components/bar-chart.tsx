import type { IDataPoint } from "@/lib/chart-data";

interface IBarChartProps {
  data: IDataPoint[];
  height?: number;
}

const BAR_COLORS = [
  "hsl(var(--primary))",
  "hsl(240 5% 64.9%)",
  "hsl(217 91% 60%)",
  "hsl(142 71% 45%)",
  "hsl(38 92% 50%)",
];

export function BarChart({ data, height = 300 }: IBarChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 50, left: 60 };
  const width = 600;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = chartWidth / data.length * 0.6;
  const barGap = chartWidth / data.length * 0.4;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      {/* Y축 그리드라인 */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const y = padding.top + chartHeight - (tick / (maxValue || 100)) * chartHeight;
        if (tick > maxValue) return null;
        return (
          <g key={tick}>
            <line
              x1={padding.left}
              y1={y}
              x2={width - padding.right}
              y2={y}
              stroke="hsl(var(--border))"
              strokeDasharray="4 4"
            />
            <text
              x={padding.left - 10}
              y={y + 4}
              textAnchor="end"
              className="fill-muted-foreground text-[11px]"
            >
              {tick}%
            </text>
          </g>
        );
      })}

      {/* 바 */}
      {data.map((d, i) => {
        const barHeight = (d.value / (maxValue || 1)) * chartHeight;
        const x = padding.left + i * (barWidth + barGap) + barGap / 2;
        const y = padding.top + chartHeight - barHeight;

        return (
          <g key={d.label}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="4"
              fill={BAR_COLORS[i % BAR_COLORS.length]}
              opacity="0.85"
            />
            {/* 값 레이블 */}
            <text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              className="fill-foreground text-[12px] font-medium"
            >
              {d.value}%
            </text>
            {/* X축 레이블 */}
            <text
              x={x + barWidth / 2}
              y={height - 8}
              textAnchor="middle"
              className="fill-muted-foreground text-[10px]"
            >
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
