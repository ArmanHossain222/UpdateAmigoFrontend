import { motion } from "framer-motion";
import { Eye, Heart, ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const CategoryProducts = () => {
  const { category_name } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [categoriesRes, productsRes] = await Promise.all([
          fetch("https://api.amigofabric.com/api/categories"),
          fetch(
            `https://api.amigofabric.com/api/products-by-category/${category_name}`
          ),
        ]);

        const categoriesData = await categoriesRes.json();
        const productsData = await productsRes.json();

        if (categoriesData.status === 200) {
          setCategories(categoriesData.data);
        }

        if (productsData.status === 200) {
          setProducts(productsData.products);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category_name]);

  const currentCategory = categories.find(
    (cat) => cat.category_name.toLowerCase() === category_name.toLowerCase()
  );

  const handleAddToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = existingCart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = existingCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
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

  const toggleFavorite = (productId) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="w-16 h-16 border-4 border-blue-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-red-500 text-center p-4"
      >
        {error}
      </motion.div>
    );
  }

  return (
    <div className="bg-white py-8 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Title */}
        <div className="text-center mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-900"
          >
            {currentCategory?.category_name || "Products"}
          </motion.h1>
          <p className="mt-2 text-gray-600">Discover our amazing collection</p>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6"
        >
          {products &&
            products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative ">
                  <Link to={`/productDetails/${product.id}`}>
                    <img
                      src={`https://api.amigofabric.com/uploads/products/${product.photos[0].file_name}`}
                      alt={product.product_name}
                      className="w-full h-48 sm:h-64 md:h-96 object-cover"
                    />
                  </Link>
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100"
                  >
                    <Heart
                      className={`w-2.5 h-2.5 md:w-5 md:h-5 ${
                        favorites.includes(product.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                  {product.offer_price > 0 &&
                    product.offer_price < product.regular_price && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 text-sm font-bold rounded-full">
                        {(
                          ((product.regular_price - product.offer_price) /
                            product.regular_price) *
                          100
                        ).toFixed(0)}
                        % OFF
                      </div>
                    )}
                </div>

                <div className="p-4">
                  <h2 className="text-md md:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {product.product_name}
                  </h2>
                  <div className="flex items-start flex-col md:flex-row justify-between mb-4">
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
                    <span className="text-green-500 text-sm font-medium">
                      In Stock
                    </span>
                  </div>

                  <div className="flex gap-2 flex-col md:flex-row">
                    <button
                      onClick={() => navigate(`/productDetails/${product.id}`)}
                      className="flex-1 bg-blue-600 text-sm md:text-md text-white px-2 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Buy Now</span>
                    </button>
                    <button
                      onClick={() => {
                        handleAddToCart(product);
                        window.location.reload(); // Explicit page reload
                      }}
                      className="flex-1 bg-gray-800 text-white text-sm md:text-md px-2 py-2 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>

        {(!products || products.length === 0) && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No products found in this category.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
