import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Brain, Zap, Clock, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import DataVisualization from "@/components/DataVisualization";
import UserGuide from "@/components/UserGuide";

const Home = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    knowledge: 128,
    folders: 15,
    todayChats: 42
  });
  const [showGuide, setShowGuide] = useState(false);
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "新建笔记",
      description: "快速创建新的知识笔记",
      icon: <Plus className="w-6 h-6" />,
      action: () => navigate("/knowledge")
    },
    {
      title: "智能问答",
      description: "与AI助手对话获取帮助",
      icon: <Brain className="w-6 h-6" />,
      action: () => navigate("/app")
    },
    {
      title: "内容采集",
      description: "采集网页、文档等内容",
      icon: <FileText className="w-6 h-6" />,
      action: () => navigate("/collect")
    },
    {
      title: "快速搜索",
      description: "搜索您的知识库内容",
      icon: <Search className="w-6 h-6" />,
      action: () => handleSearch()
    }
  ];

  const recentItems = [
    { title: "React最佳实践总结", type: "笔记", time: "2分钟前" },
    { title: "TypeScript学习指南", type: "文档", time: "1小时前" },
    { title: "项目架构设计讨论", type: "对话", time: "今天上午" }
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

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayChats: prev.todayChats + Math.floor(Math.random() * 3)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 检查是否首次访问，自动显示引导
  useEffect(() => {
    const hasVisited = localStorage.getItem('user-guide-completed');
    if (!hasVisited) {
      setTimeout(() => setShowGuide(true), 1000);
    }
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 主要内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        {/* Logo区域 */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500 rounded-lg mb-6 shadow-md hover:shadow-lg transition-shadow duration-300">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 
            className="text-4xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            智能知识助手
          </h1>
          <p 
            className="text-xl max-w-2xl mx-auto"
            style={{ color: theme.colors.textSecondary }}
          >
            会思考的知识库，开启增写与新体验
          </p>
        </div>

        {/* 搜索框卡片 */}
        <div className="w-full max-w-2xl mb-12">
          <div 
            className="rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
            }}
          >
            <div className="flex items-center">
              <div 
                className="flex items-center justify-center w-10 h-10 rounded-xl mr-3"
                style={{ backgroundColor: theme.colors.surfaceHover }}
              >
                <Brain className="w-5 h-5" style={{ color: theme.colors.textSecondary }} />
              </div>
              <Input
                type="text"
                placeholder="输入您想要搜索的内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0"
                style={{ 
                  color: theme.colors.text,
                }}
              />
              <div className="flex items-center space-x-2 ml-3">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-2"
                  style={{ color: theme.colors.textSecondary }}
                  onClick={handleSearch}
                >
                  <Search className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="p-2"
                  style={{ color: theme.colors.textSecondary }}
                  onClick={() => navigate("/app")}
                >
                  <Zap className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* 快捷操作卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-8">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={action.action}
              className="rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 group"
              style={{ 
                backgroundColor: theme.colors.surface,
                boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
              }}
            >
              <div 
                className="flex items-center justify-center w-12 h-12 rounded-xl mb-4 group-hover:bg-pink-100 transition-colors duration-300"
                style={{ backgroundColor: theme.colors.surfaceHover }}
              >
                <div 
                  className="group-hover:text-pink-600 transition-colors duration-300"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {action.icon}
                </div>
              </div>
              <h3 
                className="text-lg font-semibold mb-2"
                style={{ color: theme.colors.text }}
              >
                {action.title}
              </h3>
              <p 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                {action.description}
              </p>
            </div>
          ))}
        </div>

        {/* 数据可视化图表 */}
        <DataVisualization className="max-w-6xl w-full mb-8" />

        {/* 最近使用和统计信息 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl w-full mb-16">
          {/* 最近使用 */}
          <div 
            className="rounded-lg p-6 shadow-md" 
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
            }}
            data-recent-items
          >
            <div className="flex items-center mb-4">
              <Clock className="w-5 h-5 mr-2" style={{ color: theme.colors.textSecondary }} />
              <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>最近使用</h3>
            </div>
            <div className="space-y-3">
              {recentItems.map((item, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                  style={{ 
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <div>
                    <div className="font-medium" style={{ color: theme.colors.text }}>{item.title}</div>
                    <div className="text-sm" style={{ color: theme.colors.textMuted }}>{item.type}</div>
                  </div>
                  <div className="text-sm" style={{ color: theme.colors.textMuted }}>{item.time}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 统计信息卡片 */}
          <div 
            className="rounded-lg p-6 shadow-md"
            style={{ 
              backgroundColor: theme.colors.surface,
              boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
            }}
          >
            <div className="flex items-center mb-4">
              <TrendingUp className="w-5 h-5 mr-2" style={{ color: theme.colors.textSecondary }} />
              <h3 className="text-lg font-semibold" style={{ color: theme.colors.text }}>数据统计</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>{stats.knowledge}</div>
                <div className="text-sm" style={{ color: theme.colors.textSecondary }}>知识条目</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>{stats.folders}</div>
                <div className="text-sm" style={{ color: theme.colors.textSecondary }}>文件夹</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600">{stats.todayChats}</div>
                <div className="text-sm" style={{ color: theme.colors.textSecondary }}>今日对话</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 键盘快捷键 */}
      <KeyboardShortcuts 
        onShowHelp={() => setShowGuide(true)}
      />

      {/* 新手引导 */}
      <UserGuide 
        isOpen={showGuide} 
        onClose={() => setShowGuide(false)}
        autoStart={true}
      />
    </div>
  );
};

export default Home;
