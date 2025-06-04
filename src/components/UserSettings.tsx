
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export const UserSettings = () => {
  const [profile, setProfile] = useState({
    name: "张三",
    email: "zhangsan@example.com",
    avatar: "",
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
    aiSuggestions: true,
  });

  const [subscription] = useState({
    plan: "Premium",
    expireDate: "2024-12-31",
    features: ["无限存储", "高级AI功能", "优先支持", "数据导出"],
  });

  const handleProfileUpdate = () => {
    alert("个人资料已更新！");
  };

  const handlePreferenceChange = (key: string, value: boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          设置
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          管理您的账户设置和偏好
        </p>
      </div>

      {/* Profile Settings */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          个人资料
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name.charAt(0)}
            </div>
            <div>
              <Button variant="outline" size="sm">
                更换头像
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">姓名</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleProfileUpdate}>
              保存更改
            </Button>
          </div>
        </div>
      </div>

      {/* Subscription Info */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          会员信息
        </h2>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2">
              <Badge variant="default" className="bg-gold text-gold-foreground">
                {subscription.plan}
              </Badge>
              <span className="text-sm text-gray-500">
                到期时间：{subscription.expireDate}
              </span>
            </div>
          </div>
          <div className="space-x-2">
            <Button variant="outline">续费</Button>
            <Button>升级</Button>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            当前套餐包含：
          </p>
          <div className="flex flex-wrap gap-2">
            {subscription.features.map((feature, index) => (
              <Badge key={index} variant="secondary">
                ✓ {feature}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          偏好设置
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="dark-mode" className="text-base">深色模式</Label>
              <p className="text-sm text-gray-500">启用深色主题界面</p>
            </div>
            <Switch
              id="dark-mode"
              checked={preferences.darkMode}
              onCheckedChange={(checked) => handlePreferenceChange("darkMode", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="notifications" className="text-base">通知提醒</Label>
              <p className="text-sm text-gray-500">接收系统通知和更新提醒</p>
            </div>
            <Switch
              id="notifications"
              checked={preferences.notifications}
              onCheckedChange={(checked) => handlePreferenceChange("notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="auto-save" className="text-base">自动保存</Label>
              <p className="text-sm text-gray-500">编辑时自动保存内容</p>
            </div>
            <Switch
              id="auto-save"
              checked={preferences.autoSave}
              onCheckedChange={(checked) => handlePreferenceChange("autoSave", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="ai-suggestions" className="text-base">AI 智能建议</Label>
              <p className="text-sm text-gray-500">启用AI内容建议和优化提示</p>
            </div>
            <Switch
              id="ai-suggestions"
              checked={preferences.aiSuggestions}
              onCheckedChange={(checked) => handlePreferenceChange("aiSuggestions", checked)}
            />
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          安全设置
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">密码</Label>
              <p className="text-sm text-gray-500">最后更新：30天前</p>
            </div>
            <Button variant="outline">
              修改密码
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">两步验证</Label>
              <p className="text-sm text-gray-500">增强账户安全性</p>
            </div>
            <Button variant="outline">
              设置
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">登录设备</Label>
              <p className="text-sm text-gray-500">管理已登录的设备</p>
            </div>
            <Button variant="outline">
              查看设备
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-red-200 dark:border-red-700">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
          危险操作
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">导出数据</Label>
              <p className="text-sm text-gray-500">下载您的所有数据</p>
            </div>
            <Button variant="outline">
              导出
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base text-red-600">删除账户</Label>
              <p className="text-sm text-gray-500">永久删除您的账户和所有数据</p>
            </div>
            <Button variant="destructive">
              删除账户
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
