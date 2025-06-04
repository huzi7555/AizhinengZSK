import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar = ({ activeTab, setActiveTab }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "home", label: "首页", icon: "🏠", href: "/" },
    { id: "knowledge", label: "知识库", icon: "📚", href: "/knowledge" },
    { id: "collect", label: "内容采集", icon: "📥", href: "/collect" },
    { id: "analytics", label: "数据分析", icon: "📊", href: "/analytics" },
    { id: "history", label: "历史记录", icon: "🕒", href: "/history" },
    { id: "settings", label: "设置", icon: "⚙️", href: "/settings" },
  ];

  const handleItemClick = (item: any) => {
    if (item.href) {
      navigate(item.href);
    }
    setActiveTab(item.id);
  };

  const isActive = (item: any) => {
    if (item.href === location.pathname) return true;
    return activeTab === item.id;
  };

  return (
    <div className="flex">
      {/* 左侧导航栏 */}
      <div className={cn(
        "flex flex-col transition-all duration-300 backdrop-blur-sm",
        isCollapsed ? "w-16" : "w-64"
      )}>
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-white">
              智能知识助手
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5 text-white" />
            ) : (
              <ChevronLeft className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-2">
          {menuItems.map((item) => {
            const active = isActive(item);
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={cn(
                  "w-full flex items-center gap-3 h-11 px-3 transition-all duration-200 text-left group",
                  "font-['Inter',system-ui,sans-serif] antialiased rounded-lg",
                  active
                    ? "text-white font-semibold bg-white/20"
                    : "text-white/70 hover:text-white hover:bg-white/10",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <span className={cn(
                  "text-lg flex-shrink-0 transition-all duration-200",
                  active ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                )}>{item.icon}</span>
                {!isCollapsed && (
                  <span className={cn(
                    "text-sm leading-normal tracking-normal select-none transition-all duration-200",
                    active ? "font-medium" : "font-normal"
                  )}>
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="" />
              <AvatarFallback className="bg-white/20 text-white">U</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <div className="flex-1">
                <div className="text-sm font-medium text-white">
                  用户名
                </div>
                <div className="text-xs text-white/60">
                  免费版本
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 右侧用户菜单 */}
      <div className="fixed top-4 right-4 z-50">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-white/20 text-white">U</AvatarFallback>
              </Avatar>
              <span className="text-sm text-white">设置</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>我的账户</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>
              个人设置
            </DropdownMenuItem>
            <DropdownMenuItem>
              会员中心
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/")}>
              首页
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">
              退出登录
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
