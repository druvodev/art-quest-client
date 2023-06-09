import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useAdminClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const {
    refetch,
    data: classes = [],
    isLoading,
  } = useQuery({
    queryFn: async () => {
      const res = await axiosSecure("/admin/classes");
      return res.data;
    },
  });

  return [classes, refetch, isLoading];
};

export default useAdminClasses;
