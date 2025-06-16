// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import { Badge, Button, Card, CardBody } from "reactstrap";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import avatar from "../../assets/images/avatars/10.png";
import { getRoleColor } from "../../utility/helper/get-role-color";
import formatToPersianDate from "../../utility/helper/format-date";

const UserInfoCard = ({ data }) => {
  const role = getRoleColor(data.role);
  return (
    data.id && (
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
                      data.profilePicture &&
                      data.profilePicture.includes("https://")
                        ? data.profilePicture
                        : avatar
                    }
                    className="rounded"
                  />
                </div>
                <div className="d-flex flex-column align-items-center text-center">
                  <div className="user-info">
                    <h4>{data.fullName}</h4>
                    <div className="d-flex justify-content-center gap-1">
                      {role && (
                        <Badge color={role.color} className="text-capitalize">
                          {role.text}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h4 className="fw-bolder border-bottom pb-50 mb-1">مشخصات</h4>
            <div className="info-container">
              <ul className="list-unstyled">
                <li className="mb-75">
                  <span className="fw-bolder me-25">تاریخ عضویت:</span>
                  <span>{formatToPersianDate(data.membershipDate)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">ایمیل:</span>
                  <span>{data.email}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">شماره تلفن:</span>
                  <span>{data.phoneNumber}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25">وضعیت ایمیل:</span>
                  <span>{data.emailVerified ? "تایید شده" : "تایید نشده"}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تاریخ ساخت اکانت:</span>
                  <span>{formatToPersianDate(data.createdAt)}</span>
                </li>
                <li className="mb-75">
                  <span className="fw-bolder me-25"> تاریخ آخرین تغییرات:</span>
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

export default UserInfoCard;
