import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, FileText, Brain, Zap, Clock, Star, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import KeyboardShortcuts from "@/components/KeyboardShortcuts";
import DataVisualization from "@/components/DataVisualization";
import UserGuide from "@/components/UserGuide";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [stats, setStats] = useState({
    knowledge: 128,
    folders: 15,
    todayChats: 42
  });
  const [showGuide, setShowGuide] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // 动画变体定义
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.8
  };

  const logoVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.6 }
    }
  };

  const titleVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.6,
        duration: 0.8
      }
    }
  };

  const searchBoxVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        delay: 0.9,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 25px rgba(236, 72, 153, 0.15)",
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50 },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.2 + index * 0.1,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }),
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [0, -10, 10, -10, 0],
      scale: 1.2,
      transition: { duration: 0.5 }
    }
  };

  const statsVariants = {
    initial: { opacity: 0, x: -50 },
    animate: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 1.5 + index * 0.2,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    })
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const quickActions = [
    {
      title: "新建笔记",
      description: "快速创建新的知识笔记",
      icon: <Plus className="w-6 h-6" />,
      action: () => navigate("/knowledge"),
      color: "from-blue-400 to-blue-600"
    },
    {
      title: "智能问答",
      description: "与AI助手对话获取帮助",
      icon: <Brain className="w-6 h-6" />,
      action: () => navigate("/app"),
      color: "from-purple-400 to-purple-600"
    },
    {
      title: "内容采集",
      description: "采集网页、文档等内容",
      icon: <FileText className="w-6 h-6" />,
      action: () => navigate("/collect"),
      color: "from-green-400 to-green-600"
    },
    {
      title: "快速搜索",
      description: "搜索您的知识库内容",
      icon: <Search className="w-6 h-6" />,
      action: () => handleSearch(),
      color: "from-pink-400 to-pink-600"
    }
  ];

  const recentItems = [
    { title: "React最佳实践总结", type: "笔记", time: "2分钟前" },
    { title: "TypeScript学习指南", type: "文档", time: "1小时前" },
    { title: "项目架构设计讨论", type: "对话", time: "今天上午" }
  ];

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/knowledge?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/knowledge");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 页面加载动画
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // 模拟数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        todayChats: prev.todayChats + Math.floor(Math.random() * 3)
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // 检查是否首次访问，自动显示引导
  useEffect(() => {
    const hasVisited = localStorage.getItem('user-guide-completed');
    if (!hasVisited) {
      setTimeout(() => setShowGuide(true), 1000);
    }
  }, []);

  // Loading 动画组件
  const LoadingSpinner = () => (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: theme.colors.bg }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingSpinner key="loading" />
      ) : (
        <motion.div
          key="content"
          className="min-h-screen relative overflow-hidden"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
        >
          {/* 背景装饰元素 */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-10 w-32 h-32 bg-pink-200 rounded-full opacity-20"
              variants={floatingVariants}
              animate="animate"
            />
            <motion.div
              className="absolute top-60 right-20 w-24 h-24 bg-blue-200 rounded-full opacity-20"
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "1s" }}
            />
            <motion.div
              className="absolute bottom-32 left-1/4 w-20 h-20 bg-purple-200 rounded-full opacity-20"
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* 主要内容 */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            {/* Logo区域 */}
            <motion.div 
              className="text-center mb-12"
              variants={titleVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg mb-6 shadow-lg"
                variants={logoVariants}
                initial="initial"
                animate="animate"
                whileHover="hover"
                whileTap={{ scale: 0.95 }}
              >
                <Brain className="w-10 h-10 text-white" />
              </motion.div>
              
              <motion.h1 
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent"
                style={{ color: theme.colors.text }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                智能知识助手
              </motion.h1>
              
              <motion.p 
                className="text-xl max-w-2xl mx-auto"
                style={{ color: theme.colors.textSecondary }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
              >
                会思考的知识库，开启增写与新体验
              </motion.p>
            </motion.div>

            {/* 搜索框卡片 */}
            <motion.div 
              className="w-full max-w-2xl mb-12"
              variants={searchBoxVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <div 
                className="rounded-2xl p-6 shadow-lg backdrop-blur-sm"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  boxShadow: `0 8px 32px ${theme.colors.shadow}`
                }}
              >
                <div className="flex items-center">
                  <motion.div 
                    className="flex items-center justify-center w-12 h-12 rounded-xl mr-4 bg-gradient-to-br from-pink-400 to-pink-500"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </motion.div>
                  <Input
                    type="text"
                    placeholder="输入您想要搜索的内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 border-0 bg-transparent text-lg focus-visible:ring-0 placeholder:text-gray-400"
                    style={{ 
                      color: theme.colors.text,
                    }}
                  />
                  <div className="flex items-center space-x-2 ml-3">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-2 hover:bg-pink-50"
                        style={{ color: theme.colors.textSecondary }}
                        onClick={handleSearch}
                      >
                        <Search className="w-5 h-5" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="p-2 hover:bg-pink-50"
                        style={{ color: theme.colors.textSecondary }}
                        onClick={() => navigate("/app")}
                      >
                        <Zap className="w-5 h-5" />
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 快捷操作卡片 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-8">
              {quickActions.map((action, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  initial="initial"
                  animate="animate"
                  whileHover="hover"
                  whileTap={{ scale: 0.98 }}
                  onClick={action.action}
                  className="rounded-2xl p-6 shadow-lg cursor-pointer backdrop-blur-sm border border-white/10"
                  style={{ 
                    backgroundColor: theme.colors.surface,
                  }}
                >
                  <motion.div 
                    className={`flex items-center justify-center w-14 h-14 rounded-2xl mb-4 bg-gradient-to-br ${action.color} shadow-lg`}
                    variants={iconVariants}
                    whileHover="hover"
                  >
                    <div className="text-white">
                      {action.icon}
                    </div>
                  </motion.div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: theme.colors.text }}
                  >
                    {action.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {action.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* 数据可视化图表 */}
            <DataVisualization className="max-w-6xl w-full mb-8" />

            {/* 最近使用和统计信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl w-full mb-16">
              {/* 最近使用 */}
              <motion.div 
                className="rounded-2xl p-6 shadow-lg backdrop-blur-sm" 
                style={{ 
                  backgroundColor: theme.colors.surface,
                  boxShadow: `0 8px 32px ${theme.colors.shadow}`
                }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
                data-recent-items
              >
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-6 h-6 mr-3 text-purple-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold" style={{ color: theme.colors.text }}>最近使用</h3>
                </motion.div>
                <div className="space-y-3">
                  {recentItems.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-300 border border-transparent hover:border-purple-200"
                      style={{ backgroundColor: 'transparent' }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.2 + index * 0.1, duration: 0.5 }}
                      whileHover={{ 
                        backgroundColor: theme.colors.surfaceHover,
                        scale: 1.02,
                        x: 5
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div>
                        <div className="font-medium mb-1" style={{ color: theme.colors.text }}>{item.title}</div>
                        <div className="text-sm flex items-center">
                          <span 
                            className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-600 mr-2"
                            style={{ backgroundColor: `${theme.colors.primary}20` }}
                          >
                            {item.type}
                          </span>
                        </div>
                      </div>
                      <motion.div 
                        className="text-sm opacity-70"
                        style={{ color: theme.colors.textMuted }}
                        whileHover={{ opacity: 1 }}
                      >
                        {item.time}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* 统计信息卡片 */}
              <motion.div 
                className="rounded-2xl p-6 shadow-lg backdrop-blur-sm"
                style={{ 
                  backgroundColor: theme.colors.surface,
                  boxShadow: `0 8px 32px ${theme.colors.shadow}`
                }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.8, type: "spring", stiffness: 260, damping: 20 }}
              >
                <motion.div 
                  className="flex items-center mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    transition={{ duration: 0.3 }}
                  >
                    <TrendingUp className="w-6 h-6 mr-3 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold" style={{ color: theme.colors.text }}>数据统计</h3>
                </motion.div>
                <div className="grid grid-cols-3 gap-4">
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20"
                    custom={0}
                    variants={statsVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-blue-600 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.3, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {stats.knowledge}
                    </motion.div>
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>知识条目</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20"
                    custom={1}
                    variants={statsVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-purple-600 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.5, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {stats.folders}
                    </motion.div>
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>文件夹</div>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center p-4 rounded-xl bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20"
                    custom={2}
                    variants={statsVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-pink-600 mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.7, type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {stats.todayChats}
                    </motion.div>
                    <div className="text-sm font-medium" style={{ color: theme.colors.textSecondary }}>今日对话</div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* 键盘快捷键 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            <KeyboardShortcuts 
              onShowHelp={() => setShowGuide(true)}
            />
          </motion.div>

          {/* 新手引导 */}
          <AnimatePresence>
            {showGuide && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <UserGuide 
                  isOpen={showGuide} 
                  onClose={() => setShowGuide(false)}
                  autoStart={true}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Home;
