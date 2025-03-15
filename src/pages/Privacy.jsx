import React from 'react';
import { 
  Shield, 
  Lock, 
  Cookie, 
  Mail, 
  Share2, 
  UserCheck, 
  CreditCard,
  AlertCircle,
  RefreshCw,
  MessageSquare 
} from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">Last updated: February 6, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Welcome to [Your Brand Name]. We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our e-commerce platform.
          </p>
        </div>

        {/* Information Collection */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <UserCheck className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Information We Collect</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Name and contact information</li>
              <li>Delivery address and billing details</li>
              <li>Account login credentials</li>
              <li>Purchase history and preferences</li>
              <li>Communication with our customer service</li>
            </ul>
          </div>
        </div>

        {/* Data Usage */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Share2 className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">How We Use Your Data</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">We use your information for:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Processing and delivering your orders</li>
              <li>Personalizing your shopping experience</li>
              <li>Communicating about promotions and updates</li>
              <li>Improving our services and products</li>
              <li>Preventing fraud and maintaining security</li>
            </ul>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Lock className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Data Security</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All payment transactions are encrypted using SSL technology.
          </p>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Cookie className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Cookies Policy</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar tracking technologies to improve your browsing experience, analyze site traffic, and understand where our audience is coming from. You can control cookies through your browser settings.
          </p>
        </div>

        {/* Payment Security */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <CreditCard className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Payment Security</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            All payment information is encrypted and processed securely through our authorized payment partners. We do not store your complete credit card information on our servers.
          </p>
        </div>

        {/* Updates to Policy */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <RefreshCw className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Updates to Privacy Policy</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-8 w-8 text-indigo-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this Privacy Policy, please contact us at:
          </p>
          <div className="flex items-center space-x-2 text-gray-700">
            <Mail className="h-5 w-5 text-indigo-600" />
            <span>privacy@yourbrand.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;