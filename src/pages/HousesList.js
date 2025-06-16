import { useQuery } from "@tanstack/react-query";
import React, { useCallback } from "react";
import { Eye, Home, Star } from "react-feather";
import { Link } from "react-router-dom";
import {
  Col,
  FormGroup,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ReusableTable from "../@core/common/Table";
import formatToPersianDate from "../utility/helper/format-date";
import { getTransactionType } from "../utility/helper/transaction-type";
import { getAllHouses } from "../utility/services/api/get/Houses";
import HousePopover from "../views/house-popover";

const HousesList = React.memo(() => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const [discount_percentage, setDiscountPercentage] = useState(
  //   searchParams.get("discount_percentage") || ""
  // );
  // const [code, setCode] = useState(searchParams.get("code") || "");
  // const [limit, setLimit] = useState(parseInt(searchParams.get("limit")) || 5);
  // const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);

  // const updateParams = useCallback(
  //   (newParams) => {
  //     const params = new URLSearchParams(newParams);
  //     navigate({ search: params.toString() });
  //   },
  //   [navigate]
  // );

  // useEffect(() => {
  //   const params = {
  //     limit,
  //     page,
  //     code,
  //     discount_percentage,
  //   };
  //   if (discount_percentage != null && discount_percentage !== "")
  //     params.discount_percentage = discount_percentage;
  //   if (code != null && code !== "") params.code = code;

  //   updateParams(params);
  // }, [limit, page, discount_percentage, code, updateParams]);

  const {
    data: housesData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: [
      "HOUSES",
      // {
      //   limit,
      //   page,
      //   ...(discount_percentage && { discount_percentage }),
      //   ...(code && { code }),
      // },
    ],
    queryFn: getAllHouses,
    keepPreviousData: true,
  });

  const headers = [
    "عنوان",
    "قیمت",
    "نوع",
    "امتیاز",
    "آخرین تغییر",
    "دسته بندی",
    "نام کاربر",
    "عملیات",
  ];

  const renderRow = useCallback((house) => {
    return (
      <>
        <td className="d-flex gap-1 align-items-center">
          <img
            width={100}
            height={60}
            className="rounded"
            src={house.photos[0]}
          />
          <p>{house.title}</p>
        </td>
        <td>{house.price}</td>
        <td>{getTransactionType(house.transaction_type)}</td>
        <td>
          {house.rate}
          <Star style={{ marginRight: "5px" }} />
        </td>
        <td>{formatToPersianDate(house.last_updated)}</td>
        <td>{house.categories.name}</td>
        <td>{house.sellerName || نامشخص}</td>
        <td>
          <Link to={`/houses-management/${house.id}`}>
            <Eye className="cursor-pointer" />
          </Link>
          <HousePopover style={{ marginRight: "10px" }} />
        </td>
      </>
    );
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  return (
    <div>
      {isLoading ? (
        <p>در حال بارگذاری...</p>
      ) : error ? (
        <p>خطا در دریافت نظرات</p>
      ) : (
        <>
          <ReusableTable
            pageTitle={
              <div className="d-inline-flex gap-1 align-items-center">
                <Home size={35} />
                <h1>مدیریت املاک</h1>
              </div>
            }
            headerContent={
              <Col xs={20} md={20}>
                <div className="d-flex flex-column flex-md-row align-items-center gap-2">
                  <FormGroup>
                    <Label htmlFor="search"> موقعیت:</Label>
                    <Input type="select" id="location">
                      <option>خیابان ولیعصر، تهران، منطقه مرکزی</option>
                      <option>خیابان الهام، شیراز، منطقه قدیمی</option>
                      <option>خیابان اصلی، روستای سرسبز، استان اصفهان</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="search"> جستجو:</Label>
                    <Input type="text" id="search" />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="search"> مرتب سازی:</Label>
                    <Input type="select" id="sort">
                      <option>تاریخ ساخت</option>
                      <option>قیمت</option>
                      <option>امتیاز</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="search"> نوع ملک:</Label>
                    <Input type="select" id="sort">
                      <option>آپارتمان</option>
                      <option>خانه</option>
                      <option>ویلا</option>
                      <option>زمین</option>
                      <option>تجاری</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="search"> روند:</Label>
                    <Input type="select" id="order">
                      <option>نزولی</option>
                      <option>صعودی</option>
                    </Input>
                  </FormGroup>

                  <FormGroup>
                    <Label htmlFor="search"> تعداد:</Label>
                    <Input type="select" id="limit">
                      <option value={5}>5</option>
                      <option value={10}>10</option>
                    </Input>
                  </FormGroup>
                </div>
              </Col>
            }
            headers={headers}
            data={housesData || []}
            renderRow={renderRow}
          />
          <Pagination className="mt-3">
            <PaginationItem>
              <PaginationLink>قبلی</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>بعدی</PaginationLink>
            </PaginationItem>
          </Pagination>
        </>
      )}
    </div>
  );
});

export default HousesList;
