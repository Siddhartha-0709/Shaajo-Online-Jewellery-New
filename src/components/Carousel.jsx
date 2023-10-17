import React, { useState, useEffect } from 'react';
import image1 from '../assets/carousel_images/2.png';


const Carousel = () => {
  // const images = [image1, image2, image3, image4];
  const images = [image1];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      // Increment the currentIndex to switch to the next image
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    // Clear the interval when the component unmounts
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div id="indicators-carousel" className="relative w-full" data-carousel="static">
      <div className="relative h-44 overflow-hidden rounded-lg md:h-96">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transform transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            data-carousel-item="active"
          >
            <img
              src={image}
              className="absolute w-full h-full object-contain object-center"
              alt={`Image ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
            aria-current={index === currentIndex ? 'true' : 'false'}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
          ></button>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-prev
      >
        {/* Previous button content */}
      </button>
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        data-carousel-next
      >
        {/* Next button content */}
      </button>
    </div>
  );
};

export default Carousel;
