import { useQuery } from "@tanstack/react-query";
import { getAllLocations } from "../services/api/get/Location";

export const useLocations = (page, limit, area_name) => {
  return useQuery({
    queryKey: ["GET_LOCATIONS", page, limit, area_name],
    queryFn: () => getAllLocations({ page, limit, area_name }),
  });
};
