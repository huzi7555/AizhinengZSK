import { ReactNode, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Brain, Home, Book, MessageSquare, FilePlus, BarChart2, Settings, PanelLeft, Bell, Search, HelpCircle, Moon, Sun, User, Wifi, Library, FileText, Clock, MessageCircle } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import AuthModal from "@/components/auth/AuthModal";
import UserDropdown from "@/components/auth/UserDropdown";
import NotificationCenter from "@/components/NotificationCenter";
import HelpCenter from "@/components/help/HelpCenter";
import { Button } from "@/components/ui/button";

interface MainLayoutProps {
  children: ReactNode;
}

interface UserData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  loginTime: string;
}

// 主要导航图标 - 6个位置
const mainNavItems = [
  { label: "首页", path: "/", icon: <Home className="w-5 h-5" /> },
  { label: "知识库", path: "/knowledge", icon: <Book className="w-5 h-5" /> },
  { label: "智能问答", path: "/app", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "内容采集", path: "/collect", icon: <FilePlus className="w-5 h-5" /> },
  { label: "数据分析", path: "/analytics", icon: <BarChart2 className="w-5 h-5" /> },
  { label: "设置", path: "/settings", icon: <Settings className="w-5 h-5" /> }
];

// 底部功能图标 - 2个位置（跟对标网站一样）
const bottomNavItems = [
  { label: "消息", path: "/messages", icon: <Bell className="w-5 h-5" /> },
  { label: "历史记录", path: "/history", icon: <Clock className="w-5 h-5" /> }
];

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelpCenter, setShowHelpCenter] = useState(false);
  const [unreadNotifications] = useState(3);

  // 恢复用户信息
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('解析用户数据失败:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const handleLogin = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('用户登录成功:', userData);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    console.log('用户已退出登录');
  };

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
  };

  const showHelpGuide = () => {
    setShowHelpCenter(true);
  };

  return (
    <div 
      className="min-h-screen flex font-sans relative overflow-hidden"
      style={{ 
        // 🎨 精确的对标颜色 - 微微带暖意的浅灰
        background: '#E8E9E5',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}
    >
      {/* 🎯 三段式布局开始 */}
      
      {/* 左侧：极简导航栏 */}
      <aside className="relative z-10 w-16 h-screen flex flex-col items-center py-6">
        {/* Logo区域 */}
        <div className="mb-8">
          <div 
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
            }}
          >
            <Brain className="h-5 w-5 text-gray-700" />
          </div>
        </div>

        {/* 主要导航图标 */}
        <nav className="flex flex-col space-y-3 flex-1">
          {mainNavItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="group relative"
              title={item.label}
            >
              {({ isActive }) => (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: isActive 
                      ? 'rgba(255, 255, 255, 1)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    boxShadow: isActive 
                      ? '0 2px 8px rgba(0,0,0,0.08)'
                      : '0 1px 3px rgba(0,0,0,0.05)',
                    color: isActive ? '#000' : 'rgba(0,0,0,0.8)'
                  }}
                >
                  {item.icon}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        {/* 底部功能图标（消息 + 历史记录）*/}
        <nav className="flex flex-col space-y-3 mt-auto">
          {bottomNavItems.map((item, index) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="group relative"
              title={item.label}
            >
              {({ isActive }) => (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-105"
                  style={{
                    background: isActive 
                      ? 'rgba(255, 255, 255, 1)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    boxShadow: isActive 
                      ? '0 2px 8px rgba(0,0,0,0.08)'
                      : '0 1px 3px rgba(0,0,0,0.05)',
                    color: isActive ? '#000' : 'rgba(0,0,0,0.8)'
                  }}
                >
                  {item.icon}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* 中央：主内容区域（10%左右留白 + 内容 + 10%右侧留白） */}
      <main className="relative z-10 flex-1 flex">
        {/* 左侧10%留白 */}
        <div className="w-[10%] min-w-[60px]" />
        
        {/* 主内容容器 */}
        <div className="flex-1 max-w-4xl mx-auto">
          {children}
        </div>
        
        {/* 右侧10%留白 */}
        <div className="w-[10%] min-w-[60px]" />
      </main>

      {/* 🎭 弹窗组件保持不变 */}
      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          onLogin={handleLogin}
        />
      )}

      {showNotifications && (
        <NotificationCenter
          isOpen={showNotifications}
          onClose={() => setShowNotifications(false)}
        />
      )}

      {showHelpCenter && (
        <HelpCenter
          isOpen={showHelpCenter}
          onClose={() => setShowHelpCenter(false)}
        />
      )}
    </div>
  );
};

export default MainLayout; 