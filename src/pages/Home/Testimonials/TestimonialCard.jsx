import { FaQuoteLeft } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const TestimonialCard = ({ testimonial }) => {
  const { name, quote, image } = testimonial;

  return (
    <div className="bg-white card w-96 rounded-lg p-6 shadow-md transform transition duration-500 hover:scale-105 mx-5">
      <Carousel showArrows={false} showStatus={false} showThumbs={false}>
        <div>
          <img
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
            src={image}
            alt={`${name}'s profile`}
          />
        </div>
      </Carousel>
      <p className="text-gray-800 text-lg text-center mb-6">
        <FaQuoteLeft className="inline mr-2 text-xl" />
        {quote}
      </p>
      <p className="text-gray-600 text-center">
        <em>- {name}</em>
      </p>
    </div>
  );
};

export default TestimonialCard;
