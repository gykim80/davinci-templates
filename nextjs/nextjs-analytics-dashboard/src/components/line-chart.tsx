import type { IDataPoint } from "@/lib/chart-data";

interface ILineChartProps {
  data: IDataPoint[];
  height?: number;
  color?: string;
}

export function LineChart({
  data,
  height = 300,
  color = "hsl(var(--primary))",
}: ILineChartProps) {
  if (data.length === 0) return null;

  const padding = { top: 20, right: 20, bottom: 40, left: 60 };
  const width = 800;
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...data.map((d) => d.value));
  const minValue = Math.min(...data.map((d) => d.value));
  const valueRange = maxValue - minValue || 1;

  // 포인트 좌표 계산
  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + chartHeight - ((d.value - minValue) / valueRange) * chartHeight,
    ...d,
  }));

  // SVG path 생성
  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  // 영역 path (gradient fill 용)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + chartHeight} L ${points[0].x} ${padding.top + chartHeight} Z`;

  // Y축 눈금
  const yTicks = 5;
  const yTickValues = Array.from({ length: yTicks }, (_, i) =>
    Math.round(minValue + (valueRange / (yTicks - 1)) * i)
  );

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Y축 그리드라인 + 레이블 */}
      {yTickValues.map((tick) => {
        const y =
          padding.top +
          chartHeight -
          ((tick - minValue) / valueRange) * chartHeight;
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
              {tick >= 1000 ? `${(tick / 1000).toFixed(0)}k` : tick}
            </text>
          </g>
        );
      })}

      {/* X축 레이블 */}
      {points.map((p) => (
        <text
          key={p.label}
          x={p.x}
          y={height - 8}
          textAnchor="middle"
          className="fill-muted-foreground text-[11px]"
        >
          {p.label}
        </text>
      ))}

      {/* 영역 */}
      <path d={areaPath} fill="url(#lineGradient)" />

      {/* 라인 */}
      <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* 데이터 포인트 */}
      {points.map((p) => (
        <circle key={p.label} cx={p.x} cy={p.y} r="4" fill={color} stroke="hsl(var(--background))" strokeWidth="2" />
      ))}
    </svg>
  );
}
