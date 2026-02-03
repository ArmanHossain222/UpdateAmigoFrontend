import axios from "axios";
import { motion } from "framer-motion";
import {
  Heart,
  BadgeIcon as IdCard,
  Info,
  Minus,
  Plus,
  RefreshCw,
  Ruler,
  Share2,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import { useNavigate, useParams } from "react-router-dom";
import useViewProductPixels from "../hooks/useViewProductPixels";

const sizeMap = {
  XS: "36",
  S: "38",
  M: "40",
  L: "42",
  XL: "44",
  XXL: "46",
  XXXL: "48",
};

const ProductDetails = () => {
  const { product_id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(
          `https://api.amigofabric.com/api/product/${product_id}`
        );
        if (data.status === 200) {
          setProduct(data.product);
          if (data.product.photos?.length) {
            setSelectedImage(
              `https://api.amigofabric.com/uploads/products/${data.product.photos[0].file_name}`
            );
          }
        }
      } catch (error) {
        showToast("Failed to load product details", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [product_id]);

  const showToast = (message, type = "success") => {
    toast[type](message, {
      position: "top-center",
      className: "font-bangla",
      style: {
        background: type === "error" ? "#ef4444" : "#4CAF50",
        color: "#fff",
        borderRadius: "12px",
        padding: "16px",
      },
    });
  };

  const handleCartAction = (actionType) => {
    if (!selectedSize) {
      showToast("Please select a size", "error");
      return;
    }

    const cartItem = {
      ...product,
      quantity,
      size: selectedSize,
      totalPrice: product.offer_price * quantity,
      selectedImage,
      addedAt: new Date().toISOString(),
    };

    if (actionType === "addToCart") {
      const existingItems = JSON.parse(localStorage.getItem("cart") || "[]");
      const existingIndex = existingItems.findIndex(
        (item) => item.id === product.id && item.size === selectedSize
      );
      if (existingIndex > -1) {
        existingItems[existingIndex].quantity += quantity;
      } else {
        existingItems.push(cartItem);
      }
      localStorage.setItem("cart", JSON.stringify(existingItems));
      showToast("Item added to cart");
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
    } else if (actionType === "orderNow") {
      const existingCarts = JSON.parse(localStorage.getItem("carts") || "[]");

      // Add new cart item to array
      existingCarts.push(cartItem);

      // Save updated array back to localStorage
      localStorage.setItem("carts", JSON.stringify(existingCarts));

      showToast("Order prepared successfully");
      window.location.href = "/checkout";
    }
  };

  const productInfoForPixel = {
    productName: product?.product_name,
    productId: product?.id,
    productPrice: product?.offer_price,
    productBrand: "",
    productCategory: product?.category_id,
  };

  // Use the custom hook with the product data
  useViewProductPixels(productInfoForPixel);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );

  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-2xl font-bangla text-gray-600">
          Product not found
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      <Toaster />
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {showSizeGuide && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full mx-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Ruler className="text-blue-600" />
                  <span className="font-bangla">Size Guide</span>
                </h3>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(sizeMap).map(([size, measurement]) => (
                  <div key={size} className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-blue-600">{size}</span>
                      <span className="text-gray-600">{measurement}"</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery Section */}
            <div className="space-y-6">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200">
                <InnerImageZoom
                  src={selectedImage}
                  zoomSrc={selectedImage}
                  className="w-full h-full object-contain"
                  zoomScale={1.8}
                />
              </div>

              <div className="flex gap-4 pb-4 overflow-x-auto">
                {product.photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 ${
                      selectedImage.includes(photo.file_name)
                        ? "border-blue-600"
                        : "border-gray-200"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() =>
                      setSelectedImage(
                        `https://api.amigofabric.com/uploads/products/${photo.file_name}`
                      )
                    }
                  >
                    <img
                      src={`https://api.amigofabric.com/uploads/products/${photo.file_name}`}
                      className="w-full h-full object-cover"
                      alt={`Preview ${index + 1}`}
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Product Details Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock === "yes"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {product.stock === "yes" ? "In Stock" : "Out of Stock"}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {product.category_id}
                  </span>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 font-bangla">
                  {product.product_name}
                </h1>

                <div className="flex items-baseline gap-4">
                  <span className="text-3xl font-bold text-blue-600">
                    ৳{product.offer_price}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ৳{product.regular_price}
                  </span>
                  <span className="text-lg font-medium text-green-600">
                    {Math.round(
                      ((product.regular_price - product.offer_price) /
                        product.regular_price) *
                        100
                    )}
                    % Off
                  </span>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-100">
                {[
                  {
                    icon: <Truck className="w-6 h-6" />,
                    title: "Free Shipping",
                  },
                  {
                    icon: <RefreshCw className="w-6 h-6" />,
                    title: "7 Days Return",
                  },
                  {
                    icon: <Shield className="w-6 h-6" />,
                    title: "Original Guarantee",
                  },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-4 rounded-xl bg-gray-50 hover:bg-blue-50 transition-colors"
                    whileHover={{ y: -5 }}
                  >
                    <div className="w-12 h-12 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center mb-3">
                      {feature.icon}
                    </div>
                    <h4 className="font-medium font-bangla mb-1">
                      {feature.title}
                    </h4>
                  </motion.div>
                ))}
              </div>

              {/* Size Selection */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900 font-bangla">
                    Select Size
                  </h3>
                  <button
                    onClick={() => setShowSizeGuide(true)}
                    className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
                  >
                    <Info size={16} />
                    <span className="text-sm font-bangla">Size Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant) => (
                    <motion.button
                      key={variant}
                      className={`px-5 py-3 rounded-xl border-2 font-medium flex items-center gap-2 ${
                        selectedSize === variant
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-200 text-gray-600 hover:border-blue-200"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setSelectedSize(variant)}
                    >
                      <span className="font-bangla">
                        {variant.toUpperCase()}
                      </span>
                      <span className="text-sm">
                        ({sizeMap[variant] || "N/A"})
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-700 font-medium font-bangla">
                  Quantity:
                </span>
                <div className="flex items-center gap-3">
                  <motion.button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-blue-400"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="w-4 h-4" />
                  </motion.button>
                  <span className="w-12 text-center text-xl font-bold">
                    {quantity}
                  </span>
                  <motion.button
                    className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-blue-400"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.button
                  className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700"
                  whileHover={{ y: -2 }}
                  onClick={() => handleCartAction("orderNow")}
                >
                  <IdCard className="w-5 h-5" />
                  <span className="font-bangla">Order Now</span>
                </motion.button>

                <motion.button
                  className="w-full py-4 border-2 border-blue-600 text-blue-600 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-50"
                  whileHover={{ y: -2 }}
                  onClick={() => handleCartAction("addToCart")}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-bangla">Add to Cart</span>
                </motion.button>
              </div>

              {/* Additional Actions */}
              <div className="flex justify-center gap-6 pt-4">
                <button className="flex items-center gap-2 text-gray-600 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                  <span className="font-bangla">Wishlist</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-green-600">
                  <Share2 className="w-5 h-5" />
                  <span className="font-bangla">Share</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;
