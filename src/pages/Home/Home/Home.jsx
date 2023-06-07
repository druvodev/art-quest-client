import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructors from "../PopularInstructors/PopularInstructors";
import TopSlider from "../TopSlider/TopSlider";

const Home = () => {
  return (
    <div>
      <TopSlider />
      <PopularClasses />
      <PopularInstructors />
    </div>
  );
};

export default Home;
