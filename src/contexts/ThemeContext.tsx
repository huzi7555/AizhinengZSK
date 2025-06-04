import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 主题配色定义
export interface ThemeColors {
  // 背景层级
  bg: string;           // 主背景
  surface: string;      // 卡片/容器背景
  surfaceHover: string; // hover状态背景
  
  // 边框
  border: string;       // 主边框
  borderLight: string;  // 浅边框
  
  // 文字
  text: string;         // 主文字
  textSecondary: string;// 次要文字
  textMuted: string;    // 禁用文字
  
  // 品牌和状态色
  primary: string;      // 品牌粉色
  success: string;      // 成功色
  warning: string;      // 警告色
  danger: string;       // 危险色
  
  // 特殊用途
  overlay: string;      // 遮罩层
  shadow: string;       // 阴影色
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

// 浅色主题 (现有的)
const lightTheme: Theme = {
  name: 'light',
  colors: {
    bg: '#f7f7f7',
    surface: '#ffffff',
    surfaceHover: '#f8f9fa',
    
    border: '#e5e7eb',
    borderLight: '#f3f4f6',
    
    text: '#374151',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    
    primary: '#ec4899',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    
    overlay: 'rgba(0, 0, 0, 0.5)',
    shadow: 'rgba(0, 0, 0, 0.1)'
  }
};

// GitHub风格深色主题
const darkTheme: Theme = {
  name: 'dark',
  colors: {
    bg: '#0d1117',
    surface: '#161b22',
    surfaceHover: '#21262d',
    
    border: '#30363d',
    borderLight: '#21262d',
    
    text: '#f0f6fc',
    textSecondary: '#8b949e',
    textMuted: '#6e7681',
    
    primary: '#ec4899',
    success: '#238636',
    warning: '#d1a103',
    danger: '#da3633',
    
    overlay: 'rgba(0, 0, 0, 0.7)',
    shadow: 'rgba(0, 0, 0, 0.3)'
  }
};

// 主题上下文类型
interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (dark: boolean) => void;
}

// 创建上下文
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供者组件
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 初始化主题设置
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setIsDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  // 应用主题到DOM
  useEffect(() => {
    const theme = isDarkMode ? darkTheme : lightTheme;
    
    // 设置CSS变量
    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });
    
    // 设置body背景和类名
    document.body.style.backgroundColor = theme.colors.bg;
    document.documentElement.style.backgroundColor = theme.colors.bg;
    
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.style.backgroundColor = '';
      document.body.classList.remove('dark');
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem('darkMode', JSON.stringify(newMode));
    
    // 显示切换提示
    showThemeToast(newMode);
  };

  const setDarkMode = (dark: boolean) => {
    setIsDarkMode(dark);
    localStorage.setItem('darkMode', JSON.stringify(dark));
  };

  // 主题切换提示
  const showThemeToast = (isDark: boolean) => {
    const theme = isDark ? darkTheme : lightTheme;
    const message = isDark ? '已切换到深色模式' : '已切换到浅色模式';
    
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${theme.colors.surface};
      color: ${theme.colors.text};
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px ${theme.colors.shadow};
      z-index: 1000;
      font-size: 14px;
      border: 1px solid ${theme.colors.border};
      font-family: system-ui, -apple-system, sans-serif;
      transition: all 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // 入场动画
    requestAnimationFrame(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    });
    
    // 自动移除
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (document.body.contains(toast)) {
          document.body.removeChild(toast);
        }
      }, 300);
    }, 2000);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme, setDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 自定义Hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 