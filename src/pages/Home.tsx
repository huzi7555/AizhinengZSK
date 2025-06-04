import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, FileText, PenTool } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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

  // 底部三大功能
  const mainFeatures = [
    {
      title: "知识广场",
      description: "探索和管理知识内容",
      icon: <BookOpen className="w-6 h-6" />,
      action: () => navigate("/knowledge"),
    },
    {
      title: "文档解读", 
      description: "智能分析和理解文档",
      icon: <FileText className="w-6 h-6" />,
      action: () => navigate("/collect"),
    },
    {
      title: "智能写作",
      description: "AI辅助内容创作",
      icon: <PenTool className="w-6 h-6" />,
      action: () => navigate("/app"),
    }
  ];

  return (
    <div className="h-screen flex flex-col justify-center items-center relative z-10 px-8">
      {/* 🎨 中央品牌Logo区域 */}
      <div className="mb-16 text-center">
        <div className="mb-8">
          {/* ima copilot Logo */}
          <div className="text-6xl font-light tracking-wider mb-4" style={{ color: '#2B2B2B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <span className="font-medium">ima</span>
            <span className="ml-2 font-extralight text-gray-600">copilot</span>
          </div>
        </div>
      </div>

      {/* 🔍 智能搜索框区域 */}
      <div className="w-full max-w-2xl mb-20">
        <div 
          className="relative"
          style={{
            background: 'rgba(255, 255, 255, 0.55)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: '20px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 12px rgba(0,0,0,0.05)'
          }}
        >
          <div className="flex items-center p-2">
            {/* 用户头像占位 */}
            <div className="w-8 h-8 rounded-full bg-gray-300 mr-3 ml-2 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">🐼</span>
            </div>
            
            {/* 搜索输入框 */}
            <Input
              placeholder="@ima.copilot怎么用 总结ima.copilot有哪些功能"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-gray-500 h-12"
              style={{ 
                fontSize: '16px',
                color: '#2B2B2B'
              }}
            />
            
            {/* 功能按钮区域 */}
            <div className="flex items-center gap-2 mr-2">
              <button 
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title="附件"
              >
                📎
              </button>
              <button 
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
                title="更多选项"
              >
                ✂️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 底部三大功能入口 */}
      <div className="flex gap-8">
        {mainFeatures.map((feature, index) => (
          <button
            key={index}
            onClick={feature.action}
            className="group flex flex-col items-center p-6 rounded-2xl transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.5)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8), 0 2px 8px rgba(0,0,0,0.04)'
            }}
          >
            {/* 图标 */}
            <div 
              className="mb-3 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                color: '#2B2B2B'
              }}
            >
              {feature.icon}
            </div>
            
            {/* 标题 */}
            <div className="text-base font-medium mb-1" style={{ color: '#2B2B2B' }}>
              {feature.title}
            </div>
            
            {/* 描述 */}
            <div className="text-sm text-center" style={{ color: 'rgba(43, 43, 43, 0.7)' }}>
              {feature.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
