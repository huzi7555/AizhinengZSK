import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronDown, Search, Filter, MoreHorizontal, Plus, Trash2 } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const KnowledgeBase = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("all");
  const [viewMode, setViewMode] = useState("list");
  const [expandedFolders, setExpandedFolders] = useState<string[]>(["技术", "学习"]);

  const folders = [
    { 
      id: "reading", 
      name: "读书笔记", 
      count: 2, 
      color: "text-green-600",
      type: "new" 
    },
    { 
      id: "personal", 
      name: "个人项目", 
      count: 1, 
      color: "text-green-600",
      type: "new" 
    },
    { 
      id: "work", 
      name: "工作", 
      count: 0, 
      color: theme.colors.textSecondary,
      children: [] 
    },
    { 
      id: "tech", 
      name: "技术", 
      count: 6, 
      color: theme.colors.textSecondary,
      children: [
        { id: "programming", name: "编程语言", count: 0, color: theme.colors.textSecondary },
        { id: "backend", name: "后端开发", count: 0, color: theme.colors.textSecondary },
        { id: "tools", name: "开发工具", count: 0, color: theme.colors.textSecondary },
        { id: "frontend", name: "前端开发", count: 0, color: theme.colors.textSecondary },
        { id: "ai", name: "AI与算法", count: 0, color: theme.colors.textSecondary }
      ]
    },
    { 
      id: "theory", 
      name: "理财", 
      count: 0, 
      color: theme.colors.textSecondary,
      children: [] 
    },
    { 
      id: "inspiration", 
      name: "灵感收集", 
      count: 2, 
      color: "text-green-600",
      type: "new" 
    },
    { 
      id: "business", 
      name: "商业", 
      count: 0, 
      color: theme.colors.textSecondary,
      children: [] 
    },
    { 
      id: "life", 
      name: "生活", 
      count: 0, 
      color: theme.colors.textSecondary,
      children: [] 
    },
    { 
      id: "uncategorized", 
      name: "未分类", 
      count: 7, 
      color: "text-red-500",
      isSpecial: true 
    },
    { 
      id: "study", 
      name: "学习", 
      count: 0, 
      color: theme.colors.textSecondary,
      children: [
        { id: "reading-notes", name: "读书心得", count: 0, color: theme.colors.textSecondary },
        { id: "experience", name: "经验总结", count: 0, color: theme.colors.textSecondary }
      ]
    }
  ];

  const documents = [
    {
      id: 1,
      title: "大V买了SKV码老师的聊聊备了老司机老师提的是的：了是：的 简是",
      summary: "内容提及大V、SKV码老师、聊聊备了老司机老师，可能涉及网络红人，知识付费或培训相关话题，具体内容不明，但暗示了某种购买行为或学习关系。",
      tags: ["大V", "SKV码老师", "知识付费", "内容创作", "网络红人"],
      source: "1条 未分类",
      updatedAt: "2025/06/02 23:33",
      category: "uncategorized"
    },
    {
      id: 2,
      title: "能卖克斯领MV老师大V算大师",
      summary: "内容涉及能卖克斯领（可能指汽车品牌）、MV（音乐视频）、老师、大V（网络名人）、算大师（软件评测），信息较为混乱，难以确定明确主题。",
      tags: ["汽车", "音乐", "网络名人", "软件评测", "综合"],
      source: "1条 未分类",
      updatedAt: "2025/06/02 23:32",
      category: "uncategorized"
    },
    {
      id: 3,
      title: "今天在群里看到一个关于 React 性能优化的讨论，主要提到了 useMemo 和 useCallback 的使用场景...",
      summary: "React 性能优化技巧和最佳实践",
      tags: ["React", "性能优化", "前端"],
      source: "1条 未分类",
      updatedAt: "2024-01-15 14:30",
      category: "uncategorized"
    }
  ];

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };

  const filteredDocuments = documents.filter(doc => 
    (selectedFolder === "all" || doc.category === selectedFolder) &&
    (doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const renderFolder = (folder: any, level = 0) => (
    <div key={folder.id} className={`${level > 0 ? 'ml-6' : ''}`}>
      <div
        className={`flex items-center justify-between px-2 py-1 rounded cursor-pointer group ${
          selectedFolder === folder.id ? '' : ''
        }`}
        style={{
          backgroundColor: selectedFolder === folder.id ? theme.colors.surfaceHover : 'transparent'
        }}
        onMouseEnter={(e) => {
          if (selectedFolder !== folder.id) {
            e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
          }
        }}
        onMouseLeave={(e) => {
          if (selectedFolder !== folder.id) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
        onClick={() => setSelectedFolder(folder.id)}
      >
        <div className="flex items-center space-x-2 flex-1">
          {folder.children && folder.children.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder.id);
              }}
              className="p-0.5 rounded"
              style={{
                color: theme.colors.textSecondary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              {expandedFolders.includes(folder.id) ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          )}
          {!folder.children && <div className="w-4" />}
          
          <span className="text-sm">📁</span>
          <span 
            className={`text-sm ${folder.isSpecial ? 'border-l-2 border-red-400 pl-2' : ''}`}
            style={{ 
              color: typeof folder.color === 'string' && folder.color.startsWith('text-') 
                ? undefined  // 让CSS类处理颜色
                : folder.color || theme.colors.textSecondary 
            }}
          >
            {folder.name}
            {folder.type === "new" && <span className="text-green-600"> (新建)</span>}
          </span>
          <span className="text-xs ml-auto" style={{ color: theme.colors.textMuted }}>
            {folder.count}
          </span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className="opacity-0 group-hover:opacity-100 p-1 rounded"
              style={{ color: theme.colors.textSecondary }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Plus className="w-4 h-4 mr-2" />
              新建子文件夹
            </DropdownMenuItem>
            <DropdownMenuItem>
              重命名
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="w-4 h-4 mr-2" />
              删除
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {folder.children && expandedFolders.includes(folder.id) && (
        <div className="ml-4">
          {folder.children.map((child: any) => renderFolder(child, level + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div 
        className="w-80 p-4 border-r overflow-y-auto"
        style={{ 
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border
        }}
      >
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: theme.colors.textMuted }} />
            <Input
              placeholder="搜索文件或者记录内容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.text
              }}
            />
          </div>
        </div>

        <div className="mb-4 flex justify-between items-center">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            筛选
          </Button>
          <Button size="sm">
            收纳全部
          </Button>
        </div>

        <div className="space-y-1">
          <div
            className={`flex items-center px-2 py-1 rounded cursor-pointer ${
              selectedFolder === "all" ? "" : ""
            }`}
            style={{
              backgroundColor: selectedFolder === "all" ? theme.colors.surfaceHover : 'transparent',
              color: theme.colors.text
            }}
            onMouseEnter={(e) => {
              if (selectedFolder !== "all") {
                e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedFolder !== "all") {
                e.currentTarget.style.backgroundColor = 'transparent';
              }
            }}
            onClick={() => setSelectedFolder("all")}
          >
            <span className="text-sm font-medium">📄 全部</span>
          </div>
          {folders.map(folder => renderFolder(folder))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6" style={{ backgroundColor: theme.colors.bg }}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold" style={{ color: theme.colors.text }}>
              未分类 (3)
            </h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                批量编辑
              </Button>
              <Button variant="outline" size="sm">
                导出
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredDocuments.map((doc) => (
            <div 
              key={doc.id} 
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border
              }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-medium pr-4" style={{ color: theme.colors.text }}>
                  {doc.title}
                </h3>
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost">
                    ➕
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600">
                    🗑️
                  </Button>
                </div>
              </div>
              
              <p className="text-sm mb-3" style={{ color: theme.colors.textSecondary }}>
                {doc.summary}
              </p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {doc.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="text-xs flex justify-between items-center">
                <span style={{ color: theme.colors.textMuted }}>{doc.source}</span>
                <span style={{ color: theme.colors.textMuted }}>{doc.updatedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
