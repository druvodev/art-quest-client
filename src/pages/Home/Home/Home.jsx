import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import Testimonials from "../Testimonials/Testimonials";
import TopSlider from "../TopSlider/TopSlider";

const Home = () => {
  return (
    <>
      {" "}
      <TopSlider />
      <div className="px-5 sm:px-10">
        <PopularClasses />
        <PopularInstructors />
        <Testimonials />
      </div>
    </>
  );
};

export default Home;
