import React, { useState, useEffect, useRef } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
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
        <HashRouter>
          <Layout>
            <Routes>
              {navItems.map(({ to, page }) => (
                <Route key={to} path={to} element={page} />
              ))}
            </Routes>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
