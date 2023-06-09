import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const usePopularClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    refetch: classesRefetch,
    data: popularClasses = [],
    isLoading: classesLoading,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/popularClasses");
      return res.data;
    },
  });

  return [popularClasses, classesRefetch, classesLoading];
};

export default usePopularClasses;
