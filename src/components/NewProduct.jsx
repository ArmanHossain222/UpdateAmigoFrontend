import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Eye, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductSlider = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.amigofabric.com/api/all-products"
        );
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        toast.error("Failed to load products");
      }
    };

    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);
    fetchProducts();
  }, []);

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
      style: {
        border: "1px solid #4299E1",
        padding: "16px",
        background: "#EBF8FF",
        color: "#2C5282",
      },
      icon: "🛒",
      duration: 2000,
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

  return (
    <div className="bg-white py-12 px-4 mt-2 mb-2 relative">
      <Toaster position="top-right" />

      <div className="container mx-auto max-w-7xl mt-2">
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
          𝐄𝐈𝐃 𝐂𝐎𝐋𝐋𝐄𝐂𝐓𝐈𝐎𝐍-𝟐0𝟐𝟓
        </h2>

        <div
          className="relative"
          onMouseEnter={() => {
            const swiper = document.querySelector(".mySwiper").swiper;
            swiper.autoplay.stop();
          }}
          onMouseLeave={() => {
            const swiper = document.querySelector(".mySwiper").swiper;
            swiper.autoplay.start();
          }}
        >
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={4}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="mySwiper pb-8"
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 mx-2"
                >
                  <div className="relative">
                    <Link to={`/productDetails/${product.id}`}>
                      <img
                        src={`https://api.amigofabric.com/uploads/products/${product.photos[0].file_name}`}
                        alt={product.product_name}
                        className="w-full h-86 md:h-100 object-cover rounded-2xl"
                      />
                    </Link>

                    {product.offer_price > 0 &&
                      product.offer_price < product.regular_price && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, duration: 0.5 }}
                          className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {(
                            ((product.regular_price - product.offer_price) /
                              product.regular_price) *
                            100
                          ).toFixed(0)}
                          % OFF
                        </motion.div>
                      )}
                  </div>

                  <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.product_name}
                    </h2>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {product.offer_price > 0 ? (
                          <>
                            <span className="text-xl font-bold text-gray-900">
                              ৳{product.offer_price}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              ৳{product.regular_price}
                            </span>
                          </>
                        ) : (
                          <span className="text-xl font-bold text-gray-900">
                            ৳{product.regular_price}
                          </span>
                        )}
                      </div>
                      <span className="text-green-500 text-xs md:text-sm font-medium">
                        In Stock
                      </span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-2 mt-2 ">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          addToCart(product);
                          window.location.reload();
                        }}
                        className="flex-1 bg-blue-500 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        <span>Add Cart</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          navigate(`/productDetails/${product.id}`)
                        }
                        className="flex-1 bg-gray-800 text-white px-2 py-1 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Buy Now</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows Below the Slider */}
          <div className="flex justify-center gap-4 mt-6">
            <button className="swiper-button-prev bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors z-10">
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            <button className="swiper-button-next bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors">
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSlider;
