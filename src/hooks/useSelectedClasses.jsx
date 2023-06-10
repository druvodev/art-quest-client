import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useSelectedClasses = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const {
    refetch,
    data: selectedClasses = [],
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure(`/selectedClasses/${user.email}`);
      return res.data;
    },
  });

  return [selectedClasses, refetch, isLoading];
};

export default useSelectedClasses;
