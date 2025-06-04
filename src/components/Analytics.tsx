import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Analytics = () => {
  const weeklyStats = {
    newDocuments: 8,
    totalQueries: 45,
    activeHours: 12,
    topTags: ["React", "JavaScript", "前端开发", "算法", "项目管理"],
    mostAccessedDocs: [
      { title: "React 最佳实践指南", views: 12 },
      { title: "项目需求分析文档", views: 8 },
      { title: "机器学习基础概念", views: 6 },
    ],
    dailyActivity: [
      { day: "周一", queries: 8, documents: 2 },
      { day: "周二", queries: 6, documents: 1 },
      { day: "周三", queries: 12, documents: 3 },
      { day: "周四", queries: 5, documents: 0 },
      { day: "周五", queries: 9, documents: 2 },
      { day: "周六", queries: 3, documents: 0 },
      { day: "周日", queries: 2, documents: 0 },
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                数据分析
              </h1>
              <p className="text-gray-600">
                了解您的知识库使用情况和学习模式
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline">导出报告</Button>
              <Button>生成周报</Button>
            </div>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">本周新增文档</p>
                <p className="text-2xl font-bold text-gray-900">
                  {weeklyStats.newDocuments}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI查询次数</p>
                <p className="text-2xl font-bold text-gray-900">
                  {weeklyStats.totalQueries}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">活跃时长</p>
                <p className="text-2xl font-bold text-gray-900">
                  {weeklyStats.activeHours}h
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">总文档数</p>
                <p className="text-2xl font-bold text-gray-900">
                  124
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart and Tags Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Activity Chart Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              每日活动统计
            </h3>
            <div className="space-y-3">
              {weeklyStats.dailyActivity.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600 w-12">
                    {day.day}
                  </span>
                  <div className="flex-1 mx-4">
                    <div className="flex space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(day.queries / 15) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(day.documents / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 flex space-x-2">
                    <span>{day.queries}次查询</span>
                    <span>{day.documents}个文档</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center space-x-4 text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-blue-600 rounded"></div>
                <span>AI查询</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-600 rounded"></div>
                <span>新增文档</span>
              </div>
            </div>
          </div>

          {/* Top Tags Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              热门标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {weeklyStats.topTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Most Accessed Documents Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            最受关注的文档
          </h3>
          <div className="space-y-3">
            {weeklyStats.mostAccessedDocs.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">
                  {doc.title}
                </span>
                <span className="text-sm text-gray-500">
                  {doc.views} 次访问
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
