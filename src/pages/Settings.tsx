import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Mail, Lock, Bell, Moon, Sun, Globe, Trash2, Shield } from "lucide-react";

interface UserData {
  id: string;
  username: string;
  email: string;
  avatar: string;
  loginTime: string;
}

const Settings = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [activeTab, setActiveTab] = useState('account');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
    marketing: false
  });
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setFormData(prev => ({
          ...prev,
          username: userData.username,
          email: userData.email
        }));
      } catch (error) {
        console.error('解析用户数据失败:', error);
      }
    }
  }, []);

  const tabs = [
    { id: 'account', label: '账户信息', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: '安全设置', icon: <Shield className="w-4 h-4" /> },
    { id: 'notifications', label: '通知设置', icon: <Bell className="w-4 h-4" /> },
    { id: 'preferences', label: '偏好设置', icon: <Globe className="w-4 h-4" /> }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handleSaveAccount = () => {
    if (user) {
      const updatedUser = {
        ...user,
        username: formData.username,
        email: formData.email
      };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      alert('账户信息已更新');
    }
  };

  const handleChangePassword = () => {
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      alert('请填写所有密码字段');
      return;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      alert('新密码确认不匹配');
      return;
    }
    if (formData.newPassword.length < 6) {
      alert('新密码长度至少6位');
      return;
    }
    
    // 模拟密码更新
    alert('密码已更新');
    setFormData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm('确定要删除账户吗？此操作不可撤销。');
    if (confirmed) {
      localStorage.removeItem('user');
      window.location.href = '/';
    }
  };

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">个人信息</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200">
              {user && (
                <img 
                  src={user.avatar} 
                  alt={user.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${user.username}&background=ec4899&color=fff`;
                  }}
                />
              )}
            </div>
            <div>
              <Button variant="outline" size="sm">更换头像</Button>
              <p className="text-sm text-gray-500 mt-1">支持 JPG、PNG 格式，文件大小不超过 2MB</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <Input
              value={formData.username}
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="请输入用户名"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱地址</label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="请输入邮箱地址"
            />
          </div>
          
          <Button onClick={handleSaveAccount}>保存更改</Button>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">密码设置</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">当前密码</label>
            <Input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              placeholder="请输入当前密码"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">新密码</label>
            <Input
              type="password"
              value={formData.newPassword}
              onChange={(e) => handleInputChange('newPassword', e.target.value)}
              placeholder="请输入新密码"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">确认新密码</label>
            <Input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              placeholder="请再次输入新密码"
            />
          </div>
          
          <Button onClick={handleChangePassword}>更新密码</Button>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">危险操作</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Trash2 className="w-5 h-5 text-red-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-red-800">删除账户</h4>
              <p className="text-sm text-red-600 mt-1">
                删除账户将永久移除您的所有数据，此操作不可撤销。
              </p>
              <Button 
                variant="destructive" 
                size="sm" 
                className="mt-3"
                onClick={handleDeleteAccount}
              >
                删除账户
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">通知偏好</h3>
        <div className="space-y-4">
          {[
            { key: 'email', label: '邮件通知', description: '接收重要更新和提醒邮件' },
            { key: 'push', label: '推送通知', description: '接收浏览器推送通知' },
            { key: 'updates', label: '产品更新', description: '接收新功能和改进通知' },
            { key: 'marketing', label: '营销信息', description: '接收产品推广和优惠信息' }
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium text-gray-800">{item.label}</h4>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications[item.key as keyof typeof notifications]}
                  onChange={(e) => handleNotificationChange(item.key, e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">界面设置</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              {isDarkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              <div>
                <h4 className="font-medium text-gray-800">主题模式</h4>
                <p className="text-sm text-gray-600">选择浅色或深色主题</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={(e) => setIsDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5" />
              <div>
                <h4 className="font-medium text-gray-800">语言设置</h4>
                <p className="text-sm text-gray-600">选择界面显示语言</p>
              </div>
            </div>
            <select className="border rounded-md px-3 py-1 text-sm">
              <option value="zh-CN">简体中文</option>
              <option value="en-US">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return renderAccountTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'preferences':
        return renderPreferencesTab();
      default:
        return renderAccountTab();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">请先登录以访问设置页面</p>
          <Button onClick={() => window.location.href = '/'}>返回首页</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">设置</h1>
          <p className="text-gray-600">管理您的账户和偏好设置</p>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'text-pink-600 border-b-2 border-pink-600 bg-pink-50'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 