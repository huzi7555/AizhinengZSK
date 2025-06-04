import { useState } from "react";
import { X, Search, Book, MessageCircle, Users, Settings, ChevronRight, ExternalLink } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpCenter = ({ isOpen, onClose }: HelpCenterProps) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("getting-started");

  const categories = [
    {
      id: "getting-started",
      name: "快速入门",
      icon: <Book className="w-5 h-5" />,
      description: "了解如何使用智能知识助手"
    },
    {
      id: "knowledge-base",
      name: "知识库管理",
      icon: <MessageCircle className="w-5 h-5" />,
      description: "学习如何管理您的知识内容"
    },
    {
      id: "ai-features",
      name: "AI 功能",
      icon: <Users className="w-5 h-5" />,
      description: "探索智能助手的强大功能"
    },
    {
      id: "settings",
      name: "设置与配置",
      icon: <Settings className="w-5 h-5" />,
      description: "自定义您的使用体验"
    }
  ];

  const helpContent = {
    "getting-started": [
      {
        title: "欢迎使用智能知识助手",
        content: "智能知识助手是一个强大的个人知识管理平台，帮助您收集、整理和利用各种信息。"
      },
      {
        title: "注册账户",
        content: "点击右上角的「登录」按钮，选择注册新账户。填写必要信息即可开始使用。"
      },
      {
        title: "首次使用指南",
        content: "1. 创建第一个知识库分类\n2. 添加您的第一条笔记\n3. 尝试使用AI助手功能\n4. 探索数据分析功能"
      },
      {
        title: "界面介绍",
        content: "左侧是导航菜单，包含知识库、内容采集、数据分析等功能。右上角可以访问设置和帮助。"
      }
    ],
    "knowledge-base": [
      {
        title: "创建知识分类",
        content: "在知识库页面，点击文件夹图标旁的菜单，选择「新建子文件夹」来创建分类。"
      },
      {
        title: "添加内容",
        content: "使用「内容采集」功能添加文本、文件或网页链接。AI会自动生成摘要和标签。"
      },
      {
        title: "搜索和筛选",
        content: "使用搜索框快速找到内容，或使用筛选功能按分类、标签等条件查找。"
      },
      {
        title: "批量管理",
        content: "选择多个项目后，可以进行批量编辑、移动或删除操作。"
      }
    ],
    "ai-features": [
      {
        title: "智能摘要",
        content: "AI会自动为您的内容生成简洁的摘要，帮助快速了解要点。"
      },
      {
        title: "自动标签",
        content: "系统会根据内容自动生成相关标签，便于分类和检索。"
      },
      {
        title: "智能对话",
        content: "与AI助手对话，获取知识库内容的解答和建议。"
      },
      {
        title: "内容推荐",
        content: "基于您的阅读习惯和兴趣，AI会推荐相关的知识内容。"
      }
    ],
    "settings": [
      {
        title: "主题设置",
        content: "在用户菜单中可以切换浅色/深色主题，适应不同的使用环境。"
      },
      {
        title: "通知设置",
        content: "管理推送通知、邮件提醒等设置，控制信息接收频率。"
      },
      {
        title: "数据导出",
        content: "支持导出您的知识库内容为各种格式，确保数据安全。"
      },
      {
        title: "隐私设置",
        content: "控制数据共享、AI训练参与等隐私相关设置。"
      }
    ]
  };

  const faqItems = [
    {
      question: "如何导入现有的笔记文件？",
      answer: "在内容采集页面，选择「文件上传」标签，支持拖拽或选择 PDF、Word、Markdown 等格式文件。"
    },
    {
      question: "AI 生成的摘要不准确怎么办？",
      answer: "您可以手动编辑摘要内容，系统会学习您的偏好，逐步提高准确性。"
    },
    {
      question: "如何与他人分享知识内容？",
      answer: "目前版本支持导出功能，未来版本将支持协作和分享功能。"
    },
    {
      question: "数据安全性如何保障？",
      answer: "所有数据采用加密存储，定期备份。您的隐私数据不会被用于其他用途。"
    }
  ];

  const filteredContent = helpContent[selectedCategory as keyof typeof helpContent]?.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.content.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div 
        className="w-full max-w-4xl h-[80vh] max-h-[600px] rounded-lg shadow-lg flex flex-col"
        style={{ backgroundColor: theme.colors.surface }}
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: theme.colors.border }}
        >
          <div>
            <h2 className="text-xl font-bold" style={{ color: theme.colors.text }}>
              帮助中心
            </h2>
            <p className="text-sm" style={{ color: theme.colors.textSecondary }}>
              获取使用指南和技术支持
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="p-6 border-b" style={{ borderColor: theme.colors.border }}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: theme.colors.textMuted }} />
            <Input
              placeholder="搜索帮助内容..."
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

        {/* Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div 
            className="w-1/3 border-r overflow-y-auto p-4"
            style={{ borderColor: theme.colors.border }}
          >
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id ? 'shadow-sm' : ''
                  }`}
                  style={{
                    backgroundColor: selectedCategory === category.id ? theme.colors.surfaceHover : 'transparent',
                    color: selectedCategory === category.id ? theme.colors.text : theme.colors.textSecondary
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== category.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <div className="flex items-center gap-3 mb-1">
                    {category.icon}
                    <span className="font-medium">{category.name}</span>
                  </div>
                  <p className="text-xs" style={{ color: theme.colors.textMuted }}>
                    {category.description}
                  </p>
                </button>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="mt-6">
              <h3 className="font-medium mb-3" style={{ color: theme.colors.text }}>
                常见问题
              </h3>
              <div className="space-y-2">
                {faqItems.slice(0, 3).map((faq, index) => (
                  <details 
                    key={index} 
                    className="group"
                  >
                    <summary 
                      className="cursor-pointer p-2 rounded text-sm list-none flex items-center justify-between"
                      style={{ 
                        color: theme.colors.textSecondary,
                        backgroundColor: 'transparent'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span>{faq.question}</span>
                      <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                    </summary>
                    <div 
                      className="text-xs p-2 ml-2 rounded"
                      style={{ 
                        color: theme.colors.textMuted,
                        backgroundColor: theme.colors.surfaceHover
                      }}
                    >
                      {faq.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              {filteredContent.length > 0 ? (
                filteredContent.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-medium mb-3" style={{ color: theme.colors.text }}>
                      {item.title}
                    </h3>
                    <div 
                      className="text-sm leading-relaxed whitespace-pre-line"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {item.content}
                    </div>
                  </div>
                ))
              ) : searchQuery ? (
                <div className="text-center py-8">
                  <p style={{ color: theme.colors.textMuted }}>
                    没有找到相关内容，请尝试其他关键词
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p style={{ color: theme.colors.textMuted }}>
                    选择左侧分类查看帮助内容
                  </p>
                </div>
              )}
            </div>

            {/* Contact Support */}
            <div 
              className="mt-8 p-4 rounded-lg border"
              style={{ 
                backgroundColor: theme.colors.surfaceHover,
                borderColor: theme.colors.border
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: theme.colors.text }}>
                需要更多帮助？
              </h4>
              <p className="text-sm mb-3" style={{ color: theme.colors.textSecondary }}>
                如果您的问题没有得到解答，可以通过以下方式联系我们：
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  在线客服
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  用户社区
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter; 