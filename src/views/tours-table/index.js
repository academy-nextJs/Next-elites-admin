// ** React Imports
import { Fragment, useEffect, useState } from "react";

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Third Party Components

// ** Demo Components
import TableBasic from "./TableBasic";

// ** Custom Components
import Card from "@components/card-snippet";
import { getAllTours } from "../../utility/services/api/get/Tours";

const TourManagementContainer = () => {
  const [tours, setTours] = useState();

  const fetchTours = async () => {
    const response = await getAllTours();
    setTours(response);
  };

  useEffect(() => {
    fetchTours();
  }, []);

  return (
    <Fragment>
      <Row>
        <Col sm="12" dir="rtl">
          <div className="title yekan">مدیریت تورها</div>
        </Col>
      </Row>
      <Row>
        <Col sm="12">
          <Card>
            <TableBasic data={tours} />
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

export default TourManagementContainer;
