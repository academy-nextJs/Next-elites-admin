// ** React Imports
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// ** Reactstrap Imports
import { Alert, Col, Row } from "reactstrap";

// ** User View Components
import PropertyTab from "./Tabs";

// ** Styles
import "@styles/react/apps/app-users.scss";
import { getHouseById } from "../../utility/services/api/get/Houses";
import HouseInfoCard from "./PropertyInfoCard";
import WarningModal from "../../@core/common/WarningModal";
import EditModal from "../booking-popover/EditModal";

const HouseDetailContainer = () => {
  // ** Hooks
  const { id } = useParams();

  const [active, setActive] = useState("1");
  const [houseData, setHouseData] = useState({});

  const toggleTab = (tab) => {
    if (active !== tab) {
      setActive(tab);
    }
  };

  const fethcHouseDetail = async () => {
    const response = await getHouseById(id);
    setHouseData(response);
  };

  useEffect(() => {
    fethcHouseDetail();
  }, []);

  return houseData.title ? (
    <div className="app-user-view">
      <Row>
        <Col xl="4" lg="5" xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <HouseInfoCard houseData={houseData} />
        </Col>
        <Col xl="8" lg="7" xs={{ order: 0 }} md={{ order: 1, size: 7 }}>
          <PropertyTab
            houseData={houseData}
            active={active}
            toggleTab={toggleTab}
          />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color="danger">
      <h4 className="alert-heading">خانه یافت نشد</h4>
      <div className="alert-body">
        خانه با ایدی: {id} وجود ندارد. لیست همه خانه ها را چک کنید:
        <Link to="/houses-management/list">لیست خانه ها</Link>
      </div>
    </Alert>
  );
};
export default HouseDetailContainer;
