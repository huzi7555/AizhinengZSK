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
      color: "bg-blue-500"
    },
    {
      title: "智能问答",
      description: "与AI助手对话获取帮助",
      icon: <Brain className="w-5 h-5" />,
      action: () => navigate("/app"),
      color: "bg-purple-500"
    },
    {
      title: "内容采集",
      description: "采集网页、文档等内容",
      icon: <FileText className="w-5 h-5" />,
      action: () => navigate("/collect"),
      color: "bg-green-500"
    },
    {
      title: "数据分析",
      description: "查看知识库统计数据",
      icon: <BarChart2 className="w-5 h-5" />,
      action: () => navigate("/analytics"),
      color: "bg-pink-500"
    }
  ];

  const stats = [
    { label: "知识条目", value: "128", icon: <BookOpen className="w-4 h-4" />, color: "text-blue-600" },
    { label: "文件夹", value: "15", icon: <FileText className="w-4 h-4" />, color: "text-green-600" },
    { label: "今日对话", value: "42", icon: <Brain className="w-4 h-4" />, color: "text-purple-600" },
    { label: "收藏内容", value: "36", icon: <Star className="w-4 h-4" />, color: "text-yellow-600" }
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
    <div className="space-y-6 w-full max-w-full relative z-10" style={{ minHeight: '100vh' }}>
      {/* 欢迎区域 */}
      <div className="text-center py-8">
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: theme.colors.text }}
        >
          欢迎使用智能知识助手
        </h1>
        <p 
          className="text-lg"
          style={{ color: theme.colors.textSecondary }}
        >
          高效管理知识，智能辅助学习
        </p>
      </div>

      {/* 搜索框 */}
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索知识库内容..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-9"
              />
            </div>
            <Button onClick={handleSearch} className="bg-pink-500 hover:bg-pink-600">
              搜索
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 统计数据 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className={`${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold" style={{ color: theme.colors.text }}>
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 快速操作 */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text }}>
          快速操作
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Card key={index} className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardContent className="p-4" onClick={action.action}>
                <div className="flex items-center space-x-3">
                  <div className={`${action.color} text-white p-2 rounded-lg`}>
                    {action.icon}
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: theme.colors.text }}>
                      {action.title}
                    </div>
                    <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      {action.description}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 最近项目 */}
      <div>
        <h2 className="text-xl font-semibold mb-4" style={{ color: theme.colors.text }}>
          最近访问
        </h2>
        <Card>
          <CardContent className="p-0">
            {recentItems.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                style={{ borderColor: theme.colors.border }}
                onClick={() => navigate("/knowledge")}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  <div>
                    <div className="font-medium" style={{ color: theme.colors.text }}>
                      {item.title}
                    </div>
                    <div className="text-sm" style={{ color: theme.colors.textSecondary }}>
                      {item.type}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" style={{ color: theme.colors.textSecondary }} />
                  <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
                    {item.time}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* 使用提示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-pink-500" />
            <span>使用提示</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium mb-2" style={{ color: theme.colors.text }}>快速导航</h4>
              <ul className="space-y-1 text-sm" style={{ color: theme.colors.textSecondary }}>
                <li>• 使用左侧菜单快速切换功能</li>
                <li>• 搜索框支持全文检索</li>
                <li>• 点击最近访问快速打开内容</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2" style={{ color: theme.colors.text }}>智能功能</h4>
              <ul className="space-y-1 text-sm" style={{ color: theme.colors.textSecondary }}>
                <li>• AI助手可以回答知识相关问题</li>
                <li>• 自动分类和标签管理</li>
                <li>• 数据分析洞察使用习惯</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
