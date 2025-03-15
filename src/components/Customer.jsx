
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Star } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const testimonials = [
  {
    id: 1,
    name:  "Nazmul Hasan",

    rating: 5,
    content: "দারুণ মানের পাঞ্জাবি, পরতে একদম আরামদায়ক!",
    image:"https://i.ibb.co.com/MkhN5TsG/client3.jpg"
  },
  {
    id: 2,
    name: "Mijanur Rahman",
 
    rating: 5,
    content: "কাপড়ের কোয়ালিটি অসাধারণ, ধোয়ার পরও রঙ ফিকে হয় না!",
    image: "https://i.ibb.co.com/b5PMtQx3/client1.jpg"
  },
  {
    id: 3,
    name: "Shamim Ashraf",
    
    rating: 5,
    content: "প্রাইস অনুযায়ী একদম পারফেক্ট, একাধিকবার কিনেছি!",
    image: "https://i.ibb.co.com/j97bZwBm/client2.jpg"
  }
];

const StarRating = ({ rating }) => (
  <div className="flex gap-1 text-center justify-center mt-2">
    {[...Array(5)].map((_, index) => (
      <Star
        key={index}
        size={18}
        className={`${index < rating ? "text-yellow-400  fill-yellow-400" : "text-gray-300"}`}
      />
    ))}
  </div>
);

const TestimonialCard = ({ item }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 50 }}
    transition={{ duration: 0.5 }}
    className="px-4"
  >
    <div className="bg-white rounded-xl shadow-lg p-8 mx-2 my-6 text-center items-center">
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-gray-200"
      />
      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
   
      <div className="mb-4">
        <StarRating rating={item.rating} />
      </div>
      <p className="text-lg text-gray-700 italic">"{item.content}"</p>
    </div>
  </motion.div>
);

const TestimonialSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    centerMode: true,
    centerPadding: "30px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerPadding: "50px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "20px",
        }
      }
    ]
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-16 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-12 text-gray-900"
      >
        What Our Customers Say
      </motion.h2>
      
      <div className="testimonial-slider">
        <Slider {...settings}>
          {testimonials.map((item) => (
            <TestimonialCard key={item.id} item={item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TestimonialSlider;
