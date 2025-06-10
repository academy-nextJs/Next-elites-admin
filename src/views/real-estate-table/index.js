// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Demo Components
import TableBasic from "./TableBasic";

// ** Custom Components
import Card from "@components/card-snippet";
import { getAllRealEstates } from "../../utility/services/api/get/RealEstate";

const RealEstateManagementContainer = () => {
  const [realEstates, setRealEstates] = useState();

  const fetchRealEstates = async () => {
    const response = await getAllRealEstates();
    setRealEstates(response);
  };

  useEffect(() => {
    fetchRealEstates();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col sm="12" dir="rtl">
          <div className="title yekan">مدیریت دفاتر مشاور املاک</div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <TableBasic data={realEstates} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default RealEstateManagementContainer;
