import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Keyboard, Command } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Shortcut {
  key: string;
  description: string;
  action: () => void;
  category: 'navigation' | 'action' | 'toggle';
}

interface KeyboardShortcutsProps {
  onShowHelp?: () => void;
}

const KeyboardShortcuts = ({ onShowHelp }: KeyboardShortcutsProps) => {
  const navigate = useNavigate();
  const [showShortcuts, setShowShortcuts] = useState(false);

  const shortcuts: Shortcut[] = [
    // 导航快捷键
    {
      key: 'Ctrl+1',
      description: '首页',
      action: () => navigate('/'),
      category: 'navigation'
    },
    {
      key: 'Ctrl+2',
      description: '知识库',
      action: () => navigate('/knowledge'),
      category: 'navigation'
    },
    {
      key: 'Ctrl+3',
      description: '智能问答',
      action: () => navigate('/app'),
      category: 'navigation'
    },
    {
      key: 'Ctrl+4',
      description: '内容采集',
      action: () => navigate('/collect'),
      category: 'navigation'
    },
    {
      key: 'Ctrl+5',
      description: '数据分析',
      action: () => navigate('/analytics'),
      category: 'navigation'
    },
    // 功能快捷键
    {
      key: 'Ctrl+K',
      description: '快速搜索',
      action: () => {
        const searchInput = document.querySelector('input[placeholder*="搜索"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
      },
      category: 'action'
    },
    {
      key: 'Ctrl+N',
      description: '新建笔记',
      action: () => navigate('/knowledge'),
      category: 'action'
    },
    {
      key: 'Ctrl+/',
      description: '显示快捷键帮助',
      action: () => setShowShortcuts(true),
      category: 'toggle'
    },
    // 切换功能
    {
      key: 'Ctrl+Shift+T',
      description: '切换主题',
      action: () => {
        // 触发全局主题切换
        const event = new CustomEvent('toggleTheme');
        window.dispatchEvent(event);
      },
      category: 'toggle'
    }
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { ctrlKey, shiftKey, key } = event;
      
      // 构建快捷键字符串
      let shortcutKey = '';
      if (ctrlKey) shortcutKey += 'Ctrl+';
      if (shiftKey) shortcutKey += 'Shift+';
      
      // 处理特殊键
      if (key === '/') {
        shortcutKey += '/';
      } else if (key.length === 1) {
        shortcutKey += key.toUpperCase();
      } else {
        shortcutKey += key;
      }

      // 查找匹配的快捷键
      const matchedShortcut = shortcuts.find(s => s.key === shortcutKey);
      
      if (matchedShortcut) {
        event.preventDefault();
        matchedShortcut.action();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);

  useEffect(() => {
    const handleGlobalThemeToggle = () => {
      // 主题切换逻辑将由MainLayout处理
    };
    
    window.addEventListener('toggleTheme', handleGlobalThemeToggle);
    return () => window.removeEventListener('toggleTheme', handleGlobalThemeToggle);
  }, []);

  const categorizedShortcuts = {
    navigation: shortcuts.filter(s => s.category === 'navigation'),
    action: shortcuts.filter(s => s.category === 'action'),
    toggle: shortcuts.filter(s => s.category === 'toggle')
  };

  const ShortcutHelp = () => {
    if (!showShortcuts) return null;

    return (
      <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
        <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-96 bg-white rounded-lg shadow-xl border">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Keyboard className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">键盘快捷键</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowShortcuts(false)}
            >
              <span className="sr-only">关闭</span>
              ×
            </Button>
          </div>
          
          <div className="p-4 max-h-96 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">导航</h4>
                <div className="space-y-1">
                  {categorizedShortcuts.navigation.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">操作</h4>
                <div className="space-y-1">
                  {categorizedShortcuts.action.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">切换</h4>
                <div className="space-y-1">
                  {categorizedShortcuts.toggle.map((shortcut, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{shortcut.description}</span>
                      <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                        {shortcut.key}
                      </kbd>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <ShortcutHelp />;
};

export default KeyboardShortcuts; 