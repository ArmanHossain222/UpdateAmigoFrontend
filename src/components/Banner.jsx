import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselData, setCarouselData] = useState(null);

  useEffect(() => {
    const fetchCarousel = async () => {
      try {
        const response = await fetch("https://api.amigofabric.com/api/get-carousel");
        const data = await response.json();
        if (data.status === 200 && data.data.status === "active") {
          setCarouselData(data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarousel();
  }, []);

  useEffect(() => {
    if (!carouselData) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.hero_images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [carouselData]);

  if (isLoading) return <div className="flex justify-center items-center min-h-[500px]">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-[500px] text-red-500">Error: {error}</div>;
  if (!carouselData) return null;

  const goToPrevious = () => {
    setCurrentSlide((prev) => 
      (prev - 1 + carouselData.hero_images.length) % carouselData.hero_images.length
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => 
      (prev + 1) % carouselData.hero_images.length
    );
  };

  return (
    <div className="relative mt-14 w-full">
      <div className="relative overflow-hidden">
        {carouselData.hero_images.map((slide, index) => (
          <div
            key={slide.id}
            className={`${
              index === currentSlide ? 'block' : 'hidden'
            }`}
          >
            {/* Image Container */}
            <div className="relative w-full">
              <img
                src={`https://api.amigofabric.com/${slide.base_path}${slide.file_name}`}
                alt={slide.slide_title}
                className="w-full object-cover"
                style={{
                  height: 'calc(100vh - 150px)',
                  minHeight: '300px',
                  maxHeight: '700px'
                }}
                loading="lazy"
              />
              
              {/* Content Overlay */}
              <div className="absolute inset-0  bg-opacity-30 flex items-center justify-center p-4">
                <div className="text-center text-white max-w-2xl">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">
                    {slide.slide_title}
                  </h2>
                  <h3 className="text-xl md:text-2xl mb-2 md:mb-4">
                    {slide.slide_sub_title}
                  </h3>
                  
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 md:p-2 rounded-full hover:bg-white transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 md:p-2 rounded-full hover:bg-white transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="h-4 w-4 md:h-6 md:w-6 text-gray-800" />
        </button>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {carouselData.hero_images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;