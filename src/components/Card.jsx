import { Eye, Heart, Search, ShoppingCart, Star, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const addToCart = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = existingCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(existingCart));
      toast.success("Updated quantity in cart!", {
        icon: "🛒",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      const newCart = [...existingCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      toast.success("Added to cart!", {
        icon: "🛍️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
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
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const discount =
    ((product.regular_price - product.offer_price) / product.regular_price) *
    100;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      <div className="relative">
        <Link to={`/productDetails/${product.id}`}>
          <img
            src={`https://api.amigofabric.com/uploads/products/${product.photos[0].file_name}`}
            alt={product.product_name}
            className="w-full h-48 sm:h-72 md:h-96 object-cover"
          />
        </Link>
        {discount > 0 && (
          <div className="absolute bottom-4 right-4 bg-red-500 text-white px-3 py-1.5 text-sm font-bold rounded-full">
            {discount.toFixed(0)}% OFF
          </div>
        )}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-colors duration-300 hover:bg-gray-100"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"
            }`}
          />
        </button>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {product.category_id}
          </span>
          <div className="flex items-center">
            {renderStars(5)}
            <span className="text-gray-600 ml-2 text-sm">5.0</span>
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 line-clamp-2">
          {product.product_name}
        </h3>

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {product.offer_price > 0 ? (
              <>
                <span className="text-lg font-bold text-gray-900">
                  ৳{product.offer_price}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ৳{product.regular_price}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                ৳{product.regular_price}
              </span>
            )}
          </div>
          <span className="text-xs md:text-sm text-green-600 font-medium px-1 py-0 bg-green-50 rounded-full">
            In Stock
          </span>
        </div>

        <div className="flex md:flex-row flex-col gap-2 w-full">
          <button
            onClick={() => {
              addToCart(product);
              window.location.reload(); // Explicit page reload
            }}
            className="flex-1 bg-blue-500 text-white px-2 py-1.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-blue-600 transition-colors group text-xs sm:text-sm"
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Add Cart</span>
          </button>

          <Link to={`/productDetails/${product.id}`} className="flex-1">
            <button className="w-full bg-gray-800 text-white px-2 py-1.5 rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-700 transition-colors group text-xs sm:text-sm">
              <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Buy Now</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductGrid = () => {
  const [activeFilters, setActiveFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://api.amigofabric.com/api/all-products"
      );
      const data = await response.json();
      setProducts(data.data.slice(0, 8));
    };
    fetchData();
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  const toggleFilter = (filter) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      (activeFilters.length === 0 ||
        activeFilters.includes(product.category)) &&
      (searchTerm === "" ||
        product.product_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white py-6 sm:py-10 mt-2">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-2 md:mb-4">
          <h2 className="text-2xl md:text-5xl font-bold text-gray-900 mb-2 md:mb-2">
            Our All Collections
          </h2>
        </div>

        <div className="mb-6 sm:mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => toggleFilter(category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilters.includes(category)
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border-2 border-gray-200 py-2.5 pl-10 pr-4 focus:border-blue-500 focus:outline-none bg-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/products">
            <button className="px-6 py-3 bg-[#ff5e14] text-white font-bold rounded-lg shadow-md hover:bg-[#e04c12] transition">
              View Products
            </button>
          </Link>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
              <Search className="w-10 h-10 sm:w-14 sm:h-14 mx-auto" />
            </div>
            <h3 className="text-md sm:text-lg font-semibold text-gray-900 mb-1">
              No Products Found
            </h3>
            <p className="text-gray-600">
              Try adjusting your filters or search term
            </p>
          </div>
        )}

        {filteredProducts.length > 0 &&
          filteredProducts.length < products.length && (
            <div className="text-center mt-6 sm:mt-12">
              <button className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm sm:text-base font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-md hover:shadow-blue-200">
                Load More
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default ProductGrid;
