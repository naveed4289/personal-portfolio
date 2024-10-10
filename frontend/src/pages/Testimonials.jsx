import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { useRef } from 'react';
import { reviews } from './reviewsData';
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { FaQuoteLeft } from 'react-icons/fa'; // Importing quote icon

const Testimonials = () => {
  const splideRef = useRef(null); // Reference to the Splide slider

  const handlePrev = () => {
    if (splideRef.current) {
      splideRef.current.splide.go('<'); // Go to the previous slide
    }
  };

  const handleNext = () => {
    if (splideRef.current) {
      splideRef.current.splide.go('>'); // Go to the next slide
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto rounded-lg py-16 px-6 mb-28 mt-20 flex flex-col lg:flex-row justify-center lg:justify-between  shadow-lg">
      
      {/* Left Side - Header Section */}
      <div className="lg:w-1/3 text-left mb-8 lg:mb-0">
        <h4 className="text-sm lg:text-lg text-gray-300 mb-1 font-bold">Client Testimonials</h4>
        <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2">50+ Clients</h2>
        <h3 className="text-3xl lg:text-5xl font-bold text-[#9124b5] mb-2">Feedback</h3>
        <p className="text-sm lg:text-base text-gray-400 mb-4 w-full lg:w-3/4">
          We pride ourselves on delivering exceptional service and results for our clients. Our commitment to excellence has earned us a loyal customer base and countless positive reviews.
        </p>

        {/* Arrows for navigation */}
        <div className="flex items-center justify-between w-20 mt-4 lg:flex hidden">
          <button onClick={handlePrev} className="bg-[#9124b5] text-white p-3 rounded-full">
            <GoArrowLeft size={20} />
          </button>
          <button onClick={handleNext} className="bg-[#9124b5] text-white p-3 rounded-full">
            <GoArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Right Side - Testimonials Slider */}
      <div className="lg:w-2/3 relative">
        <Splide
          ref={splideRef}
          options={{
            perPage: 2,
            perMove: 1,
            rewind: true,
            autoplay: true,
            speed: 1000,
            pagination: false,
            arrows: false,
            gap: '2rem',
            breakpoints: {
              768: { perPage: 1 },
            },
          }}
        >
          {reviews.map((review) => (
            <SplideSlide key={review.id}>
              <div className="bg-[#1a1d3a] w-full rounded-xl p-8 h-full flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="flex flex-col items-center mb-4 relative">
                  <div className="flex items-center mb-2">
                    <img className="w-20 h-20 rounded-full object-cover transition-transform duration-300 hover:scale-110" src={review.image} alt={review.name} />
                    <FaQuoteLeft className="text-[#ffffff] text-4xl absolute top-[-20px] left-[-10px]" />
                  </div>
                  <p className="text-xl text-[#9124b5] font-semibold">{review.name}</p>
                  <p className="text-lime-400">{review.position}</p>
                </div>
                <p className="text-lg text-gray-400 text-center">{review.text}</p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </section>
  );
};

export default Testimonials;
