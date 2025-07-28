// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Book, Star } from "react-feather";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import formatToPersianDate from "../../utility/helper/format-date";
import { formatNumber } from "../../utility/helper/format-number";
import { getTransactionType } from "../../utility/helper/transaction-type";
import { getAllBookings } from "../../utility/services/api/get/Bookings";

const HouseInfoCard = ({ houseData }) => {
  function getRandomBadgeColor() {
    const colors = [
      "light-primary",
      "light-secondary",
      "light-success",
      "light-danger",
      "light-warning",
      "light-info",
    ];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  }
  const transactionType = getTransactionType(houseData.transaction_type);
  const houseDetail = [
    { title: "نام فروشنده:", desc: houseData.sellerName },
    {
      title: "آخرین تغییرات:",
      desc: formatToPersianDate(houseData.last_updated),
    },
    { title: "نشانی:", desc: houseData.address },
    { title: "قیمت:", desc: formatNumber(houseData.price) + " تومان" },
    { title: "ظرفیت:", desc: houseData.capacity + " نفر" },
    {
      title: "دسته بندی:",
      desc: houseData.categories ? houseData.categories.name : "",
    },
    { title: "تعداد حمام:", desc: houseData.bathrooms + " حمام" },
    { title: "تعداد پارکینگ:", desc: houseData.parking + " پارکینگ" },
    { title: "تعداد اتاق:", desc: houseData.rooms + " اتاق" },
    { title: "نوع حیاط:", desc: houseData.yard_type },
    {
      title: "تعداد نظرات:",
      desc:
        houseData.num_comments == 1
          ? "یکی"
          : houseData.num_comments == 0
          ? "بدون نظر"
          : houseData.num_comments + " تا",
    },
    {
      title: "نوع پرداخت:",
      desc: transactionType ? transactionType.text : "درحال پردازش...",
    },
  ];

  return (
    houseData && (
      <Fragment>
        <Card>
          <CardBody>
            <div className="user-avatar-section">
              <div className="d-flex align-items-center flex-column">
                <div className="pb-75 rounded">
                  <img
                    width={250}
                    height={150}
                    src={houseData.photos ? houseData.photos[0] : ""}
                    className="rounded"
                  />
                </div>
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info">
                    <h4>{houseData.title}</h4>
                    <h6 style={{ paddingTop: "5px" }}>
                      {houseData.caption || "این خانه توضیحات ندارد."}
                    </h6>
                    <div
                      className="d-flex gap-1"
                      style={{ paddingTop: "15px" }}
                    >
                      {transactionType && (
                        <Badge
                          color={transactionType.color}
                          className="text-capitalize"
                        >
                          {transactionType.text}
                        </Badge>
                      )}
                      {houseData?.tags &&
                        houseData?.tags.map((item, index) => {
                          return (
                            <Badge color={getRandomBadgeColor()} key={index}>
                              {item}
                            </Badge>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-around my-2 pt-75">
              <div className="d-flex align-items-start me-2">
                <Badge color="light-primary" className="rounded p-75">
                  <Book className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">10 نفر</h4>
                  <small>کل رزرو ها</small>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <Badge color="light-primary" className="rounded p-75">
                  <Star className="font-medium-2" />
                </Badge>
                <div className="ms-75">
                  <h4 className="mb-0">{houseData.rate}</h4>
                  <small>امتیاز</small>
                </div>
              </div>
            </div>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">مشخصات</h4>
            <div className="info-container">
              <ul className="list-unstyled">
                {houseDetail.map((item, index) => (
                  <li key={index} className="mb-75">
                    <span className="fw-bolder me-25">{item.title}</span>
                    <span>{item.desc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardBody>
        </Card>
      </Fragment>
    )
  );
};

export default HouseInfoCard;
