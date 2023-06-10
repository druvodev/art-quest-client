import { useState } from "react";

const useSpinner = () => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  const Spinner = () => (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#26c6da]"></div>
    </div>
  );

  return { isLoading, startLoading, stopLoading, Spinner };
};

export default useSpinner;
