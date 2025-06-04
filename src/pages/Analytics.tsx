import DataVisualization from "@/components/DataVisualization";
import { BarChart3, TrendingUp, Users, FileText, Calendar, Target } from "lucide-react";

const Analytics = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">数据分析</h1>
          <p className="text-gray-600">深入了解您的知识库使用情况和趋势</p>
        </div>

        {/* 核心指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">1,234</h3>
                <p className="text-gray-600 text-sm">总文档数</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% 本月</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">89</h3>
                <p className="text-gray-600 text-sm">活跃用户</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+8% 本周</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">156</h3>
                <p className="text-gray-600 text-sm">本周访问</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+15% 环比</span>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg">
                <Target className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-2xl font-bold text-gray-800">94%</h3>
                <p className="text-gray-600 text-sm">目标完成</p>
              </div>
            </div>
            <div className="mt-4 flex items-center text-green-600 text-sm">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+3% 本月</span>
            </div>
          </div>
        </div>

        {/* 主要图表区域 */}
        <DataVisualization className="mb-8" />

        {/* 详细分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">使用时间分布</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">上午 (9-12点)</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm text-gray-700">75%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">下午 (13-18点)</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="text-sm text-gray-700">85%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">晚上 (19-22点)</span>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm text-gray-700">45%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">热门搜索词</h3>
            <div className="space-y-3">
              {[
                { word: 'React', count: 89 },
                { word: 'TypeScript', count: 67 },
                { word: '项目管理', count: 45 },
                { word: 'API设计', count: 34 },
                { word: '数据库', count: 28 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-gray-700">{item.word}</span>
                  <div className="flex items-center">
                    <div className="w-20 bg-gray-200 rounded-full h-1.5 mr-3">
                      <div 
                        className="bg-pink-500 h-1.5 rounded-full" 
                        style={{ width: `${(item.count / 89) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 