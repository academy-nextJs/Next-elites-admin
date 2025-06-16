// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Third Party Components

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import avatar from "../../assets/images/avatars/10.png";
import formatToPersianDate from "../../utility/helper/format-date";
import { getStatus } from "../../utility/helper/get-status";
import { getUserById } from "../../utility/services/api/get/Users";

const BookingInfoCard = ({ data }) => {
  const status = getStatus(data.status);
  const [userData, setUserData] = useState({});
  const fetchUserData = async () => {
    const response = await getUserById(data.user_id);
    setUserData(response.user);
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    data.id &&
    userData.fullName && (
      <Fragment>
        <Card>
          <CardBody>
            <div className="user-avatar-section">
              <div className="d-flex align-items-center flex-column">
                <div className="pb-75 rounded">
                  <img
                    width={150}
                    height={150}
                    src={
                      userData.profilePicture ? userData.profilePicture : avatar
                    }
                    className="rounded"
                  />
                </div>
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info">
                    <h4>{userData.fullName}</h4>
                    <div className="d-flex justify-content-center gap-1">
                      <Badge color={status.color} className="text-capitalize">
                        {status.text}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">مشخصات</h4>
            <div className="info-container">
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">شناسه خانه:</span>
                  <span>{data.houseId}#</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شناسه کاربر:</span>
                  <span>{data.user_id}#</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> از:</span>
                  <span>
                    {formatToPersianDate(data.reservedDates[0].value)}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تا:</span>
                  <span>
                    {formatToPersianDate(data.reservedDates[1].value)}
                  </span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> شماره تلفن کاربر:</span>
                  <span>{data.sharedMobile}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> ایمیل کاربر:</span>
                  <span>{data.sharedEmail}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> ساخته شده در تاریخ:</span>
                  <span>{formatToPersianDate(data.createdAt)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> آخرین تغییرات:</span>
                  <span>{formatToPersianDate(data.updatedAt)}</span>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-center pt-2">
              <Button color="primary">ویرایش</Button>
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

export default BookingInfoCard;
