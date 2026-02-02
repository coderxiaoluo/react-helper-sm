import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import CustomCarousel from '../components/CustomCarousel';

const Index = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <CustomCarousel />
      <Navigation />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Index;
