
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, MessageSquare, FileText, Calendar } from "lucide-react";

const History = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const historyItems = [
    {
      id: 1,
      type: "chat",
      title: "关于React性能优化的讨论",
      content: "讨论了useMemo和useCallback的使用场景...",
      timestamp: "2025-06-03 14:30",
      tags: ["React", "性能优化", "前端开发"]
    },
    {
      id: 2,
      type: "note",
      title: "产品设计思考",
      content: "用户体验设计的核心原则和最佳实践...",
      timestamp: "2025-06-03 10:15",
      tags: ["设计", "用户体验", "产品"]
    },
    {
      id: 3,
      type: "search",
      title: "搜索：人工智能发展趋势",
      content: "查找了关于AI技术发展的相关资料...",
      timestamp: "2025-06-02 16:45",
      tags: ["AI", "技术趋势", "研究"]
    },
    {
      id: 4,
      type: "chat",
      title: "项目管理方法讨论",
      content: "敏捷开发与传统项目管理的对比分析...",
      timestamp: "2025-06-02 09:20",
      tags: ["项目管理", "敏捷开发", "工作流程"]
    },
    {
      id: 5,
      type: "note",
      title: "学习笔记：TypeScript高级特性",
      content: "泛型、条件类型、映射类型等高级概念...",
      timestamp: "2025-06-01 20:10",
      tags: ["TypeScript", "编程", "学习笔记"]
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "chat":
        return <MessageSquare className="w-4 h-4" />;
      case "note":
        return <FileText className="w-4 h-4" />;
      case "search":
        return <Search className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "chat":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "note":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "search":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const filteredItems = historyItems.filter(item => 
    (selectedFilter === "all" || item.type === selectedFilter) &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
     item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              历史记录
            </h1>
            <p className="text-gray-600 dark:text-gray-400">查看您的所有活动历史</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">共 {filteredItems.length} 条记录</span>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="搜索历史记录..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={selectedFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("all")}
            >
              全部
            </Button>
            <Button
              variant={selectedFilter === "chat" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("chat")}
            >
              对话
            </Button>
            <Button
              variant={selectedFilter === "note" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("note")}
            >
              笔记
            </Button>
            <Button
              variant={selectedFilter === "search" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter("search")}
            >
              搜索
            </Button>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="flex-1 overflow-auto p-6">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(item.type)}`}>
                    {getTypeIcon(item.type)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.title}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-500">{item.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                {item.content}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    # {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
