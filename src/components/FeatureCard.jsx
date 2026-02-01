import React from 'react';

const FeatureCard = ({ title, description, icon, color }) => {
  return (
    <div className={`${color} border-2 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer group`}>
      <div className="text-center">
        <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeatureCard;
