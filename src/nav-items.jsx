import { HomeIcon, Users, BarChart3, FileText, Shield, Target, Calculator, MessageSquare, Filter, BookOpen, Zap, Building2 } from "lucide-react";
import { lazy } from "react";

// 代码分割，按需加载页面组件
const Index = lazy(() => import("./pages/Index.jsx"));
const MemberMatchGuide = lazy(() => import("./pages/MemberMatchGuide.jsx"));
const Members = lazy(() => import("./pages/Members.jsx"));
const League = lazy(() => import("./pages/League.jsx"));
const WeChatChain = lazy(() => import("./pages/WeChatChain.jsx"));
const Flag = lazy(() => import("./pages/Flag.jsx"));
const Defense = lazy(() => import("./pages/Defense.jsx"));
const Panel = lazy(() => import("./pages/Panel.jsx"));
const Skills = lazy(() => import("./pages/Skills.jsx"));
const NeigongCalculator = lazy(() => import("./pages/NeigongCalculator.jsx"));
const Guilds = lazy(() => import("./pages/Guilds.jsx"));

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
    title: "帮会展示",
    to: "/guilds",
    icon: <Building2 className="h-4 w-4" />,
    page: <Guilds />,
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
