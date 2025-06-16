// ** React Imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Alert, Col, Row } from "reactstrap";

// ** User View Components

// ** Styles
import "@styles/react/apps/app-users.scss";
import { getBookingById } from "../../utility/services/api/get/Bookings";
import BookingInfoCard from "./BookingInfoCard";
import Tab from "./Tabs";

const ViewBookingContainer = () => {
  // ** Hooks
  const { id } = useParams();

  const [active, setActive] = useState("1");
  const [bookingData, setBookingData] = useState({});

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const fetchBookingDetail = async () => {
    const response = await getBookingById(id);
    setBookingData(response);
  };

  useEffect(() => {
    fetchBookingDetail();
  }, []);

  return bookingData.id ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <BookingInfoCard data={bookingData} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tab data={bookingData} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">رزرو یافت نشد</h4>
      <div className="alert-body">
        رزرو با ایدی: {id} وجود ندارد. لیست همه رزرو ها را چک کنید:
        <Link to="/bookings-management/list">لیست رزرو ها</Link>
      </div>
    </Alert>
  );
};
export default ViewBookingContainer;
