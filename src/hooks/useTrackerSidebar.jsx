import axiosApi from "@/api/axiosApi";
import { useQuery } from "@tanstack/react-query";

const fetchTrackerSidebarData = async () => {
  const response = await axiosApi.get("/products/api/v1/tracker");
  return response.data;
};

const useTrackerSidebar = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["trackerSidebar"], // cache key
    queryFn: fetchTrackerSidebarData,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  return {
    trackerSidebarData: data,
    isLoading,
    isError,
    error,
  };
};

export default useTrackerSidebar;
