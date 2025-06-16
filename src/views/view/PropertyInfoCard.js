// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components
import { Book, Star } from "react-feather";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import formatToPersianDate from "../../utility/helper/format-date";
import { getTransactionType } from "../../utility/helper/transaction-type";
import { Link } from "react-router-dom";
import { formatNumber } from "../../utility/helper/format-number";

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
                      <Badge color="primary" className="text-capitalize">
                        {getTransactionType(houseData.transaction_type)}
                      </Badge>
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
                <li className="mb-75">
                  <span className="fw-bolder me-25"> نام فروشنده:</span>
                  <span>
                    <Link to={`/users-list/${houseData.sellerId}`}>
                      {houseData.sellerName}
                    </Link>
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">آخرین تغییرات:</span>
                  <span>{formatToPersianDate(houseData.last_updated)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">نشانی:</span>
                  <span>{houseData.address}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">قیمت:</span>
                  <span>{formatNumber(houseData.price)} تومان</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ظرفیت:</span>
                  <span>{houseData.capacity} نفر</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">دسته بندی:</span>
                  <span>
                    {houseData.categories ? houseData.categories.name : ""}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تعداد حمام:</span>
                  <span>{houseData.bathrooms} حمام</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تعداد پارکینگ:</span>
                  <span>{houseData.parking} پارکینگ</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تعداد اتاق:</span>
                  <span>{houseData.rooms} اتاق</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> نوع حیاط:</span>
                  <span>{houseData.yard_type}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تعداد کامنت:</span>
                  <span>{houseData.num_comments} تا</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> نوع پرداخت:</span>
                  <span>{getTransactionType(houseData.transaction_type)}</span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center pt-2">
              <Button color="primary" onClick={() => setShow(true)}>
                ویرایش
              </Button>
              <Button className="ms-1" color="danger" outline>
                حذف
              </Button>
            </div>
          </CardBody>
        </Card>
      </Fragment>
    )
  );
};

export default HouseInfoCard;
