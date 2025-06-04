import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, HelpCircle, CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface GuideStep {
  id: string;
  title: string;
  description: string;
  target?: string;
  action?: () => void;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

interface UserGuideProps {
  isOpen: boolean;
  onClose: () => void;
  autoStart?: boolean;
}

const UserGuide = ({ isOpen, onClose, autoStart = false }: UserGuideProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  const guideSteps: GuideStep[] = [
    {
      id: 'welcome',
      title: '欢迎使用智能知识助手！',
      description: '让我们来快速了解一下如何使用这个强大的知识管理工具。',
      position: 'center'
    },
    {
      id: 'search',
      title: '智能搜索',
      description: '在搜索框中输入关键词，快速找到您需要的信息。支持按回车键或点击搜索按钮。',
      target: 'input[placeholder*="搜索"]',
      position: 'bottom'
    },
    {
      id: 'quick-actions',
      title: '快捷操作',
      description: '这些卡片可以帮您快速访问常用功能：创建笔记、智能问答、内容采集等。',
      target: '.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-4',
      position: 'top'
    },
    {
      id: 'recent-items',
      title: '最近使用',
      description: '查看您最近访问的文档和对话记录，提高工作效率。',
      target: '[data-recent-items]',
      position: 'right'
    },
    {
      id: 'shortcuts',
      title: '键盘快捷键',
      description: '按 Ctrl+/ 查看所有可用的键盘快捷键，让操作更加高效。',
      position: 'center'
    },
    {
      id: 'notifications',
      title: '通知',
      description: '点击通知按钮查看系统消息和提醒，保持与最新信息同步。',
      target: '[data-notification-trigger]',
      position: 'bottom'
    },
    {
      id: 'user-settings',
      title: '用户设置',
      description: '点击右上角的用户头像可以访问账户设置、安全选项等个人功能。',
      target: '[data-user-dropdown]',
      position: 'bottom'
    },
    {
      id: 'complete',
      title: '教程完成！',
      description: '现在您已经了解了基本功能，开始探索您的智能知识助手吧！',
      position: 'center',
      action: () => navigate('/knowledge')
    }
  ];

  useEffect(() => {
    // 检查是否首次访问
    const hasVisited = localStorage.getItem('user-guide-completed');
    if (!hasVisited && autoStart) {
      setIsFirstVisit(true);
    }
  }, [autoStart]);

  const currentStepData = guideSteps[currentStep];

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeGuide();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeGuide = () => {
    localStorage.setItem('user-guide-completed', 'true');
    if (currentStepData.action) {
      currentStepData.action();
    }
    onClose();
  };

  const skipGuide = () => {
    localStorage.setItem('user-guide-completed', 'true');
    onClose();
  };

  const getTargetElement = (target: string) => {
    return document.querySelector(target);
  };

  const getTooltipPosition = (target: string, position: GuideStep['position']) => {
    const element = getTargetElement(target);
    if (!element) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    // 获取视口尺寸
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // 工具提示框的估计尺寸
    const tooltipWidth = 384; // max-w-sm
    const tooltipHeight = 250; // 估计高度

    let styles: any = {};

    switch (position) {
      case 'top':
        styles = {
          top: Math.max(20, rect.top + scrollTop - tooltipHeight - 20),
          left: Math.max(20, Math.min(
            rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2,
            scrollLeft + viewportWidth - tooltipWidth - 20
          )),
          transform: 'none'
        };
        break;
        
      case 'bottom':
        styles = {
          top: Math.min(
            rect.bottom + scrollTop + 20,
            scrollTop + viewportHeight - tooltipHeight - 20
          ),
          left: Math.max(20, Math.min(
            rect.left + scrollLeft + rect.width / 2 - tooltipWidth / 2,
            scrollLeft + viewportWidth - tooltipWidth - 20
          )),
          transform: 'none'
        };
        break;
        
      case 'left':
        styles = {
          top: Math.max(20, Math.min(
            rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2,
            scrollTop + viewportHeight - tooltipHeight - 20
          )),
          left: Math.max(20, rect.left + scrollLeft - tooltipWidth - 20),
          transform: 'none'
        };
        break;
        
      case 'right':
        styles = {
          top: Math.max(20, Math.min(
            rect.top + scrollTop + rect.height / 2 - tooltipHeight / 2,
            scrollTop + viewportHeight - tooltipHeight - 20
          )),
          left: Math.min(
            rect.right + scrollLeft + 20,
            scrollLeft + viewportWidth - tooltipWidth - 20
          ),
          transform: 'none'
        };
        break;
        
      default:
        styles = {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }

    return styles;
  };

  const highlightTarget = (target?: string) => {
    // 移除之前的高亮
    const prevHighlighted = document.querySelector('.guide-highlight');
    if (prevHighlighted) {
      prevHighlighted.classList.remove('guide-highlight');
    }

    // 添加新的高亮
    if (target) {
      const element = getTargetElement(target);
      if (element) {
        element.classList.add('guide-highlight');
        
        // 滚动到目标元素
        setTimeout(() => {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'center'
          });
        }, 100);
      }
    }
  };

  useEffect(() => {
    if (isOpen && currentStepData) {
      // 延迟一点时间确保DOM已渲染
      setTimeout(() => {
        highlightTarget(currentStepData.target);
      }, 200);
    }

    return () => {
      // 清理高亮
      const highlighted = document.querySelector('.guide-highlight');
      if (highlighted) {
        highlighted.classList.remove('guide-highlight');
      }
    };
  }, [currentStep, isOpen, currentStepData]);

  if (!isOpen && !isFirstVisit) return null;

  const tooltipStyle = currentStepData.target 
    ? getTooltipPosition(currentStepData.target, currentStepData.position)
    : { 
        position: 'fixed' as const,
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)' 
      };

  return (
    <>
      {/* 样式注入 */}
      <style>
        {`
          .guide-highlight {
            position: relative;
            z-index: 1001;
            box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3) !important;
            border-radius: 8px;
          }
        `}
      </style>

      {/* 遮罩层 */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm">
        {/* 工具提示 */}
        <div
          className="fixed z-[60] bg-white rounded-lg shadow-xl border max-w-sm w-full mx-4"
          style={tooltipStyle}
        >
          <div className="p-6">
            {/* 步骤指示器 */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {currentStep + 1}
                </div>
                <div className="text-sm text-gray-500">
                  {currentStep + 1} / {guideSteps.length}
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={skipGuide}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* 内容 */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {currentStepData.title}
            </h3>
            <p className="text-gray-600 mb-6 text-sm leading-relaxed">
              {currentStepData.description}
            </p>

            {/* 操作按钮 */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                上一步
              </Button>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={skipGuide}>
                  跳过
                </Button>
                <Button
                  size="sm"
                  onClick={nextStep}
                  className="flex items-center gap-2"
                >
                  {currentStep === guideSteps.length - 1 ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      完成
                    </>
                  ) : (
                    <>
                      下一步
                      <ChevronRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* 进度条 */}
          <div className="h-1 bg-gray-100">
            <div
              className="h-full bg-blue-500 transition-all duration-300"
              style={{ width: `${((currentStep + 1) / guideSteps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

// 帮助按钮组件
export const HelpButton = ({ onShowGuide }: { onShowGuide: () => void }) => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onShowGuide}
      className="fixed bottom-6 right-6 z-40 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
    >
      <HelpCircle className="w-4 h-4 mr-2" />
      帮助
    </Button>
  );
};

export default UserGuide; 