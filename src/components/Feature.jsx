import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  CreditCard, 
  Shield, 
  Clock, 
  ArrowRight 
} from 'lucide-react';

const FeatureSection = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Complimentary shipping on orders ',
      gradient: 'from-blue-100 via-blue-200 to-blue-300',
      iconBg: 'bg-blue-500',
      textColor: 'text-blue-800'
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: ' 100% secure transactions',
      gradient: 'from-green-100 via-green-200 to-green-300',
      iconBg: 'bg-green-500',
      textColor: 'text-green-800'
    },
    {
      icon: Shield,
      title: 'Exchange Policy',
      description: 'Within  30-day return policy',
      gradient: 'from-purple-100 via-purple-200 to-purple-300',
      iconBg: 'bg-purple-500',
      textColor: 'text-purple-800'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance',
      gradient: 'from-orange-100 via-orange-200 to-orange-300',
      iconBg: 'bg-orange-500',
      textColor: 'text-orange-800'
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: 50 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100 
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-2xl opacity-50 group-hover:opacity-75 transition duration-300 blur-sm group-hover:blur-none"></div>
              
              <div className={`relative p-6 bg-white rounded-2xl shadow-2xl overflow-hidden border border-transparent group-hover:border-gray-200 transition duration-300 transform group-hover:-translate-y-2`}>
                <div className="flex items-center mb-4">
                  <div className={`p-4 ${feature.gradient} rounded-full mr-4 shadow-md transform transition-all duration-300 group-hover:rotate-12`}>
                    <feature.icon className={`w-8 h-8 ${feature.iconBg} text-white rounded-full p-1`} />
                  </div>
                  <div>
                    <h4 className={`text-xl font-bold ${feature.textColor} transition-colors`}>
                      {feature.title}
                    </h4>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">
                  {feature.description}
                </p>
                
               
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;