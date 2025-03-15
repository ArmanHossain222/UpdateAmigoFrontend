import React from 'react';
import {
  Scroll,
  ShoppingBag,
  Truck,
  RefreshCcw,
  Shield,
  CreditCard,
  AlertTriangle,
  Scale,
  User,
  MessageSquare,
  Mail,
  FileText,
  Store
} from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms and Conditions</h1>
          <p className="text-lg text-gray-600">Last updated: February 6, 2025</p>
        </div>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Scroll className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Introduction</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Welcome to [Your Brand Name]. By accessing and using our website, you accept and agree to be bound by these Terms and Conditions. Please read them carefully before using our services. These terms apply to all visitors, users, and customers of our e-commerce platform.
          </p>
        </div>

        {/* Account Registration */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <User className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Account Registration</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">To use our services, you must:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Be at least 18 years of age</li>
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Promptly update any changes to your account information</li>
              <li>Accept responsibility for all activities under your account</li>
            </ul>
          </div>
        </div>

        {/* Products and Services */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <ShoppingBag className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Products and Services</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">Our product terms include:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>All product descriptions and images are for illustrative purposes only</li>
              <li>Colors may vary slightly from the images shown</li>
              <li>We reserve the right to modify or discontinue products without notice</li>
              <li>Prices are subject to change without prior notice</li>
              <li>Stock availability is not guaranteed until order confirmation</li>
            </ul>
          </div>
        </div>

        {/* Shipping and Delivery */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Truck className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Shipping and Delivery</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">Our delivery terms:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Delivery times are estimates and not guaranteed</li>
              <li>Shipping fees vary based on location and order size</li>
              <li>Orders are processed within 24-48 hours of confirmation</li>
              <li>Delivery is available throughout Bangladesh</li>
              <li>Additional charges may apply for remote areas</li>
            </ul>
          </div>
        </div>

        {/* Returns and Refunds */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <RefreshCcw className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Returns and Refunds</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">Our return policy includes:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>7-day return policy from the date of delivery</li>
              <li>Items must be unworn and in original condition with tags</li>
              <li>Refunds are processed within 7-14 business days</li>
              <li>Shipping costs for returns are borne by the customer</li>
              <li>Some items are non-returnable for hygiene reasons</li>
            </ul>
          </div>
        </div>

        {/* Payment Terms */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <CreditCard className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Payment Terms</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-700">We accept the following payment methods:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Cash on Delivery (COD)</li>
              <li>Credit/Debit Cards</li>
              <li>Mobile Banking (bKash, Nagad, Rocket)</li>
              <li>Bank Transfers</li>
              <li>Digital Wallets</li>
            </ul>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Shield className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Intellectual Property</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, images, and software, is the property of [Your Brand Name] and is protected by Bangladesh and international copyright laws. Any unauthorized use of these materials is strictly prohibited.
          </p>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <AlertTriangle className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Limitation of Liability</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            [Your Brand Name] shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services. This includes, but is not limited to, loss of profits, data, or other intangible losses.
          </p>
        </div>

        {/* Governing Law */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Scale className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Governing Law</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            These terms and conditions are governed by and construed in accordance with the laws of Bangladesh. Any disputes shall be subject to the exclusive jurisdiction of the courts in Bangladesh.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <MessageSquare className="h-8 w-8 text-emerald-600 mr-3" />
            <h2 className="text-2xl font-semibold text-gray-900">Contact Us</h2>
          </div>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about these Terms and Conditions, please contact us:
          </p>
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-gray-700">
              <Mail className="h-5 w-5 text-emerald-600" />
              <span>support@yourbrand.com</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-700">
              <Store className="h-5 w-5 text-emerald-600" />
              <span>[Your Physical Address], Bangladesh</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;