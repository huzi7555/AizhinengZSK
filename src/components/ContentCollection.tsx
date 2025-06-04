import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/contexts/ThemeContext";

export const ContentCollection = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("text");
  const [textContent, setTextContent] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("study");
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [generatedSummary, setGeneratedSummary] = useState("");

  const categories = [
    { id: "study", name: "学习笔记", icon: "📚" },
    { id: "work", name: "工作文档", icon: "💼" },
    { id: "meeting", name: "会议记录", icon: "📝" },
    { id: "personal", name: "个人资料", icon: "👤" },
    { id: "research", name: "研究资料", icon: "🔬" },
  ];

  const handleProcessContent = () => {
    // 模拟AI处理生成标签和摘要
    const sampleTags = ["React", "前端开发", "JavaScript", "组件"];
    const sampleSummary = "这是一篇关于React开发的技术文档，包含了组件设计、状态管理等核心概念的详细说明。";
    
    setGeneratedTags(sampleTags);
    setGeneratedSummary(sampleSummary);
  };

  const handleSave = () => {
    // 模拟保存逻辑
    alert("内容已保存到知识库！");
    setTextContent("");
    setUrlInput("");
    setGeneratedTags([]);
    setGeneratedSummary("");
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <div 
          className="rounded-2xl shadow-lg border p-8"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border
          }}
        >
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-2" style={{ color: theme.colors.text }}>
              内容采集
            </h1>
            <p style={{ color: theme.colors.textSecondary }}>
              添加新内容到您的知识库，支持文本、文件和网页链接
            </p>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div 
              className="flex space-x-1 p-1 rounded-lg"
              style={{ backgroundColor: theme.colors.surfaceHover }}
            >
              <button
                onClick={() => setActiveTab("text")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "text" ? "shadow-sm" : ""
                }`}
                style={{
                  backgroundColor: activeTab === "text" ? theme.colors.surface : 'transparent',
                  color: activeTab === "text" ? theme.colors.text : theme.colors.textSecondary
                }}
              >
                📝 文本输入
              </button>
              <button
                onClick={() => setActiveTab("file")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "file" ? "shadow-sm" : ""
                }`}
                style={{
                  backgroundColor: activeTab === "file" ? theme.colors.surface : 'transparent',
                  color: activeTab === "file" ? theme.colors.text : theme.colors.textSecondary
                }}
              >
                📁 文件上传
              </button>
              <button
                onClick={() => setActiveTab("url")}
                className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "url" ? "shadow-sm" : ""
                }`}
                style={{
                  backgroundColor: activeTab === "url" ? theme.colors.surface : 'transparent',
                  color: activeTab === "url" ? theme.colors.text : theme.colors.textSecondary
                }}
              >
                🌐 网页抓取
              </button>
            </div>
          </div>

          {/* Content */}
          <div>
            {/* Category Selection */}
            <div className="mb-6">
              <Label 
                className="text-sm font-medium mb-3 block"
                style={{ color: theme.colors.text }}
              >
                选择分类
              </Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                      selectedCategory === category.id ? "border-blue-500 bg-blue-50 text-blue-700" : ""
                    }`}
                    style={{
                      borderColor: selectedCategory === category.id ? "#3b82f6" : theme.colors.border,
                      backgroundColor: selectedCategory === category.id ? "#eff6ff" : theme.colors.surface,
                      color: selectedCategory === category.id ? "#1d4ed8" : theme.colors.text
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCategory !== category.id) {
                        e.currentTarget.style.backgroundColor = theme.colors.surface;
                      }
                    }}
                  >
                    <span>{category.icon}</span>
                    <span className="text-sm">{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input Areas */}
            {activeTab === "text" && (
              <div className="space-y-4">
                <div>
                  <Label 
                    htmlFor="content" 
                    className="text-sm font-medium mb-2 block"
                    style={{ color: theme.colors.text }}
                  >
                    内容文本
                  </Label>
                  <Textarea
                    id="content"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                    placeholder="请粘贴或输入您的内容..."
                    className="min-h-[200px] resize-none"
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderColor: theme.colors.border,
                      color: theme.colors.text
                    }}
                  />
                </div>
              </div>
            )}

            {activeTab === "file" && (
              <div className="space-y-4">
                <div 
                  className="border-2 border-dashed rounded-lg p-8 text-center"
                  style={{ borderColor: theme.colors.border }}
                >
                  <div className="space-y-4">
                    <div className="text-4xl">📁</div>
                    <div>
                      <p className="text-lg font-medium" style={{ color: theme.colors.text }}>
                        拖拽文件到这里
                      </p>
                      <p style={{ color: theme.colors.textSecondary }}>
                        支持 PDF、Word、Markdown、TXT 等格式
                      </p>
                    </div>
                    <Button variant="outline">
                      选择文件
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "url" && (
              <div className="space-y-4">
                <div>
                  <Label 
                    htmlFor="url" 
                    className="text-sm font-medium mb-2 block"
                    style={{ color: theme.colors.text }}
                  >
                    网页链接
                  </Label>
                  <div className="flex space-x-2">
                    <Input
                      id="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com"
                      className="flex-1"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        color: theme.colors.text
                      }}
                    />
                    <Button>
                      抓取内容
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* AI Generated Content */}
            {(textContent || generatedSummary) && (
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium" style={{ color: theme.colors.text }}>
                    AI 智能处理结果
                  </h3>
                  <Button onClick={handleProcessContent} variant="outline" size="sm">
                    重新生成
                  </Button>
                </div>

                {generatedSummary && (
                  <div>
                    <Label 
                      className="text-sm font-medium mb-2 block"
                      style={{ color: theme.colors.text }}
                    >
                      自动摘要
                    </Label>
                    <Textarea
                      value={generatedSummary}
                      onChange={(e) => setGeneratedSummary(e.target.value)}
                      className="min-h-[100px]"
                      style={{
                        backgroundColor: theme.colors.surface,
                        borderColor: theme.colors.border,
                        color: theme.colors.text
                      }}
                    />
                  </div>
                )}

                {generatedTags.length > 0 && (
                  <div>
                    <Label 
                      className="text-sm font-medium mb-2 block"
                      style={{ color: theme.colors.text }}
                    >
                      自动标签
                    </Label>
                    <div className="flex flex-wrap gap-2">
                      {generatedTags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 flex justify-end space-x-4">
              <Button variant="outline">
                预览
              </Button>
              <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700 text-white">
                保存到知识库
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
