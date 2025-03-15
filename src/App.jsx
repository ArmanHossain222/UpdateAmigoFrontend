import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Phone, X } from "lucide-react";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductGrid from "./components/Card";
import CustomerSlider from "./components/Customer";
import FlashSale from "./components/FlashSale";

import { Toaster } from "react-hot-toast";
import CategorySection from "./components/Category";
import FeatureSection from "./components/Feature";
import NewProductCard from "./components/NewProduct";
import ProductDetails from "./components/ProductDetails";

import SaleBanner from "./components/Banner";
import About from "./pages/About";
import CartPage from "./pages/Cart";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/Privacy";
import TermsAndConditions from "./pages/Terms";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

import { ToastContainer } from "react-toastify";
import Products from "./components/AllProducts";
import ProductSlider from "./components/NewProduct";
import BillingDetails2 from "./pages/Billing";
import BillingDetails from "./pages/Billings";
import SubCategoryPage from "./pages/Subcategory";
import OrderPage from "./pages/order";
import OrderCart from "./pages/orders";

const ContactButton = ({ icon: Icon, label, onClick, color }) => (
  <motion.div
    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer bg-gradient-to-r from-${color}-50 to-${color}-100 hover:from-${color}-100 hover:to-${color}-200 border border-${color}-200`}
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
  >
    <Icon className={`text-${color}-600`} size={20} />
    <span className="font-medium text-gray-700">{label}</span>
  </motion.div>
);

const ContactSection = ({ phoneNumber, whatsappNumber }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [showBubble, setShowBubble] = React.useState(true);

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = () => {
    window.location.href = `https://wa.me/${whatsappNumber}`;
  };
  // const handleWhatsAppClick = () => {
  //   window.location.href = `https://www.facebook.com/amigofabrics`;
  // };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="fixed right-6 bottom-24 z-50"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {showBubble && !isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="absolute right-16 bottom-2 bg-white px-4 py-2 rounded-2xl shadow-lg border border-gray-100 w-48"
          >
            <div className="relative">
              <p className="text-sm text-gray-700 font-medium">
                Need help? Let's chat! 👋
              </p>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-3 h-3 bg-white border-t border-r border-gray-100 transform rotate-45"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="bg-gradient-to-tr from-blue-600 to-blue-400 p-4 rounded-full shadow-lg cursor-pointer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsExpanded(!isExpanded);
          setShowBubble(false);
        }}
      >
        <motion.div
          animate={{ rotate: isExpanded ? 360 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <MessageSquare className="text-white" size={24} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute right-0 bottom-16 bg-white rounded-2xl shadow-2xl p-6 w-80 border border-gray-100"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Chat with us
                </h3>
                <p className="text-sm text-gray-500">
                  We usually respond in minutes
                </p>
              </div>
              <motion.button
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
                onClick={() => setIsExpanded(false)}
              >
                <X size={20} />
              </motion.button>
            </div>
            <div className="space-y-3">
              <ContactButton
                icon={Phone}
                label={phoneNumber}
                onClick={handlePhoneClick}
                color="blue"
              />
              {/* <ContactButton 
                icon={MessageChannel}
                label={MessageSquare}
                onClick={handlePhoneClick}
                color="blue"
              /> */}
              <ContactButton
                icon={MessageSquare}
                label="Chat on WhatsApp"
                onClick={handleWhatsAppClick}
                color="green"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Home = () => {
  useEffect(() => {
    // Clear the carts data from localStorage when component mounts
    localStorage.removeItem("carts");
  }, []);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <SaleBanner></SaleBanner>
      <CategorySection />
      <NewProductCard />

      <FlashSale />
      <ProductGrid />
      <CustomerSlider />
      <FeatureSection />
    </>
  );
};

function App() {
  const phoneNumber = "+8801734734246";
  const whatsappNumber = "+8801734734246";
  window.dataLayer = window.dataLayer || [];
  console.log("windows", window);

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <ContactSection
        phoneNumber={phoneNumber}
        whatsappNumber={whatsappNumber}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/billing" element={<BillingDetails />} />
        <Route path="/billings" element={<BillingDetails2></BillingDetails2>} />
        <Route path="/new-arrivals" element={<ProductSlider />} />
        <Route path="/about" element={<About />} />
        <Route path="/cart" element={<CartPage></CartPage>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category/:category_name" element={<SubCategoryPage />} />

        <Route path="/order" element={<OrderPage />} />
        <Route path="/orders" element={<OrderCart />} />

        <Route
          path="/terms&condition"
          element={<TermsAndConditions></TermsAndConditions>}
        />
        <Route
          path="/privacy&policy"
          element={<PrivacyPolicy></PrivacyPolicy>}
        />
        <Route
          path="/productDetails/:product_id"
          element={<ProductDetails />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
