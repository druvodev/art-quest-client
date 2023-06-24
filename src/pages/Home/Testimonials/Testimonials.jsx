import HeaderName from "../../../components/HeaderName";
import TestimonialCard from "./TestimonialCard";
import Marquee from "react-fast-marquee";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      quote:
        "I've always been passionate about photography, and Art Quest Photography School has taken my skills to the next level. The instructors are incredibly knowledgeable, and the course material is comprehensive. Highly recommended!",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJjly1-bNI-HT-k7EFTXmJRysKIuN64e-0syer-XN9thfaGmvPX3t6zEp4oaHjdUeRnek&usqp=CAU",
    },
    {
      id: 2,
      name: "Jane Smith",
      quote:
        "I've always been passionate about photography, and Art Quest Photography School has taken my skills to the next level. The instructors are incredibly knowledgeable, and the course material is comprehensive. Highly recommended!",
      image:
        "https://img.freepik.com/premium-photo/portrait-smiling-young-man-looking-camera_33839-1731.jpg",
    },
    {
      id: 3,
      name: "Emily Johnson",
      quote:
        "I've always been passionate about photography, and Art Quest Photography School has taken my skills to the next level. The instructors are incredibly knowledgeable, and the course material is comprehensive. Highly recommended!",
      image:
        "https://img.freepik.com/free-photo/beautiful-young-woman-smiling_1303-14096.jpg",
    },

    {
      id: 4,
      name: "Sophia Anderson",
      quote:
        "I've always been passionate about photography, and Art Quest Photography School has taken my skills to the next level. The instructors are incredibly knowledgeable, and the course material is comprehensive. Highly recommended!",
      image:
        "https://img.freepik.com/free-photo/portrait-happy-cheerful-young-woman-with-dark-hair-shows-thumbs-up-sign_176420-21133.jpg",
    },
    {
      id: 5,
      name: "David Thompson",
      quote:
        "I've always been passionate about photography, and Art Quest Photography School has taken my skills to the next level. The instructors are incredibly knowledgeable, and the course material is comprehensive. Highly recommended!",
      image:
        "https://img.freepik.com/free-photo/portrait-smiling-young-man_171337-5167.jpg",
    },
  ];

  return (
    <section>
      <HeaderName name={"Testimonials"} />
      <div className="pb-8">
        <Marquee pauseOnHover={true} speed={30}>
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
