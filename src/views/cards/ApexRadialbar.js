// ** Third Party Components
import Chart from "react-apexcharts";

// ** Reactstrap Imports
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { calculatePercentage } from "../../utility/helper/get-percentage";

const ApexRadialbar = ({ data }) => {
  const totalCount = data?.userCount;
  const donutColors = {
    series1: "#ffe700",
    series2: "#00d4bd",
    series3: "#826bf8",
    series4: "#2b9bf4",
    series5: "#FFA1A1",
  };

  // ** Chart Options
  const options = {
    colors: [donutColors.series1, donutColors.series2, donutColors.series4],
    plotOptions: {
      radialBar: {
        hollow: {
          size: "25%",
        },
        track: {
          margin: 15,
        },
        dataLabels: {
          name: {
            fontSize: "2rem",
            fontFamily: "Montserrat",
          },
          value: {
            fontSize: "1rem",
            fontFamily: "Montserrat",
          },
          total: {
            show: true,
            fontSize: "1rem",
            label: "کل کاربران",
            formatter() {
              return totalCount;
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -35,
        bottom: -30,
      },
    },
    legend: {
      show: true,
      position: "bottom",
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["خریدار", "فروشنده", "ادمین"],
  };

  return (
    <Card>
      <CardHeader className="d-flex flex-sm-row flex-column justify-content-md-between align-items-start justify-content-start">
        <CardTitle tag="h4">آمار کاربران</CardTitle>
      </CardHeader>
      {data && (
        <CardBody className="yekan">
          <Chart
            className="yekan"
            options={options}
            series={[
              calculatePercentage(totalCount, data?.buyers),
              calculatePercentage(totalCount, data?.sellers),
              calculatePercentage(totalCount, data?.admins),
            ]}
            type="radialBar"
            height={250}
          />
        </CardBody>
      )}
    </Card>
  );
};

export default ApexRadialbar;
