import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import categoryImage from "../assets/images/categories.jpg";
import { getAllCategories } from "../utility/services/api/get/Category";
import TableBasic from "../views/categories-table/TableBasic";

const CategoriesList = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const name = searchParams.get("name") || "";
  const limit = searchParams.get("limit") || "10";

  const queryKey = ["GET_LOCATIONS", limit];
  if (name) {
    queryKey.push(name);
  }

  const { data, refetch } = useQuery({
    queryKey,
    queryFn: () => getAllCategories({ name: name || undefined, limit }),
  });
  return (
    <div className="w-100 vh-100 d-flex gap-2">
      <TableBasic data={data} refetch={refetch} />
      <div className="w-50 px-2 h-100 rounded">
        <img className="w-100 h-100 rounded" src={categoryImage} />
      </div>
    </div>
  );
};
export default CategoriesList;
