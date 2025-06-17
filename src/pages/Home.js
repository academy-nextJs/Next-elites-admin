// ** React Imports

// ** Reactstrap Imports
import { Col, Row } from "reactstrap";

// ** Demo Components
import CardMedal from "../views/cards/CardMedal";
import StatsCard from "../views/cards/StatsCard";

// ** Styles
import "@styles/base/pages/dashboard-ecommerce.scss";
import "@styles/react/libs/charts/apex-charts.scss";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStatus } from "../utility/services/api/get/Dashboard";

const Home = () => {
  const { data: dashboardStatus } = useQuery({
    queryKey: ["DASHBOARD"],
    queryFn: getDashboardStatus,
  });
  return (
    <div id="dashboard-ecommerce">
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <CardMedal />
        </Col>
        <Col xl="8" md="6" xs="12">
          <StatsCard data={dashboardStatus} cols={{ xl: "3", sm: "6" }} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
