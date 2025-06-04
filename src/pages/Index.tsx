import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import { Sidebar } from "../components/Sidebar";
import { ContentCollection } from "../components/ContentCollection";
import { KnowledgeBase } from "../components/KnowledgeBase";
import { AIChat } from "../components/AIChat";
import { Analytics } from "../components/Analytics";
import { UserSettings } from "../components/UserSettings";

const Index = () => {
  const { theme } = useTheme();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("knowledge");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Update active tab based on current route
  useEffect(() => {
    const path = location.pathname;
    if (path === "/knowledge") setActiveTab("knowledge");
    else if (path === "/collect") setActiveTab("collect");
    else if (path === "/analytics") setActiveTab("analytics");
    else if (path === "/settings") setActiveTab("settings");
    else if (path === "/app") setActiveTab("knowledge");
  }, [location.pathname]);

  const renderContent = () => {
    switch (activeTab) {
      case "collect":
        return <ContentCollection />;
      case "knowledge":
        return <KnowledgeBase />;
      case "analytics":
        return <Analytics />;
      case "settings":
        return <UserSettings />;
      default:
        return <KnowledgeBase />;
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6">
      <div 
        className="rounded-lg p-6 shadow-md"
        style={{ 
          backgroundColor: theme.colors.surface,
          boxShadow: `0 4px 6px -1px ${theme.colors.shadow}, 0 2px 4px -1px ${theme.colors.shadow}`
        }}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
