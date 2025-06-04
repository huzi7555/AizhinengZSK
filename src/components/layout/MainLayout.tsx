import { ReactNode, useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Brain, Home, Book, MessageSquare, FilePlus, BarChart2, Settings, PanelLeft, Bell, Search, HelpCircle, Moon, Sun, User, Wifi, Library, FileText } from "lucide-react";
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

// 核心功能导航
const coreNavItems = [
  { label: "首页", path: "/", icon: <Home className="w-5 h-5" /> },
  { label: "知识库", path: "/knowledge", icon: <Book className="w-5 h-5" /> },
  { label: "智能问答", path: "/app", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "内容采集", path: "/collect", icon: <FilePlus className="w-5 h-5" /> }
];

// 工具功能导航
const toolNavItems = [
  { label: "数据分析", path: "/analytics", icon: <BarChart2 className="w-5 h-5" /> },
  { label: "设置", path: "/settings", icon: <Settings className="w-5 h-5" /> }
];

const SIDEBAR_WIDTH = 220;
const SIDEBAR_COLLAPSED_WIDTH = 64;

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
    // Note: 在实际应用中，这里应该通过API调用来标记通知为已读
  };

  const showHelpGuide = () => {
    setShowHelpCenter(true);
  };

  const handleQuickSearch = () => {
    const searchInput = document.querySelector('input[placeholder*="搜索"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.select();
    }
  };

  return (
    <div 
      className="min-h-screen flex font-sans overflow-hidden"
      style={{ backgroundColor: theme.colors.bg }}
    >
      {/* 侧边菜单 */}
      <aside
        className="h-screen fixed top-0 left-0 z-40 transition-all duration-200 flex flex-col"
        style={{ 
          width: isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          backgroundColor: theme.colors.bg
        }}
      >
        {/* 顶部Logo */}
        <div className="flex items-center h-16 px-4">
          <Brain className="h-7 w-7 text-pink-500" />
          {isSidebarOpen && (
            <span 
              className="text-lg font-bold ml-2"
              style={{ color: theme.colors.text }}
            >
              智能知识助手
            </span>
          )}
        </div>

        {/* 导航内容 */}
        <div className="flex-1 flex flex-col py-4 overflow-y-auto">
          {/* 核心功能区 */}
          <nav className="px-2 mb-4">
            {isSidebarOpen && (
              <div 
                className="text-xs font-medium uppercase tracking-wider mb-2 px-2"
                style={{ color: theme.colors.textSecondary }}
              >
                核心功能
              </div>
            )}
            <div className="space-y-1">
              {coreNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-all text-sm font-medium focus-visible:ring-2 h-8`
                  }
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? theme.colors.surfaceHover : 'transparent',
                    color: isActive ? theme.colors.text : theme.colors.textSecondary,
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.classList.contains('active')) {
                      e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                      e.currentTarget.style.color = theme.colors.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.classList.contains('active')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme.colors.textSecondary;
                    }
                  }}
                >
                  {item.icon}
                  {isSidebarOpen && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* 工具功能区 */}
          <nav className="px-2 mb-4">
            {isSidebarOpen && (
              <div 
                className="text-xs font-medium uppercase tracking-wider mb-2 px-2"
                style={{ color: theme.colors.textSecondary }}
              >
                工具功能
              </div>
            )}
            <div className="space-y-1">
              {toolNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-all text-sm font-medium focus-visible:ring-2 h-8"
                  style={({ isActive }) => ({
                    backgroundColor: isActive ? theme.colors.surfaceHover : 'transparent',
                    color: isActive ? theme.colors.text : theme.colors.textSecondary,
                  })}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.classList.contains('active')) {
                      e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                      e.currentTarget.style.color = theme.colors.text;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.currentTarget.classList.contains('active')) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = theme.colors.textSecondary;
                    }
                  }}
                >
                  {item.icon}
                  {isSidebarOpen && <span className="truncate">{item.label}</span>}
                </NavLink>
              ))}
            </div>
          </nav>

          {/* 快捷操作区 */}
          <nav className="px-2 mb-4">
            {isSidebarOpen && (
              <div 
                className="text-xs font-medium uppercase tracking-wider mb-2 px-2"
                style={{ color: theme.colors.textSecondary }}
              >
                快捷操作
              </div>
            )}
            <div className="space-y-1">
              <button
                onClick={handleQuickSearch}
                className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-all text-sm font-medium h-8"
                style={{ color: theme.colors.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                  e.currentTarget.style.color = theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.colors.textSecondary;
                }}
                title={!isSidebarOpen ? "快速搜索" : ""}
              >
                <Search className="w-5 h-5" />
                {isSidebarOpen && <span className="truncate">快速搜索</span>}
              </button>
              <button
                onClick={showHelpGuide}
                className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-all text-sm font-medium h-8"
                style={{ color: theme.colors.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                  e.currentTarget.style.color = theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.colors.textSecondary;
                }}
                title={!isSidebarOpen ? "帮助中心" : ""}
              >
                <HelpCircle className="w-5 h-5" />
                {isSidebarOpen && <span className="truncate">帮助中心</span>}
              </button>
              <button
                onClick={toggleTheme}
                className="flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left outline-none transition-all text-sm font-medium h-8"
                style={{ color: theme.colors.textSecondary }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
                  e.currentTarget.style.color = theme.colors.text;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.colors.textSecondary;
                }}
                title={!isSidebarOpen ? (isDarkMode ? "浅色模式" : "深色模式") : ""}
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                {isSidebarOpen && <span className="truncate">{isDarkMode ? '浅色模式' : '深色模式'}</span>}
              </button>
            </div>
          </nav>

          {/* 弹性空间 */}
          <div className="flex-1" />

          {/* 用户信息区 */}
          <div className="px-4 pb-4">
            <div className="pt-4">
              {user ? (
                <div className="space-y-2">
                  <div className={`flex items-center ${isSidebarOpen ? 'gap-2' : 'justify-center'}`}>
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                      <img 
                        src={user.avatar} 
                        alt={user.username}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}&background=ec4899&color=fff`;
                        }}
                        title={!isSidebarOpen ? `${user.username} (在线)` : ""}
                      />
                    </div>
                    {isSidebarOpen && (
                      <div className="flex-1 min-w-0">
                        <div 
                          className="text-sm font-medium truncate"
                          style={{ color: theme.colors.text }}
                        >
                          {user.username}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <Wifi className="w-3 h-3" />
                          在线
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className={`${isSidebarOpen ? 'text-center' : 'flex justify-center'}`}>
                  <div className="w-8 h-8 rounded-full bg-gray-200 mx-auto mb-2 flex items-center justify-center" title={!isSidebarOpen ? "未登录" : ""}>
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                  {isSidebarOpen && (
                    <div 
                      className="text-xs"
                      style={{ color: theme.colors.textMuted }}
                    >
                      未登录
                    </div>
                  )}
                </div>
              )}
              
              {isSidebarOpen && (
                <div className="mt-3 pt-2">
                  <div 
                    className="text-xs text-center"
                    style={{ color: theme.colors.textMuted }}
                  >
                    v1.2.0
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区域 */}
      <div
        className="flex-1 min-h-screen transition-all duration-200 relative p-4"
        style={{ 
          marginLeft: isSidebarOpen ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH,
          backgroundColor: theme.colors.bg
        }}
      >
        {/* 整体凸起的内容容器 */}
        <div 
          className="rounded-xl shadow-md min-h-[calc(100vh-2rem)] p-6 flex flex-col"
          style={{ 
            backgroundColor: theme.colors.surface,
            boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
          }}
        >
          {/* 顶部导航栏 */}
          <div className="flex items-center justify-between mb-2">
            <button
              className="flex items-center justify-center w-10 h-10 border rounded-lg hover:bg-opacity-80 transition-colors duration-150 shadow-sm"
              style={{
                backgroundColor: theme.colors.surface,
                borderColor: theme.colors.border,
                color: theme.colors.textSecondary
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = theme.colors.surface;
              }}
              onClick={() => setIsSidebarOpen((v) => !v)}
            >
              <PanelLeft className="w-5 h-5" />
            </button>
            
            {/* 用户认证区域 */}
            <div className="flex items-center gap-2">
              {/* 通知按钮 */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleNotificationToggle}
                className="flex items-center gap-2 relative"
                style={{
                  color: theme.colors.textSecondary,
                  borderColor: theme.colors.border,
                  backgroundColor: theme.colors.surface
                }}
                data-notification-trigger
              >
                <Bell className="w-4 h-4" />
                通知
                {/* 未读通知徽章 */}
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </Button>
              
              {user ? (
                <div data-user-dropdown>
                  <UserDropdown
                    user={user}
                    onLogout={handleLogout}
                    onShowNotifications={handleNotificationToggle}
                    onShowHelp={showHelpGuide}
                    onToggleTheme={toggleTheme}
                    isDarkMode={isDarkMode}
                  />
                </div>
              ) : (
                <Button
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  style={{
                    color: theme.colors.textSecondary,
                    borderColor: theme.colors.border,
                    backgroundColor: theme.colors.surface
                  }}
                >
                  登录
                </Button>
              )}
            </div>
          </div>
          
          {/* 水平线，延伸到边缘 */}
          <div 
            className="w-[calc(100%+48px)] h-[1px] -mx-6 mb-4"
            style={{ borderBottom: `1px solid ${theme.colors.border}` }}
          ></div>
          
          {/* 主内容 */}
          <div className="flex-1">
            {children}
          </div>
          
          {/* 底部版权信息 */}
          <div 
            className="mt-6 pt-6 text-center"
            style={{ borderTop: `1px solid ${theme.colors.borderLight}` }}
          >
            <div 
              className="text-sm"
              style={{ color: theme.colors.textMuted }}
            >
              © 2024 智能知识助手
            </div>
          </div>
        </div>
      </div>

      {/* 认证模态框 */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLogin={handleLogin}
      />
      
      {/* 通知中心 */}
      <NotificationCenter 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* 帮助中心 */}
      <HelpCenter
        isOpen={showHelpCenter}
        onClose={() => setShowHelpCenter(false)}
      />
    </div>
  );
};

export default MainLayout; 