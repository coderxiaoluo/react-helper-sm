import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Index;
