import React from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import MainContent from '../components/MainContent';
import Footer from '../components/Footer';
import Carousel from '../components/Carousel';

const Index = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <Carousel />
      <Navigation />
      <MainContent />
      <Footer />
    </div>
  );
};

export default Index;
