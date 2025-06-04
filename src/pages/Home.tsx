import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, FileText, Brain, BarChart2, Clock, Star, TrendingUp, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";

const Home = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "新建笔记",
      description: "快速创建新的知识笔记",
      icon: <Plus className="w-5 h-5" />,
      action: () => navigate("/knowledge"),
      color: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      title: "智能问答",
      description: "与AI助手对话获取帮助",
      icon: <Brain className="w-5 h-5" />,
      action: () => navigate("/app"),
      color: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      title: "内容采集",
      description: "采集网页、文档等内容",
      icon: <FileText className="w-5 h-5" />,
      action: () => navigate("/collect"),
      color: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      title: "数据分析",
      description: "查看知识库统计数据",
      icon: <BarChart2 className="w-5 h-5" />,
      action: () => navigate("/analytics"),
      color: "bg-gradient-to-br from-pink-400 to-pink-600"
    }
  ];

  const stats = [
    { label: "知识条目", value: "128", icon: <BookOpen className="w-5 h-5" />, color: "text-blue-600", bgColor: "bg-gradient-to-br from-blue-50 to-blue-100" },
    { label: "文件夹", value: "15", icon: <FileText className="w-5 h-5" />, color: "text-green-600", bgColor: "bg-gradient-to-br from-green-50 to-green-100" },
    { label: "今日对话", value: "42", icon: <Brain className="w-5 h-5" />, color: "text-purple-600", bgColor: "bg-gradient-to-br from-purple-50 to-purple-100" },
    { label: "收藏内容", value: "36", icon: <Star className="w-5 h-5" />, color: "text-yellow-600", bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100" }
  ];

  const recentItems = [
    { title: "React最佳实践总结", type: "笔记", time: "2分钟前" },
    { title: "TypeScript学习指南", type: "文档", time: "1小时前" },
    { title: "项目架构设计讨论", type: "对话", time: "今天上午" },
    { title: "Vue3 Composition API", type: "笔记", time: "昨天" },
    { title: "数据库设计规范", type: "文档", time: "2天前" }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/knowledge?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/knowledge");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-8 w-full max-w-full relative z-10" style={{ minHeight: '100vh' }}>
      {/* 欢迎区域 */}
      <div className="text-center py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 
            className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
            style={{ color: theme.colors.text }}
          >
            欢迎使用智能知识助手
          </h1>
          <p 
            className="text-xl mb-8"
            style={{ color: theme.colors.textSecondary }}
          >
            高效管理知识，智能辅助学习
          </p>
        </div>
      </div>

      {/* 重点搜索框区域 */}
      <div className="max-w-6xl mx-auto px-4">
        <div 
          className="rounded-3xl p-8 shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden"
          style={{ 
            backgroundColor: theme.colors.surface,
            boxShadow: `0 25px 50px -12px ${theme.colors.shadow}`,
          }}
        >
          {/* 背景装饰 */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-purple-50/50 pointer-events-none"></div>
          
          {/* 搜索图标装饰 */}
          <div className="absolute top-4 right-6 opacity-10">
            <Search className="w-24 h-24 text-pink-300" />
          </div>
          
          <div className="relative z-10">
            {/* 搜索标题 */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2" style={{ color: theme.colors.text }}>
                🔍 智能搜索
              </h2>
              <p className="text-lg" style={{ color: theme.colors.textSecondary }}>
                搜索您的知识库，发现更多可能
              </p>
            </div>
            
            {/* 搜索框 */}
            <div className="flex gap-4 items-center">
              <div className="relative flex-1">
                <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                <Input
                  placeholder="输入关键词搜索知识库内容..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-16 h-16 text-xl border-2 border-gray-200 bg-white focus-visible:ring-4 focus-visible:ring-pink-500/20 focus-visible:border-pink-500 rounded-2xl shadow-lg font-medium"
                  style={{ fontSize: '18px' }}
                />
              </div>
              <Button 
                onClick={handleSearch} 
                className="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 h-16 px-12 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-semibold hover:scale-105"
              >
                <Search className="w-5 h-5 mr-2" />
                搜索
              </Button>
            </div>
            
            {/* 搜索建议 */}
            <div className="flex flex-wrap gap-3 mt-6 justify-center">
              <span className="text-sm" style={{ color: theme.colors.textSecondary }}>热门搜索：</span>
              {['React', 'TypeScript', '项目管理', '学习笔记', 'AI技术'].map((tag, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(tag)}
                  className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-pink-100 hover:to-pink-200 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md hover:scale-105"
                  style={{ color: theme.colors.text }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${stat.bgColor}`}
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: `0 10px 25px -5px ${theme.colors.shadow}`
            }}
          >
            <div className="flex items-center space-x-3">
              <div className={`${stat.color} p-3 rounded-xl bg-white shadow-sm`}>
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold" style={{ color: theme.colors.text }}>
                  {stat.value}
                </div>
                <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 快速操作 */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: theme.colors.text }}>
          快速操作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              className="group cursor-pointer"
              onClick={action.action}
            >
              <div
                className="rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 group-hover:scale-105 border border-white/10"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  boxShadow: `0 10px 25px -5px ${theme.colors.shadow}`
                }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${action.color} text-white p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {action.icon}
                  </div>
                  <div>
                    <div className="text-lg font-semibold mb-2" style={{ color: theme.colors.text }}>
                      {action.title}
                    </div>
                    <div className="text-sm leading-relaxed" style={{ color: theme.colors.textSecondary }}>
                      {action.description}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最近访问 */}
      <div>
        <h2 className="text-2xl font-bold mb-6" style={{ color: theme.colors.text }}>
          最近访问
        </h2>
        <div 
          className="rounded-2xl shadow-xl backdrop-blur-sm overflow-hidden border border-white/10"
          style={{ 
            backgroundColor: theme.colors.surface,
            boxShadow: `0 20px 40px -12px ${theme.colors.shadow}`
          }}
        >
          {recentItems.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-6 border-b last:border-b-0 hover:bg-gray-50/50 cursor-pointer transition-all duration-200 hover:translate-x-2"
              style={{ borderColor: theme.colors.border }}
              onClick={() => navigate("/knowledge")}
            >
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full shadow-sm"></div>
                <div>
                  <div className="font-semibold text-lg" style={{ color: theme.colors.text }}>
                    {item.title}
                  </div>
                  <div className="text-sm flex items-center">
                    <span 
                      className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700 mr-3 shadow-sm"
                    >
                      {item.type}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-sm" style={{ color: theme.colors.textSecondary }}>
                <Clock className="w-4 h-4" />
                <span className="font-medium">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 使用提示 */}
      <div 
        className="rounded-2xl shadow-xl backdrop-blur-sm border border-white/10"
        style={{ 
          backgroundColor: theme.colors.surface,
          boxShadow: `0 20px 40px -12px ${theme.colors.shadow}`
        }}
      >
        <div className="p-8">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-pink-500" />
            <h3 className="text-2xl font-bold" style={{ color: theme.colors.text }}>使用提示</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text }}>快速导航</h4>
              <ul className="space-y-3 text-sm" style={{ color: theme.colors.textSecondary }}>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>使用左侧菜单快速切换功能</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>搜索框支持全文检索</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>点击最近访问快速打开内容</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg font-semibold mb-4" style={{ color: theme.colors.text }}>智能功能</h4>
              <ul className="space-y-3 text-sm" style={{ color: theme.colors.textSecondary }}>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <span>AI助手可以回答知识相关问题</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>自动分类和标签管理</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  <span>数据分析洞察使用习惯</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
