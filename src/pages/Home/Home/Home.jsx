import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import TopSlider from "../TopSlider/TopSlider";

const Home = () => {
  return (
    <>
      {" "}
      <TopSlider />
      <div className="px-5 sm:px-10">
        <PopularClasses />
        <PopularInstructors />
      </div>
    </>
  );
};

export default Home;
