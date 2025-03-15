import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Sample category images - replace with your actual URLs
  const categoryImages = [
    " https://i.ibb.co.com/1Jr2XV6X/Ctt1.jpg",
    "https://i.ibb.co.com/1Ym1kR0X/ramadan.jpg",
    "https://i.ibb.co.com/qLnSfDyy/ct3.jpg",
    "https://i.ibb.co.com/7NjF49zY/ct4.jpg"
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.amigofabric.com/api/categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchData();
  }, []);

  const handleCategoryClick = (categoryName) => {
    const urlFriendlyName = categoryName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
    navigate(`/category/${urlFriendlyName}`);
  };

  return (
    <div className="w-full py-8 md:py-12 px-4 bg-white">
      <motion.h1
        className="text-3xl md:text-5xl font-bold p-4 mb-2 text-center text-gray-900 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Browse by Categories
      </motion.h1>

      <div className="max-w-7xl mx-auto">
        <div className={`grid ${isMobile ? "grid-cols-2 gap-6" : "grid-cols-4 gap-8"}`}>
          {categories.map((category, index) => (
            <motion.div
              key={`${category.category_name}-${index}`}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              onClick={() => handleCategoryClick(category.category_name)}
            >
              <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
                <img
                  src={categoryImages[index]}
                  alt={category.category_name}
                  className="w-full h-84 object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300" />

                <motion.div
                  className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ y: 20 }}
                  whileHover={{ y: 0 }}
                >
                  <Eye className="w-12 h-12 text-white mb-2" />
                  <span className="text-white  text-lg font-bold tracking-wider uppercase">
                    View {category.category_name}
                  </span>
                </motion.div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center">
                  <motion.h3
                    className="text-xl font-semibold text-gray-900"
                    whileHover={{ x: 5 }}
                  >
                    {category.category_name}
                  </motion.h3>
                  <ChevronRight
                    className="text-gray-600 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-2 transition-all duration-300"
                    size={24}
                  />
                </div>

                <motion.div
                  className="w-full h-0.5 bg-sky-500 mt-4 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySlider;