import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const LuxuryDealsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [flashSales, setFlashSales] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    fetch("https://api.amigofabric.com/api/flash-sales")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200 && data.data.length > 0) {
          setFlashSales(data.data);
          const activeSale = data.data.find((sale) => sale.status === "active");
          if (activeSale) {
            const endDate = new Date(activeSale.end_date).getTime();
            updateTimer(endDate);
          }
        }
      })
      .catch((error) => console.error("Error fetching flash sales:", error));
  }, []);

  const updateTimer = (endDate) => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  };

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`${product.product_name} added to cart!`, {
      duration: 2000,
      style: {
        background: "rgba(0, 0, 0, 0.8)",
        color: "#fff",
        borderRadius: "1rem",
      },
      icon: "🛍️",
    });
    window.dataLayer.push({
      event: "add_to_cart",
      ecommerce: {
        currency: "BDT",
        value: product?.offer_price,
        items: [
          {
            item_name: product?.product_name,
            item_id: product?.id,
            price: product?.offer_price,
            quantity: 1,
          },
        ],
      },
    });
  };

  const handleBuyNow = (product) => {
    navigate(`/productDetails/${product.id}`, { state: { product } });
  };

  const products = flashSales.length > 0 ? flashSales[0].products : [];

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % products.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 bg-white">
      <Toaster position="top-right" />

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Timer Section */}
        <motion.div
          className="flex flex-col items-center space-y-8 lg:w-3/5 text-center bg-white p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-black">
            Luxury Deals Of The Month
          </h3>
          <p className="text-black text-base md:text-lg">
            Limited-time offers on our latest luxury fashion collection. Don't
            miss out on these exclusive deals!
          </p>
          <div className="flex space-x-6">
            {["Days", "Hr", "Mins", "Sec"].map((label, index) => (
              <div
                key={index}
                className="flex flex-col items-center bg-sky-300 p-3 md:p-4 rounded-lg shadow-md hover:bg-sky-600 transition duration-300"
              >
                <span className="text-2xl md:text-3xl font-bold text-black">
                  {String(Object.values(timeLeft)[index]).padStart(2, "0")}
                </span>
                <span className="text-sm md:text-base text-black">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Slider Section */}

        <motion.div
          className="relative w-full lg:w-2/5"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="overflow-hidden relative rounded-lg shadow-xl">
            <div className="relative w-full h-[300px] md:h-[600px] flex">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  className={`absolute w-full h-full transition-all ${
                    index === currentSlide
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-90"
                  }`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{
                    opacity: index === currentSlide ? 1 : 0,
                    scale: index === currentSlide ? 1 : 0.9,
                  }}
                  transition={{ duration: 0.8 }}
                >
                  <img
                    src={`https://api.amigofabric.com/uploads/products/${product.photos[0].file_name}`}
                    alt={product.product_name}
                    className="w-full h-96 md:h-full object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 md:p-6">
                    <div className="text-white">
                      <span className="inline-block px-3 py-1 bg-sky-500 text-xs font-semibold rounded-full">
                        FLASH SALE
                      </span>
                      <h3 className="text-lg md:text-2xl font-bold mt-2">
                        {product.product_name}
                      </h3>
                      <p className="text-gray-300 text-xs md:text-base line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xl md:text-3xl font-bold text-sky-400">
                          {Math.round(
                            (1 -
                              Number(product.offer_price) /
                                Number(product.regular_price)) *
                              100
                          )}
                          % OFF
                        </span>
                        <div>
                          <span className="block text-gray-400 line-through">
                            ৳{product.regular_price}
                          </span>
                          <span className="text-lg md:text-xl font-bold">
                            ৳{product.offer_price}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 mt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            addToCart(product);
                            window.location.reload();
                          }}
                          className="flex items-center space-x-2 bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded-lg text-xs md:text-base"
                        >
                          <ShoppingCart size={18} />
                          <span>Add to Cart</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleBuyNow(product)}
                          className="flex items-center space-x-2 bg-white text-black hover:bg-gray-100 px-4 py-2 rounded-lg text-xs md:text-base"
                        >
                          <Eye size={18} />
                          <span>Buy Now</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>

                  {/* Wishlist Button */}
                  <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full shadow hover:bg-white">
                    <Heart className="w-5 h-5 text-gray-800" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/90 rounded-full shadow-lg hover:bg-white"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 bg-white/90 rounded-full shadow-lg hover:bg-white"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>

          {/* Dots Navigation */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 md:w-3 h-2 md:h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index
                    ? "bg-sky-500 w-4 md:w-6"
                    : "bg-gray-400 hover:bg-sky-400"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryDealsSlider;
