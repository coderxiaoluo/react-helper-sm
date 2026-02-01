import { HomeIcon, Users, BarChart3, FileText, Shield, Target, Calculator, MessageSquare, Filter, BookOpen, Zap } from "lucide-react";
import Index from "./pages/Index.jsx";
import MemberMatchGuide from "./pages/MemberMatchGuide.jsx";
import Members from "./pages/Members.jsx";
import League from "./pages/League.jsx";
import WeChatChain from "./pages/WeChatChain.jsx";
import Flag from "./pages/Flag.jsx";
import Defense from "./pages/Defense.jsx";
import Panel from "./pages/Panel.jsx";
import Skills from "./pages/Skills.jsx";
import NeigongCalculator from "./pages/NeigongCalculator.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "帮战微信接龙筛选",
    to: "/wechat-chain",
    icon: <Filter className="h-4 w-4" />,
    page: <WeChatChain />,
  },
  {
    title: "联赛数据分析",
    to: "/league",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <League />,
  },
  {
    title: "成员匹配指南",
    to: "/member-match-guide",
    icon: <BookOpen className="h-4 w-4" />,
    page: <MemberMatchGuide />,
  },
  {
    title: "微信帮会成员筛选",
    to: "/members",
    icon: <FileText className="h-4 w-4" />,
    page: <Members />,
  },
  {
    title: "插旗/首席内功收益计算",
    to: "/flag",
    icon: <Target className="h-4 w-4" />,
    page: <Flag />,
  },
  {
    title: "PVP防守团内功收益计算",
    to: "/defense",
    icon: <Shield className="h-4 w-4" />,
    page: <Defense />,
  },
  {
    title: "PVP面板收益计算",
    to: "/panel",
    icon: <Calculator className="h-4 w-4" />,
    page: <Panel />,
  },
  {
    title: "通用内功选择对比计算",
    to: "/skills",
    icon: <Calculator className="h-4 w-4" />,
    page: <Skills />,
  },
  {
    title: "内功收益计算器",
    to: "/neigong-calculator",
    icon: <Zap className="h-4 w-4" />,
    page: <NeigongCalculator />,
  },
];
