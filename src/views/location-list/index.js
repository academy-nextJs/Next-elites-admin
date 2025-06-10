import { useQuery } from "@tanstack/react-query";
import PerfectScrollbar from "react-perfect-scrollbar";
import MapComponent from "../components/map/map";
import CityCard from "./card";
import PageHeader from "./header";
import { getAllLocations } from "../../utility/services/api/get/Location";
import { useLocation } from "react-router-dom";

const LocationListContainer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const area_name = searchParams.get("area_name") || "";
  const limit = searchParams.get("limit") || "10";

  if (area_name) {
    queryKey.push(area_name);
  }

  const { data, refetch, isPending } = useQuery({
    queryKey: ["GET_LOCATIONS"],
    queryFn: () =>
      getAllLocations({ area_name: area_name || undefined, limit }),
  });

  return (
    <div className="w-100 font-yekan d-inline-flex align-items-start vh-100 flex-wrap">
      <PageHeader refetch={refetch} />
      <PerfectScrollbar
        options={{ wheelPropagation: false }}
        className="w-50 px-2 d-flex flex-row flex-wrap justify-content-between"
      >
        {data?.map((item) => (
          <CityCard
            key={item.id}
            city={item.area_name}
            imageUrl={"https://lh4.googleusercontent.com/proxy/n8E8rmkkpzxwMtRS_6leSVWYervfJMfZvcHr8J3eed9OcLa5_prcGBbeYfHIOUzAXKYDyHRatB9ZWKWuVEbCDMIAoJk7rjEZ2_GqZR6GI-GVSTwjXKygkg"}
            onEdit={() => console.log("Edit clicked")}
            onDelete={() => console.log("Delete clicked")}
          />
        ))}
      </PerfectScrollbar>
      <div className="w-50 h-100">
        <MapComponent initialLocation={[32, 55]} initialZoom={5} />
      </div>
    </div>
  );
};

export default LocationListContainer;
