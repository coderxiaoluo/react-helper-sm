import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { navItems } from "./nav-items";
import SplashScreen from './components/SplashScreen';
import { addPageTransition } from './utils/smoothScroll';

const queryClient = new QueryClient();

// 布局组件，处理页面过渡效果
const Layout = ({ children }) => {
  const location = useLocation();
  const contentRef = useRef(null);

  useEffect(() => {
    // 路由变化时应用页面过渡效果
    if (contentRef.current) {
      addPageTransition(contentRef.current);
    }
  }, [location]);

  return (
    <div ref={contentRef} className="min-h-screen">
      {children}
    </div>
  );
};

const App = () => {
  const [isSplashComplete, setIsSplashComplete] = useState(false);

  const handleSplashComplete = () => {
    setIsSplashComplete(true);
  };

  if (!isSplashComplete) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <HashRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Layout>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">加载中...</div>}>
              <Routes>
                {navItems.map(({ to, page }) => (
                  <Route key={to} path={to} element={page} />
                ))}
                {/* 重定向 /home 到根路径 */}
                <Route path="/home" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
