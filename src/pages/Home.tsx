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
      {/* 🎨 中央品牌Logo区域 - 确保显示正确的ima copilot */}
      <div className="mb-12 text-center">
        <div className="mb-6">
          {/* ima copilot Logo - 确保正确显示 */}
          <div className="text-5xl font-light tracking-wide mb-2" style={{ color: '#2B2B2B', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <span className="font-medium">ima</span>
            <span className="ml-1 font-extralight text-gray-600">copilot</span>
          </div>
        </div>
      </div>

      {/* 🔍 智能搜索框区域 - 纯净白色效果 */}
      <div className="w-full max-w-2xl mb-16">
        <div 
          className="relative"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '16px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}
        >
          <div className="flex items-center p-1.5">
            {/* 用户头像占位 */}
            <div className="w-7 h-7 rounded-full bg-gray-300 mr-2.5 ml-2 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-600">🐼</span>
            </div>
            
            {/* 搜索输入框 */}
            <Input
              placeholder="@ima.copilot怎么用 总结ima.copilot有哪些功能"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-base placeholder:text-gray-500 h-10"
              style={{ 
                fontSize: '15px',
                color: '#2B2B2B'
              }}
            />
            
            {/* 功能按钮区域 */}
            <div className="flex items-center gap-1 mr-1.5">
              <button 
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                title="附件"
              >
                📎
              </button>
              <button 
                className="p-1.5 rounded-lg hover:bg-white/20 transition-colors"
                title="更多选项"
              >
                ✂️
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 底部三大功能入口 - 纯净白色效果 */}
      <div className="flex gap-6">
        {mainFeatures.map((feature, index) => (
          <button
            key={index}
            onClick={feature.action}
            className="group flex flex-col items-center p-5 rounded-xl transition-all duration-200 hover:scale-105"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            {/* 图标 */}
            <div 
              className="mb-2.5 p-2.5 rounded-lg group-hover:scale-110 transition-transform duration-200"
              style={{
                background: 'rgba(255, 255, 255, 1)',
                color: '#2B2B2B',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
            >
              {feature.icon}
            </div>
            
            {/* 标题 */}
            <div className="text-sm font-medium mb-0.5" style={{ color: '#2B2B2B' }}>
              {feature.title}
            </div>
            
            {/* 描述 */}
            <div className="text-xs text-center" style={{ color: 'rgba(43, 43, 43, 0.7)' }}>
              {feature.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
