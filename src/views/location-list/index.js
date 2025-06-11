import { useMutation, useQuery } from "@tanstack/react-query";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useLocation } from "react-router-dom";
import { getAllLocations } from "../../utility/services/api/get/Location";
import { editLocation } from "../../utility/services/api/put/Location";
import MapComponent from "../components/map/map";
import CityCard from "./card";
import PageHeader from "./header";
import toast from "react-hot-toast";
import { deleteLocation } from "../../utility/services/api/delete/Location";

const LocationListContainer = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const area_name = searchParams.get("area_name") || "";
  const limit = searchParams.get("limit") || "10";
  const queryKey = ["GET_LOCATIONS", limit];
  if (area_name) {
    queryKey.push(area_name);
  }

  const { data, refetch, isPending } = useQuery({
    queryKey,
    queryFn: () =>
      getAllLocations({ area_name: area_name || undefined, limit }),
  });

  const { mutate } = useMutation({
    mutationKey: ["PUT_LOCATIONS"],
    mutationFn: (data) =>
      toast.promise(
        editLocation(
          {
            area_name: data.area_name,
            lat: data.lat,
            lng: data.lng,
          },
          data.id
        ),
        {
          loading: "درحال پردازش",
        }
      ),
    onSuccess: () => {
      toast.success("مقصد شما با موفقیت ویرایش شد");
      refetch();
    },
  });

  const { mutate: deleteCity } = useMutation({
    mutationKey: ["DELETE_LOCATIONS"],
    mutationFn: (id) =>
      toast.promise(deleteLocation(id), {
        loading: "درحال پردازش...",
        error: "خطا !",
      }),
    onSuccess: () => {
      toast.success("مقصد با موفقیت حذف شد");
      refetch();
    },
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
            lat={item.lat ? item.lat : 32}
            lng={item.lng ? item.lng : 55}
            key={item.id}
            city={item.area_name}
            imageUrl={
              "https://lh4.googleusercontent.com/proxy/n8E8rmkkpzxwMtRS_6leSVWYervfJMfZvcHr8J3eed9OcLa5_prcGBbeYfHIOUzAXKYDyHRatB9ZWKWuVEbCDMIAoJk7rjEZ2_GqZR6GI-GVSTwjXKygkg"
            }
            onEdit={(data) =>
              mutate({
                area_name: data.area_name,
                lat: data.lat,
                lng: data.lng,
                id: item.id,
              })
            }
            onDelete={() => deleteCity(item.id)}
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
