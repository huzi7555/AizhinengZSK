import { useState } from "react";
import { LogOut, Settings, Bell, HelpCircle, User, Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface UserData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  loginTime: string;
}

interface UserDropdownProps {
  user: UserData;
  onLogout: () => void;
  onShowNotifications: () => void;
  onShowHelp: () => void;
  onToggleTheme: () => void;
  isDarkMode: boolean;
}

const UserDropdown = ({ 
  user, 
  onLogout, 
  onShowNotifications, 
  onShowHelp, 
  onToggleTheme,
  isDarkMode 
}: UserDropdownProps) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full"
          style={{
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border
          }}
        >
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={user.avatar} 
              alt={user.username}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}&background=ec4899&color=fff`;
              }}
            />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56"
        align="end"
        forceMount
        style={{
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.border,
          boxShadow: `0 10px 15px -3px ${theme.colors.shadow}, 0 4px 6px -2px ${theme.colors.shadow}`
        }}
      >
        <DropdownMenuLabel 
          className="font-normal"
          style={{ color: theme.colors.text }}
        >
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.username}</p>
            <p 
              className="text-xs leading-none"
              style={{ color: theme.colors.textMuted }}
            >
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator style={{ backgroundColor: theme.colors.border }} />
        
        <DropdownMenuItem 
          style={{ 
            color: theme.colors.textSecondary,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
            e.currentTarget.style.color = theme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.textSecondary;
          }}
          onClick={() => {
            setIsOpen(false);
            // 打开个人设置
          }}
        >
          <User className="mr-2 h-4 w-4" />
          <span>个人资料</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          style={{ 
            color: theme.colors.textSecondary,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
            e.currentTarget.style.color = theme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.textSecondary;
          }}
          onClick={() => {
            setIsOpen(false);
            onShowNotifications();
          }}
        >
          <Bell className="mr-2 h-4 w-4" />
          <span>通知中心</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          style={{ 
            color: theme.colors.textSecondary,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
            e.currentTarget.style.color = theme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.textSecondary;
          }}
          onClick={() => {
            setIsOpen(false);
            // 打开设置页面
          }}
        >
          <Settings className="mr-2 h-4 w-4" />
          <span>设置</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          style={{ 
            color: theme.colors.textSecondary,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
            e.currentTarget.style.color = theme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.textSecondary;
          }}
          onClick={() => {
            setIsOpen(false);
            onToggleTheme();
          }}
        >
          {isDarkMode ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
          <span>{isDarkMode ? '浅色模式' : '深色模式'}</span>
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          style={{ 
            color: theme.colors.textSecondary,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.surfaceHover;
            e.currentTarget.style.color = theme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.textSecondary;
          }}
          onClick={() => {
            setIsOpen(false);
            onShowHelp();
          }}
        >
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>帮助中心</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator style={{ backgroundColor: theme.colors.border }} />
        
        <DropdownMenuItem 
          style={{ 
            color: theme.colors.danger,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#fee2e2';
            e.currentTarget.style.color = '#dc2626';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = theme.colors.danger;
          }}
          onClick={() => {
            setIsOpen(false);
            onLogout();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>退出登录</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown; 