import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

interface ChartData {
  label: string;
  value: number;
  color: string;
}

interface DataVisualizationProps {
  className?: string;
}

const DataVisualization = ({ className = "" }: DataVisualizationProps) => {
  const { theme } = useTheme();
  const [knowledgeData, setKnowledgeData] = useState<ChartData[]>([
    { label: '笔记', value: 45, color: '#3b82f6' },
    { label: '文档', value: 30, color: '#10b981' },
    { label: '图片', value: 15, color: '#f59e0b' },
    { label: '其他', value: 10, color: '#ef4444' }
  ]);

  const [activityData, setActivityData] = useState([
    { day: '周一', count: 12 },
    { day: '周二', count: 18 },
    { day: '周三', count: 15 },
    { day: '周四', count: 22 },
    { day: '周五', count: 19 },
    { day: '周六', count: 8 },
    { day: '周日', count: 5 }
  ]);

  const [trendData, setTrendData] = useState({
    thisWeek: 89,
    lastWeek: 76,
    change: 17
  });

  // 简单的饼图组件
  const PieChartComponent = ({ data }: { data: ChartData[] }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let cumulativePercentage = 0;

    const generatePath = (item: ChartData, index: number) => {
      const percentage = item.value / total;
      const startAngle = cumulativePercentage * 360;
      const endAngle = (cumulativePercentage + percentage) * 360;
      
      cumulativePercentage += percentage;

      const startAngleRad = (startAngle * Math.PI) / 180;
      const endAngleRad = (endAngle * Math.PI) / 180;

      const largeArcFlag = percentage > 0.5 ? 1 : 0;

      const x1 = Math.cos(startAngleRad);
      const y1 = Math.sin(startAngleRad);
      const x2 = Math.cos(endAngleRad);
      const y2 = Math.sin(endAngleRad);

      return `M 0 0 L ${x1} ${y1} A 1 1 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    return (
      <div 
        className="rounded-lg p-4 shadow-md"
        style={{ 
          backgroundColor: theme.colors.surface,
          boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="w-5 h-5" style={{ color: theme.colors.textSecondary }} />
          <h3 className="font-semibold" style={{ color: theme.colors.text }}>知识库组成</h3>
        </div>
        <div className="flex items-center justify-center">
          <div className="relative w-32 h-32">
            <svg viewBox="-1 -1 2 2" className="w-full h-full transform -rotate-90">
              {data.map((item, index) => (
                <path
                  key={index}
                  d={generatePath(item, index)}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              ))}
            </svg>
          </div>
          <div className="ml-6 space-y-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span style={{ color: theme.colors.textSecondary }}>{item.label}</span>
                <span className="font-medium" style={{ color: theme.colors.text }}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // 简单的条形图组件
  const BarChartComponent = ({ data }: { data: Array<{ day: string; count: number }> }) => {
    const maxCount = Math.max(...data.map(d => d.count));

    return (
      <div 
        className="rounded-lg p-4 shadow-md"
        style={{ 
          backgroundColor: theme.colors.surface,
          boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5" style={{ color: theme.colors.textSecondary }} />
          <h3 className="font-semibold" style={{ color: theme.colors.text }}>本周活动</h3>
        </div>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div 
                className="w-8 text-xs text-right"
                style={{ color: theme.colors.textMuted }}
              >
                {item.day}
              </div>
              <div 
                className="flex-1 rounded-full h-2 relative overflow-hidden"
                style={{ backgroundColor: theme.colors.surfaceHover }}
              >
                <div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${(item.count / maxCount) * 100}%`,
                    animationDelay: `${index * 100}ms`
                  }}
                />
              </div>
              <div 
                className="w-6 text-xs text-right"
                style={{ color: theme.colors.textSecondary }}
              >
                {item.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 趋势指标组件
  const TrendIndicator = () => {
    const isPositive = trendData.change > 0;
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
      <div 
        className="rounded-lg p-4 shadow-md"
        style={{ 
          backgroundColor: theme.colors.surface,
          boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5" style={{ color: theme.colors.textSecondary }} />
          <h3 className="font-semibold" style={{ color: theme.colors.text }}>活跃度趋势</h3>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                {trendData.thisWeek}
              </div>
              <div className="text-sm" style={{ color: theme.colors.textMuted }}>
                本周活动
              </div>
            </div>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm ${
              isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
            }`}>
              <TrendIcon className="w-4 h-4" />
              <span>{Math.abs(trendData.change)}%</span>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span style={{ color: theme.colors.textMuted }}>
              上周: {trendData.lastWeek}
            </span>
            <span style={{ color: theme.colors.textMuted }}>
              {isPositive ? '增长' : '下降'} {Math.abs(trendData.change)}%
            </span>
          </div>
          {/* 简单的趋势线 */}
          <div 
            className="h-16 rounded relative overflow-hidden"
            style={{ backgroundColor: theme.colors.surfaceHover }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 40">
              <defs>
                <linearGradient id="trendGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3"/>
                  <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.1"/>
                </linearGradient>
              </defs>
              <path
                d="M 10 30 Q 30 25 50 20 T 90 15"
                stroke={isPositive ? "#10b981" : "#ef4444"}
                strokeWidth="2"
                fill="none"
                className="animate-pulse"
              />
              <path
                d="M 10 30 Q 30 25 50 20 T 90 15 L 90 40 L 10 40 Z"
                fill="url(#trendGradient)"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${className}`}>
      <PieChartComponent data={knowledgeData} />
      <BarChartComponent data={activityData} />
      <TrendIndicator />
    </div>
  );
};

export default DataVisualization; 