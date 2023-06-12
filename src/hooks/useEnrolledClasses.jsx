import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useEnrolledClasses = () => {
  const { user, loading: authLoading } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: enrolledClasses = [], isLoading } = useQuery({
    queryKey: ["enrolledClasses", user?.email],
    enabled: !authLoading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolledClasses/${user?.email}`);
      console.log("res from axios", res);
      return res.data;
    },
  });

  return [enrolledClasses, isLoading];
};

export default useEnrolledClasses;
