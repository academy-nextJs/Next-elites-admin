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
import { getDashboardSummary } from "../utility/services/api/get/DashboardSummert";
import { getMarketTrend } from "../utility/services/api/get/MarketTrend";
import ApexLineChart from "../views/cards/ApexLineChart";
import ApexRadialbar from "../views/cards/ApexRadialbar";

const Home = () => {
  const { data: dashboardStatus } = useQuery({
    queryKey: ["DASHBOARD"],
    queryFn: getDashboardStatus,
  });
  const { data: dashboardSummary } = useQuery({
    queryKey: ["DASHBOARD_SUMMARY"],
    queryFn: getDashboardSummary,
  });
  const { data: marketTrend } = useQuery({
    queryKey: ["DASHBOARD_TREND"],
    queryFn: getMarketTrend,
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
      <Row className="match-height">
        <Col xl="4" md="6" xs="12">
          <ApexRadialbar data={dashboardSummary?.users} />
        </Col>
        <Col xl="8" md="6" xs="12">
          <ApexLineChart data={marketTrend} />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
