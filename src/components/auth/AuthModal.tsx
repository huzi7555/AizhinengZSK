import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import ForgotPasswordModal from "./ForgotPasswordModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (userData: any) => void;
}

const AuthModal = ({ isOpen, onClose, onLogin }: AuthModalProps) => {
  const { theme } = useTheme();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = '请输入邮箱地址';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }

    if (!formData.password) {
      newErrors.password = '请输入密码';
    } else if (formData.password.length < 6) {
      newErrors.password = '密码长度至少6位';
    }

    if (mode === 'register') {
      if (!formData.username) {
        newErrors.username = '请输入用户名';
      }
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = '请确认密码';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = '两次输入的密码不一致';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: '1',
        username: formData.username || formData.email.split('@')[0],
        email: formData.email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
        loginTime: new Date().toISOString()
      };

      // 保存到localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      
      onLogin(userData);
      onClose();
      
      // 重置表单
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        rememberMe: false
      });
      
    } catch (error) {
      setErrors({ submit: '登录失败，请稍后重试' });
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setErrors({});
  };

  const handleClose = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
      rememberMe: false
    });
    setErrors({});
    setMode('login');
    onClose();
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 backdrop-blur-sm"
        style={{ backgroundColor: theme.colors.overlay }}
      >
        <div 
          className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md rounded-lg shadow-xl"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <div 
            className="flex items-center justify-between p-6"
            style={{ borderBottom: `1px solid ${theme.colors.border}` }}
          >
            <h2 
              className="text-xl font-semibold"
              style={{ color: theme.colors.text }}
            >
              {mode === 'login' ? '登录账户' : '注册账户'}
            </h2>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === 'register' && (
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.colors.text }}
                >
                  用户名
                </label>
                <div className="relative">
                  <User 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: theme.colors.textMuted }} 
                  />
                  <Input
                    type="text"
                    placeholder="请输入用户名"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    className={`pl-10 ${errors.username ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderColor: errors.username ? theme.colors.danger : theme.colors.border,
                      color: theme.colors.text
                    }}
                  />
                </div>
                {errors.username && (
                  <p className="text-xs mt-1" style={{ color: theme.colors.danger }}>
                    {errors.username}
                  </p>
                )}
              </div>
            )}

            <div>
              <label 
                className="block text-sm font-medium mb-1"
                style={{ color: theme.colors.text }}
              >
                邮箱地址
              </label>
              <div className="relative">
                <Mail 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: theme.colors.textMuted }}
                />
                <Input
                  type="email"
                  placeholder="请输入邮箱地址"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: errors.email ? theme.colors.danger : theme.colors.border,
                    color: theme.colors.text
                  }}
                />
              </div>
              {errors.email && (
                <p className="text-xs mt-1" style={{ color: theme.colors.danger }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label 
                className="block text-sm font-medium mb-1"
                style={{ color: theme.colors.text }}
              >
                密码
              </label>
              <div className="relative">
                <Lock 
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                  style={{ color: theme.colors.textMuted }}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="请输入密码"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
                  style={{
                    backgroundColor: theme.colors.surface,
                    borderColor: errors.password ? theme.colors.danger : theme.colors.border,
                    color: theme.colors.text
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: theme.colors.textMuted }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1" style={{ color: theme.colors.danger }}>
                  {errors.password}
                </p>
              )}
            </div>

            {mode === 'register' && (
              <div>
                <label 
                  className="block text-sm font-medium mb-1"
                  style={{ color: theme.colors.text }}
                >
                  确认密码
                </label>
                <div className="relative">
                  <Lock 
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: theme.colors.textMuted }}
                  />
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="请再次输入密码"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
                    style={{
                      backgroundColor: theme.colors.surface,
                      borderColor: errors.confirmPassword ? theme.colors.danger : theme.colors.border,
                      color: theme.colors.text
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                    style={{ color: theme.colors.textMuted }}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs mt-1" style={{ color: theme.colors.danger }}>
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                    className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                  />
                  <span 
                    className="ml-2 text-sm"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    记住我
                  </span>
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-pink-600 hover:text-pink-500"
                >
                  忘记密码？
                </button>
              </div>
            )}

            {errors.submit && (
              <p className="text-center text-xs" style={{ color: theme.colors.danger }}>
                {errors.submit}
              </p>
            )}

            <Button
              type="submit"
              className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              disabled={loading}
            >
              {loading ? '处理中...' : (mode === 'login' ? '登录' : '注册')}
            </Button>

            <div className="text-center">
              <span 
                className="text-sm"
                style={{ color: theme.colors.textSecondary }}
              >
                {mode === 'login' ? '还没有账户？' : '已有账户？'}
              </span>
              <button
                type="button"
                onClick={switchMode}
                className="ml-1 text-sm text-pink-600 hover:text-pink-500"
              >
                {mode === 'login' ? '立即注册' : '立即登录'}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
};

export default AuthModal; 