import React from 'react';

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <div className={`${color} border-2 rounded-lg p-6 hover:shadow-lg transition-all duration-500 group transform hover:-translate-y-2 hover:shadow-xl`}>
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
