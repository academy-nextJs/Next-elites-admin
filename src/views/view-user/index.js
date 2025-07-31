// ** React Imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Alert, Col, Row } from "reactstrap";

// ** User View Components

// ** Styles
import "@styles/react/apps/app-users.scss";
import { getUserById } from "../../utility/services/api/get/Users";
import UserInfoCard from "./UserInfoCard";
import Tab from "./Tabs";

const ViewUserContainer = () => {
  // ** Hooks
  const { id } = useParams();

  const [active, setActive] = useState("1");
  const [userData, setUserData] = useState({});

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const fetchUserDetail = async () => {
    const response = await getUserById(id);
    setUserData(response);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  return userData.user ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard data={userData.user} fetchUserDetail={fetchUserDetail} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <Tab data={userData.user} active={active} toggleTab={toggleTab} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">کاربر یافت نشد</h4>
      <div className="alert-body">
        کاربر با ایدی: {id} وجود ندارد. لیست همه کاربر ها را چک کنید:
        <Link to="/users-management/list">لیست کاربر ها</Link>
      </div>
    </Alert>
  );
};
export default ViewUserContainer;
