const TopSlider = () => {
  return (
    <div className="carousel w-full h-[calc(100vh-80px)]">
      <div id="slide1" className="carousel-item relative w-full">
        <div className="h-full w-full relative rounded-b flex items-center bg-cover bg-center bg-blend-darken bg-[url('https://cdn.contrastly.com/wp-content/uploads/prime-lenses-16mm.jpg')]">
          <div className="bg-black opacity-40 h-full w-full absolute"></div>
          <div className="sm:w-2/3 p-5 sm:pl-10 z-10 text-center mx-auto">
            <h2 className="text-3xl sm:text-6xl font-bold text-white ">
              Welcome to Art Quest Photography School
            </h2>
            <p className="text-slate-300 text-xl sm:text-2xl mt-5 border-b-4 border-[#26c6da] w-fit mx-auto ">
              Discover the world through the lens
            </p>
            <button className="mt-10 px-10 py-2 bg-sky-900 bg-opacity-60 hover:bg-gray-500 border border-sky-500 text-white text-2xl shadow shadow-sky-500 font-medium rounded-full">
              Explore Courses
            </button>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle bg-sky-300 bg-opacity-50">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle bg-sky-300 bg-opacity-50">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <div className="h-full w-full relative rounded-b flex items-center bg-cover bg-center bg-blend-darken bg-[url('https://lumosmax.com/wp-content/uploads/2019/02/night-portrait-photography-led-light.jpg')]">
          <div className="bg-black opacity-40 h-full w-full absolute"></div>
          <div className="sm:w-2/3 p-5 sm:pl-10 z-10 text-center mx-auto">
            <h2 className="text-3xl sm:text-6xl font-bold text-white ">
              Unleash Your Creativity
            </h2>
            <p className="text-slate-300 text-xl sm:text-2xl mt-5 border-b-4 border-[#26c6da] w-fit mx-auto ">
              Learn to capture the perfect moments
            </p>
            <button
              className="mt-10 px-10 py-2 bg-sky-900 bg-opacity-60
            hover:bg-gray-500 border border-sky-500 text-white text-2xl shadow shadow-sky-500 font-medium rounded-full"
            >
              Enroll Now
            </button>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle bg-sky-300 bg-opacity-50">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle bg-sky-300 bg-opacity-50">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <div className="h-full w-full relative rounded-b flex items-center bg-cover bg-center bg-blend-darken bg-[url('https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2018/11/Kav-Dadfar-2018-Photography-Next-Level-8.jpg?resize=1500%2C1125&ssl=1')]">
          <div className="bg-black opacity-40 h-full w-full absolute"></div>
          <div className="sm:w-2/3 p-5 sm:pl-10 z-10 text-center mx-auto">
            <h2 className="text-3xl sm:text-6xl font-bold text-white">
              Become a Master Photographer
            </h2>
            <p className="text-slate-300 text-xl sm:text-2xl mt-5 border-b-4 border-[#26c6da] w-fit mx-auto ">
              Take your skills to the next level
            </p>
            <button className="mt-10 px-10 py-2 bg-sky-900 bg-opacity-60 hover:bg-gray-500 border border-sky-500 text-white text-2xl shadow shadow-sky-500 font-medium rounded-full">
              Join Workshops
            </button>
          </div>
        </div>
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle bg-sky-300 bg-opacity-50">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle bg-sky-300 bg-opacity-50">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopSlider;
