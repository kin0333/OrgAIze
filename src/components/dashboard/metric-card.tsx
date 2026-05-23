interface MetricCardProps {
  label: string
  value: string
  subtitle?: string
  icon: React.ReactNode
  trend?: "up" | "down" | "neutral"
  accentColor?: string
}

export const MetricCard = ({
  label,
  value,
  subtitle,
  icon,
  trend = "neutral",
  accentColor = "#007a33",
}: MetricCardProps) => {
  const trendIcon = trend === "up" ? "↑" : trend === "down" ? "↓" : ""
  const trendColor = trend === "up" ? "text-[#007a33]" : trend === "down" ? "text-red-500" : ""

  return (
    <div
      className="glass-card glass-card-hover p-6"
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold tracking-tight text-slate-800 font-mono">
              {value}
            </p>
            {trendIcon && (
              <span className={`text-sm font-semibold ${trendColor}`}>
                {trendIcon}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${accentColor}15`, color: accentColor }}
        >
          {icon}
        </div>
      </div>
    </div>
  )
}
